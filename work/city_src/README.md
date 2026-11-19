# 아가미시티(물고기 마을) 소스
- `python3 build.py` (이 폴더에서) → `city.html` 한 파일로 묶음. 결과를 `work/city.html`로 복사
- 그림: helpers.js · palace25.js(산호궁 25단계) · bart.js(건물 19종) · zart.js / zart2.js(구역 1~5단계)
- 데이터: village-data.js(비용 · 시간 · 물림 조건), village-sim.js(3개월 진행 시뮬: `node village-sim.js`)
- 본체: shell.html(화면 틀) + game.js(+cityz · gate · desc · extra~extra4 · ux가 자리표시로 들어감)
- 본게임 연결: work/parts/city_entry_1130.js — 아래 탭 다섯째 칸 '마을'(svart/ic_town.webp, 원본 ic_town.svg) · GF_WALLET · 탭 빨간 점(gfcity.hint) · 오늘의 미션 'town' · GF_GO/GF_BUZZ
  고친 뒤: work/index.html 안 같은 자리에도 똑같이 넣기(부트 줄 바로 앞) → 저장소 맨 위에서 python3 work/city_src/to_patch.py
- 설계 문서: 프로젝트 「아가미파이터_물고기마을_9차~26차」
