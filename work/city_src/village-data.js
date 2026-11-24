/* 아가미시티 토대 데이터 — 진주로 짓고, 보석으로 빨리, 서로 물고 물리는 조건
   단위: 진주 🫧(본게임과 같은 돈) · 산호석 🪨 · 산호 벽돌 🧱 · 진주 못 📌 · 시간(초)
   규칙
   1) 어떤 건물도 산호궁 레벨보다 높게 못 올림 (화이트아웃식)
   2) 산호궁 Lv.N 은 '정해진 건물 2~3개가 Lv.N-1' 이어야 올림
   3) 건물끼리도 물림: 공장은 농장, 학교는 식당, 열차역은 공방 … 같은 레벨 이상이어야 올림
   4) 재료도 물림: 산호석은 광산, 벽돌은 가마(광산의 돌을 구움), 못은 진주 양식장 → 비싼 단계일수록 상위 재료가 필요
   5) 빨리 짓기는 보석만: 남은 시간 5분 이하는 무료, 그 위는 1분당 보석 1
*/
(function(root){
var HMAX=25;
/* 산호궁 레벨별 공사 시간(초) — 첫날은 금방, 한 달 뒤엔 하루 넘게, 마지막 달은 3~5일 */
var HT=[0,0,60,120,300,600,1200,2400,3600,5400,7200,10800,14400,21600,28800,36000,43200,57600,72000,86400,115200,144000,172800,230400,288000,388800];
/* 산호궁 진주 비용: Lv.2 300 → Lv.25 약 8.6만 */
var PB=(typeof process!=='undefined'&&process.env.PB)?+process.env.PB:140,PG=(typeof process!=='undefined'&&process.env.PG)?+process.env.PG:1.2;
function hallPearl(L){if(L<2)return 0;return r100(PB*Math.pow(PG,L-2))}
function r100(v){return v<1000?Math.round(v/10)*10:v<10000?Math.round(v/100)*100:Math.round(v/1000)*1000}

/* 건물: n 이름, at 열리는 산호궁 레벨, cm 비용 배수(산호궁 같은 레벨 대비), tm 시간 배수, need 같이 물린 건물(같은 레벨-off 이상) */
var B={
 hall:   {n:'산호궁',at:1,cm:1,tm:1},
 pump:   {n:'산소 펌프',at:1,cm:.25,tm:.35,role:'산소 · 집을 지을 수 있는 범위'},
 quarry: {n:'산호 광산',at:1,cm:.3,tm:.4,role:'산호석 생산',prod:{stone:+(process.env.SP||7)}},
 farm:   {n:'다시마 농장',at:1,cm:.3,tm:.4,role:'다시마 생산',prod:{kelp:30}},
 crab:   {n:'게 일꾼 숙소',at:2,cm:.35,tm:.45,role:'동시에 짓는 게 일꾼 수',need:[['quarry',0]]},
 factory:{n:'경단 공장',at:2,cm:.4,tm:.5,role:'다시마 → 경단(🍡 주민 밥 · 주문)',need:[['farm',0]]},
 store:  {n:'조개 창고',at:3,cm:.3,tm:.4,role:'재료 보관 한도',need:[['quarry',-1]]},
 turtle: {n:'거북 배달소',at:3,cm:.35,tm:.45,role:'주문 배달 → 진주 수입',need:[['factory',-1]]},
 diner:  {n:'말미잘 식당',at:4,cm:.35,tm:.45,role:'인구 한도 +',need:[['factory',-1]]},
 sew:    {n:'해초 공방',at:5,cm:.4,tm:.5,role:'다시마 → 옷(👕)',need:[['farm',0]]},
 school: {n:'해마 학교',at:6,cm:.45,tm:.55,role:'인구 한도 + · 땅값 +',need:[['diner',-1]]},
 kiln:   {n:'벽돌 가마',at:7,cm:.45,tm:.55,role:'산호석 → 산호 벽돌(🧱)',need:[['quarry',0]],prod:{brick:+(process.env.BP||1.2)}},
 pearl:  {n:'진주 양식장',at:8,cm:.5,tm:.6,role:'진주 생산(본게임에도 씀) · 진주 못(📌)',need:[['pump',-1]],prod:{pearl:.5,nail:+(process.env.NP||.5)}},
 train:  {n:'해류 열차역',at:9,cm:.5,tm:.6,role:'열차 주문 → 벽돌 · 못 보상',need:[['sew',-1],['turtle',0]]},
 clinic: {n:'불가사리 병원',at:10,cm:.5,tm:.6,role:'인구 한도 + · 행복 +',need:[['school',-1]]},
 fire:   {n:'거품 소방서',at:6,cm:.35,tm:.45,role:'범위 안 건물이 3단계 이상 자람',need:[['pump',-1]]},
 police: {n:'해마 순찰대',at:9,cm:.4,tm:.5,role:'범위 안 건물이 4단계 이상 자람',need:[['school',-1]]},
 aqua:   {n:'아가미 수족관',at:12,cm:.6,tm:.65,role:'관광객 → 진주 · 본게임 수족관과 연결',need:[['pearl',-1]]},
 port:   {n:'고래 항구',at:15,cm:.6,tm:.7,role:'먼 바다 교역 · 희귀 재료',need:[['train',-1]]},
 palace: {n:'용왕 궁전',at:20,cm:.7,tm:.75,role:'최종 랜드마크 · 마을 전체 진주 +',need:[['aqua',-1],['port',-1]]}
};
/* 산호궁 Lv.N 에 필요한 건물(모두 Lv.N-1) — 돌아가며 바뀌어 모든 건물을 키우게 함 */
var HREQ={2:['quarry'],3:['farm','crab'],4:['factory','pump'],5:['store','turtle'],6:['diner','quarry'],7:['sew','crab'],8:['school','farm'],9:['kiln','factory'],
 10:['pearl','store'],11:['train','turtle'],12:['clinic','diner'],13:['quarry','sew'],14:['aqua','school'],15:['kiln','crab'],16:['port','pearl'],17:['train','factory'],
 18:['clinic','farm'],19:['aqua','store'],20:['port','kiln'],21:['palace','school'],22:['pearl','turtle'],23:['train','clinic'],24:['palace','aqua'],25:['port','crab','pearl']};

/* 레벨 L 로 올리는 비용 · 시간 */
function cost(id,L){var b=B[id],p=id==='hall'?hallPearl(L):r100(hallPearl(Math.max(2,L))*b.cm*(L===1?.5:1)),c={pearl:p,stone:r100(p*.6)};
  if(L>=8)c.brick=Math.round(p*(+(process.env.BC||.15)));   /* 8단계부터 벽돌 */
  if(L>=14)c.nail=Math.round(p*(+(process.env.NC||.05)));   /* 14단계부터 진주 못 */
  return c}
function time(id,L){var t=HT[Math.min(HMAX,Math.max(2,L))]*B[id].tm;if(L===1)t=Math.min(t,60*(B[id].at+1));return Math.round(t)}
function needs(id,L){var out=[];if(id==='hall'){(HREQ[L]||[]).forEach(function(k){out.push([k,L-1])})}
  else{out.push(['hall',L]);(B[id].need||[]).forEach(function(n){var lv=L+n[1];if(lv>=1)out.push([n[0],lv])})}return out}
/* 게 일꾼 수 = 숙소 레벨에 따라 1 → 4 */
function crabs(lv){return lv>=18?4:lv>=10?3:lv>=3?2:1}
/* 창고 한도 */
function storeCap(lv){return 3000+lv*lv*1400}
/* 보석 빨리 짓기 */
function rushGems(sec){return sec<=300?0:Math.ceil((sec-300)/60)}
/* 생산(시간당) — 레벨 배수 */
function prodPerHour(id,lv){var p=B[id].prod;if(!p||!lv)return {};var o={},k;for(k in p)o[k]=p[k]*lv*(1+lv*.08);return o}

var D={HMAX:HMAX,B:B,HREQ:HREQ,HT:HT,cost:cost,time:time,needs:needs,crabs:crabs,storeCap:storeCap,rushGems:rushGems,prodPerHour:prodPerHour,hallPearl:hallPearl};
if(typeof module!=='undefined')module.exports=D;else root.VDATA=D;
})(this);
