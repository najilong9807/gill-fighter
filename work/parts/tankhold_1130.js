/* ===== 1.1.30 늑구 '수족관 꾹 누르면 회수 버튼 나오게 · 꾹 누르고 이동 가능하게 · 산호초도 이동 가능하게'
   - 꾸미기 모드가 아닐 때도: 소품을 꾹(0.42초) 누르면 집혀서(진동 · 살짝 들림) 그대로 끌어 옮김. 손을 떼면 그 자리에 놓이고
     소품 위에 작은 도구 [회수 · 꾸미기]가 뜸. 회수 = 꾸미기의 '보관'과 같음(보관함으로, 보물 상자는 진주 먼저 받음, 이어진 전구 줄 정리)
   - 반짝 산호(집 옆 톡톡 산호)도 꾹 눌러 바닥을 따라 좌우로 옮김(save.aby.cx = 수족관 폭 대비 0~1). 도구는 [제자리]
   - 꾸미기 모드 안에서도 산호를 끌어 옮길 수 있음
   - 꾹 누르는 동안 손가락 둘레에 동그라미가 차오름. 조금이라도 밀면(8px) 화면 밀기로 넘어가 꾹은 취소
   - 친구 수족관 구경 · 구경 모드 · 두 손가락 확대 중엔 안 함 ===== */
(function(){
var HOLD_MS=420,HD=null,TB2=null,TBK=null,TBT=0,RING=null;
var W5={ret:{ko:'회수',en:'Put away',ja:'しまう',es:'Guardar',vi:'Cất'},edit:{ko:'꾸미기',en:'Decorate',ja:'かざる',es:'Decorar',vi:'Trang trí'},home:{ko:'제자리',en:'Reset spot',ja:'元の場所',es:'Volver',vi:'Về chỗ cũ'},
  stored:{ko:'보관함에 넣었어요',en:'Put away',ja:'しまいました',es:'Guardado',vi:'Đã cất'},storedS:{ko:'꾸미기에서 다시 놓을 수 있어요',en:'Place it again from Decorate',ja:'「かざる」からまた置けます',es:'Vuelve a colocarlo desde Decorar',vi:'Đặt lại trong Trang trí'},
  tip:{ko:'소품 · 산호를 꾹 누르면 옮기고 회수할 수 있어요',en:'Press and hold a decoration or the coral to move it or put it away',ja:'小物やサンゴを長押しすると動かしたり、しまったりできます',es:'Mantén pulsado un adorno o el coral para moverlo o guardarlo',vi:'Nhấn giữ đồ trang trí hoặc san hô để di chuyển hoặc cất đi'},
  tipS:{ko:'꾹 누른 채로 끌면 옮겨져요',en:'Keep holding and drag to move it',ja:'長押ししたままドラッグで移動',es:'Sigue pulsando y arrastra para moverlo',vi:'Giữ và kéo để di chuyển'}};
function w5(k){var o=W5[k],l=(typeof SUBL==='string'&&SUBL)||LANG||'ko';return o[l]||o.en}

/* --- 반짝 산호 자리: 옮긴 자리가 있으면 그 자리(바닥 높이는 그 자리의 바닥) --- */
var coralPosH=coralPos;coralPos=function(){var c=coralPosH.apply(this,arguments);try{var o=AB();if(typeof o.cx==='number'&&o.cx>=0&&o.cx<=1){var x=o.cx*TWW();c.x=x;c.y=floorAt(x)+ch*.022}}catch(e){}return c};

/* --- 화면 좌표 <-> 수족관 좌표 --- */
function w2s(wx,wy){return {x:(wx-tankCam)*tankZ+xOff(),y:wy*tankZ-decoVo+zOff()}}
function okHere(){return state==='home'&&page==='tank'&&!VISIT&&!VIEWM}
function itemAt(e){var wx=s2wx(e.clientX),wy=s2wy(e.clientY),i=decoHit(wx,wy);if(i>=0){var it=DS().placed[i];if(it&&!it.pv)return {k:'it',i:i,it:it,wx:wx,wy:wy}}
  try{if(coralHit(wx,wy)&&(coralFront()||!houseHit(wx,wy)))return {k:'coral',wx:wx,wy:wy}}catch(x){}return null}

/* --- 꾹 누르는 동안 동그라미 --- */
function ringShow(x,y){ringHide();var r=document.createElement('div');r.id='tkHoldRing';r.innerHTML='<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="27" class="bg"/><circle cx="32" cy="32" r="27" class="fg"/></svg>';r.style.left=x+'px';r.style.top=y+'px';document.body.appendChild(r);RING=r}
function ringHide(){if(RING){RING.remove();RING=null}}

/* --- 집은 소품 위 작은 도구 --- */
function bar(){if(TB2)return TB2;var b=document.createElement('div');b.id='tkHoldBar';b.hidden=true;b.innerHTML='<button type="button" data-a="ret"></button><button type="button" data-a="edit"></button><button type="button" data-a="home"></button>';
  b.addEventListener('pointerdown',function(e){e.stopPropagation()});
  b.addEventListener('click',function(e){var a=e.target.closest('button');if(!a)return;e.stopPropagation();act(a.dataset.a)});
  document.body.appendChild(b);TB2=b;return b}
function barShow(k){var b=bar();TBK=k;TBT=performance.now();
  var R=b.querySelector('[data-a=ret]'),E=b.querySelector('[data-a=edit]'),H=b.querySelector('[data-a=home]');
  R.textContent='📦 '+w5('ret');E.textContent='🎨 '+w5('edit');H.textContent='↩ '+w5('home');
  R.hidden=k.k!=='it';E.hidden=k.k!=='it';H.hidden=!(k.k==='coral'&&typeof AB().cx==='number');
  if(k.k==='coral'&&H.hidden){b.hidden=true;return}
  b.hidden=false;place();loop()}
function barHide(){if(TB2)TB2.hidden=true;TBK=null}
function anchor(k){try{if(k.k==='coral'){var c=coralPos();return {x:c.x,y:c.y-c.h*1.1}}var it=k.it,D=decoById(it.k);if(!D)return null;var w=decoW(D,it.s),h=w*decoAR(D);return {x:it.x*TWW(),y:it.y*ch-h*.5}}catch(e){return null}}
function place(){if(!TB2||TB2.hidden||!TBK)return;var a=anchor(TBK);if(!a){barHide();return}var s=w2s(a.x,a.y),bw=TB2.offsetWidth||150,bh=TB2.offsetHeight||40;
  var x=clamp(s.x-bw/2,8,innerWidth-bw-8),y=clamp(s.y-bh-10,8,innerHeight-bh-90);TB2.style.left=x+'px';TB2.style.top=y+'px';TB2.style.setProperty('--ax',clamp(s.x-x,18,bw-18)+'px')}
function loop(){if(!TB2||TB2.hidden)return;if(!okHere()||deco.on||performance.now()-TBT>6000){barHide();return}place();requestAnimationFrame(loop)}
function act(a){var k=TBK;if(!k)return;buzz(10);
  if(a==='ret'&&k.k==='it'){var p=DS().placed,i=p.indexOf(k.it);if(i<0){barHide();return}var it=p[i],d=DS();
    if(it.k==='chest'){try{chestCollect(it)}catch(e){}delete it.t}p.splice(i,1);d.inv[it.k]=(d.inv[it.k]||0)+1;try{aqPrune()}catch(e){}
    persist();refreshTank();barHide();try{msEv('tkRet')}catch(e){}try{svSnd('bub')}catch(e){}banner(((decoById(it.k)||{}).name||'')+' · '+w5('stored'),w5('storedS'));return}
  if(a==='edit'&&k.k==='it'){var j=DS().placed.indexOf(k.it);barHide();decoStart();if(j>=0){deco.sel=j;decoTools()}return}
  if(a==='home'&&k.k==='coral'){delete AB().cx;persist();barHide();try{svSnd('bub')}catch(e){}return}}

/* --- 꾹 누르기 → 집기 → 끌기 --- */
function grab(){var h=HD;if(!h||h.on)return;h.on=true;ringHide();barHide();
  try{tpan=null;camVel=0}catch(e){}buzz([12,20,12]);try{msEv('tkHold')}catch(e){}try{svSnd('bub',.8)}catch(e){}
  if(h.k==='it'){var it=h.it;h.dx=it.x*TWW()-h.wx;h.dy=it.y*ch-h.wy}else{var c=coralPos();h.dx=c.x-h.wx;try{ABY.sq=1}catch(e){}}
  try{cv.setPointerCapture(h.id)}catch(e){}
  if(!save.tkHoldS){save.tkHoldS=1;banner(w5('tipS'),'')}}
function down(e){if(HD&&HD.id!==e.pointerId){cancel();return}  /* 두 손가락 = 확대 */
  if(TB2&&!TB2.hidden&&performance.now()-TBT>150)barHide();
  if(!okHere()||deco.on||e.button>0)return;var k=itemAt(e);if(!k)return;
  HD={id:e.pointerId,x0:e.clientX,y0:e.clientY,k:k.k,i:k.i,it:k.it,wx:k.wx,wy:k.wy,on:false,moved:false};
  ringShow(e.clientX,e.clientY);HD.tm=setTimeout(grab,HOLD_MS)}
function cancel(){if(!HD)return;clearTimeout(HD.tm);HD=null;ringHide()}
function move(e){var h=HD;if(!h||h.id!==e.pointerId)return;
  if(!h.on){if(Math.hypot(e.clientX-h.x0,e.clientY-h.y0)>8)cancel();return}
  h.moved=true;var W=TWW(),wx=s2wx(e.clientX),wy=s2wy(e.clientY);
  if(h.k==='it'){var it=h.it;it.x=clamp((wx+h.dx)/W,12/W,1-12/W);it.y=clamp((wy+h.dy)/ch,.2,.98)}
  else{AB().cx=clamp((wx+h.dx)/W,.03,.97)}
  /* 화면 끝에 가까우면 수족관이 따라 밀림 */
  var ex=e.clientX-xOff(),vw=cw-xOff();if(ex<40)tankCam=clamp(tankCam-6/tankZ,0,camMax());else if(ex>vw-40)tankCam=clamp(tankCam+6/tankZ,0,camMax())}
function up(e){var h=HD;if(!h||h.id!==e.pointerId)return;clearTimeout(h.tm);ringHide();HD=null;
  if(!h.on)return;persist();refreshTank();buzz(8);if(h.k==='coral'&&h.moved)try{msEv('tkCoral')}catch(e){}
  barShow(h.k==='it'?{k:'it',it:h.it}:{k:'coral'})}
cv.addEventListener('pointerdown',down);cv.addEventListener('pointermove',move);cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',function(e){var h=HD;if(h&&h.id===e.pointerId){if(h.on)persist();clearTimeout(h.tm);HD=null;ringHide()}});
/* 집은 채로 손을 떼면 그 자리의 '누르기'(트리 창 열기 · 상자 받기 · 산호 톡톡)는 하지 않음: 판 끝(panEnd)은 tpan=null 이라 이미 안 옴 */
/* 아이폰: 꾹 누르면 뜨는 글자 고르기 · 확대경 막기 */
try{cv.style.webkitUserSelect='none';cv.style.webkitTouchCallout='none'}catch(e){}

/* --- 꾸미기 모드에서도 산호 끌기 --- */
var decoDownCH=decoDown;decoDown=function(e){var r=decoDownCH.apply(this,arguments);if(r)return r;
  try{if(page==='tank'&&!VISIT){var wx=s2wx(e.clientX),wy=s2wy(e.clientY);if(coralHit(wx,wy)&&(coralFront()||!houseHit(wx,wy))){var c=coralPos();HD={id:e.pointerId,x0:e.clientX,y0:e.clientY,k:'coral',wx:wx,wy:wy,on:true,dx:c.x-wx,moved:false};try{tpan=null;cv.setPointerCapture(e.pointerId)}catch(x){}return true}}}catch(x){}return false};

/* --- 들린 소품은 살짝 위로 + 그림자 (그리기 감싸기) --- */
try{var drawDecoItemCH=drawDecoItem;drawDecoItem=function(D,x,y,w,flip,dim,sd){var hi=HD&&HD.on&&HD.it;if(!decoThumbMode&&hi&&hi.k===D.id&&Math.abs(sd-(hi.x*13.7+hi.y*7.3))<1e-6){var a=arguments;ctx.save();ctx.globalAlpha*=.25;ctx.fillStyle='#0B2C4A';ctx.beginPath();ctx.ellipse(x,y+w*decoAR(D)*.42,w*.36,w*.06,0,0,Math.PI*2);ctx.fill();ctx.restore();
  ctx.save();ctx.translate(x,y-w*.06);ctx.scale(1.06,1.06);ctx.translate(-x,-y);var r=drawDecoItemCH.apply(this,a);ctx.restore();return r}return drawDecoItemCH.apply(this,arguments)}}catch(e){}

/* --- 다른 화면으로 가면 정리 --- */
var showTabCH=showTab;showTab=function(){cancel();barHide();return showTabCH.apply(this,arguments)};
var decoStartCH=decoStart;decoStart=function(){cancel();barHide();return decoStartCH.apply(this,arguments)};

/* --- 처음 한 번 알려 주기(수족관에 들어갈 때) --- */
var toTankCH=toTank;toTank=function(){var r=toTankCH.apply(this,arguments);try{if(!save.tkHoldT&&DS().placed.length){setTimeout(function(){if(page==='tank'&&!deco.on){save.tkHoldT=1;persist();banner(w5('tip'),'')}},1600)}}catch(e){}return r};

/* 게임 안 1.1.30 소식에 한 줄 */
try{var NK='수족관: 소품 · 반짝 산호를 꾹 누르면 들어서 옮기고, 놓은 뒤 「회수」로 보관함에 넣을 수 있어요',NV={en:'Aquarium: press and hold a decoration or the Twinkle Coral to pick it up and move it, then tap 「Put away」 to store it',ja:'水族館：小物やキラキラサンゴを長押しで持ち上げて動かせます。置いたあと「しまう」で収納できます',es:'Acuario: mantén pulsado un adorno o el Coral brillante para levantarlo y moverlo; luego toca 「Guardar」 para guardarlo',vi:'Bể cá: nhấn giữ đồ trang trí hoặc San hô lấp lánh để nhấc lên và di chuyển, rồi chạm 「Cất」 để cất vào kho'};
  try{TRT[NK]=NV.en}catch(e){}try{TRJ[NK]=NV.ja}catch(e){}try{if(SUBL&&NV[SUBL])TRX[NK]=NV[SUBL]}catch(e){}
  NEWS['1.1.30']=(NEWS['1.1.30']||[]).concat([T(NK)])}catch(e){}
var st=document.createElement('style');st.textContent=
 '#tkHoldRing{position:fixed;z-index:40;width:64px;height:64px;margin:-32px 0 0 -32px;pointer-events:none;animation:tkHR '+HOLD_MS+'ms ease-out forwards}'+
 '#tkHoldRing svg{width:100%;height:100%;transform:rotate(-90deg);overflow:visible}#tkHoldRing circle{fill:none;stroke-width:6;stroke-linecap:round}'+
 '#tkHoldRing .bg{stroke:rgba(11,44,74,.35)}#tkHoldRing .fg{stroke:#FFE27A;stroke-dasharray:170;stroke-dashoffset:170;animation:tkHD '+HOLD_MS+'ms linear forwards;filter:drop-shadow(0 0 3px rgba(255,255,255,.8))}'+
 '@keyframes tkHR{from{transform:scale(.6);opacity:.3}to{transform:scale(1);opacity:1}}@keyframes tkHD{to{stroke-dashoffset:0}}'+
 '#tkHoldBar{position:fixed;z-index:35;display:flex;gap:6px;padding:5px;border-radius:16px;background:#FFF8E8;box-shadow:0 0 0 3px #0B2C4A,0 5px 0 3px #0B2C4A;animation:tkHB .16s ease-out}'+
 '#tkHoldBar[hidden]{display:none}#tkHoldBar button{font:inherit;font-size:14px;font-weight:800;color:#0B2C4A;white-space:nowrap;border:0;border-radius:11px;padding:8px 12px;background:#FFE27A;box-shadow:inset 0 -3px 0 rgba(200,130,0,.35)}'+
 '#tkHoldBar button[data-a=edit]{background:#BFE6FF;box-shadow:inset 0 -3px 0 rgba(40,110,170,.3)}#tkHoldBar button[data-a=home]{background:#D8F5C8;box-shadow:inset 0 -3px 0 rgba(40,140,60,.3)}#tkHoldBar button[hidden]{display:none}'+
 '#tkHoldBar::after{content:"";position:absolute;left:var(--ax,50%);bottom:-11px;margin-left:-7px;border:7px solid transparent;border-top-color:#0B2C4A}'+
 '@keyframes tkHB{from{transform:translateY(6px) scale(.9);opacity:0}to{transform:none;opacity:1}}'+
 '@media (prefers-reduced-motion:reduce){#tkHoldBar{animation:none}}';
document.head.appendChild(st);
})();
