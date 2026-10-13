/* ===== 1.1.11 할로윈: 매년 10/10 ~ 11/21(끝날 포함)에만 앱 분위기를 할로윈으로 바꾸고, 지나면 저절로 원래대로.
   한정 꾸미기(모자 4 · 얼굴 3 · 효과 4)와 수족관 소품 4 · 배경 1은 이 기간에만 살 수 있고, 산 것은 기간이 끝나도 계속 쓴다 ===== */
Object.assign(TRT,{"잭오랜턴 모자":"Jack-o'-Lantern Hat","박쥐 머리띠":"Bat Headband","꼬마 유령":"Little Ghost","대롱대롱 거미":"Dangling Spider","호박 안경":"Pumpkin Glasses","해골 분장":"Skull Face Paint","거미줄 분장":"Web Face Paint","박쥐 꼬리":"Bat Trail","호박 꼬리":"Pumpkin Trail","캔디콘 꼬리":"Candy Corn Trail","유령 궤도":"Ghost Orbit","호박 집":"Pumpkin House","잭오랜턴":"Jack-o'-Lantern","유령 해초":"Ghost Kelp","마녀 솥":"Witch's Cauldron","할로윈 밤바다":"Halloween Night Sea","달빛 아래 호박 등불이 떠다녀요":"Pumpkin lanterns drift under the moon","할로윈 한정 아이템이 나왔어요!":"Limited Halloween items are here!","보러 가기":"Take a look","할로윈 한정":"Halloween only","할로윈":"Halloween","할로윈 분위기":"Halloween look","11월 21일까지 화면을 할로윈으로 꾸며요":"Dresses up the screens for Halloween until Nov 21"});
function hwSeason(){var q='';try{q=location.search||''}catch(e){}if(/[?&]hw=1/.test(q))return true;if(/[?&]hw=0/.test(q))return false;
  var d=new Date(),m=d.getMonth()+1,dd=d.getDate();return (m===10&&dd>=10)||(m===11&&dd<=21)}
function hwOn(){return hwSeason()&&!save.hwOff}
var HW=false,hwT=0;
function hwApply(){var on=hwOn();HW=on;try{document.body.classList.toggle('hw',on)}catch(e){}hwBarPaint()}
/* --- 그림 도우미 (우리 게임 그림) --- */
function hwPumpkin(c,x,y,r,face,lw){c.save();c.translate(x,y);var i;
  c.beginPath();c.ellipse(0,0,r*1.24,r*.92,0,0,Math.PI*2);c.lineWidth=lw*2;c.strokeStyle='#0B2C4A';c.stroke();
  [-2,2,-1,1,0].forEach(function(i){c.beginPath();c.ellipse(i*r*.34,0,r*(i?.52:.58),r*.88,0,0,Math.PI*2);var g=c.createRadialGradient(i*r*.34-r*.18,-r*.35,r*.08,i*r*.34,0,r);g.addColorStop(0,'#FFC46A');g.addColorStop(.6,'#FF8A1F');g.addColorStop(1,'#D2580A');c.fillStyle=g;c.fill();c.lineWidth=Math.max(1,lw*.6);c.strokeStyle='rgba(150,60,0,.7)';c.stroke()});
  c.beginPath();c.moveTo(-r*.08,-r*.8);c.quadraticCurveTo(-r*.02,-r*1.18,r*.18,-r*1.22);c.lineTo(r*.2,-r*1.06);c.quadraticCurveTo(r*.08,-r*1.02,r*.1,-r*.8);c.closePath();c.fillStyle='#5E8A2E';c.fill();c.lineWidth=lw*.9;c.stroke();
  if(face){var fl=.75+.25*Math.sin(t*6+x);c.beginPath();c.moveTo(-r*.56,-r*.06);c.lineTo(-r*.16,-r*.06);c.lineTo(-r*.36,-r*.44);c.closePath();c.moveTo(r*.56,-r*.06);c.lineTo(r*.16,-r*.06);c.lineTo(r*.36,-r*.44);c.closePath();
    c.moveTo(-r*.62,r*.16);c.quadraticCurveTo(0,r*.74,r*.62,r*.16);c.lineTo(r*.38,r*.24);c.lineTo(r*.26,r*.1);c.lineTo(r*.08,r*.26);c.lineTo(-r*.08,r*.12);c.lineTo(-r*.26,r*.26);c.lineTo(-r*.38,r*.1);c.closePath();
    c.fillStyle='#5A1E00';c.fill();c.save();c.clip();c.fillStyle='rgba(255,'+(205+Math.round(40*fl))+',80,1)';c.fillRect(-r,-r*.2,r*2,r*1.2);c.restore();c.lineWidth=Math.max(1,lw*.7);c.strokeStyle='#5A1E00';c.stroke()}
  c.restore()}
function hwGhost(c,x,y,r,a,lw){c.save();c.translate(x,y);c.globalAlpha*=a==null?1:a;var w=Math.sin(t*4+x*.05)*r*.08;
  c.beginPath();c.moveTo(-r*.8,r*.2);c.arc(0,-r*.1,r*.8,Math.PI,0);c.lineTo(r*.8,r*.8);for(var i=0;i<4;i++){var x1=r*.8-(i+.5)*r*.4,x2=r*.8-(i+1)*r*.4;c.quadraticCurveTo(x1+w,r*(i%2?.95:.6),x2,r*.8)}c.closePath();
  var g=c.createLinearGradient(0,-r,0,r);g.addColorStop(0,'#FFFFFF');g.addColorStop(1,'#DCE4F4');c.fillStyle=g;c.fill();if(lw){c.lineWidth=lw;c.strokeStyle='#0B2C4A';c.stroke()}
  c.fillStyle='#2A2440';c.beginPath();c.ellipse(-r*.28,-r*.12,r*.12,r*.17,0,0,Math.PI*2);c.ellipse(r*.28,-r*.12,r*.12,r*.17,0,0,Math.PI*2);c.fill();
  c.fillStyle='rgba(255,140,170,.55)';c.beginPath();c.ellipse(-r*.48,r*.12,r*.12,r*.07,0,0,Math.PI*2);c.ellipse(r*.48,r*.12,r*.12,r*.07,0,0,Math.PI*2);c.fill();c.restore()}
function hwBat(c,x,y,r,col,ph){c.save();c.translate(x,y);var f=Math.sin(t*14+(ph||0));c.fillStyle=col||'#2A1A3E';
  [-1,1].forEach(function(s){c.beginPath();c.moveTo(s*r*.2,0);c.quadraticCurveTo(s*r*.7,-r*(.5+.4*f),s*r*1.3,-r*(.1+.5*f));c.quadraticCurveTo(s*r*1.05,r*.05,s*r*1.1,r*.25);c.quadraticCurveTo(s*r*.8,r*.05,s*r*.65,r*.3);c.quadraticCurveTo(s*r*.45,r*.1,s*r*.2,r*.25);c.closePath();c.fill()});
  c.beginPath();c.ellipse(0,r*.08,r*.28,r*.32,0,0,Math.PI*2);c.fill();c.beginPath();c.moveTo(-r*.22,-r*.12);c.lineTo(-r*.14,-r*.42);c.lineTo(-r*.04,-r*.16);c.lineTo(r*.04,-r*.16);c.lineTo(r*.14,-r*.42);c.lineTo(r*.22,-r*.12);c.closePath();c.fill();
  c.fillStyle='#FFD23F';c.beginPath();c.arc(-r*.1,r*.02,r*.06,0,Math.PI*2);c.arc(r*.1,r*.02,r*.06,0,Math.PI*2);c.fill();c.restore()}
/* --- 꾸미기 11종 --- */
ACC.push(
 {id:'pumpkinhat',slot:'head',name:T('잭오랜턴 모자'),c:{cur:'pearls',price:900},hw:1},
 {id:'batband',slot:'head',name:T('박쥐 머리띠'),c:{cur:'pearls',price:750},hw:1},
 {id:'ghostpal',slot:'head',name:T('꼬마 유령'),c:{cur:'pearls',price:1100},hw:1},
 {id:'spiderdrop',slot:'head',name:T('대롱대롱 거미'),c:{cur:'pearls',price:600},hw:1},
 {id:'pumpkinglass',slot:'face',name:T('호박 안경'),c:{cur:'pearls',price:650},hw:1},
 {id:'skullpaint',slot:'face',name:T('해골 분장'),c:{cur:'pearls',price:700},hw:1},
 {id:'webpaint',slot:'face',name:T('거미줄 분장'),c:{cur:'pearls',price:550},hw:1},
 {id:'battrail',slot:'fx',name:T('박쥐 꼬리'),c:{cur:'pearls',price:1200},hw:1},
 {id:'pumpkintrail',slot:'fx',name:T('호박 꼬리'),c:{cur:'pearls',price:1200},hw:1},
 {id:'candycorn',slot:'fx',name:T('캔디콘 꼬리'),c:{cur:'pearls',price:1000},hw:1},
 {id:'ghostorbit',slot:'fx',name:T('유령 궤도'),c:{cur:'pearls',price:1600},hw:1}
);
ACC_HEAD.pumpkinhat=function(c,U){var lw=Math.max(1.4,U*.06);hwPumpkin(c,0,-U*.36,U*.4,true,lw)};
ACC_HEAD.batband=function(c,U){var lw=Math.max(1.4,U*.06);c.beginPath();c.arc(0,U*.32,U*.5,Math.PI*1.1,Math.PI*1.9);c.lineWidth=U*.09+lw*2;c.strokeStyle='#0B2C4A';c.lineCap='round';c.stroke();c.lineWidth=U*.09;c.strokeStyle='#7A3FC8';c.stroke();
  hwBat(c,0,-U*.3,U*.42,'#2A1A3E',0)};
ACC_HEAD.ghostpal=function(c,U){var lw=Math.max(1.2,U*.05),b=Math.sin(t*2.4)*U*.08;hwGhost(c,U*.08,-U*.58+b,U*.34,1,lw)};
ACC_HEAD.spiderdrop=function(c,U){var lw=Math.max(1.2,U*.05),y=-U*(.45+.12*Math.sin(t*2)),i;c.beginPath();c.moveTo(U*.12,-U*1.3);c.lineTo(U*.12,y);c.lineWidth=Math.max(1,U*.03);c.strokeStyle='rgba(255,255,255,.85)';c.stroke();
  c.strokeStyle='#0B2C4A';c.lineWidth=Math.max(1.2,U*.05);for(i=0;i<4;i++){[-1,1].forEach(function(s){c.beginPath();c.moveTo(U*.12,y+U*.04);c.quadraticCurveTo(U*.12+s*U*.2,y-U*.1+i*U*.08,U*.12+s*U*.28,y+U*.04+i*U*.08);c.stroke()})}
  c.beginPath();c.arc(U*.12,y+U*.06,U*.15,0,Math.PI*2);c.fillStyle='#3A2A54';c.fill();ol(c,lw);c.fillStyle='#fff';c.beginPath();c.arc(U*.07,y+U*.03,U*.045,0,Math.PI*2);c.arc(U*.17,y+U*.03,U*.045,0,Math.PI*2);c.fill();c.fillStyle='#0B2C4A';c.beginPath();c.arc(U*.08,y+U*.04,U*.022,0,Math.PI*2);c.arc(U*.18,y+U*.04,U*.022,0,Math.PI*2);c.fill()};
ACC_FACE.pumpkinglass=function(c,E){var lw=Math.max(1.4,E*.28);c.beginPath();c.moveTo(-E*1.1,-E*.3);c.lineTo(-E*3,-E*.7);ol(c,lw*1.6);c.beginPath();c.moveTo(-E*1.1,-E*.3);c.lineTo(-E*3,-E*.7);c.lineWidth=lw;c.strokeStyle='#E06A0E';c.stroke();
  c.beginPath();c.arc(0,0,E*1.25,0,Math.PI*2);c.fillStyle='rgba(255,200,120,.25)';c.fill();c.lineWidth=lw*2.2;c.strokeStyle='#0B2C4A';c.stroke();c.lineWidth=lw*1.3;c.strokeStyle='#FF8A1F';c.stroke();
  c.beginPath();c.moveTo(0,-E*1.25);c.quadraticCurveTo(E*.1,-E*1.75,E*.45,-E*1.85);c.lineWidth=Math.max(1.2,E*.25);c.strokeStyle='#5E8A2E';c.stroke();fhLeafC(c,E*.12,-E*1.5,E*.7,-.5)};
function fhLeafC(c,x,y,l,a){c.save();c.translate(x,y);c.rotate(a);c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(l*.5,-l*.38,l,0);c.quadraticCurveTo(l*.5,l*.38,0,0);c.closePath();c.fillStyle='#6CC84E';c.fill();c.lineWidth=Math.max(1,l*.08);c.strokeStyle='#0B2C4A';c.stroke();c.restore()}
ACC_FACE.skullpaint=function(c,E){c.beginPath();c.arc(0,0,E*1.55,0,Math.PI*2);c.fillStyle='rgba(255,255,255,.88)';c.fill();c.beginPath();c.arc(0,0,E*1.12,0,Math.PI*2);c.fillStyle='rgba(30,20,50,.85)';c.fill();
  c.beginPath();c.arc(0,0,E*.55,0,Math.PI*2);c.fillStyle='#fff';c.fill();c.beginPath();c.arc(0,0,E*.3,0,Math.PI*2);c.fillStyle='#0B2C4A';c.fill();
  c.strokeStyle='rgba(30,20,50,.8)';c.lineWidth=Math.max(1,E*.16);c.beginPath();c.moveTo(-E*.6,E*1.9);c.lineTo(E*.8,E*1.9);for(var i=-1;i<=1;i++){c.moveTo(i*E*.45+E*.1,E*1.7);c.lineTo(i*E*.45+E*.1,E*2.1)}c.stroke()};
ACC_FACE.webpaint=function(c,E){var i,R=E*2.2;c.strokeStyle='rgba(40,30,60,.75)';c.lineWidth=Math.max(1,E*.12);
  for(i=0;i<8;i++){var a=i/8*Math.PI*2;c.beginPath();c.moveTo(Math.cos(a)*E*.9,Math.sin(a)*E*.9);c.lineTo(Math.cos(a)*R,Math.sin(a)*R);c.stroke()}
  [1.3,1.75,2.2].forEach(function(k){c.beginPath();for(i=0;i<=8;i++){var a1=i/8*Math.PI*2,a0=(i-1)/8*Math.PI*2,am=(a0+a1)/2,r1=E*k;if(!i){c.moveTo(Math.cos(a1)*r1,Math.sin(a1)*r1);continue}c.quadraticCurveTo(Math.cos(am)*r1*.82,Math.sin(am)*r1*.82,Math.cos(a1)*r1,Math.sin(a1)*r1)}c.stroke()})};
ICO115.skullpaint=[0,.3,.17];ICO115.webpaint=[0,0,.13];
FX_SHAPE.bat=function(c,x,y,r,col,k){hwBat(c,x,y,r*1.8,col,k)};
FX_SHAPE.pump=function(c,x,y,r,col,k){hwPumpkin(c,x,y,r*1.15,true,Math.max(1,r*.12))};
FX_SHAPE.ccorn=function(c,x,y,r,col,k){c.save();c.translate(x,y);c.rotate(Math.sin(t*2+k)*.5);c.scale(1.35,1.35);c.beginPath();c.moveTo(0,-r*1.1);c.lineTo(r*.75,r*.8);c.quadraticCurveTo(0,r*1.05,-r*.75,r*.8);c.closePath();c.save();c.clip();
  c.fillStyle='#FFF4D8';c.fillRect(-r,-r*1.2,r*2,r*2.4);c.fillStyle='#FF9A2A';c.fillRect(-r,r*.05,r*2,r*1.2);c.fillStyle='#FFD23F';c.fillRect(-r,-r*.4,r*2,r*.45);c.restore();c.lineWidth=Math.max(1,r*.12);c.strokeStyle='#0B2C4A';c.stroke();c.restore()};
FX_TRAIL.battrail=['bat',['#2A1A3E','#5A3A8A']];FX_TRAIL.pumpkintrail=['pump',['#FF8A1F']];FX_TRAIL.candycorn=['ccorn',['#FF9A2A']];
var accBackHw=accBack;
accBack=function(c,id,x,y,s,ang,pts){if(id!=='ghostorbit'){accBackHw(c,id,x,y,s,ang,pts);return}
  for(var i=0;i<3;i++){var a=t*1.3+i*Math.PI*2/3,px=x+Math.cos(a)*s*1.7,py=y+Math.sin(a)*s*1.05;c.save();c.globalAlpha*=.92;hwGhost(c,px,py,s*.38,1,Math.max(1,s*.04));c.restore()}};
/* --- 수족관 소품 4 · 배경 1 --- */
DECOR.push(
 {id:'pumpkinhouse',name:T('호박 집'),w:.3,ar:.95,draw:'pumpkinhouse',c:{cur:'pearls',price:1650},hw:1},
 {id:'jacko',name:T('잭오랜턴'),w:.13,ar:.9,draw:'jacko',c:{cur:'pearls',price:450},hw:1},
 {id:'ghostweed',name:T('유령 해초'),w:.25,prop:'weed',hue:185,band:[50,170],sat:1.1,lit:.95,sway:1,c:{cur:'pearls',price:400},hw:1},
 {id:'cauldron',name:T('마녀 솥'),w:.17,ar:.85,draw:'cauldron',c:{cur:'pearls',price:900},hw:1}
);
TANK_BGS.push({id:'hwnight',name:T('할로윈 밤바다'),sub:T('달빛 아래 호박 등불이 떠다녀요'),pal:['#7A5AC8','#1C1240','#6A5878','#3E3150'],fx:'hw',dark:.4,price:1300,hw:1});
Object.assign(DECO_DRAW,{
  pumpkinhouse:function(w,h,sd){var lw=Math.max(1.5,w*.026),i,cy=h*.08,rx=w*.47,ry=h*.36,fl=.8+.2*Math.sin(t*5+sd);decoShadow(h*.44,w*.52,h*.08);
    for(i=-2;i<=2;i++){ctx.beginPath();ctx.ellipse(i*rx*.33,cy,rx*(i?.42:.48),ry,0,0,Math.PI*2);var g=ctx.createRadialGradient(i*rx*.33-rx*.15,cy-ry*.4,rx*.05,i*rx*.33,cy,rx*.6);g.addColorStop(0,'#FFC46A');g.addColorStop(.6,'#FF8A1F');g.addColorStop(1,'#CF560A');ctx.fillStyle=g;ctx.fill();tStroke(lw)}
    ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.5*fl;ctx.drawImage(glow('255,180,60'),-w*.45,-h*.25,w*.9,h*.7);ctx.restore();
    ctx.fillStyle='rgba(255,'+Math.round(200+40*fl)+',90,1)';ctx.beginPath();ctx.moveTo(-w*.3,-h*.02);ctx.lineTo(-w*.12,-h*.02);ctx.lineTo(-w*.21,-h*.17);ctx.closePath();ctx.moveTo(w*.3,-h*.02);ctx.lineTo(w*.12,-h*.02);ctx.lineTo(w*.21,-h*.17);ctx.closePath();ctx.fill();ctx.lineWidth=lw*.7;ctx.strokeStyle='#7A2E00';ctx.stroke();
    fhDoor(0,h*.43,w*.17,h*.27,lw,'#7A3A10');fhWin(-w*.3,h*.18,w*.045,lw,sd,'#7A3A10');fhWin(w*.3,h*.18,w*.045,lw,sd+2,'#7A3A10');
    ctx.beginPath();ctx.moveTo(-w*.03,cy-ry+h*.03);ctx.quadraticCurveTo(-w*.01,cy-ry-h*.1,w*.08,cy-ry-h*.13);ctx.lineTo(w*.09,cy-ry-h*.06);ctx.quadraticCurveTo(w*.03,cy-ry-h*.04,w*.04,cy-ry+h*.03);ctx.closePath();ctx.fillStyle='#5E8A2E';ctx.fill();tStroke(lw*.9);
    fhLeaf(w*.02,cy-ry-h*.02,w*.17,Math.PI+.5+Math.sin(t*1.1+sd)*.06,'#6CC84E');
    ctx.beginPath();ctx.moveTo(w*.06,cy-ry-h*.05);ctx.bezierCurveTo(w*.2,cy-ry-h*.16,w*.26,cy-ry,w*.34,cy-ry-h*.08);ctx.lineWidth=Math.max(1,w*.012);ctx.strokeStyle='#4E7A2A';ctx.stroke()},
  jacko:function(w,h,sd){var lw=Math.max(1.3,w*.05),r=w*.42,fl=.75+.25*Math.sin(t*6+sd*3);decoShadow(h*.42,w*.45,h*.08);
    ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55*fl;ctx.drawImage(glow('255,170,60'),-w,-h*.9,w*2,h*1.8);ctx.restore();hwPumpkin(ctx,0,h*.12,r,true,lw)},
  cauldron:function(w,h,sd){var lw=Math.max(1.4,w*.04),i;decoShadow(h*.42,w*.5,h*.08);
    [-1,1].forEach(function(s){ctx.beginPath();ctx.moveTo(s*w*.25,h*.3);ctx.lineTo(s*w*.32,h*.44);ctx.lineWidth=w*.06;ctx.strokeStyle=TOL;ctx.lineCap='round';ctx.stroke();ctx.lineWidth=w*.035;ctx.strokeStyle='#4A4560';ctx.stroke()});
    ctx.beginPath();ctx.moveTo(-w*.44,-h*.06);ctx.bezierCurveTo(-w*.5,h*.42,w*.5,h*.42,w*.44,-h*.06);ctx.closePath();var g=ctx.createLinearGradient(0,-h*.1,0,h*.4);g.addColorStop(0,'#5A5478');g.addColorStop(1,'#25213A');ctx.fillStyle=g;ctx.fill();tStroke(lw);
    ctx.beginPath();ctx.ellipse(0,-h*.06,w*.46,h*.09,0,0,Math.PI*2);ctx.fillStyle='#3A3552';ctx.fill();tStroke(lw);
    ctx.beginPath();ctx.ellipse(0,-h*.05,w*.38,h*.06,0,0,Math.PI*2);var gg=ctx.createRadialGradient(0,-h*.06,1,0,-h*.05,w*.38);gg.addColorStop(0,'#C8FF7A');gg.addColorStop(1,'#4EC23A');ctx.fillStyle=gg;ctx.fill();
    ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.4;ctx.drawImage(glow('150,255,110'),-w*.5,-h*.5,w,h*.6);ctx.restore();
    for(i=0;i<5;i++){var ph=((t*.6+h2(sd,i,1))%1+1)%1,bx=(h2(sd,i,2)-.5)*w*.5+Math.sin(t*2+i)*w*.03,by=-h*.08-ph*h*.55,br=w*(.03+.04*h2(sd,i,3))*(1-ph*.4);ctx.globalAlpha=1-ph;ctx.beginPath();ctx.arc(bx,by,br,0,Math.PI*2);ctx.fillStyle='#B8FF8A';ctx.fill();ctx.lineWidth=Math.max(1,lw*.5);ctx.strokeStyle='#2E7A2A';ctx.stroke()}ctx.globalAlpha=1;
    ctx.beginPath();ctx.ellipse(-w*.22,h*.08,w*.06,h*.1,-.3,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,.18)';ctx.fill()}
});
var drawTankFxHw=drawTankFx;
drawTankFx=function(B,W,H,cam){if(B.fx!=='hw'){drawTankFxHw(B,W,H,cam);return}var i,x,y,par=(cam||0)*.12;
  var mx=W*.76-par*.4,my=H*.12,mr=Math.min(W,H)*.075;ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55;ctx.drawImage(glow('255,220,150'),mx-mr*4,my-mr*4,mr*8,mr*8);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
  ctx.beginPath();ctx.arc(mx,my,mr,0,Math.PI*2);var mg=ctx.createRadialGradient(mx-mr*.3,my-mr*.3,mr*.1,mx,my,mr);mg.addColorStop(0,'#FFF6D0');mg.addColorStop(1,'#FFC86A');ctx.fillStyle=mg;ctx.fill();
  for(i=0;i<5;i++){x=(((h2(i,31,1)*W*1.5-par+t*(8+6*h2(i,31,2)))%(W*1.2))+W*1.2)%(W*1.2)-W*.1;y=H*(.08+.18*h2(i,31,3))+Math.sin(t*1.5+i*2)*10;hwBat(ctx,x,y,(W<200?4:9)+5*h2(i,31,4),'rgba(30,16,50,.85)',i)}
  for(i=0;i<9;i++){x=(((h2(i,32,1)*W*1.6-par+Math.sin(t*.3+i)*30)%(W*1.2))+W*1.2)%(W*1.2)-W*.1;y=H*(.22+.45*h2(i,32,2))+Math.sin(t*.6+i*1.3)*14;var r=W*(.012+.02*h2(i,32,3));
    ctx.globalAlpha=.35+.25*Math.sin(t*1.1+i);ctx.globalCompositeOperation='lighter';ctx.drawImage(glow('255,150,50'),x-r*3,y-r*3,r*6,r*6);ctx.globalCompositeOperation='source-over'}ctx.globalAlpha=1;
  if(W>=200)for(i=0;i<2;i++){x=(((h2(i,33,1)*W+t*12*(i?-1:1))%(W*1.3))+W*1.3)%(W*1.3)-W*.15;y=H*(.3+.15*i)+Math.sin(t*1.2+i*3)*12;hwGhost(ctx,x,y,W*.035,.55,0)}};
/* --- 목록: 기간에는 할로윈 것을 맨 앞에, 기간 밖에는 안 가진 할로윈 것을 숨긴다 --- */
['pumpkin','witch','devil','fangs','moons','darkaura'].forEach(function(id){var A=accById(id);if(A)A.hwf=1});
function hwList(arr,own){var on=hwSeason();if(on)return arr.filter(function(o){return o.hw||o.hwf}).concat(arr.filter(function(o){return !o.hw&&!o.hwf}));return arr.filter(function(o){return !o.hw||own(o)})}
/* --- 홈 · 플레이 화면 분위기 --- */
var HWV=null;
function hwHomeFx(){var i,x,y,c=ctx;c.save();c.setTransform(dpr,0,0,dpr,0,0);
  c.fillStyle='rgba(40,12,80,.2)';c.fillRect(0,0,cw,ch);var g=c.createLinearGradient(0,0,0,ch*.66);g.addColorStop(0,'rgba(60,18,110,.55)');g.addColorStop(1,'rgba(60,18,110,0)');c.fillStyle=g;c.fillRect(0,0,cw,ch*.66);
  var g2=c.createLinearGradient(0,ch*.55,0,ch);g2.addColorStop(0,'rgba(255,120,30,0)');g2.addColorStop(1,'rgba(255,110,30,.16)');c.fillStyle=g2;c.fillRect(0,ch*.55,cw,ch*.45);
  var sm=Math.min(cw,ch);
  for(i=0;i<6;i++){x=(((h2(i,41,1)*cw*1.4+t*(16+10*h2(i,41,2))*(i%2?1:-1))%(cw*1.2))+cw*1.2)%(cw*1.2)-cw*.1;y=ch*(.13+.12*h2(i,41,3))+Math.sin(t*1.6+i*2)*12;hwBat(c,x,y,sm*(.018+.012*h2(i,41,4)),'rgba(34,18,58,.9)',i)}
  for(i=0;i<3;i++){var gx=[cw*.1,cw*.86,cw*.32][i],gy=ch*[.36,.44,.19][i]+Math.sin(t*1.1+i*2.4)*16,gr=sm*(.045+.012*i);x=gx+Math.sin(t*.45+i*2)*cw*.04;hwGhost(c,x,gy,gr,.78,Math.max(1.2,gr*.06))}
  for(i=0;i<2;i++){var px=cw*(i?.9:.08),py=ch*(.26+.04*i)+Math.sin(t*.9+i*3)*10,pr=sm*.04;c.save();c.globalCompositeOperation='lighter';c.globalAlpha=.45+.15*Math.sin(t*5+i);c.drawImage(glow('255,160,50'),px-pr*3,py-pr*3,pr*6,pr*6);c.restore();hwPumpkin(c,px,py,pr,true,Math.max(1.2,pr*.08))}
  c.restore()}
function hwPlayFx(){var c=ctx;if(!HWV||HWV.w!==cw||HWV.h!==ch){var v=document.createElement('canvas');v.width=Math.max(1,Math.round(cw/3));v.height=Math.max(1,Math.round(ch/3));var x=v.getContext('2d'),r=Math.hypot(v.width,v.height)/2,g=x.createRadialGradient(v.width/2,v.height/2,r*.42,v.width/2,v.height/2,r);
    g.addColorStop(0,'rgba(60,20,110,0)');g.addColorStop(1,'rgba(60,20,110,.62)');x.fillStyle=g;x.fillRect(0,0,v.width,v.height);HWV={w:cw,h:ch,cv:v}}
  c.save();c.setTransform(dpr,0,0,dpr,0,0);c.drawImage(HWV.cv,0,0,cw,ch);var sm=Math.min(cw,ch);
  for(var i=0;i<3;i++){var x2=(((h2(i,51,1)*cw*1.4+t*(14+8*h2(i,51,2))*(i%2?1:-1))%(cw*1.3))+cw*1.3)%(cw*1.3)-cw*.15,y2=ch*(.2+.06*i)+Math.sin(t*1.5+i*2)*10;hwBat(c,x2,y2,sm*.02,'rgba(34,18,58,.75)',i)}c.restore()}
var drawHw=draw;draw=function(){drawHw();if(HW&&state!=='home'&&state!=='menu'&&!reduce)hwPlayFx()};
/* --- 홈 위 할로윈 띠(한 번 누르면 이번 해에는 다시 안 보임) --- */
function hwBarPaint(){var b=$('hwBar');if(!b)return;var y=new Date().getFullYear();b.hidden=!(HW&&save.hwSeen!==y)}
(function(){var hb=document.querySelector('.home-bottom');if(!hb)return;var b=document.createElement('button');b.type='button';b.className='updbar hwbar';b.id='hwBar';b.hidden=true;
  b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="7.5" cy="14" rx="5" ry="7" fill="#FF8A1F" stroke="#0B2C4A" stroke-width="1.6"/><ellipse cx="16.5" cy="14" rx="5" ry="7" fill="#FF8A1F" stroke="#0B2C4A" stroke-width="1.6"/><ellipse cx="12" cy="14" rx="5.5" ry="7.5" fill="#FFA640" stroke="#0B2C4A" stroke-width="1.6"/><path d="M11 6.8q1-3 3.4-3.2" stroke="#3E6A1E" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M9 12.5h2.2l-1.1-2zM13 12.5h2.2l-1.1-2zM8.6 15.5q3.4 3 6.8 0z" fill="#3A1A00"/></svg><span></span><b></b>';
  b.querySelector('span').textContent=T('할로윈 한정 아이템이 나왔어요!');b.querySelector('b').textContent=T('보러 가기');
  b.addEventListener('click',function(){save.hwSeen=new Date().getFullYear();persist();hwBarPaint();try{accSlot='head';showTab('sea');setTimeout(function(){var e=$('goodsAcc');if(e&&e.scrollIntoView)e.scrollIntoView({block:'start',behavior:'smooth'})},250)}catch(e){}});
  var u=$('updBar');hb.insertBefore(b,u||hb.firstChild)})();
(function(){var st=document.createElement('style');st.textContent=
  'body.hw #tabs{background:linear-gradient(180deg,#6A3AA8 0%,#2A1150 100%)}'+
  'body.hw #playBtn{--tsc:#6A2A00;--tss:rgba(110,40,0,.55);background:linear-gradient(180deg,#FFD58A 0%,#FF9A2A 48%,#E0620A 100%);box-shadow:inset 0 3px 0 rgba(255,255,255,.7),inset 0 -6px 0 rgba(120,40,0,.32),0 0 0 3px #5A2200,0 8px 0 3px #5A2200,0 16px 18px rgba(3,22,42,.4)}'+
  'body.hw #playBtn:active{box-shadow:inset 0 3px 0 rgba(255,255,255,.7),inset 0 -6px 0 rgba(120,40,0,.32),0 0 0 3px #5A2200,0 2px 0 3px #5A2200,0 6px 8px rgba(3,22,42,.4)}'+
  'body.hw .home-card{box-shadow:0 0 0 2px rgba(255,138,31,.75),0 5px 0 rgba(12,40,60,.45)}'+
  '.hwbar{background:linear-gradient(180deg,#FFE7C2,#FFC07A);color:#5A2200;max-width:100%}.hwbar svg{width:24px;height:24px;flex:none}'+
  '.hwbar b{background:linear-gradient(180deg,#B67CFF,#6A2FC8);box-shadow:0 0 0 2px #2E0F52;-webkit-text-stroke:2px #2E0F52}'+
  '.good em.hwtag,.ddtag.hwtag{color:#fff;background:linear-gradient(180deg,#FF9A2A,#E0620A);border-radius:99px;padding:1px 8px;font-style:normal;font-size:11.5px;box-shadow:0 0 0 1.5px #5A2200}'+
  '.ddcard{position:relative}.ddcard .hwrib{position:absolute;top:4px;left:4px;font-size:10.5px;color:#fff;background:#E0620A;border-radius:99px;padding:1px 6px;box-shadow:0 0 0 1.5px #5A2200;font-style:normal;pointer-events:none}';
  document.head.appendChild(st)})();
