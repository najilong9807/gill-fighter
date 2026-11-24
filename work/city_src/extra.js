/* ===== 꾸미기 · 해류 열차 · 돌아왔을 때 정산 · 도미 비서 ===== */
/* --- 🌸 장식: 땅값을 올려 집이 3단계까지 자라게 --- */
var DEC={d_coral:{n:'산호 화단',s:1,c:30,at:1,v:6,r:2},d_kelp:{n:'다시마 정원',s:1,c:40,at:1,v:6,r:2},d_bench:{n:'조개 벤치',s:1,c:80,at:3,v:8,r:2},d_lamp:{n:'해파리 가로등',s:1,c:120,at:5,v:9,r:3},
  d_fount:{n:'진주 분수',s:2,c:400,at:8,v:16,r:4},d_statue:{n:'황금 물고기상',s:2,c:1500,at:12,v:24,r:5},
  d_filt:{n:'물 거르개',s:1,c:300,at:4,v:0,r:0,fac:1,cr:3,cv:35},d_filt2:{n:'큰 물 거르개',s:2,c:1800,at:10,v:0,r:0,fac:1,cr:5,cv:55},
  d_o2:{n:'숨샘',s:1,c:250,at:3,v:0,r:0,fac:1,o2r:3},d_o2b:{n:'큰 숨탑',s:2,c:1500,at:8,v:0,r:0,fac:1,o2r:6},
  d_bus:{n:'해류 버스 정류장',s:1,c:600,at:7,v:0,r:0,fac:1,bus:4}};
function isD(k){return !!DEC[k]}
function placeDeco(k,x,y){pushUndo(DEC[k].n+' 놓기');setTimeout(endAct,0);if(DEC[k].gift){G.inv=G.inv||{};if(!(G.inv[k]>0)){toast('보관한 것이 없어요');return false}G.inv[k]--}else{if(WAL.get('pearl')<DEC[k].c){toast('진주가 모자라요');return false}WAL.add('pearl',-DEC[k].c)}snd('pop');var b={id:G.nid++,k:k,x:x,y:y,lv:1,buf:{},xpd:1};G.b.push(b);occ();var c=centerOf(b);dust(c.x,c.y,10,1);sparkle(c.x,c.y-30*cam.z,8);addXP(2);cityF=0;save();return true}
function decoPanel(b){var d=DEC[b.k],el=$('panel'),h='<button class="x" id="pX">✕</button><h2>'+(d.fac?'🫧 ':'🌸 ')+d.n+'</h2><p class="prod">'+(d.fac?(d.rst?'선로로 이어지면 주변 '+d.rst+'칸 길 막힘 −45%':d.bus?'주변 '+d.bus+'칸 길의 오가는 양 −35% · 막힌 길이 풀려요':d.o2r?'주변 '+d.o2r+'칸에 산소를 퍼뜨려요 · 집을 지을 수 있는 범위가 넓어져요':'주변 '+d.cr+'칸 탁한 물 −'+d.cv+' · 지금 이 자리 🌫 '+murkAt(b.x,b.y)):'주변 '+d.r+'칸 땅값 +'+d.v+' · 주택이 더 크게 자라요')+'</p><div class="row"><button class="sub" id="pDel">'+(d.gift?'보관함으로 넣기':'철거 (🫧'+Math.floor(d.c/2)+' 환급)')+'</button></div>';
  el.innerHTML=h;el.hidden=false;$('pX').onclick=function(){SEL=null;closePanel()};$('pDel').onclick=function(){G.b.splice(G.b.indexOf(b),1);occ();if(d.gift){G.inv=G.inv||{};G.inv[b.k]=(G.inv[b.k]|0)+1}else WAL.add('pearl',Math.floor(d.c/2));SEL=null;closePanel();cityF=0;save()};panelFor=null}
function dArt(k,bp){var p=pal(bp),cx=GX,cy=GY,g='',d=DEC[k];
  if(d.s===1)g+=box(p,cx,cy,40,4,sp(p,'#f2f6fa'),sp(p,'#dde6f0'),sp(p,'#b9c8dc'));else g+=box(p,cx,cy,88,6,sp(p,'#f2f6fa'),sp(p,'#dde6f0'),sp(p,'#b9c8dc'));var y=cy-4;
  if(k==='d_coral')g+=coral(p,cx-10,y+6,.75,p.coralA)+coral(p,cx+12,y+10,.6,p.coralB)+coral(p,cx,y+16,.5,'#c58cff');
  else if(k==='d_kelp')g+=kelp(p,cx-12,y+8,34)+kelp(p,cx,y+12,44)+kelp(p,cx+12,y+8,30)+(p.bp?'':'<ellipse cx="'+(cx+18)+'" cy="'+(y+14)+'" rx="7" ry="4" fill="#ffd9c9" stroke="'+OUT+'" stroke-width="2"/>');
  else if(k==='d_bench'){g+=box(p,cx,y+6,26,10,sp(p,'#ffd7e0'),sp(p,'#ffb8c8'),sp(p,'#e88aa0'));g+='<path d="M'+(cx-26)+','+(y-4)+' C'+(cx-26)+','+(y-34)+' '+(cx+26)+','+(y-34)+' '+(cx+26)+','+(y-4)+'" fill="'+sp(p,'url(#gPink)')+'"'+S(p)+'/>';
    if(!p.bp)for(var i=1;i<5;i++)g+='<path d="M'+(cx-26+i*10.4)+','+(y-4)+' L'+cx+','+(y-26)+'" stroke="#b04a66" stroke-width="1.4" opacity=".5"/>'}
  else if(k==='d_lamp'){g+='<path d="M'+cx+','+(y+4)+' L'+cx+','+(y-44)+'" stroke="'+OUT+'" stroke-width="6"/><path d="M'+cx+','+(y+4)+' L'+cx+','+(y-44)+'" stroke="'+sp(p,'#9aa6b8')+'" stroke-width="3"/>';
    g+=(p.bp?'':'<circle cx="'+cx+'" cy="'+(y-52)+'" r="26" fill="url(#gGlow)"/>')+'<path d="M'+(cx-14)+','+(y-44)+' Q'+(cx-14)+','+(y-64)+' '+cx+','+(y-64)+' Q'+(cx+14)+','+(y-64)+' '+(cx+14)+','+(y-44)+'Z" fill="'+sp(p,'#ffc3ec')+'"'+S(p)+'/>'+(p.bp?'':'<path d="M'+(cx-8)+','+(y-44)+' q-2,8 1,14 M'+cx+','+(y-44)+' q2,9 -1,16 M'+(cx+8)+','+(y-44)+' q-2,8 1,13" fill="none" stroke="'+OUT+'" stroke-width="1.8"/>')}
  else if(k==='d_fount'){g+=cyl(p,cx,y+4,58,16,sp(p,'#e2eaf5'))+'<ellipse cx="'+cx+'" cy="'+(y-12)+'" rx="50" ry="25" fill="'+sp(p,'#7fd3ff')+'"'+S(p)+'/>'+cyl(p,cx,y-12,12,30,sp(p,'#f6f9fd'))+pearl(p,cx,y-50,9,true);
    if(!p.bp)g+='<path d="M'+cx+','+(y-58)+' q-24,-14 -34,22 M'+cx+','+(y-58)+' q24,-14 34,22" fill="none" stroke="#dff7ff" stroke-width="4" stroke-linecap="round" opacity=".9"/>'+bubblesUp(p,cx+16,y-70,3)}
  else if(k==='d_bus'){g+=box(p,cx,y+2,30,5,sp(p,'#f6f9fd'),sp(p,'#e2eaf5'),sp(p,'#bccbe0'))+'<path d="M'+(cx-24)+','+(y-2)+' L'+(cx-24)+','+(y-40)+' M'+(cx+24)+','+(y-2)+' L'+(cx+24)+','+(y-40)+'" stroke="'+OUT+'" stroke-width="5"/>'+'<path d="M'+(cx-32)+','+(y-38)+' Q'+cx+','+(y-60)+' '+(cx+32)+','+(y-38)+' Z" fill="'+sp(p,'url(#gTeal)')+'"'+S(p)+'/>'+box(p,cx,y-4,20,8,sp(p,'#ffd7e0'),sp(p,'#ffb8c8'),sp(p,'#e88aa0'))+sign(p,cx+30,y-58,24,18,'#ffd54a','🚌')}
  else if(k==='d_o2'){g+='<ellipse cx="'+cx+'" cy="'+(y+2)+'" rx="26" ry="11" fill="'+sp(p,'#9fb4cf')+'"'+S(p)+'/>'+cone(p,cx,y+2,20,22,sp(p,'#c7d3e4'))+'<ellipse cx="'+cx+'" cy="'+(y-18)+'" rx="7" ry="3.5" fill="'+sp(p,'#5fd0cf')+'"'+S(p)+'/>'+bubblesUp(p,cx,y-28,4)}
  else if(k==='d_o2b'){var h2=86;g+=box(p,cx,y,48,10,sp(p,'#f6f9fd'),sp(p,'#e2eaf5'),sp(p,'#bccbe0'))+cyl(p,cx,y-10,22,h2,sp(p,'url(#gTeal)'))+bands(p,cx,y-10,22,h2,3)+'<rect x="'+(cx-10)+'" y="'+(y-h2+2)+'" width="20" height="'+(h2-24)+'" rx="9" fill="'+sp(p,'rgba(220,250,255,.8)')+'"'+S(p)+'/>'+cone(p,cx,y-10-h2,26,20,sp(p,'url(#gGoldRoof)'))+bubblesUp(p,cx+4,y-h2-40,4)+(p.bp?'':'<circle cx="'+cx+'" cy="'+(y-h2-46)+'" r="24" fill="url(#gGlow)"/>')}
  else if(k==='d_filt'||k==='d_filt2'){var big=k==='d_filt2',xs=big?[cx-22,cx+22]:[cx];if(big)g+='<path d="M'+(cx-22)+','+(y-44)+' Q'+cx+','+(y-70)+' '+(cx+22)+','+(y-44)+'" fill="none" stroke="'+OUT+'" stroke-width="8"/><path d="M'+(cx-22)+','+(y-44)+' Q'+cx+','+(y-70)+' '+(cx+22)+','+(y-44)+'" fill="none" stroke="'+sp(p,'#7fd8c8')+'" stroke-width="4.5"/>';xs.forEach(function(x){var h=big?50:42,r=big?15:13;g+=cyl(p,x,y+2,r,h,sp(p,'rgba(190,240,255,.85)'));if(!p.bp)for(var q=0;q<3;q++)g+='<path d="M'+(x-r+3)+','+(y-8-q*11)+' q'+(r-3)+',-6 '+(2*r-6)+',0" fill="none" stroke="#3fae6a" stroke-width="2.4" opacity=".85"/>';g+=cone(p,x,y-h+2,r+3,8,sp(p,'url(#gTeal)'))+'<rect x="'+(x-r-2)+'" y="'+(y-3)+'" width="'+(2*r+4)+'" height="7" rx="3" fill="'+sp(p,'#9fb4cf')+'"'+S(p)+'/>'+bubblesUp(p,x,y-h-8,big?3:2)})}
  else{g+=box(p,cx,y,40,22,sp(p,'#f6f9fd'),sp(p,'#e2eaf5'),sp(p,'#bccbe0'));g+='<path d="M'+(cx-30)+','+(y-60)+' q30,-40 60,-6 q-30,28 -60,6Z M'+(cx+30)+','+(y-60)+' l18,-16 l0,30Z" fill="'+sp(p,'url(#gGoldRoof)')+'"'+S(p)+'/>'+(p.bp?'':'<circle cx="'+(cx-14)+'" cy="'+(y-66)+'" r="4" fill="#fff" stroke="'+OUT+'" stroke-width="2"/><circle cx="'+(cx-12)+'" cy="'+(y-90)+'" r="30" fill="url(#gGlow)"/>')}
  return {svg:g,top:y-110}}
var _artFor2=artFor;artFor=function(id,L,bp){if(DEC[id])return dArt(id,bp);return _artFor2(id,L,bp)};

/* --- 🚋 해류 열차: 칸마다 물건을 채워 보내면 돌아와서 벽돌 · 못을 줘요 --- */
function trainCars(){var L=lvOf('train');return L>=18?5:L>=10?4:3}
function trainNew(){var L=hallLv(),pool=goodsPool().filter(function(g){return g!=='brick'&&g!=='nail'}),cars=[];if(!pool.length)pool=['stone'];
  for(var i=0;i<trainCars();i++){var g=pool[Math.floor(Math.random()*pool.length)],it={};it[g]=Math.max(2,Math.round(GB[g]*1.6*(1+L*.3)*(.8+Math.random()*.4)));cars.push({it:it,full:false})}
  var tl=lvOf('train');return {st:'load',cars:cars,rw:{brick:Math.round(4*tl*(1+tl*.05)*cars.length/3),nail:L>=14?Math.round(tl*.8):0,xp:12+tl*3}}}
function trainTick(now){if(!lvOf('train'))return;if(!G.tr)G.tr=trainNew();if(G.tr.st==='away'&&now>=G.tr.back)G.tr.st='back'}
function trainPanel(b){var el=$('panel'),T=G.tr,tl=lvOf('train'),h='<button class="x" id="pX">✕</button><h2>🚋 해류 열차역 <small>Lv.'+tl+'</small></h2>';
  if(!T){h+='<div class="box">열차역을 다 지으면 열차가 들어와요</div>'}
  else if(T.st==='away')h+='<div class="box">🚋 산 너머 광산 마을로 물건을 바꾸러 갔어요 · 돌아오기까지 <b>'+dur((T.back-NOW())/1000)+'</b></div><div class="row"><button id="tRush">💎 '+D.rushGems((T.back-NOW())/1000)+' 바로 돌아오기</button></div>';
  else if(T.st==='back')h+='<div class="box">🚋 열차가 돌아왔어요! 🧱 '+T.rw.brick+(T.rw.nail?' · 📌 '+T.rw.nail:'')+' · ⭐'+T.rw.xp+'</div><div class="row"><button id="tGet">받기</button></div>';
  else{h+='<div class="cars">'+T.cars.map(function(c,i){var k=Object.keys(c.it)[0],ok=(G.res[k]||0)>=c.it[k];return '<div class="car'+(c.full?' full':'')+'"><b>'+ICON[k]+' '+c.it[k]+'</b>'+(c.full?'<small>✓ 실었어요</small>':'<button data-c="'+i+'"'+(ok?'':' disabled')+'>싣기</button>')+'</div>'}).join('')+'</div>';
    h+='<p class="role">다 실으면 떠나요 · 돌아오면 <span class="nb">🧱 '+T.rw.brick+'</span> '+(T.rw.nail?'<span class="nb">📌 '+T.rw.nail+'</span> ':'')+'<span class="nb">⭐'+T.rw.xp+'</span><br><small>다녀오는 데 '+dur(trainTrip())+'</small></p>'}
  h+='<p class="role">'+(B.train.role||'')+'</p>';el.innerHTML=h;el.hidden=false;$('pX').onclick=function(){SEL=null;closePanel()};
  el.querySelectorAll('[data-c]').forEach(function(x){x.onclick=function(){var c=T.cars[+x.dataset.c],k=Object.keys(c.it)[0];if((G.res[k]||0)<c.it[k])return;G.res[k]-=c.it[k];c.full=true;snd('load');if(T.cars.every(function(q){return q.full})){T.st='away';T.back=NOW()+trainTrip()*1000;toast('🚋 열차가 떠났어요');var cc=centerOf(b);dust(cc.x,cc.y,14,1.2)}save();trainPanel(b)}});
  if($('tGet'))$('tGet').onclick=function(){G.res.brick+=T.rw.brick;G.res.nail+=T.rw.nail;addXP(T.rw.xp);evtAdd(10);var cc=centerOf(b);float(cc.x,cc.y-70*cam.z,'+'+T.rw.brick+'🧱');G.tr=trainNew();save();trainPanel(b)};
  if($('tRush'))$('tRush').onclick=function(){var g=D.rushGems((T.back-NOW())/1000);if(!gemPay(g))return;T.back=NOW();T.st='back';save();trainPanel(b)};panelFor={tr:b}}
function trainTrip(){return 1800+lvOf('train')*60}

/* --- 돌아왔을 때 정산 창 --- */
function settle(awaySec,done){if(awaySec<300)return;var sum={};G.b.forEach(function(b){for(var k in b.buf){var v=Math.floor(b.buf[k]);if(v>0)sum[k]=(sum[k]||0)+v}});
  var el=$('panel'),h='<h2>🐠 다녀오셨어요!</h2><p class="role">'+dur(awaySec)+' 동안 마을 소식이에요</p><div class="box">'+(done?'<div>🔨 공사 '+done+'개가 끝났어요</div>':'')+
    (Object.keys(sum).length?'<div>쌓인 것: '+Object.keys(sum).map(function(k){return '<span class="nb">'+ICON[k]+' '+fmt(sum[k])+'</span>'}).join(' ')+'</div>':'')+(ordReady()?'<div>🐢 배달할 수 있는 주문 '+ordReady()+'개</div>':'')+(G.tr&&G.tr.st==='back'?'<div>🚋 열차가 돌아왔어요</div>':'')+'</div>'+
    '<div class="row"><button id="sAll">모두 받기</button></div>';el.innerHTML=h;el.hidden=false;panelFor=null;
  $('sAll').onclick=function(){G.b.forEach(function(b){if(bufReady(b))collect(b)});closePanel()}}

/* --- 🐠 도미 비서: 처음 하는 사람 길잡이 --- */
var TUT=[
 {t:'산호궁 옆에 <b>산호 광산</b>을 지어 봐요',h:'👆 여기를 누르면 바로 지어요',ok:function(){return !!bOf('quarry')},go:function(){quickBuild('quarry')},rw:50},
 {t:'광산 머리 위 <b>🪨 동그라미(말풍선)</b>를 눌러 산호석을 받아요',h:'노란 화살표가 가리키는 곳을 눌러요',ok:function(){return G.tutC},go:function(){var q=bOf('quarry');if(q)focus(q)},rw:30},
 {t:'<b>🏛 산호궁</b>을 Lv.2로 업그레이드해요',h:'산호궁을 눌러 ⬆ 업그레이드',ok:function(){return hallLv()>=2||!!bOf('hall').job},go:function(){var h=bOf('hall');focus(h);SEL=h;openPanel(h)},rw:80},
 {t:'물고기가 살 <b>🏠 집</b>을 4채 지어요',h:'👆 여기를 누르면 게 일꾼들이 도로 옆에 집 4채를 바로 지어요',ok:function(){var n=0;for(var k in G.zone)if(G.zone[k]==='R')n++;return n>=4},go:function(){quickZone()},rw:50},
 {t:'<b>산소 펌프</b>를 지어 산소를 넓혀요',h:'👆 여기를 누르면 바로 지어요',ok:function(){return !!bOf('pump')},go:function(){quickBuild('pump')},rw:60},
 {t:'물고기 <b>10마리</b>가 입주하게 해요',h:'주택이 도로 · 산소에 닿아야 물고기가 와요',ok:function(){return CS.pop>=10},go:function(){lifePanel()},rw:80},
 {t:'<b>경단 공장</b>을 지어 주민 밥을 만들어요',h:'👆 여기를 누르면 다시마 농장 → 경단 공장을 바로 지어요',ok:function(){return !!bOf('factory')},go:function(){quickBuild(bOf('farm')?'factory':'farm')},rw:100},
 {t:'<b>거북 배달소</b>에서 주문을 하나 배달해요',h:'👆 여기를 누르면 배달소를 바로 짓고, 다 지으면 주문판을 열어요',ok:function(){return (G.ordSent|0)>0},go:function(){if(bOf('turtle'))orderPanel();else quickBuild('turtle')},rw:150}];
/* 1.1.32: 첫 안내 8단계가 끝나도 도미 비서가 '다음 할 일' 하나씩 이어서 줌 — 산호궁 다음 레벨 조건 중 아직 안 된 것 하나 → 누르면 바로 짓기 · 건물 창 · 땅 정하기. 하나 끝날 때마다 진주 조금 */
function nextQ(){var L=hallLv();if(L>=D.HMAX)return null;var h=bOf('hall');if(!h)return null;
  if(h.job)return {k:'job'+L,t:'🏛 산호궁 Lv.'+(L+1)+' 공사 중이에요',h:'다 지어지면 다음 할 일을 알려 드릴게요',go:function(){focus(h)}};
  var n=needList('hall',L+1).filter(function(x){return !x.ok})[0];
  if(!n)return {k:'hall'+(L+1),t:'<b>🏛 산호궁</b>을 Lv.'+(L+1)+'로 올려요',h:'👆 여기를 누르면 산호궁 창을 열어요',go:function(){focus(h);SEL=h;openPanel(h)}};
  if(n.k==='pop')return {k:'pop'+n.lv,t:'물고기 <b>'+n.lv+'마리</b>가 살게 해요 (지금 '+(CS.pop|0)+')',h:'👆 누르면 집을 더 지어요 · 산소 · 경단이 있어야 이사 와요',go:quickZone};
  var b=bOf(n.k);if(!b)return {k:'b'+n.k,t:'<b>'+NM(n.k)+'</b>을(를) 지어요',h:'👆 여기를 누르면 바로 지어요 · 산호궁 Lv.'+(L+1)+' 조건',go:function(){quickBuild(n.k)}};
  if(b.job)return {k:'w'+n.k+b.job.L,t:'🦀 <b>'+NM(n.k)+'</b> 공사 중이에요',h:'다 지어지면 다음 할 일을 알려 드릴게요',go:function(){focus(b)}};
  return {k:'u'+n.k+n.lv,t:'<b>'+NM(n.k)+'</b>을(를) Lv.'+n.lv+'로 올려요 (지금 Lv.'+b.lv+')',h:'👆 여기를 누르면 그 건물 창을 열어요',go:function(){focus(b);SEL=b;openPanel(b)}}}
var QNOW=null;function qPaint(el){var q=null;try{q=nextQ()}catch(e){}QNOW=q;if(!q){el.hidden=true;document.body.classList.remove('tutOn');return}
  if(G.q2&&G.q2!==q.k&&!/^(job|w)/.test(G.q2)){var rw=20+hallLv()*10;WAL.add('pearl',rw);toast('🐠 잘했어요! 🫧'+rw);addXP(3)}if(G.q2!==q.k){G.q2=q.k;save()}
  $('bTut').hidden=!G.tutMin;if(G.tutMin){el.hidden=true;document.body.classList.remove('tutOn');return}el.hidden=!!TOOL||!$('panel').hidden||!$('tray').hidden;document.body.classList.toggle('tutOn',true);
  var hh='<span class="av">🐠</span><div><small>도미 비서 · 다음 할 일</small><p>'+q.t+'</p><i>'+q.h+'</i></div><b>›</b><span class="tx" id="tutX">✕</span>';if(el.dataset.h!==hh){el.dataset.h=hh;el.innerHTML=hh}}
function tutPaint(){var el=$('tut'),i=G.tut|0;if(i>=TUT.length){qPaint(el);return}var s=TUT[i];
  if(s.ok()){G.tut=i+1;WAL.add('pearl',s.rw);toast('🐠 잘했어요! 🫧'+s.rw);addXP(5);save();return tutPaint()}
  $('bTut').hidden=!G.tutMin;if(G.tutMin){el.hidden=true;document.body.classList.remove('tutOn');return}el.hidden=!!TOOL||!$('panel').hidden||!$('tray').hidden;document.body.classList.toggle('tutOn',!G.tutMin&&i<TUT.length);var hh2='<span class="av">🐠</span><div><small>도미 비서 · '+(i+1)+'/'+TUT.length+'</small><p>'+s.t+'</p><i>'+s.h+'</i></div><b>›</b><span class="tx" id="tutX">✕</span>';if(el.dataset.h!==hh2){el.dataset.h=hh2;el.innerHTML=hh2}}
$('tut').onclick=function(ev){if(ev.target.id==='tutX'){G.tutMin=true;save();tutPaint();return}var s=TUT[G.tut|0];if(s)s.go();else if(QNOW)QNOW.go()};$('bTut').onclick=function(){G.tutMin=false;save();tutPaint()};
