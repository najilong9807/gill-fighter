/* ===== 아가미시티 입구: 바다 물고기가 헤엄쳐 와서 입구를 지나면 뿅! 다리가 나고 옷 입은 주민이 돼요 ===== */
(function(){ownInit();var hh0=bOf('hall');if(hh0&&G.gateV!==3){var y=hh0.y+3,xs=0;for(var x0=0;x0<N;x0++)if(G.road[x0+','+y]){xs=x0;break}G.groad=G.groad||{};for(var x1=0;x1<xs;x1++){var k1=x1+','+y;delete G.ter[k1];G.road[k1]=1;if(!own(x1,y))G.groad[k1]=1}G.gate={x:0,y:y};G.gateV=3}if(G.gate)return;var best=null;for(var k in G.road){var q=k.split(','),x=+q[0],y=+q[1];if(!best||x<best.x||x===best.x&&y<best.y)best={x:x,y:y}}
  var h=bOf('hall');if(!best&&h)best={x:h.x-6,y:h.y+3};if(!best)return;var ox=Math.max(0,best.x-1);while(ox>0&&own(ox,best.y)&&!G.road[ox+','+best.y]&&!OCC[ox+','+best.y]&&!G.ter[ox+','+best.y]){G.road[ox+','+best.y]=1;ox--}
  for(var x=best.x;x>=0;x--){if(!G.road[x+','+best.y])break;best.x=x}G.gate={x:best.x,y:best.y}})();
var WILDF=[];function wildSpot(){var g=G.gate;return [g.x-1.6-Math.random()*5,g.y-4+Math.random()*8]}
function wildNew(far){var q=wildSpot(),f={fx:far?G.gate.x-8:q[0],fy:q[1],c:FISHC[Math.floor(Math.random()*FISHC.length)],ph:Math.random()*6,sp:.5+Math.random()*.5,fade:far?0:1,dir:1};var t2=wildSpot();f.gx=t2[0];f.gy=t2[1];return f}
if(G.gate)for(var wi=0;wi<7;wi++)WILDF.push(wildNew(false));
function swimTo(f,gx,gy,dt,sp){var dx=gx-f.fx,dy=gy-f.fy,d=Math.hypot(dx,dy);if(d<.08){f.vx=0;f.vy=0;return true}f.vx=f.vx||0;f.vy=f.vy||0;var want=sp*Math.min(1,d*1.2+.25),tx=dx/d*want,ty=dy/d*want,k=Math.min(1,dt*2.2);f.vx+=(tx-f.vx)*k;f.vy+=(ty-f.vy)*k;f.fx+=f.vx*dt;f.fy+=f.vy*dt;var sx=f.vx-f.vy;if(Math.abs(sx)>.12)f.dir=sx>0?1:-1;return d<.2}
function arrive(b){if(!G.gate){var h=bOf('hall');if(h)newWalker(h,b);return}if(WALK.filter(function(w){return w.st}).length>=6)return;
  var bi=0,bd=1e9;WILDF.forEach(function(w,i){var d=Math.hypot(w.fx-G.gate.x,w.fy-G.gate.y);if(d<bd){bd=d;bi=i}});var w=WILDF.splice(bi,1)[0]||wildNew(false);WILDF.push(wildNew(true));
  WALK.push({st:'swim',fx:w.fx,fy:w.fy,dir:1,home:b,c:w.c,o:OUTF[Math.floor(Math.random()*OUTF.length)],sp:1+Math.random()*.6,ph:w.ph,side:(Math.random()-.5)*.3,p:null,i:0,t:0,g:0})}
function gateStep(f,dt){if(f.st==='swim'){if(swimTo(f,G.gate.x-.2,G.gate.y,dt,1.6)){f.st='grow';f.g=0;f.fx=G.gate.x;f.fy=G.gate.y;arriveNotice()}return true}
  var g0=f.g;f.g+=dt/3.0;if(g0<.3&&f.g>=.3){var p=sc(G.gate.x,G.gate.y);dust(p.x,p.y-30*cam.z,12,.9);snd('pop')}if(g0<.45&&f.g>=.45){var p1=sc(G.gate.x,G.gate.y);sparkle(p1.x,p1.y-40*cam.z,16);float(p1.x+46*cam.z,p1.y-60*cam.z,'뿅!',true);snd('done')}
  if(f.g>=1){if(CAMBACK){var cb=CAMBACK;CAMBACK=null;setTimeout(function(){CAMGO={x:cb.x,y:cb.y,z:cb.z,t:1800};toast('🐟 새 주민이 집으로 걸어가요')},1200)}var to=roadNear(f.home),pth=to?path([G.gate.x,G.gate.y],to):null;f.st=null;if(!pth||pth.length<2)return false;f.p=pth;f.i=0;f.t=0;var p2=sc(G.gate.x,G.gate.y);bubbleFx(p2.x,p2.y-20*cam.z)}return true}
var ANT=0;function arriveNotice(){var p=sc(G.gate.x,G.gate.y),vis=p.x>20&&p.x<VW-20&&p.y>150&&p.y<VH-120;
  if(!G.firstArr){G.firstArr=1;CAMBACK={x:cam.x,y:cam.y,z:cam.z};CAMGO={x:(G.gate.x-G.gate.y)*TW/2,y:(G.gate.x+G.gate.y)*TH/2-20,z:Math.max(cam.z,1.15),t:2200};toast('🐟 첫 주민이 아가미시티로 들어와요!');return}
  if(vis)return;if(NOW()-ANT<8000)return;ANT=NOW();var el=$('arrN');el.hidden=false;el.style.top=$('tut').hidden?'':Math.round($('tut').getBoundingClientRect().bottom+10)+'px';el.innerHTML='🐟 새 물고기가 입구로 들어와요 <b>보러 가기 ›</b>';clearTimeout(el.t);el.t=setTimeout(function(){el.hidden=true},4500)}
var CAMGO=null,CAMBACK=null;function camGo(dt){if(!CAMGO)return;var k=Math.min(1,dt*3);cam.x+=(CAMGO.x-cam.x)*k;cam.y+=(CAMGO.y-cam.y)*k;cam.z+=(CAMGO.z-cam.z)*k;CAMGO.t-=dt*1000;if(CAMGO.t<=0)CAMGO=null}
$('arrN').onclick=function(){this.hidden=true;CAMGO={x:(G.gate.x-G.gate.y)*TW/2,y:(G.gate.x+G.gate.y)*TH/2-20,z:Math.max(cam.z,1.1),t:1500}};
function wildTick(dt){WILDF.forEach(function(w){w.fade=Math.min(1,w.fade+dt*.6);if(swimTo(w,w.gx,w.gy,dt,w.sp)){var q=wildSpot();w.gx=q[0];w.gy=q[1]}})}
function plainFish(x,y,f,al,t){var z=cam.z,s=7,wv=Math.sin(t*.009+f.ph)*.35;ctx.save();ctx.globalAlpha=al;ctx.translate(x,y);ctx.scale(z,z);ctx.fillStyle='rgba(15,60,80,.14)';ctx.beginPath();ctx.ellipse(0,20,s*1.1,s*.32,0,0,7);ctx.fill();ctx.translate(0,Math.sin(t*.0024+f.ph)*2.5);ctx.scale(f.dir||1,1);ctx.lineWidth=1.8;ctx.strokeStyle=OUT;
  ctx.fillStyle=f.c;ctx.beginPath();ctx.moveTo(-s*.9,0);ctx.lineTo(-s*1.9,-s*.75+wv*s);ctx.lineTo(-s*1.9,s*.75+wv*s);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.ellipse(0,0,s*1.25,s*.85,0,0,7);ctx.fill();ctx.stroke();ctx.fillStyle='rgba(255,255,255,.45)';ctx.beginPath();ctx.ellipse(s*.15,s*.32,s*.8,s*.3,0,0,7);ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s*.62,-s*.18,s*.32,0,7);ctx.fill();ctx.stroke();ctx.fillStyle=OUT;ctx.beginPath();ctx.arc(s*.72,-s*.16,s*.15,0,7);ctx.fill();ctx.restore()}
function drawArrive(f,t){var p=sc(f.fx,f.fy),z=cam.z;if(f.st==='swim'){plainFish(p.x,p.y-22*z,f,1,t);return}
  var g=f.g,S=1.55;/* 0~.3 두리번 · .3~.45 펑 연기 · .45~1 팔다리가 쑥쑥 */
  ctx.save();ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(255,250,200,'+(.25*Math.sin(Math.min(1,g)*Math.PI))+')';ctx.beginPath();ctx.ellipse(p.x,p.y-20*z,46*z,30*z,0,0,7);ctx.fill();ctx.restore();
  if(g<.3){var hop=Math.abs(Math.sin(g*30))*6;f.dir=Math.sin(g*20)>0?1:-1;ctx.save();ctx.translate(p.x,p.y);ctx.scale(S,S);ctx.translate(-p.x,-p.y);plainFish(p.x,p.y-26*z-hop*z,f,1,t);ctx.restore();
    ctx.save();ctx.font='400 '+Math.round(22*z+6)+'px "Black Han Sans",sans-serif';ctx.textAlign='center';ctx.fillStyle='#ffe27a';ctx.strokeStyle=OUT;ctx.lineWidth=4;var yy=p.y-70*z-Math.min(1,g*8)*8;ctx.strokeText('?!',p.x+14*z,yy);ctx.fillText('?!',p.x+14*z,yy);ctx.restore();return}
  if(g<.45){var k=(g-.3)/.15;ctx.save();ctx.fillStyle='rgba(255,255,255,'+(.95-.4*k)+')';ctx.strokeStyle='rgba(34,48,77,.35)';ctx.lineWidth=2;[[0,-28,26],[-18,-18,18],[18,-18,18],[-10,-44,16],[12,-42,16]].forEach(function(c){ctx.beginPath();ctx.arc(p.x+c[0]*z*(1+k*.3),p.y+c[1]*z,c[2]*z*(.7+k*.6),0,7);ctx.fill();ctx.stroke()});ctx.restore();return}
  var r=(g-.45)/.55,gl=Math.min(1,r*2.2),bounce=1+Math.sin(Math.min(1,r*1.6)*Math.PI)*.25,sc2=S*(1-r*.35)*bounce;
  ctx.save();ctx.translate(p.x,p.y);ctx.scale(z*sc2*(f.dir||1),z*sc2);ctx.strokeStyle=OUT;ctx.lineCap='round';ctx.lineJoin='round';
  ctx.fillStyle='rgba(15,60,80,.18)';ctx.beginPath();ctx.ellipse(0,1,9,3.5,0,0,7);ctx.fill();
  var L=10*gl,kick=Math.sin(t*.02)*2*(1-gl);
  ctx.lineWidth=3.4;ctx.beginPath();ctx.moveTo(-3,-10);ctx.lineTo(-3-kick,-10+L);ctx.moveTo(3,-10);ctx.lineTo(3+kick,-10+L);ctx.stroke();
  if(gl>.6){ctx.fillStyle='#2b2b33';ctx.beginPath();ctx.ellipse(-2,-.5,3.2,1.8,0,0,7);ctx.ellipse(4,-.5,3.2,1.8,0,0,7);ctx.fill()}
  ctx.lineWidth=2;ctx.fillStyle=f.o;ctx.globalAlpha=Math.min(1,gl*1.3);rr(-7,-24,14,15,5);ctx.fill();ctx.stroke();ctx.globalAlpha=1;
  var A=7*gl,wave=Math.sin(t*.015)*.6;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-6,-20);ctx.lineTo(-6-A*.6,-20-A*(.6+wave*.4));ctx.moveTo(6,-20);ctx.lineTo(6+A*.6,-20-A*(.6-wave*.4));ctx.stroke();
  if(gl>.5){ctx.fillStyle=f.c;ctx.beginPath();ctx.arc(-6-A*.6,-20-A*(.6+wave*.4),2,0,7);ctx.arc(6+A*.6,-20-A*(.6-wave*.4),2,0,7);ctx.fill()}
  ctx.fillStyle=f.c;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-9,-33);ctx.lineTo(-15,-39);ctx.lineTo(-14,-28);ctx.closePath();ctx.fill();ctx.stroke();ctx.beginPath();ctx.ellipse(1,-33,10,8,0,0,7);ctx.fill();ctx.stroke();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(5,-35,3,0,7);ctx.fill();ctx.stroke();ctx.fillStyle=OUT;ctx.beginPath();ctx.arc(5.8,-35,1.4,0,7);ctx.fill();
  ctx.beginPath();ctx.arc(6,-30,2.2,.2,2.6);ctx.stroke();
  if(r<.7){ctx.fillStyle='rgba(255,246,190,'+(1-r/.7)+')';for(var i=0;i<8;i++){var a2=i/8*6.28+t*.005;ctx.beginPath();ctx.arc(Math.cos(a2)*20,-18+Math.sin(a2)*20,2.6,0,7);ctx.fill()}}
  ctx.restore();
  if(r<.5){ctx.save();ctx.font='400 '+Math.round(13*z+4)+'px "Jua",sans-serif';ctx.textAlign='center';ctx.fillStyle='#fff';ctx.strokeStyle=OUT;ctx.lineWidth=4;ctx.globalAlpha=1-r*2;ctx.strokeText('다리가 생겼다!',p.x,p.y+22*z);ctx.fillText('다리가 생겼다!',p.x,p.y+22*z);ctx.restore()}}
function drawShore(t){var z=cam.z;ctx.save();ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=3*z;ctx.setLineDash([10*z,8*z]);ctx.lineDashOffset=-t*.02;ctx.beginPath();var a=sc(-.5,-.5),b=sc(-.5,N-.5);ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.restore();
  var p=sc(-3,G.gate.y);ctx.save();ctx.font='400 '+Math.round(14*z+3)+'px "Jua",sans-serif';ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,.85)';ctx.fillText('〰 바다 〰',p.x,p.y-60*z);ctx.restore()}
function drawGate(t){var g=G.gate,p=sc(g.x,g.y),z=cam.z;if(p.x<-150||p.x>VW+150||p.y<-200||p.y>VH+100)return;ctx.save();ctx.translate(p.x,p.y);ctx.scale(z,z);ctx.lineCap='round';
  var L=[-30,15],R=[30,-15];function pil(q){ctx.strokeStyle=OUT;ctx.lineWidth=15;ctx.beginPath();ctx.moveTo(q[0],q[1]);ctx.lineTo(q[0],q[1]-78);ctx.stroke();ctx.strokeStyle='#ff8fa3';ctx.lineWidth=10;ctx.stroke();ctx.fillStyle='#fffdf7';ctx.strokeStyle=OUT;ctx.lineWidth=2;ctx.beginPath();ctx.arc(q[0],q[1]-82,6,0,7);ctx.fill();ctx.stroke()}
  pil(L);ctx.strokeStyle=OUT;ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(L[0],L[1]-70);ctx.quadraticCurveTo(0,-118,R[0],R[1]-70);ctx.stroke();ctx.strokeStyle='#ffd54a';ctx.lineWidth=7;ctx.stroke();pil(R);
  ctx.fillStyle='#fffdf7';ctx.strokeStyle=OUT;ctx.lineWidth=2.4;rr(-40,-112,80,22,9);ctx.fill();ctx.stroke();ctx.font='400 13px "Black Han Sans","Jua",sans-serif';ctx.textAlign='center';ctx.fillStyle=OUT;ctx.fillText('아가미시티',0,-96);
  ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(255,250,200,'+(.08+.05*Math.sin(t*.003))+')';ctx.beginPath();ctx.ellipse(0,-50,36,52,0,0,7);ctx.fill();ctx.restore()}
