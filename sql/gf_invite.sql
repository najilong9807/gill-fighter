-- 1.1.17 친구 초대 보상: 새로 시작한 사람(처음 3일 안)이 친구의 수족관 코드를 넣으면 둘 다 보상
-- 기기(pid)마다 한 번만 쓸 수 있음, 코드 하나에 최대 50명. 초대한 사람은 앱을 켤 때 gf_invite_claim 으로 새로 생긴 수를 받아 감
-- 기존 표 · 함수는 건드리지 않음(옛 앱 영향 없음)
create table if not exists public.gf_invite(
  pid text primary key,
  code text not null,
  at timestamptz not null default now(),
  claimed boolean not null default false
);
create index if not exists gf_invite_code on public.gf_invite(code) where not claimed;
alter table public.gf_invite enable row level security;
revoke all on public.gf_invite from anon, authenticated;
comment on table public.gf_invite is '아가미파이터 친구 초대. 쓰기는 gf_invite_use, 받기는 gf_invite_claim RPC로만.';

create or replace function public.gf_invite_use(p_code text, p_pid text)
returns integer language plpgsql security definer set search_path to 'public' as $$
declare c text := upper(coalesce(p_code,'')); n int;
begin
  if p_pid is null or p_pid !~ '^[a-z0-9]{12,40}$' then raise exception 'bad pid'; end if;
  if c !~ '^[A-Z0-9]{6}$' or not exists(select 1 from gf_tank t where t.code = c) then return -1; end if;
  select count(*) into n from gf_invite where code = c;
  if n >= 50 then return -2; end if;
  insert into gf_invite(pid, code) values (p_pid, c) on conflict do nothing;
  if found then return 1; end if;
  return 0;
end $$;

create or replace function public.gf_invite_claim(p_code text, p_sec text)
returns integer language plpgsql security definer set search_path to 'public' as $$
declare cur public.gf_tank%rowtype; n int;
begin
  select * into cur from gf_tank t where t.code = upper(p_code);
  if not found or cur.sec_hash <> encode(extensions.digest('gft:' || coalesce(p_sec,''), 'sha256'), 'hex') then raise exception 'not owner'; end if;
  with u as (update gf_invite set claimed = true where code = cur.code and not claimed returning 1) select count(*) into n from u;
  return n;
end $$;

revoke all on function public.gf_invite_use(text,text) from public;
revoke all on function public.gf_invite_claim(text,text) from public;
grant execute on function public.gf_invite_use(text,text) to anon, authenticated;
grant execute on function public.gf_invite_claim(text,text) to anon, authenticated;
