-- 1.1.17 친구 초대: 코드를 넣은 순간 인터넷이 끊겨 응답을 못 받았을 때,
-- 같은 기기가 같은 코드로 다시 넣으면 2(성공)를 돌려줘서 보상을 받을 수 있게 함. 앱은 1과 2를 모두 성공으로 처리(이미 반영).
create or replace function public.gf_invite_use(p_code text, p_pid text)
returns integer language plpgsql security definer set search_path to 'public' as $$
declare c text := upper(coalesce(p_code,'')); n int; prev text;
begin
  if p_pid is null or p_pid !~ '^[a-z0-9]{12,40}$' then raise exception 'bad pid'; end if;
  if c !~ '^[A-Z0-9]{6}$' or not exists(select 1 from gf_tank t where t.code = c) then return -1; end if;
  select code into prev from gf_invite where pid = p_pid;
  if found then
    if prev = c then return 2; end if;
    return 0;
  end if;
  select count(*) into n from gf_invite where code = c;
  if n >= 50 then return -2; end if;
  insert into gf_invite(pid, code) values (p_pid, c) on conflict do nothing;
  if found then return 1; end if;
  select code into prev from gf_invite where pid = p_pid;
  if prev = c then return 2; end if;
  return 0;
end $$;
revoke all on function public.gf_invite_use(text,text) from public;
grant execute on function public.gf_invite_use(text,text) to anon, authenticated;
