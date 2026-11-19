# 아가미시티 건물 그림 — 21일 힉스필드용 목록

- 파일 이름 = 받은 그림을 저장할 이름(`<id>_<단계>.png`) → `python3 work/city_src/art_import.py <폴더>` 로 한 번에 넣음
- 참고 그림: 같은 이름의 `docs/city_artref/<id>_<단계>.webp`(각도 · 땅 크기) + 본게임 소품 그림 한 장(그림체, 예: svart/dc_ 로 시작하는 수족관 궁전 · 산호 집)
- 공통 앞말(모든 그림): `isometric 2:1 game building for a cute underwater fish town, soft painted 3D cartoon style like the reference decoration, warm soft light, sitting on a small square sand tile, plain white background, centered, no text, no letters, no shadow outside the tile,`
- 땅 칸: 1칸 = pump · 구역 집(z*) · 1칸 장식 / 3칸 = hall · palace / 나머지 2칸 — 큰 건물일수록 땅 타일을 넓게
- 처음엔 ★ 3장만 그려 마을 안에서 비교한 뒤 나머지

## 산호궁 (3칸, 단계별 6장)
| 파일 | 이름 | 그릴 것(공통 앞말 뒤에) |
|---|---|---|
| ★ hall_1 | 산호궁 Lv.1 | small pink coral cottage with a scallop-shell dome roof and one round door |
| hall_5 | 산호궁 Lv.5 | pink coral house with a golden scallop dome, small red flag, coral plants at the corners |
| hall_10 | 산호궁 Lv.10 | coral palace with a golden ribbed dome, two teal towers with red cone roofs, kelp around |
| hall_15 | 산호궁 Lv.15 | bigger coral palace, golden dome, three towers, round blue windows, small front stairs |
| hall_20 | 산호궁 Lv.20 | grand coral palace, golden domes, four towers with flags, pink arch gate in front |
| hall_25 | 산호궁 Lv.25 | magnificent pearl-white and lavender coral palace, golden crown dome, jellyfish lanterns floating, glowing |

## 건물 (2칸, 펌프만 1칸)
| 파일 | 이름 | 그릴 것 |
|---|---|---|
| pump_1 | 산소 펌프 (1칸) | teal glass tube oxygen pump with bubbles rising, cone cap |
| ★ quarry_1 | 산호 광산 | grey coral-stone rocks with pink crystal spikes and a wooden crane arm, sand ground |
| farm_1 | 다시마 농장 | brown soil field with neat rows of green kelp sprouts |
| crab_1 | 게 일꾼 숙소 | orange dome hut with a scallop roof, small crab at the door |
| factory_1 | 경단 공장 | small white factory with a chimney, pink sign with a rice-dumpling icon |
| store_1 | 조개 창고 | big pink clam-shell warehouse with wooden crates beside it |
| turtle_1 | 거북 배달소 | green hexagon-patterned turtle-shell building with parcel boxes, little turtle sign |
| diner_1 | 말미잘 식당 | cozy diner with a purple sea-anemone roof, striped awning |
| sew_1 | 해초 공방 | small workshop with a green seaweed roof and a spool sign |
| school_1 | 해마 학교 | yellow school with a blue pointed bell tower and round windows |
| kiln_1 | 벽돌 가마 | round orange brick kiln dome with a tall chimney and stacked bricks |
| pearl_1 | 진주 양식장 | blue pool with oysters and pearls, small pink dome hut at the corner |
| train_1 | 해류 열차역 | small station platform with a teal roof and a little yellow tram car |
| clinic_1 | 불가사리 병원 | white clinic with a gold starfish on the roof, blue door |
| fire_1 | 거품 소방서 | red fire station with a bubble tower and big garage door |
| police_1 | 해마 순찰대 | blue police station with a gold star on top, seahorse badge |
| aqua_1 | 아가미 수족관 | glass dome aquarium full of small colorful fish on a white base |
| port_1 | 고래 항구 | wooden pier with a crane and a friendly blue whale resting beside it |
| palace_1 (3칸) | 용왕 궁전 | Korean-style dragon king palace, gold roofs, lavender walls, coral garden |

## 구역 집 (1칸, 종류 × 단계 15장 — 색 다른 두 가지 zR1 · zR2 등은 a 로 같이 씀)
| 파일 | 그릴 것 |
|---|---|
| zR0_1 | tiny pink residential cottage with a scallop dome roof |
| zR0_2 | small two-floor pink house with a red pointed roof |
| ★ zR0_3 | round pink tower house with a golden dome and round windows |
| zR0_4 | tall pink apartment with many windows and a small rooftop garden |
| zR0_5 | slim pink coral high-rise with two golden-domed towers |
| zC0_1 | small shop with a pink roof and round lights |
| zC0_2 | two-floor shop with a shopping-bag sign and a big window |
| zC0_3 | glass dome shopping hall with an orange ring |
| zC0_4 | tall shopping tower with a pink top and a bag sign |
| zC0_5 | shiny blue glass skyscraper with a gold spire |
| zI0_1 | small grey workshop with an orange roof |
| zI0_2 | grey factory with a chimney and a round window |
| zI0_3 | factory with two chimneys and an orange roof |
| zI0_4 | big factory with three chimneys and blue windows |
| zI0_5 | tall industrial tower with a yellow top and antenna |

## 장식
| 파일 | 칸 | 그릴 것 |
|---|---|---|
| d_coral_1 | 1 | small coral flowerbed, red and purple corals |
| d_kelp_1 | 1 | kelp garden, three green kelp strands and a pebble |
| d_bench_1 | 1 | pink clam-shell bench |
| d_lamp_1 | 1 | jellyfish street lamp, glowing pink jelly on a pole |
| d_fount_1 | 2 | pearl fountain, round basin with a big pearl on top and water |
| d_statue_1 | 2 | golden fish statue on a white pedestal, glowing |
| d_whale_1 | 2 | small friendly blue whale statue spouting water |
| d_shipw_1 | 2 | small cute shipwreck with a mast, coral growing on it |
| d_xtree_1 | 2 | coral christmas tree with ornaments and a gold star |
| d_snow_1 | 1 | snowman made of sea foam with a black hat and red scarf |
| d_ice_1 | 2 | small ice coral palace with blue towers |
| d_seal_1 | 1 | grey seal statue in a little pool |
| d_jlan_1 | 1 | three glowing jellyfish lanterns in yellow, orange and pink |
| d_balloon_1 | 1 | three bubble balloons, red, yellow and blue, tied to a tile |
| d_stage_1 | 2 | festival stage with bunting flags and a star |

## 수족관 공방 소품 (svart/dc_town_*.webp 를 바로 덮어씀 · 투명 배경 · 크기 기존과 비슷하게)
푸른 등대 · 다시마 지붕 오두막 · 산호 벽돌 성 · 진주빛 테이블산호 · 황금 산호 아치 · 황금 뇌산호 — 본게임 수족관 소품과 같은 그림체, 지금 그림(기존 소품 색만 바꾼 것)을 참고 그림으로
