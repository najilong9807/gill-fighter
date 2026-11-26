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
/* 💨 숨샘 · 큰 숨탑(40차): 산소 펌프 말고도 여러 개 놓아 산소 범위를 넓힘 */
function o2Extra(){G.b.forEach(function(b){var d=DEC[b.k];if(!d||!d.o2r)return;var s=sz(b.k),cx=b.x+(s-1)/2,cy=b.y+(s-1)/2,r=d.o2r;for(var i=-r;i<=r;i++)for(var j=-r;j<=r;j++)if(Math.abs(i)+Math.abs(j)<=r*1.3)O2[Math.round(cx+i)+','+Math.round(cy+j)]=1})}
var _fieldsM=fields;fields=function(){_fieldsM.apply(this,arguments);try{o2Extra()}catch(e){}try{murkCalc()}catch(e){}};

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
  if(!S){h+='<div class="box"><b>⚖ 마을 정책</b>(☰ 메뉴)은 산호궁 Lv.6부터 켜요. 정책마다 좋은 점과 대가가 같이 있어요. Lv.10 · Lv.15에 한 칸씩 늘어요.</div>';el.innerHTML=h;el.hidden=false;panelFor=null;$('pX').onclick=closePanel;return}
  h+='<p class="role">켤 수 있는 정책 <b>'+on.length+' / '+S+'</b> · Lv.10 · Lv.15에 한 칸씩 늘어요'+(w?' · 다시 바꾸기까지 '+dur(w/1000):'')+'</p><div class="wq">';
  POLS.forEach(function(p){var o=polOn(p.k),can=!w&&(o||on.length<S);h+='<div class="wqr'+(o?' can':'')+'"><span class="ic">'+p.ic+'</span><div class="tx"><b>'+p.n+'</b><small><span class="pg">▲ '+p.g+'</span><br><span class="pb">▼ '+p.b+'</span></small></div><button data-p="'+p.k+'"'+(can?'':' disabled')+'>'+(o?'끄기':'켜기')+'</button></div>'});
  h+='</div>';el.innerHTML=h;el.hidden=false;panelFor=null;$('pX').onclick=closePanel;
  el.querySelectorAll('[data-p]').forEach(function(b){b.onclick=function(){var k=b.dataset.p;if(polWait())return;G.pol=G.pol||{on:[]};G.pol.on=G.pol.on||[];var i=G.pol.on.indexOf(k);if(i>=0)G.pol.on.splice(i,1);else{if(G.pol.on.length>=polSlots())return;G.pol.on.push(k)}G.pol.t=NOW();cityF=0;
    snd(i>=0?'pop':'coin');toast((i>=0?'⚖ 정책을 껐어요 · ':'⚖ 정책을 켰어요 · ')+POLD[k].n);gfEv('pol');save();polPanel()}})}
/* 공사 시간 */
var _startJobP=startJob;startJob=function(b,L){var r=_startJobP.apply(this,arguments);try{if(polOn('night')&&b.job&&b.job.end>b.job.start)b.job.end=b.job.start+Math.round((b.job.end-b.job.start)*polV('build'))}catch(e){}return r};
/* 생산: 정책 배수, 사건 중이면 멈춤 */
var _ratesD=rates;rates=function(b){var o=_ratesD.apply(this,arguments);if(b.k==='hall')return o;if(b.inc&&(b.inc.k==='vent'||b.inc.k==='tide')&&!(b.inc.end&&b.inc.end<=NOW()))return {};var m=polV('prod');if(m!==1)for(var q in o)o[q]*=m;return o};

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
  if(t.length){var bxs=$('panel').querySelectorAll('.box'),bx=bxs[bxs.length-1],d=document.createElement('div');d.innerHTML=t.join('<br>');if(bx){d.style.marginTop='4px';bx.appendChild(d)}else{d.className='box';$('panel').appendChild(d)}}}catch(e){}return r}; /* 1.1.33: 할 일 칸을 따로 만들지 않고 마지막 칸에 이어 붙임 */
/* --- 마을 현황 · 메뉴 --- */
var _lifeD=lifePanel;lifePanel=function(){var r=_lifeD.apply(this,arguments);try{var el=$('panel'),c=CS,io=incOn(),d=document.createElement('div');d.className='box';var on=polList();
  d.innerHTML=((c.murkH|0)>0?'🌫 탁한 물 때문에 행복 <b>−'+(c.murkH|0)+'</b> <small>(집 근처 평균 · 🗺 지도 → 탁한 물)</small><br>':'')+'⚖ 정책 '+(polSlots()?on.length+' / '+polSlots()+(on.length?' · '+on.map(function(k){return POLD[k].ic+' '+POLD[k].n}).join(' · '):''):'🔒 🏛Lv.6')+
   '<br>⚠ 사건 '+(hallLv()<6?'🔒 🏛Lv.6':'지금 '+io.length+'개 · 막아 낸 사건 '+((G.inc&&G.inc.blk)|0)+'번')+'<div class="row">'+(polSlots()?'<button id="lPol">⚖ 정책</button>':'')+'<button class="sub" id="lMap">🗺 탁한 물 보기</button></div>';
  var p=el.querySelector('.role');el.insertBefore(d,p||null);if($('lPol'))$('lPol').onclick=polPanel;$('lMap').onclick=function(){closePanel();VIEW=3;viewBtn()}}catch(e){}return r};
/* 1.1.33 마을 현황 칸 정리(늑구 '칸 크기 · 배치 · 정렬'): 번역이 끝난 뒤 DOM 만 줄 단위로 나눠 정렬 — 글자는 그대로라 32개 언어 번역에 영향 없음
   줄마다 한 칸 · 긴 괄호 설명은 줄 아래 작은 글씨 · 수요 막대는 이름 칸 너비를 맞추고 남은 폭을 다 씀 · 아래 단추 높이 같게 · 산호궁 조건 줄도 칸으로 */
var _lifeL=lifePanel;lifePanel=function(){var r=_lifeL.apply(this,arguments);try{lifeTidy()}catch(e){}return r};
function lifeTidy(){var el=$('panel');if(!el)return;el.classList.add('lifep');
  try{var tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),tn;while(tn=tw.nextNode())if(/[−-]0\.0(?![\d])/.test(tn.nodeValue))tn.nodeValue=tn.nodeValue.replace(/[−-]0\.0(?![\d])/g,'0')}catch(e){} /* QA: 먹는 양이 0이면 '−0.0' 대신 0 */
  el.querySelectorAll('.box').forEach(function(bx){if(bx.dataset.tidy)return;bx.dataset.tidy='1';var out=[],cur=null;
    function nr(){cur=document.createElement('div');cur.className='lrow'}nr();
    [].slice.call(bx.childNodes).forEach(function(n){if(n.nodeName==='BR'){out.push(cur);nr();n.parentNode.removeChild(n);return}
      if(n.nodeType===1&&n.classList&&n.classList.contains('row')){out.push(cur);out.push(n);nr();return}cur.appendChild(n)});out.push(cur);
    while(bx.firstChild)bx.removeChild(bx.firstChild);
    out.forEach(function(x){if(x.className==='lrow'&&!(x.textContent||'').trim()&&!x.querySelector('*'))return;bx.appendChild(x)});
    var hasM=!!bx.querySelector('.meter');
    bx.querySelectorAll('.lrow').forEach(function(rw,i){var m=rw.querySelector('.meter');
      if(m){rw.classList.add('lmeter');var lab=document.createElement('span');lab.className='llab';while(rw.firstChild&&rw.firstChild!==m)lab.appendChild(rw.firstChild);rw.insertBefore(lab,m)}
      else if(hasM&&i===0)rw.classList.add('lttl');
      rw.querySelectorAll('small').forEach(function(sm){if((sm.textContent||'').trim().length>20)sm.classList.add('lhint')})})});
  var labs=el.querySelectorAll('.lmeter .llab'),w=0;labs.forEach(function(l){w=Math.max(w,l.getBoundingClientRect().width)});if(w)labs.forEach(function(l){l.style.minWidth=Math.ceil(w)+'px'})}
(function(){var st=document.createElement('style');st.textContent='.lifep .box .lrow{padding:3px 0}.lifep .box .lrow+.lrow{border-top:1px solid #e3eaf2}.lifep .lrow.lttl{font-weight:800;border-top:0!important;padding-bottom:4px}.lifep .lrow.lttl+.lrow{border-top:0}'+
  '.lifep .box .lrow.lmeter{display:flex;align-items:center;gap:10px;border-top:0}.lifep .llab{flex:0 0 auto;white-space:nowrap}.lifep .lmeter .meter{flex:1;width:auto;margin:0;height:10px}'+
  '.lifep small.lhint{display:block;font-size:12px;color:#56627c;line-height:1.3;margin-top:1px}.lifep .box .row{margin-top:8px}.lifep .box .row button,.lifep .box .row button.sub{height:44px;font-size:15px}'+
  '.lifep p.role{margin:8px 0 0;padding:8px 10px;background:#fff6d6;border-radius:12px;font-size:13.5px;line-height:1.4}';document.head.appendChild(st)})();
var _menuP=menuPanel;menuPanel=function(){var r=_menuP.apply(this,arguments);try{var g=$('panel').querySelector('.mgrid');if(g&&!g.querySelector('[data-m="pol"]')){var b=document.createElement('button');b.dataset.m='pol';var S=polSlots();
  b.innerHTML='⚖<b>마을 정책</b><small>'+(S?'켜진 정책 '+polList().length+' / '+S:'🏛 Lv.6에 열려요')+'</small>';b.onclick=function(){polPanel()};g.insertBefore(b,g.children[3]||null)}}catch(e){}return r};
(function(){var st=document.createElement('style');st.textContent='.pg{color:#2e9b55;font-weight:800}.pb{color:#d0473f;font-weight:800}';document.head.appendChild(st);setInterval(function(){try{incTick()}catch(e){}},5000)})();
window.__depth={murk:function(x,y){return x==null?Object.keys(MURK).length:murkAt(x,y)},inc:function(force,k){if(force){G.inc=G.inc||{};G.inc.next=NOW()-1;if(k){var o=INCT;var keep={};for(var q in o)keep[q]=o[q];Object.keys(o).forEach(function(q){if(q!==k)delete INCT[q]});incTick();for(q in keep)INCT[q]=keep[q]}else incTick()}return incOn().map(function(b){return b.k+':'+b.inc.k})},pol:function(){return polList().join(',')+' happy'+polV('happy')+' tax'+polV('tax')},cs:function(){return {happy:CS.happy,murkH:CS.murkH,pop:CS.pop,tax:CS.tax}}};
window.__depth.top=function(){var best=null;G.b.forEach(function(b){if(isZ(b.k)&&b.k.charAt(1)==='R'&&b.lv){var m=murkAt(b.x,b.y);if(!best||m>best.m)best={x:b.x,y:b.y,m:m,why:zUpWhy(b).join('/')}}});return best};
window.__depth.addF=function(x,y,k){G.b.push({id:G.nid++,k:k||'d_filt',x:x,y:y,lv:1,buf:{}});occ();fields();return murkAt(x,y)};
window.__depth.openInc=function(){var b=incOn()[0];if(b)openPanel(b);return !!b};
window.__depth.homes=function(){var a={n:0,noO2:0,noRoad:0,occ:0,cap:0,inc:0};G.b.forEach(function(b){if(isZ(b.k)&&b.k.charAt(1)==='R'&&b.lv){a.n++;if(!O2[b.x+','+b.y])a.noO2++;if(!roadAdj(b.x,b.y))a.noRoad++;a.occ+=b.occ|0;a.cap+=ZN.R.cap[b.lv]}});a.lim=CS.lim;a.happy=CS.happy;return a};

/* 1.1.33 공사 대기 줄(늑구 '일꾼이 일하고 있어도 대기열 걸리게 해줘 정도껏'):
   게 일꾼이 다 바빠도 공사를 미리 걸어 둘 수 있음 — 대기 줄은 일꾼 3명 전까지 2칸, 3명부터 3칸. 재료는 걸 때 냄.
   대기 공사는 앞 공사가 끝나는 시각에 이어서 시작하도록 시각(start · end)을 미리 정해 둠 → 앱을 꺼 둬도 순서대로 끝남.
   일꾼 칩은 '일하는 수/일꾼 수 +대기 수' */
function jqPend(now){now=now||NOW();return G.b.filter(function(b){return b.job&&b.job.q&&now<b.job.start})}
function JQMAX(){return crabsMax()>=3?3:2}
var _jobsJQ=jobs;jobs=function(){var now=NOW();return _jobsJQ().filter(function(b){return !(b.job.q&&now<b.job.start)})};
var _canJQ=canStart;canStart=function(k,L){var w=_canJQ.apply(this,arguments),i=w.indexOf('게 일꾼이 다 바빠요 🦀');if(i>=0&&jqPend().length<JQMAX())w.splice(i,1);return w};
function jqSched(now){var q=jqPend(now).sort(function(a,b){return (a.job.qa||0)-(b.job.qa||0)});if(!q.length)return;
  var fr=_jobsJQ().filter(function(b){return !(b.job.q&&now<b.job.start)}).map(function(b){return Math.max(now,b.job.end)}).sort(function(a,b){return a-b}),M=crabsMax();
  while(fr.length<M)fr.unshift(now);fr=fr.slice(0,Math.max(M,1));
  q.forEach(function(b){fr.sort(function(a,c){return a-c});var st=Math.max(now,fr[0]),d=b.job.dur||Math.max(1000,b.job.end-b.job.start);b.job.dur=d;b.job.start=st;b.job.end=st+d;fr[0]=b.job.end})}
var _startJQ=startJob;startJob=function(b,L){var now=NOW(),busy=jobs().length>=crabsMax(),r=_startJQ.apply(this,arguments);
  try{if(busy&&b.job&&!isZ(b.k)){b.job.q=1;b.job.qa=now;b.job.dur=Math.max(1000,b.job.end-b.job.start);b.job.start=now+1;b.job.end=now+1+b.job.dur;jqSched(now);toast('🦀 ⏳ '+jqPend(now).length+' / '+JQMAX());save()}}catch(e){}return r};
var _stepJQ=step;step=function(now,quiet){try{if(!quiet)jqSched(now)}catch(e){}return _stepJQ.apply(this,arguments)};
var _hudJQ=hud;hud=function(){var r=_hudJQ.apply(this,arguments);try{var n=jqPend().length;if(n)$('crabs').innerHTML='🦀 <b>'+jobs().length+'/'+crabsMax()+'</b> <small>+'+n+'</small>'}catch(e){}return r};
/* 1.1.33 창 글씨 줄바꿈 다듬기: 그린 뒤(번역 끝난 뒤)에 글자 나눔만 손봄 — 한국어 열쇠 · 번역 표는 그대로
   · ' · ' 앞 칸은 안 끊기는 칸으로 → 줄 맨 앞에 '·' 가 혼자 오지 않게
   · 짧은 ' · ' 목록은 마디째 한 덩어리(.sg) → '하나에 🫧' / '1,080' 처럼 어중간하게 안 끊김
   · 🫧1,080 · ⭐94 같은 그림+숫자는 붙여 둠(.nb0) */
(function(){var EM=null;try{EM=new RegExp('\\p{Extended_Pictographic}\\uFE0F?\\s?[+\\-\\u2212\\u00d7]?\\d[\\d,.:]*(?:%|[a-zA-Z\\uac00-\\ud7a3]{1,3})?','gu')}catch(e){}
  var SEL='p,small,li,i,.lab,.fx,.tip,.role,.why,.prod,.say,.tx>b',SKIPG='.mgrid,script,style',SKIP='.mgrid,h2,.row,.who,.help,button:not(.card)',BUSY=0;
  function txts(el){var a=[],w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode())a.push(n);return a}
  function glue(el){txts(el).forEach(function(n){var v=n.nodeValue,o=v.replace(/ · /g,' · ');if(o!==v)n.nodeValue=v=o;
    var pa=n.parentNode;if(!EM||!pa||pa.classList&&pa.classList.contains('nb0'))return;EM.lastIndex=0;if(!EM.test(v))return;EM.lastIndex=0;
    var f=document.createDocumentFragment(),i=0,m;while(m=EM.exec(v)){if(m.index>i)f.appendChild(document.createTextNode(v.slice(i,m.index)));var s=document.createElement('span');s.className='nb0';s.textContent=m[0];f.appendChild(s);i=m.index+m[0].length}
    if(i<v.length)f.appendChild(document.createTextNode(v.slice(i)));pa.replaceChild(f,n)})}
  function segs(el){if(el.dataset.sg||el.closest(SKIP)||el.querySelector('div,p,ul,li,button,br,.sg,.meter,.bar'))return;var t=(el.textContent||'').trim();if(t.indexOf('·')<0||t.length>150)return;
    var parts=t.split(/\s·\s/);if(parts.length<2||parts.some(function(p){return p.length>34||/[,，、]|[.!?。]\s/.test(p)}))return;el.dataset.sg='1';
    var groups=[[]];[].slice.call(el.childNodes).forEach(function(n){if(n.nodeType!==3){groups[groups.length-1].push(n);return}
      n.nodeValue.split(/\s· /).forEach(function(p,j){if(j>0){groups[groups.length-1].push(document.createTextNode(' ·'));groups.push([]);p=p.replace(/^\s+/,'')}if(p)groups[groups.length-1].push(document.createTextNode(p))})});
    while(el.firstChild)el.removeChild(el.firstChild);
    groups.forEach(function(g,j){if(!g.length)return;var s=document.createElement('span');s.className='sg';g.forEach(function(n){s.appendChild(n)});if(el.firstChild)el.appendChild(document.createTextNode(' '));el.appendChild(s)})
    /* QA: 한 마디가 두 줄로 접히면(좁은 창 · 긴 언어) 덩어리 묶음을 풀어 보통 줄바꿈으로 — '안 집 ·' 만 한 줄에 남던 것 */
    try{var lh=parseFloat(getComputedStyle(el).fontSize)*1.9,ss=el.querySelectorAll('.sg'),bad=false;ss.forEach(function(x){if(x.offsetHeight>lh)bad=true});if(bad)ss.forEach(function(x){while(x.firstChild)el.insertBefore(x.firstChild,x);el.removeChild(x)})}catch(e){}}
  function tidy(root){if(!root||root.hidden)return;BUSY=1;try{root.querySelectorAll(SEL).forEach(function(el){if(!el.closest(SKIPG))glue(el)});root.querySelectorAll(SEL).forEach(segs)}catch(e){}BUSY=0}
  function hook(id){var el=$(id);if(!el||!window.MutationObserver)return;var mo=new MutationObserver(function(){if(BUSY)return;tidy(el);mo.takeRecords()});mo.observe(el,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']})}
  hook('panel');hook('tray');window.panelTidy=tidy})();

/* 1.1.34(늑구 '광산 하나 더 지어서 캐는 양 늘리고 싶은데 업그레이드만 유도해서 아쉬워'):
   산호 광산 · 다시마 농장은 여러 채 — 🏛 Lv.4 에 2채, Lv.8 에 3채. 값은 처음 짓는 값과 같고, 채마다 따로 올리고 따로 생산.
   짓기 칸에 '＋' 카드가 하나 더 붙음(새 한국어 글 없이 이름 + ＋ · 개수 · 값). 다른 건물이 '광산 Lv.N 필요'를 볼 땐 가장 높은 레벨(lvOf). */
/* 1.1.34(늑구 '모든 건물 그렇게 — 업그레이드만 유도하지 말고 추가 건물 짓게'): 산호궁 · 거북 배달소 · 열차역 · 항구 · 수족관 · 용왕 궁전(하나뿐인 시설) 말고 모두 여러 채.
   2채째는 그 건물이 열린 레벨 + 2(최소 🏛 Lv.4), 3채째는 + 6(최소 Lv.8). 생산 · 인구 한도 · 산소 · 범위 시설은 채마다 그대로 더해짐.
   게 일꾼 숙소는 한 채 더마다 일꾼 +1, 조개 창고는 한 채 더마다 그 창고 한도의 절반을 더함. */
var MULTI={pump:1,quarry:1,farm:1,crab:1,factory:1,store:1,diner:1,sew:1,school:1,kiln:1,pearl:1,clinic:1,fire:1,police:1};
function multiAt(k,i){var a=B[k].at;return i<=1?a:i===2?Math.max(4,a+2):Math.max(8,a+6)}
function multiMax(k){if(!MULTI[k])return 1;var L=hallLv(),n=1;if(L>=multiAt(k,2))n=2;if(L>=multiAt(k,3))n=3;return n}
var _crabsMaxM=crabsMax;crabsMax=function(){var n=G.b.filter(function(b){return b.k==='crab'&&b.lv>0}).length;return _crabsMaxM()+Math.max(0,n-1)};
var _capM=cap;cap=function(r){var c=_capM(r);try{var st=G.b.filter(function(b){return b.k==='store'&&b.lv>0}).sort(function(x,y){return y.lv-x.lv});if(st.length>1){var base=D.storeCap(st[0].lv),add=0;for(var i=1;i<st.length;i++)add+=D.storeCap(st[i].lv)*.5;c=c*(base+add)/base}}catch(e){}return c};
function multiCnt(k){return G.b.filter(function(b){return b.k===k}).length}
var _showCatM=showCat;showCat=function(c){var r=_showCatM.apply(this,arguments);try{var tr=$('tray'),L=hallLv();
  Object.keys(MULTI).forEach(function(k){var el=tr.querySelector('.card[data-k="'+k+'"]');if(!el||!bOf(k))return;var n=multiCnt(k),mx=multiMax(k),nx=n<3?multiAt(k,n+1):0;
    if(n>=mx&&!(nx&&nx<=D.HMAX))return;var can=n<mx,cc=D.cost(k,1),d=document.createElement('button');d.className='card'+(can?'':' off');d.dataset.km=k;
    d.innerHTML='<img src="'+thumb(k)+'" alt=""><b>'+B[k].n+'\u00a0＋</b><i>'+(can?'🫧'+fmt(cc.pearl)+' 🪨'+fmt(cc.stone):'🔒 🏛Lv.'+nx)+'</i><small>'+n+' / '+(can?mx:n+1)+'</small>';
    d.onclick=function(){if(!can){toast('🔒 🏛Lv.'+nx);return}var w=canStart(k,1);if(w.length){toast(w[0]);return}ghostAt(k)};el.parentNode.insertBefore(d,el.nextSibling)})}catch(e){}return r};
var _catBadgeM=catBadge;catBadge=function(c){var n=_catBadgeM.apply(this,arguments);try{Object.keys(MULTI).forEach(function(k){if(CATOF[k]===c&&bOf(k)&&multiCnt(k)<multiMax(k)&&payOk(D.cost(k,1)))n++})}catch(e){}return n};
