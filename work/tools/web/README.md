# 브라우저 시험 도구 (아가미 파이터 · 아가미시티)

Playwright(설치돼 있음)로 `work/` 를 `http://app.local/` 처럼 열어 시험한다. 바깥 요청은 막힘.

- `lib.js` — 공통 열기(뷰포트 메타 넣기). `seed.json` 시험용 본게임 저장, `bigtown.json` 큰 마을(산호궁 Lv.15)
- `node smoke.js` — 켜기 · 탭 돌기 오류 확인
- `node cov.js 393 ko` — 큰 마을 창마다 글 넘침 · 잘림
- `node monkey.js <seed>` — 마을 막 누르기 300번 / `node monkeytank.js <seed> <lang>` — 수족관 막 누르기(꾹 · 끌기 · 택배 거북)
- `node story.js <lang>` — 물고기 이야기 창 / `node post.js <lang> [w h]` — 마을 택배 거북
- `node crate.js <lang>` — 본게임 판 → 마을 재료 상자
- `node art.js` — 마을 그림 갈아끼우기 확인(CITY_ART) / `node artref.js <폴더>` — 지금 마을 그림을 투명 PNG 로(기준본)
- `node shot_town.js` — 스토어 7번째 후보(마을) 1320×2868 한 · 영 · 일. 먼저 `mkdir fonts && cd fonts && npm i @fontsource/black-han-sans @fontsource/jua`
- `node perf.js` / `node prof.js` — 큰 마을 프레임 · 프로파일, `node svstress.js 8 420 hard` — 심해 생존 후반(work/_sv.html 훅 파일 필요)
- `python3 sync.py` — parts/city_entry.js 를 index.html 에 다시 끼우고 문법 검사
결과 그림 · 기록은 이 폴더에 생기고 git 에는 안 올라감(.gitignore).
