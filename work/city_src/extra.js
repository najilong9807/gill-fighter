/* ===== 꾸미기 · 해류 열차 · 돌아왔을 때 정산 · 도미 비서 ===== */
/* --- 🌸 꾸미기: 땅값을 올려 집이 3단계까지 자라게 --- */
var DEC={d_coral:{n:'산호 화단',s:1,c:30,at:1,v:6,r:2},d_kelp:{n:'다시마 정원',s:1,c:40,at:1,v:6,r:2},d_bench:{n:'조개 벤치',s:1,c:80,at:3,v:8,r:2},d_lamp:{n:'해파리 가로등',s:1,c:120,at:5,v:9,r:3},
  d_fount:{n:'진주 분수',s:2,c:400,at:8,v:16,r:4},d_statue:{n:'황금 물고기상',s:2,c:1500,at:12,v:24,r:5}};
function isD(k){return !!DEC[k]}
function placeDeco(k,x,y){pushUndo(DEC[k].n+' 놓기');setTimeout(endAct,0);if(DEC[k].gift){G.inv=G.inv||{};if(!(G.inv[k]>0)){toast('보관한 것이 없어요');return false}G.inv[k]--}else{if(WAL.get('pearl')<DEC[k].c){toast('진주가 모자라요');return false}WAL.add('pearl',-DEC[k].c)}snd('pop');var b={id:G.nid++,k:k,x:x,y:y,lv:1,buf:{},xpd:1};G.b.push(b);occ();var c=centerOf(b);dust(c.x,c.y,10,1);sparkle(c.x,c.y-30*cam.z,8);addXP(2);cityF=0;save();return true}
function decoPanel(b){var d=DEC[b.k],el=$('panel'),h='<button class="x" id="pX">✕</button><h2>🌸 '+d.n+'</h2><p class="prod">주변 '+d.r+'칸 땅값 +'+d.v+' · 집이 더 크게 자라요</p><div class="row"><button class="sub" id="pDel">'+(d.gift?'보관함으로 넣기':'치우기 (🫧'+Math.floor(d.c/2)+' 돌려받음)')+'</button></div>';
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
  else if(T.st==='away')h+='<div class="box">🚋 먼 바다로 떠났어요 · 돌아오기까지 <b>'+dur((T.back-NOW())/1000)+'</b></div><div class="row"><button id="tRush">💎 '+D.rushGems((T.back-NOW())/1000)+' 바로 돌아오기</button></div>';
  else if(T.st==='back')h+='<div class="box">🚋 열차가 돌아왔어요! 🧱 '+T.rw.brick+(T.rw.nail?' · 📌 '+T.rw.nail:'')+' · ⭐'+T.rw.xp+'</div><div class="row"><button id="tGet">받기</button></div>';
  else{h+='<div class="cars">'+T.cars.map(function(c,i){var k=Object.keys(c.it)[0],ok=(G.res[k]||0)>=c.it[k];return '<div class="car'+(c.full?' full':'')+'"><b>'+ICON[k]+' '+c.it[k]+'</b>'+(c.full?'<small>✓ 실었어요</small>':'<button data-c="'+i+'"'+(ok?'':' disabled')+'>싣기</button>')+'</div>'}).join('')+'</div>';
    h+='<p class="role">다 실으면 떠나요 · 돌아오면 🧱 '+T.rw.brick+(T.rw.nail?' · 📌 '+T.rw.nail:'')+' · ⭐'+T.rw.xp+' (다녀오는 데 '+dur(trainTrip())+')</p>'}
  h+='<p class="role">'+(B.train.role||'')+'</p>';el.innerHTML=h;el.hidden=false;$('pX').onclick=function(){SEL=null;closePanel()};
  el.querySelectorAll('[data-c]').forEach(function(x){x.onclick=function(){var c=T.cars[+x.dataset.c],k=Object.keys(c.it)[0];if((G.res[k]||0)<c.it[k])return;G.res[k]-=c.it[k];c.full=true;snd('load');if(T.cars.every(function(q){return q.full})){T.st='away';T.back=NOW()+trainTrip()*1000;toast('🚋 열차가 떠났어요');var cc=centerOf(b);dust(cc.x,cc.y,14,1.2)}save();trainPanel(b)}});
  if($('tGet'))$('tGet').onclick=function(){G.res.brick+=T.rw.brick;G.res.nail+=T.rw.nail;addXP(T.rw.xp);evtAdd(10);var cc=centerOf(b);float(cc.x,cc.y-70*cam.z,'+'+T.rw.brick+'🧱');G.tr=trainNew();save();trainPanel(b)};
  if($('tRush'))$('tRush').onclick=function(){var g=D.rushGems((T.back-NOW())/1000);if(g>WAL.get('gem')){toast('보석이 모자라요');return}WAL.add('gem',-g);T.back=NOW();T.st='back';save();trainPanel(b)};panelFor={tr:b}}
function trainTrip(){return 1800+lvOf('train')*60}

/* --- 돌아왔을 때 정산 창 --- */
function settle(awaySec,done){if(awaySec<300)return;var sum={};G.b.forEach(function(b){for(var k in b.buf){var v=Math.floor(b.buf[k]);if(v>0)sum[k]=(sum[k]||0)+v}});
  var el=$('panel'),h='<h2>🐠 다녀오셨어요!</h2><p class="role">'+dur(awaySec)+' 동안 마을 소식이에요</p><div class="box">'+(done?'<div>🔨 공사 '+done+'개가 끝났어요</div>':'')+
    (Object.keys(sum).length?'<div>쌓인 것: '+Object.keys(sum).map(function(k){return ICON[k]+' '+fmt(sum[k])}).join(' · ')+'</div>':'')+(ordReady()?'<div>🐢 보낼 수 있는 주문 '+ordReady()+'개</div>':'')+(G.tr&&G.tr.st==='back'?'<div>🚋 열차가 돌아왔어요</div>':'')+'</div>'+
    '<div class="row"><button id="sAll">모두 받기</button></div>';el.innerHTML=h;el.hidden=false;panelFor=null;
  $('sAll').onclick=function(){G.b.forEach(function(b){if(bufReady(b))collect(b)});closePanel()}}

/* --- 🐠 도미 비서: 처음 하는 사람 길잡이 --- */
var TUT=[
 {t:'산호궁 옆에 <b>산호 광산</b>을 지어 봐요',h:'🔨 짓기 → 🏭 생산',ok:function(){return !!bOf('quarry')},go:function(){openBuild('prod')},rw:50},
 {t:'광산 머리 위 <b>🪨 동그라미(말풍선)</b>를 눌러 산호석을 받아요',h:'노란 화살표가 가리키는 곳을 눌러요',ok:function(){return G.tutC},go:function(){var q=bOf('quarry');if(q)focus(q)},rw:30},
 {t:'<b>🏛 산호궁</b>을 Lv.2로 올려요',h:'산호궁을 눌러 ⬆ 올리기',ok:function(){return hallLv()>=2||!!bOf('hall').job},go:function(){var h=bOf('hall');focus(h);SEL=h;openPanel(h)},rw:80},
 {t:'길 옆에 <b>🏠 집 구역</b>을 4칸 칠해요',h:'🔨 짓기 → 🏘 구역 → 집, 끌어서 칠하기',ok:function(){var n=0;for(var k in G.zone)if(G.zone[k]==='R')n++;return n>=4},go:function(){startTool('zR')},rw:50},
 {t:'<b>숨샘</b>을 지어 산소를 넓혀요',h:'🔨 짓기 → ⚙ 기반',ok:function(){return !!bOf('pump')},go:function(){openBuild('base')},rw:60},
 {t:'물고기 <b>10마리</b>가 이사 오게 해요',h:'집이 길 · 산소에 닿아야 물고기가 와요',ok:function(){return CS.pop>=10},go:function(){lifePanel()},rw:80},
 {t:'<b>경단 공장</b>을 지어 주민 밥을 만들어요',h:'다시마 농장 → 경단 공장',ok:function(){return !!bOf('factory')},go:function(){openBuild('prod')},rw:100},
 {t:'<b>거북 택배</b>로 주문을 하나 보내요',h:'🔨 짓기 → 🐢 교역 → 거북 택배 정류장',ok:function(){return (G.ordSent|0)>0},go:function(){if(bOf('turtle'))orderPanel();else openBuild('trade')},rw:150}];
function tutPaint(){var el=$('tut'),i=G.tut|0;if(i>=TUT.length){el.hidden=true;return}var s=TUT[i];
  if(s.ok()){G.tut=i+1;WAL.add('pearl',s.rw);toast('🐠 잘했어요! 🫧'+s.rw);addXP(5);save();return tutPaint()}
  $('bTut').hidden=!G.tutMin;if(G.tutMin){el.hidden=true;return}el.hidden=!!TOOL||!$('panel').hidden||!$('tray').hidden;var hh2='<span class="av">🐠</span><div><small>도미 비서 · '+(i+1)+'/'+TUT.length+'</small><p>'+s.t+'</p><i>'+s.h+'</i></div><b>›</b><span class="tx" id="tutX">✕</span>';if(el.dataset.h!==hh2){el.dataset.h=hh2;el.innerHTML=hh2}}
$('tut').onclick=function(ev){if(ev.target.id==='tutX'){G.tutMin=true;save();tutPaint();return}var s=TUT[G.tut|0];if(s)s.go()};$('bTut').onclick=function(){G.tutMin=false;save();tutPaint()};
