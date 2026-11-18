# 아가미시티(물고기 마을) 소스
- `python3 build.py` (이 폴더에서) → `city.html` 한 파일로 묶음. 결과를 `work/city.html`로 복사
- 그림: helpers.js · palace25.js(산호궁 25단계) · bart.js(건물 19종) · zart.js / zart2.js(구역 1~5단계)
- 데이터: village-data.js(비용 · 시간 · 물림 조건), village-sim.js(3개월 진행 시뮬: `node village-sim.js`)
- 본체: shell.html(화면 틀) + game.js(+cityz · gate · desc · extra~extra4 · ux가 자리표시로 들어감)
- 본게임 연결: work/parts/city_entry_1130.js (GF_WALLET · 홈 '마을' 버튼 · iframe)
- 설계 문서: 프로젝트 「아가미파이터_물고기마을_9차~26차」
