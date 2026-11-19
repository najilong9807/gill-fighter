/* ===== 주간 마을 의뢰 (재미 개선 3: 중반 목표 + 진주 되돌려 주기) =====
   - 산호궁 Lv.5부터. 매주 월요일 0시에 의뢰 3개(주마다 정해진 섞기), 오른쪽 📜 버튼 · 받을 게 있으면 빨간 점
   - 의뢰마다 진주(산호궁 단계 짓기 값의 60%) · 명성. 3개 다 하면 💎5 + 진주 한 번 더(1.5배)
     → 산호궁 15 기준 한 주 약 진주 4,500 · 보석 5 (본게임 진주를 덜 가져가게)
   - 종류: 주문 배달 · 말풍선 받기 · 건물 업그레이드 · 구역 건물 단계 · 인구 · 장식 놓기 · 재료 상자 열기(본게임 판) */
var WQ_POOL=[
 {k:'ord',ic:'🐢',t:function(g){return '거북 배달소에서 주문 '+g+'개 배달하기'},g:function(L){return 6+Math.round(L/2)}},
 {k:'col',ic:'🫧',t:function(g){return '건물 말풍선 '+g+'번 받기'},g:function(L){return 20+L}},
 {k:'up',ic:'⬆',t:function(g){return '건물 '+g+'번 업그레이드하기'},g:function(L){return 3+Math.round(L/6)}},
 {k:'zup',ic:'🏘',t:function(g){return '구역 건물 단계 '+g+'번 올리기'},g:function(L){return 4+Math.round(L/3)}},
 {k:'pop',ic:'🐟',t:function(g){return '인구 '+g+' 만들기'},g:function(L){return Math.round((CS.pop||0)+30+L*3)},abs:1},
 {k:'dec',ic:'🌸',t:function(g){return '장식 '+g+'개 놓기'},g:function(){return 3}},
 {k:'box',ic:'📦',t:function(g){return '판에서 모은 재료 상자 '+g+'개 열기'},g:function(){return 6},emb:1}];
function wqWeek(){var d=new Date(NOW()),m=new Date(d.getFullYear(),d.getMonth(),d.getDate()-((d.getDay()+6)%7));return {k:m.getFullYear()+'-'+(m.getMonth()+1)+'-'+m.getDate(),end:+m+7*864e5}}
function zLvSum(){var s=0;G.b.forEach(function(b){if(isZ(b.k))s+=b.lv|0});return s}
function wqState(){if(hallLv()<5)return null;var W=wqWeek();if(!G.wq||G.wq.wk!==W.k){var L=hallLv(),pool=WQ_POOL.filter(function(q){return !q.emb||EMB}),h=0,i;for(i=0;i<W.k.length;i++)h=(h*31+W.k.charCodeAt(i)+(G.seed|0))>>>0;
    var pick=[];while(pick.length<3&&pool.length){h=(h*1103515245+12345)>>>0;pick.push(pool.splice((h>>>8)%pool.length,1)[0])}
    G.wq={wk:W.k,L:L,z0:zLvSum(),q:pick.map(function(q){return {k:q.k,goal:q.g(L),v:0,got:0}}),all:0};save()}return G.wq}
function wqDef(k){for(var i=0;i<WQ_POOL.length;i++)if(WQ_POOL[i].k===k)return WQ_POOL[i]}
function wqVal(q){var S=G.wq;if(q.k==='pop')return CS.pop||0;if(q.k==='zup')return Math.max(0,zLvSum()-(S.z0|0));return q.v|0}
function wqAdd(k,n){var S=wqState();if(!S)return;S.q.forEach(function(q){if(q.k===k&&!q.got)q.v=(q.v|0)+(n||1)});wqDot()}
function wqRw(){var L=(G.wq&&G.wq.L)||hallLv();return Math.max(100,Math.round(D.hallPearl(Math.max(2,L))*.6/10)*10)}
function wqReady(){var S=wqState();if(!S)return 0;var n=S.q.filter(function(q){return !q.got&&wqVal(q)>=q.goal}).length;if(!S.all&&S.q.every(function(q){return q.got}))n++;return n}
function wqDot(){var b=$('bWq');if(!b)return;var on=hallLv()>=5;b.hidden=!on;if(!on)return;var e=b.querySelector('em');if(e)e.hidden=!wqReady()}
function wqPanel(){var S=wqState(),el=$('panel'),W=wqWeek();if(!S)return;var rw=wqRw(),h='<button class="x" id="pX">✕</button><h2>📜 이번 주 마을 의뢰</h2><p class="role">새 의뢰까지 <b>'+dur((W.end-NOW())/1000)+'</b> · 하나에 🫧'+fmt(rw)+' · 셋 다 하면 💎5 + 🫧'+fmt(Math.round(rw*1.5))+'</p><div class="wq">';
  S.q.forEach(function(q,i){var d=wqDef(q.k),v=Math.min(q.goal,wqVal(q)),ok=v>=q.goal;h+='<div class="wqr'+(q.got?' got':ok?' can':'')+'"><span class="ic">'+d.ic+'</span><div class="tx"><b>'+d.t(q.goal)+'</b><i class="bar"><u style="width:'+Math.round(v/q.goal*100)+'%"></u></i><small>'+fmt(v)+' / '+fmt(q.goal)+'</small></div>'+(q.got?'<em>✓ 받음</em>':'<button data-w="'+i+'"'+(ok?'':' disabled')+'>받기</button>')+'</div>'});
  var allOk=S.q.every(function(q){return q.got});h+='<div class="wqr all'+(S.all?' got':allOk?' can':'')+'"><span class="ic">🎁</span><div class="tx"><b>의뢰 3개 모두 끝내기</b><small>💎5 · 🫧'+fmt(Math.round(rw*1.5))+'</small></div>'+(S.all?'<em>✓ 받음</em>':'<button data-w="all"'+(allOk?'':' disabled')+'>받기</button>')+'</div></div>';
  el.innerHTML=h;el.hidden=false;panelFor=null;$('pX').onclick=closePanel;
  el.querySelectorAll('[data-w]').forEach(function(b){b.onclick=function(){var w=b.dataset.w,c=centerOf(bOf('hall'));if(w==='all'){if(S.all||!allOk)return;S.all=1;WAL.add('gem',5);WAL.add('pearl',Math.round(rw*1.5));addXP(30);snd('lvl');sparkle(VW/2,VH*.35,30);toast('🎁 이번 주 의뢰를 다 끝냈어요! 💎5 · 🫧'+fmt(Math.round(rw*1.5)))}
    else{var q=S.q[+w];if(q.got||wqVal(q)<q.goal)return;q.got=1;WAL.add('pearl',rw);addXP(15);snd('coin');sparkle(VW/2,VH*.4,14);toast('📜 의뢰 완료! 🫧+'+fmt(rw))}save();gfEv('wq');wqPanel();wqDot();hud()}})}
/* 버튼(축제 버튼 위) */
(function(){var s=$('side'),ev=$('bEvt');if(!s||$('bWq'))return;var b=document.createElement('button');b.id='bWq';b.setAttribute('aria-label','마을 의뢰');b.style.cssText='position:relative;flex-direction:column;background:#e8f1ff';b.innerHTML='📜<small>의뢰</small><em hidden></em>';s.insertBefore(b,ev||null);b.onclick=function(){closeBuild();wqPanel()};
  var st=document.createElement('style');st.textContent='#bWq em{position:absolute;right:-5px;top:-5px;width:14px;height:14px;border-radius:7px;background:#ff5d5d;border:2px solid var(--ink)}#bWq small{font-size:10px}'+
   '.wq{display:flex;flex-direction:column;gap:7px}.wqr{display:flex;align-items:center;gap:9px;padding:8px 9px;border:2px solid var(--ink);border-radius:13px;background:#fff}.wqr.can{background:#fff7d6}.wqr.got{opacity:.6}.wqr.all{background:#eef6ff}.wqr .ic{font-size:22px;width:28px;text-align:center}'+
   '.wqr .tx{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}.wqr .tx b{font-size:14px;word-break:keep-all}.wqr .bar{display:block;height:8px;border-radius:5px;background:#e3e8f0;overflow:hidden}.wqr .bar u{display:block;height:100%;background:linear-gradient(90deg,#4fb3ff,#2e9b55)}.wqr small{font-size:11.5px;color:#5a6a88}'+
   '.wqr button{flex:none;height:36px;padding:0 12px;border:2px solid var(--ink);border-radius:10px;background:#ffd54a;font:inherit;font-weight:900}.wqr button:disabled{background:#eceff4;color:#9aa3b5}.wqr em{font-style:normal;font-size:12px;color:#2e9b55;font-weight:800}';document.head.appendChild(st);setTimeout(wqDot,500);setInterval(wqDot,3000)})();
/* 세기: 함수 감싸기 (본게임 사용 기록 GF_CITY_EV 도 여기서) */
function gfEv(k,n){try{if(EMB&&window.parent.GF_CITY_EV&&k!=='collect')window.parent.GF_CITY_EV(k,n||1)}catch(e){}}
var _collectQ=collect;collect=function(b){var before=JSON.stringify(b.buf);var r=_collectQ.apply(this,arguments);try{if(JSON.stringify(b.buf)!==before)wqAdd('col',1)}catch(e){}return r};
var _ordSendQ=ordSend;ordSend=function(o){var n0=G.ordSent|0;var r=_ordSendQ.apply(this,arguments);if((G.ordSent|0)>n0){wqAdd('ord',1);gfEv('ord')}return r};
var _startJobQ=startJob;startJob=function(b,L){var r=_startJobQ.apply(this,arguments);try{if(L>1&&!isZ(b.k)&&!isD(b.k))wqAdd('up',1);if(!isZ(b.k))gfEv('build')}catch(e){}return r};
var _placeDecoQ=placeDeco;placeDeco=function(){var r=_placeDecoQ.apply(this,arguments);if(r){wqAdd('dec',1);gfEv('dec')}return r};
var _giftTakeQ=giftTake;giftTake=function(){var n=giftN();var r=_giftTakeQ.apply(this,arguments);if(n){wqAdd('box',n);gfEv('box',n)}return r};
window.__wq=function(){var S=wqState();return S?S.q.map(function(q){return q.k+':'+wqVal(q)+'/'+q.goal+(q.got?'✓':'')}).join(' '):null};
