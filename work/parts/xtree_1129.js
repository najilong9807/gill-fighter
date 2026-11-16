/* ===== 1.1.29 늑구 '트리 꾸미기가 동그란 데 눌러서 하는 거라 재미없음 · 꾸미기 템 별의별것 다 넣고 알아서 갖다 붙게 · 트리는 집 양쪽 · 전구 줄 너무 밤티'
   참고: 트리 꾸미기 앱들의 공통점 — 아래 서랍에서 끌어다 트리 아무 데나 놓기 · 단 장식은 살랑 흔들림 · 누르면 흔들 · 불 끄고 보기 · 맨 위 별 · 줄(갈런드) · 자동 꾸미기
   ① 자리 칸 없앰: 장식을 끌어다 트리 위 아무 데나 놓으면 트리 모양(그림의 잎 부분)에 알아서 붙음. 단 장식도 끌어서 옮기고, 트리 밖으로 끌어내면 다시 서랍으로
   ② 장식 종류: 원래 36가지 + 새 바다 장식(진주 · 불가사리 · 하트 · 달 · 리본 2 · 사탕 · 소라) + 반짝이 줄 4 · 트리 전구 3 + 내 물고기 미니 장식(가진 물고기 전부, 무료)
   ③ 「알아서 꾸미기」: 가진 장식을 트리 전체에 고르게 · 장식이 적으면 내 물고기로 채움 / 「모두 떼기」 / 「불 끄기」(밤에 보는 트리)
   ④ 수족관: 트리가 집 양쪽에 하나씩(같은 장식, 오른쪽은 좌우 반전) — 한 번만 자리 잡아 드리고 그 뒤는 마음대로 옮김
   ⑤ 전구 줄 새 그림: 유리 전구(빛 반사 · 금속 꼭지) · 꼬인 전깃줄 · 은은한 깜빡임
   저장: save.xmTree.f = [{k, u, v, s}] (u · v는 트리 그림 안 0~1). 예전 자리 칸(s)은 처음 한 번 f로 옮기고 비움 ===== */
var XT_NEW=[['p_pearl','진주',140],['p_star','불가사리',160],['p_heart','하트 방울',140],['p_moon','달 방울',160],['p_ribbon','빨간 리본',150],['p_gribbon','금빛 리본',170],['p_candy','알사탕',120],['p_conch','소라',200]];
var XT_STR=[['g_gold','금빛 반짝이 줄',300],['g_silver','은빛 반짝이 줄',300],['g_red','빨간 구슬 줄',320],['g_pearl','진주 줄',380],['l_multi','알록달록 트리 전구',400],['l_warm','따뜻한 트리 전구',400],['l_ice','얼음 트리 전구',420]];
XT_NEW.forEach(function(q){XORN.push([q[0],q[1]]);XORN_P[q[0]]=q[2]});XT_STR.forEach(function(q){XORN.push([q[0],q[1]]);XORN_P[q[0]]=q[2]});
var XT_MAX=80,XT_SW={};
function xtW(k){var L=XT_WORDS[k]||{};return L[SUBL||LANG]||L.en||L.ko||k}
var XT_WORDS={
 title:{ko:'내 트리 꾸미기',en:'Decorate my tree',ja:'ツリーをかざろう',es:'Decora mi árbol',vi:'Trang trí cây'},
 lead:{ko:'장식을 톡 누르면 트리에 알아서 붙어요 · 위로 끌어 원하는 자리에 · 단 장식은 끌어서 옮기고, 트리 밖으로 빼면 떼어져요',en:'Tap an ornament and it hangs itself · or drag it up to a spot · drag hung ones to move, off the tree to remove',ja:'タップで自動でつきます・上へドラッグで好きな場所に・外へ出すと外れます',es:'Toca un adorno y se cuelga solo · o arrástralo hacia arriba · sácalo del árbol para quitarlo',vi:'Chạm để tự treo · hoặc kéo lên chỗ muốn treo · kéo ra ngoài để gỡ'},
 t_orn:{ko:'방울 · 장식',en:'Ornaments',ja:'かざり',es:'Adornos',vi:'Đồ treo'},
 t_fish:{ko:'내 물고기',en:'My fish',ja:'わたしの魚',es:'Mis peces',vi:'Cá của tôi'},
 t_str:{ko:'줄 · 전구',en:'Garlands · lights',ja:'モール・電球',es:'Guirnaldas · luces',vi:'Dây · đèn'},
 t_shop:{ko:'장식 가게',en:'Shop',ja:'ショップ',es:'Tienda',vi:'Cửa hàng'},
 auto:{ko:'✨ 알아서 꾸미기',en:'✨ Auto-decorate',ja:'✨ おまかせ',es:'✨ Decorar solo',vi:'✨ Tự trang trí'},
 clear:{ko:'모두 떼기',en:'Remove all',ja:'ぜんぶ外す',es:'Quitar todo',vi:'Gỡ hết'},
 night:{ko:'🌙 불 끄기',en:'🌙 Lights off',ja:'🌙 消灯',es:'🌙 Apagar',vi:'🌙 Tắt đèn'},
 day:{ko:'☀️ 불 켜기',en:'☀️ Lights on',ja:'☀️ 点灯',es:'☀️ Encender',vi:'☀️ Bật đèn'},
 close:{ko:'닫기',en:'Close',ja:'閉じる',es:'Cerrar',vi:'Đóng'},
 none:{ko:'가진 장식이 없어요 · 장식 가게에서 진주로 사거나 「내 물고기」를 달아 보세요',en:'No ornaments yet · buy some in the shop or hang “My fish”',ja:'かざりがありません・ショップで買うか「わたしの魚」をつけよう',es:'Sin adornos · cómpralos en la tienda o cuelga “Mis peces”',vi:'Chưa có đồ trang trí · mua ở cửa hàng hoặc treo “Cá của tôi”'},
 full:{ko:'트리가 꽉 찼어요',en:'The tree is full',ja:'ツリーがいっぱいです',es:'El árbol está lleno',vi:'Cây đã đầy'},
 hung:{ko:'달린 장식 ',en:'Hung ',ja:'かざり ',es:'Colgados ',vi:'Đã treo '},
 autoDone:{ko:'트리를 꾸몄어요!',en:'Tree decorated!',ja:'ツリーをかざりました！',es:'¡Árbol decorado!',vi:'Đã trang trí cây!'},
 autoNone:{ko:'달 장식이 없어요',en:'Nothing to hang',ja:'つけるかざりがありません',es:'Nada que colgar',vi:'Không có gì để treo'},
 own:{ko:'보유 ',en:'Own ',ja:'所持 ',es:'Tienes ',vi:'Có '},
 free:{ko:'무료',en:'Free',ja:'無料',es:'Gratis',vi:'Miễn phí'},
 drop:{ko:'트리 위에 놓아요',en:'Drop it on the tree',ja:'ツリーの上で離してね',es:'Suéltalo sobre el árbol',vi:'Thả lên cây'}};
abyTr(TRT,{'진주':'Pearl','불가사리':'Starfish','하트 방울':'Heart bauble','달 방울':'Moon bauble','빨간 리본':'Red bow','금빛 리본':'Gold bow','알사탕':'Candy','소라':'Conch','금빛 반짝이 줄':'Gold tinsel','은빛 반짝이 줄':'Silver tinsel','빨간 구슬 줄':'Red bead garland','진주 줄':'Pearl garland','알록달록 트리 전구':'Colorful tree lights','따뜻한 트리 전구':'Warm tree lights','얼음 트리 전구':'Icy tree lights'});
abyTr(TRJ,{'진주':'真珠','불가사리':'ヒトデ','하트 방울':'ハートのボール','달 방울':'月のボール','빨간 리본':'赤いリボン','금빛 리본':'金のリボン','알사탕':'あめ玉','소라':'サザエ','금빛 반짝이 줄':'金のモール','은빛 반짝이 줄':'銀のモール','빨간 구슬 줄':'赤いビーズ','진주 줄':'真珠のひも','알록달록 트리 전구':'カラフル電球','따뜻한 트리 전구':'あたたか電球','얼음 트리 전구':'こおり電球'});
if(SUBL==='es')abyTr(TRX,{'진주':'Perla','불가사리':'Estrella de mar','하트 방울':'Bola corazón','달 방울':'Bola luna','빨간 리본':'Lazo rojo','금빛 리본':'Lazo dorado','알사탕':'Caramelo','소라':'Caracola','금빛 반짝이 줄':'Espumillón dorado','은빛 반짝이 줄':'Espumillón plateado','빨간 구슬 줄':'Guirnalda roja','진주 줄':'Guirnalda de perlas','알록달록 트리 전구':'Luces de colores','따뜻한 트리 전구':'Luces cálidas','얼음 트리 전구':'Luces de hielo'});
else if(SUBL==='vi')abyTr(TRX,{'진주':'Ngọc trai','불가사리':'Sao biển','하트 방울':'Quả tim','달 방울':'Quả trăng','빨간 리본':'Nơ đỏ','금빛 리본':'Nơ vàng','알사탕':'Kẹo','소라':'Ốc','금빛 반짝이 줄':'Dây kim tuyến vàng','은빛 반짝이 줄':'Dây kim tuyến bạc','빨간 구슬 줄':'Dây hạt đỏ','진주 줄':'Dây ngọc trai','알록달록 트리 전구':'Đèn nhiều màu','따뜻한 트리 전구':'Đèn ấm','얼음 트리 전구':'Đèn băng'});

/* ---- 저장 · 옮기기 ---- */
function xtF(){var o=XT();if(!Array.isArray(o.f)){o.f=[];(o.s||[]).forEach(function(k,i){if(k&&XSLOT[i])o.f.push({k:k,u:XSLOT[i][0],v:XSLOT[i][1]})});o.s=[]}return o.f}
function xtKind(k){return k.indexOf('f:')===0?'fish':k.indexOf('g_')===0?'gar':k.indexOf('l_')===0?'light':'orn'}
function xtName(k){if(k.indexOf('f:')===0){var L=byId(k.slice(2));return L?L.name:''}var q=XORN.filter(function(x){return x[0]===k})[0];return q?T(q[1]):k}

/* ---- 트리 모양(잎 부분) ---- */
var XT_MASK=null;
function xtMask(){if(XT_MASK)return XT_MASK;var im=xmSpr('dc_xm_mytree');if(!im)return null;var W=48,H=64,m=[];try{var c=document.createElement('canvas');c.width=W;c.height=H;var x=c.getContext('2d');x.drawImage(im,0,0,W,H);var d=x.getImageData(0,0,W,H).data;for(var i=0;i<W*H;i++)m.push(d[i*4+3]>110?1:0)}catch(e){m=[];for(var yy=0;yy<H;yy++)for(var xx=0;xx<W;xx++){var v=yy/H,hw=v<.06?0:Math.min(.46,(v-.04)*.55);m.push(Math.abs(xx/W-.5)<hw&&v<.88?1:0)}}
  for(var j=0;j<W*H;j++){var yy2=Math.floor(j/W);if(yy2/H>.8)m[j]=0}XT_MASK={w:W,h:H,m:m};return XT_MASK}
function xtIn(u,v){var M=xtMask();if(!M)return u>.15&&u<.85&&v>.08&&v<.85;var x=Math.floor(u*M.w),y=Math.floor(v*M.h);if(x<0||y<0||x>=M.w||y>=M.h)return false;return !!M.m[y*M.w+x]}
function xtSnap(u,v,far){if(xtIn(u,v))return [u,v];var M=xtMask(),best=null,bd=far||.16;if(!M)return null;for(var y=0;y<M.h;y++)for(var x=0;x<M.w;x++){if(!M.m[y*M.w+x])continue;var uu=(x+.5)/M.w,vv=(y+.5)/M.h,d=Math.hypot((uu-u)*.8,vv-v);if(d<bd){bd=d;best=[uu,vv]}}
  if(!best)return null;var cu=.5+(best[0]-.5)*.92;return [cu,best[1]]}
function xtGood(u,v){if(v<.12||v>.76||!xtIn(u,v))return false;var R=xtRow(v),ins=(R[1]-R[0])*.12;return u>R[0]+ins&&u<R[1]-ins}
function xtRow(v){var M=xtMask(),y=clamp(Math.floor(v*(M?M.h:64)),0,(M?M.h:64)-1),l=1,r=0;if(!M)return [.5-.3*v,.5+.3*v];for(var x=0;x<M.w;x++)if(M.m[y*M.w+x]){l=Math.min(l,x/M.w);r=Math.max(r,(x+1)/M.w)}return l<r?[l,r]:[.45,.55]}

/* ---- 그리기 ---- */
var XT_BULB={};
function xtBulbSpr(col){var o=XT_BULB[col];if(o)return o;var c=document.createElement('canvas');c.width=40;c.height=64;var x=c.getContext('2d');
  x.fillStyle='#7A8794';x.fillRect(13,2,14,12);x.fillStyle='#C9D3DC';x.fillRect(15,3,4,10);x.strokeStyle='#3A4652';x.lineWidth=2;x.strokeRect(13,2,14,12);
  var g=x.createRadialGradient(16,30,3,20,36,22);g.addColorStop(0,'#FFFFFF');g.addColorStop(.25,col);g.addColorStop(1,shade(col,-.35));x.beginPath();x.moveTo(13,14);x.bezierCurveTo(2,26,6,52,20,61);x.bezierCurveTo(34,52,38,26,27,14);x.closePath();x.fillStyle=g;x.fill();x.lineWidth=2;x.strokeStyle='rgba(20,30,40,.65)';x.stroke();
  x.globalAlpha=.75;x.fillStyle='#FFFFFF';x.beginPath();x.ellipse(14,30,3,8,-.25,0,Math.PI*2);x.fill();XT_BULB[col]=c;return c}
function shade(hex,k){var n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;function f(v){return clamp(Math.round(k<0?v*(1+k):v+(255-v)*k),0,255)}return 'rgb('+f(r)+','+f(g)+','+f(b)+')'}
/* 전구 줄 새 그림: 수족관 소품 사이 줄(aqString)이 부르는 전구 */
aqBulb=function(c,x,y,r,pal,i){var P=AQB[pal]||AQB[0],q=P[i%P.length],on=.55+.45*Math.max(0,Math.sin(t*2.2+i*1.3)),sp=xtBulbSpr(q[0]),h=r*2.6,w=h*sp.width/sp.height,a=(i%2?.18:-.18)+Math.sin(t*1.3+i)*.05;
  c.save();c.globalCompositeOperation='lighter';c.globalAlpha*=.55*on;c.drawImage(glow(q[1]),x-r*3.4,y-r*2.6,r*6.8,r*6.8);c.restore();
  c.save();c.translate(x,y-r*.9);c.rotate(a);c.drawImage(sp,-w/2,0,w,h);c.restore()};
var aqStringXT=aqString;aqString=function(c,x0,y0,x1,y1,pal,r,seed){var dx=x1-x0,dy=y1-y0,d=Math.hypot(dx,dy);if(d<4)return;var sag=clamp(d*.2,10,110)+Math.sin(t*.8+seed)*2,mx=(x0+x1)/2,my=(y0+y1)/2+sag,k,n;
  c.save();c.lineCap='round';c.beginPath();c.moveTo(x0,y0);c.quadraticCurveTo(mx,my,x1,y1);c.lineWidth=Math.max(1.6,r*.42);c.strokeStyle='#123A22';c.stroke();
  c.setLineDash([Math.max(2,r*.5),Math.max(2,r*.5)]);c.lineWidth=Math.max(.8,r*.18);c.strokeStyle='rgba(120,190,130,.65)';c.stroke();c.setLineDash([]);c.restore();
  n=Math.max(2,Math.round(d/(r*4.2)));for(k=1;k<n;k++){var u=k/n,a=(1-u)*(1-u),b=2*(1-u)*u,e=u*u;aqBulb(c,a*x0+b*mx+e*x1,a*y0+b*my+e*y1+r*.6,r,pal,k+(seed|0))}};
var XT_GC={g_gold:['#FFD45A','#FFF3B0','#C9952A'],g_silver:['#DDE7F0','#FFFFFF','#9AA9B8'],g_red:['#E53B4C','#FF9AA6','#9C1E2C'],g_pearl:['#FFF7F0','#FFFFFF','#D8C8BE']};
var XT_LC={l_multi:['#FF5A5A','#FFD23F','#5EDB6A','#5AA9FF','#FF8AD6'],l_warm:['#FFD86B','#FFE9A8','#FFC24A'],l_ice:['#9FE6FF','#FFFFFF','#5AA9FF']};
function xtSwag(v,X0,Y0,W,H,dip){var R=xtRow(v),l=X0+R[0]*W+W*.03,r=X0+R[1]*W-W*.03,y=Y0+v*H;return {x0:l,y0:y-H*.03,x1:r,y1:y+H*.03,mx:(l+r)/2,my:y+H*(dip||.05)}}
function xtQ(S,u){var a=(1-u)*(1-u),b=2*(1-u)*u,e=u*u;return [a*S.x0+b*S.mx+e*S.x1,a*S.y0+b*S.my+e*S.y1]}
function xtDrawOne(c,it,x,y,sz,night,seed){var k=it.k,kd=xtKind(k),i,n;
  if(kd==='fish'){var L=byId(k.slice(2));if(!L)return;c.save();c.strokeStyle='rgba(255,230,160,.9)';c.lineWidth=Math.max(.8,sz*.03);c.beginPath();c.moveTo(x,y-sz*.55);c.lineTo(x,y-sz*.18);c.stroke();try{drawFish(c,x,y,sz*.36,0,L,{px:sz*.36,phase:t*3+seed})}catch(e){}c.restore();return}
  if(k==='star'||k==='bell'||k==='p_star'||k==='p_moon'){c.save();c.globalCompositeOperation='lighter';c.globalAlpha*=(night?.8:.35)+.2*Math.sin(t*3+seed);c.drawImage(glow('255,220,120'),x-sz,y-sz*.6,sz*2,sz*2);c.restore()}
  if(k.indexOf('p_')===0){xtDrawP(c,k,x,y,sz,seed);return}
  if(night){c.save();c.globalCompositeOperation='lighter';c.globalAlpha*=.25;c.drawImage(glow('255,240,200'),x-sz*.7,y-sz*.3,sz*1.4,sz*1.4);c.restore()}
  xmOrnDraw(c,k,x,y,sz)}
function xtDrawP(c,k,x,y,sz,seed){var r=sz*.32,cy=y+sz*.18;c.save();c.lineWidth=Math.max(1,sz*.035);c.strokeStyle='rgba(255,230,160,.9)';c.beginPath();c.moveTo(x,y-sz*.18);c.lineTo(x,cy-r);c.stroke();c.lineWidth=Math.max(1,sz*.05);c.strokeStyle='#0B2C4A';
  if(k==='p_pearl'){var g=c.createRadialGradient(x-r*.35,cy-r*.35,r*.1,x,cy,r);g.addColorStop(0,'#FFFFFF');g.addColorStop(.6,'#F3E9F4');g.addColorStop(1,'#C9B8D6');c.beginPath();c.arc(x,cy,r,0,Math.PI*2);c.fillStyle=g;c.fill();c.stroke()}
  else if(k==='p_heart'){c.beginPath();c.moveTo(x,cy+r);c.bezierCurveTo(x-r*1.6,cy-r*.2,x-r*.6,cy-r*1.3,x,cy-r*.4);c.bezierCurveTo(x+r*.6,cy-r*1.3,x+r*1.6,cy-r*.2,x,cy+r);c.fillStyle='#FF5C8A';c.fill();c.stroke();c.fillStyle='rgba(255,255,255,.7)';c.beginPath();c.ellipse(x-r*.45,cy-r*.35,r*.18,r*.3,-.5,0,Math.PI*2);c.fill()}
  else if(k==='p_moon'){c.beginPath();c.arc(x,cy,r,Math.PI*.35,Math.PI*1.65);c.arc(x+r*.45,cy-r*.05,r*.78,Math.PI*1.55,Math.PI*.45,true);c.closePath();c.fillStyle='#FFE27A';c.fill();c.stroke()}
  else if(k==='p_star'){c.beginPath();for(var i=0;i<10;i++){var a=-Math.PI/2+i*Math.PI/5+Math.sin(t+seed)*.05,rr=i%2?r*.45:r*1.1;c[i?'lineTo':'moveTo'](x+Math.cos(a)*rr,cy+Math.sin(a)*rr)}c.closePath();c.fillStyle='#FF8A4C';c.fill();c.stroke();c.fillStyle='#FFD0A8';for(i=0;i<5;i++){var a2=-Math.PI/2+i*Math.PI*2/5;c.beginPath();c.arc(x+Math.cos(a2)*r*.5,cy+Math.sin(a2)*r*.5,r*.09,0,Math.PI*2);c.fill()}}
  else if(k==='p_ribbon'||k==='p_gribbon'){var col=k==='p_ribbon'?'#E53B4C':'#F2B53A';c.fillStyle=col;[-1,1].forEach(function(s){c.beginPath();c.moveTo(x,cy);c.quadraticCurveTo(x+s*r*1.4,cy-r*1.1,x+s*r*1.2,cy+r*.2);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(x,cy);c.lineTo(x+s*r*.7,cy+r*1.2);c.lineTo(x+s*r*.25,cy+r*1.1);c.closePath();c.fill();c.stroke()});c.beginPath();c.arc(x,cy,r*.3,0,Math.PI*2);c.fill();c.stroke()}
  else if(k==='p_candy'){c.beginPath();c.arc(x,cy,r*.75,0,Math.PI*2);c.fillStyle='#FFFFFF';c.fill();c.save();c.clip();c.strokeStyle='#E53B4C';c.lineWidth=r*.3;for(var j=-2;j<=2;j++){c.beginPath();c.arc(x,cy,r*.75,j*1.25+t*.3,j*1.25+t*.3+.6);c.lineTo(x,cy);c.stroke()}c.restore();c.beginPath();c.arc(x,cy,r*.75,0,Math.PI*2);c.lineWidth=Math.max(1,sz*.05);c.strokeStyle='#0B2C4A';c.stroke();
    c.fillStyle='#FFD1DA';[-1,1].forEach(function(s){c.beginPath();c.moveTo(x+s*r*.7,cy);c.lineTo(x+s*r*1.3,cy-r*.45);c.lineTo(x+s*r*1.3,cy+r*.45);c.closePath();c.fill();c.stroke()})}
  else if(k==='p_conch'){var g2=c.createLinearGradient(x-r,cy,x+r,cy);g2.addColorStop(0,'#FFE3C8');g2.addColorStop(1,'#E59B7A');c.beginPath();c.moveTo(x,cy-r*1.1);c.quadraticCurveTo(x+r*1.3,cy-r*.2,x+r*.3,cy+r*1.1);c.quadraticCurveTo(x-r*1.2,cy+r*.6,x,cy-r*1.1);c.fillStyle=g2;c.fill();c.stroke();c.strokeStyle='rgba(120,60,40,.6)';for(var q=1;q<4;q++){c.beginPath();c.arc(x+r*.1,cy+r*.1,r*q*.28,-1,1.3);c.stroke()}}
  c.restore()}
function xtDrawStr(c,it,X0,Y0,W,H,night,idx){var k=it.k,S=xtSwag(it.v,X0,Y0,W,H),i,n,P;
  if(xtKind(k)==='gar'){var G=XT_GC[k]||XT_GC.g_gold;c.save();c.lineCap='round';c.beginPath();c.moveTo(S.x0,S.y0);c.quadraticCurveTo(S.mx,S.my,S.x1,S.y1);c.lineWidth=W*.028;c.strokeStyle=G[2];c.stroke();c.lineWidth=W*.018;c.strokeStyle=G[0];c.stroke();
    n=k==='g_red'||k==='g_pearl'?16:30;for(i=0;i<=n;i++){P=xtQ(S,i/n);if(k==='g_red'||k==='g_pearl'){c.beginPath();c.arc(P[0],P[1],W*.016,0,Math.PI*2);c.fillStyle=G[0];c.fill();c.lineWidth=1;c.strokeStyle=G[2];c.stroke();c.fillStyle=G[1];c.beginPath();c.arc(P[0]-W*.005,P[1]-W*.005,W*.005,0,Math.PI*2);c.fill()}
      else{c.save();c.translate(P[0],P[1]);c.rotate(i*1.7+Math.sin(t*2+i)*.2);c.fillStyle=(i+Math.floor(t*4))%5?G[0]:G[1];c.fillRect(-W*.004,-W*.02,W*.008,W*.04);c.restore()}}
    if(night){c.globalCompositeOperation='lighter';c.globalAlpha*=.3;for(i=0;i<=6;i++){P=xtQ(S,i/6);c.drawImage(glow('255,230,150'),P[0]-W*.05,P[1]-W*.05,W*.1,W*.1)}}c.restore();return}
  var C=XT_LC[k]||XT_LC.l_multi;c.save();c.lineCap='round';c.beginPath();c.moveTo(S.x0,S.y0);c.quadraticCurveTo(S.mx,S.my,S.x1,S.y1);c.lineWidth=Math.max(1.2,W*.008);c.strokeStyle='#143D24';c.stroke();c.restore();
  n=Math.max(4,Math.round((S.x1-S.x0)/(W*.075)));for(i=0;i<=n;i++){P=xtQ(S,i/n);var col=C[(i+idx)%C.length],on=night?.75+.25*Math.sin(t*3+i*1.9):.45+.25*Math.sin(t*3+i*1.9),r=W*.022,sp=xtBulbSpr(col),hh=r*2.4,ww=hh*sp.width/sp.height;
    c.save();c.globalCompositeOperation='lighter';c.globalAlpha*=on*(night?1:.55);var gc=parseInt(col.slice(1),16);c.drawImage(glow((gc>>16)+','+(gc>>8&255)+','+(gc&255)),P[0]-r*(night?4:3),P[1]-r*(night?3.2:2.4),r*(night?8:6),r*(night?8:6));c.restore();
    c.save();c.translate(P[0],P[1]-r*.5);c.rotate((i%2?.2:-.2));c.drawImage(sp,-ww/2,0,ww,hh);c.restore()}}
/* 트리 한 그루에 장식 전부: (X0,Y0)=트리 그림 왼쪽 위, W×H=그림 크기 */
function xtDrawSet(c,X0,Y0,W,H,o){o=o||{};var F=xtF(),i,base=W*.12;
  for(i=0;i<F.length;i++){var it=F[i],kd=xtKind(it.k);if(kd==='gar'||kd==='light'){if(it!==o.drag)xtDrawStr(c,it,X0,Y0,W,H,o.night,i)}}
  var ord=F.filter(function(it){var kd=xtKind(it.k);return kd==='orn'||kd==='fish'}).sort(function(a,b){return a.v-b.v});
  for(i=0;i<ord.length;i++){var it2=ord[i];if(it2===o.drag)continue;var top=it2.k==='star'&&it2.v<.12,sz=(top?W*.2:base)*(it2.s||1),u=o.flip?1-it2.u:it2.u,x=X0+u*W,y=Y0+it2.v*H-(top?sz*.35:0),sw=XT_SW[F.indexOf(it2)]||0,sd=F.indexOf(it2);
    var ang=top?0:Math.sin(t*1.4+sd*1.7)*.06+sw*Math.sin(t*9);c.save();c.translate(x,y-sz*.55);c.rotate(ang);c.translate(-x,-(y-sz*.55));if(o.night)c.globalAlpha*=1;xtDrawOne(c,it2,x,y,sz,o.night,sd);c.restore()}}
setInterval(function(){for(var k in XT_SW){XT_SW[k]*=.9;if(XT_SW[k]<.01)delete XT_SW[k]}},50);

/* 수족관 트리: 예전 칸 그림 대신 */
var drawDecoItemXT2=drawDecoItem;drawDecoItem=function(D,x,y,w,flip,dim,sd){var r=drawDecoItemXT2.apply(this,arguments);try{if(D&&D.id==='xm_mytree'&&!VISIT){xtF();var o=decoArt(D);if(!o)return r;var c=DART[D.draw],hh=w*(D.ar||1),ai=o.h/o.w,iw=w*(c.kw||1),ih=iw*ai,hk=c.hk||1.3;if(ih>hh*hk){ih=hh*hk;iw=ih/ai}var by=hh*.47;
  ctx.save();ctx.translate(x,y);if(dim)ctx.globalAlpha*=.7;xtDrawSet(ctx,-iw/2,by-ih,iw,ih,{flip:!!flip,night:typeof abyNight==='function'&&abyNight()});ctx.restore()}}catch(e){}return r};
/* 이벤트 창 미리보기 */
xmTreeDraw=function(cv){if(!cv||!cv.getContext)return;var W=cv.clientWidth||300,Hh=cv.clientHeight||150,d=Math.min(2,window.devicePixelRatio||1);if(cv.width!==Math.round(W*d)){cv.width=Math.round(W*d);cv.height=Math.round(Hh*d)}
  var c=cv.getContext('2d');c.setTransform(d,0,0,d,0,0);c.clearRect(0,0,W,Hh);var bg=xmSpr('bg_xmhome');if(bg){var k=W/bg.naturalWidth;c.drawImage(bg,0,(Hh-bg.naturalHeight*k)*.55,W,bg.naturalHeight*k)}else{c.fillStyle='#123A6E';c.fillRect(0,0,W,Hh)}
  var im=xmSpr('dc_xm_mytree');if(im){var th=Hh*.94,tw=th*im.naturalWidth/im.naturalHeight,tx=W*.7-tw/2,ty=Hh-th;c.drawImage(im,tx,ty,tw,th);xtDrawSet(c,tx,ty,tw,th,{})}
  c.font='700 13px sans-serif';c.fillStyle='#FFE27A';c.textAlign='left';c.fillText(T('내 크리스마스 트리'),12,22);c.font='12px sans-serif';c.fillStyle='rgba(255,255,255,.9)';c.fillText(xtW('hung')+xtF().length,12,40);c.fillText('🎁 '+xmOrnN(),12,58)};
xmTreeGiftAmt=function(){return Math.min(180,30+6*Math.min(25,xtF().length))};

/* ---- 꾸미기 창 ---- */
var XTE={tab:'orn',night:false,drag:null,g:null};
(function(){var st=document.createElement('style');st.textContent=
 '#xtP{align-items:flex-start!important;justify-content:center;padding-top:calc(8px + env(safe-area-inset-top,0px))}@media (orientation:landscape) and (max-height:500px){#xtP .xt-stage{height:clamp(150px,52vh,260px)}#xtP .xt-lead{display:none}}#xtP .panel{max-width:520px;padding-bottom:12px;margin-top:30px;max-height:calc(100dvh - 128px - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;overflow:visible}#xtP .panel>*{flex:none}#xtP .xt-body{flex:1 1 auto;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch;margin:0 -4px;padding:0 4px}#xtP .xt-body>*{flex:none}#xtP #xtX{margin-top:8px}'+
 '#xtP .xt-stage{position:relative;height:clamp(170px,34vh,380px);border-radius:18px;overflow:hidden;background:#0E2F56;touch-action:none}#xtP .xt-stage canvas{position:absolute;inset:0;display:block;width:100%;height:100%}#xtP .xt-it canvas{position:static}#xtP .xt-lead{margin:2px 0 8px;font-size:13px}'+
 '#xtP .xt-bar{display:flex;gap:6px;margin:8px 0 6px;flex-wrap:wrap}#xtP .xt-bar button{flex:1 1 auto;min-width:0;border:0;border-radius:12px;padding:8px 6px;font:700 13px system-ui,sans-serif;background:#E8F1F8;color:#0B2C4A}#xtP .xt-bar .hot{background:linear-gradient(180deg,#FFE27A,#F2A52A);color:#3A2400}'+
 '#xtP .xt-tabs{display:flex;gap:4px;background:#2C4459;border-radius:14px;padding:4px;margin-bottom:6px}#xtP .xt-tabs button{flex:1;border:0;border-radius:10px;padding:7px 4px;font:400 14px var(--disp);color:#DCE8F2;background:transparent}#xtP .xt-tabs button[aria-pressed=true]{background:#FFD25C;color:#3A2400}'+
 '#xtP .xt-tray{display:flex;gap:8px;overflow-x:auto;padding:4px 2px 8px;min-height:86px;touch-action:pan-x}#xtP .xt-it{flex:none;width:66px;border:0;border-radius:14px;background:#F3F8FC;box-shadow:0 2px 0 #B8CADB;padding:4px 2px;display:flex;flex-direction:column;align-items:center;gap:2px;touch-action:pan-x;user-select:none;-webkit-user-select:none}'+
 '#xtP .xt-it canvas{width:52px;height:52px}#xtP .xt-it small{font:700 11px system-ui,sans-serif;color:#0B2C4A;max-width:62px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#xtP .xt-it .cost{font-size:11px}#xtP .xt-it[data-poor="1"]{opacity:.55}'+
 '#xtP .xt-none{font:13px system-ui,sans-serif;color:#0B2C4A;opacity:.8;padding:8px}#xtGhost{position:fixed;z-index:9999;pointer-events:none;width:64px;height:64px;margin:-40px 0 0 -32px;filter:drop-shadow(0 6px 6px rgba(0,0,0,.35))}'+
 '#xtP .xt-hint{position:absolute;left:0;right:0;bottom:8px;text-align:center;font:700 13px system-ui,sans-serif;color:#fff;text-shadow:0 1px 3px #000;pointer-events:none}';document.head.appendChild(st)})();
function xtThumb(k){var c=document.createElement('canvas');c.width=104;c.height=104;var x=c.getContext('2d'),real=ctx;x.scale(2,2);ctx=x;try{var kd=xtKind(k);if(kd==='gar'||kd==='light'){var it={k:k,v:.5};var S0=xtSwag;xtSwag=function(){return {x0:4,y0:20,x1:48,y1:20,mx:26,my:38}};try{xtDrawStr(x,it,0,0,52,52,false,0)}finally{xtSwag=S0}}else xtDrawOne(x,{k:k},26,22,40,false,0)}catch(e){}finally{ctx=real}return c}
xmTreeOpen=function(){var el=$('xtP');if(!el){el=document.createElement('div');el.className='overlay';el.id='xtP';el.hidden=true;el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
    el.innerHTML='<div class="panel"><h1></h1><div class="xt-body"><p class="lead xt-lead"></p><div class="xt-stage"><canvas id="xtCv"></canvas><div class="xt-hint" id="xtHint"></div></div><div class="xt-bar"><button type="button" id="xtAuto" class="hot"></button><button type="button" id="xtNight"></button><button type="button" id="xtClear"></button></div><div class="xt-tabs"><button type="button" data-t="orn"></button><button type="button" data-t="fish"></button><button type="button" data-t="str"></button><button type="button" data-t="shop"></button></div><div class="xt-tray" id="xtTray"></div></div><button type="button" class="btn" id="xtX"></button></div>';
    document.body.appendChild(el);$('xtX').addEventListener('click',function(){el.hidden=true;try{xmRender()}catch(e){}try{refreshTank()}catch(e){}});
    el.querySelectorAll('.xt-tabs button').forEach(function(b){b.addEventListener('click',function(){XTE.tab=b.getAttribute('data-t');xtRender()})});
    $('xtAuto').addEventListener('click',xtAuto);$('xtClear').addEventListener('click',xtClear);$('xtNight').addEventListener('click',function(){XTE.night=!XTE.night;xtRender()});
    var cv=$('xtCv');cv.addEventListener('pointerdown',xtCvDown);cv.addEventListener('pointermove',xtMove);cv.addEventListener('pointerup',xtUp);cv.addEventListener('pointercancel',xtUp);
    document.addEventListener('pointermove',function(e){if(XTE.pend)xtPendMove(e);if(XTE.drag&&XTE.drag.from==='tray')xtMove(e)});document.addEventListener('pointerup',function(e){XTE.pend=null;if(XTE.drag&&XTE.drag.from==='tray'){XTE.jd=Date.now();xtUp(e)}});document.addEventListener('pointercancel',function(e){if(XTE.drag&&XTE.drag.from==='tray')xtUp(e)})}
  xtF();xtRender();el.hidden=false;crumb('xtOpen');xtLoop()};
var xtTreeRenderOld=xmTreeRender;xmTreeRender=function(){xtRender()};
function xtLoop(){var el=$('xtP');if(!el||el.hidden)return;xtCvDraw();requestAnimationFrame(xtLoop)}
function xtRender(){var el=$('xtP');if(!el)return;el.querySelector('h1').textContent=xtW('title');el.querySelector('.xt-lead').textContent=xtW('lead');$('xtX').textContent=xtW('close');$('xtAuto').textContent=xtW('auto');$('xtClear').textContent=xtW('clear');$('xtNight').textContent=XTE.night?xtW('day'):xtW('night');
  el.querySelectorAll('.xt-tabs button').forEach(function(b){var k=b.getAttribute('data-t');b.textContent=xtW('t_'+k);b.setAttribute('aria-pressed',k===XTE.tab?'true':'false')});
  var tr=$('xtTray'),o=XT(),any=0;tr.textContent='';
  function card(k,sub,poor,onTap,draggable){var b=document.createElement('div');b.className='xt-it';b.setAttribute('role','button');b.tabIndex=0;b.appendChild(xtThumb(k));var s=document.createElement('small');s.textContent=xtName(k);b.appendChild(s);if(sub)b.appendChild(sub);if(poor)b.dataset.poor='1';b.setAttribute('aria-label',xtName(k));
    if(draggable){b.addEventListener('pointerdown',function(e){xtTrayDown(e,k,b)});b.addEventListener('click',function(){if(Date.now()-(XTE.jd||0)<500)return;xtPlaceOne(k)})}if(onTap)b.addEventListener('click',onTap);tr.appendChild(b);any=1}
  if(XTE.tab==='orn'||XTE.tab==='str'){XORN.forEach(function(q){var k=q[0],kd=xtKind(k);if((XTE.tab==='str')!==(kd==='gar'||kd==='light'))return;var n=o.inv[k]|0;if(n<=0)return;var sm=document.createElement('small');sm.textContent='×'+n;card(k,sm,false,null,true)})}
  else if(XTE.tab==='fish'){(save.owned||[]).forEach(function(id){if(byId(id))card('f:'+id,null,false,null,true)})}
  else{XORN.forEach(function(q){var k=q[0],c={cur:'pearls',price:XORN_P[k]||150},sub=document.createElement('span');sub.className='cost';sub.appendChild(costEl(c));var own=o.inv[k]|0;xtF().forEach(function(it){if(it.k===k)own++});if(own){var i2=document.createElement('small');i2.textContent=xtW('own')+own;sub.appendChild(i2)}
    card(k,sub,!canPay(c),function(){xbtBuy(k)},false)})}
  if(!any){var p=document.createElement('p');p.className='xt-none';p.textContent=xtW('none');tr.appendChild(p)}
  $('xtHint').textContent=XTE.drag?xtW('drop'):''}
xbtBuy=function(k){var c={cur:'pearls',price:XORN_P[k]||150};if(!pay(c)){short(c);return}var o=XT();o.inv[k]=(o.inv[k]|0)+1;persist();crumb('ornBuy:'+k);try{svSnd('gem');buzz([15,25,15])}catch(e){}banner(T('장식을 샀어요'),xtName(k)+' · '+T('트리에 달아 보세요'));xtRender();try{refreshHome&&refreshHome(true)}catch(e){}};
function xtCvDraw(){var cv=$('xtCv');if(!cv)return;var W=cv.clientWidth||300,Hh=cv.clientHeight||300,d=Math.min(2,window.devicePixelRatio||1);if(cv.width!==Math.round(W*d)||cv.height!==Math.round(Hh*d)){cv.width=Math.round(W*d);cv.height=Math.round(Hh*d)}
  var c=cv.getContext('2d');c.setTransform(d,0,0,d,0,0);c.clearRect(0,0,W,Hh);var bg=xmSpr('bg_xmhome');if(bg){var k=Math.max(W/bg.naturalWidth,Hh/bg.naturalHeight);c.drawImage(bg,(W-bg.naturalWidth*k)/2,(Hh-bg.naturalHeight*k)*.6,bg.naturalWidth*k,bg.naturalHeight*k)}else{c.fillStyle='#123A6E';c.fillRect(0,0,W,Hh)}
  var im=xmSpr('dc_xm_mytree');if(!im)return;var th=Hh*.93,tw=th*im.naturalWidth/im.naturalHeight;if(tw>W*.92){tw=W*.92;th=tw*im.naturalHeight/im.naturalWidth}var tx=W/2-tw/2,ty=Hh-th-4;XTE.g={x:tx,y:ty,w:tw,h:th};
  if(XTE.night){c.fillStyle='rgba(2,8,24,.62)';c.fillRect(0,0,W,Hh)}c.save();if(XTE.night)c.filter='brightness(.45)';c.drawImage(im,tx,ty,tw,th);c.restore();
  xtDrawSet(c,tx,ty,tw,th,{night:XTE.night,drag:XTE.drag&&XTE.drag.it});
  var D=XTE.drag;if(D&&D.over){var it=D.it||{k:D.k,u:D.u,v:D.v},kd=xtKind(it.k),pv={k:it.k,u:D.u,v:D.v};c.save();c.globalAlpha=D.ok?.95:.45;if(kd==='gar'||kd==='light')xtDrawStr(c,pv,tx,ty,tw,th,XTE.night,0);else{var top=it.k==='star'&&D.v<.12,sz=(top?tw*.2:tw*.105);xtDrawOne(c,pv,tx+D.u*tw,ty+D.v*th-(top?sz*.35:0),sz,XTE.night,0)}c.restore();
    if(D.ok&&kd!=='gar'&&kd!=='light'){c.beginPath();c.arc(tx+D.u*tw,ty+D.v*th+tw*.02,tw*.07,0,Math.PI*2);c.lineWidth=2;c.setLineDash([4,4]);c.strokeStyle='rgba(255,255,255,.8)';c.stroke();c.setLineDash([])}}}
/* 끌기: 서랍에서 · 트리에서 */
function xtUV(e){var cv=$('xtCv'),rc=cv.getBoundingClientRect(),G=XTE.g;if(!G)return null;var px=e.clientX-rc.left,py=e.clientY-rc.top,inC=px>=0&&py>=0&&px<=rc.width&&py<=rc.height;return {u:(px-G.x)/G.w,v:(py-G.y)/G.h,inC:inC}}
function xtGhost(k,e){var g=$('xtGhost');if(!g){g=document.createElement('canvas');g.id='xtGhost';document.body.appendChild(g)}var th=xtThumb(k);g.width=th.width;g.height=th.height;g.getContext('2d').drawImage(th,0,0);g.style.left=e.clientX+'px';g.style.top=e.clientY+'px';g.hidden=false}
function xtTrayDown(e,k,b){XTE.pend={k:k,sx:e.clientX,sy:e.clientY,mouse:e.pointerType==='mouse'}}
function xtPendMove(e){var P0=XTE.pend;if(!P0||XTE.drag)return;var dx=e.clientX-P0.sx,dy=e.clientY-P0.sy;if(Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)&&!P0.mouse){XTE.pend=null;return}
  if(Math.hypot(dx,dy)>8&&(P0.mouse||(dy<-6&&Math.abs(dy)>=Math.abs(dx)*.8))){XTE.pend=null;if(xtF().length>=XT_MAX){banner(xtW('full'),'');return}XTE.drag={from:'tray',k:P0.k,sx:P0.sx,sy:P0.sy,moved:true,over:false};XTE.jd=Date.now();xtGhost(P0.k,e);xtMove(e)}}
/* 서랍 장식을 톡 누르면 트리의 빈 곳에 알아서 붙음 */
function xtPlaceOne(k){var o=XT(),F=xtF(),kd=xtKind(k);if(F.length>=XT_MAX){banner(xtW('full'),'');return}if(kd!=='fish'&&!((o.inv[k]|0)>0))return;
  if(kd==='gar'||kd==='light'){var rows=F.filter(function(it){var q=xtKind(it.k);return q==='gar'||q==='light'}).map(function(it){return it.v}),cand=[.32,.5,.66,.78,.42,.58,.72],v=cand.filter(function(x){return rows.every(function(r){return Math.abs(r-x)>.07})})[0]||cand[rows.length%7];F.push({k:k,u:.5,v:v})}
  else if(k==='star'&&!F.some(function(it){return it.k==='star'&&it.v<.12}))F.push({k:k,u:.5,v:.04});
  else{var best=null,bs=-1;for(var c=0;c<60;c++){var u=Math.random(),vv=.14+Math.random()*.62;if(!xtGood(u,vv))continue;var dmin=1e9;F.forEach(function(it){var q=xtKind(it.k);if(q==='gar'||q==='light')return;dmin=Math.min(dmin,Math.hypot((it.u-u)*.8,it.v-vv))});if(dmin>bs){bs=dmin;best=[u,vv]}}if(!best)return;F.push({k:k,u:best[0],v:best[1]})}
  XT_SW[F.length-1]=.45;if(kd!=='fish')o.inv[k]--;persist();crumb('xtTap:'+k);try{svSnd('gem');buzz(12)}catch(x){}xtRender()}
function xtHit(e){var p=xtUV(e),G=XTE.g;if(!p||!G)return null;var F=xtF(),best=null,bd=1e9;F.forEach(function(it){var kd=xtKind(it.k),d;if(kd==='gar'||kd==='light'){var R=xtRow(it.v);d=p.u>R[0]&&p.u<R[1]?Math.abs(p.v-it.v-.03)*G.h:1e9;if(d<G.h*.03&&d<bd){bd=d;best=it}return}d=Math.hypot((p.u-it.u)*G.w,(p.v-it.v+.02)*G.h);if(d<G.w*.08&&d<bd){bd=d;best=it}});return best}
function xtCvDown(e){var it=xtHit(e);if(!it)return;var p=xtUV(e);XTE.drag={from:'tree',it:it,k:it.k,sx:e.clientX,sy:e.clientY,moved:false,over:true,u:it.u,v:it.v,ok:true,du:it.u-p.u,dv:it.v-p.v};try{this.setPointerCapture(e.pointerId)}catch(x){}}
function xtMove(e){var D=XTE.drag;if(!D)return;if(Math.hypot(e.clientX-D.sx,e.clientY-D.sy)>6)D.moved=true;var g=$('xtGhost');if(D.from==='tray'&&g){g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'}
  var p=xtUV(e);if(!p)return;var u=p.u+(D.du||0),v=p.v+(D.dv||0),kd=xtKind(D.k);D.over=p.inC;if(kd==='gar'||kd==='light'){D.u=.5;D.v=clamp(v,.18,.84);D.ok=p.inC&&u>-.1&&u<1.1}
  else{var top=D.k==='star'&&v<.2,s=top?[.5,.04]:xtSnap(u,v,.12);D.ok=!!s&&p.inC;if(s){D.u=s[0];D.v=s[1]}else{D.u=u;D.v=v}}if(g&&D.from==='tray')g.hidden=D.over&&D.ok;$('xtHint').textContent=xtW('drop')}
function xtUp(e){var D=XTE.drag;if(!D)return;XTE.drag=null;var g=$('xtGhost');if(g)g.hidden=true;$('xtHint').textContent='';var F=xtF(),o=XT(),kd=xtKind(D.k);
  if(D.from==='tree'&&!D.moved){var i=F.indexOf(D.it);XT_SW[i]=.35;try{svSnd('bub',.6);buzz(8)}catch(x){}return}
  if(D.from==='tree'){if(D.ok&&D.over){D.it.u=D.u;D.it.v=D.v;try{svSnd('bub',.7)}catch(x){}}else{F.splice(F.indexOf(D.it),1);if(kd!=='fish')o.inv[D.k]=(o.inv[D.k]|0)+1;try{svSnd('bub',.5);buzz(10)}catch(x){}}persist();xtRender();return}
  if(!D.ok||!D.over)return;if(kd!=='fish'){if(!((o.inv[D.k]|0)>0))return;o.inv[D.k]--}if(D.k==='star'&&D.v<.12)F.forEach(function(it){if(it.k==='star'&&it.v<.12)it.v=.3});F.push({k:D.k,u:D.u,v:D.v});XT_SW[F.length-1]=.4;persist();crumb('xtHang:'+D.k);try{svSnd('gem');buzz(12)}catch(x){}xtRender()}
/* 알아서 꾸미기: 가진 장식을 트리 전체에 고르게(멀리 떨어진 자리부터), 적으면 내 물고기로 채움 */
function xtAuto(){var o=XT(),F=xtF(),list=[],k;for(k in o.inv){var n=o.inv[k]|0;for(var i=0;i<n;i++)list.push(k)}
  var orn=list.filter(function(k){var kd=xtKind(k);return kd==='orn'}),str=list.filter(function(k){var kd=xtKind(k);return kd==='gar'||kd==='light'});
  var have=F.filter(function(it){var kd=xtKind(it.k);return kd==='orn'||kd==='fish'}).length,want=Math.max(0,14-have-orn.length),fishes=(save.owned||[]).filter(function(id){return byId(id)}).sort(function(){return Math.random()-.5});
  for(var j=0;j<want&&j<fishes.length*2;j++)orn.push('f:'+fishes[j%fishes.length]);
  if(!orn.length&&!str.length){banner(xtW('autoNone'),xtW('none'));return}
  var rows=F.filter(function(it){var kd=xtKind(it.k);return kd==='gar'||kd==='light'}).map(function(it){return it.v});str.forEach(function(k2,i2){var v=[.32,.5,.66,.78,.42,.58,.72][(rows.length+i2)%7];rows.push(v);F.push({k:k2,u:.5,v:v});o.inv[k2]--});
  var si=orn.indexOf('star');if(si>=0&&!F.some(function(it){return it.k==='star'&&it.v<.12})){orn.splice(si,1);F.push({k:'star',u:.5,v:.04});o.inv.star--}
  orn.forEach(function(k3){if(F.length>=XT_MAX)return;var best=null,bs=-1;for(var c=0;c<40;c++){var u=Math.random(),v=.14+Math.random()*.62;if(!xtGood(u,v))continue;var dmin=1e9;F.forEach(function(it){var kd=xtKind(it.k);if(kd==='gar'||kd==='light')return;dmin=Math.min(dmin,Math.hypot((it.u-u)*.8,it.v-v))});if(dmin>bs){bs=dmin;best=[u,v]}}
    if(!best)return;F.push({k:k3,u:best[0],v:best[1]});XT_SW[F.length-1]=.3;if(xtKind(k3)!=='fish')o.inv[k3]--});
  persist();crumb('xtAuto');try{svSnd('lvl');buzz([20,30,20])}catch(x){}banner(xtW('autoDone'),xtW('hung')+F.length);xtRender()}
function xtClear(){var o=XT(),F=xtF();F.forEach(function(it){if(xtKind(it.k)!=='fish')o.inv[it.k]=(o.inv[it.k]|0)+1});F.length=0;persist();try{svSnd('bub')}catch(x){}xtRender()}

/* ---- 수족관: 트리는 집 양쪽(한 번 자리 잡아 드림) ---- */
function xtTwins(){try{if(save.xtTw||VISIT)return;var d=DS(),trees=d.placed.filter(function(q){return q.k==='xm_mytree'&&!q.pv});if(!trees.length)return;if(d.placed.length>=DECO_MAX&&trees.length<2)return;
  var W=TWW(),D=decoById('xm_mytree'),hp=housePos(),hw=Math.max(hp.w,hp.d?hp.d.iw:0)/2,tw=decoW(D,1)/2,xl=clamp((hp.x-hw-tw*.9)/W,.04,.96),xr=clamp((hp.x+hw+tw*.9)/W,.04,.96);
  function yAt(x){return clamp((floorAt(x*W)+ch*.03-decoW(D,1)*decoAR(D)*.42)/ch,.25,.95)}
  var a=trees[0];a.s=1;a.x=xl;a.y=yAt(xl);a.f=0;var b=trees[1];if(!b){b={k:'xm_mytree',s:1,f:1};d.placed.push(b)}b.x=xr;b.y=yAt(xr);b.f=1;b.s=1;
  d.placed=d.placed.filter(function(q){return q.k!=='xm_mytree'||q===a||q===b});d.placed.splice(d.placed.indexOf(a),1);d.placed.splice(d.placed.indexOf(b),1);d.placed.unshift(a,b);
  save.xtTw=1;persist();crumb('xtTwins');try{refreshTank()}catch(x){}}catch(e){}}
var showTabXT=showTab;showTab=function(p){var r=showTabXT.apply(this,arguments);try{if(p==='tank')setTimeout(xtTwins,300)}catch(e){}return r};
setTimeout(function(){try{xmSpr('dc_xm_mytree');xmSpr('bg_xmhome')}catch(e){}},1200);
