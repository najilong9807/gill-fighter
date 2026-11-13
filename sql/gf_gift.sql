-- 1.1.28 늑구 '친구에게 진주 선물하기 · 닉네임으로 찾거나 친구 기능'
-- 진주만 선물. 보내는 사람: 하루 합계 1,000까지(자유 금액 1~1,000) · 받는 사람: 하루 합계 3,000까지(여러 기기로 몰아주기 막기)
-- 받는 쪽은 수족관 코드(gf_tank)가 있는 사람. 받기는 수족관 주인 비밀값(sec)으로만.
-- 닉네임 찾기는 공개(pub) 수족관만, 최대 10명.
-- 새 표 · 함수만 추가, 기존 표 · 함수는 안 건드림(옛 앱 영향 없음)
create table if not exists public.gf_gift(
  id bigserial primary key,
  to_code text not null,
  from_pid text not null,
  from_code text,
  from_nick text not null default '',
  amt integer not null check (amt between 1 and 1000),
  day date not null,
  at timestamptz not null default now(),
  claimed_at timestamptz
);
create index if not exists gf_gift_to on public.gf_gift(to_code) where claimed_at is null;
create index if not exists gf_gift_from_day on public.gf_gift(from_pid, day);
create index if not exists gf_gift_to_day on public.gf_gift(to_code, day);
alter table public.gf_gift enable row level security;
revoke all on public.gf_gift from anon, authenticated;
comment on table public.gf_gift is '아가미파이터 친구 진주 선물. 보내기 gf_gift_send, 받기 gf_gift_claim RPC로만.';

-- 보내기: 돌려주는 값 = 오늘 더 보낼 수 있는 진주(0 이상), 실패하면 음수
--  -1 받는 수족관 없음 · -2 나 자신 · -3 보내는 쪽 오늘 한도 초과 · -4 받는 쪽 오늘 한도 초과 · -5 금액 잘못
create or replace function public.gf_gift_send(p_to text, p_pid text, p_code text, p_nick text, p_amt integer)
returns integer language plpgsql security definer set search_path to 'public' as $$
declare d date := (now() at time zone 'Asia/Seoul')::date; c text := upper(coalesce(p_to,'')); me text := upper(coalesce(p_code,'')); s int; r int;
begin
  if p_pid is null or p_pid !~ '^[a-z0-9]{12,40}$' then raise exception 'bad pid'; end if;
  if p_amt is null or p_amt < 1 or p_amt > 1000 then return -5; end if;
  if c !~ '^[A-Z0-9]{6}$' or not exists(select 1 from gf_tank t where t.code = c) then return -1; end if;
  if c = me then return -2; end if;
  perform pg_advisory_xact_lock(hashtext('gfgift:' || p_pid));
  select coalesce(sum(amt),0) into s from gf_gift where from_pid = p_pid and day = d;
  if s + p_amt > 1000 then return -3; end if;
  select coalesce(sum(amt),0) into r from gf_gift where to_code = c and day = d;
  if r + p_amt > 3000 then return -4; end if;
  insert into gf_gift(to_code, from_pid, from_code, from_nick, amt, day)
    values (c, p_pid, nullif(me,''), left(coalesce(p_nick,''),12), p_amt, d);
  return 1000 - (s + p_amt);
end $$;

-- 받기: 아직 안 받은 선물을 모두 받음(보낸 사람 이름 · 진주)
create or replace function public.gf_gift_claim(p_code text, p_sec text)
returns table(from_nick text, from_code text, amt integer, at timestamptz)
language plpgsql security definer set search_path to 'public' as $$
declare cur public.gf_tank%rowtype;
begin
  select * into cur from gf_tank t where t.code = upper(p_code);
  if not found or cur.sec_hash <> encode(extensions.digest('gft:' || coalesce(p_sec,''), 'sha256'), 'hex') then raise exception 'not owner'; end if;
  return query
    with u as (update gf_gift g set claimed_at = now() where g.to_code = cur.code and g.claimed_at is null returning g.from_nick, g.from_code, g.amt, g.at)
    select u.from_nick, u.from_code, u.amt, u.at from u order by u.at limit 200;
end $$;

-- 오늘 보낸 양(보내기 창에 남은 한도 표시)
create or replace function public.gf_gift_left(p_pid text)
returns integer language sql security definer set search_path to 'public' as $$
  select 1000 - coalesce(sum(amt),0)::int from gf_gift where from_pid = p_pid and day = (now() at time zone 'Asia/Seoul')::date;
$$;

-- 닉네임으로 공개 수족관 찾기(정확히 같은 이름 먼저, 그다음 앞부분이 같은 이름) · 최대 10명
create or replace function public.gf_tank_find(p_nick text)
returns table(code text, nick text, fishn integer, house integer, updated_at timestamptz)
language sql security definer set search_path to 'public' as $$
  select t.code, t.nick, coalesce(jsonb_array_length(t.data->'f'),0), coalesce((t.data->>'h')::int,0), t.updated_at
  from gf_tank t
  where t.pub and length(replace(replace(trim(coalesce(p_nick,'')),'%',''),'_','')) >= 1 and t.nick ilike replace(replace(trim(p_nick),'%',''),'_','') || '%'
  order by (lower(t.nick) = lower(trim(p_nick))) desc, t.updated_at desc
  limit 10;
$$;

revoke all on function public.gf_gift_send(text,text,text,text,integer) from public;
revoke all on function public.gf_gift_claim(text,text) from public;
revoke all on function public.gf_gift_left(text) from public;
revoke all on function public.gf_tank_find(text) from public;
grant execute on function public.gf_gift_send(text,text,text,text,integer) to anon, authenticated;
grant execute on function public.gf_gift_claim(text,text) to anon, authenticated;
grant execute on function public.gf_gift_left(text) to anon, authenticated;
grant execute on function public.gf_tank_find(text) to anon, authenticated;
