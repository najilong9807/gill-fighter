/* ===== 되돌리기 · 바로 옆에 짓기 · 프롤로그 · 길잡이 화살표 ===== */
/* --- ↶ 되돌리기: 짓기 · 올리기 · 길 · 구역 · 꾸미기 · 정리 · 땅을 1분 안에는 되돌려요(쓴 진주 · 보석도 돌려받음) --- */
var UNDO=[],ACT=null;
(function(){var _a=WAL.add;WAL.add=function(k,n){if(ACT)ACT.d[k]=(ACT.d[k]||0)+n;_a(k,n)}})();
function pushUndo(lab){var e={lab:lab,g:JSON.stringify(G),d:{},at:NOW()};UNDO.push(e);if(UNDO.length>12)UNDO.shift();ACT=e;return e}
function endAct(){var e=ACT;ACT=null;if(e&&e.g===JSON.stringify(G)&&!Object.keys(e.d).length)UNDO.pop();undoBtn()}
function undoOk(){var e=UNDO[UNDO.length-1];return e&&NOW()-e.at<60000?e:null}
function doUndo(){var e=undoOk();if(!e){toast('되돌릴 게 없어요');return}UNDO.pop();ACT=null;for(var k in e.d)if(k==='pearl'||k==='gem')WAL.add(k,-e.d[k]);G=JSON.parse(e.g);occ();cityF=0;POPS={};SEL=null;GH=null;$('place').hidden=true;closePanel();save();snd('pop');toast('↶ '+e.lab+' 되돌렸어요');undoBtn()}
function undoBtn(){var e=undoOk(),b=$('bUndo');if(!b)return;b.hidden=!e;if(e)b.innerHTML='↶<small>'+e.lab+'</small>'}
$('bUndo').onclick=doUndo;$('bUndo2').onclick=function(){FLOATU=null;doUndo()};

/* --- 짓기: 카드를 누르면 화면 가운데에서 가장 가까운 빈자리(길 옆)에 바로 놓이고, 끌어서 옮겨요 --- */
function okSpot(k,x,y){var w=siteWhy(k,x,y);if(isD(k)&&w==='길에 붙여 지어야 해요')w='';return !w}
function findSpot(k){var s=sz(k),cs=[tileAt(VW/2,VH*.45)],h=bOf('hall');if(h)cs.push({i:h.x+1,j:h.y+1});
  for(var q=0;q<cs.length;q++){var c=cs[q];for(var r=0;r<26;r++)for(var dx=-r;dx<=r;dx++)for(var dy=-r;dy<=r;dy++){if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue;var x=c.i+dx-Math.floor((s-1)/2),y=c.j+dy-Math.floor((s-1)/2);if(okSpot(k,x,y))return {x:x,y:y}}}
  var c0=cs[0];return {x:c0.i,y:c0.j}}
function ghostAt(k){var p=findSpot(k);GH={k:k,x:p.x,y:p.y};var s=sz(k),cx=p.x+(s-1)/2,cy=p.y+(s-1)/2,sc2=sc(cx,cy);if(sc2.x<40||sc2.x>VW-40||sc2.y<140||sc2.y>VH-260){cam.x=(cx-cy)*TW/2;cam.y=(cx+cy)*TH/2+60/cam.z}$('tray').hidden=true;placeBar()}
var GDRAG=null;
function ghostHit(x,y){if(!GH)return false;var t=tileAt(x,y),s=sz(GH.k);return t.i>=GH.x-1&&t.i<=GH.x+s&&t.j>=GH.y-1&&t.j<=GH.y+s}

/* --- 📖 프롤로그 --- */
var PRO=[
 {img:'d_shipw',t:'깊고 푸른 바닷속',p:'아주 오래전, 이곳엔 물고기들이 모여 사는 산호 마을이 있었어요. 큰 해류가 휩쓸고 간 뒤로 텅 비어 버렸지요.'},
 {img:'hall',t:'남은 건 작은 산호궁 하나',p:'지금은 분홍 산호궁 하나만 남았어요. 바다 물고기들이 다시 모여 살 곳을 찾아 헤매고 있어요.'},
 {img:'zR0',t:'당신은 새 촌장!',p:'진주로 건물을 짓고, 길 옆에 집 구역을 칠하면 물고기들이 이사 와요. 마을 입구를 지난 물고기는 다리가 쑥 자라 주민이 돼요.'},
 {img:'quarry',t:'모으고, 만들고, 키우고',p:'건물 머리 위에 뜨는 동그란 말풍선(🪨 🌿 🫧)을 눌러 재료를 받아요. 재료로 건물을 올리고, 주문을 보내 진주를 벌어요.'},
 {img:'pal25',t:'목표는 용궁!',p:'산호궁을 올릴수록 새 건물 · 땅 · 고층 건물이 열려요. 25단계가 되면 반짝이는 용궁이 돼요.'},
 {img:'dom',t:'제가 도와드릴게요',p:'저는 도미 비서예요. 화면 위 노란 말풍선과 깜빡이는 화살표를 따라오시면 돼요. 그럼 시작해 볼까요?'}];
function proImg(k){if(k==='dom')return '<div class="proav">🐠</div>';if(k==='pal25'){var r=palaceL(25);return '<img src="data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="'+(GX-170)+' '+(r.top-10)+' 340 '+(GY+90-r.top+10)+'">'+DEFS+r.svg+'</svg>')+'">'}return '<img src="'+thumb(k)+'">'}
function prologue(i){i=i||0;var el=$('pro'),s=PRO[i];el.hidden=false;el.innerHTML='<div class="pcard"><div class="pimg">'+proImg(s.img)+'</div><h3>'+s.t+'</h3><p>'+s.p+'</p><div class="dots">'+PRO.map(function(_,j){return '<i class="'+(j===i?'on':'')+'"></i>'}).join('')+'</div><div class="prow"><button id="proSkip">건너뛰기</button><button id="proNext" class="main">'+(i<PRO.length-1?'다음 ›':'시작하기!')+'</button></div></div>';
  $('proSkip').onclick=function(){el.hidden=true;G.pro=1;save()};$('proNext').onclick=function(){snd('tap');if(i<PRO.length-1)prologue(i+1);else{el.hidden=true;G.pro=1;save();snd('done');var h=bOf('hall');if(h)focus(h)}}}

/* --- 🐠 길잡이: 지금 눌러야 할 곳에 깜빡이는 표시 · 지도엔 화살표 --- */
function hintEl(sel){document.querySelectorAll('.hint').forEach(function(e){if(!sel||!e.matches(sel))e.classList.remove('hint')});if(sel){var e=document.querySelector(sel);if(e)e.classList.add('hint')}}
function tutTarget(){var i=G.tut|0;if(G.tutMin||i>=TUT.length||!$('pro').hidden)return null;
  if(i===0){if(GH)return {dom:'#pOk'};if(!$('tray').hidden)return {dom:CAT==='prod'?'.card[data-k=quarry]':'.pills [data-c=prod]'};return {dom:'#bBuild'}}
  if(i===1){var q=bOf('quarry');if(!q)return null;var bb=BUBS.find(function(x){return x.b===q});if(bb)return {x:bb.x,y:bb.y-26,txt:'눌러요!'};var c=centerOf(q);return {x:c.x,y:c.y-90*cam.z,txt:q.job?'다 지어지면 여기 말풍선이 떠요':'곧 말풍선이 떠요'}}
  if(i===2){if(!$('panel').hidden)return {dom:'#pUp'};var h=bOf('hall'),c2=centerOf(h);return {x:c2.x,y:c2.y-140*cam.z,txt:'산호궁을 눌러요'}}
  if(i===3){if(TOOL==='zR')return {txt2:'길 옆 칸을 손가락으로 쭉 끌어요'};if(!$('tray').hidden)return {dom:CAT==='zone'?'[data-tool=zR]':'.pills [data-c=zone]'};return {dom:'#bBuild'}}
  if(i===4){if(GH)return {dom:'#pOk'};if(!$('tray').hidden)return {dom:CAT==='base'?'.card[data-k=pump]':'.pills [data-c=base]'};return {dom:'#bBuild'}}
  if(i===5)return {dom:'#hF'};
  if(i===6){if(GH)return {dom:'#pOk'};if(!$('tray').hidden)return {dom:CAT==='prod'?(bOf('farm')?'.card[data-k=factory]':'.card[data-k=farm]'):'.pills [data-c=prod]'};return {dom:'#bBuild'}}
  if(i===7){if(!bOf('turtle')){if(GH)return {dom:'#pOk'};if(!$('tray').hidden)return {dom:CAT==='trade'?'.card[data-k=turtle]':'.pills [data-c=trade]'};return {dom:'#bBuild'}}if(panelFor==='ord')return {dom:'.ord.can button'};return {dom:'#bOrd'}}
  return null}
var HSTEP=-1,HT0=0;function drawHint(t){var g=tutTarget();hintEl(g&&g.dom?g.dom:null);if(!g||g.dom)return;if((G.tut|0)!==HSTEP){HSTEP=G.tut|0;HT0=t}
  if(g.x!=null&&t-HT0<2500&&!drag&&(g.y<380||g.y>VH-230||g.x<40||g.x>VW-40)){cam.x+=(g.x-VW/2)/cam.z*.1;cam.y+=(g.y-VH*.6)/cam.z*.1}if(g.txt2){ctx.save();ctx.font='400 15px "Jua",sans-serif';ctx.textAlign='center';var w=ctx.measureText(g.txt2).width+24;ctx.fillStyle='rgba(34,48,77,.88)';rr(VW/2-w/2,VH-150,w,32,14);ctx.fill();ctx.fillStyle='#fff';ctx.fillText(g.txt2,VW/2,VH-128);ctx.restore();return}
  var b=Math.sin(t*.008)*7;ctx.save();ctx.translate(g.x,g.y-24+b);ctx.fillStyle='#ffd54a';ctx.strokeStyle=OUT;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-12,-22);ctx.lineTo(12,-22);ctx.lineTo(12,-6);ctx.lineTo(22,-6);ctx.lineTo(0,16);ctx.lineTo(-22,-6);ctx.lineTo(-12,-6);ctx.closePath();ctx.fill();ctx.stroke();
  if(g.txt){ctx.font='400 14px "Jua",sans-serif';ctx.textAlign='center';var w2=ctx.measureText(g.txt).width+20;ctx.fillStyle='#fffdf7';rr(-w2/2,-56,w2,28,12);ctx.fill();ctx.stroke();ctx.fillStyle=OUT;ctx.fillText(g.txt,0,-37)}ctx.restore();
  ctx.save();ctx.strokeStyle='rgba(255,213,74,'+(.5+.4*Math.sin(t*.008))+')';ctx.lineWidth=4;ctx.beginPath();ctx.arc(g.x,g.y+24,26+6*Math.sin(t*.008),0,7);ctx.stroke();ctx.restore()}
if(!G.pro)setTimeout(function(){prologue(0)},400);

/* --- 아가미 파이터 안에서 열렸을 때: 나가기 버튼 --- */
if(EMB){var bb=document.createElement('button');bb.id='bBack';bb.innerHTML='‹<small>나가기</small>';bb.setAttribute('aria-label','아가미 파이터로 돌아가기');$('side').insertBefore(bb,$('side').firstChild);bb.onclick=function(){save();try{window.parent.GF_CITY_CLOSE&&window.parent.GF_CITY_CLOSE()}catch(e){}}}
