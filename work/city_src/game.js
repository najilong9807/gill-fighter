/* ===== 아가미시티 v2 본체 ===== */
(function(){'use strict';
var D=window.VDATA,B=D.B,TOFF=0;function NOW(){return Date.now()+TOFF}
/* --- 지갑: 본게임과 같은 진주 · 보석 (본게임에 붙일 땐 window.GF_WALLET = {get(k),add(k,n)} 을 넣어 줌) --- */
var EMB=false;try{EMB=window.parent!==window&&!!window.parent.GF_WALLET}catch(e){}
var WAL=window.GF_WALLET||(EMB?window.parent.GF_WALLET:null)||(function(){var K='gf.wallet.test',w=null;try{w=JSON.parse(localStorage.getItem(K))}catch(e){}if(!w)w={pearls:3000,gems:120};
  function sv(){try{localStorage.setItem(K,JSON.stringify(w))}catch(e){}}
  return {get:function(k){return k==='pearl'?w.pearls:w.gems},add:function(k,n){if(k==='pearl')w.pearls=Math.max(0,w.pearls+n);else w.gems=Math.max(0,w.gems+n);sv()}}})();
var SZ={hall:3,palace:3,pump:1};function sz(k){return SZ[k]||(typeof DEC!=='undefined'&&DEC[k]?DEC[k].s:k.charAt(0)==='z'?1:2)}
var ICON={pearl:'🫧',gem:'💎',stone:'🪨',brick:'🧱',nail:'📌',kelp:'🌿',dango:'🍡',cloth:'👕'};
var RNAME={pearl:'진주',gem:'보석',stone:'산호석',brick:'산호 벽돌',nail:'진주 못',kelp:'다시마',dango:'경단',cloth:'옷'};
/* 생산: 시간당 · 버퍼는 8시간치까지 쌓이고 눌러서 받음 */
var TAXR=.05; /* 세금: 장보는 인구 1명 · 시간당 진주 TAXR × 행복% (시뮬 village-sim.js와 같은 값) */
function rates(b){var L=b.lv||0;if(b.k==='hall'){var tx=G.taxH||0;return tx>0?{pearl:tx}:{}}if(!L||isZ(b.k)||isD(b.k)||b.job&&b.job.L===1)return {};var p=D.prodPerHour(b.k,L),o={};
  if(b.k==='quarry')o.stone=p.stone;if(b.k==='kiln')o.brick=p.brick;if(b.k==='pearl'){o.pearl=p.pearl;o.nail=p.nail}if(b.k==='farm')o.kelp=p.kelp;
  if(b.k==='factory')o.dango=2*L*(1+L*.08);if(b.k==='sew')o.cloth=1.5*L*(1+L*.08);
  var m=.5+.5*(CS.w==null?1:CS.w);for(var q in o)o[q]*=m;return o}
var USE={kiln:{stone:4},factory:{kelp:.5},sew:{kelp:.5}};
var BUFH=8;
/* --- 저장 --- */
var KEY='gfcity.v1',G=null,N=64,CK=16;
function hh(n){n=Math.sin(n*127.1+311.7)*43758.5453;return n-Math.floor(n)}
function fresh(){var g={v:1,seed:Math.floor(Math.random()*1e6),t:NOW(),res:{stone:600,brick:0,nail:0,kelp:0,dango:60,cloth:40},road:{},zone:{},ter:{},b:[],nid:1,cam:null};
  var c=Math.floor(N/2)-1;g.N=N;g.groad={};for(var x=0;x<=c+8;x++){g.road[x+','+(c+3)]=1;if(x<16)g.groad[x+','+(c+3)]=1}g.gate={x:0,y:c+3};g.gateV=3;
  for(var i=0;i<N;i++)for(var j=0;j<N;j++){var d=Math.max(Math.abs(i-c-1),Math.abs(j-c-1));if(d<5)continue;var r=hh(g.seed+i*31+j*57);if(r<.09)g.ter[i+','+j]=1;else if(r<.15)g.ter[i+','+j]=2}
  g.b.push({id:g.nid++,k:'hall',x:c,y:c,lv:1,buf:{}});return g}
function load(){try{var s=JSON.parse(localStorage.getItem(KEY));if(s&&s.v===1){if((s.N||36)<N){for(var i=0;i<N;i++)for(var j=0;j<N;j++){if(i<(s.N||36)&&j<(s.N||36))continue;var r=hh(s.seed+i*31+j*57);if(r<.09)s.ter[i+','+j]=1;else if(r<.15)s.ter[i+','+j]=2}s.N=N}return s}}catch(e){}return fresh()}
function save(){G.t=NOW();try{localStorage.setItem(KEY,JSON.stringify(G))}catch(e){}try{hint()}catch(e){}}
/* 본게임 탭 빨간 점용: 다음에 받을 것이 생기는 시각(공사 끝 · 생산 8시간치 가득) */
function hint(){var now=NOW(),nx=Infinity;G.b.forEach(function(b){if(b.job){nx=Math.min(nx,b.job.end);return}var r=rates(b);for(var k in r)if(r[k]>0){var left=(r[k]*BUFH-((b.buf&&b.buf[k])||0))/r[k];nx=Math.min(nx,now+Math.max(0,left)*3600000)}});
  try{localStorage.setItem('gfcity.hint',JSON.stringify({next:isFinite(nx)?Math.round(nx):0,at:now}))}catch(e){}}
G=load();
var $=function(i){return document.getElementById(i)};
function lvOf(k){var m=0;G.b.forEach(function(b){if(b.k===k)m=Math.max(m,b.lv||0)});return m}
function bOf(k){for(var i=0;i<G.b.length;i++)if(G.b[i].k===k)return G.b[i];return null}
function hallLv(){return lvOf('hall')}
function crabsMax(){return D.crabs(lvOf('crab'))}
function jobs(){return G.b.filter(function(b){return b.job})}
function cap(r){var c=D.storeCap(lvOf('store'));return r==='brick'?c/4:r==='nail'?c/10:c}
function have(r){return r==='pearl'||r==='gem'?WAL.get(r):(G.res[r]||0)}
function payOk(c){for(var k in c)if(have(k)<c[k])return false;return true}
function pay(c){for(var k in c){if(k==='pearl'||k==='gem')WAL.add(k,-c[k]);else G.res[k]-=c[k]}}
function needList(k,L){var o=D.needs(k,L).map(function(n){return {k:n[0],lv:n[1],ok:lvOf(n[0])>=n[1]}});if(k==='hall'&&POPREQ(L))o.push({k:'pop',lv:POPREQ(L),ok:CS.pop>=POPREQ(L)});return o}
function fmt(n){n=Math.floor(n);return n>=100000?(n/10000).toFixed(n>=1e6?0:1)+'만':n.toLocaleString('ko-KR')}
/* 위쪽 줄 전용: 1만부터 줄여 써서 칩 다섯 개가 한 줄에 들어가게 */
function fmtS(n){n=Math.floor(n);return n>=10000?(n/10000).toFixed(n>=1e6?0:1)+'만':n.toLocaleString('ko-KR')}
function dur(s){s=Math.max(0,Math.ceil(s));var d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),x=s%60;return d?d+'일 '+h+'시간':h?h+'시간 '+m+'분':m?m+'분 '+(m<10?x+'초':''):x+'초'}

/* --- 그림 캐시 --- */
var IMG={};
function art(k,L,bp){var key=k+L+(bp?'b':'');if(IMG[key])return IMG[key];var r=artFor(k,Math.max(1,L),bp),o={img:new Image(),top:r.top,ok:false};
  o.img.onload=function(){o.ok=true};o.img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="'+W*2+'" height="'+H*2+'" viewBox="0 0 '+W+' '+H+'">'+DEFS+r.svg+'</svg>');IMG[key]=o;return o}
function thumb(k){var r=artFor(k,1,false),hw=sz(k)===1?60:110;return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="'+(GX-hw)+' '+(r.top-6)+' '+hw*2+' '+(GY+(hw===60?40:70)-r.top+6)+'">'+DEFS+r.svg+'</svg>')}

/* --- 화면 · 카메라 --- */
var cv=$('cv'),ctx=cv.getContext('2d'),DPR=Math.min(2,devicePixelRatio||1),VW,VH,TW=96,TH=48;
var cam=G.cam||{x:0,y:N*TH/2,z:.75};
function resize(){VW=innerWidth;VH=innerHeight;cv.width=VW*DPR;cv.height=VH*DPR}addEventListener('resize',resize);resize();
function sc(i,j){return {x:VW/2+((i-j)*TW/2-cam.x)*cam.z,y:VH/2+((i+j)*TH/2-cam.y)*cam.z}}
function tileAt(sx,sy){var wx=(sx-VW/2)/cam.z+cam.x,wy=(sy-VH/2)/cam.z+cam.y,a=wx/(TW/2),b=wy/(TH/2);return {i:Math.floor((a+b)/2+.5),j:Math.floor((b-a)/2+.5)}}
function centerOf(b){var s=sz(b.k);return sc(b.x+(s-1)/2,b.y+(s-1)/2)}
function inb(i,j){return i>=0&&j>=0&&i<N&&j<N}
var OCC={};function occ(){OCC={};G.b.forEach(function(b){var s=sz(b.k);for(var i=0;i<s;i++)for(var j=0;j<s;j++)OCC[(b.x+i)+','+(b.y+j)]=b})}occ();
function isRoad(i,j){return !!G.road[i+','+j]}
function siteWhy(k,x,y){var s=sz(k),road=false;for(var i=0;i<s;i++)for(var j=0;j<s;j++){var X=x+i,Y=y+j,t=X+','+Y;if(!inb(X,Y))return '땅 밖이에요';if(!own(X,Y))return '아직 우리 땅이 아니에요 · 영토를 확장해요';if(OCC[t])return '다른 건물이 있어요';if(G.road[t])return '도로 위에는 못 지어요';if(G.ter[t])return '바위 · 덤불을 먼저 치워요'}
  for(i=-1;i<=s;i++)for(j=-1;j<=s;j++){if((i<0||i>=s)&&(j<0||j>=s))continue;if(i>=0&&i<s&&j>=0&&j<s)continue;if(isRoad(x+i,y+j))road=true}
  return road?'':'도로에 붙여 지어야 해요'}

/* --- 진행: 공사 · 생산 --- */
var FX=[],TXT=[],POPS={};
function step(now,quiet){var dtH=(now-(G.tick||now))/3600000;G.tick=now;
  G.b.forEach(function(b){
    if(b.job&&now>=b.job.end){b.lv=b.job.L;b.job=null;if(b.lv===1&&!isZ(b.k)){var r0=rates(b);b.buf=b.buf||{};for(var q0 in r0)b.buf[q0]=(b.buf[q0]||0)+Math.max(2,r0[q0]*1.2)}POPS[b.id]=quiet?0:now;if(!quiet){var c=centerOf(b);if(isZ(b.k)){dust(c.x,c.y,8,.8);sparkle(c.x,c.y-30*cam.z,6)}else{dust(c.x,c.y,22,1.8);sparkle(c.x,c.y-60*cam.z,18);float(c.x,c.y-90*cam.z,(b.k==='hall'?'🏛 ':'')+'Lv.'+b.lv+'!',true);snd('done');toast(B[b.k].n+' Lv.'+b.lv+' 완성!')}}else QUIET++}
    if(b.lv&&!b.job&&b.xpd!==b.lv){b.xpd=b.lv;addXP(isZ(b.k)||isD(b.k)?2:Math.min(200,Math.ceil(D.time(b.k,b.lv)/60)+5))}
    if(dtH>0){var r=rates(b),u=USE[b.k];b.buf=b.buf||{};for(var k in r){var add=r[k]*dtH;if(u){for(var q in u){var need=u[q]*add;if(G.res[q]<need)add=G.res[q]/u[q];}for(q in u)G.res[q]-=u[q]*add}
      b.buf[k]=Math.min(r[k]*BUFH,(b.buf[k]||0)+add)}}})}
var QUIET=0;
function collect(b){var got=[],c=centerOf(b);for(var k in b.buf){var v=Math.floor(b.buf[k]);if(v<1)continue;
    if(k==='pearl'){WAL.add('pearl',v);b.buf[k]-=v;got.push('+'+v+ICON[k])}
    else{var room=Math.floor(cap(k)-G.res[k]);if(room<=0){toast(RNAME[k]+' 창고가 가득 찼어요 · 조개 창고를 올려요');continue}var t=Math.min(v,room);G.res[k]+=t;b.buf[k]-=t;got.push('+'+t+ICON[k])}}
  if(got.length){snd('pop');addXP(1);if(Math.random()<.2)evtAdd(1,c.x+24,c.y-50*cam.z);G.tutC=true;float(c.x,c.y-70*cam.z,(b.k==='hall'?'세금 ':'')+got.join(' '));bubbleFx(c.x,c.y-60*cam.z);save();try{if(EMB&&window.parent.GF_CITY_EV)window.parent.GF_CITY_EV('collect',1)}catch(e){}}}
function bufReady(b){var r=rates(b);for(var k in b.buf)if(b.buf[k]>=Math.max(1,(r[k]||1)*.25))return k;return null}

/* --- 짓기 · 올리기 --- */
function canStart(k,L){var why=[];if(L>D.HMAX)return ['최고 단계예요'];if(k!=='hall'&&hallLv()<B[k].at)why.push('🏛 산호궁 Lv.'+B[k].at+'에 열려요');
  needList(k,L).forEach(function(n){if(!n.ok)why.push(reqTxt(n)+' 필요')});
  if(!payOk(D.cost(k,L)))why.push('재료가 모자라요');if(jobs().length>=crabsMax())why.push('게 일꾼이 다 바빠요 🦀');return why}
function startJob(b,L){var c=D.cost(b.k,L);pay(c);snd('build');var t=D.time(b.k,L)*1000,now=NOW();b.job={L:L,start:now,end:now+t};
  var p=centerOf(b);dust(p.x,p.y+10,14,1.2);save()}
/* 보석으로 바로 끝내기: 20개 이상이면 한 번 물어봄(아가미 파이터와 같은 지갑이라 실수로 크게 쓰지 않게) */
function gemPay(g){if(g>WAL.get('gem')){toast('보석이 모자라요');return false}if(g>=20&&!confirm('💎 '+g+'개를 써서 바로 끝낼까요?\n보석은 아가미 파이터와 같이 써요'))return false;if(g){WAL.add('gem',-g);snd('coin')}return true}
function rush(b){if(!b.job)return;var left=(b.job.end-NOW())/1000,g=D.rushGems(left);if(!gemPay(g))return;b.job.end=NOW();closePanel();save()}

/* --- 입자 --- */
function dust(x,y,n,s){for(var i=0;i<n;i++){var a=Math.random()*6.28,v=(s||1)*(.6+Math.random());FX.push({k:'d',x:x,y:y,vx:Math.cos(a)*v*2.2,vy:Math.sin(a)*v*.9-.4,r:6+Math.random()*9,l:1,dl:.018+Math.random()*.012})}}
function sparkle(x,y,n){for(var i=0;i<n;i++){var a=Math.random()*6.28,v=1+Math.random()*3;FX.push({k:'s',x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1.4,r:5+Math.random()*6,l:1,dl:.015+Math.random()*.01,rot:Math.random()*3})}}
function bubbleFx(x,y){for(var i=0;i<8;i++)FX.push({k:'b',x:x+(Math.random()-.5)*30,y:y,vx:(Math.random()-.5)*.6,vy:-1-Math.random()*1.5,r:3+Math.random()*4,l:1,dl:.02})}
function float(x,y,s,big){TXT.push({s:s,x:x,y:y,t:0,big:big})}
function drawFX(){FX=FX.filter(function(p){p.x+=p.vx;p.y+=p.vy;p.l-=p.dl;var z=Math.max(.6,cam.z);
  if(p.k==='d'){p.vx*=.95;p.vy*=.95;p.r+=.3;ctx.fillStyle='rgba(240,230,210,'+(p.l*.7).toFixed(3)+')';ctx.beginPath();ctx.arc(p.x,p.y,p.r*z,0,7);ctx.fill()}
  else if(p.k==='s'){p.vy+=.05;var r=p.r*z*p.l;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle='rgba(255,246,190,'+p.l+')';ctx.beginPath();ctx.moveTo(0,-r);ctx.quadraticCurveTo(0,0,r,0);ctx.quadraticCurveTo(0,0,0,r);ctx.quadraticCurveTo(0,0,-r,0);ctx.quadraticCurveTo(0,0,0,-r);ctx.fill();ctx.restore()}
  else{ctx.strokeStyle='rgba(225,250,255,'+p.l*.8+')';ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);ctx.stroke()}return p.l>0});
  TXT=TXT.filter(function(o){o.t+=16;var k=Math.min(1,o.t/200),s=o.t<200?.5+.6*k+.12*Math.sin(k*3.14):1,a=o.t>1300?Math.max(0,1-(o.t-1300)/400):1;
    ctx.save();ctx.globalAlpha=a;ctx.translate(o.x,o.y-o.t*.025);ctx.scale(s,s);ctx.font=(o.big?'400 30px "Black Han Sans","Jua"':'400 18px "Jua"')+',-apple-system,sans-serif';ctx.textAlign='center';ctx.lineJoin='round';ctx.strokeStyle=OUT;ctx.lineWidth=6;ctx.strokeText(o.s,0,0);ctx.fillStyle=o.big?'#ffd54a':'#fff';ctx.fillText(o.s,0,0);ctx.restore();return o.t<1700})}

/* --- 그리기 --- */
function diamond(x,y,w,h){ctx.beginPath();ctx.moveTo(x,y-h/2);ctx.lineTo(x+w/2,y);ctx.lineTo(x,y+h/2);ctx.lineTo(x-w/2,y);ctx.closePath()}
function drawBg(t){var g=ctx.createLinearGradient(0,0,0,VH);g.addColorStop(0,'#0e4a72');g.addColorStop(.5,'#2683a5');g.addColorStop(1,'#3d9cb3');ctx.fillStyle=g;ctx.fillRect(0,0,VW,VH);
  ctx.save();ctx.globalCompositeOperation='lighter';for(var k=0;k<5;k++){var x=VW*(.08+k*.23)+Math.sin(t*.0003+k)*30;ctx.fillStyle='rgba(180,240,255,.04)';ctx.beginPath();ctx.moveTo(x-20,0);ctx.lineTo(x+40,0);ctx.lineTo(x+180,VH);ctx.lineTo(x+60,VH);ctx.fill()}ctx.restore()}
function visB(){var c=[tileAt(0,0),tileAt(VW,0),tileAt(0,VH),tileAt(VW,VH)],i0=1e9,i1=-1e9,j0=1e9,j1=-1e9;c.forEach(function(q){i0=Math.min(i0,q.i);i1=Math.max(i1,q.i);j0=Math.min(j0,q.j);j1=Math.max(j1,q.j)});return {i0:Math.max(0,i0-2),i1:Math.min(N-1,i1+2),j0:Math.max(0,j0-2),j1:Math.min(N-1,j1+2)}}
function drawTiles(t){var w=TW*cam.z,h=TH*cam.z,V=visB();
  for(var i=V.i0;i<=V.i1;i++)for(var j=V.j0;j<=V.j1;j++){var p=sc(i,j);if(p.x<-w||p.x>VW+w||p.y<-h||p.y>VH+h)continue;var key=i+','+j;
    diamond(p.x,p.y,w+1,h+1);if(G.road[key]){ctx.fillStyle='#e7dfcc';ctx.fill()}else{var v=hh(i*13+j*29+G.seed);ctx.fillStyle=v<.5?'#bfe0dd':'#b7dad8';ctx.fill();ctx.strokeStyle='rgba(40,110,120,.14)';ctx.lineWidth=1;ctx.stroke();zoneTint(key,p,w,h)}viewTint(key,i,j,p,w,h);fogTile(key,i,j,p,w,h)}
  ctx.save();ctx.globalCompositeOperation='lighter';for(var q=0;q<10;q++){var a=hh(q*9.1),b=hh(q*3.7),px=VW*a+Math.sin(t*.0004+q)*40,py=VH*b+Math.cos(t*.0003+q*2)*20;ctx.fillStyle='rgba(255,255,235,.07)';ctx.beginPath();ctx.ellipse(px,py,90+60*a,22+12*b,.2,0,7);ctx.fill()}ctx.restore();
  /* 길 연석: 이웃이 길이 아닌 변에만 */
  ctx.lineCap='round';for(i=V.i0;i<=V.i1;i++)for(j=V.j0;j<=V.j1;j++){if(!G.road[i+','+j])continue;var p2=sc(i,j);if(p2.x<-w||p2.x>VW+w||p2.y<-h||p2.y>VH+h)continue;
    var T=[p2.x,p2.y-h/2],R=[p2.x+w/2,p2.y],Bm=[p2.x,p2.y+h/2],L=[p2.x-w/2,p2.y],E=[[i+1,j,R,Bm],[i-1,j,L,T],[i,j+1,Bm,L],[i,j-1,T,R]];
    E.forEach(function(e){if(isRoad(e[0],e[1]))return;ctx.strokeStyle='#8fa1ad';ctx.lineWidth=Math.max(2,5*cam.z);ctx.beginPath();ctx.moveTo(e[2][0],e[2][1]);ctx.lineTo(e[3][0],e[3][1]);ctx.stroke();ctx.strokeStyle='#f6f2e8';ctx.lineWidth=Math.max(1,2*cam.z);ctx.stroke()});
    if(cam.z>.5){ctx.fillStyle='rgba(150,140,120,.25)';for(var q=0;q<3;q++){var a=hh(i*7+j*3+q),b2=hh(i*3+j*11+q);ctx.beginPath();ctx.ellipse(p2.x+(a-.5)*w*.5,p2.y+(b2-.5)*h*.5,3*cam.z,1.6*cam.z,0,0,7);ctx.fill()}}}}
function drawTer(p,v,seed,t){var z=cam.z;ctx.save();ctx.translate(p.x,p.y);ctx.scale(z,z);ctx.strokeStyle=OUT;ctx.lineWidth=2.4;
  if(v===1){[[-14,4,18],[10,6,14],[0,-6,16]].forEach(function(r){ctx.fillStyle='#93a8b6';ctx.beginPath();ctx.ellipse(r[0],r[1]-r[2]*.3,r[2],r[2]*.65,0,0,7);ctx.fill();ctx.stroke();ctx.fillStyle='#c9d7df';ctx.beginPath();ctx.ellipse(r[0]-r[2]*.3,r[1]-r[2]*.55,r[2]*.35,r[2]*.17,0,0,7);ctx.fill()})}
  else{for(var s=0;s<4;s++){var sx=(s-1.5)*9,sw=Math.sin(t*.0018+s+seed*9)*5;ctx.lineCap='round';ctx.strokeStyle=OUT;ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(sx,6);ctx.quadraticCurveTo(sx+sw,-16,sx+sw*1.5,-32-(s%2)*8);ctx.stroke();ctx.strokeStyle=s%2?'#56c27f':'#3fae6a';ctx.lineWidth=4.6;ctx.stroke()}}
  ctx.restore()}
function drawArt(a,c,alpha,clipY,sy){if(!a.ok)return;var z=cam.z;ctx.save();if(alpha!=null)ctx.globalAlpha=alpha;if(clipY!=null){ctx.beginPath();ctx.rect(0,clipY,VW,VH);ctx.clip()}
  if(sy&&sy!==1){ctx.translate(c.x,c.y);ctx.scale(1/Math.sqrt(sy),sy);ctx.translate(-c.x,-c.y)}ctx.drawImage(a.img,c.x-GX*z,c.y-GY*z,W*z,H*z);ctx.restore()}
function scaffold(c,s,topY,front,alpha,drop){var z=cam.z;ctx.save();ctx.globalAlpha=alpha==null?1:alpha;ctx.translate(c.x,c.y);ctx.scale(z,z);
  var a=48*s+8,b=24*s+4,hT=(c.y-topY)/z,P=front?[[-a,0],[-a/2,b/2],[0,b],[a/2,b/2],[a,0]]:[[-a,0],[-a/2,-b/2],[0,-b],[a/2,-b/2],[a,0]];
  function wood(x1,y1,x2,y2,w){ctx.strokeStyle=OUT;ctx.lineWidth=w+3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.strokeStyle='#d9995a';ctx.lineWidth=w;ctx.stroke()}
  var dy=drop||0;P.forEach(function(q,i){var tl=drop?(i-2)*drop*.004:0;wood(q[0],q[1],q[0]+Math.sin(tl)*hT,q[1]-hT*Math.cos(tl)+dy,4.5)});
  for(var lv=36;lv<hT-6;lv+=42)for(var i=0;i<P.length-1;i++){wood(P[i][0],P[i][1]-lv+dy,P[i+1][0],P[i+1][1]-lv+dy,3.5);if(!drop&&(i+lv/42|0)%2===0&&lv+42<hT)wood(P[i][0],P[i][1]-lv+dy,P[i+1][0],P[i+1][1]-lv-36+dy,2.2)}
  ctx.restore()}
function crabAt(x,y,t,ph){var z=cam.z*1.05;ctx.save();ctx.translate(x,y);ctx.scale(z,z);var bob=Math.abs(Math.sin(t*.012+ph))*2;ctx.strokeStyle=OUT;ctx.lineWidth=2;
  for(var s=-1;s<=1;s+=2)for(var l=0;l<3;l++){ctx.beginPath();ctx.moveTo(s*8,2);ctx.lineTo(s*(14+l*2),8+l*2);ctx.stroke()}
  ctx.fillStyle='#ff7a4d';ctx.beginPath();ctx.ellipse(0,-bob,14,9,0,0,7);ctx.fill();ctx.stroke();
  [-5,5].forEach(function(e){ctx.beginPath();ctx.moveTo(e,-7-bob);ctx.lineTo(e,-14-bob);ctx.stroke();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(e,-16-bob,3.2,0,7);ctx.fill();ctx.stroke();ctx.fillStyle=OUT;ctx.beginPath();ctx.arc(e+.8,-16-bob,1.4,0,7);ctx.fill()});
  ctx.save();ctx.translate(13,-4-bob);ctx.rotate(-.6+Math.sin(t*.025+ph)*.9);ctx.fillStyle='#ff7a4d';ctx.beginPath();ctx.ellipse(4,0,6,4.5,0,0,7);ctx.fill();ctx.stroke();ctx.strokeStyle=OUT;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(6,0);ctx.lineTo(6,-16);ctx.stroke();ctx.strokeStyle='#b8793f';ctx.lineWidth=3;ctx.stroke();ctx.fillStyle='#9aa6b8';ctx.strokeStyle=OUT;ctx.lineWidth=2;ctx.fillRect(0,-22,12,7);ctx.strokeRect(0,-22,12,7);ctx.restore();ctx.restore()}
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
function progBar(x,y,p,label){var w=128,h=12;ctx.save();ctx.translate(x-w/2,y);ctx.fillStyle='#fffdf7';ctx.strokeStyle=OUT;ctx.lineWidth=2.2;rr(-6,-22,w+12,h+28,10);ctx.fill();ctx.stroke();
  ctx.font='800 12px "Jua",-apple-system,"Apple SD Gothic Neo",sans-serif';ctx.fillStyle=OUT;ctx.textAlign='center';ctx.fillText(label,w/2,-7);ctx.fillStyle='#d9e4ef';rr(0,0,w,h,6);ctx.fill();ctx.fillStyle='#4fc36b';rr(0,0,Math.max(h,w*p),h,6);ctx.fill();ctx.strokeStyle=OUT;rr(0,0,w,h,6);ctx.stroke();ctx.restore()}
function badge(x,y,L,hot){ctx.save();ctx.fillStyle=hot?'#ffd54a':'#fffdf7';ctx.strokeStyle=OUT;ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,11,0,7);ctx.fill();ctx.stroke();ctx.font='400 12px "Black Han Sans",sans-serif';ctx.fillStyle=OUT;ctx.textAlign='center';ctx.fillText(L,x,y+4);ctx.restore()}
var BUBS=[];
function drawWorld(t,now){var items=[];
  for(var key in G.ter){var q=key.split(','),i=+q[0],j=+q[1],p=sc(i,j);if(p.x<-80||p.x>VW+80||p.y<-80||p.y>VH+80)continue;items.push({z:i+j,ter:G.ter[key],p:p,s:i*7+j})}
  G.b.forEach(function(b){var s=sz(b.k),c=centerOf(b);if(c.x<-300||c.x>VW+300||c.y<-200||c.y>VH+500)return;items.push({z:b.x+b.y+2*(s-1)+.5,b:b,c:c})});
  WALK.forEach(function(f){var q=walkerPos(f);items.push({z:q.i+q.j+.3,w:f})});if(typeof VEH!=='undefined')VEH.forEach(function(v){var q=vehPos(v);items.push({z:q.i+q.j+.35,v:v})});if(G.gate){WILDF.forEach(function(w){items.push({z:w.fx+w.fy,wf:w})});items.push({z:G.gate.x+G.gate.y+.45,gate:1})}
  if(GH){var s2=sz(GH.k);items.push({z:GH.x+GH.y+2*(s2-1)+.6,g:GH,c:sc(GH.x+(s2-1)/2,GH.y+(s2-1)/2)})}
  items.sort(function(a,b){return a.z-b.z});BUBS=[];var ji=0;
  items.forEach(function(it){if(it.ter){drawTer(it.p,it.ter,it.s,t);return}if(it.w){drawWalker(it.w,t);return}if(it.v){drawVeh(it.v,t);return}if(it.wf){var pw=sc(it.wf.fx,it.wf.fy);if(pw.x>-60&&pw.x<VW+60&&pw.y>-60&&pw.y<VH+60)plainFish(pw.x,pw.y-22*cam.z,it.wf,it.wf.fade*.9,t);return}if(it.gate){drawGate(t);return}
    if(it.g){var g=it.g,s3=sz(g.k),why=siteWhy(g.k,g.x,g.y);if(isD(g.k)&&why==='도로에 붙여 지어야 해요')why='';for(var a=0;a<s3;a++)for(var b2=0;b2<s3;b2++){var pp=sc(g.x+a,g.y+b2);diamond(pp.x,pp.y,TW*cam.z,TH*cam.z);ctx.fillStyle=why?'rgba(255,90,90,.45)':'rgba(90,220,120,.45)';ctx.fill()}
      drawArt(art(g.k,1),it.c,.6);g.why=why;return}
    var b=it.b,c=it.c,s=sz(b.k),z=cam.z;
    ctx.fillStyle='rgba(15,60,80,.2)';ctx.beginPath();ctx.ellipse(c.x+4*z,c.y+6*z,44*s*z,20*s*z,0,0,7);ctx.fill();
    if(b.job){var L=b.job.L,nx=art(b.k,L),bp=art(b.k,L,1),pr=Math.min(1,(now-b.job.start)/(b.job.end-b.job.start)),k=pr<.5?2*pr*pr:1-Math.pow(-2*pr+2,2)/2;
      var top=c.y+(nx.top-GY)*z,bot=c.y+(TH/2*s+6)*z,rev=bot-(bot-top)*k,scT=Math.max(top-8*z,rev-30*z);
      scaffold(c,s,Math.min(scT,c.y-34*z),false);if(b.lv)drawArt(art(b.k,b.lv),c);drawArt(bp,c);drawArt(nx,c,1,rev);
      ctx.save();ctx.globalCompositeOperation='lighter';var lg=ctx.createLinearGradient(0,rev-8,0,rev+6);lg.addColorStop(0,'rgba(255,255,220,0)');lg.addColorStop(.6,'rgba(255,250,200,.5)');lg.addColorStop(1,'rgba(255,255,220,0)');ctx.fillStyle=lg;ctx.fillRect(c.x-60*s*z,rev-8,120*s*z,14);ctx.restore();
      scaffold(c,s,Math.min(scT,c.y-34*z),true);var u=(Math.sin(t*.0009+ji)+1)/2;crabAt(c.x+(-36+u*72)*s*z*.6,c.y+(20*s-Math.abs(u-.5)*14)*z,t,ji);
      if(Math.random()<.04)dust(c.x+(Math.random()-.5)*60*s*z,rev+Math.random()*20,1,.4);
      progBar(c.x,Math.max(70,top-34*z),pr,'Lv.'+L+' · '+dur((b.job.end-now)/1000));ji++;return}
    var pop=POPS[b.id],sy=1,e=pop?(now-pop)/700:9;if(e<1)sy=1+Math.sin(e*Math.PI*2.2)*Math.exp(-e*3.5)*.12;
    drawArt(art(b.k,b.lv),c,1,null,sy);if(e<.6)scaffold(c,s,c.y-(140-e*170)*z,true,1-e/.6,e*200);
    if(SEL===b){ctx.save();diamond(c.x,c.y,TW*s*z,TH*s*z);ctx.strokeStyle='#ffd54a';ctx.lineWidth=3;ctx.setLineDash([8,6]);ctx.stroke();ctx.restore()}
    var a2=art(b.k,b.lv),bx=c.x+26*s*z,by=c.y-10*z;if(cam.z>.45&&!isZ(b.k)&&!isD(b.k))badge(bx,by,b.lv,b.k==='hall');
    var rk=bufReady(b);if(rk){var yy=c.y+(a2.top-GY)*z-10+Math.sin(t*.004+b.id)*4,xx=c.x;ctx.save();ctx.fillStyle='#fffdf7';ctx.strokeStyle=OUT;ctx.lineWidth=2.4;ctx.beginPath();ctx.arc(xx,yy,17,0,7);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(xx-6,yy+15);ctx.lineTo(xx,yy+24);ctx.lineTo(xx+6,yy+15);ctx.fill();ctx.font='18px sans-serif';ctx.textAlign='center';ctx.fillText(ICON[rk],xx,yy+6);ctx.restore();BUBS.push({b:b,x:xx,y:yy})}
  })}

/* --- 입력: 끌기 · 두 손가락 확대 · 누르기 · 길 칠하기 --- */
var TOOL=null,GH=null,SEL=null,PT={},drag=null,pinch=null;
cv.addEventListener('pointerdown',function(e){cv.setPointerCapture(e.pointerId);PT[e.pointerId]={x:e.clientX,y:e.clientY};var ids=Object.keys(PT);
  if(ids.length===2){var a=PT[ids[0]],b=PT[ids[1]];pinch={d:Math.hypot(a.x-b.x,a.y-b.y),z:cam.z};drag=null;return}
  if(GH&&ghostHit(e.clientX,e.clientY)){GDRAG={};drag=null;return}VEL={x:0,y:0};drag={x:e.clientX,y:e.clientY,cx:cam.x,cy:cam.y,moved:false,paint:!!TOOL};if(drag.paint){pushUndo(TOOLN[TOOL]||'구역 지정');paintAt(e.clientX,e.clientY)}});
cv.addEventListener('pointermove',function(e){if(!PT[e.pointerId])return;PT[e.pointerId]={x:e.clientX,y:e.clientY};var ids=Object.keys(PT);
  if(pinch&&ids.length===2){var a=PT[ids[0]],b=PT[ids[1]],mx=(a.x+b.x)/2,my=(a.y+b.y)/2,wx=(mx-VW/2)/cam.z+cam.x,wy=(my-VH/2)/cam.z+cam.y;cam.z=Math.max(.35,Math.min(1.6,pinch.z*Math.hypot(a.x-b.x,a.y-b.y)/pinch.d));cam.x=wx-(mx-VW/2)/cam.z;cam.y=wy-(my-VH/2)/cam.z;return}
  if(GDRAG&&GH){var tt=tileAt(e.clientX,e.clientY),ss=sz(GH.k),nx=tt.i-Math.floor((ss-1)/2),ny=tt.j-Math.floor((ss-1)/2);if(nx!==GH.x||ny!==GH.y){GH.x=nx;GH.y=ny;placeBar()}return}
  if(!drag)return;var dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>8)drag.moved=true;
  if(drag.paint){paintAt(e.clientX,e.clientY);return}var nx2=drag.cx-dx/cam.z,ny2=drag.cy-dy/cam.z,tnow=performance.now(),dtm=Math.max(8,tnow-(drag.lt||tnow-16));VEL={x:(nx2-cam.x)/dtm*16,y:(ny2-cam.y)/dtm*16};drag.lt=tnow;cam.x=nx2;cam.y=ny2;clampCam()});
var VEL={x:0,y:0};function camInertia(){if(drag||pinch)return;if(Math.abs(VEL.x)+Math.abs(VEL.y)<.05){VEL.x=VEL.y=0;return}cam.x+=VEL.x;cam.y+=VEL.y;VEL.x*=.9;VEL.y*=.9;clampCam()}
function endPt(e){delete PT[e.pointerId];if(GDRAG){GDRAG=null;return}if(drag&&(!drag.moved||performance.now()-(drag.lt||0)>80))VEL={x:0,y:0};if(drag&&drag.paint)setTimeout(endAct,0);if(Object.keys(PT).length<2)pinch=null;if(drag&&!drag.moved&&!drag.paint)tap(e.clientX,e.clientY);if(drag&&drag.paint)save();drag=null}
cv.addEventListener('pointerup',endPt);cv.addEventListener('pointercancel',endPt);
cv.addEventListener('wheel',function(e){e.preventDefault();var wx=(e.clientX-VW/2)/cam.z+cam.x,wy=(e.clientY-VH/2)/cam.z+cam.y;cam.z=Math.max(.35,Math.min(1.6,cam.z*(e.deltaY<0?1.1:.9)));cam.x=wx-(e.clientX-VW/2)/cam.z;cam.y=wy-(e.clientY-VH/2)/cam.z},{passive:false});
function clampCam(){var c0=sc(0,0);var mx=N*TW/2;cam.x=Math.max(-mx,Math.min(mx,cam.x));cam.y=Math.max(0,Math.min(N*TH,cam.y))}
var lastPaint='';
function paintAt(x,y){var t=tileAt(x,y),k=t.i+','+t.j;if(k===lastPaint||!inb(t.i,t.j))return;lastPaint=k;if(!own(t.i,t.j)){toast('아직 우리 땅이 아니에요');return}
  if(TOOL.charAt(0)==='z'){paintZone(t,k);return}
  if(TOOL==='road'){if(G.road[k]||OCC[k]||G.ter[k])return;if(G.zone[k])delete G.zone[k];if(WAL.get('pearl')<D_ROAD){toast('진주가 모자라요');return}WAL.add('pearl',-D_ROAD);G.road[k]=1;snd('tap');var p=sc(t.i,t.j);dust(p.x,p.y,3,.4)}
  else if(TOOL==='clear'){if(G.road[k]){if(roadNeeded(t.i,t.j)){toast('건물에 이어진 마지막 도로는 철거할 수 없어요');return}delete G.road[k];WAL.add('pearl',Math.floor(D_ROAD/2));return}
    if(G.ter[k]){var cst=G.ter[k]===1?60:25;if(WAL.get('pearl')<cst){toast('진주 '+cst+' 필요해요');return}WAL.add('pearl',-cst);delete G.ter[k];var p2=sc(t.i,t.j);dust(p2.x,p2.y,10,1);float(p2.x,p2.y-20,'-'+cst+'🫧')}}}
var D_ROAD=10;
function roadNeeded(i,j){var k=i+','+j;delete G.road[k];var bad=G.b.some(function(b){return siteRoad(b)===false});G.road[k]=1;return bad}
function siteRoad(b){var s=sz(b.k);for(var i=-1;i<=s;i++)for(var j=-1;j<=s;j++){if((i<0||i>=s)&&(j<0||j>=s))continue;if(i>=0&&i<s&&j>=0&&j<s)continue;if(isRoad(b.x+i,b.y+j))return true}return false}
function tap(x,y){
  if(!GH&&!TOOL)for(var si=0;si<SIGNS.length;si++){var sg=SIGNS[si];if(Math.abs(x-sg.x)<48&&Math.abs(y-sg.y)<24){landPanel(sg);return}}
  for(var i=0;i<BUBS.length;i++){var q=BUBS[i];if(Math.hypot(x-q.x,y-q.y)<24){collect(q.b);return}}
  var t=tileAt(x,y);
  if(GH){var s=sz(GH.k);GH.x=t.i-Math.floor((s-1)/2);GH.y=t.j-Math.floor((s-1)/2);placeBar();return}
  var hit=OCC[t.i+','+t.j];
  if(!hit){/* 건물 그림은 위로 솟으니 화면 위쪽 눌러도 잡히게 */var best=null,bd=1e9;G.b.forEach(function(b){var c=centerOf(b),s=sz(b.k);if(Math.abs(x-c.x)<44*s*cam.z&&y<c.y+20*cam.z&&y>c.y-150*s*cam.z){var d=Math.abs(x-c.x)+Math.abs(y-c.y)*.3;if(d<bd){bd=d;best=b}}});hit=best}
  if(hit){SEL=hit;openPanel(hit)}else{SEL=null;closePanel()}}

/* --- 화면 틀 --- */
function toast(s){var el=$('toast');el.textContent=s;el.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(function(){el.classList.remove('on')},1800)}
function hud(){var L=hallLv();$('hLv').innerHTML='🏛 <b>Lv.'+L+'</b>';$('hX').innerHTML='⭐ <b>'+(G.xl||1)+'</b><span class="xpb"><i style="width:'+Math.min(100,(G.xp||0)/xpNeed(G.xl||1)*100)+'%"></i></span>';var on=ordReady();$('ordN').textContent=on||'';$('ordN').hidden=!on;var IT=document.documentElement.classList.contains('intab'),hp=(IT?'':'🫧 ')+'<b>'+fmt(WAL.get('pearl'))+'</b>',hg=(IT?'':'💎 ')+'<b>'+fmt(WAL.get('gem'))+'</b>';if(hud.p!==hp){hud.p=hp;$('hP').innerHTML=hp}if(hud.g!==hg){hud.g=hg;$('hG').innerHTML=hg} /* 본게임 탭 안: 진주 · 보석은 본게임과 같은 그림(svart) */
  $('hS').innerHTML='🪨 <b>'+fmtS(G.res.stone)+'</b>';$('hB').hidden=L<7;$('hB').innerHTML='🧱 <b>'+fmtS(G.res.brick)+'</b>';$('hN').hidden=L<8;$('hN').innerHTML='📌 <b>'+fmtS(G.res.nail)+'</b>';
  $('hF').innerHTML='🐟 <b>'+CS.pop+'</b><small>/'+CS.lim+'</small>';['R','C','I'].forEach(function(z){var d=CS.dem[z],el=$('d'+z);el.style.height=Math.round(Math.max(.08,(d+1)/2)*100)+'%';el.style.background=d>.1?'#35C27A':d<-.1?'#E5484D':'#F2B233'});
  $('crabs').innerHTML='🦀 <b>'+jobs().length+'/'+crabsMax()+'</b>';goal();tutPaint();evtTick();undoBtn();var an=$('arrN');if(an)an.style.visibility=(!$('panel').hidden||!$('tray').hidden||TOOL)?'hidden':''}
function goal(){var L=hallLv(),el=$('goal');if(L>=D.HMAX){el.innerHTML='🏛 산호궁 최고 단계예요 ✨';return}
  var h=bOf('hall'),list=needList('hall',L+1);if(h.job){el.innerHTML='🏛 산호궁 Lv.'+(L+1)+' 공사 중 · '+dur((h.job.end-NOW())/1000);return}
  el.innerHTML='<span class="gt">🏛 Lv.'+(L+1)+' 조건</span>'+list.map(function(n){return '<span class="'+(n.ok?'ok':'no')+'" data-k="'+n.k+'">'+(n.ok?'✓':'○')+' '+reqTxt(n)+'</span>'}).join('')}
$('goal').onclick=function(e){var k=e.target.dataset&&e.target.dataset.k;if(k==='pop'){lifePanel();return}if(!k){var h=bOf('hall');focus(h);SEL=h;openPanel(h);return}var b=bOf(k);if(b){focus(b);SEL=b;openPanel(b)}else{openBuild(CATOF[k]);toast(NM(k)+'을(를) 먼저 지어요')}};
function focus(b){var s=sz(b.k);cam.x=((b.x-b.y))*TW/2;cam.y=(b.x+b.y+s-1)*TH/2-60/cam.z}
/* ===== 메뉴 정리: 아래 [🐢 주문 · 📦 창고] [🔨 짓기] [☰ 메뉴] / 짓기 안 분류 / 도구 쓸 땐 얇은 줄만 ===== */
var TAB=null,CAT='road';
var CATS=[['road','🛣 도로'],['zone','🏘 구역'],['base','⚙ 기반'],['prod','🏭 생산'],['trade','🐢 교역'],['pub','🏫 공공'],['mark','✨ 랜드마크'],['deco','🌸 장식'],['clear','🧹 철거']];
var CATOF={pump:'base',crab:'base',store:'base',quarry:'prod',farm:'prod',factory:'prod',sew:'prod',kiln:'prod',pearl:'prod',turtle:'trade',train:'trade',port:'trade',diner:'pub',school:'pub',clinic:'pub',fire:'pub',police:'pub',aqua:'mark',palace:'mark'};
function setTab(t){if(!t){closeBuild();endTool();return}if(t==='build')t='base';if(t==='road'||t==='zone'||t==='clear'){startTool(t==='zone'?'zR':t);return}openBuild(t)}
function openBuild(c){endTool();closePanel();GH=null;$('place').hidden=true;TAB='build';$('bBuild').classList.add('on');var tr=$('tray');tr.hidden=false;showCat(c||CAT)}
function closeBuild(){TAB=null;$('bBuild').classList.remove('on');$('tray').hidden=true}
function catBadge(c){var L=hallLv(),n=0;Object.keys(CATOF).forEach(function(k){if(CATOF[k]===c&&!bOf(k)&&L>=B[k].at&&needList(k,1).every(function(q){return q.ok}))n++});return n}
function showCat(c){CAT=c;var L=hallLv(),h='<div class="pills">'+CATS.map(function(q){var n=catBadge(q[0]);return '<button data-c="'+q[0]+'" class="'+(q[0]===c?'on':'')+'">'+q[1]+(n?'<em>'+n+'</em>':'')+'</button>'}).join('')+'</div>';
  if(c==='road')h+='<div class="tools1"><button data-tool="road"><b>🛣 도로 건설</b><i>끌어서 도로를 놓아요 · 한 칸 '+D_ROAD+'🫧</i></button><p class="tip">건물 · 구역은 도로에 붙어야 돌아가요. 도로끼리 이어지면 모양이 저절로 맞춰져요.</p></div>';
  else if(c==='clear')h+='<div class="tools1"><button data-tool="clear"><b>🧹 철거하기</b><i>바위 60🫧 · 덤불 25🫧 · 도로 철거(절반 환급)</i></button><p class="tip">다시마 덤불은 근처 땅값을 조금 올려 줘요. 꼭 필요한 곳만 철거해요.</p></div>';
  else if(c==='zone'){h+='<div class="tools1 z">';[['zR','R'],['zC','C'],['zI','I']].forEach(function(a){var z=ZN[a[1]],lock=L<z.at,d=CS.dem[a[1]];h+='<button data-tool="'+a[0]+'"'+(lock?' class="off"':'')+'><b>'+z.ic+' '+z.n+'</b><i>'+(lock?'🔒 🏛Lv.'+z.at:'수요 '+(d>.1?'▲ 많음':d<-.1?'▼ 없음':'– 보통'))+'</i></button>'});
    h+='<button data-tool="z0"><b>🧽 구역 해제</b><i>지정 취소</i></button></div><p class="tip">지정한 칸이 도로 · 산소(산소 펌프)에 닿고 수요가 있으면 물고기들이 직접 지어요 · 한 칸 5🫧</p>'}
  else if(c==='deco'){var dc='';Object.keys(DEC).sort(function(a,b){return (DEC[b].gift?1:0)-(DEC[a].gift?1:0)}).forEach(function(k){var d=DEC[k],inv=(G.inv&&G.inv[k])|0;if(d.fac||d.gift&&!inv)return;var open=d.gift?inv>0:L>=d.at;dc+='<button class="card'+(open?'':' off')+'" data-dk="'+k+'"><img src="'+thumb(k)+'" alt=""><b>'+d.n+'</b><i>'+(d.gift?'🎁 '+inv+'개 있어요':open?'🫧'+fmt(d.c):'🔒 🏛Lv.'+d.at)+'</i><small>주변 '+d.r+'칸 땅값 +'+d.v+'</small></button>'});h+='<div class="cards">'+dc+'</div><p class="tip">장식은 도로에 안 붙어도 돼요 · 땅값이 오르면 주택이 2 · 3단계로 자라요</p>'}
  else{var cards='';Object.keys(CATOF).forEach(function(k){if(CATOF[k]!==c)return;var b=B[k],built=bOf(k),open=L>=b.at,cc=D.cost(k,1),why=open?needList(k,1).filter(function(n){return !n.ok}).map(reqTxt).join(', '):'';
      cards+='<button class="card'+(built?' own':!open||why?' off':'')+'" data-k="'+k+'"><img src="'+thumb(k)+'" alt=""><b>'+b.n+'</b>'+(built?'<i class="own">✓ Lv.'+built.lv+'</i>':!open?'<i>🔒 🏛Lv.'+b.at+'</i>':why?'<i>'+why+' 필요</i>':'<i>🫧'+fmt(cc.pearl)+' 🪨'+fmt(cc.stone)+'</i>')+'<small>'+(DESC[k]?DESC[k].s:'')+'</small></button>'});
    if(c==='base')Object.keys(DEC).sort(function(a,b){return (DEC[b].o2r?1:0)-(DEC[a].o2r?1:0)}).forEach(function(k){var d=DEC[k];if(!d.fac)return;var open=L>=d.at;cards+='<button class="card'+(open?'':' off')+'" data-dk="'+k+'"><img src="'+thumb(k)+'" alt=""><b>'+d.n+'</b><i>'+(open?'🫧'+fmt(d.c):'🔒 🏛Lv.'+d.at)+'</i><small>'+(d.rst?'선로로 이어지면 주변 '+d.rst+'칸 길 막힘 −45% · 선로 옆에 지어요':d.bus?'주변 '+d.bus+'칸 길 막힘 −35% · 여러 개 지어요':d.o2r?'주변 '+d.o2r+'칸 산소 · 여러 개 지어요':'주변 '+d.cr+'칸 탁한 물 −'+d.cv+' · 여러 개 지어요')+'</small></button>'});
    h+='<div class="cards">'+cards+'</div>'}
  var tr=$('tray');tr.innerHTML=h+'<button class="close" id="tX">✕</button>';$('tX').onclick=closeBuild;
  tr.querySelectorAll('.pills button').forEach(function(el){el.onclick=function(){showCat(el.dataset.c)}});
  tr.querySelectorAll('[data-tool]').forEach(function(el){el.onclick=function(){var t=el.dataset.tool;if(t.charAt(0)==='z'&&t!=='z0'&&L<ZN[t.charAt(1)].at){toast(ZN[t.charAt(1)].n+' 구역은 🏛 산호궁 Lv.'+ZN[t.charAt(1)].at+'에 열려요');return}startTool(t)}});
  tr.querySelectorAll('[data-dk]').forEach(function(el){el.onclick=function(){var k=el.dataset.dk;if(hallLv()<DEC[k].at){toast('🏛 산호궁 Lv.'+DEC[k].at+'에 열려요');return}ghostAt(k)}});
  tr.querySelectorAll('.card[data-k]').forEach(function(el){el.onclick=function(){var k=el.dataset.k;if(bOf(k)){var b=bOf(k);closeBuild();focus(b);SEL=b;openPanel(b);return}
    if(hallLv()<B[k].at){toast('🏛 산호궁 Lv.'+B[k].at+'에 열려요');return}var w=needList(k,1).filter(function(n){return !n.ok});if(w.length){toast(reqTxt(w[0])+'이(가) 먼저 필요해요');return}
    ghostAt(k)}})}
var TOOLN={road:'🛣 도로 건설',clear:'🧹 철거',zR:'🏠 주거 구역',zC:'🛍 상업 구역',zI:'🔧 산업 구역',z0:'🧽 구역 해제'};
function startTool(t){TOOL=t;$('tray').hidden=true;TAB=null;$('bBuild').classList.remove('on');closePanel();var el=$('toolbar');el.hidden=false;el.className=t.charAt(0)==='z'?'z':'';$('dock').hidden=true;
  var h='<div class="tl"><b>'+TOOLN[t]+'</b><small>'+(t==='road'?'끌어서 도로를 놓아요 · '+D_ROAD+'🫧':t==='clear'?'눌러서 철거해요':'끌어서 지정해요 · 5🫧')+' · 이동은 두 손가락</small></div>';
  if(t.charAt(0)==='z')h+='<div class="zs">'+['zR','zC','zI','z0'].map(function(z){return '<button data-z="'+z+'" class="'+(z===t?'on':'')+'">'+TOOLN[z].split(' ')[0]+'</button>'}).join('')+'</div>';
  h+='<button class="main" id="tDone">✓ 끝</button>';el.innerHTML=h;$('tDone').onclick=function(){endTool();save()};
  el.querySelectorAll('[data-z]').forEach(function(b){b.onclick=function(){var z=b.dataset.z;if(z!=='z0'&&hallLv()<ZN[z.charAt(1)].at){toast(ZN[z.charAt(1)].n+' 구역은 🏛 Lv.'+ZN[z.charAt(1)].at+'에 열려요');return}startTool(z)}})}
function endTool(){TOOL=null;var el=$('toolbar');if(el)el.hidden=true;$('dock').hidden=false}
function zoneTray(){startTool(TOOL&&TOOL.charAt(0)==='z'?TOOL:'zR')}

/* --- 🐢 주문 배달 --- */
var GV={kelp:1,stone:1,dango:3,cloth:4,brick:6,nail:15},GB={kelp:8,stone:10,dango:4,cloth:3,brick:2,nail:1};
function ordSlots(){var L=lvOf('turtle');return L?Math.min(9,3+Math.floor(L/2)):0}
function goodsPool(){var L=hallLv(),p=[];if(lvOf('farm'))p.push('kelp');if(lvOf('quarry'))p.push('stone');if(lvOf('factory'))p.push('dango');if(lvOf('sew'))p.push('cloth');if(lvOf('kiln'))p.push('brick');if(lvOf('pearl')&&L>=12)p.push('nail');return p}
function genOrder(){var L=hallLv(),pool=goodsPool(),n=Math.min(pool.length,1+Math.floor(Math.random()*Math.min(3,1+L/5))),it={},val=0;pool=pool.slice().sort(function(){return Math.random()-.5});
  for(var i=0;i<n;i++){var g=pool[i],a=Math.max(1,Math.round(GB[g]*(1+L*.35)*(.7+Math.random()*.6)));it[g]=a;val+=a*GV[g]}
  var rw={pearl:Math.max(10,Math.round(val*.5/5)*5),xp:Math.round(val/3)+3};if(Math.random()<.12&&L>=7)rw.brick=Math.max(2,Math.round(L/2));else if(Math.random()<.05)rw.gem=1;return {id:G.nid++,it:it,rw:rw,at:0,who:ORDWHO[Math.floor(Math.random()*ORDWHO.length)]}}
var ORDWHO=['🐡 복어 아주머니','🐠 흰동가리 남매','🦐 새우 요리사','🐙 문어 선생님','🦀 꽃게 목수','🐟 고등어 반장','🦑 오징어 화가','🐚 소라 할머니','🐬 돌고래 우체부','🦞 가재 대장장이'];
function ordTick(now){var n=ordSlots();G.ord=G.ord||[];while(G.ord.length<n)G.ord.push({id:G.nid++,it:null,at:now});G.ord.forEach(function(o){if(!o.it&&now>=o.at&&goodsPool().length){var g=genOrder();o.it=g.it;o.rw=g.rw;o.who=g.who}})}
function ordCan(o){if(!o.it)return false;for(var k in o.it)if((G.res[k]||0)<o.it[k])return false;return true}
function ordReady(){return (G.ord||[]).filter(ordCan).length}
function ordSend(o){if(!ordCan(o)){toast('창고에 물건이 모자라요');return}for(var k in o.it)G.res[k]-=o.it[k];G.ordSent=(G.ordSent|0)+1;snd('coin');var tc=bOf('turtle'),tcc=tc?centerOf(tc):{x:VW/2,y:VH/2};evtAdd(3+Math.floor(Object.keys(o.it).length*2),tcc.x+30,tcc.y-40*cam.z);WAL.add('pearl',o.rw.pearl);if(o.rw.gem)WAL.add('gem',o.rw.gem);if(o.rw.brick)G.res.brick+=o.rw.brick;addXP(o.rw.xp);
  var t=bOf('turtle');if(t){var c=centerOf(t);float(c.x,c.y-70*cam.z,'+'+o.rw.pearl+'🫧');bubbleFx(c.x,c.y-50*cam.z)}o.it=null;o.at=NOW()+60000;save();orderPanel()}
function ordDrop(o){o.it=null;o.at=NOW()+5*60000;save();orderPanel()}
function orderPanel(){var el=$('panel'),h='<button class="x" id="pX">✕</button><h2>🐢 주문 배달</h2>';
  if(!lvOf('turtle')){h+='<div class="box">거북 배달소를 지으면 주민 주문이 들어오고, 배달하면 진주를 벌어요 · 🏛 산호궁 Lv.3에 열려요</div>';el.innerHTML=h;el.hidden=false;$('pX').onclick=closePanel;panelFor=null;return}
  if(!goodsPool().length)h+='<div class="box">다시마 농장이나 산호 광산이 있어야 주문이 들어와요</div>';
  h+='<p class="role">주민이 주문한 물건을 창고에서 꺼내 배달하면 🫧 진주와 ⭐ 명성을 받아요</p>';h+='<div class="ords">'+G.ord.map(function(o,i){if(!o.it)return '<div class="ord wait">🐢<br><small>'+(NOW()<o.at?'오는 중 '+dur((o.at-NOW())/1000):'물건을 기다려요')+'</small></div>';
    var can=ordCan(o);return '<div class="ord'+(can?' can':'')+'"><small class="who">'+(o.who||'🐟 주민')+'</small><div class="its">'+Object.keys(o.it).map(function(k){var ok=(G.res[k]||0)>=o.it[k];return '<span class="'+(ok?'ok':'no')+'">'+ICON[k]+' '+o.it[k]+'</span>'}).join('')+'</div>'+
      '<div class="rw">🫧'+o.rw.pearl+(o.rw.brick?' 🧱'+o.rw.brick:'')+(o.rw.gem?' 💎'+o.rw.gem:'')+' <small>⭐'+o.rw.xp+'</small></div><button data-s="'+i+'"'+(can?'':' disabled')+'>배달</button><button class="del" data-d="'+i+'" aria-label="주문 취소">🗑</button></div>'}).join('')+'</div>';
  h+='<p class="role">배달하면 1분 뒤 새 주문 · 취소하면 5분 뒤 · 주문 칸은 배달소 레벨에 따라 3~9칸</p>';
  el.innerHTML=h;el.hidden=false;$('pX').onclick=closePanel;el.querySelectorAll('[data-s]').forEach(function(b){b.onclick=function(){ordSend(G.ord[+b.dataset.s])}});el.querySelectorAll('[data-d]').forEach(function(b){b.onclick=function(){ordDrop(G.ord[+b.dataset.d])}});panelFor='ord'}

/* --- ⭐ 명성: 거의 모든 일에서 조금씩 → 레벨마다 💎 · 🫧 선물 --- */
function xpNeed(l){return Math.round(40*Math.pow(l,1.5))}
function addXP(n){G.xp=(G.xp||0)+n;G.xl=G.xl||1;while(G.xp>=xpNeed(G.xl)){G.xp-=xpNeed(G.xl);G.xl++;var p=30*G.xl;WAL.add('pearl',p);WAL.add('gem',2);snd('lvl');toast('⭐ 명성 Lv.'+G.xl+'! 🫧'+p+' · 💎2');sparkle(VW/2,VH*.3,24)}}

/* --- 📦 창고 · ☰ 메뉴 --- */
function storePanel(){var el=$('panel'),h='<button class="x" id="pX">✕</button><h2>📦 창고 <small>조개 창고 Lv.'+lvOf('store')+'</small></h2><div class="box">';
  ['stone','brick','nail','kelp','dango','cloth'].forEach(function(k){var c=cap(k),v=G.res[k]||0;h+='<div class="srow">'+ICON[k]+' '+RNAME[k]+'<span class="meter"><i style="width:'+Math.min(100,v/c*100)+'%;background:'+(v>=c*.95?'#E5484D':'#4fc36b')+'"></i></span><b>'+fmt(v)+'</b><small>/'+fmt(c)+'</small></div>'});
  h+='</div><p class="role">가득 차면 건물 말풍선에 쌓인 채로 기다려요 · 조개 창고를 올리면 넓어져요</p>';el.innerHTML=h;el.hidden=false;$('pX').onclick=closePanel;panelFor=null}
function menuPanel(){var el=$('panel'),h='<button class="x" id="pX">✕</button><h2>☰ 메뉴</h2><div class="mgrid">'+
  '<button data-m="life">🐟<b>마을 현황</b><small>인구 · 일자리 · 수요</small></button><button data-m="todo">🎯<b>할 일</b><small>다음 산호궁까지</small></button><button data-m="help">📖<b>도움말</b><small>마을이 도는 법</small></button><button data-m="snd">'+(SND?'🔊':'🔇')+'<b>소리</b><small>'+(SND?'켜져 있어요':'꺼져 있어요')+'</small></button><button data-m="pro">📜<b>이야기</b><small>처음 이야기 다시 보기</small></button>'+(EMB?'':'<button data-m="reset">↺<b>처음부터</b><small>시험판 전용</small></button>')+'</div>';
  el.innerHTML=h;el.hidden=false;$('pX').onclick=closePanel;panelFor=null;el.querySelectorAll('[data-m]').forEach(function(b){b.onclick=function(){var m=b.dataset.m;if(m==='life')lifePanel();else if(m==='todo')todoPanel();else if(m==='help')helpPanel();else if(m==='snd'){sndToggle();menuPanel()}else if(m==='pro'){closePanel();prologue(0)}else if(confirm('마을을 처음부터 다시 시작할까요? (진주 · 보석은 그대로)')){localStorage.removeItem(KEY);location.reload()}}})}
function todoPanel(){var el=$('panel'),L=hallLv(),h='<button class="x" id="pX">✕</button><h2>🎯 할 일</h2>';
  if(L<D.HMAX){var nl=needList('hall',L+1),c=D.cost('hall',L+1);h+='<div class="box"><b>🏛 산호궁 Lv.'+(L+1)+'</b><ul class="req">'+nl.map(function(n){return '<li class="'+(n.ok?'ok':'no')+'" data-k="'+n.k+'">'+(n.ok?'✓':'○')+' '+reqTxt(n)+'</li>'}).join('')+'</ul><div class="cost">'+costHtml(c)+'</div></div>'}
  var tips=[];if(!CS.food)tips.push('🍡 경단이 떨어졌어요 · 경단 공장 말풍선을 받아요');if(CS.pop>=CS.lim)tips.push('🐟 인구 한도가 찼어요 · 식당 · 학교 · 병원을 올려요');if(CS.w<.7)tips.push('👷 일꾼이 모자라요 · 주거 구역을 더 지정해요');if(CS.dem.C>.3)tips.push('🛍 상업 구역이 모자라요');if(ordReady())tips.push('🐢 배달할 수 있는 주문이 '+ordReady()+'개 있어요');
  G.b.forEach(function(b){if(bufReady(b)&&tips.length<8&&!isZ(b.k))tips.push(ICON[bufReady(b)]+' '+B[b.k].n+' 말풍선을 받아요')});
  h+='<div class="box">'+(tips.length?tips.map(function(t){return '<div>'+t+'</div>'}).join(''):'지금은 잘 돌아가고 있어요 ✨')+'</div>';
  el.innerHTML=h;el.hidden=false;$('pX').onclick=closePanel;panelFor=null;el.querySelectorAll('.req li').forEach(function(li){li.onclick=function(){if(li.dataset.k==='pop'){lifePanel();return}var t=bOf(li.dataset.k);if(t){focus(t);SEL=t;openPanel(t)}else openBuild(CATOF[li.dataset.k])}})}
function helpPanel(){var el=$('panel');el.innerHTML='<button class="x" id="pX">✕</button><h2>📖 마을이 도는 법</h2><div class="box help">'+
  '<p><b>🏛 산호궁</b>이 모든 걸 열어요. 올리려면 정해진 건물 레벨 · 인구 · 진주가 필요해요. 다른 건물은 산호궁보다 높게 못 올려요.</p>'+
  '<p><b>🫧 진주 · 💎 보석</b>은 아가미 파이터와 같은 지갑이에요. 진주로 짓고, 보석으로 공사를 바로 끝내요(5분 이하는 무료).</p>'+
  '<p><b>🏘 구역</b>을 지정하면 물고기들이 주택 · 상점 · 공장을 지어요. 도로와 산소 펌프의 산소가 닿아야 해요.</p>'+
  '<p><b>🐟 물고기</b>가 일하면 생산이 빨라지고, 상점에서 🍡 경단 · 👕 옷을 사면 행복해져 주택이 자라요.</p>'+
  '<p><b>🧾 세금</b>은 상점에서 장을 본 인구 × 행복만큼 🏛 산호궁에 쌓여요(8시간치까지). 산호궁 위 🫧 말풍선을 눌러 걷어요.</p>'+
  '<p><b>🐢 주문</b>대로 물건을 배달하면 진주 · 명성을 받아요. 세금과 함께 마을의 두 가지 수입이에요. 명성 레벨마다 💎 선물이 있어요.</p>'+
  '<p><b>📜 의뢰</b>는 산호궁 Lv.5부터 매주 월요일에 3개씩 와요. 하나에 🫧 진주, 셋 다 하면 💎 보석도 받아요.</p>'+
  '<p><b>🏷 땅값</b>은 장식 · 학교 · 식당 · 명소가 가까우면 오르고 광산 · 가마 · 공장이 가까우면 내려가요. 건물을 놓기 전에 초록 · 빨강 칸과 집 위 숫자로 미리 볼 수 있어요. 땅값이 높아야 집이 높이 자라요.</p>'+(EMB?
  '<p><b>📦 재료 상자</b>는 아가미 파이터에서 20초 넘게 한 판 할 때마다 1개씩(하루 6개) 와요. <b>🐠 내 물고기</b>는 가끔 마을에 놀러 오고, 쓰다듬으면 수족관 친밀도가 올라요.</p><p><b>🐠 수족관 공방</b>(📦 창고 아래)에서는 남는 재료로 내 수족관 전용 소품을 만들어요. <b>🐢 거북 배달소</b>를 지으면 <b>🐢 마을 택배</b> 거북이 수족관에 가끔 들러 주민들이 보낸 진주를 전해 줘요(하루 3번).</p>':'')+'<p><b>🏆 마을 기록</b>(☰ 메뉴)은 오래 두고 모으는 도장이에요. 단계를 넘을 때마다 💎 · ⭐ 명성을 받고, 맨 위 ✏로 마을 이름을 지어요.</p><p><b>🌫 탁한 물</b>: 광산 · 가마 · 공장 · 공방 · 항구 · 산업 구역 둘레의 물이 흐려져요. 집 근처가 탁하면 입주가 줄고 행복이 내려가며, 집 3단계는 40 · 4단계는 25 · 5단계는 15 이하여야 자라요. ⚙ 기반의 <b>🫧 물 거르개</b>를 여러 개 지어 맑게 하고, 🗺 지도에서 확인해요.</p><p><b>💨 숨샘 · 큰 숨탑</b>(⚙ 기반)은 여러 개 지을 수 있어요. 산소 펌프만으로 모자란 곳에 놓아 구역이 자라는 범위를 넓혀요.</p><p><b>🐟 주민</b>을 누르면 이름 · 집 · 일터 · 기분과 한마디를 들을 수 있어요. 마을에 무엇이 모자란지 주민 말로 알 수 있어요.</p><p><b>🚦 교통</b>: 집 · 가게 · 공방 · 일터가 몰린 길은 막혀요. 막힌 길 옆은 생산 · 입주 · 행복이 줄고, 구역 4단계부터는 길이 안 막혀야 자라요. 🛣 도로 탭 <b>⬆ 길 넓히기</b>로 자갈길(Lv.5) · 산호 대로(Lv.12)를 깔거나, ⚙ 기반의 <b>🚌 해류 버스 정류장</b>을 놓아요. 🗺 지도 → 교통으로 확인해요.</p><p><b>🚋 열차 · 탈것</b>: 길 위로 🚌 버스 · 🐢 택배 거북 · 🦀 게 수레가 다니고, 막힌 길에선 💢 하며 느려져요. 산호궁 Lv.9에 해류 열차역을 지으면 🛣 도로 탭 <b>🚋 선로 놓기</b>로 선로를 깔 수 있어요. ⚙ 기반의 <b>🚉 해류 열차 정거장</b>을 선로 옆에 놓고 다른 정거장(또는 열차역)과 이으면 트램이 오가고 둘레 5칸 길이 덜 막혀요.</p><p><b>🛣 길 자동 연결</b>: 구역을 칠하고 손을 떼면 길에 안 닿은 칸까지 길을 깔아 줘요(한 칸 10🫧). 🏘 구역 탭에서 끌 수 있어요.</p><p><b>💰 세율</b>(☰ 메뉴): 산호궁 Lv.4부터 주거 · 상업 · 산업 세율을 0~20%로 정해요. 올리면 진주가 더 들어오지만 그 구역 수요가 줄고, 주거 · 상업 세금이 높으면 행복도 내려가요. 내리면 이사 오고 가게 · 공방이 잘 생겨요.</p><p><b>⚖ 마을 정책</b>(☰ 메뉴)은 산호궁 Lv.6부터 켜요. 정책마다 좋은 점과 대가가 같이 있어요. Lv.10 · Lv.15에 한 칸씩 늘어요.</p><p><b>⚠ 마을 사건</b>: 산호궁 Lv.6부터 가끔 상어 · 뜨거운 물 · 감기 · 적조가 생겨요. 🚒 소방서 · 👮 순찰대 · 🏥 병원 범위 안이면 저절로 막고, 못 막으면 건물을 눌러 해결하거나 2시간 기다려요.</p></div>';el.hidden=false;$('pX').onclick=closePanel;panelFor=null}
$('bBuild').onclick=function(){if(TAB)closeBuild();else openBuild()};$('bOrd').onclick=function(){closeBuild();orderPanel()};$('bStore').onclick=function(){closeBuild();storePanel()};$('bMenu').onclick=function(){closeBuild();menuPanel()};

function placeBar(){var el=$('place');if(isD(GH.k))return placeDecoBar(el);var c=D.cost(GH.k,1),why=siteWhy(GH.k,GH.x,GH.y);el.hidden=false;
  el.innerHTML='<div class="pt"><b>'+(DESC[GH.k]?DESC[GH.k].ic+' ':'')+B[GH.k].n+'</b> <span class="ds">'+(DESC[GH.k]?DESC[GH.k].s:'')+'</span><br>🫧'+fmt(c.pearl)+' 🪨'+fmt(c.stone)+' · ⏱'+dur(D.time(GH.k,1))+'<br><small>'+(why||'여기에 지을 수 있어요 · 건물을 끌거나 다른 칸을 눌러 옮겨요')+'</small></div>';ghBtns(why,'짓기');
  $('pNo').onclick=function(){var k=GH.k;GH=null;el.hidden=true;$('ghb').hidden=true;openBuild(CATOF[k])};
  $('pOk').onclick=function(){var k=GH.k,w=canStart(k,1);if(siteWhy(k,GH.x,GH.y))return;if(w.length){toast(w[0]);return}pushUndo(B[k].n+' 짓기');setTimeout(endAct,0);var b={id:G.nid++,k:k,x:GH.x,y:GH.y,lv:0,buf:{}};G.b.push(b);occ();startJob(b,1);GH=null;el.hidden=true;$('ghb').hidden=true;FLOATU={id:b.id,until:NOW()+8000};setTab(null);toast('🦀 게 일꾼이 '+B[k].n+'을(를) 짓기 시작했어요')}}
function placeDecoBar(el){var d=DEC[GH.k],why=siteWhy(GH.k,GH.x,GH.y);if(why==='도로에 붙여 지어야 해요')why='';el.hidden=false;GH.why=why;
  el.innerHTML='<div class="pt"><b>'+d.n+'</b> · 🫧'+fmt(d.c)+'<br><small>'+(why||'칸을 눌러 옮겨요 · 놓은 뒤에도 계속 놓을 수 있어요')+'</small></div>';ghBtns(why,'놓기');
  $('pNo').onclick=function(){GH=null;el.hidden=true;$('ghb').hidden=true;openBuild('deco')};$('pOk').onclick=function(){if(GH.why)return;if(placeDeco(GH.k,GH.x,GH.y)){GH.x+=1;placeBar()}}}
function ghBtns(why,lab){var g=$('ghb');g.hidden=false;g.innerHTML='<button id="pNo" class="gx" aria-label="취소">↶</button><button id="pOk" class="gok" aria-label="'+lab+'"'+(why?' disabled':'')+'>✓</button>'}
var FLOATU=null;
function floatUI(){var g=$('ghb');if(GH&&!g.hidden){var s=sz(GH.k),c=sc(GH.x+(s-1)/2,GH.y+(s-1)/2);g.style.left=Math.max(6,Math.min(VW-120,c.x-56))+'px';g.style.top=Math.max(150,Math.min(VH-260,c.y+(TH*s/2+10)*cam.z))+'px'}else if(!GH)g.hidden=true;
  var u=$('bUndo2');if(FLOATU&&NOW()<FLOATU.until&&undoOk()){var b=G.b.find(function(x){return x.id===FLOATU.id});if(b){var c2=centerOf(b);u.hidden=false;u.style.left=Math.max(6,Math.min(VW-56,c2.x+40*sz(b.k)*cam.z))+'px';u.style.top=Math.max(150,Math.min(VH-200,c2.y-30*cam.z))+'px';return}}u.hidden=true;FLOATU=null}
function costHtml(c){return Object.keys(c).map(function(k){var ok=have(k)>=c[k];return '<span class="'+(ok?'ok':'no')+'">'+ICON[k]+' '+fmt(c[k])+'</span>'}).join(' ')}
function openPanel(b){if(isZ(b.k))return zonePanel(b);if(isD(b.k))return decoPanel(b);var el=$('panel'),k=b.k,L=b.lv,h='<button class="x" id="pX">✕</button><h2>'+(DESC[k]?DESC[k].ic+' ':'')+B[k].n+' <small>Lv.'+L+'</small></h2>';
  h+=descBox(k,L);
  var r=rates(b),rk=Object.keys(r);if(rk.length)h+='<p class="prod">'+(k==='hall'?'🧾 세금 ':'')+rk.map(function(q){return ICON[q]+' 시간당 '+(r[q]<10?r[q].toFixed(1):fmt(r[q]))}).join(' · ')+' <small>(8시간치까지 쌓여요)</small></p>';
  if(k==='aqua'&&L&&EMB&&window.parent.GF_GO)h+='<div class="row"><button class="sub" id="pAqua">🐠 내 수족관 보러 가기</button></div>'; /* 본게임 수족관 탭으로 */
  if(k==='port'&&L&&!(b.job&&b.job.L===1))h+='<div class="row"><button class="sub" id="pPort">🐋 고래 배 보기'+(G.pt&&G.pt.st==='back'?' · 돌아왔어요!':'')+'</button></div>';if(k==='train'&&L&&!(b.job&&b.job.L===1))h+='<div class="row"><button class="sub" id="pTrain">🚋 열차 보기'+(G.tr&&G.tr.st==='back'?' · 돌아왔어요!':'')+'</button></div>';if(k==='crab')h+='<p class="prod">🦀 게 일꾼 '+crabsMax()+'마리</p>';if(k==='store')h+='<p class="prod">🪨 '+fmt(cap('stone'))+'까지 · 🧱 '+fmt(cap('brick'))+' · 📌 '+fmt(cap('nail'))+'</p>';
  if(b.job){var left=(b.job.end-NOW())/1000,g=D.rushGems(left);h+='<div class="box">Lv.'+b.job.L+'로 올리는 중 · 남은 시간 <b>'+dur(left)+'</b></div><div class="row"><button class="main" id="pRush">'+(g?'💎 '+g+' 바로 완성':'무료로 바로 완성')+'</button></div>'}
  else if(L>=D.HMAX)h+='<div class="box">최고 단계예요 ✨</div>';
  else{var N2=L+1,c=D.cost(k,N2),nl=needList(k,N2),why=canStart(k,N2);
    h+='<div class="box"><b>Lv.'+N2+'로 업그레이드</b><div class="cost">'+costHtml(c)+' <span class="nb">· ⏱ '+dur(D.time(k,N2))+'</span></div>'+
      '<ul class="req">'+nl.map(function(n){return '<li class="'+(n.ok?'ok':'no')+'" data-k="'+n.k+'">'+(n.ok?'✓':'○')+' '+reqTxt(n)+' <small>(지금 '+(n.k==='pop'?CS.pop:lvOf(n.k))+')</small></li>'}).join('')+'</ul></div>'+
      '<div class="row"><button class="main" id="pUp"'+(why.length?' disabled':'')+'>⬆ 업그레이드</button></div>'+(function(){var rest=why.filter(function(s){return !/ 필요$/.test(s)}),un=nl.some(function(n){return !n.ok});if(un)rest.unshift('○ 표시한 조건을 먼저 채워요');return rest.length?'<p class="why">'+rest.join(' · ')+'</p>':''})()}
  el.innerHTML=h;el.hidden=false;$('pX').onclick=function(){SEL=null;closePanel()};
  if($('pUp'))$('pUp').onclick=function(){var w=canStart(k,L+1);if(w.length){toast(w[0]);return}pushUndo(B[k].n+' 업그레이드');setTimeout(endAct,0);startJob(b,L+1);openPanel(b);toast('🦀 Lv.'+(L+1)+' 공사 시작')};
  if($('pRush'))$('pRush').onclick=function(){rush(b)};if($('pTrain'))$('pTrain').onclick=function(){trainPanel(b)};if($('pPort'))$('pPort').onclick=function(){portPanel(b)};if($('pAqua'))$('pAqua').onclick=function(){save();try{window.parent.GF_GO('tank')}catch(e){}};
  el.querySelectorAll('.req li').forEach(function(li){li.onclick=function(){if(li.dataset.k==='pop'){lifePanel();return}var t=bOf(li.dataset.k);if(t){focus(t);SEL=t;openPanel(t)}else{openBuild(CATOF[li.dataset.k])}}});
  panelFor=b}
var panelFor=null;function closePanel(){$('panel').hidden=true;panelFor=null}
$('home').onclick=function(){focus(bOf('hall'))};

/*DESC*/
/*CITYZ*/
/*EXTRA*/
/*EXTRA2*/
/*EXTRA3*/
/*EXTRA4*/
/*VISIT*/
/*PLACE*/
/*QUEST*/
/*AQLINK*/
/*UX*/
$('hF').onclick=function(){lifePanel()};
/* --- 돌리기 --- */
var PRESS=false;document.addEventListener('pointerdown',function(){PRESS=true},true);document.addEventListener('pointerup',function(){setTimeout(function(){PRESS=false},300)},true);
var lastUI=0,lastPanel=0,lastSave=NOW();
var AWAY=(NOW()-(G.t||NOW()))/1000;step(NOW(),true);setTimeout(function(){if(AWAY>=300)settle(AWAY,QUIET);else if(QUIET)toast('자는 동안 공사 '+QUIET+'개가 끝났어요')},700);if(!G.cam)focus(bOf('hall'));
var lastT=0;function frame(t){var now=NOW(),fdt=lastT?Math.min(.05,(t-lastT)/1000):0;camGo(fdt);camInertia();walkMove(fdt);lastT=t;step(now,false);cityTick(now);ordTick(now);trainTick(now);portTick(now);ctx.setTransform(DPR,0,0,DPR,0,0);drawBg(t);drawTiles(t);if(G.gate)drawShore(t);drawWorld(t,now);drawLand();drawFX();drawSnow(t);drawHint(t);floatUI();
  if(Math.random()<.03)FX.push({k:'b',x:Math.random()*VW,y:VH,vx:0,vy:-.6-Math.random(),r:2+Math.random()*3,l:1,dl:.004});
  if(t-lastUI>250){hud();lastUI=t}if(panelFor&&!PRESS&&t-lastPanel>1000&&$('panel').contains(document.activeElement)===false){lastPanel=t;if(panelFor==='ord')orderPanel();else if(panelFor==='evt')evtPanel();else if(panelFor.tr)trainPanel(panelFor.tr);else if(panelFor.pt)portPanel(panelFor.pt);else openPanel(panelFor)}
  if(now-lastSave>5000){G.cam=cam;save();lastSave=now}requestAnimationFrame(frame)}
addEventListener('pagehide',function(){G.cam=cam;save()});document.addEventListener('visibilitychange',function(){if(document.hidden){G.cam=cam;save()}});
requestAnimationFrame(frame);
window.__signs=function(){return SIGNS};window.__dbg=function(){var h=G.b.find(function(b){return isZ(b.k)&&b.lv});var q=bOf('quarry');return {n:WALK.length,rn:[roadNear(h),roadNear(q)],p:(path(roadNear(h),roadNear(q))||[]).length,homes:G.b.filter(function(b){return isZ(b.k)&&(b.occ|0)>0}).length}};window.__walk=function(keep){if(!keep||!window.__wf||WALK.indexOf(window.__wf)<0)window.__wf=WALK.filter(function(f){return !f.st&&f.p.length>5})[0];var f=window.__wf;if(!f)return null;var q=walkerPos(f);return [+q.i.toFixed(4),+q.j.toFixed(4),f.wait>0?1:0]};window.__city={walkMove:function(d){walkMove(d)},arrive:function(){var hs=G.b.filter(function(b){return isZ(b.k)&&b.lv});if(hs.length)arrive(hs[0])},why:function(){return G.b.filter(function(b){return isZ(b.k)&&b.lv===2}).slice(0,8).map(function(b){return b.k+' '+landVal(b.x,b.y)+' '+zUpWhy(b).join('|')})},deco:function(k,x,y){return placeDeco(k,x,y)},settle:function(a,d){settle(a,d)},warp:function(sec){for(var t=0;t<sec;t+=2){TOFF+=2000;var n=NOW();step(n,true);cityTick(n);walkMove(2)}},CS:function(){return CS},G:function(){return G},give:function(p,g){WAL.add('pearl',p||0);WAL.add('gem',g||0)},res:function(o){for(var k in o)G.res[k]=(G.res[k]||0)+o[k]},
  skip:function(sec){G.b.forEach(function(b){if(b.job){b.job.start-=sec*1000;b.job.end-=sec*1000}});G.tick-=sec*1000},
  build:function(k,x,y){var b={id:G.nid++,k:k,x:x,y:y,lv:0,buf:{}};G.b.push(b);occ();startJob(b,1);return b},up:function(k){var b=bOf(k);startJob(b,b.lv+1)},
  road:function(x1,y1,x2,y2){for(var x=x1;x<=x2;x++)for(var y=y1;y<=y2;y++){G.road[x+','+y]=1;delete G.ter[x+','+y]}},cam:cam,tab:setTab,sel:function(k){var b=bOf(k);SEL=b;openPanel(b)},focus:function(k){focus(bOf(k))},
  ghost:function(k,x,y){GH={k:k,x:x,y:y};placeBar()}};
})();
