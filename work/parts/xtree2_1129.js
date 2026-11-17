/* ===== 1.1.29 늑구 '장식물이 너무 짜침 · 퀄리티 있게 다른 애셋 갖다 쓰고 · 수족관 뒤에 반투명하게 엄청 크게 트리 · 예쁘게 꾸며서'
   ① 코드로 그리던 장식 8종 → 앱 그림(svart) 장식으로: 진주 · 불가사리 · 하트 거품 · 얼음 초승달 · 루비 · 황금 비늘 · 사탕 · 소라
      + 새 장식 5종: 사파이어 · 에메랄드 · 가리비 · 진주 조개 · 해파리. 모두 금빛 고리 + 실로 매달림
   ② 반짝이 줄: 막대 조각 → 보송보송한 가닥 + 반짝임 / 진주 줄은 진주 그림으로
   ③ 알아서 꾸미기: 가진 걸 다 붙이면 빽빽해서 → 종류 골고루 최대 28개 + 줄 3개(전구 2 · 반짝이 1). 나머지는 서랍에 남음
   ④ 수족관 뒤 큰 트리(크리스마스 기간): 물 배경 위 · 소품/물고기 뒤에 반투명(낮 .36 · 밤 .5)으로 바닥에서 거의 천장까지.
      내 트리 장식이 12개 넘으면 그대로, 적으면 기본 장식 세트로 꾸밈. 카메라보다 천천히 움직여 멀리 있는 느낌.
      꾸미기 창 「🌲 뒤 큰 트리」로 켜고 끔(save.xtBig=0 이면 끔)
   ⑤ 장식을 다 달아 서랍이 비면 '모두 달았어요' 안내 ===== */
var XT_ART={p_pearl:'pearl',p_star:'dc_star',p_heart:'it_heal',p_moon:'slash',p_ribbon:'gem_r',p_gribbon:'it_gold',p_candy:'fx_candy',p_conch:'conch',q_sapph:'gem_b',q_emer:'gem_g',q_scal:'shell',q_clam:'it_pearl',q_jelly:'jelly'};
var XT_NEW2=[['q_sapph','사파이어',180],['q_emer','에메랄드',180],['q_scal','가리비',150],['q_clam','진주 조개',220],['q_jelly','해파리',200]];
XT_NEW2.forEach(function(q){XORN.push([q[0],q[1]]);XORN_P[q[0]]=q[2]});
XORN.forEach(function(q){if(q[0]==='p_moon')q[1]='얼음 초승달';else if(q[0]==='p_ribbon')q[1]='루비';else if(q[0]==='p_gribbon')q[1]='황금 비늘';else if(q[0]==='p_heart')q[1]='하트 거품'});
abyTr(TRT,{'얼음 초승달':'Ice crescent','루비':'Ruby','황금 비늘':'Golden scale','하트 거품':'Heart bubble','사파이어':'Sapphire','에메랄드':'Emerald','가리비':'Scallop','진주 조개':'Pearl clam','해파리':'Jellyfish'});
abyTr(TRJ,{'얼음 초승달':'氷の三日月','루비':'ルビー','황금 비늘':'金のうろこ','하트 거품':'ハートのあわ','사파이어':'サファイア','에메랄드':'エメラルド','가리비':'ホタテ','진주 조개':'真珠の貝','해파리':'クラゲ'});
if(SUBL==='es')abyTr(TRX,{'얼음 초승달':'Media luna de hielo','루비':'Rubí','황금 비늘':'Escama dorada','하트 거품':'Burbuja corazón','사파이어':'Zafiro','에메랄드':'Esmeralda','가리비':'Vieira','진주 조개':'Almeja perla','해파리':'Medusa'});
else if(SUBL==='vi')abyTr(TRX,{'얼음 초승달':'Trăng băng','루비':'Hồng ngọc','황금 비늘':'Vảy vàng','하트 거품':'Bong bóng tim','사파이어':'Ngọc bích','에메랄드':'Ngọc lục bảo','가리비':'Sò điệp','진주 조개':'Trai ngọc','해파리':'Sứa'});
XT_WORDS.big={ko:'🌲 뒤 큰 트리',en:'🌲 Big tree',ja:'🌲 大きな木',es:'🌲 Árbol grande',vi:'🌲 Cây lớn'};
XT_WORDS.bigOn={ko:'수족관 뒤에 큰 트리를 띄워요',en:'A big tree glows behind your aquarium',ja:'水そうのうしろに大きなツリー',es:'Un gran árbol detrás del acuario',vi:'Cây lớn phía sau bể cá'};
XT_WORDS.bigOff={ko:'뒤 큰 트리를 껐어요',en:'Big tree off',ja:'大きなツリーをオフ',es:'Árbol grande apagado',vi:'Đã tắt cây lớn'};
XT_WORDS.allHung={ko:'가진 장식을 모두 달았어요 · 장식 가게에서 더 살 수 있어요',en:'Everything is on the tree · get more in the shop',ja:'かざりを全部つけました・ショップでもっと買えます',es:'Todo está en el árbol · compra más en la tienda',vi:'Đã treo hết · mua thêm ở cửa hàng'};
setTimeout(function(){try{for(var k in XT_ART)xmSpr(XT_ART[k])}catch(e){}},2400);

/* ① 그림 장식: (x,y)=매다는 점, sz=장식 크기(원래 장식과 같은 기준) */
function xtArt(c,k,x,y,sz){var im=xmSpr(XT_ART[k]);if(!im)return false;var ar=im.naturalWidth/im.naturalHeight,h=sz*.74,w=h*ar;if(w>sz*.9){w=sz*.9;h=w/ar}
  var cw2=Math.max(3,sz*.15),ch2=Math.max(2,sz*.085),top=y-sz*.02;c.save();
  c.lineWidth=Math.max(.7,sz*.022);c.strokeStyle='rgba(255,228,150,.95)';c.beginPath();c.moveTo(x,y-sz*.2);c.lineTo(x,top);c.stroke();
  c.beginPath();c.arc(x,top-sz*.012,sz*.03,0,Math.PI*2);c.stroke();
  c.drawImage(im,x-w/2,top+ch2*.55,w,h);
  var g=c.createLinearGradient(x-cw2/2,0,x+cw2/2,0);g.addColorStop(0,'#9C6B1C');g.addColorStop(.45,'#FFE9A6');g.addColorStop(1,'#9C6B1C');c.fillStyle=g;c.fillRect(x-cw2/2,top,cw2,ch2);
  c.fillStyle='rgba(80,50,10,.35)';c.fillRect(x-cw2/2,top+ch2*.7,cw2,ch2*.3);c.restore();return true}
var xtDrawPXT=xtDrawP;xtDrawP=function(c,k,x,y,sz,seed){if(XT_ART[k]&&xtArt(c,k,x,y,sz))return;return xtDrawPXT.apply(this,arguments)};
var xmOrnDrawXT=xmOrnDraw;xmOrnDraw=function(c,k,x,y,sz){if(XT_ART[k]){xtArt(c,k,x,y,sz);return}return xmOrnDrawXT.apply(this,arguments)};

/* ② 반짝이 줄 · 진주 줄 */
function xtH(n){var s=Math.sin(n*12.9898+4.1)*43758.5453;return s-Math.floor(s)}
function xtA(hex,a){var n=parseInt(hex.slice(1),16);return 'rgba('+(n>>16)+','+(n>>8&255)+','+(n&255)+','+a+')'}
var xtDrawStrXT=xtDrawStr;xtDrawStr=function(c,it,X0,Y0,W,H,night,idx){var k=it.k;if(k!=='g_gold'&&k!=='g_silver'&&k!=='g_pearl')return xtDrawStrXT.apply(this,arguments);
  var S=xtSwag(it.v,X0,Y0,W,H),G=XT_GC[k],i,j,n,P;c.save();c.lineCap='round';
  if(k==='g_pearl'){var pim=xmSpr('pearl');c.beginPath();c.moveTo(S.x0,S.y0);c.quadraticCurveTo(S.mx,S.my,S.x1,S.y1);c.lineWidth=Math.max(.6,W*.004);c.strokeStyle='rgba(255,240,220,.8)';c.stroke();
    n=Math.max(8,Math.round((S.x1-S.x0)/(W*.032)));for(i=0;i<=n;i++){P=xtQ(S,i/n);var r=W*(i%2?.014:.019);if(pim)c.drawImage(pim,P[0]-r,P[1]-r,r*2,r*2);else{c.beginPath();c.arc(P[0],P[1],r,0,Math.PI*2);c.fillStyle='#FFF7F0';c.fill()}}}
  else{c.beginPath();c.moveTo(S.x0,S.y0);c.quadraticCurveTo(S.mx,S.my,S.x1,S.y1);c.lineWidth=W*.026;c.strokeStyle=xtA(G[2],.5);c.stroke();
    n=Math.max(18,Math.round((S.x1-S.x0)/(W*.011)));var L=[G[2],G[0],G[1]],lw=Math.max(.6,W*.0038);
    for(j=0;j<3;j++){c.beginPath();for(i=0;i<=n;i++){P=xtQ(S,i/n);for(var m=0;m<2;m++){var h=xtH(i*13+j*5+m+idx*31),a=h*Math.PI*2+Math.sin(t*1.6+i*.7)*.18,len=W*(.009+.017*xtH(i*7+j+m*3));c.moveTo(P[0],P[1]);c.lineTo(P[0]+Math.cos(a)*len,P[1]+Math.sin(a)*len*.85)}}
      c.lineWidth=lw*(j===2?.8:1);c.strokeStyle=L[j];c.stroke()}
    c.globalCompositeOperation='lighter';for(i=0;i<7;i++){var u=(i*.149+t*.04+idx*.27)%1,tw=Math.sin(t*3.5+i*2.3);if(tw<.35)continue;P=xtQ(S,u);var s=W*.024*tw;c.globalAlpha=.9*tw;c.fillStyle='#FFFFFF';c.beginPath();c.moveTo(P[0],P[1]-s);c.lineTo(P[0]+s*.18,P[1]-s*.18);c.lineTo(P[0]+s,P[1]);c.lineTo(P[0]+s*.18,P[1]+s*.18);c.lineTo(P[0],P[1]+s);c.lineTo(P[0]-s*.18,P[1]+s*.18);c.lineTo(P[0]-s,P[1]);c.lineTo(P[0]-s*.18,P[1]-s*.18);c.closePath();c.fill()}c.globalAlpha=1;c.globalCompositeOperation='source-over'}
  if(night){c.globalCompositeOperation='lighter';c.globalAlpha*=.3;for(i=0;i<=6;i++){P=xtQ(S,i/6);c.drawImage(glow('255,230,150'),P[0]-W*.05,P[1]-W*.05,W*.1,W*.1)}}
  c.restore()};

/* ③ 알아서 꾸미기: 종류 골고루, 너무 빽빽하지 않게 */
var XT_AUTO_ORN=28,XT_AUTO_STR=3;
xtAuto=function(){var o=XT(),F=xtF(),k,i;function isS(kk){var kd=xtKind(kk);return kd==='gar'||kd==='light'}
  function shuf(a){for(var q=a.length-1;q>0;q--){var r=Math.floor(Math.random()*(q+1)),z=a[q];a[q]=a[r];a[r]=z}return a}
  var pool={};for(k in o.inv)if((o.inv[k]|0)>0)pool[k]=o.inv[k]|0;
  var strNow=F.filter(function(it){return isS(it.k)}),ornNow=F.filter(function(it){return !isS(it.k)}).length,added=0;
  var lights=shuf(Object.keys(pool).filter(function(kk){return xtKind(kk)==='light'})),gars=shuf(Object.keys(pool).filter(function(kk){return xtKind(kk)==='gar'})),sp=[];
  lights.slice(0,2).forEach(function(kk){sp.push(kk)});if(gars.length)sp.push(gars[0]);lights.slice(2).concat(gars.slice(1)).forEach(function(kk){sp.push(kk)});
  var rows=[.34,.5,.66,.42,.58,.74],used=strNow.map(function(it){return it.v});
  for(i=0;i<sp.length&&strNow.length+i<XT_AUTO_STR;i++){var v=rows.filter(function(r){return !used.some(function(u){return Math.abs(u-r)<.06})})[0];if(v==null)break;used.push(v);F.push({k:sp[i],u:.5,v:v});o.inv[sp[i]]--;added++}
  if((pool.star|0)>0&&!F.some(function(it){return it.k==='star'&&it.v<.12})){F.push({k:'star',u:.5,v:.04});o.inv.star--;pool.star--;added++}
  var kinds=shuf(Object.keys(pool).filter(function(kk){return !isS(kk)&&pool[kk]>0})),list=[],room=Math.max(0,XT_AUTO_ORN-ornNow);
  while(list.length<room){var got=0;kinds.forEach(function(kk){if(list.length<room&&pool[kk]>0){list.push(kk);pool[kk]--;got=1}});if(!got)break}
  if(ornNow+list.length<14){var fishes=shuf((save.owned||[]).filter(function(id){return byId(id)}));for(i=0;ornNow+list.length<14&&i<fishes.length*2;i++)list.push('f:'+fishes[i%fishes.length])}
  if(!list.length&&!added){banner(xtW(F.length?'allHung':'autoNone'),F.length?'':xtW('none'));return}
  list.forEach(function(k3){if(F.length>=XT_MAX)return;var best=null,bs=-1;for(var c=0;c<60;c++){var u=Math.random(),v=.14+Math.random()*.62;if(!xtGood(u,v))continue;var dmin=1e9;F.forEach(function(it){if(isS(it.k))return;dmin=Math.min(dmin,Math.hypot((it.u-u)*.8,it.v-v))});if(dmin>bs){bs=dmin;best=[u,v]}}
    if(!best)return;F.push({k:k3,u:best[0],v:best[1]});XT_SW[F.length-1]=.3;if(xtKind(k3)!=='fish')o.inv[k3]--;added++});
  persist();crumb('xtAuto');try{svSnd('lvl');buzz([20,30,20])}catch(x){}banner(xtW('autoDone'),xtW('hung')+F.length);xtRender()};

/* ⑤ 꾸미기 창: 뒤 큰 트리 켜고 끄기 · 다 달았을 때 안내 */
var xtRenderXT2=xtRender;xtRender=function(){var r=xtRenderXT2.apply(this,arguments);try{var el=$('xtP');if(!el)return r;
  var nn=el.querySelector('.xt-none');if(nn&&(XTE.tab==='orn'||XTE.tab==='str')&&xtF().length)nn.textContent=xtW('allHung');
  var b=$('xtBig');if(!b){var bar=el.querySelector('.xt-bar');if(bar){b=document.createElement('button');b.type='button';b.id='xtBig';bar.appendChild(b);
    b.addEventListener('click',function(){save.xtBig=save.xtBig===0?1:0;persist();crumb('xtBig:'+save.xtBig);try{svSnd('bub')}catch(e){}banner(xtW(save.xtBig===0?'bigOff':'bigOn'),'');xtRender()})}}
  if(b){b.textContent=xtW('big');b.setAttribute('aria-pressed',save.xtBig===0?'false':'true');b.style.opacity=save.xtBig===0?'.55':'1'}}catch(e){}return r};

/* ④ 수족관 뒤 큰 트리 */
var XTBG={c:null,f:0,key:''},XT_BIGDEF=null;
function xtBigOn(){try{return page==='tank'&&!VISIT&&save.xtBig!==0&&xmSeason()}catch(e){return false}}
function xtBigSet(){var F=xtF();if(F.length>=12)return F;if(XT_BIGDEF)return XT_BIGDEF;if(!xtMask())return F;
  var S=[{k:'star',u:.5,v:.04},{k:'l_warm',u:.5,v:.33},{k:'g_gold',u:.5,v:.47},{k:'l_multi',u:.5,v:.6},{k:'g_pearl',u:.5,v:.72}],
    K=['red','gold','blue','p_pearl','pink','q_sapph','bell','green','p_heart','purple','present','flake','aqua','q_emer','cane','p_ribbon','snowman','q_scal','gold','red','p_star','wreath','blue','q_clam','gingerbread','pink','p_conch','sock','aqua','bflake'],n=0,sd=1;
  K.forEach(function(k){if(k==='gingerbread')k='ginger';var best=null,bs=-1;for(var c=0;c<80;c++){var u=xtH(sd++),v=.13+xtH(sd++)*.63;if(!xtGood(u,v))continue;var dm=1e9;S.forEach(function(it){var kd=xtKind(it.k);if(kd==='gar'||kd==='light'||it.k==='star')return;dm=Math.min(dm,Math.hypot((it.u-u)*.8,it.v-v))});if(dm>bs){bs=dm;best=[u,v]}}if(best){S.push({k:k,u:best[0],v:best[1]});n++}});
  XT_BIGDEF=S;return S}
function xtBigDraw(){if(!xtBigOn())return;var im=xmSpr('dc_xm_mytree');if(!im)return;
  var fy=zy(floorY()),th=Math.max(ch*.5,(fy-ch*.07)/.93),tw=th*im.naturalWidth/im.naturalHeight,wx=TWW()*.5,sx=xOff()+tankZ*(wx-tankCam),cx=cw*.5+(sx-cw*.5)*.35,by=fy+th*.07,nt=abyNight();
  if(cx+tw*.5<0||cx-tw*.5>cw)return;
  var s=Math.min(1.25,window.devicePixelRatio||1);if(tw*s>900)s=900/tw;var pw=Math.ceil(tw*s),ph=Math.ceil(th*s);
  if(!XTBG.c)XTBG.c=document.createElement('canvas');var oc=XTBG.c;
  var set=xtBigSet(),key=pw+'x'+ph+(nt?'n':'d')+set.length+':'+set.reduce(function(a,it){return a+(it.u||0)*7+(it.v||0)*13},0).toFixed(3);
  /* 장식 그림은 바뀔 때만 다시 그림(멀리 있는 트리라 흔들림 없이 고정) — 매 프레임 다시 그리면 수족관이 느려짐 */
  if(XTBG.key!==key||XTBG.f++>600){XTBG.key=key;XTBG.f=0;if(oc.width!==pw||oc.height!==ph){oc.width=pw;oc.height=ph}var x=oc.getContext('2d');x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,pw,ph);x.setTransform(s,0,0,s,0,0);
    x.save();x.globalCompositeOperation='lighter';x.globalAlpha=nt?.35:.18;x.drawImage(glow('255,214,140'),-tw*.15,th*.02,tw*1.3,th*.9);x.restore();x.drawImage(im,0,0,tw,th);var old=xtF,t0=t;xtF=function(){return set};try{t=0;xtDrawSet(x,0,0,tw,th,{night:nt})}catch(e){}finally{xtF=old;t=t0}}
  var pul=.92+.08*Math.sin(t*1.2);
  ctx.save();ctx.globalAlpha=(nt?.5:.36)*pul;ctx.drawImage(oc,cx-tw/2,by-th,tw,th);ctx.restore()}
(function(){var st=document.createElement('style');st.textContent='#xtP .xt-it .cost{display:flex;flex-direction:column;align-items:center;gap:0;line-height:1.15}#xtP .xt-it .cost small{font-size:10px;opacity:.8}#xtP .xt-it{padding-bottom:6px}';document.head.appendChild(st)})();
var drawTankWaterXT=drawTankWater;drawTankWater=function(){var r=drawTankWaterXT.apply(this,arguments);try{xtBigDraw()}catch(e){}return r};
