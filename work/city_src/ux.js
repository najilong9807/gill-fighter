/* ===== 되돌리기 · 바로 옆에 짓기 · 프롤로그 · 길잡이 화살표 ===== */
/* --- ↶ 되돌리기: 짓기 · 업그레이드 · 도로 · 구역 · 장식 · 철거 · 영토 확장을 1분 안에는 되돌려요(쓴 진주 · 보석도 환급) --- */
var UNDO=[],ACT=null;
(function(){var _a=WAL.add;WAL.add=function(k,n){if(ACT)ACT.d[k]=(ACT.d[k]||0)+n;_a(k,n)}})();
function pushUndo(lab){var e={lab:lab,g:JSON.stringify(G),d:{},at:NOW()};UNDO.push(e);if(UNDO.length>12)UNDO.shift();ACT=e;return e}
function endAct(){var e=ACT;ACT=null;if(e&&e.g===JSON.stringify(G)&&!Object.keys(e.d).length)UNDO.pop();undoBtn()}
function undoOk(){var e=UNDO[UNDO.length-1];return e&&NOW()-e.at<60000?e:null}
function doUndo(){var e=undoOk();if(!e){toast('되돌릴 게 없어요');return}UNDO.pop();ACT=null;for(var k in e.d)if(k==='pearl'||k==='gem')WAL.add(k,-e.d[k]);G=JSON.parse(e.g);occ();cityF=0;POPS={};SEL=null;GH=null;$('place').hidden=true;closePanel();save();snd('pop');toast('↶ '+e.lab+' 되돌렸어요');undoBtn()}
function undoBtn(){var e=undoOk(),b=$('bUndo');if(!b)return;b.hidden=!e;if(e)b.innerHTML='↶<small>'+e.lab+'</small>'}
/* 1.1.32 마을 점검: 되돌리기 중복 받기 막기 — 되돌리기 기록이 있는 동안 지갑에 진주 · 보석이 '들어오면'(받기 · 주문 · 도장 · 의뢰) 또는 마을 밖으로 무언가 나가거나(공방 → 수족관) 들어오면(재료 상자) 되돌리기 기록을 지움.
   전엔 G 만 1분 전으로 돌아가고 그 사이 받은 진주 · 보석은 지갑에 남아, 같은 보상을 계속 다시 받을 수 있었음 */
/* 저장에 모르는 건물(없앤 건물 · 옛 판 복원)이 있어도 마을이 안 켜지는 일 없게 */
var _ratesG=rates;rates=function(b){try{return _ratesG(b)}catch(e){return {}}};
function undoClear(){if(!UNDO.length)return;UNDO=[];ACT=null;try{undoBtn()}catch(e){}}
(function(){var _b=WAL.add;WAL.add=function(k,n){if(!ACT&&n>0)undoClear();return _b(k,n)}})();
$('bUndo').onclick=doUndo;$('bUndo2').onclick=function(){FLOATU=null;doUndo()};

/* --- 짓기: 카드를 누르면 화면 가운데에서 가장 가까운 빈자리(도로 옆)에 바로 놓이고, 끌어서 옮겨요 --- */
function okSpot(k,x,y){var w=siteWhy(k,x,y);if(isD(k)&&w==='도로에 붙여 지어야 해요')w='';return !w}
function findSpot(k){var s=sz(k),cs=[tileAt(VW/2,VH*.45)],h=bOf('hall');if(h)cs.push({i:h.x+1,j:h.y+1});
  for(var q=0;q<cs.length;q++){var c=cs[q];for(var r=0;r<26;r++)for(var dx=-r;dx<=r;dx++)for(var dy=-r;dy<=r;dy++){if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue;var x=c.i+dx-Math.floor((s-1)/2),y=c.j+dy-Math.floor((s-1)/2);if(okSpot(k,x,y))return {x:x,y:y}}}
  var c0=cs[0];return {x:c0.i,y:c0.j}}
function ghostAt(k){var p=findSpot(k);GH={k:k,x:p.x,y:p.y};var s=sz(k),cx=p.x+(s-1)/2,cy=p.y+(s-1)/2,sc2=sc(cx,cy);if(sc2.x<40||sc2.x>VW-40||sc2.y<140||sc2.y>VH-260){cam.x=(cx-cy)*TW/2;cam.y=(cx+cy)*TH/2+60/cam.z}$('tray').hidden=true;placeBar()}
var GDRAG=null;
function ghostHit(x,y){if(!GH)return false;var t=tileAt(x,y),s=sz(GH.k);return t.i>=GH.x-1&&t.i<=GH.x+s&&t.j>=GH.y-1&&t.j<=GH.y+s}

/* 1.1.32 마을 점검: 도미 비서 카드를 누르면 고르고 · 옮기고 · ✓ 누를 것 없이 산호궁 가까운 '지을 수 있는 자리'에 바로 지어요(돈 · 일꾼이 모자라면 예전처럼 짓기 창) */
function spotNear(k){var s=sz(k),h=bOf('hall'),c=h?{i:h.x+1,j:h.y+1}:tileAt(VW/2,VH*.5);
  for(var r=1;r<30;r++)for(var dx=-r;dx<=r;dx++)for(var dy=-r;dy<=r;dy++){if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue;var x=c.i+dx-Math.floor((s-1)/2),y=c.j+dy-Math.floor((s-1)/2);if(!siteWhy(k,x,y))return {x:x,y:y}}return null}
function quickBuild(k){var w=canStart(k,1),p=w.length?null:spotNear(k);if(w.length)toast(w[0]);if(!p){openBuild(CATOF[k]);return}
  endTool();closeBuild();closePanel();GH=null;$('place').hidden=true;$('ghb').hidden=true;
  pushUndo(B[k].n+' 짓기');setTimeout(endAct,0);var b={id:G.nid++,k:k,x:p.x,y:p.y,lv:0,buf:{}};G.b.push(b);occ();startJob(b,1);FLOATU={id:b.id,until:NOW()+8000};setTab(null);save();snd('done');focus(b);var c=centerOf(b);dust(c.x,c.y,12,1);toast('🦀 게 일꾼이 '+B[k].n+'을(를) 짓기 시작했어요')}

/* 1.1.33: '구역 칠하기' 대신 집 · 가게 · 공방을 건물처럼 직접 놓기 — 놓는 즉시 게 일꾼들이 짓기 시작(따로 일하는 반이라 게 일꾼 수에 안 셈), 다 지으면 예전처럼 저절로 커짐 */
var H_COST=5;
function houseWhy(k,x,y){var w=siteWhy(k,x,y);if(w)return w;if(!O2[x+','+y])return '산소가 안 닿아요 · 산소 펌프 가까이에 지어요';return ''}
function hSpot(k,near){var cs=[];if(near)cs.push(near);cs.push(tileAt(VW/2,VH*.45));var h=bOf('hall');if(h)cs.push({i:h.x+1,j:h.y+1});
  for(var q=0;q<cs.length;q++){var c=cs[q];for(var r=0;r<26;r++)for(var dx=-r;dx<=r;dx++)for(var dy=-r;dy<=r;dy++){if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue;var x=c.i+dx,y=c.j+dy;if(!houseWhy(k,x,y))return {x:x,y:y}}}return null}
function houseAt(z){var k='z'+z+Math.floor(Math.random()*3),p=hSpot(k);if(!p){var c0=tileAt(VW/2,VH*.45);p={x:c0.i,y:c0.j}}GH={k:k,x:p.x,y:p.y,h:z};var sc2=sc(p.x,p.y);if(sc2.x<40||sc2.x>VW-40||sc2.y<140||sc2.y>VH-260){cam.x=(p.x-p.y)*TW/2;cam.y=(p.x+p.y)*TH/2+60/cam.z}$('tray').hidden=true;placeBar()}
function placeHouse(z,x,y,quiet){var k='z'+z+Math.floor(Math.random()*3),key=x+','+y;if(houseWhy(k,x,y))return false;if(hallLv()<ZN[z].at)return false;if(WAL.get('pearl')<H_COST){toast('진주가 모자라요');return false}
  WAL.add('pearl',-H_COST);G.zone[key]=z;var now=NOW(),nb={id:G.nid++,k:k,x:x,y:y,lv:0,occ:0,buf:{}};G.b.push(nb);occ();nb.job={L:1,start:now,end:now+ZBT[1]*1000};cityF=0;if(!quiet){snd('build');var c=centerOf(nb);dust(c.x,c.y,10,.8)}return true}
function placeHouseBar(el){var z=GH.h,Z=ZN[z],why=houseWhy(GH.k,GH.x,GH.y);el.hidden=false;GH.why=why;
  el.innerHTML='<div class="pt"><b>'+Z.ic+' '+Z.n+'</b> · 🫧'+H_COST+'<br><small>'+(why||'여기에 지을 수 있어요 · 끌거나 다른 칸을 눌러 옮겨요 · ✓를 또 누르면 옆에 한 채 더')+'</small></div>';ghBtns(why,'짓기');
  $('pNo').onclick=function(){GH=null;el.hidden=true;$('ghb').hidden=true;openBuild('zone')};
  $('pOk').onclick=function(){if(!GH||GH.why)return;pushUndo(Z.ic+' '+Z.n+' 짓기');var ok=placeHouse(z,GH.x,GH.y);setTimeout(endAct,0);if(!ok)return;save();toast('🦀 게 일꾼들이 '+Z.n+'을(를) 짓기 시작했어요');
    var nk='z'+z+Math.floor(Math.random()*3),np=hSpot(nk,{i:GH.x,j:GH.y});if(np){GH.k=nk;GH.x=np.x;GH.y=np.y;placeBar()}else{GH=null;el.hidden=true;$('ghb').hidden=true}}}
/* 도미 비서 카드: 산호궁 가까운 도로 옆에 집 4채를 바로 지음 */
function quickZone(){var k0='zR0',got=0,near=null;endTool();closeBuild();closePanel();GH=null;$('place').hidden=true;pushUndo('🏠 집 짓기');
  var h=bOf('hall');near=h?{i:h.x+1,j:h.y+1}:null;for(var n=0;n<4;n++){var p=hSpot(k0,near);if(!p)break;if(!placeHouse('R',p.x,p.y,true))break;got++;near={i:p.x,j:p.y}}
  setTimeout(endAct,0);save();if(!got){toast('도로 옆 · 산소가 닿는 빈 땅이 없어요 · 산소 펌프 · 도로를 먼저 놓아요');openBuild('zone');return}
  snd('done');var last=G.b[G.b.length-1],c=centerOf(last);focus(last);G.b.slice(-got).forEach(function(b){var cc=centerOf(b);dust(cc.x,cc.y,8,.7)});toast('🦀 게 일꾼들이 집 '+got+'채를 짓기 시작했어요 · 다 지으면 물고기들이 이사 와요')}

/* --- 📖 프롤로그 --- */
var PRO=[
 {img:'d_shipw',t:'깊고 푸른 바닷속',p:'아주 오래전, 이곳엔 물고기들이 모여 사는 산호 마을이 있었어요. 큰 해류가 휩쓸고 간 뒤로 텅 비어 버렸지요.'},
 {img:'hall',t:'남은 건 작은 산호궁 하나',p:'지금은 분홍 산호궁 하나만 남았어요. 바다 물고기들이 다시 모여 살 곳을 찾아 헤매고 있어요.'},
 {img:'zR0',t:'당신은 새 촌장!',p:'진주(바닷속 돈)로 게 일꾼에게 공사를 맡기고, 도로 옆에 집을 지어 주면 떠돌던 물고기들이 이사 와요. 마을 입구를 지난 물고기는 다리가 쑥 자라 주민이 돼요.'},
 {img:'quarry',t:'모으고, 만들고, 키우고',p:'주민들은 광산 · 농장 · 공장에서 일해 재료를 만들어요. 건물 머리 위 동그란 말풍선(🪨 🌿 🫧)을 눌러 창고로 모으고, 그 재료로 건물을 올리거나 이웃 바다 마을에 팔아 진주를 벌어요.'},
 {img:'pal25',t:'목표는 용궁!',p:'산호궁을 올릴수록 새 건물 · 땅 · 고층 건물이 열려요. 25단계가 되면 반짝이는 용궁이 돼요.'},
 {img:'dom',t:'제가 도와드릴게요',p:'저는 도미 비서예요. 화면 위 노란 말풍선과 깜빡이는 화살표를 따라오시면 돼요. 그럼 시작해 볼까요?'}];
function proImg(k){if(k==='dom')return '<div class="proav">🐠</div>';if(k==='pal25'){var r=palaceL(25),sv='data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="'+(GX-170)+' '+(r.top-10)+' 340 '+(GY+90-r.top+10)+'">'+DEFS+r.svg+'</svg>');return CITY_ART.hall?'<img src="'+caSrc('hall',25)+'" data-fb="'+sv+'" onerror="if(this.dataset.fb){this.src=this.dataset.fb;this.dataset.fb=\'\'}">':'<img src="'+sv+'">'}return '<img src="'+thumb(k)+'">'}
function prologue(i){i=i||0;var el=$('pro'),s=PRO[i];el.hidden=false;el.innerHTML='<div class="pcard"><div class="pimg">'+proImg(s.img)+'</div><h3>'+s.t+'</h3><p>'+s.p+'</p><div class="dots">'+PRO.map(function(_,j){return '<i class="'+(j===i?'on':'')+'"></i>'}).join('')+'</div><div class="prow"><button id="proSkip">건너뛰기</button><button id="proNext" class="main">'+(i<PRO.length-1?'다음 ›':'시작하기!')+'</button></div></div>';
  $('proSkip').onclick=function(){el.hidden=true;G.pro=1;save()};$('proNext').onclick=function(){snd('tap');if(i<PRO.length-1)prologue(i+1);else{el.hidden=true;G.pro=1;save();snd('done');var h=bOf('hall');if(h)focus(h)}}}

/* --- 🐠 길잡이: 지금 눌러야 할 곳에 깜빡이는 표시 · 지도엔 화살표 --- */
function hintEl(sel){document.querySelectorAll('.hint').forEach(function(e){if(!sel||!e.matches(sel))e.classList.remove('hint')});if(sel){var e=document.querySelector(sel);if(e)e.classList.add('hint')}}
function tutTarget(){var i=G.tut|0;if(G.tutMin||i>=TUT.length||!$('pro').hidden)return null;
  if(i===0){if(GH)return {dom:'#pOk'};if(!$('tray').hidden)return {dom:CAT==='prod'?'.card[data-k=quarry]':'.pills [data-c=prod]'};return {dom:'#tut'}}
  if(i===1){var q=bOf('quarry');if(!q)return null;var bb=BUBS.find(function(x){return x.b===q});if(bb)return {x:bb.x,y:bb.y-26,txt:'눌러요!'};var c=centerOf(q);return {x:c.x,y:c.y-(q.job?175:90)*cam.z,txt:q.job?'다 지어지면 여기 말풍선이 떠요':'곧 말풍선이 떠요'}}
  if(i===2){if(!$('panel').hidden)return {dom:'#pUp'};var h=bOf('hall'),c2=centerOf(h);return {x:c2.x,y:c2.y-140*cam.z,txt:'산호궁을 눌러요'}}
  if(i===3){if(GH&&GH.h)return {dom:'#pOk'};if(!$('tray').hidden)return {dom:CAT==='zone'?'[data-hk=R]':'.pills [data-c=zone]'};return {dom:'#tut'}}
  if(i===4){if(GH)return {dom:'#pOk'};if(!$('tray').hidden)return {dom:CAT==='base'?'.card[data-k=pump]':'.pills [data-c=base]'};return {dom:'#tut'}}
  if(i===5)return {dom:'#hF'};
  if(i===6){if(GH)return {dom:'#pOk'};if(!$('tray').hidden)return {dom:CAT==='prod'?(bOf('farm')?'.card[data-k=factory]':'.card[data-k=farm]'):'.pills [data-c=prod]'};return {dom:'#tut'}}
  if(i===7){if(!bOf('turtle')){if(GH)return {dom:'#pOk'};if(!$('tray').hidden)return {dom:CAT==='trade'?'.card[data-k=turtle]':'.pills [data-c=trade]'};return {dom:'#tut'}}if(panelFor==='ord')return {dom:'.ord.can button'};return {dom:'#bOrd'}}
  return null}
var HSTEP=-1,HT0=0;function drawHint(t){var g=tutTarget();hintEl(g&&g.dom?g.dom:null);if(!g||g.dom)return;if((G.tut|0)!==HSTEP){HSTEP=G.tut|0;HT0=t}
  if(g.x!=null&&t-HT0<2500&&!drag&&(g.y<380||g.y>VH-230||g.x<40||g.x>VW-40)){cam.x+=(g.x-VW/2)/cam.z*.1;cam.y+=(g.y-VH*.6)/cam.z*.1}if(g.txt2){ctx.save();ctx.font='400 15px "Jua",sans-serif';ctx.textAlign='center';var w=ctx.measureText(g.txt2).width+24;ctx.fillStyle='rgba(34,48,77,.88)';rr(VW/2-w/2,VH-150,w,32,14);ctx.fill();ctx.fillStyle='#fff';ctx.fillText(g.txt2,VW/2,VH-128);ctx.restore();return}
  var b=Math.sin(t*.008)*7;ctx.save();ctx.translate(g.x,g.y-24+b);ctx.fillStyle='#ffd54a';ctx.strokeStyle=OUT;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-12,-22);ctx.lineTo(12,-22);ctx.lineTo(12,-6);ctx.lineTo(22,-6);ctx.lineTo(0,16);ctx.lineTo(-22,-6);ctx.lineTo(-12,-6);ctx.closePath();ctx.fill();ctx.stroke();
  if(g.txt){ctx.font='400 14px "Jua",sans-serif';ctx.textAlign='center';var w2=ctx.measureText(g.txt).width+20;ctx.fillStyle='#fffdf7';rr(-w2/2,-56,w2,28,12);ctx.fill();ctx.stroke();ctx.fillStyle=OUT;ctx.fillText(g.txt,0,-37)}ctx.restore();
  ctx.save();ctx.strokeStyle='rgba(255,213,74,'+(.5+.4*Math.sin(t*.008))+')';ctx.lineWidth=4;ctx.beginPath();ctx.arc(g.x,g.y+24,26+6*Math.sin(t*.008),0,7);ctx.stroke();ctx.restore()}
if(!G.pro)setTimeout(function(){prologue(0)},400);

/* --- 아가미 파이터 안에서 열렸을 때: 나가기 버튼 --- */
window.GF_CITY_SAVE=function(){try{G.cam=cam}catch(e){}save()};
var INTAB=/[?&]tab=1/.test(location.search||'');
if(EMB&&!INTAB){var bb=document.createElement('button');bb.id='bBack';bb.innerHTML='‹<small>나가기</small>';bb.setAttribute('aria-label','아가미 파이터로 돌아가기');$('side').insertBefore(bb,$('side').firstChild);bb.onclick=function(){save();try{window.parent.GF_CITY_CLOSE&&window.parent.GF_CITY_CLOSE()}catch(e){}}}
