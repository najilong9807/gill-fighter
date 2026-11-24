/* ===== 1.1.32 중반 재미 (늑구 '중반부터 재미있게': 넷 다) =====
   시뮬(보통 유저): 산호궁 Lv.10 10일 · 15 28일 · 25 125일, 막힌 이유는 대부분 '공사 시간', 산호석은 60일째 14만 개가 쌓여 쓸 데가 없음
   ① ⚡ 공사 단축: 본게임 한 판(재료 상자 1개)마다 15분 모아 둠(최대 6시간) → 짓는 중인 건물 창에서 '⚡ 단축 쓰기'
   ② 📅 오늘의 마을 일 3개(산호궁 Lv.3부터, 📜 창 위쪽): 날마다 바뀜 · 하나에 진주 · 셋 다 하면 💎2 + ⚡30분
   ③ 🗿 기념물 3개(🎪 광장, ☰ 메뉴): 쌓인 산호석 · 다시마 · 벽돌을 써서 5단계씩 → 단계마다 보석 · 마을 전체 효과
      산호 등대(Lv.8~) 생산 +2%/단계 · 고래 뼈 아치(Lv.11~) 세금 +3%/단계 · 용궁 시계탑(Lv.14~) 공사 시간 −2%/단계
   ④ 🎉 축제의 날(🎪 광장, 산호궁 Lv.6부터): 하루 한 번 산호석 · 다시마를 내고 1시간 동안 세금 2배 · 생산 1.5배 · 축제 방울 +15 */
var MID_BOOST_MAX=360,MID_BOOST_RUN=15;
function midDayKey(t){var d=new Date(t);return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function midDayStart(t){var d=new Date(t);return +new Date(d.getFullYear(),d.getMonth(),d.getDate())}

/* ---------- ① ⚡ 공사 단축 ---------- */
function boostAdd(m){G.boost=Math.min(MID_BOOST_MAX,Math.max(0,(G.boost|0)+m));save()}
var _giftTakeMid=giftTake;giftTake=function(){var n=0;try{n=giftN()}catch(e){}var r=_giftTakeMid.apply(this,arguments);try{n=Math.max(0,n-giftN())}catch(e){} /* 1.1.33: 창고가 차면 일부만 열리니 실제로 연 개수만 */
  try{if(n>0&&(G.gate||hallLv())){boostAdd(n*MID_BOOST_RUN);setTimeout(function(){toast('⚡ 공사 단축 +'+(n*MID_BOOST_RUN)+'분 · 짓는 중인 건물 창에서 써요')},2200)}}catch(e){}return r};
var _openPanelMid=openPanel;openPanel=function(b){var r=_openPanelMid.apply(this,arguments);
  try{if(b&&b.job&&(G.boost|0)>0&&!isZ(b.k)&&!isD(b.k)){var row=$('pRush')&&$('pRush').parentNode;if(row&&!$('pBoost')){var left=Math.ceil((b.job.end-NOW())/60000),m=Math.min(G.boost|0,Math.max(1,left));
      var d=document.createElement('div');d.className='row';d.innerHTML='<button class="sub" id="pBoost">⚡ 단축 '+m+'분 쓰기 <small>(모아 둔 '+(G.boost|0)+'분)</small></button>';row.parentNode.insertBefore(d,row.nextSibling);
      $('pBoost').onclick=function(){if(!b.job)return;var l2=Math.ceil((b.job.end-NOW())/60000),u=Math.min(G.boost|0,Math.max(1,l2));if(u<=0)return;b.job.end-=u*60000;b.job.start=(b.job.start||NOW())-u*60000;G.boost=(G.boost|0)-u;
        try{undoClear()}catch(e){}save();snd('pop');try{var c=centerOf(b);sparkle(c.x,c.y-40*cam.z,14)}catch(e){}toast('⚡ '+u+'분 당겼어요');openPanel(b)}}}}catch(e){}return r};

/* ---------- ② 📅 오늘의 마을 일 ---------- */
var DY_POOL=[
 {k:'ord',g:function(L){return 2+Math.floor(L/5)},at:3},
 {k:'col',g:function(L){return 8+L},at:1},
 {k:'up',g:function(L){return 1+Math.floor(L/8)},at:1},
 {k:'dec',g:function(){return 1},at:3},
 {k:'box',g:function(){return 2},at:1,emb:1}];
function dyRw(){return Math.min(800,150+30*hallLv())}
function dyState(){if(hallLv()<3)return null;var now=NOW(),k=midDayKey(now),st=midDayStart(now);
  if(!G.dy||G.dy.k!==k&&!(st<=(G.dy.st||0))){var L=hallLv(),pool=DY_POOL.filter(function(q){return L>=q.at&&(!q.emb||EMB)}),h=0,i;for(i=0;i<k.length;i++)h=(h*31+k.charCodeAt(i)+(G.seed|0)*7)>>>0;
    var pick=[];while(pick.length<3&&pool.length){h=(h*1103515245+12345)>>>0;pick.push(pool.splice((h>>>8)%pool.length,1)[0])}
    G.dy={k:k,st:st,L:L,q:pick.map(function(q){return {k:q.k,goal:q.g(L),v:0,got:0}}),all:0};save()}return G.dy}
function dyReady(){var S=dyState();if(!S)return 0;var n=S.q.filter(function(q){return !q.got&&q.v>=q.goal}).length;if(!S.all&&S.q.every(function(q){return q.got}))n++;return n}
var _wqAddMid=wqAdd;wqAdd=function(k,n){var r=_wqAddMid.apply(this,arguments);try{var S=dyState();if(S){S.q.forEach(function(q){if(q.k===k&&!q.got)q.v=(q.v|0)+(n||1)})}midDot()}catch(e){}return r};
function dyTake(i){var S=dyState();if(!S)return;var rw=dyRw();
  if(i==='all'){if(S.all||!S.q.every(function(q){return q.got}))return;S.all=1;WAL.add('gem',2);boostAdd(30);addXP(20);snd('coin');toast('🎁 오늘의 마을 일 끝! 💎2 · ⚡30분')}
  else{var q=S.q[i];if(!q||q.got||q.v<q.goal)return;q.got=1;WAL.add('pearl',rw);addXP(8);snd('coin');toast('📅 '+wqDef(q.k).t(q.goal)+' · 🫧+'+fmt(rw))}
  try{rcAdd('dy',1)}catch(e){}save();hud();midDot()}
function dyHtml(){var S=dyState();if(!S)return '';var rw=dyRw(),now=NOW(),left=(midDayStart(now)+864e5-now)/1000,h='<div class="dyh"><b>📅 오늘의 마을 일</b><small>'+dur(left)+' 뒤 바뀌어요 · 하나에 🫧'+fmt(rw)+' · 셋 다 하면 💎2 + ⚡30분</small></div><div class="wq dy">';
  S.q.forEach(function(q,i){var d=wqDef(q.k),v=Math.min(q.goal,q.v|0),ok=v>=q.goal;h+='<div class="wqr'+(q.got?' got':ok?' can':'')+'"><span class="ic">'+d.ic+'</span><div class="tx"><b>'+d.t(q.goal)+'</b><i class="bar"><u style="width:'+Math.round(v/q.goal*100)+'%"></u></i><small>'+fmt(v)+' / '+fmt(q.goal)+'</small></div>'+(q.got?'<em>✓ 받음</em>':'<button data-dy="'+i+'"'+(ok?'':' disabled')+'>받기</button>')+'</div>'});
  var allOk=S.q.every(function(q){return q.got});h+='<div class="wqr all'+(S.all?' got':allOk?' can':'')+'"><span class="ic">🎁</span><div class="tx"><b>오늘의 일 3개 모두 끝내기</b><small>💎2 · ⚡30분</small></div>'+(S.all?'<em>✓ 받음</em>':'<button data-dy="all"'+(allOk?'':' disabled')+'>받기</button>')+'</div></div>';
  if((G.boost|0)>0)h+='<p class="role">⚡ 공사 단축 <b>'+(G.boost|0)+'분</b> 모아 둠 · 짓는 중인 건물 창에서 써요</p>';else if(EMB)h+='<p class="role">⚡ 아가미 파이터 한 판마다 공사 단축 15분 · 재료 상자에 든 연장 덕에 게 일꾼 일이 빨라져요</p>';
  return h}
var _wqPanelMid=wqPanel;wqPanel=function(){var r;if(hallLv()>=5)r=_wqPanelMid.apply(this,arguments);else{var el=$('panel');el.innerHTML='<button class="x" id="pX">✕</button><h2>📅 오늘의 마을 일</h2>';el.hidden=false;panelFor=null;$('pX').onclick=closePanel}
  try{var el2=$('panel'),h2=el2.querySelector('h2'),x=dyHtml();if(x&&h2){var box=document.createElement('div');box.className='dybox';box.innerHTML=(window.CITY_TR||String)(x);h2.parentNode.insertBefore(box,h2.nextSibling);
    box.querySelectorAll('[data-dy]').forEach(function(b){b.onclick=function(){var v=b.dataset.dy;dyTake(v==='all'?'all':+v);wqPanel()}})}}catch(e){}return r};
function midDot(){var b=$('bWq');if(!b)return;var L=hallLv();if(L>=3)b.hidden=false;var e=b.querySelector('em');if(e){var w=0;try{w=L>=5?wqReady():0}catch(x){}e.hidden=!(w||dyReady())}}
var _wqDotMid=wqDot;wqDot=function(){var r=_wqDotMid.apply(this,arguments);try{midDot()}catch(e){}return r};

/* ---------- ③ 🗿 기념물 · ④ 🎉 축제의 날 (🎪 광장) ---------- */
var MON=[
 {k:'light',ic:'🗼',n:'산호 등대',at:8,fx:'생산',per:2,unit:'%',cost:function(s){return {stone:Math.round(3000*Math.pow(s+1,1.4)/100)*100,brick:150*(s+1)}}},
 {k:'arch',ic:'🦴',n:'고래 뼈 아치',at:11,fx:'세금',per:3,unit:'%',cost:function(s){return {kelp:Math.round(2500*Math.pow(s+1,1.4)/100)*100,stone:2000*(s+1)}}},
 {k:'clock',ic:'🕰',n:'용궁 시계탑',at:14,fx:'공사 시간',per:2,unit:'%',neg:1,cost:function(s){return {stone:3000*(s+1),brick:400*(s+1),nail:120*(s+1)}}}];
var MON_N=5;
function monLv(k){return (G.mon&&G.mon[k])|0}
function monNeed(m,s){return m.at+2*s}
function monGem(s){return 3+2*s}
function festOn(){return !!(G.fest&&G.fest.end>NOW())}
function festCost(){var L=hallLv();return {stone:150*L,kelp:80*L}}
/* 1.1.32 점검: 여기 있던 payOk(재료만 봄)가 game.js 의 payOk(진주 · 보석도 봄)를 덮어써서 진주가 드는 건물이 전부 '재료가 모자라요'로 안 지어졌음 → 지우고 game.js 것을 씀 */
function payRes(c){for(var k in c)G.res[k]=Math.max(0,(G.res[k]||0)-c[k])}
function festOpen(){var L=hallLv();if(L<6){toast('🏛 산호궁 Lv.6에 열려요');return}var dk=midDayKey(NOW());if(festOn()){toast('🎉 축제 중이에요');return}if(G.fest&&G.fest.day===dk){toast('오늘은 이미 열었어요 · 내일 또 열 수 있어요');return}
  var c=festCost();if(!payOk(c)){toast('재료가 모자라요');return}payRes(c);G.fest={day:dk,end:NOW()+3600000};try{undoClear()}catch(e){}try{evtAdd(15)}catch(e){}addXP(10);save();hud();snd('done');
  try{var h=bOf('hall');if(h){var cc=centerOf(h);sparkle(cc.x,cc.y-60*cam.z,40);float(cc.x,cc.y-100*cam.z,'🎉',true)}}catch(e){}toast('🎉 축제의 날! 1시간 동안 세금 2배 · 생산 1.5배');plazaPanel()}
function monBuild(m){var s=monLv(m.k);if(s>=MON_N)return;if(hallLv()<monNeed(m,s)){toast('🏛 산호궁 Lv.'+monNeed(m,s)+' 필요');return}var c=m.cost(s);if(!payOk(c)){toast('재료가 모자라요');return}
  payRes(c);G.mon=G.mon||{};G.mon[m.k]=s+1;try{undoClear()}catch(e){}WAL.add('gem',monGem(s));addXP(30+10*s);save();hud();snd('done');
  try{var h=bOf('hall');if(h){var cc=centerOf(h);sparkle(cc.x,cc.y-60*cam.z,30)}}catch(e){}toast(m.ic+' '+m.n+' '+(s+1)+'단계 · 💎+'+monGem(s));plazaPanel()}
function plazaPanel(){var el=$('panel'),L=hallLv(),now=NOW(),h='<button class="x" id="pX">✕</button><h2>🎪 광장</h2>';
  /* 축제의 날 */
  var c=festCost(),dk=midDayKey(now);h+='<p class="role">축제를 열면 주민들이 광장에 모여 장을 보고, 신이 나서 일도 더 열심히 해요</p><div class="box mid"><b>🎉 축제의 날</b><small>하루 한 번 · 1시간 동안 세금 2배 · 생산 1.5배 · 축제 방울 +15</small>';
  if(L<6)h+='<p class="why">🏛 산호궁 Lv.6에 열려요</p>';
  else if(festOn())h+='<p class="prod">🎉 축제 중 · 남은 시간 <b>'+dur((G.fest.end-now)/1000)+'</b></p>';
  else if(G.fest&&G.fest.day===dk)h+='<p class="why">오늘은 이미 열었어요 · 내일 또 열 수 있어요</p>';
  else h+='<div class="cost">'+costHtml(c)+'</div><div class="row"><button class="main" id="pFest"'+(payOk(c)?'':' disabled')+'>🎉 축제의 날 열기</button></div>';
  h+='</div>';
  /* 기념물 */
  MON.forEach(function(m){var s=monLv(m.k),tot=s*m.per;h+='<div class="box mid"><b>'+m.ic+' '+m.n+' <small>'+s+' / '+MON_N+'단계</small></b><i class="bar"><u style="width:'+Math.round(s/MON_N*100)+'%"></u></i>'+
    '<small>'+m.fx+' '+(m.neg?'−':'+')+tot+m.unit+' (단계마다 '+(m.neg?'−':'+')+m.per+m.unit+')</small>';
    if(s>=MON_N)h+='<p class="prod">다 지었어요 ✨</p>';
    else if(L<monNeed(m,s))h+='<p class="why">다음 단계: 🏛 산호궁 Lv.'+monNeed(m,s)+' 필요</p>';
    else{var cc=m.cost(s);h+='<div class="cost">'+costHtml(cc)+' <span class="nb">· 💎+'+monGem(s)+'</span></div><div class="row"><button class="main" data-mon="'+m.k+'"'+(payOk(cc)?'':' disabled')+'>🧱 '+(s+1)+'단계 짓기</button></div>'}
    h+='</div>'});
  el.innerHTML=h;el.hidden=false;panelFor=null;$('pX').onclick=closePanel;if($('pFest'))$('pFest').onclick=festOpen;
  el.querySelectorAll('[data-mon]').forEach(function(b){b.onclick=function(){MON.forEach(function(m){if(m.k===b.dataset.mon)monBuild(m)})}})}
function plazaReady(){var L=hallLv();if(L>=6&&!festOn()&&!(G.fest&&G.fest.day===midDayKey(NOW()))&&payOk(festCost()))return 1;return MON.some(function(m){var s=monLv(m.k);return s<MON_N&&L>=monNeed(m,s)&&payOk(m.cost(s))})?1:0}
var _menuMid=menuPanel;menuPanel=function(){var r=_menuMid.apply(this,arguments);try{var g=$('panel').querySelector('.mgrid');if(g&&!g.querySelector('[data-m="plaza"]')){var b=document.createElement('button');b.dataset.m='plaza';var n=plazaReady();
  b.innerHTML=(window.CITY_TR||String)('🎪<b>광장</b><small>'+(festOn()?'🎉 축제 중':'축제 · 기념물')+'</small>'+(n?'<em class="rcd"></em>':''));b.style.position='relative';b.onclick=function(){plazaPanel()};g.insertBefore(b,g.children[3]||null)}}catch(e){}return r};

/* 효과: 기념물 · 축제 → 생산 · 세금 · 공사 시간 */
var _ratesMid=rates;rates=function(b){var r=_ratesMid.apply(this,arguments);try{var f=festOn(),o={};for(var k in r){var v=r[k];if(b.k==='hall'&&k==='pearl')v*=(1+.03*monLv('arch'))*(f?2:1);else v*=(1+.02*monLv('light'))*(f?1.5:1);o[k]=v}return o}catch(e){return r}};
(function(){var t=D.time;D.time=function(k,L){var v=t.apply(this,arguments);try{var c=monLv('clock');if(c)v=Math.round(v*(1-.02*c))}catch(e){}return v}})();
/* 축제 중엔 산호궁 둘레에 반짝이 */
setInterval(function(){try{if(festOn()&&!document.hidden){var h=bOf('hall');if(h){var c=centerOf(h);sparkle(c.x+(Math.random()-.5)*120*cam.z,c.y-40*cam.z-Math.random()*60*cam.z,6)}}}catch(e){}},1400);
(function(){var st=document.createElement('style');st.textContent='.dybox{margin:0 0 10px}.dyh{display:flex;flex-direction:column;gap:2px;margin:2px 0 6px}.dyh small{opacity:.75;font-size:12px}.box.mid{display:flex;flex-direction:column;gap:4px}.box.mid .bar{display:block;height:7px;border-radius:5px;background:rgba(0,0,0,.12);overflow:hidden}.box.mid .bar u{display:block;height:100%;background:#43c46b}';document.head.appendChild(st)})();
setTimeout(function(){try{midDot()}catch(e){}},500);
/* 지은 기념물은 산호궁 곁에 보이게(단계가 오를수록 커짐) · 축제 중엔 🎉 */
var _drawWorldMid=drawWorld;drawWorld=function(t,now){var r=_drawWorldMid.apply(this,arguments);try{var h=bOf('hall');if(!h)return r;var c=centerOf(h),z=cam.z,P=[[-1,0],[1,0],[0,1]];
  MON.forEach(function(m,i){var s=monLv(m.k);if(!s)return;var x=c.x+P[i][0]*150*z,y=c.y+P[i][1]*70*z+10*z,f=Math.round((26+7*s)*z);ctx.save();ctx.font=f+'px sans-serif';ctx.textAlign='center';ctx.textBaseline='bottom';
    ctx.globalAlpha=.25;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(x,y,f*.45,f*.14,0,0,6.28);ctx.fill();ctx.globalAlpha=1;ctx.fillText(m.ic,x,y-Math.sin(t/700+i)*2*z);
    if(s>=MON_N){ctx.font=Math.round(14*z)+'px sans-serif';ctx.fillText('✨',x+f*.4,y-f*.8)}ctx.restore()});
  if(festOn()){ctx.save();ctx.font=Math.round(30*z)+'px sans-serif';ctx.textAlign='center';ctx.fillText('🎉',c.x,c.y-150*z+Math.sin(t/300)*4*z);ctx.restore()}}catch(e){}return r};
