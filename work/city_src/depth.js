/* ===== 39차 키우는 깊이: 🌫 탁한 물 · ⚖ 마을 정책 · ⚠ 마을 사건 =====
   1) 탁한 물: 광산 · 가마 · 경단 공장 · 해초 공방 · 고래 항구 · 산업 구역이 주변 물을 흐리게 함.
      집 근처가 탁하면 → 입주가 줄고(최대 −60%) 행복 −(최대 15) · 땅값 ↓ · 주거/상업 3단계 40 · 4단계 25 · 5단계 15 이하여야 자람
      🫧 물 거르개(⚙ 기반, Lv.4 · 300🫧, 3칸 −35) · 큰 물 거르개(Lv.10 · 1800🫧, 5칸 −55) 여러 개 지어 맑게. 🗺 지도 '탁한 물'
   2) 정책: 산호궁 Lv.6 1칸 · Lv.10 2칸 · Lv.15 3칸. 좋은 점과 대가가 같이 있음(언제든 바꿈, 바꾼 뒤 10분은 다시 못 바꿈)
   3) 사건: 산호궁 Lv.6부터, 마을을 보고 있을 때 35~75분마다 하나. 서비스 범위 안이면 저절로 막음(명성 +3)
      못 막으면 그 건물이 멈추거나(생산 0) 주민 절반이 숨음 → 눌러서 🫧로 해결하거나 2시간 기다림. 한꺼번에 2개까지
      🦈 상어 출몰(주거 · 상업, 👮 순찰대) · 🌋 뜨거운 물 분출(생산 건물, 🚒 소방서) · 🤧 물고기 감기(주거, 🏥 병원) · 🔴 적조(탁한 물 45 넘는 곳, 막는 건물 없음 → 물 거르개)
   저장: G.pol {on:[], t}, G.inc {next, blk, fix}, 건물 b.inc {k, at, end} */

/* --- 1) 탁한 물 --- */
var MURK={},MSRC={quarry:[4,30],kiln:[4,36],factory:[3,26],sew:[3,16],port:[3,14]};
function murkCalc(){var M={},cl={};G.b.forEach(function(b){if(!b.lv&&!(DEC[b.k]))return;var s=sz(b.k),cx=b.x+(s-1)/2,cy=b.y+(s-1)/2,r=0,v=0,neg=false;
    if(MSRC[b.k]){r=MSRC[b.k][0];v=MSRC[b.k][1]*polV('murk')}else if(isZ(b.k)&&b.k.charAt(1)==='I'&&b.lv){r=2;v=(6+4*b.lv)*polV('murk')}else if(DEC[b.k]&&DEC[b.k].fac){r=DEC[b.k].cr;v=DEC[b.k].cv;neg=true}
    if(!r||!v)return;for(var i=-r;i<=r;i++)for(var j=-r;j<=r;j++){var d=Math.abs(i)+Math.abs(j);if(d>r)continue;var key=Math.round(cx+i)+','+Math.round(cy+j),val=neg?v:v*(1-d/(r+1));if(neg)cl[key]=Math.max(cl[key]||0,val);else M[key]=(M[key]||0)+val}});
  for(var k in M){var m=M[k]-(cl[k]||0);if(m<1)delete M[k];else M[k]=Math.min(100,m)}MURK=M}
function murkAt(x,y){return MURK?Math.round(MURK[x+','+y]||0):0}
var _fieldsM=fields;fields=function(){_fieldsM.apply(this,arguments);try{murkCalc()}catch(e){}};

/* --- 2) 정책 --- */
var POLS=[
 {k:'fest',ic:'🎉',n:'바다 축제의 밤',g:'행복 +8',b:'세금 −15%',e:{happy:8,tax:.85}},
 {k:'recy',ic:'♻',n:'조개껍데기 재활용',g:'탁한 물 −30%',b:'생산 −10%',e:{murk:.7,prod:.9}},
 {k:'share',ic:'🍡',n:'경단 나눔',g:'행복 +6',b:'경단 먹는 양 ×1.6',e:{happy:6,eat:1.6}},
 {k:'early',ic:'⏰',n:'일찍 출근',g:'생산 +15%',b:'행복 −7',e:{prod:1.15,happy:-7}},
 {k:'lamp',ic:'💡',n:'밤길 가로등',g:'모든 땅값 +4',b:'세금 −10%',e:{lv:4,tax:.9}},
 {k:'night',ic:'🦀',n:'게 일꾼 야근',g:'공사 시간 −20%',b:'행복 −5',e:{build:.8,happy:-5}},
 {k:'drill',ic:'🛡',n:'안전 훈련',g:'사건 −40%',b:'생산 −5%',e:{inc:.6,prod:.95}}];
var POLD={};POLS.forEach(function(p){POLD[p.k]=p});
function polSlots(){var L=hallLv();return L>=15?3:L>=10?2:L>=6?1:0}
function polList(){return (G.pol&&G.pol.on)||[]}
function polOn(k){return polList().indexOf(k)>=0}
function polV(t){var add=t==='happy'||t==='lv',v=add?0:1;try{polList().forEach(function(k){var p=POLD[k];if(p&&p.e[t]!=null){if(add)v+=p.e[t];else v*=p.e[t]}})}catch(e){}return v}
function polWait(){var t=(G.pol&&G.pol.t)||0;return Math.max(0,t+600e3-NOW())}
function polPanel(){var el=$('panel'),S=polSlots(),on=polList(),w=polWait(),h='<button class="x" id="pX">✕</button><h2>⚖ 마을 정책</h2>';
  if(!S){h+='<div class="box">정책은 🏛 산호궁 Lv.6에 열려요 · 좋은 점과 대가가 같이 있어요</div>';el.innerHTML=h;el.hidden=false;panelFor=null;$('pX').onclick=closePanel;return}
  h+='<p class="role">켤 수 있는 정책 <b>'+on.length+' / '+S+'</b> · Lv.10 · Lv.15에 한 칸씩 늘어요'+(w?' · 다시 바꾸기까지 '+dur(w/1000):'')+'</p><div class="wq">';
  POLS.forEach(function(p){var o=polOn(p.k),can=!w&&(o||on.length<S);h+='<div class="wqr'+(o?' can':'')+'"><span class="ic">'+p.ic+'</span><div class="tx"><b>'+p.n+'</b><small><span class="pg">▲ '+p.g+'</span><br><span class="pb">▼ '+p.b+'</span></small></div><button data-p="'+p.k+'"'+(can?'':' disabled')+'>'+(o?'끄기':'켜기')+'</button></div>'});
  h+='</div>';el.innerHTML=h;el.hidden=false;panelFor=null;$('pX').onclick=closePanel;
  el.querySelectorAll('[data-p]').forEach(function(b){b.onclick=function(){var k=b.dataset.p;if(polWait())return;G.pol=G.pol||{on:[]};G.pol.on=G.pol.on||[];var i=G.pol.on.indexOf(k);if(i>=0)G.pol.on.splice(i,1);else{if(G.pol.on.length>=polSlots())return;G.pol.on.push(k)}G.pol.t=NOW();cityF=0;
    snd(i>=0?'pop':'coin');toast((i>=0?'⚖ 정책을 껐어요 · ':'⚖ 정책을 켰어요 · ')+POLD[k].n);gfEv('pol');save();polPanel()}})}
/* 공사 시간 */
var _startJobP=startJob;startJob=function(b,L){var r=_startJobP.apply(this,arguments);try{if(polOn('night')&&b.job&&b.job.end>b.job.start)b.job.end=b.job.start+Math.round((b.job.end-b.job.start)*polV('build'))}catch(e){}return r};
/* 생산: 정책 배수, 사건 중이면 멈춤 */
var _ratesD=rates;rates=function(b){var o=_ratesD.apply(this,arguments);if(b.k==='hall')return o;if(b.inc&&(b.inc.k==='vent'||b.inc.k==='tide'))return {};var m=polV('prod');if(m!==1)for(var q in o)o[q]*=m;return o};

/* --- 3) 사건 --- */
var INCT={
 shark:{ic:'🦈',n:'상어 출몰',bit:2,at:9,gd:'👮 해마 순찰대',d:'상어가 나타나 주민 절반이 숨었어요',tg:function(b){return isZ(b.k)&&b.lv&&b.k.charAt(1)!=='I'}},
 vent:{ic:'🌋',n:'뜨거운 물 분출',bit:1,at:6,gd:'🚒 거품 소방서',d:'바닥에서 뜨거운 물이 솟아 일이 멈췄어요',tg:function(b){return b.lv&&!isZ(b.k)&&!isD(b.k)&&b.k!=='hall'&&!(b.job&&b.job.L===1)}},
 cold:{ic:'🤧',n:'물고기 감기',bit:4,at:10,gd:'🏥 불가사리 병원',d:'감기가 돌아 주민 절반이 쉬고 있어요',tg:function(b){return isZ(b.k)&&b.lv&&b.k.charAt(1)==='R'}},
 tide:{ic:'🔴',n:'적조',bit:0,at:6,gd:'🫧 물 거르개',d:'탁한 물에 붉은 물이 끼어 일이 멈췄어요',tg:function(b){return b.lv&&!isD(b.k)&&b.k!=='hall'&&murkAt(b.x,b.y)>=45}}};
function incOn(){return G.b.filter(function(b){return b.inc})}
function incCost(){var v=80+hallLv()*25;return Math.round(v/10)*10}
function incTick(){if(!G||!G.b||hallLv()<6||document.hidden)return;var now=NOW();G.inc=G.inc||{};var I=G.inc;
  incOn().forEach(function(b){if(now>=b.inc.end){var t=INCT[b.inc.k];delete b.inc;toast((t?t.ic+' '+t.n:'⚠')+' · 저절로 지나갔어요');save()}});
  if(!I.next||now-I.next>3600e3){I.next=now+(I.next?(3+Math.random()*5):20)*60e3;save();return}
  if(now<I.next)return;I.next=now+(35+Math.random()*40)*60e3/polV('inc');
  if(incOn().length>=2){save();return}
  var L=hallLv(),ks=Object.keys(INCT).filter(function(k){return L>=INCT[k].at}),tries=0;
  while(tries++<8&&ks.length){var k=ks[Math.floor(Math.random()*ks.length)],t=INCT[k],cand=G.b.filter(function(b){return !b.inc&&t.tg(b)});if(!cand.length){ks.splice(ks.indexOf(k),1);continue}
    var b=cand[Math.floor(Math.random()*cand.length)],c=centerOf(b);
    if(t.bit&&((COV[b.x+','+b.y]|0)&t.bit)){I.blk=(I.blk|0)+1;addXP(3);toast('🛡 '+t.gd+' 범위라 '+t.ic+' '+t.n+'을(를) 막았어요');float(c.x,c.y-60*cam.z,'🛡 '+t.ic,true);snd('pop')}
    else{b.inc={k:k,at:now,end:now+2*3600e3};toast('⚠ '+t.ic+' '+t.n+'! · 건물을 눌러 해결해요');snd('lvl');gfEv('inc')}
    save();return}
  save()}
function incFix(b,gem){var t=INCT[b.inc.k],c=incCost();if(gem){if(WAL.get('gem')<1){toast('보석이 모자라요');return}WAL.add('gem',-1)}else{if(WAL.get('pearl')<c){toast('진주가 모자라요');return}WAL.add('pearl',-c)}
  delete b.inc;G.inc=G.inc||{};G.inc.fix=(G.inc.fix|0)+1;addXP(5);var p=centerOf(b);sparkle(p.x,p.y-30*cam.z,14);snd('done');toast('✓ '+t.ic+' '+t.n+' 해결!');cityF=0;save();hud()}
function incPanel(b){var t=INCT[b.inc.k],el=$('panel'),c=incCost(),left=Math.max(0,b.inc.end-NOW()),h='<button class="x" id="pX">✕</button><h2>⚠ '+t.ic+' '+t.n+'</h2>'+
  '<div class="box"><b>'+NM(b.k)+'</b> · '+t.d+'<br><small>'+dur(left/1000)+' 뒤엔 저절로 지나가요</small></div>'+
  '<p class="role">막으려면: '+(t.bit?t.gd+' 범위 안에 두면 다음엔 저절로 막아요':'🌫 탁한 물 45 밑으로 · ⚙ 기반 → 🫧 물 거르개')+'</p>'+
  '<div class="row"><button id="iFix">🫧'+fmt(c)+' 들여 해결</button><button class="sub" id="iGem">💎1 바로</button></div><div class="row"><button class="sub" id="iOpen">건물 보기</button></div>';
  el.innerHTML=h;el.hidden=false;panelFor=null;$('pX').onclick=function(){SEL=null;closePanel()};$('iFix').onclick=function(){incFix(b,false);closePanel()};$('iGem').onclick=function(){incFix(b,true);closePanel()};$('iOpen').onclick=function(){_openPanelI(b)}}
var _openPanelI=openPanel;openPanel=function(b){if(b&&b.inc&&INCT[b.inc.k])return incPanel(b);return _openPanelI.apply(this,arguments)};
/* 사건 표시: 건물 위 빨간 동그라미 */
var _drawFXI=drawFX;drawFX=function(){_drawFXI.apply(this,arguments);try{var t=NOW()/1000;incOn().forEach(function(b){var t2=INCT[b.inc.k];if(!t2)return;var p=centerOf(b),z=Math.max(.6,cam.z);if(p.x<-40||p.x>VW+40||p.y<-80||p.y>VH+40)return;var y=p.y-(isZ(b.k)?70:96)*cam.z+Math.sin(t*3)*3,r=15*z;
  ctx.save();ctx.fillStyle='#ff5d5d';ctx.strokeStyle=OUT;ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(p.x,y,r,0,7);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(p.x-5*z,y+r-2);ctx.lineTo(p.x,y+r+7*z);ctx.lineTo(p.x+5*z,y+r-2);ctx.fill();ctx.font='400 '+Math.round(16*z)+'px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(t2.ic,p.x,y+1);ctx.restore()})}catch(e){}};

/* 할 일: 탁한 물 · 사건 알림 */
var _todoD=todoPanel;todoPanel=function(){var r=_todoD.apply(this,arguments);try{var t=[];if((CS.murkH|0)>=4)t.push('🌫 집 근처 물이 탁해요(행복 −'+CS.murkH+') · ⚙ 기반 → 🫧 물 거르개');incOn().forEach(function(b){var q=INCT[b.inc.k];t.push('⚠ '+q.ic+' '+q.n+' · '+NM(b.k)+'을(를) 눌러 해결해요')});if(polSlots()>polList().length)t.push('⚖ 켤 수 있는 정책이 '+(polSlots()-polList().length)+'개 있어요 · ☰ 메뉴 → 마을 정책');
  if(t.length){var d=document.createElement('div');d.className='box';d.innerHTML=t.join('<br>');$('panel').appendChild(d)}}catch(e){}return r};
/* --- 마을 현황 · 메뉴 --- */
var _lifeD=lifePanel;lifePanel=function(){var r=_lifeD.apply(this,arguments);try{var el=$('panel'),c=CS,io=incOn(),d=document.createElement('div');d.className='box';var on=polList();
  d.innerHTML='🌫 탁한 물 때문에 행복 <b>−'+(c.murkH|0)+'</b> <small>(집 근처 평균 · 🗺 지도 → 탁한 물)</small><br>⚖ 정책 '+(polSlots()?on.length+' / '+polSlots()+(on.length?' · '+on.map(function(k){return POLD[k].ic+' '+POLD[k].n}).join(' · '):''):'🔒 🏛Lv.6')+
   '<br>⚠ 사건 '+(hallLv()<6?'🔒 🏛Lv.6':'지금 '+io.length+'개 · 막아 낸 사건 '+((G.inc&&G.inc.blk)|0)+'번')+'<div class="row"><button id="lPol">⚖ 정책</button><button class="sub" id="lMap">🗺 탁한 물 보기</button></div>';
  var p=el.querySelector('.role');el.insertBefore(d,p||null);$('lPol').onclick=polPanel;$('lMap').onclick=function(){closePanel();VIEW=3;viewBtn()}}catch(e){}return r};
var _menuP=menuPanel;menuPanel=function(){var r=_menuP.apply(this,arguments);try{var g=$('panel').querySelector('.mgrid');if(g&&!g.querySelector('[data-m="pol"]')){var b=document.createElement('button');b.dataset.m='pol';var S=polSlots();
  b.innerHTML='⚖<b>마을 정책</b><small>'+(S?'켜진 정책 '+polList().length+' / '+S:'🏛 Lv.6에 열려요')+'</small>';b.onclick=function(){polPanel()};g.insertBefore(b,g.children[3]||null)}}catch(e){}return r};
(function(){var st=document.createElement('style');st.textContent='.pg{color:#2e9b55;font-weight:800}.pb{color:#d0473f;font-weight:800}';document.head.appendChild(st);setInterval(function(){try{incTick()}catch(e){}},5000)})();
window.__depth={murk:function(x,y){return x==null?Object.keys(MURK).length:murkAt(x,y)},inc:function(force,k){if(force){G.inc=G.inc||{};G.inc.next=NOW()-1;if(k){var o=INCT;var keep={};for(var q in o)keep[q]=o[q];Object.keys(o).forEach(function(q){if(q!==k)delete INCT[q]});incTick();for(q in keep)INCT[q]=keep[q]}else incTick()}return incOn().map(function(b){return b.k+':'+b.inc.k})},pol:function(){return polList().join(',')+' happy'+polV('happy')+' tax'+polV('tax')},cs:function(){return {happy:CS.happy,murkH:CS.murkH,pop:CS.pop,tax:CS.tax}}};
window.__depth.top=function(){var best=null;G.b.forEach(function(b){if(isZ(b.k)&&b.k.charAt(1)==='R'&&b.lv){var m=murkAt(b.x,b.y);if(!best||m>best.m)best={x:b.x,y:b.y,m:m,why:zUpWhy(b).join('/')}}});return best};
window.__depth.addF=function(x,y,k){G.b.push({id:G.nid++,k:k||'d_filt',x:x,y:y,lv:1,buf:{}});occ();fields();return murkAt(x,y)};
window.__depth.openInc=function(){var b=incOn()[0];if(b)openPanel(b);return !!b};
window.__depth.homes=function(){var a={n:0,noO2:0,noRoad:0,occ:0,cap:0,inc:0};G.b.forEach(function(b){if(isZ(b.k)&&b.k.charAt(1)==='R'&&b.lv){a.n++;if(!O2[b.x+','+b.y])a.noO2++;if(!roadAdj(b.x,b.y))a.noRoad++;a.occ+=b.occ|0;a.cap+=ZN.R.cap[b.lv]}});a.lim=CS.lim;a.happy=CS.happy;return a};
