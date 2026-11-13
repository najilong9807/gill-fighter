/* ===== 1.1.28 늑구 '보상함: 「판」이라고 하지 말고 「게임」으로' (한국어만 · 다른 언어는 원래 Game/ゲーム)
   보상함 창의 글자(미션 이름 · 설명 · 자동 받기 · 빈 칸 안내)와 보상함 알림 문구에서 판 → 게임
   (예: 싱글 3판 하기 → 싱글 3게임 하기 · 한 판 → 한 게임 · 판이 끝나면 → 게임이 끝나면). 장판 · 빨판 같은 낱말은 그대로 ===== */
abyTr(TRT,{'빈 곳을 밀면 옆으로 가요':'swipe empty water to move'});abyTr(TRJ,{'빈 곳을 밀면 옆으로 가요':'空いた所をスワイプで移動'});
function rbxGameWord(s){if(LANG!=='ko'||!s||s.indexOf('판')<0)return s;
  return s.replace(/(\d+|\{n\})\s?판/g,'$1게임').replace(/(^|[^가-힣])한 판/g,'$1한 게임').replace(/(^|[^가-힣])판(?=이 |이$|을 |마다|에서|에 |의 | 수|$)/g,'$1게임')}
function rbxGameNodes(el){if(!el||LANG!=='ko')return;var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null),n;while((n=w.nextNode())){var v=rbxGameWord(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v}}
var rbxRenderGW=rbxRender;rbxRender=function(){var r=rbxRenderGW.apply(this,arguments);try{rbxGameNodes($('rbxP'))}catch(e){}return r};
var bannerGW=banner;banner=function(a,b){try{if(LANG==='ko'&&typeof b==='string'&&/보상함|자동으로 받아요/.test(b))b=rbxGameWord(b);if(LANG==='ko'&&typeof a==='string'&&/보상/.test(a))a=rbxGameWord(a)}catch(e){}return bannerGW.apply(this,[a,b].concat([].slice.call(arguments,2)))};
