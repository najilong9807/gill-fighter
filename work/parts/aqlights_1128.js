/* ===== 1.1.28 늑구 '전깃줄도 어디랑 연결하고 · 궁전도 더 업글 · 수족관을 진짜 하나의 게임처럼' (가로 화면도 늘 같이 확인)
   ① 전구 줄 잇기: 꾸미기에서 소품을 고르고 「전구 줄」 → 다른 소품이나 집을 누르면 그 사이에 전구 줄(진주 80, 최대 20줄)
      줄마다 색 4가지(알록달록 · 금빛 · 얼음 · 분홍)가 차례로, 「줄 빼기」로 그 소품의 줄을 모두 뗌. 소품을 옮기면 줄도 따라감
      대형 트리를 받으면 트리 ↔ 집 첫 줄은 무료로 이어 드림
   ② 해저 궁전 증축 ★1~★5: 집이 5단계(궁전)면 집 창에 「궁전 증축」. 별마다 진주 샘 +12%
      ★1 탑을 잇는 전구 줄 · ★2 탑 깃발 · ★3 떠오르는 진주 반짝이 · ★4 꼭대기 빛기둥 · ★5 황금 왕관 ===== */
abyTr(TRT,{'전구 줄':'Lights','줄 빼기':'Unstring','이을 소품이나 집을 눌러요':'Tap another decor or the house to string lights','전구 줄 하나에 진주 ':'Each string costs pearls ','전구 줄을 이었어요':'Lights strung!','전구 줄을 뗐어요':'Lights removed',
 '전구 줄은 ':'Up to ','줄까지 이어요':' strings','같은 소품끼리는 못 이어요':'Pick a different decor','이미 이어져 있어요':'Already connected','취소했어요':'Cancelled',
 '궁전 증축':'Expand palace','궁전 증축 → ':'Expand → ','완성된 궁전이에요!':'Your palace is complete!','궁전을 증축했어요!':'Palace expanded!','진주 샘 +':'Pearl spring +',
 '탑을 잇는 전구 줄':'lights between towers','탑 깃발':'tower flags','떠오르는 진주 반짝이':'rising pearl sparkles','꼭대기 빛기둥':'light beams','황금 왕관':'golden crown','다음 증축: ':'Next: ','트리와 집을 전구 줄로 이어 드렸어요':'We strung lights between your tree and house'});
abyTr(TRJ,{'전구 줄':'電球',"줄 빼기":'外す','이을 소품이나 집을 눌러요':'つなぐ小物か家をタップ','전구 줄 하나에 진주 ':'電球ひもは1本につき真珠 ','전구 줄을 이었어요':'電球をつなぎました','전구 줄을 뗐어요':'電球を外しました',
 '전구 줄은 ':'電球ひもは','줄까지 이어요':'本まで','같은 소품끼리는 못 이어요':'別の小物を選んでね','이미 이어져 있어요':'もうつながっています','취소했어요':'キャンセルしました',
 '궁전 증축':'宮殿の増築','궁전 증축 → ':'増築 → ','완성된 궁전이에요!':'宮殿が完成しました！','궁전을 증축했어요!':'宮殿を増築しました！','진주 샘 +':'真珠の泉 +',
 '탑을 잇는 전구 줄':'塔をつなぐ電球','탑 깃발':'塔の旗','떠오르는 진주 반짝이':'のぼる真珠のきらめき','꼭대기 빛기둥':'てっぺんの光の柱','황금 왕관':'金の王冠','다음 증축: ':'次の増築: ','트리와 집을 전구 줄로 이어 드렸어요':'ツリーと家を電球でつなぎました'});
/* --- 공통: 전구 그리기(색 묶음) --- */
var AQB=[[['#FF5A5A','255,90,90'],['#FFD23F','255,215,80'],['#5EDB6A','110,220,140'],['#5AA9FF','110,180,255'],['#FF8AD6','255,140,220']],
 [['#FFD86B','255,210,110'],['#FFF1B8','255,235,170']],[['#9FE6FF','150,225,255'],['#FFFFFF','220,240,255'],['#5AA9FF','110,180,255']],[['#FF8AD6','255,140,220'],['#FFC3E6','255,190,230'],['#FFFFFF','255,220,240']]];
function aqBulb(c,x,y,r,pal,i){var P=AQB[pal]||AQB[0],q=P[i%P.length],on=.6+.4*Math.sin(t*3+i*1.7);
  c.save();c.globalCompositeOperation='lighter';c.globalAlpha*=.6*on;c.drawImage(glow(q[1]),x-r*3.2,y-r*3.2,r*6.4,r*6.4);c.restore();
  c.beginPath();c.ellipse(x,y+r*.2,r*.6,r*.85,0,0,Math.PI*2);c.fillStyle=q[0];c.fill();c.lineWidth=Math.max(.8,r*.2);c.strokeStyle='#0B2C4A';c.stroke();
  c.fillStyle='#5A6B7A';c.fillRect(x-r*.33,y-r*.8,r*.66,r*.38);c.save();c.globalAlpha*=.7;c.fillStyle='#FFFFFF';c.beginPath();c.ellipse(x-r*.18,y,r*.15,r*.26,-.3,0,Math.PI*2);c.fill();c.restore()}
/* 늘어진 줄(2차 곡선) + 전구 */
function aqString(c,x0,y0,x1,y1,pal,r,seed){var dx=x1-x0,dy=y1-y0,d=Math.hypot(dx,dy);if(d<4)return;var sag=clamp(d*.2,10,110)+Math.sin(t*.8+seed)*2,mx=(x0+x1)/2,my=(y0+y1)/2+sag;
  c.save();c.beginPath();c.moveTo(x0,y0);c.quadraticCurveTo(mx,my,x1,y1);c.lineWidth=Math.max(1.2,r*.32);c.strokeStyle='rgba(15,35,55,.85)';c.stroke();c.restore();
  var n=Math.max(2,Math.round(d/(r*4.4)));for(var k=1;k<n;k++){var u=k/n,a=(1-u)*(1-u),b=2*(1-u)*u,e=u*u;aqBulb(c,a*x0+b*mx+e*x1,a*y0+b*my+e*y1+r*.75,r,pal,k+(seed|0))}}
/* --- ① 전구 줄 잇기 --- */
var AQL_MAX=20,AQL_COST=80,AQLK=null;
function AQL(){if(!Array.isArray(save.aqL))save.aqL=[];return save.aqL}
function aqU(it){if(!it.u)it.u=Math.random().toString(36).slice(2,9);return it.u}
function aqItem(u){var p=DS().placed;for(var i=0;i<p.length;i++)if(p[i].u===u&&!p[i].pv)return p[i];return null}
function aqPrune(){var L=AQL(),n0=L.length;save.aqL=L.filter(function(s){return (s.a==='h'||aqItem(s.a))&&(s.b==='h'||aqItem(s.b))&&(s.a!=='h'&&s.b!=='h'||HS().lv>0)});return save.aqL.length!==n0}
function aqAnchor(u){var W=TWW();if(u==='h'){var p=housePos();if(!HS().lv)return null;return {x:p.x,y:p.y-(p.d?p.d.ih*.6:p.h*.78)}}
  var it=aqItem(u);if(!it)return null;var D=decoById(it.k);if(!D)return null;var w=decoW(D,it.s),h=w*decoAR(D);return {x:it.x*W,y:it.y*ch-h*(it.k==='xm_mytree'?.2:.3)}}
function aqLink(a,b,free){var L=AQL();aqPrune();L=AQL();if(a===b){banner(T('같은 소품끼리는 못 이어요'),'');return false}
  if(L.some(function(s){return (s.a===a&&s.b===b)||(s.a===b&&s.b===a)})){banner(T('이미 이어져 있어요'),'');return false}
  if(L.length>=AQL_MAX){banner(T('전구 줄은 ')+AQL_MAX+T('줄까지 이어요'),'');return false}
  if(!free){var c={cur:'pearls',price:AQL_COST};if(!pay(c)){short(c);return false}}
  L.push({a:a,b:b,c:L.length%AQB.length});persist();return true}
function aqDrawLights(){try{var L=AQL();if(!L.length)return;var r=Math.max(3,decoU()*.0105),lx0=tankCam-xOff()/tankZ-60,lx1=tankCam+viewW()+60;
  for(var i=0;i<L.length;i++){var s=L[i],A=aqAnchor(s.a),B=aqAnchor(s.b);if(!A||!B)continue;if(Math.max(A.x,B.x)<lx0||Math.min(A.x,B.x)>lx1)continue;aqString(ctx,A.x,A.y,B.x,B.y,s.c|0,r,i*3.1)}
  if(AQLK&&deco.on){var it=aqItem(AQLK);if(it){var A2=aqAnchor(AQLK);if(A2){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.5+.3*Math.sin(t*6);ctx.drawImage(glow('255,230,120'),A2.x-r*8,A2.y-r*8,r*16,r*16);ctx.restore()}}}}catch(e){}}
var drawHouseAQ=drawHouse;drawHouse=function(){var r=drawHouseAQ.apply(this,arguments);aqDrawLights();return r};
/* 꾸미기 도구 줄에 버튼 2개 */
(function(){var tl=$('ddTools'),st=$('dtStore');if(!tl||$('dtLink'))return;
  function mk(id,svg){var b=document.createElement('button');b.type='button';b.id=id;b.innerHTML=svg+'<span></span>';tl.insertBefore(b,st);return b}
  mk('dtLink','<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 6c4 5 15 5 19 0" fill="none" stroke="#0B2C4A" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="7" cy="12" rx="2.2" ry="3" fill="#FF5A5A" stroke="#0B2C4A" stroke-width="1.5"/><ellipse cx="12" cy="13.2" rx="2.2" ry="3" fill="#FFD23F" stroke="#0B2C4A" stroke-width="1.5"/><ellipse cx="17" cy="12" rx="2.2" ry="3" fill="#5AA9FF" stroke="#0B2C4A" stroke-width="1.5"/></svg>');
  mk('dtUnlink','<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 7c3 4 7 4.5 8 4.4M13.5 11.4c1 .1 5-.4 8-4.4" fill="none" stroke="#0B2C4A" stroke-width="1.8" stroke-linecap="round"/><path d="M8 15l8 6M16 15l-8 6" stroke="#E5386B" stroke-width="2.4" stroke-linecap="round"/></svg>');
  $('dtLink').addEventListener('click',function(){var it=DS().placed[deco.sel];if(!it)return;if(AQLK){AQLK=null;banner(T('취소했어요'),'');decoTools();return}AQLK=aqU(it);persist();banner(T('이을 소품이나 집을 눌러요'),T('전구 줄 하나에 진주 ')+AQL_COST);decoTools()});
  $('dtUnlink').addEventListener('click',function(){var it=DS().placed[deco.sel];if(!it||!it.u)return;var u=it.u,n0=AQL().length;save.aqL=AQL().filter(function(s){return s.a!==u&&s.b!==u});if(save.aqL.length!==n0){persist();banner(T('전구 줄을 뗐어요'),'');try{svSnd('bub')}catch(e){}}AQLK=null;decoTools()})})();
var decoToolsAQ=decoTools;decoTools=function(){var r=decoToolsAQ.apply(this,arguments);try{var it=deco.sel>=0?DS().placed[deco.sel]:null,a=$('dtLink'),b=$('dtUnlink');if(a){a.lastChild.textContent=AQLK?T('취소'):T('전구 줄');a.classList.toggle('on',!!AQLK)}
  if(b){b.lastChild.textContent=T('줄 빼기');b.hidden=!(it&&it.u&&AQL().some(function(s){return s.a===it.u||s.b===it.u}))}}catch(e){}return r};
/* 잇는 중이면 다음 누르기가 상대 고르기 */
var decoDownAQ=decoDown;decoDown=function(e){if(!AQLK)return decoDownAQ.apply(this,arguments);
  try{var wx=s2wx(e.clientX),wy=s2wy(e.clientY),i=decoHit(wx,wy),from=AQLK,to=null;if(i>=0)to=aqU(DS().placed[i]);else if(houseHit(wx,wy)&&HS().lv)to='h';
    AQLK=null;if(to&&to!==from){if(aqLink(from,to)){persist();crumb('aqL');try{svSnd('gem');buzz([15,25,15])}catch(x){}banner(T('전구 줄을 이었어요'),T('진주 ')+'-'+AQL_COST)}}else if(to===from)banner(T('같은 소품끼리는 못 이어요'),'');else banner(T('취소했어요'),'');
    if(i>=0)deco.sel=i;decoTools();refreshTank()}catch(x){AQLK=null}return true};
var decoEndAQ=decoEnd;decoEnd=function(){AQLK=null;try{aqPrune()}catch(e){}return decoEndAQ.apply(this,arguments)};
/* 트리를 받은 사람: 트리 ↔ 집 첫 줄 무료(한 번) */
function aqFirstLink(){try{if(save.aqL1)return;var it=xmTreeIt();if(!it||!HS().lv)return;save.aqL1=1;if(aqLink(aqU(it),'h',true)){persist();try{refreshTank()}catch(e){}if(page==='tank')banner(T('전구 줄을 이었어요'),T('트리와 집을 전구 줄로 이어 드렸어요'))}}catch(e){}}
setInterval(aqFirstLink,20000);setTimeout(aqFirstLink,9000);
/* --- ② 해저 궁전 증축 --- */
var PAL=[{c:30000},{c:42000},{c:60000},{c:85000},{c:120000}],PAL_FX=['탑을 잇는 전구 줄','탑 깃발','떠오르는 진주 반짝이','꼭대기 빛기둥','황금 왕관'];
function palS(){var o=HS();return o.lv>=5?clamp(o.ps|0,0,PAL.length):0}
var houseRateAtAQ=houseRateAt;houseRateAt=function(lv){var r=houseRateAtAQ.apply(this,arguments);try{if(lv>=5){var s=palS();if(s)r=Math.round(r*(1+.12*s))}}catch(e){}return r};
function palUp(){var o=houseSettle();if(o.lv<5)return;var s=palS();if(s>=PAL.length)return;var c={cur:'pearls',price:PAL[s].c};if(!pay(c)){short(c);return}
  o.ps=s+1;o.at=Date.now();persist();crumb('palace:'+o.ps);var p=housePos();tankPops.push({x:p.x,y:p.y-p.h*1.1,txt:'★'+o.ps,life:1.8,sm:1});try{buzz([30,40,60]);svSnd('lvl')}catch(e){}
  banner(T('궁전을 증축했어요!')+' ★'+o.ps,T(PAL_FX[s])+' · '+T('진주 샘 +')+(12*o.ps)+'%');houseClose();refreshTank();refreshHome(true)}
var houseOpenAQ=houseOpen;houseOpen=function(){var r=houseOpenAQ.apply(this,arguments);try{var o=HS(),b=$('hsPal');if(!b){b=document.createElement('button');b.className='btn';b.id='hsPal';b.type='button';b.addEventListener('click',palUp);$('hsUp').parentNode.insertBefore(b,$('hsUp').nextSibling)}
  if(o.lv<5){b.hidden=true;return r}var s=palS();$('hsName').textContent=HOUSE[5].n+(s?' ★'+s:'')+' Lv.5';b.textContent='';
  if(s<PAL.length){var c={cur:'pearls',price:PAL[s].c};b.appendChild(document.createTextNode(T('궁전 증축 → ')+'★'+(s+1)+' '));b.appendChild(costEl(c));b.disabled=!canPay(c);b.hidden=false;
    $('hsNext').textContent=T('다음 증축: ')+T(PAL_FX[s])+' · '+T('진주 샘 +')+(12*(s+1))+'%'}
  else{b.hidden=true;$('hsNext').textContent=T('완성된 궁전이에요!')+' ★★★★★'}}catch(e){}return r};
/* 궁전 그림 위 효과 (houseFx 안: 집 가운데 아래가 0,0 · 그림 왼쪽 위 = (-iw/2, -ih*.965)) */
var PAL_PT={top:[.5,.03],l:[.19,.27],r:[.81,.27]};
function palXY(q,iw,ih){return [-iw/2+q[0]*iw,-ih*.965+q[1]*ih]}
var houseFxAQ=houseFx;houseFx=function(lv,iw,ih){var r=houseFxAQ.apply(this,arguments);try{if(lv<5)return r;var s=palS();if(!s)return r;var c=ctx,T0=palXY(PAL_PT.top,iw,ih),L0=palXY(PAL_PT.l,iw,ih),R0=palXY(PAL_PT.r,iw,ih),u=iw/420;
  if(s>=4){c.save();c.globalCompositeOperation='lighter';var cols=['255,120,160','255,220,120','120,220,255','170,140,255'];for(var k=0;k<4;k++){var a=-Math.PI/2+Math.sin(t*.35+k*1.6)*.55;c.save();c.translate(T0[0],T0[1]);c.rotate(a+Math.PI/2);var g=c.createLinearGradient(0,0,0,-ih*1.1);g.addColorStop(0,'rgba('+cols[k]+',.5)');g.addColorStop(1,'rgba('+cols[k]+',0)');c.fillStyle=g;c.beginPath();c.moveTo(-iw*.025,0);c.lineTo(-iw*.12,-ih*1.1);c.lineTo(iw*.12,-ih*1.1);c.lineTo(iw*.025,0);c.closePath();c.globalAlpha=.6+.25*Math.sin(t*1.3+k);c.fill();c.restore()}c.restore()}
  if(s>=3){c.save();c.globalCompositeOperation='lighter';for(var j=0;j<14;j++){var ph=((t*.18+j/14)%1+1)%1,x=-iw*.5+iw*h2(j,331,1)+Math.sin(t*1.3+j)*iw*.03,y=-ih*.1-ph*ih*1.05,rr=(2.5+3*h2(j,331,2))*u*2;c.globalAlpha=Math.sin(ph*Math.PI)*.8;c.drawImage(glow('255,245,215'),x-rr*2.5,y-rr*2.5,rr*5,rr*5)}c.restore()}
  if(s>=2){[L0,R0,T0].forEach(function(P0,k){if(k===2&&s>=5)return;var U2=u*2.8,px=P0[0],py=P0[1]-(k===2?8:6)*U2,ph=t*3+k;c.save();c.strokeStyle='#6A4A10';c.lineWidth=Math.max(1,2.2*u);c.beginPath();c.moveTo(px,P0[1]-6*U2);c.lineTo(px,py-14*U2);c.stroke();
    var fw=(k===2?34:28)*U2,fh=(k===2?16:13)*U2,top=py-14*U2;c.beginPath();c.moveTo(px,top);for(var q=0;q<=6;q++){var xx=px+fw*q/6,yy=top+Math.sin(ph+q*.9)*fh*.18;c.lineTo(xx,yy)}c.lineTo(px+fw*.92,top+fh*.5+Math.sin(ph+5)*fh*.18);
    for(q=6;q>=0;q--){c.lineTo(px+fw*q/6,top+fh+Math.sin(ph+q*.9)*fh*.18)}c.closePath();c.fillStyle=k===2?'#E5386B':'#2FB3A8';c.fill();c.lineWidth=Math.max(1,1.6*u);c.strokeStyle='#0B2C4A';c.stroke();
    c.beginPath();c.arc(px,top-2*U2,3*U2,0,Math.PI*2);c.fillStyle='#FFD34D';c.fill();c.restore()})}
  if(s>=1){var rb=Math.max(2.4,iw*.016);aqString(c,L0[0],L0[1]+ih*.1,T0[0],T0[1]+ih*.22,0,rb,1);aqString(c,T0[0],T0[1]+ih*.22,R0[0],R0[1]+ih*.1,0,rb,7);aqString(c,L0[0],L0[1]+ih*.3,R0[0],R0[1]+ih*.3,1,rb,4)}
  if(s>=5){var cx=T0[0],cy=T0[1]+ih*.03+Math.sin(t*1.6)*ih*.004,cw2=iw*.2,chh=iw*.12;c.save();c.globalCompositeOperation='lighter';c.globalAlpha=.5+.2*Math.sin(t*2.2);c.drawImage(glow('255,215,110'),cx-cw2*1.2,cy-chh*1.9,cw2*2.4,cw2*2.4);c.restore();
    c.save();c.beginPath();c.moveTo(cx-cw2/2,cy);c.lineTo(cx-cw2/2,cy-chh*.75);c.lineTo(cx-cw2*.25,cy-chh*.35);c.lineTo(cx,cy-chh);c.lineTo(cx+cw2*.25,cy-chh*.35);c.lineTo(cx+cw2/2,cy-chh*.75);c.lineTo(cx+cw2/2,cy);c.closePath();
    var g2=c.createLinearGradient(0,cy-chh,0,cy);g2.addColorStop(0,'#FFF3A0');g2.addColorStop(1,'#E0A21E');c.fillStyle=g2;c.fill();c.lineWidth=Math.max(1.2,iw*.008);c.strokeStyle='#6A4A10';c.stroke();
    [[-.5,-.75,'#FFFFFF'],[0,-1,'#FF5A8A'],[.5,-.75,'#FFFFFF'],[0,-.35,'#5AA9FF']].forEach(function(q){c.beginPath();c.arc(cx+q[0]*cw2,cy+q[1]*chh,Math.max(1.6,iw*.012),0,Math.PI*2);c.fillStyle=q[2];c.fill();c.lineWidth=1;c.stroke()});c.restore()}}catch(e){}return r};
(function(){var st=document.createElement('style');st.textContent='#dtLink.on{background:#FFF4D6!important;box-shadow:inset 0 0 0 2.5px #E3B95A!important}#hsPal{background:linear-gradient(180deg,#FFD25A,#F08A12)!important;color:#fff!important;-webkit-text-stroke:0!important;text-shadow:0 2px 0 rgba(120,50,0,.55)!important}';document.head.appendChild(st)})();
