/* ===== 1.1.30 늑구 '수족관 비중도 작아지지 않게' ② 마을 택배 거북
   - 마을(아가미시티) 산호궁 Lv.2 이상이면, 수족관에 있을 때 가끔 '마을 택배' 거북이 선물 상자를 메고 지나감
   - 누르면 마을 주민이 보낸 선물: 진주 40 + 산호궁 레벨×10 (최대 250) · 하루 3번 · 받고 나서 3시간 뒤에 다시 옴
   - 못 누르고 지나가면 3분 뒤 다시 지나감. 친구 수족관 구경 · 꾸미기 · 구경 모드 · 손님이 있을 땐 안 나옴. 사용 기록 tkPost ===== */
(function(){
var SL=(typeof SUBL==='string'&&SUBL)||LANG||'ko';if(!{ko:1,en:1,ja:1,es:1,vi:1}[SL])SL='en';
var TX={ko:['🐢 아가미시티에서 택배가 왔어요!','마을 주민들이 보낸 선물 · 진주 +{n}','🐢 마을 택배 거북이 지나가요','거북을 눌러 선물을 받아요','마을 택배'],
 en:['🐢 A parcel from Gill City!','A gift from your town residents · Pearls +{n}','🐢 The town delivery turtle is passing by','Tap the turtle to get the gift','Town parcel'],
 ja:['🐢 エラシティから宅配便！','町の住民からのプレゼント・真珠 +{n}','🐢 町の配達ガメが通りかかります','カメをタップしてプレゼントを受け取ろう','町の宅配便'],
 es:['🐢 ¡Un paquete de Gill City!','Un regalo de los habitantes del pueblo · Perlas +{n}','🐢 Pasa la tortuga repartidora del pueblo','Toca la tortuga para recibir el regalo','Paquete del pueblo'],
 vi:['🐢 Có bưu kiện từ Gill City!','Quà từ cư dân trong làng · Ngọc trai +{n}','🐢 Rùa giao hàng của làng đang đi ngang','Chạm vào rùa để nhận quà','Bưu kiện của làng']}[SL];
var IM={t:new Image(),g:new Image()};IM.t.src='svart/pet_turtle.webp';IM.g.src='svart/ic_gift.webp';
var PO=null,WAIT=0,DAYN=3,COOL=3*3600e3,MISS=180e3;
function dayK(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function st(){var o=save.tkPost;if(!o||typeof o!=='object')o=save.tkPost={d:'',n:0,at:0,miss:0};if(o.d!==dayK()){o.d=dayK();o.n=0}return o}
var HL={v:0,at:0};function hallLv(){var now=Date.now();if(now-HL.at<15000)return HL.v;HL.at=now;try{var g=JSON.parse(localStorage.getItem('gfcity.v1')||'null'),L=0;if(g&&g.b)g.b.forEach(function(b){if(b.k==='hall')L=Math.max(L,b.lv|0)});return HL.v=L}catch(e){return HL.v=0}}
function gain(){return Math.min(250,40+10*hallLv())}
function canSpawn(){if(page!=='tank'||deco.on||VIEWM||(typeof VISIT!=='undefined'&&VISIT)||document.hidden)return false;if(typeof ABY==='object'&&ABY&&ABY.vis)return false;
  var o=st(),now=Date.now();if(o.n>=DAYN||now-(o.at||0)<COOL||now-(o.miss||0)<MISS)return false;return hallLv()>=2}
function spawn(){var dir=Math.random()<.5?1:-1,vw=viewW();PO={dir:dir,x:dir>0?tankCam-70:tankCam+vw+70,y:ch*(.5+Math.random()*.12),ph:Math.random()*6,t:0,out:0};
  try{banner(TX[2],TX[3]);svSnd('bub',.7)}catch(e){}try{crumb('tkPost')}catch(e){}}
function tick(dt){if(!PO){if(!canSpawn()){WAIT=0;return}WAIT+=dt;if(WAIT>25+Math.random()*2){WAIT=0;spawn()}return}
  if(page!=='tank'||VIEWM||deco.on||(typeof VISIT!=='undefined'&&VISIT)){PO=null;return}
  PO.t+=dt;if(PO.out){PO.y-=70*dt;if(PO.t>1.2)PO=null;return}
  PO.x+=PO.dir*36*dt;var vw=viewW();if((PO.dir>0&&PO.x>tankCam+vw+90)||(PO.dir<0&&PO.x<tankCam-90)){st().miss=Date.now();persist();PO=null}}
function draw(){if(!PO)return;var a=PO.out?Math.max(0,1-PO.t/1.2):Math.min(1,PO.t*2),bob=Math.sin(t*2.2+PO.ph)*5,w=74,h=w*89/120,x=PO.x,y=PO.y+bob;
  ctx.save();ctx.globalAlpha=a;
  if(IM.t.complete&&IM.t.naturalWidth){ctx.save();ctx.translate(x,y);if(PO.dir<0)ctx.scale(-1,1);ctx.rotate(Math.sin(t*2.2+PO.ph)*.06);ctx.drawImage(IM.t,-w/2,-h/2,w,h);ctx.restore()}
  if(!PO.out&&IM.g.complete&&IM.g.naturalWidth){var gs=30,gy=y-h*.55-gs*.5+Math.sin(t*3+PO.ph)*2;ctx.drawImage(IM.g,x-gs/2-PO.dir*6,gy-gs/2,gs,gs);
    ctx.font='13px "Black Han Sans", Jua, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineWidth=4;ctx.strokeStyle='rgba(11,44,74,.85)';ctx.fillStyle='#FFE45C';var ty=gy-gs*.5-10;ctx.strokeText(TX[4],x,ty);ctx.fillText(TX[4],x,ty)}
  ctx.restore()}
function hit(wx,wy){return !!PO&&!PO.out&&Math.hypot(wx-PO.x,wy-PO.y)<54}
function take(){var o=st(),g=gain();PO.out=1;PO.t=0;o.n++;o.at=Date.now();save.pearls+=g;persist();
  try{abyFxPush(PO.x,PO.y-20,'spark',12,1.4);abyFxPush(PO.x,PO.y-30,'heart',6,1.2)}catch(e){}
  try{svSnd('gem');buzz([30,40,60])}catch(e){}try{banner(TX[0],TX[1].replace('{n}',g))}catch(e){}
  try{if(typeof msEv==='function')msEv('tkPost')}catch(e){}try{refreshTank()}catch(e){}try{refreshHome(true)}catch(e){}}
var LAST=0;var _dtpP=drawTankPops;drawTankPops=function(){if(page==='tank'){try{var n=performance.now(),dt=LAST?Math.min(.1,(n-LAST)/1000):0;LAST=n;tick(dt);draw()}catch(e){}}else LAST=0;return _dtpP.apply(this,arguments)};
var _ttP=tankTap;tankTap=function(wx,wy){try{if(!VIEWM&&!deco.on&&hit(wx,wy)){take();return}}catch(e){}return _ttP.apply(this,arguments)};
window.__tkPost={dbg:function(){return JSON.stringify({dU:decoU(),z:tankZ,ch:ch,cw:cw,vw:viewW(),fl:typeof floorY==='function'?floorY():null})},spawn:function(){spawn()},st:function(){return {po:PO,s:st(),hl:hallLv()}},sc:function(){return PO?{x:(PO.x-tankCam)*tankZ+xOff(),y:PO.y*tankZ-decoVo+zOff()}:null}};
/* 게임 안 1.1.30 소식에 한 줄 */
try{var NK3='수족관: 마을 산호궁이 Lv.2가 되면 「마을 택배」 거북이 가끔 지나가요 · 누르면 주민들이 보낸 진주 선물(하루 3번)',NV3={en:'Aquarium: once your Coral Hall reaches Lv 2, a Town parcel turtle swims by now and then · tap it for a pearl gift from your residents (3 a day)',ja:'水族館：町のサンゴ宮がLv2になると「町の宅配便」のカメがときどき通ります・タップで住民からの真珠プレゼント（1日3回）',es:'Acuario: cuando tu Palacio de Coral llegue al Nv 2, a veces pasará la tortuga del Paquete del pueblo · tócala para recibir perlas de tus habitantes (3 al día)',vi:'Bể cá: khi Cung San Hô của làng đạt Lv 2, rùa Bưu kiện của làng thỉnh thoảng bơi qua · chạm vào để nhận ngọc trai cư dân gửi (3 lần mỗi ngày)'};
  try{TRT[NK3]=NV3.en}catch(e){}try{TRJ[NK3]=NV3.ja}catch(e){}try{if(SUBL&&NV3[SUBL])TRX[NK3]=NV3[SUBL]}catch(e){}
  NEWS['1.1.30']=(NEWS['1.1.30']||[]).concat([T(NK3)])}catch(e){}
})();
