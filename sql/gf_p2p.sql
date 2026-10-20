-- 대전 P2P 소개소 (1.1.14 앱, 원격 설정 gf_cfg 의 p2p=1 일 때만 사용)
-- 실시간(Realtime) 서버를 안 쓰고 일반 DB 요청으로 '누가 같은 채널인지 + 연결 요청(offer/answer)'만 주고받는다.
-- 대전 중 위치 · 물기 · 죽음은 폰끼리 직접(WebRTC). 서버 메시지 요금 · 동시 연결 한도와 상관없음.
-- 아직 배포하지 않음 — 종한 OK 뒤 적용

create table if not exists public.gf_p2p_mem (
  room text not null,
  pid  text not null,
  seen timestamptz not null default now(),
  primary key (room, pid)
);
create index if not exists gf_p2p_mem_seen on public.gf_p2p_mem (seen);

create table if not exists public.gf_p2p_msg (
  id bigserial primary key,
  room text not null,
  to_pid text not null,
  from_pid text not null,
  body jsonb not null,
  at timestamptz not null default now()
);
create index if not exists gf_p2p_msg_to on public.gf_p2p_msg (to_pid, id);
create index if not exists gf_p2p_msg_at on public.gf_p2p_msg (at);

alter table public.gf_p2p_mem enable row level security;  -- 정책 없음: 앱은 아래 함수로만
alter table public.gf_p2p_msg enable row level security;

-- 한 번 부르면: (채널이 없으면 16명 안 찬 채널 고르기) + 나 여기 있음 + 보낼 것 넣기 + 나한테 온 것 받기 + 채널 사람 목록
create or replace function public.gf_p2p(p_room text, p_me text, p_out jsonb default '[]'::jsonb, p_after bigint default 0, p_per int default 16, p_leave boolean default false)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_room text := p_room;
  v_per int := greatest(2, least(coalesce(p_per,16), 16));
  v_k int;
  v_out jsonb;
  v_res jsonb;
begin
  if p_me is null or length(p_me) > 40 then return jsonb_build_object('err','me'); end if;

  -- 가끔 오래된 것 정리(30초 지난 사람 · 60초 지난 메시지)
  if random() < 0.05 then
    delete from gf_p2p_mem where seen < now() - interval '30 seconds';
    delete from gf_p2p_msg where at < now() - interval '60 seconds';
  end if;

  if p_leave then
    delete from gf_p2p_mem where pid = p_me;
    return jsonb_build_object('ok',true);
  end if;

  -- 채널 고르기: 1번부터 사람(12초 안에 신호 준) 수가 정원보다 적은 첫 채널
  if v_room is null or v_room = '' then
    with c as (select room, count(*) n from gf_p2p_mem
               where room like 'r14-%' and seen > now() - interval '12 seconds' and pid <> p_me group by room)
    select min(k) into v_k from generate_series(1, 999) k left join c on c.room = 'r14-'||k where coalesce(c.n,0) < v_per;
    v_room := 'r14-'||coalesce(v_k, 999);
  elsif length(v_room) > 40 then
    return jsonb_build_object('err','room');
  end if;

  insert into gf_p2p_mem(room,pid,seen) values (v_room,p_me,now())
    on conflict (room,pid) do update set seen = excluded.seen;

  -- 보낼 것(최대 20개, 하나 8KB 이하, 같은 채널 사람에게만)
  if jsonb_typeof(p_out) = 'array' and jsonb_array_length(p_out) between 1 and 20 then
    insert into gf_p2p_msg(room,to_pid,from_pid,body)
      select v_room, o->>'to', p_me, o->'b'
      from jsonb_array_elements(p_out) o
      where length(coalesce(o->>'to','')) between 1 and 40
        and length((o->'b')::text) <= 8192
        and exists(select 1 from gf_p2p_mem m where m.room = v_room and m.pid = o->>'to');
  end if;

  -- 새로 들어올 때(p_after < 0): 예전 판에 나한테 온 요청은 건너뛰도록 지금까지의 마지막 번호만 알려 줌
  if coalesce(p_after,0) < 0 then
    return jsonb_build_object('room', v_room, 'top', (select coalesce(max(id),0) from gf_p2p_msg where to_pid = p_me),
      'mem', coalesce((select jsonb_agg(pid) from gf_p2p_mem where room = v_room and pid <> p_me and seen > now() - interval '12 seconds'), '[]'::jsonb), 'msg', '[]'::jsonb);
  end if;

  select jsonb_build_object(
    'room', v_room,
    'mem', coalesce((select jsonb_agg(pid) from gf_p2p_mem where room = v_room and pid <> p_me and seen > now() - interval '12 seconds'), '[]'::jsonb),
    'msg', coalesce((select jsonb_agg(jsonb_build_object('id',id,'f',from_pid,'b',body) order by id)
                     from (select id,from_pid,body from gf_p2p_msg where to_pid = p_me and id > coalesce(p_after,0) and room = v_room order by id limit 40) q), '[]'::jsonb)
  ) into v_res;
  return v_res;
end $$;

revoke all on function public.gf_p2p(text,text,jsonb,bigint,int,boolean) from public;
grant execute on function public.gf_p2p(text,text,jsonb,bigint,int,boolean) to anon, authenticated;

-- 켜기: update gf_cfg set v = v || '{"p2p":1}' where k='arena';   끄기: '{"p2p":0}'
