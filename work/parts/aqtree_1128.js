/* ===== 1.1.28 늑구 '수족관 업데이트 대규모 · 크리스마스 끝나도 쓸 수 있게 대형 크리스마스 트리(한눈에) · 꾸미기에서 트리 장식템을 진주로'
   ① 내 크리스마스 트리 → 대형 트리(폭 0.3 → 0.56, 한 화면에 통째로 보이게) · 크기 조절 0.6~1.25배 · 시즌 표시(wn) 뗌
   ② 1년 내내: 트리가 없으면 한 번 넣어 드림(장식 3개 포함) · 수족관에서 트리를 누르면 꾸미기 창 · 꾸미기 서랍(소품)에 「트리 장식」 버튼
   ③ 꾸미기 창 아래 「장식 가게」: 장식 22가지를 진주로(80 ~ 600) · 새 장식 14가지(CC0: 반짝 방울 Wenrexa · 진저브레드/양말/눈사람/루돌프/리스 등 Kenney Holiday Kit)
   ④ 트리 자리 15 → 20(아래 줄 5칸, 예전 자리 번호 그대로라 단 장식 안 바뀜)
   트리 밑 선물 · 산타 선물 · 오늘의 미션 장식은 예전처럼 크리스마스 기간에만 ===== */
abyTr(TRT,{'대형 크리스마스 트리':'Giant Christmas Tree','장식 가게':'Ornament shop','트리 장식':'Tree ornaments','진주로 사서 바로 달 수 있어요':'Buy with pearls and hang them right away',
 '가진 장식이 없어요 · 아래 장식 가게에서 진주로 사요':'No ornaments yet · buy some with pearls in the shop below','장식을 샀어요':'Ornament bought','트리에 달아 보세요':'Hang it on your tree',
 '수족관 트리를 눌러 달아요':'Tap your aquarium tree to hang it','수족관에 대형 크리스마스 트리가 생겼어요! 🎄':'A giant Christmas tree is in your aquarium! 🎄','트리를 누르면 장식을 달 수 있어요 · 장식은 꾸미기에서 진주로 사요':'Tap the tree to hang ornaments · buy more with pearls in Decorate',
 '금빛 방울':'Gold bauble','보라 방울':'Purple bauble','초록 방울':'Green bauble','분홍 방울':'Pink bauble','청록 방울':'Teal bauble','구리 방울':'Copper bauble','진저브레드':'Gingerbread','크리스마스 양말':'Stocking','초록 지팡이 사탕':'Green candy cane','파란 눈꽃':'Blue snowflake','꼬마 눈사람':'Little snowman','꼬마 루돌프':'Little reindeer','초록 선물':'Green present','작은 리스':'Little wreath','보유 ':'Own '});
abyTr(TRJ,{'대형 크리스마스 트리':'大きなクリスマスツリー','장식 가게':'かざりショップ','트리 장식':'ツリーかざり','진주로 사서 바로 달 수 있어요':'真珠で買ってすぐにつけられます',
 '가진 장식이 없어요 · 아래 장식 가게에서 진주로 사요':'かざりがありません · 下のショップで真珠で買えます','장식을 샀어요':'かざりを買いました','트리에 달아 보세요':'ツリーにつけてみよう',
 '수족관 트리를 눌러 달아요':'水族館のツリーをタップしてつけよう','수족관에 대형 크리스마스 트리가 생겼어요! 🎄':'水族館に大きなクリスマスツリーが届きました！🎄','트리를 누르면 장식을 달 수 있어요 · 장식은 꾸미기에서 진주로 사요':'ツリーをタップでかざりつけ · かざりは「飾る」で真珠で買えます',
 '금빛 방울':'金のボール','보라 방울':'むらさきのボール','초록 방울':'みどりのボール','분홍 방울':'ピンクのボール','청록 방울':'ターコイズのボール','구리 방울':'銅のボール','진저브레드':'ジンジャーブレッド','크리스마스 양말':'クリスマスくつした','초록 지팡이 사탕':'みどりのキャンディケイン','파란 눈꽃':'青い雪の結晶','꼬마 눈사람':'ちびゆきだるま','꼬마 루돌프':'ちびトナカイ','초록 선물':'みどりのプレゼント','작은 리스':'ちいさなリース','보유 ':'所持 '});
/* 장식 22가지: 새 14가지 + 가격(진주) */
[['gold','금빛 방울'],['purple','보라 방울'],['green','초록 방울'],['pink','분홍 방울'],['aqua','청록 방울'],['copper','구리 방울'],['ginger','진저브레드'],['sock','크리스마스 양말'],['gcane','초록 지팡이 사탕'],['bflake','파란 눈꽃'],['snowman','꼬마 눈사람'],['deer','꼬마 루돌프'],['gpresent','초록 선물'],['wreath','작은 리스']].forEach(function(q){XORN.push(q)});
var XORN_P={star:600,red:80,blue:80,gold:100,green:100,purple:120,pink:120,aqua:120,copper:150,cane:120,gcane:120,bell:200,present:180,gpresent:180,flake:160,bflake:160,shell:300,ginger:220,sock:200,snowman:260,deer:320,wreath:280};
/* 트리 자리 20칸(뒤에만 붙임) */
XSLOT.push([.18,.73],[.34,.75],[.5,.73],[.66,.75],[.82,.73]);
/* ① 대형 트리 */
var XBT_W=.56;(function(){var D=decoById('xm_mytree');if(D){try{delete D.w;Object.defineProperty(D,'w',{configurable:true,enumerable:true,get:function(){return cw>ch*1.2?.42:XBT_W}})}catch(e){D.w=XBT_W}D.wn=0;D.name=T('대형 크리스마스 트리')}})(); /* 가로 화면은 키가 낮아서 0.42 (꼭대기 별까지 한 화면) */
function xbtClamp(it){if(it&&it.k==='xm_mytree')it.s=clamp(it.s||1,.6,1.25)}
var decoEditXB=decoEdit;decoEdit=function(fn){return decoEditXB(function(it,p){var r=fn(it,p);xbtClamp(it);return r})};
function xbtOwned(){try{if(xmTreeIt())return true;var d=DS();return (d.inv.xm_mytree|0)>0}catch(e){return false}}
/* 예전 작은 트리를 한 번만: 크기 1배 · 바닥에 다시 앉히고 · 집에 가리지 않는 보이는 자리로 */
/* 자리: 집 바로 오른쪽(가로 · 아이패드는 첫 화면에 통째로, 세로 폰은 살짝 밀면 통째로) · 오른쪽이 모자라면 왼쪽 · 다른 소품 뒤에 */
function xbtSpot(){var W=TWW(),U=decoU(),D=decoById('xm_mytree'),hp=housePos(),hw=Math.max(hp.w,hp.d?hp.d.iw:0)/2,tw=decoW(D,1)/2,x=hp.x+hw+tw;if(x+tw>W)x=hp.x-hw-tw;return clamp(x/W,.03,.97)}
function xbtFix(){try{var d=DS(),W=TWW(),D=decoById('xm_mytree'),it=null,i;for(i=0;i<d.placed.length;i++)if(d.placed[i].k==='xm_mytree'&&!d.placed[i].pv){it=d.placed.splice(i,1)[0];break}if(!it)return;
  it.s=1;it.x=xbtSpot();it.y=clamp((floorAt(it.x*W)+ch*.03-decoW(D,1)*decoAR(D)*.42)/ch,.25,.95);d.placed.unshift(it);deco.sel=-1}catch(e){}}
/* ② 트리가 없으면 한 번 넣어 드림 */
function xbtGiveCheck(tries){try{if(save.aqT1)return;if(!((save.runs|0)>0)){if((tries||0)<60)setTimeout(function(){xbtGiveCheck((tries||0)+1)},5000);return}
  if(page!=='home'||state!=='home'||document.querySelector('.overlay:not([hidden])')||document.querySelector('.coach')||save.newsSeen!==APP_VER){if((tries||0)<60)setTimeout(function(){xbtGiveCheck((tries||0)+1)},2500);return}
  save.aqT1=1;if(xbtOwned()){xbtFix();persist();try{refreshTank()}catch(e){}return}
  xmGive({d:'xm_mytree'});xbtFix();var o=XT(),n=0;for(var k in o.inv)n+=o.inv[k]|0;o.s.forEach(function(k){if(k)n++});if(!n){xmOrnAdd('red',1,1);xmOrnAdd('gold',1,1);xmOrnAdd('bell',1,1)}
  try{XM().g0=1}catch(e){}persist();crumb('aqTree');try{buzz([20,30,20])}catch(e){}banner(T('수족관에 대형 크리스마스 트리가 생겼어요! 🎄'),T('트리를 누르면 장식을 달 수 있어요 · 장식은 꾸미기에서 진주로 사요'));try{refreshTank()}catch(e){}}catch(e){}}
setTimeout(xbtGiveCheck,4500);
/* 트리를 받은 뒤 처음 수족관을 열 때 한 번: 카메라를 트리 쪽으로(세로 폰은 집과 트리가 한 화면에 다 안 들어가서) */
var camClampXB=camClamp;camClamp=function(){var reset=tankCam<0,r=camClampXB.apply(this,arguments);try{if(reset&&page==='tank'&&!VISIT&&save.aqT1&&!save.aqTc){var it=xmTreeIt();if(it){save.aqTc=1;persist();tankCam=clamp(it.x*TWW()-viewW()/2,0,camMax())}}}catch(e){}return r};
/* 장식 받았을 때 안내: 기간과 상관없이 트리에서 */
xmOrnAdd=function(k,n,quiet){var o=XT();o.inv[k]=(o.inv[k]|0)+(n||1);persist();if(!quiet){var nm=(XORN.filter(function(q){return q[0]===k})[0]||[,''])[1];setTimeout(function(){banner(T('장식을 받았어요!'),T(nm)+' · '+T('수족관 트리를 눌러 달아요'))},900)}};
/* 수족관에서 트리 누르기 → 꾸미기 창 (집 · 손님 · 선물 · 물고기는 원래대로) */
var tankTapXB=tankTap;tankTap=function(wx,wy){try{if(!VIEWM&&!VISIT&&!deco.on&&!houseHit(wx,wy)&&!(typeof guestHit==='function'&&guestHit(wx,wy))){var pl=DS().placed,i=decoHit(wx,wy);
  if(i>=0&&pl[i].k==='xm_mytree'){var W=TWW(),R=decoU()*.07,gift=false,Dt=decoById('xm_mytree'),tw0=decoW(Dt,pl[i].s),th0=tw0*decoAR(Dt);if(Math.abs(wx-pl[i].x*W)>tw0*.3||wy>pl[i].y*ch+th0*.28)return tankTapXB.apply(this,arguments);if(xmSeason()){XG().g.forEach(function(g){var x=g.x*W;if(Math.hypot(wx-x,wy-(floorAt(x)-2-R))<R*1.8)gift=true});
      if(xmTreeGiftCan()){var tx=pl[i].x*W+R*2.2;if(Math.hypot(wx-tx,wy-(floorAt(tx)-2-R))<R*1.8)gift=true}}
    var fish=false;for(var q=0;q<tank.length;q++){if(Math.hypot(wx-tank[q].x,wy-tank[q].y)<tankSize(tank[q].L)*.9+6){fish=true;break}}
    if(!gift&&!fish){DECO_BT[i]=t;try{svSnd('bub',.8);buzz(8)}catch(e){}xmTreeOpen();return}}}}catch(e){}return tankTapXB.apply(this,arguments)};
/* ③ 꾸미기 창: 장식 가게 */
function xbtBuy(k){var c={cur:'pearls',price:XORN_P[k]||150};if(!pay(c)){short(c);return}var o=XT();o.inv[k]=(o.inv[k]|0)+1;XTD.sel=k;persist();crumb('ornBuy:'+k);
  try{svSnd('gem');buzz([15,25,15])}catch(e){}var nm=(XORN.filter(function(q){return q[0]===k})[0]||[,''])[1];if(!xbtBuy.n){banner(T('장식을 샀어요'),T(nm)+' · '+T('트리에 달아 보세요'))}xbtBuy.n=(xbtBuy.n|0)+1;xmTreeRender();try{refreshHome&&refreshHome(true)}catch(e){}}
var xmTreeRenderXB=xmTreeRender;xmTreeRender=function(){var r=xmTreeRenderXB.apply(this,arguments);try{var el=$('xmTreeP');if(!el)return r;var T0=XT();
  var nn=el.querySelector('.xmt-none');if(nn)nn.textContent=T('가진 장식이 없어요 · 아래 장식 가게에서 진주로 사요');
  var sh=$('xmtShop');if(!sh){sh=document.createElement('section');sh.id='xmtShop';sh.className='xmt-shop';sh.innerHTML='<h2></h2><p class="xmt-sh-sub"></p><div class="xmt-sh-grid"></div><p class="xmt-sh-bal"></p>';el.querySelector('.xmt-panel').insertBefore(sh,$('xmtX'))}
  sh.querySelector('h2').textContent='🛍️ '+T('장식 가게');sh.querySelector('.xmt-sh-sub').textContent=T('진주로 사서 바로 달 수 있어요');
  var bal=sh.querySelector('.xmt-sh-bal');bal.textContent='';bal.appendChild(costEl({cur:'pearls',price:save.pearls|0}));
  var g=sh.querySelector('.xmt-sh-grid');g.textContent='';XORN.forEach(function(q){var k=q[0],c={cur:'pearls',price:XORN_P[k]||150},b=document.createElement('button');b.type='button';b.className='xmt-sh-c';b.dataset.poor=canPay(c)?'0':'1';
    var im=new Image();im.src='svart/orn_'+k+'.webp';im.alt='';b.appendChild(im);var nm=document.createElement('b');nm.textContent=T(q[1]);b.appendChild(nm);
    var own=T0.inv[k]|0;T0.s.forEach(function(x){if(x===k)own++});if(own){var o2=document.createElement('i');o2.textContent=T('보유 ')+own;b.appendChild(o2)}
    b.appendChild(costEl(c));b.setAttribute('aria-label',T(q[1])+' '+c.price);b.addEventListener('click',function(){xbtBuy(k)});g.appendChild(b)})}catch(e){}return r};
/* 서랍 「트리 장식」 버튼 */
(function(){var acts=document.querySelector('#decoDrawer .dd-acts')||($('ddFold')&&$('ddFold').parentNode);if(!acts||$('ddTree'))return;var b=document.createElement('button');b.type='button';b.className='dd-fold dd-tree';b.id='ddTree';b.textContent='🎄 '+T('트리 장식');acts.insertBefore(b,acts.firstChild);
  b.addEventListener('click',function(){try{decoCancelPv(true)}catch(e){}xmTreeOpen()})})();
var renderDrawerXB=renderDrawer;renderDrawer=function(){var r=renderDrawerXB.apply(this,arguments);try{var b=$('ddTree');if(b){b.hidden=deco.seg!=='decor'||!xbtOwned();b.textContent='🎄 '+T('트리 장식')}}catch(e){}return r};
/* 친구 수족관 구경 중엔 내 장식을 그 집 트리에 달지 않음(예전엔 내 장식이 보였음) */
var drawDecoItemXB=drawDecoItem;drawDecoItem=function(D){if(D&&D.id==='xm_mytree'&&VISIT){var keep=save.xmTree;save.xmTree={s:[],inv:{}};try{return drawDecoItemXB.apply(this,arguments)}finally{save.xmTree=keep}}return drawDecoItemXB.apply(this,arguments)};
setTimeout(function(){try{XORN.forEach(function(q){xmSpr('orn_'+q[0])});xmSpr('dc_xm_mytree')}catch(e){}},2600);
(function(){var st=document.createElement('style');st.textContent='.xmt-panel{max-height:calc(100dvh - 40px - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px))!important;overflow-y:auto!important}.xmt-stage canvas{height:min(42vh,340px)!important}'+
 '.xmt-shop{border-radius:16px;background:#FFF8E6;box-shadow:inset 0 0 0 2px #E8CF8E;padding:10px 8px 8px}.xmt-shop h2{margin:0;font-family:var(--disp);font-weight:400;font-size:17px;color:#0B2C4A;text-align:center}.xmt-sh-sub{margin:2px 0 8px;font-size:12px;color:#7A6230;text-align:center}'+
 '.xmt-sh-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(76px,1fr));gap:6px}.xmt-sh-c{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;border:0;border-radius:13px;background:#fff;box-shadow:0 0 0 2px #0B2C4A,0 3px 0 2px #0B2C4A;padding:6px 3px 7px;font:inherit;cursor:pointer;min-width:0}'+
 '.xmt-sh-c img{height:40px;max-width:44px;object-fit:contain}.xmt-sh-c b{font-family:var(--disp);font-weight:400;font-size:11.5px;line-height:1.1;color:#0B2C4A;text-align:center;min-height:25px;display:flex;align-items:center;overflow-wrap:anywhere}.xmt-sh-c i{position:absolute;top:3px;right:4px;font:700 10px sans-serif;font-style:normal;color:#1E7A3E;background:#DFF6E6;border-radius:6px;padding:0 4px}'+
 '.xmt-sh-c .cost{font-size:12.5px}.xmt-sh-c[data-poor="1"]{opacity:.55}.xmt-sh-c:active{transform:translateY(2px);box-shadow:0 0 0 2px #0B2C4A,0 1px 0 2px #0B2C4A}.xmt-sh-bal{margin:8px 0 0;text-align:center;font-weight:700;font-size:13px}';document.head.appendChild(st)})();
