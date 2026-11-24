/* ===== 도시: 구역 · 주민 · 살림 (집 → 물고기 → 일 · 장 → 생산 효율 · 행복 → 집이 자람) ===== */
var ZN={R:{n:'집',c:'67,196,107',cap:[0,4,10,24,48,90],at:1,ic:'🏠'},C:{n:'가게',c:'61,155,255',jobs:[0,3,8,18,32,55],serve:[0,12,30,70,130,220],at:2,ic:'🛍'},I:{n:'공방',c:'255,176,46',jobs:[0,5,12,24,40,64],at:4,ic:'🔧'}};
var ZBT=[0,20,60,150,300,600],ZST=[0,0,40,150,300,600],ZBR=[0,0,0,0,40,100],ZLV=[0,45,58,66,74],ZHL=[0,6,12,16,20];
function isZ(k){return !!k&&k.charAt(0)==='z'}
function zMax(){var L=hallLv();return L>=20?5:L>=16?4:L>=12?3:L>=6?2:1}
G.zone=G.zone||{};
function POPREQ(L){return L<3?0:Math.round(1.4*L*L)}
var PUB={diner:10,school:14,clinic:18,aqua:10,palace:30};
var JOBS={quarry:3,farm:3,factory:4,sew:4,kiln:4,pearl:3,turtle:2,train:4,port:5,diner:2,school:3,clinic:4};
var CS={pop:0,lim:20,workers:0,jobs:0,w:1,dem:{R:.6,C:0,I:0},capC:0,served:0,happy:60,food:true,cloth:true,eat:0,wear:0};
var O2={},LVM={};
function NM(k){return k==='pop'?'🐟 물고기':B[k]?B[k].n:ZN[k.charAt(1)]?ZN[k.charAt(1)].n:k}
function reqTxt(n){return n.k==='pop'?'🐟 인구 '+n.lv:NM(n.k)+' Lv.'+n.lv}
function fields(){covCalc();O2={};LVM={};G.b.forEach(function(b){if(!b.lv)return;var s=sz(b.k),cx=b.x+(s-1)/2,cy=b.y+(s-1)/2,r=0,v=0;
    if(b.k==='pump'){r=3+Math.floor(b.lv/3);for(var i=-r;i<=r;i++)for(var j=-r;j<=r;j++)if(Math.abs(i)+Math.abs(j)<=r*1.3)O2[Math.round(cx+i)+','+Math.round(cy+j)]=1}
    if(b.k==='hall'){for(i=-4;i<=4;i++)for(j=-4;j<=4;j++)if(Math.abs(i)+Math.abs(j)<=5)O2[Math.round(cx+i)+','+Math.round(cy+j)]=1}
    var ef=effOf(b.k,b.lv);r=ef[0];v=ef[1];
    if(r&&v)for(i=-r;i<=r;i++)for(j=-r;j<=r;j++){var d=Math.abs(i)+Math.abs(j);if(d>r)continue;var key=Math.round(cx+i)+','+Math.round(cy+j);LVM[key]=(LVM[key]||0)+v*(1-d/(r+1))}})}
/* 땅값에 주는 영향 [범위, 세기] — 장식 · 공공 · 명소는 +, 광산 · 가마 · 공장은 − (배치 미리보기 · 땅값 내역도 이것을 씀) */
function effOf(k,L){var r=0,v=0;if(k==='hall'){r=6;v=10}if(DEC[k]){r=DEC[k].r;v=DEC[k].v}if(PUB[k]){r=5;v=8+L}if(k==='park'){r=4;v=10}if(k==='aqua'||k==='palace'){r=7;v=14+L}if(k==='quarry'||k==='kiln'||k==='factory'){r=3;v=-14}return [r,v]}
function landVal(x,y){var v=40+(LVM[x+','+y]||0),near=0;for(var i=-2;i<=2;i++)for(var j=-2;j<=2;j++)if(G.ter[(x+i)+','+(y+j)]===2)near++;v+=Math.min(8,near*2)+Math.max(0,((CS&&CS.happy)||60)-60)/5-Math.max(0,murkAt(x,y)-20)*.3+polV('lv');return Math.max(0,Math.min(100,Math.round(v)))}
function roadAdj(x,y,s){s=s||1;for(var i=-1;i<=s;i++)for(var j=-1;j<=s;j++){if((i<0||i>=s)&&(j<0||j>=s))continue;if(i>=0&&i<s&&j>=0&&j<s)continue;if(isRoad(x+i,y+j))return true}return false}
var cityT=0,cityF=0,cityG=0,cityU=0;
function cityTick(now){if(now-cityT<1000)return;var dt=Math.min(5,(now-(cityT||now))/1000);cityT=now;if(now-cityF>2000){fields();cityF=now}
  var pop=0,lim=30+hallLv()*6,jobs=0,capC=0,jC=0,jI=0,hs=0;
  G.b.forEach(function(b){if(!b.lv)return;if(PUB[b.k])lim+=PUB[b.k]*b.lv;if(JOBS[b.k])jobs+=JOBS[b.k]+b.lv;
    if(isZ(b.k)){var z=b.k.charAt(1),L=b.lv;if(z==='R'){pop+=b.occ|0}else if(z==='C'){jC+=ZN.C.jobs[L];capC+=ZN.C.serve[L]*(b.inc?.5:1)}else jI+=ZN.I.jobs[L]}});
  jobs+=jC+jI;var workers=Math.round(pop*.7),w=jobs?Math.min(1,workers/jobs):1,served=Math.min(pop,capC);
  /* 먹고 입기: 상점에서 산 만큼 창고의 경단 · 옷이 줄어요 */
  var clothOn=hallLv()>=5,eat=served*.06*polV('eat')*dt/3600,wear=clothOn?served*.03*dt/3600:0;
  G.res.dango=Math.max(0,(G.res.dango||0)-eat);G.res.cloth=Math.max(0,(G.res.cloth||0)-wear);
  var food=hallLv()<3||pop===0||(G.res.dango||0)>0,cloth=!clothOn||pop===0||(G.res.cloth||0)>0,avgLV=0,nR=0;
  var mkS=0,mkN=0,jmS=0;G.b.forEach(function(b){if(isZ(b.k)&&b.k.charAt(1)==='R'&&b.lv){avgLV+=landVal(b.x,b.y);nR++;var oc=Math.max(1,b.occ|0);mkS+=murkAt(b.x,b.y)*oc;mkN+=oc;jmS+=bJam(b)*oc}});avgLV=nR?avgLV/nR:50;var murkH=mkN?Math.min(15,Math.round(mkS/mkN*.25)):0,jamH=mkN?Math.max(0,Math.min(10,Math.round((jmS/mkN-.8)*15))):0;
  var happy=Math.round(Math.max(0,Math.min(100,35+(pop?25*served/pop:20)+(food?15:-20)+(cloth?10:-15)+avgLV*.2+cheerV()-murkH-jamH+polV('happy'))));
  var dR=Math.max(-1,Math.min(1,((jobs+12)-workers)/25));if(pop>=lim)dR=Math.min(dR,-.3);if(!food)dR-=.4;
  var dC=hallLv()>=ZN.C.at?Math.max(-1,Math.min(1,(pop*.22-jC)/10+(pop>capC?.3:0))):0,dI=hallLv()>=ZN.I.at?Math.max(-1,Math.min(1,(pop*.3-jI)/12)):0;
  G.taxH=Math.round(served*TAXR*happy*polV('tax'))/100;CS={jamH:jamH,murkH:murkH,tax:G.taxH,pop:pop,lim:lim,workers:workers,jobs:jobs,w:w,dem:{R:dR,C:dC,I:dI},capC:capC,served:served,happy:happy,food:food,cloth:cloth,clothOn:clothOn,eat:served*.06*polV('eat'),wear:clothOn?served*.03:0};
  /* 새 건물이 올라감 */
  if(now-cityG>2500){cityG=now;var busy=G.b.filter(function(b){return isZ(b.k)&&b.job}).length;
    ['R','C','I'].forEach(function(z){if(CS.dem[z]<=.1||busy>=2+pop/40||Math.random()>.6)return;var L=[];for(var key in G.zone){if(G.zone[key]!==z||OCC[key])continue;var q=key.split(','),x=+q[0],y=+q[1];if(O2[key]&&roadAdj(x,y))L.push([x,y])}
      if(!L.length)return;L.sort(function(a,b){return landVal(b[0],b[1])-landVal(a[0],a[1])});var t=L[Math.floor(Math.random()*Math.min(4,L.length))],nb={id:G.nid++,k:'z'+z+Math.floor(Math.random()*3),x:t[0],y:t[1],lv:0,occ:0,buf:{}};
      G.b.push(nb);occ();nb.job={L:1,start:now,end:now+ZBT[1]*1000*(.8+Math.random()*.4)};busy++})}
  /* 이사 오고 나감 */
  G.b.forEach(function(b){if(!isZ(b.k)||b.k.charAt(1)!=='R'||!b.lv||b.job&&b.job.L===1)return;var ok=O2[b.x+','+b.y]&&roadAdj(b.x,b.y),cap=ZN.R.cap[b.lv],tgt=ok?Math.round(cap*Math.min(1,.45+happy/180)*Math.max(.4,1-murkAt(b.x,b.y)/180)*(b.inc?.5:1)*trafM(b)):0;
    if((b.occ|0)<tgt&&CS.pop<CS.lim&&Math.random()<.35*dt){b.occ=(b.occ|0)+1;CS.pop++;arrive(b)}else if((b.occ|0)>tgt&&Math.random()<.15*dt)b.occ--});
  /* 단계 올리기: 산호궁 · 땅값 · 행복 · 산호석 */
  if(now-cityU>4000){cityU=now;var c=G.b.filter(function(b){return isZ(b.k)&&b.lv&&!b.job&&zUpWhy(b).length===0});if(c.length){var b=c[Math.floor(Math.random()*c.length)],to=b.lv+1;G.res.stone-=ZST[to];G.res.brick-=ZBR[to];b.job={L:to,start:now,end:now+ZBT[to]*1000}}}
  walkersTick(dt)}
function zUpWhy(b){var z=b.k.charAt(1),L=b.lv,why=[];if(L>=5)return ['최고 단계'];if(L>=zMax())why.push('🏛 산호궁 Lv.'+ZHL[L]+' 필요');
  var lv=landVal(b.x,b.y),need=ZLV[L];if(lv<need)why.push('땅값 '+need+' 이상(지금 '+lv+')');if(CS.happy<55)why.push('행복 55 이상(지금 '+CS.happy+')');
  if(z==='R'&&(b.occ|0)<ZN.R.cap[L]*.8)why.push('주민이 더 입주해야 해요');if(CS.dem[z]<-.2)why.push(ZN[z].n+' 수요가 없어요');if((G.res.stone||0)<ZST[L+1])why.push('🪨 '+ZST[L+1]+' 필요');if(ZBR[L+1]&&(G.res.brick||0)<ZBR[L+1])why.push('🧱 '+ZBR[L+1]+' 필요');if(z!=='I'){var mk=murkAt(b.x,b.y),mx=L+1>=5?15:L+1>=4?25:L+1>=3?40:999;if(mk>mx)why.push('🌫 탁한 물 '+mx+' 이하(지금 '+mk+')');var jm=bJam(b);if(L+1>=4&&jm>1)why.push('🚦 길이 막혀요(막힘 '+jm.toFixed(1)+') · 길 넓히기 · 🚌 버스 정류장')}return why.concat(svcWhy(b,L+1))}

/* --- 주민: 물고기 머리 · 옷 입은 몸으로 길을 걸어요 --- */
var WALK=[],FISHC=['#ff9f43','#ff6b8b','#4fb3ff','#ffd54a','#7ed957','#b48cff','#ff7d4d'],OUTF=['#4f8fdc','#3fae6a','#ff7d8f','#ffb347','#8a6cff','#2fb5a7'];
function roadNear(b){var s=sz(b.k),L=[];for(var i=-1;i<=s;i++)for(var j=-1;j<=s;j++){if((i<0||i>=s)&&(j<0||j>=s))continue;if(i>=0&&i<s&&j>=0&&j<s)continue;if(isRoad(b.x+i,b.y+j))L.push([b.x+i,b.y+j])}return L[0]||null}
function path(a,b){if(!a||!b)return null;var q=[a],prev={},k0=a+'';prev[k0]=null;var goal=b+'',n=0;while(q.length&&n++<900){var c=q.shift(),ck=c+'';if(ck===goal){var out=[];while(ck){var p=ck.split(',');out.unshift([+p[0],+p[1]]);ck=prev[ck]}return out}
  [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){var x=c[0]+d[0],y=c[1]+d[1],k=x+','+y;if(isRoad(x,y)&&!(k in prev)){prev[k]=ck;q.push([x,y])}})}return null}
function newWalker(from,to){var p=path(roadNear(from),roadNear(to));if(!p||p.length<2)return;WALK.push({p:p,i:0,t:0,sp:1+Math.random()*.6,c:FISHC[Math.floor(Math.random()*FISHC.length)],o:OUTF[Math.floor(Math.random()*OUTF.length)],side:(Math.random()-.5)*.36,ph:Math.random()*6})}

/*GATE*/
function walkersTick(dt){var homes=G.b.filter(function(b){return isZ(b.k)&&b.k.charAt(1)==='R'&&(b.occ|0)>0}),works=G.b.filter(function(b){return b.lv&&!isZ(b.k)&&!isD(b.k)&&b.k!=='hall'||isZ(b.k)&&b.k.charAt(1)!=='R'&&b.lv});
  var want=Math.min(28,Math.ceil(CS.pop/4));if(homes.length&&works.length&&WALK.length<want&&Math.random()<.5){var h=homes[Math.floor(Math.random()*homes.length)],w=works[Math.floor(Math.random()*works.length)];if(Math.random()<.5)newWalker(h,w);else newWalker(w,h)}
}
/* 걷기 · 헤엄 · 변신은 매 화면마다(부드럽게) */
/* 걷기: 모퉁이는 둥글게 · 출발 · 도착은 천천히 · 가끔 멈춰서 두리번 · 오른쪽 차선 */
var EMOS=['🍡','♪','💬','👋','🫧','😊'];
function pathPt(f,u){var P=f.p,n=P.length-1;u=Math.max(0,Math.min(n,u));var i=Math.min(n-1,Math.floor(u)),t=u-i,a=P[i],b=P[i+1],x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t,R=.32;
  function bez(c,din,dout,s){var A=[c[0]-din[0]*R,c[1]-din[1]*R],C=[c[0]+dout[0]*R,c[1]+dout[1]*R],m=1-s;return [m*m*A[0]+2*m*s*c[0]+s*s*C[0],m*m*A[1]+2*m*s*c[1]+s*s*C[1]]}
  var d=[b[0]-a[0],b[1]-a[1]];
  if(t<R&&i>0){var p0=P[i-1],dn=[a[0]-p0[0],a[1]-p0[1]];if(dn[0]!==d[0]||dn[1]!==d[1]){var q=bez(a,dn,d,(t+R)/(2*R));x=q[0];y=q[1]}}
  else if(t>1-R&&i<n-1){var c2=P[i+2],dt2=[c2[0]-b[0],c2[1]-b[1]];if(dt2[0]!==d[0]||dt2[1]!==d[1]){var q2=bez(b,d,dt2,(t-(1-R))/(2*R));x=q2[0];y=q2[1]}}
  return [x,y]}
function walkMove(dt){if(G.gate)wildTick(dt);WALK=WALK.filter(function(f){if(f.st)return gateStep(f,dt);var n=f.p.length-1,u=f.i+f.t;
  if(f.wait>0){f.wait-=dt;if(f.wait<=0)f.emo=null;return true}
  var ease=Math.min(1,.35+u*1.3,.35+(n-u)*1.3),v=f.sp*ease*(1+.08*Math.sin(u*2.1+f.ph)),du=v*dt;u+=du;f.wk=(f.wk||0)+du*7.5;
  if(Math.floor(u)>Math.floor(f.i+f.t)&&u<n-1&&Math.random()<.05){f.wait=1+Math.random()*1.6;f.emo=EMOS[Math.floor(Math.random()*EMOS.length)]}
  f.i=Math.floor(Math.min(u,n));f.t=u-f.i;return u<n})}
function walkerPos(f){if(f.st)return {i:f.fx,j:f.fy,dx:1,dy:0};var u=f.i+f.t,P=pathPt(f,u),A=pathPt(f,u-.06),B=pathPt(f,u+.06),dx=B[0]-A[0],dy=B[1]-A[1],L=Math.hypot(dx,dy)||1;dx/=L;dy/=L;
  var lane=.17+f.side*.25;return {i:P[0]-dy*lane,j:P[1]+dx*lane,dx:dx,dy:dy,u:u,n:f.p.length-1}}
function drawWalker(f,t){if(f.st){drawArrive(f,t);return}var q=walkerPos(f),p=sc(q.i,q.j),z=cam.z;if(z<.4)return;var sx=q.dx-q.dy;if(Math.abs(sx)>.15)f.fl=sx<0?-1:1;var flip=f.fl||1,step=f.wait>0?0:Math.sin(f.wk||0),al=Math.min(1,q.u*2.5,(q.n-q.u)*2.5),bob=f.wait>0?0:Math.abs(step)*1.3;ctx.save();ctx.globalAlpha=Math.max(0,al);if(f.emo){ctx.font='400 '+Math.round(15*z+4)+'px sans-serif';ctx.textAlign='center';ctx.fillText(f.emo,p.x,p.y-52*z)}ctx.translate(p.x,p.y-bob*z);ctx.scale(z*flip,z);ctx.strokeStyle=OUT;ctx.lineWidth=2;ctx.lineCap='round';
  ctx.fillStyle='rgba(15,60,80,.18)';ctx.beginPath();ctx.ellipse(0,1,9,3.5,0,0,7);ctx.fill();
  ctx.lineWidth=3.2;ctx.beginPath();ctx.moveTo(-3,-10);ctx.lineTo(-3-step*3,0);ctx.moveTo(3,-10);ctx.lineTo(3+step*3,0);ctx.stroke();
  ctx.lineWidth=2;ctx.fillStyle=f.o;rr(-7,-24,14,15,5);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(-6,-20);ctx.lineTo(-10,-14+step*2);ctx.moveTo(6,-20);ctx.lineTo(10,-14-step*2);ctx.lineWidth=3;ctx.stroke();ctx.lineWidth=2;
  ctx.fillStyle=f.c;ctx.beginPath();ctx.moveTo(-9,-33);ctx.lineTo(-15,-39);ctx.lineTo(-14,-28);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.ellipse(1,-33,10,8,0,0,7);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(-2,-40);ctx.quadraticCurveTo(2,-46,6,-40);ctx.fill();ctx.stroke();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(5,-35,3,0,7);ctx.fill();ctx.stroke();ctx.fillStyle=OUT;ctx.beginPath();ctx.arc(5.8,-35,1.4,0,7);ctx.fill();
  ctx.beginPath();ctx.moveTo(9,-31);ctx.quadraticCurveTo(7,-29.5,9,-28.5);ctx.stroke();ctx.restore()}
function zoneTint(key,p,w,h){var z=G.zone[key];if(z&&!OCC[key]){diamond(p.x,p.y,w*.92,h*.92);ctx.fillStyle='rgba('+ZN[z].c+',.30)';ctx.fill();ctx.strokeStyle='rgba('+ZN[z].c+',.8)';ctx.lineWidth=1.5;ctx.stroke()}
  if(TOOL&&TOOL.charAt(0)==='z'&&!O2[key]&&!G.road[key]){diamond(p.x,p.y,w,h);ctx.fillStyle='rgba(20,40,70,.18)';ctx.fill()}}
function paintZone(t,k){if(G.road[k]||G.ter[k]){return}var o=OCC[k];if(TOOL==='z0'){if(!G.zone[k])return;delete G.zone[k];if(o&&isZ(o.k)){G.b.splice(G.b.indexOf(o),1);occ()}return}
  var z=TOOL.charAt(1);if(o)return;if(hallLv()<ZN[z].at){toast(ZN[z].n+'은(는) 🏛 산호궁 Lv.'+ZN[z].at+'에 열려요');return}if(G.zone[k]===z)return;if(WAL.get('pearl')<5){toast('진주가 모자라요');return}WAL.add('pearl',-5);G.zone[k]=z;var p=sc(t.i,t.j);dust(p.x,p.y,2,.3)}
function zonePanel(b){var el=$('panel'),z=b.k.charAt(1),Z=ZN[z],L=b.lv,lv=landVal(b.x,b.y),h='<button class="x" id="pX">✕</button><h2>'+Z.ic+' '+Z.n+' <small>Lv.'+L+'</small></h2>';
  if(b.job)h+='<div class="box">'+(b.job.L===1?'🦀 게 일꾼들이 짓는 중':'Lv.'+b.job.L+'로 올리는 중')+' · '+dur((b.job.end-NOW())/1000)+'</div>';
  if(z==='R')h+='<p class="prod">🐟 사는 물고기 '+(b.occ|0)+' / '+Z.cap[Math.max(1,L)]+'</p>';else if(z==='C')h+='<p class="prod">일자리 '+Z.jobs[Math.max(1,L)]+' · 물고기 '+Z.serve[Math.max(1,L)]+'마리가 와서 경단 · 옷을 사요</p>';else h+='<p class="prod">일자리 '+Z.jobs[Math.max(1,L)]+' · 일꾼이 차면 마을 생산이 빨라져요</p>';
  h+='<p class="prod">땅값 '+lv+'<span class="meter"><i style="width:'+lv+'%;background:'+(lv>=62?'#35C27A':lv>=45?'#F2B233':'#E5484D')+'"></i></span></p>';
  if(!O2[b.x+','+b.y])h+='<p class="why">산소가 안 닿아요 · 산소 펌프를 가까이 지어요</p>';if(!roadAdj(b.x,b.y))h+='<p class="why">도로가 안 닿아요</p>';
  if(L&&!b.job){var why=zUpWhy(b);h+='<div class="box"><b>'+(L>=5?'최고 단계':'Lv.'+(L+1)+'로 자라려면')+'</b>'+(L<5?'<ul class="req">'+(why.length?why.map(function(s){return '<li class="no">○ '+s+'</li>'}).join(''):'<li class="ok">✓ 곧 저절로 올라가요</li>')+'</ul>':'')+'</div>'}
  h+='<div class="row"><button id="pDel" class="sub">🧽 헐기</button></div>';
  el.innerHTML=h;el.hidden=false;$('pX').onclick=function(){SEL=null;closePanel()};$('pDel').onclick=function(){var k=b.x+','+b.y;delete G.zone[k];G.b.splice(G.b.indexOf(b),1);occ();SEL=null;closePanel();save()};panelFor=b}
function lifePanel(){var el=$('panel'),c=CS,h='<button class="x" id="pX">✕</button><h2>🐟 마을 현황</h2>';
  function bar(v){var x=Math.round((v+1)*50);return '<span class="meter"><i style="width:'+x+'%;background:'+(v>.1?'#35C27A':v<-.1?'#E5484D':'#F2B233')+'"></i></span>'}
  h+='<div class="box">인구 <b>'+c.pop+' / '+c.lim+'</b> <small>(한도는 식당 · 학교 · 병원 · 랜드마크가 올려요)</small><br>일꾼 '+c.workers+' / 일자리 '+c.jobs+' → 생산 효율 <b>'+Math.round((.5+.5*c.w)*100)+'%</b><br>상점에서 장보는 인구 '+c.served+' / '+c.pop+'<br>🍡 경단 '+fmt(G.res.dango||0)+' <small>(시간당 −'+c.eat.toFixed(1)+')</small>'+(c.clothOn?' · 👕 옷 '+fmt(G.res.cloth||0)+' <small>(−'+c.wear.toFixed(1)+')</small>':'')+'<br>행복 <b>'+c.happy+'</b>'+(c.food?'':' · <span class="no">배고파요! 경단 공장을 돌려요</span>')+(c.cloth?'':' · <span class="no">옷이 없어요</span>')+'<br>🧾 세금 시간당 <b>'+c.tax.toFixed(1)+'🫧</b> <small>(장보는 인구 × 행복 · 산호궁 말풍선으로 걷어요)</small></div>';
  h+='<div class="box">수요<br>🏠 집 '+bar(c.dem.R)+'<br>🛍 가게 '+bar(c.dem.C)+'<br>🔧 공방 '+bar(c.dem.I)+'</div>';
  var L=hallLv();if(L<D.HMAX)h+='<p class="role">🏛 산호궁 Lv.'+(L+1)+'에는 인구 '+POPREQ(L+1)+'이(가) 필요해요</p>';
  el.innerHTML=h;el.hidden=false;$('pX').onclick=function(){closePanel()};panelFor=null}
