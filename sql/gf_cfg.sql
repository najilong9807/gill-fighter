-- 대전 원격 설정 (1.1.14 앱이 켜질 때 rpc/gf_cfg 로 한 번 읽음)
-- 없으면 앱 기본값: 바다 2개 · 바다당 4명 · 가까우면 초당 5번 · 멀면 2.5번 · 홈 접속자 수 끔
-- 바꾸는 법: update gf_cfg set v = jsonb_set(v,'{shards}','5') where k='arena';  (대시보드 SQL 편집기에서, 종한님만)
-- 아직 배포하지 않음 — 종한 OK 뒤 적용

create table if not exists public.gf_cfg (
  k text primary key,
  v jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.gf_cfg enable row level security;   -- 정책 없음 = 앱(anon)은 직접 읽기 · 쓰기 못 함

insert into public.gf_cfg (k, v) values
  ('arena', '{"shards":2,"per":4,"hzNear":5,"hzFar":2.5,"rt":1,"lobby":0}')
on conflict (k) do nothing;

-- 앱은 이 함수로만 읽음(쓰기 불가)
create or replace function public.gf_cfg(p_v text default null)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$ select v from public.gf_cfg where k = 'arena' $$;

revoke all on function public.gf_cfg(text) from public;
grant execute on function public.gf_cfg(text) to anon, authenticated;

-- 요금제별 권장값 (사람² × 초당 보내는 수 × 바다 수 ≤ 한도의 80%)
--   Free  (초당 100):  shards 2,  per 4
--   Pro   (초당 500):  shards 10, per 4
--   Pro 지출 한도 끔 (초당 2,500): shards 50, per 4
