-- 신규 유저 퍼널 (gf_crash 의 kind='nb' 기록, 1.1.13부터 판 기록 · 1.1.14부터 open/tut/ret 단계)
-- 사람 = pid(무작위 기기 번호), 날짜 = 한국시간 처음 본 날
with nb as (
  select pid, at, info->>'v' v, coalesce(info->>'ev','run') ev, (info->>'n')::int n,
         info->>'how' how, (info->>'t')::int t, (info->>'cm')::numeric cm, info->>'m' m, info->>'by' eaten_by
  from gf_crash where info->>'kind'='nb' and at > now() - interval '30 days'),
p as (
  select pid, min(at) first_at,
    bool_or(ev='open') opened, bool_or(ev in ('tut','tutSkip')) tut_done,
    count(*) filter (where ev='run') runs_logged,
    max(n) filter (where ev='run') max_run,
    bool_or(ev like 'ret%') returned,
    min(t) filter (where ev='run' and n=1) first_run_sec,
    min(how) filter (where ev='run' and n=1) first_run_how
  from nb group by pid)
select (first_at at time zone 'Asia/Seoul')::date as day,
  count(*) people, count(*) filter (where opened) opened, count(*) filter (where tut_done) tut_done,
  count(*) filter (where runs_logged>0) played1, count(*) filter (where max_run>=3) played3,
  count(*) filter (where returned) came_back,
  round(avg(first_run_sec)) avg_first_run_sec,
  count(*) filter (where first_run_how='quit') first_run_quit
from p group by 1 order by 1 desc;
