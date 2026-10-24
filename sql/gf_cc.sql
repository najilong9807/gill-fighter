-- 1.1.16 랭킹 국기: 기기 지역 설정의 나라 코드(두 글자)만 저장. 숨기기를 고르면 빈 값('')
-- 새 표 · 새 함수만 추가(기존 함수 · 표는 그대로라 옛 앱은 영향 없음)
create table if not exists public.gf_cc(
  pid text primary key,
  cc text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.gf_cc enable row level security; -- 정책 없음: 직접 읽기 · 쓰기 불가, 아래 함수로만

create or replace function public.gf_set_cc(p_pid text, p_cc text)
returns boolean language plpgsql security definer set search_path = public as $$
declare c text := upper(coalesce(p_cc, ''));
begin
  if p_pid is null or length(p_pid) < 8 or length(p_pid) > 40 then return false; end if;
  if c <> '' and c !~ '^[A-Z]{2}$' then return false; end if;
  insert into gf_cc(pid, cc, updated_at) values (p_pid, c, now())
  on conflict (pid) do update set cc = excluded.cc, updated_at = now()
  where gf_cc.cc is distinct from excluded.cc;
  return true;
end $$;

-- 랭킹 상위 30명 + 나라 코드(전체 · 이번 주 · 지난주). 기기 번호는 돌려주지 않음
create or replace function public.gf_top_cc(p_mode text, p_week boolean default false, p_prev boolean default false)
returns table(nick text, fish text, score numeric, cc text)
language sql stable security definer set search_path = public as $$
  select t.nick, t.fish, t.score, t.cc from (
    select s.nick, s.fish, s.score, coalesce(c.cc, '') as cc, s.updated_at as u
    from gf_scores s left join gf_cc c on c.pid = s.pid
    where not p_week and s.mode = p_mode
    union all
    select g.nick, g.fish, g.score, coalesce(c.cc, ''), g.updated_at
    from gf_week g left join gf_cc c on c.pid = g.pid
    where p_week and g.mode = p_mode and g.wk = gf_wk(p_prev)
  ) t(nick, fish, score, cc, u)
  order by t.score desc, t.u asc limit 30
$$;

grant execute on function public.gf_set_cc(text, text) to anon, authenticated;
grant execute on function public.gf_top_cc(text, boolean, boolean) to anon, authenticated;
