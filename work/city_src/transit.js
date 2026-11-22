/* ===== 43차 🚋 교통 완성: 길 위 탈것 · 해류 열차 선로 · 길 자동 연결 =====
   ① 탈것: 🚌 해류 버스(버스 정류장 사이) · 🐢 택배 거북(거북 배달소 → 집) · 🦀 게 수레(생산 건물 → 창고/산호궁)가 길을 따라 다님
      - 막힌 길(막힘 1 넘음)에선 기어가듯 느려지고 머리 위에 💢 → 지도를 안 열어도 막힌 곳이 보임
      - 길이 많고 붐빌수록 탈것이 늘어남(최대 14대)
   ② 해류 열차 선로: 🛣 도로 탭 '🚋 선로 놓기'(🏛 Lv.9 · 열차역 필요 · 한 칸 30🫧 🪨10, 길을 가로지를 수 있음)
      - ⚙ 기반 탭 '🚉 해류 열차 정거장'(Lv.9 · 900🫧 · 선로 옆에만): 선로로 다른 정거장(또는 열차역)과 이어지면 둘레 5칸 길의 오가는 양 −45%
      - 이어진 정거장 사이로 노란 트램이 오감. 🗺 지도 '교통'에 선로(보라) 표시
   ③ 길 자동 연결: 구역을 칠하고 손을 떼면, 길에 안 닿은 칸까지 가장 짧은 길을 자동으로 깔아 줌(한 칸 10🫧 · 한 번에 최대 60칸)
      - 🏘 구역 탭에서 켜고 끔(처음엔 켜짐). 저장 G.rail {칸:1} · G.noAuto */

/* ---------- ② 선로 · 정거장 ---------- */
DEC.d_rstop={n:'해류 열차 정거장',s:1,c:900,at:9,v:0,r:0,fac:1,rst:5};
var RAIL_P=30,RAIL_S=10,RST=[],RCON={};
function isRail(i,j){return !!(G.rail&&G.rail[i+','+j])}
function ringOf(b){var s=sz(b.k),L=[];for(var i=-1;i<=s;i++)for(var j=-1;j<=s;j++){if((i<0||i>=s)&&(j<0||j>=s))continue;if(i>=0&&i<s&&j>=0&&j<s)continue;L.push([b.x+i,b.y+j])}return L}
function railAdj(b){return ringOf(b).filter(function(q){return isRail(q[0],q[1])})}
function railCalc(){RST=[];RCON={};if(!G.rail)return;var comp={},n=0;
  for(var k in G.rail){if(k in comp)continue;n++;var q=[k];comp[k]=n;while(q.length){var c=q.pop().split(','),x=+c[0],y=+c[1];[[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){var kk=(x+d[0])+','+(y+d[1]);if(G.rail[kk]&&!(kk in comp)){comp[kk]=n;q.push(kk)}})}}
  var by={};G.b.forEach(function(b){if(!(b.k==='d_rstop'||b.k==='train'&&b.lv))return;var cs={};railAdj(b).forEach(function(q){cs[comp[q[0]+','+q[1]]]=1});var st={b:b,cs:Object.keys(cs)};RST.push(st);st.cs.forEach(function(c){(by[c]=by[c]||[]).push(st)})});
  RST.forEach(function(st){st.on=st.cs.some(function(c){return by[c].length>=2});if(st.on)RCON[st.b.id]=1});RST.by=by}
function railPath(a,b){if(!a||!b)return null;var q=[a],prev={},goal=b+'',n=0;prev[a+'']=null;while(q.length&&n++<2500){var c=q.shift(),ck=c+'';if(ck===goal){var out=[];while(ck){var p=ck.split(',');out.unshift([+p[0],+p[1]]);ck=prev[ck]}return out}
  [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){var x=c[0]+d[0],y=c[1]+d[1],k=x+','+y;if(isRail(x,y)&&!(k in prev)){prev[k]=ck;q.push([x,y])}})}return null}
/* 이어진 정거장 둘레 5칸 길: 오가는 양 −45% */
var _trafCalcR=trafCalc;trafCalc=function(){_trafCalcR.apply(this,arguments);try{railCalc();RST.forEach(function(st){if(!st.on)return;var b=st.b,r=b.k==='train'?4:DEC.d_rstop.rst,s=sz(b.k);
  for(var i=-r;i<s+r;i++)for(var j=-r;j<s+r;j++){var dx=i<0?-i:i>=s?i-s+1:0,dy=j<0?-j:j>=s?j-s+1:0;if(dx+dy>r)continue;var k=(b.x+i)+','+(b.y+j);if(JAM[k]!=null&&!JAM['_r'+k]){JAM[k]*=.55;TL[k]*=.55;JAM['_r'+k]=1}}});for(var k in JAM)if(k.charAt(0)==='_')delete JAM[k]}catch(e){}};
/* 짓기 자리: 선로 위엔 못 짓고, 정거장은 선로 옆에만 */
var _siteWhyR=siteWhy;siteWhy=function(k,x,y){var r=_siteWhyR.apply(this,arguments);if(r)return r;if(G.rail){var s=sz(k);for(var i=0;i<s;i++)for(var j=0;j<s;j++)if(G.rail[(x+i)+','+(y+j)])return '선로 위에는 못 지어요'}
  if(k==='d_rstop'&&!railAdj({k:k,x:x,y:y}).length)return '선로 옆에 지어야 해요 · 🛣 도로 탭 「🚋 선로 놓기」';return r};
var _paintZoneR=paintZone;paintZone=function(t,k){if(G.rail&&G.rail[k]&&TOOL!=='z0')return;var had=G.zone[k];var r=_paintZoneR.apply(this,arguments);if(TOOL!=='z0'&&G.zone[k]&&G.zone[k]!==had)ZSTROKE.push(k);return r};
TOOLN.rail='🚋 선로 놓기';
var _paintR=paintAt;paintAt=function(x,y){if(TOOL==='clear'){var t0=tileAt(x,y),k0=t0.i+','+t0.j;if(G.rail&&G.rail[k0]&&k0!==lastPaint){lastPaint=k0;delete G.rail[k0];WAL.add('pearl',Math.floor(RAIL_P/2));cityF=0;var p0=sc(t0.i,t0.j);dust(p0.x,p0.y,4,.5);return}}
  if(TOOL!=='rail')return _paintR.apply(this,arguments);
  var t=tileAt(x,y),k=t.i+','+t.j;if(k===lastPaint||!inb(t.i,t.j))return;lastPaint=k;if(!own(t.i,t.j)){toast('아직 우리 땅이 아니에요');return}if(G.rail&&G.rail[k])return;if(OCC[k]){toast('건물이 있는 칸이에요');return}if(G.ter[k]){toast('바위 · 덤불을 먼저 치워요');return}
  if(WAL.get('pearl')<RAIL_P){toast('진주가 모자라요');return}if((G.res.stone||0)<RAIL_S){toast('🪨 산호석이 모자라요');return}
  WAL.add('pearl',-RAIL_P);G.res.stone-=RAIL_S;if(G.zone[k])delete G.zone[k];G.rail=G.rail||{};G.rail[k]=1;cityF=0;snd('tap');var p=sc(t.i,t.j);dust(p.x,p.y,4,.5);gfEv('rail')};
function railOpen(){return hallLv()>=9&&lvOf('train')>0}
var _startToolR=startTool;startTool=function(t){var r=_startToolR.apply(this,arguments);try{var s=$('toolbar').querySelector('.tl small');
  if(t==='rail'&&s)s.textContent='끌어서 선로를 놓아요 · 한 칸 '+RAIL_P+'🫧 🪨'+RAIL_S+' · 길을 가로질러도 돼요 · 정거장은 ⚙ 기반 탭';
  if(t.charAt(0)==='z'&&t!=='z0'&&s&&!G.noAuto)s.textContent+=' · 🛣 길 자동 연결 켜짐'}catch(e){}return r};
var _showCatR=showCat;showCat=function(c){var r=_showCatR.apply(this,arguments);try{var w=$('tray').querySelector('.tools1');
  if(c==='road'&&w&&!w.querySelector('[data-tool=rail]')){var ok=railOpen(),b=document.createElement('button');b.dataset.tool='rail';if(!ok)b.className='off';
    b.innerHTML='<b>🚋 선로 놓기</b><i>'+(hallLv()<9?'🔒 🏛Lv.9':!lvOf('train')?'🚋 해류 열차역을 먼저 지어요':'한 칸 '+RAIL_P+'🫧 🪨'+RAIL_S+' · 정거장끼리 이어요')+'</i>';
    b.onclick=function(){if(hallLv()<9){toast('🏛 산호궁 Lv.9에 열려요');return}if(!lvOf('train')){toast('🚋 해류 열차역을 먼저 지어요');return}startTool('rail')};w.insertBefore(b,w.querySelector('.tip'))}
  if(c==='zone'&&w&&!w.querySelector('[data-x=ar]')){var a=document.createElement('button');a.dataset.x='ar';var paint=function(){a.innerHTML='<b>🛣 길 자동 연결</b><i>'+(G.noAuto?'꺼짐 · 길은 직접 깔아요':'켜짐 · 길에 안 닿은 칸까지 길을 깔아요')+'</i>';a.className=G.noAuto?'off':''};paint();
    a.onclick=function(e){e.stopPropagation();G.noAuto=!G.noAuto;paint();save()};w.appendChild(a)}}catch(e){}return r};
/* 선로 그리기 */
var _drawTilesR=drawTiles;drawTiles=function(t){_drawTilesR.apply(this,arguments);if(!G.rail)return;var w=TW*cam.z,h=TH*cam.z,V=visB(),z=cam.z;
  for(var k in G.rail){var q=k.split(','),i=+q[0],j=+q[1];if(i<V.i0||i>V.i1||j<V.j0||j>V.j1)continue;var p=sc(i,j);if(p.x<-w||p.x>VW+w||p.y<-h||p.y>VH+h)continue;
    if(!G.road[k]){diamond(p.x,p.y,w*.9,h*.9);ctx.fillStyle='#c9bba2';ctx.fill();ctx.fillStyle='rgba(120,100,80,.25)';for(var n=0;n<6;n++){var a=hh(i*13+j*5+n),c=hh(i*3+j*17+n);ctx.fillRect(p.x+(a-.5)*w*.55,p.y+(c-.5)*h*.55,1.6*z,1.6*z)}}
    var D=[];if(isRail(i+1,j))D.push([w/2,h/2]);if(isRail(i-1,j))D.push([-w/2,-h/2]);if(isRail(i,j+1))D.push([-w/2,h/2]);if(isRail(i,j-1))D.push([w/2,-h/2]);if(!D.length)D=[[w/2,h/2],[-w/2,-h/2]];if(D.length===1)D.push([-D[0][0],-D[0][1]]);
    D.forEach(function(d){var ex=d[0]/2,ey=d[1]/2,L=Math.hypot(ex,ey)||1,px=-ey/L,py=ex/L,g=5*z;
      ctx.strokeStyle='#7a5a3a';ctx.lineWidth=Math.max(1.5,3*z);for(var s2=.25;s2<1;s2+=.4){var cx=p.x+ex*s2,cy=p.y+ey*s2;ctx.beginPath();ctx.moveTo(cx-px*g*1.6,cy-py*g*1.6);ctx.lineTo(cx+px*g*1.6,cy+py*g*1.6);ctx.stroke()}
      [-1,1].forEach(function(sd){ctx.strokeStyle='#5d6678';ctx.lineWidth=Math.max(1.5,2.6*z);ctx.beginPath();ctx.moveTo(p.x+px*g*sd,p.y+py*g*sd);ctx.lineTo(p.x+ex+px*g*sd,p.y+ey+py*g*sd);ctx.stroke();ctx.strokeStyle='rgba(230,236,245,.9)';ctx.lineWidth=Math.max(.8,1*z);ctx.stroke()})})}};
/* 지도 '교통': 선로는 보라 */
var _viewTintR=viewTint;viewTint=function(key,i,j,p,w,h){if(VIEW===5&&G.rail&&G.rail[key]&&!G.road[key]){diamond(p.x,p.y,w,h);ctx.fillStyle='rgba(150,100,230,.6)';ctx.fill();return}return _viewTintR.apply(this,arguments)};
var _viewBtnR=viewBtn;viewBtn=function(){var r=_viewBtnR.apply(this,arguments);if(VIEW===5&&G.rail)$('legend').innerHTML+=' <i style="background:#9664e6"></i> 선로';return r};
/* 정거장 그림 · 창 */
function rstopArt(bp){var p=pal(bp),cx=GX,cy=GY,y=cy-4,g=box(p,cx,cy,40,4,sp(p,'#f2f6fa'),sp(p,'#dde6f0'),sp(p,'#b9c8dc'));
  g+=box(p,cx,y+2,34,6,sp(p,'#ffe9b0'),sp(p,'#f5d27a'),sp(p,'#d9ac4a'))+'<path d="M'+(cx-26)+','+(y-2)+' L'+(cx-26)+','+(y-46)+' M'+(cx+26)+','+(y-2)+' L'+(cx+26)+','+(y-46)+'" stroke="'+OUT+'" stroke-width="5"/>';
  g+='<path d="M'+(cx-36)+','+(y-44)+' Q'+cx+','+(y-70)+' '+(cx+36)+','+(y-44)+' Z" fill="'+sp(p,'url(#gTeal)')+'"'+S(p)+'/>'+sign(p,cx+32,y-64,26,18,'#b48cff','🚋');return {svg:g,top:y-110}}
var _artForR=artFor;artFor=function(id,L,bp){if(id==='d_rstop')return rstopArt(bp);return _artForR.apply(this,arguments)};
var _decoPanelR=decoPanel;decoPanel=function(b){var r=_decoPanelR.apply(this,arguments);if(b.k==='d_rstop'){try{var pr=$('panel').querySelector('.prod');railCalc();if(pr)pr.innerHTML='선로로 다른 정거장(또는 열차역)과 이어지면 주변 '+DEC.d_rstop.rst+'칸 길의 오가는 양 −45% · 트램이 오가요<br>'+(RCON[b.id]?'✅ 이어졌어요':'⚠ 아직 안 이어졌어요 · 🚋 선로로 다른 정거장까지 이어요')}catch(e){}}return r};

/* ---------- ③ 길 자동 연결 ---------- */
var ZSTROKE=[];
function autoRoad(){var keys=ZSTROKE.slice();ZSTROKE=[];if(G.noAuto||!keys.length)return;var made=0,cost=D_ROAD,guard=0;
  function needs(k){if(!G.zone[k])return false;var q=k.split(','),x=+q[0],y=+q[1];return !(isRoad(x+1,y)||isRoad(x-1,y)||isRoad(x,y+1)||isRoad(x,y-1))}
  function pass(x,y){var k=x+','+y;return inb(x,y)&&own(x,y)&&!OCC[k]&&!G.ter[k]&&!(G.rail&&G.rail[k])&&!(G.groad&&G.groad[k])}
  while(guard++<60){var todo=keys.filter(needs);if(!todo.length)break;
    /* 모든 길에서 동시에 퍼지는 최단거리(빈칸 1 · 구역 칸 4) */
    var dist={},prev={},B=[[]],maxd=0;for(var rk in G.road){dist[rk]=0;B[0].push(rk)}
    for(var d=0;d<=maxd&&d<400;d++){var bk=B[d];if(!bk)continue;for(var n=0;n<bk.length;n++){var ck=bk[n];if(dist[ck]!==d)continue;var c=ck.split(','),cx=+c[0],cy=+c[1];
      [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(o){var x=cx+o[0],y=cy+o[1],k=x+','+y;if(G.road[k]||!pass(x,y))return;var nd=d+(G.zone[k]?4:1);if(dist[k]==null||nd<dist[k]){dist[k]=nd;prev[k]=ck;(B[nd]=B[nd]||[]).push(k);if(nd>maxd)maxd=nd}})}}
    var best=null,bd=1e9;todo.forEach(function(k){var q=k.split(','),x=+q[0],y=+q[1];[[1,0],[-1,0],[0,1],[0,-1]].forEach(function(o){var nk=(x+o[0])+','+(y+o[1]);if(dist[nk]==null||G.road[nk])return;var v=dist[nk]+(G.zone[nk]?3:0);if(v<bd){bd=v;best=nk}})});
    if(!best)break;var line=[],ck2=best;while(ck2&&!G.road[ck2]){line.push(ck2);ck2=prev[ck2]}
    if(WAL.get('pearl')<cost*line.length){toast('진주가 모자라 길을 다 잇지 못했어요');break}
    line.forEach(function(k){WAL.add('pearl',-cost);if(G.zone[k])delete G.zone[k];G.road[k]=1;made++;var q=k.split(','),p=sc(+q[0],+q[1]);dust(p.x,p.y,2,.3)});if(made>=60)break}
  if(made){cityF=0;snd('tap');toast('🛣 길 '+made+'칸을 자동으로 이었어요 · −'+(made*cost)+'🫧');gfEv('autoRoad');save()}}
try{cv.addEventListener('pointerup',function(){if(TOOL&&TOOL.charAt(0)==='z'&&TOOL!=='z0')setTimeout(autoRoad,0)})}catch(e){}

/* ---------- ① 탈것 ---------- */
var VEH=[];
function roadRand(){var ks=Object.keys(G.road);if(!ks.length)return null;var q=ks[Math.floor(Math.random()*ks.length)].split(',');return [+q[0],+q[1]]}
function vehNew(kind,a,b){var p=kind==='tram'?railPath(a,b):path(a,b);if(!p||p.length<4)return false;VEH.push({k:kind,p:p,i:0,t:0,sp:kind==='tram'?2.3:kind==='bus'?1.7:kind==='turtle'?1.1:1.3,ph:Math.random()*6,back:kind==='tram'});return true}
function vehSpawn(){var R=Object.keys(G.road).length;if(R<8)return;var avg=0,n=0;for(var k in JAM){avg+=JAM[k];n++}avg=n?avg/n:0;
  var want=Math.min(14,Math.round(R/16*(1+Math.min(1,avg)))),road=VEH.filter(function(v){return v.k!=='tram'}).length;
  if(road<want&&Math.random()<.6){var pick=[],stops=G.b.filter(function(b){return b.k==='d_bus'}),tt=bOf('turtle'),st=bOf('store')||bOf('hall'),prod=G.b.filter(function(b){return b.lv&&/^(quarry|farm|kiln|factory|sew|pearl)$/.test(b.k)}),homes=G.b.filter(function(b){return isZ(b.k)&&b.k.charAt(1)==='R'&&b.lv});
    if(stops.length)pick.push('bus','bus');if(tt&&tt.lv&&homes.length)pick.push('turtle');if(prod.length&&st)pick.push('cart','cart');if(!pick.length)return;var kd=pick[Math.floor(Math.random()*pick.length)];
    if(kd==='bus'){var a=stops[Math.floor(Math.random()*stops.length)],o=stops.length>1?stops.filter(function(x){return x!==a}):null,b2=o?o[Math.floor(Math.random()*o.length)]:null;vehNew('bus',roadNear(a),b2?roadNear(b2):roadRand())}
    else if(kd==='turtle'){var h=homes[Math.floor(Math.random()*homes.length)];if(Math.random()<.5)vehNew('turtle',roadNear(tt),roadNear(h));else vehNew('turtle',roadNear(h),roadNear(tt))}
    else{var pb=prod[Math.floor(Math.random()*prod.length)];vehNew('cart',roadNear(pb),roadNear(st))}}
  /* 트램: 이어진 선로마다 한 대 */
  if(RST.by){var trams=VEH.filter(function(v){return v.k==='tram'}).length,cs=Object.keys(RST.by).filter(function(c){return RST.by[c].length>=2});
    if(trams<Math.min(3,cs.length)){var c=cs[Math.floor(Math.random()*cs.length)],L=RST.by[c],s1=L[Math.floor(Math.random()*L.length)],s2=L.filter(function(x){return x!==s1})[0];if(s1&&s2){var a1=railAdj(s1.b)[0],a2=railAdj(s2.b)[0];vehNew('tram',a1,a2)}}}}
var _walkersTickV=walkersTick;walkersTick=function(dt){var r=_walkersTickV.apply(this,arguments);try{vehSpawn()}catch(e){}return r};
function vehJam(v){var u=v.i+v.t,c=v.p[Math.min(v.p.length-1,Math.round(u))];return c?jamAt(c[0]+','+c[1]):0}
var _walkMoveV=walkMove;walkMove=function(dt){_walkMoveV.apply(this,arguments);VEH=VEH.filter(function(v){var n=v.p.length-1,u=v.i+v.t,j=v.k==='tram'?0:vehJam(v),m=j>1?.22:j>.7?.6:1;v.jam=j>1;
  var ease=Math.min(1,.3+u*1.2,.3+(n-u)*1.2),du=v.sp*m*ease*dt;u+=du;v.wk=(v.wk||0)+du*6;if(u>=n&&v.back){v.p=v.p.slice().reverse();u=0;v.back=false;v.wait=2}
  if(v.wait>0){v.wait-=dt;return true}v.i=Math.floor(Math.min(u,n));v.t=u-v.i;return u<n})};
function vehPos(v){var u=v.i+v.t,P=pathPt(v,u),A=pathPt(v,u-.06),B2=pathPt(v,u+.06),dx=B2[0]-A[0],dy=B2[1]-A[1],L=Math.hypot(dx,dy)||1;dx/=L;dy/=L;var lane=v.k==='tram'?0:-.16;return {i:P[0]-dy*lane,j:P[1]+dx*lane,dx:dx,dy:dy,u:u,n:v.p.length-1}}
var VIMG={};function vImg(k){var o=VIMG[k];if(!o){o=VIMG[k]={im:new Image(),ok:0};o.im.onload=function(){o.ok=1};o.im.onerror=function(){o.ok=-1};o.im.src='svart/cv_'+k+'.webp'}return o.ok===1?o.im:null}
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
function drawVeh(v,t){var q=vehPos(v),p=sc(q.i,q.j),z=cam.z;if(z<.35)return;var sx=q.dx-q.dy;if(Math.abs(sx)>.15)v.fl=sx<0?-1:1;var fl=v.fl||1,al=Math.min(1,q.u*2,(q.n-q.u)*2),bob=v.jam?0:Math.sin((v.wk||0)+v.ph)*.8;
  var vi=vImg(v.k);if(vi){var VW2={bus:50,tram:66,turtle:40,cart:44}[v.k]||44,vh=VW2*vi.naturalHeight/vi.naturalWidth;ctx.save();ctx.globalAlpha=Math.max(0,al);ctx.translate(p.x,p.y-bob*z);ctx.scale(z*fl,z);ctx.fillStyle='rgba(15,60,80,.22)';ctx.beginPath();ctx.ellipse(0,1,VW2*.45,6,0,0,7);ctx.fill();ctx.drawImage(vi,-VW2/2,-vh+3,VW2,vh);ctx.restore()}
  else{ctx.save();ctx.globalAlpha=Math.max(0,al);ctx.translate(p.x,p.y-bob*z);ctx.scale(z*fl,z);ctx.lineWidth=2;ctx.strokeStyle=OUT;ctx.lineJoin='round';
  ctx.fillStyle='rgba(15,60,80,.22)';ctx.beginPath();ctx.ellipse(0,2,22,6,0,0,7);ctx.fill();
  if(v.k==='bus'||v.k==='tram'){var W2=v.k==='tram'?52:40;rr(-W2/2,-26,W2,22,8);ctx.fillStyle=v.k==='tram'?'#f5cf5a':'#4fc3c9';ctx.fill();ctx.stroke();
    rr(-W2/2+2,-31,W2-4,7,4);ctx.fillStyle=v.k==='tram'?'#3fae9e':'#ffd7e0';ctx.fill();ctx.stroke();
    ctx.fillStyle='#d9f4ff';for(var w=-W2/2+6;w<W2/2-8;w+=10){rr(w,-21,7,7,2);ctx.fill();ctx.stroke()}
    ctx.fillStyle=OUT;[-W2/2+9,W2/2-9].forEach(function(x){ctx.beginPath();ctx.arc(x,-3,4,0,7);ctx.fill()});if(v.k==='tram'){ctx.beginPath();ctx.moveTo(0,-31);ctx.lineTo(-6,-40);ctx.lineTo(6,-40);ctx.stroke()}}
  else if(v.k==='turtle'){ctx.fillStyle='#8fd18a';ctx.beginPath();ctx.ellipse(13,-8,6,5,0,0,7);ctx.fill();ctx.stroke();ctx.fillStyle='#4f9e5a';ctx.beginPath();ctx.ellipse(0,-10,15,10,0,Math.PI,0);ctx.closePath();ctx.fill();ctx.stroke();
    ctx.strokeStyle='rgba(30,70,40,.6)';ctx.beginPath();ctx.moveTo(-6,-10);ctx.lineTo(-3,-17);ctx.lineTo(3,-17);ctx.lineTo(6,-10);ctx.stroke();ctx.strokeStyle=OUT;ctx.fillStyle='#d9a066';rr(-7,-30,14,11,2);ctx.fill();ctx.stroke();ctx.fillStyle='#ff6b8b';ctx.fillRect(-1,-30,2,11);
    ctx.fillStyle='#8fd18a';[-9,7].forEach(function(x,ii){ctx.beginPath();ctx.ellipse(x,-1+Math.sin((v.wk||0)+ii*3)*1.2,4,2.4,0,0,7);ctx.fill();ctx.stroke()});ctx.fillStyle=OUT;ctx.beginPath();ctx.arc(15,-9,1.2,0,7);ctx.fill()}
  else{ctx.fillStyle='#c98b52';rr(-16,-20,24,14,2);ctx.fill();ctx.stroke();ctx.fillStyle='#a8a2b8';ctx.beginPath();ctx.arc(-9,-22,4,0,7);ctx.arc(-3,-23,4,0,7);ctx.arc(3,-21,3.5,0,7);ctx.fill();ctx.stroke();ctx.fillStyle=OUT;[-11,3].forEach(function(x){ctx.beginPath();ctx.arc(x,-4,3.5,0,7);ctx.fill()});
    ctx.fillStyle='#ff6f4f';ctx.beginPath();ctx.ellipse(17,-10,7,5.5,0,0,7);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(21,-14);ctx.lineTo(25,-20);ctx.moveTo(18,-15);ctx.lineTo(19,-21);ctx.stroke();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(19,-12,1.6,0,7);ctx.fill()}
  ctx.restore()}if(v.jam){ctx.save();ctx.font='400 '+Math.round(13*z+5)+'px sans-serif';ctx.textAlign='center';ctx.globalAlpha=.6+.4*Math.sin(t*.008);ctx.fillText('💢',p.x,p.y-44*z);ctx.restore()}}
window.__transit={veh:function(){return VEH.map(function(v){return v.k})},rail:function(L){G.rail=G.rail||{};L.forEach(function(k){G.rail[k]=1});cityF=0;fields();return RST.map(function(s){return [s.b.k,s.on]})},stop:function(x,y){G.b.push({id:G.nid++,k:'d_rstop',x:x,y:y,lv:1,buf:{}});occ();fields();return RST.map(function(s){return [s.b.k,s.on]})},auto:function(){return autoRoad}};

/* 시험용(work/tools/web/transit.js) */
window.__transit.test={
 rail:function(){var tr=G.b.find(function(b){return b.k==='train'});if(!tr)return 'no train';function free(x,y){var k=x+','+y;return inb(x,y)&&own(x,y)&&!OCC[k]&&!G.ter[k]&&!G.road[k]&&!(G.rail&&G.rail[k])}
  var ring=ringOf(tr).filter(function(q){return free(q[0],q[1])});if(!ring.length)return 'no free ring';var cur=ring[0],P=[cur],seen={};seen[cur+'']=1;
  for(var n=0;n<16;n++){var nx=[[1,0],[0,1],[-1,0],[0,-1]].map(function(d){return [cur[0]+d[0],cur[1]+d[1]]}).filter(function(q){return (free(q[0],q[1])||G.road[q+''])&&!seen[q+'']})[0];if(!nx)break;seen[nx+'']=1;P.push(nx);cur=nx}
  var before=window.__traf.stat();G.rail=G.rail||{};P.forEach(function(q){G.rail[q+'']=1});var st=null;for(var e=P.length-1;e>4&&!st;e--){var end=P[e];st=[[1,0],[-1,0],[0,1],[0,-1]].map(function(d){return [end[0]+d[0],end[1]+d[1]]}).filter(function(q){return free(q[0],q[1])})[0]}
  if(!st)return {len:P.length,err:'no stop spot'};var why=siteWhy('d_rstop',st[0],st[1]);G.b.push({id:G.nid++,k:'d_rstop',x:st[0],y:st[1],lv:1,buf:{}});occ();cityF=0;fields();
  var ss=RST.map(function(s){return s.b.k+':'+s.on});var b=G.b[G.b.length-1];focus(b);cam.z=1;return {len:P.length,why:why,st:ss,before:before,after:window.__traf.stat()}},
 auto:function(){function free(x,y){var k=x+','+y;return inb(x,y)&&own(x,y)&&!OCC[k]&&!G.ter[k]&&!G.road[k]&&!(G.rail&&G.rail[k])&&!G.zone[k]}
  for(var x=0;x<N;x++)for(var y=0;y<N;y++){var ok=true;for(var i=0;i<5&&ok;i++)for(var j=0;j<5&&ok;j++)if(!free(x+i,y+j))ok=false;if(!ok)continue;
   TOOL='zR';ZSTROKE=[];var r0=Object.keys(G.road).length;for(i=1;i<4;i++)for(j=1;j<4;j++)paintZone({i:x+i,j:y+j},(x+i)+','+(y+j));var zn=ZSTROKE.length;autoRoad();TOOL=null;var un=0;
   for(i=1;i<4;i++)for(j=1;j<4;j++){var k=(x+i)+','+(y+j);if(G.zone[k]&&!(isRoad(x+i+1,y+j)||isRoad(x+i-1,y+j)||isRoad(x+i,y+j+1)||isRoad(x+i,y+j-1)))un++}
   var c=sc(x+3,y+3);cam.x+=(c.x-VW/2)/cam.z;cam.y+=(c.y-VH/2)/cam.z;return {at:[x,y],zoned:zn,newRoad:Object.keys(G.road).length-r0,unconnected:un}}return 'no space'},
 hall:function(z){focus(bOf('hall'));cam.z=z||.75;return 1}};
