/* ===== 마을 ↔ 수족관 서로 필요하게 (늑구 "1,2,3 만들어서 진행 · 수족관 비중도 작아지지 않게") =====
   ① 수족관 공방: 창고 창 아래 '🐠 수족관 공방' — 마을 재료(남아도는 산호석 · 벽돌 · 못 · 다시마 · 옷)로 내 수족관 전용 소품을 만들어 보냄(GF_AQGIFT)
      산호궁 단계마다 하나씩 열림. 만든 소품은 본게임 수족관 꾸미기 › 소품 '보관'에 들어감(상점에선 안 팖)
   ② 친한 물고기의 응원: 수족관 친밀도 ♥3 이상인 내 물고기가 놀러 와 머무르면 15분 동안 마을 행복 +3/+6/+9(♥3/4/5). 위쪽 칩 '💗+6'
   ③ 마을 '아가미 수족관' 건물 레벨 → 내 수족관 소품 칸 +2/Lv · 집 진주 샘 +1%/Lv (본게임이 gfcity.v1 을 읽어 적용, 여기선 설명만) */
var AQW=[
 {id:'town_bluelight',n:'푸른 등대',at:3,c:{stone:800,kelp:300}},
 {id:'town_kelpcottage',n:'다시마 지붕 오두막',at:5,c:{kelp:1500,cloth:80}},
 {id:'town_brickcastle',n:'산호 벽돌 성',at:7,c:{brick:120,stone:600}},
 {id:'town_pearltable',n:'진주빛 테이블산호',at:9,c:{stone:2000,nail:40}},
 {id:'town_goldarch',n:'황금 산호 아치',at:12,c:{stone:3000,brick:300,nail:120}},
 {id:'town_goldbrain',n:'황금 뇌산호',at:15,c:{stone:6000,nail:200}}];
function aqwHtml(){if(!EMB||!window.parent.GF_AQGIFT)return '';var L=hallLv(),h='<h3 class="aqwh">🐠 수족관 공방</h3><p class="role">마을 재료로 <b>내 수족관 전용 소품</b>을 만들어 보내요 · 수족관 › 꾸미기 › 소품에 들어가요</p><div class="aqw">';
  AQW.forEach(function(w,i){var open=L>=w.at,ok=open&&Object.keys(w.c).every(function(k){return (G.res[k]||0)>=w.c[k]});
    h+='<div class="aqr'+(open?'':' off')+'"><img src="svart/dc_'+w.id+'.webp" alt=""><div class="tx"><b>'+w.n+'</b><small>'+(open?Object.keys(w.c).map(function(k){var have=(G.res[k]||0)>=w.c[k];return '<span class="'+(have?'':'no')+'">'+ICON[k]+fmt(w.c[k])+'</span>'}).join(' '):'🔒 🏛 산호궁 Lv.'+w.at)+'</small></div><button data-aq="'+i+'"'+(ok?'':' disabled')+'>만들기</button></div>'});
  return h+'</div>'}
function aqwMake(i){var w=AQW[i];if(!w||hallLv()<w.at)return;for(var k in w.c)if((G.res[k]||0)<w.c[k]){toast('재료가 모자라요');return}
  var ok=false;try{ok=window.parent.GF_AQGIFT(w.id)}catch(e){}if(!ok){toast('지금은 보낼 수 없어요');return}for(k in w.c)G.res[k]-=w.c[k];try{undoClear()}catch(e){}
  snd('done');addXP(10);sparkle(VW/2,VH*.4,20);toast('🐠 '+w.n+' · 내 수족관으로 보냈어요');save();hud();storePanel()}
var _storePanelA=storePanel;storePanel=function(){var r=_storePanelA.apply(this,arguments);try{var x=aqwHtml();if(x){var el=$('panel');el.insertAdjacentHTML('beforeend',(window.CITY_TR||String)(x));el.querySelectorAll('[data-aq]').forEach(function(b){b.onclick=function(){aqwMake(+b.dataset.aq)}})}}catch(e){}return r};
/* ② 응원 */
function cheerV(){return G.cheer&&NOW()<G.cheer.until?G.cheer.v|0:0}
var _visTickA=visTick;visTick=function(dt,now){var st0=VIS&&VIS.st;var r=_visTickA.apply(this,arguments);try{if(VIS&&st0!=='stay'&&VIS.st==='stay'&&(VIS.f.lv|0)>=3){var v=3*Math.min(3,(VIS.f.lv|0)-2);
    G.cheer={until:NOW()+15*60000,v:Math.max(cheerV(),v),n:VIS.f.n};save();toast('💗 '+VIS.f.n+' ♥'+VIS.f.lv+' · 마을을 응원해요 · 행복 +'+G.cheer.v+' (15분)');snd('lvl')}}catch(e){}return r};
/* 위쪽 칩 */
var _hudA=hud;hud=function(){var r=_hudA.apply(this,arguments);try{var c=$('hCh'),v=cheerV();if(!c&&v){var row=document.querySelector('#top .r2');if(row){c=document.createElement('span');c.className='chip';c.id='hCh';c.style.background='#ffe3ee';row.appendChild(c)}}
    if(c){c.hidden=!v;if(v){var m=Math.ceil((G.cheer.until-NOW())/60000),t='💗 <b>+'+v+'</b> '+m+'분';if(c.dataset.t!==t){c.dataset.t=t;c.innerHTML=t}}}}catch(e){}return r};
(function(){var st=document.createElement('style');st.textContent='.aqwh{margin:12px 0 2px;font-size:16px}.aqw{display:flex;flex-direction:column;gap:6px}.aqr{display:flex;align-items:center;gap:8px;padding:6px 8px;border:2px solid var(--ink);border-radius:12px;background:#fff}.aqr.off{opacity:.55}'+
 '.aqr img{width:46px;height:46px;object-fit:contain;flex:none}.aqr .tx{flex:1;min-width:0;display:flex;flex-direction:column}.aqr .tx b{font-size:14px}.aqr small{font-size:12px;color:#5a6a88}.aqr small span{margin-right:5px;white-space:nowrap}.aqr small .no{color:#b8323f;font-weight:800}'+
 '.aqr button{flex:none;height:34px;padding:0 11px;border:2px solid var(--ink);border-radius:10px;background:#ffd54a;font:inherit;font-weight:900}.aqr button:disabled{background:#eceff4;color:#9aa3b5}';document.head.appendChild(st)})();
