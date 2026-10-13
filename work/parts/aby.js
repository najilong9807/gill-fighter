/* ===== 1.1.11 수족관 키우기 2탄(사용자 요청: 힐링 수족관 게임처럼 '노는 방식'만 우리 식으로 — 그림·이름은 모두 새로 그림)
   ① 반짝 산호: 집 옆 바닥의 산호를 톡톡 누르면 반짝이가 튀고, 누른 만큼 산호가 7단계로 자란다(단계마다 진주 샘 +2% · 첫 도달 선물)
      하루 톡톡 진주: 6번마다 1개, 하루 20개까지(그 뒤에도 산호는 계속 자람)
   ② 물고기 교감: 수족관 물고기를 누르면 하트가 뜨고 친밀도가 쌓인다(물고기마다 하루 5번) · ♥1~♥5 · 오를 때 작은 선물
   ③ 손님 도감: 정해진 소품 두 가지를 함께 놓으면 손님 물고기가 찾아온다 → 눌러 인사하면 친구(도감에 들어옴, 이미 있으면 진주 선물)
   ④ 밤(22~6시)엔 물고기들이 천천히 헤엄치며 졸고(z), 오래 비웠다 돌아오면 '다녀오셨어요' 창에서 진주 샘을 받는다(광고 보면 2배) */
function abyTr(t,o){for(var k in o)if(!(k in t))t[k]=o[k]}
abyTr(TRT,{'반짝 산호':'Twinkle Coral','산호 새싹':'Coral Sprout','아기 산호':'Baby Coral','가지 산호':'Branch Coral','큰 가지 산호':'Big Branch Coral','빛 산호':'Glow Coral','무지개 산호':'Rainbow Coral','별빛 산호':'Starlight Coral',
  '톡톡':'Tap!','산호 ':'Coral ','반짝 산호가 자랐어요! ':'Twinkle Coral grew! ','진주 샘 +':'Pearl spring +','% · 선물 진주 +':'% · gift pearls +','오늘 톡톡 진주는 다 모았어요':"You've collected today's tap pearls",'산호는 계속 자라요 · 내일 또 만나요':'The coral keeps growing · see you tomorrow',
  '더 친해졌어요! 선물 진주 +':'Closer friends! Gift pearls +','오늘은 실컷 놀았어요':'Played enough today',
  '누군가 수족관을 기웃거려요!':'Someone is peeking into your aquarium!','반짝이는 손님을 눌러 인사해 봐요':'Tap the sparkling visitor to say hi','친구가 됐어요!':'is now your friend!','도감과 수족관에 들어왔어요':'Added to your collection and aquarium','이미 친구라서 선물을 두고 갔어요 · 진주 +':'Already a friend, so it left a gift · pearls +',
  '손님 도감':'Visitor Book','소품 두 가지를 함께 놓으면 손님 물고기가 찾아와요. 반짝이는 손님을 눌러 인사하면 친구가 돼요':'Place two certain decorations together and a visitor fish drops by. Tap the sparkling visitor to make friends','친구예요':'Friend',
  '말미잘과 주황 산호를 좋아해요':'Loves anemones and orange coral','옛 배와 항아리 사이에 숨고 싶어해요':'Wants to hide between an old ship and a jar','빛나는 것과 동글동글한 것을 좋아해요':'Likes glowing things and round fluffy things','등대 불빛을 따라 돌다리를 건너와요':'Follows the lighthouse to the stone bridge','조용한 정원을 좋아해요':'Loves a quiet garden','과일 냄새를 맡고 찾아와요':'Comes by when it smells fruit','조개가 많은 모래밭을 좋아해요':'Loves sand full of shells','할로윈 밤의 호박 집과 유령 해초를 좋아해요':'Loves a pumpkin house and ghost kelp on Halloween night','마녀 솥과 잭오랜턴 불빛을 좋아해요':"Loves a witch's cauldron and a jack-o'-lantern glow",
  '다녀오셨어요!':'Welcome back!','자리를 비운 사이 진주 샘에 진주가 모였어요':'Pearls piled up in your pearl spring while you were away','진주 ':'Pearls ','받기':'Collect','광고 보고 2배':'Watch ad for 2×','광고를 불러오지 못했어요':"Couldn't load the ad",'그냥 받았어요':'Collected the normal amount','2배로 받았어요!':'Collected 2×!',
  '반짝 산호: ':'Twinkle Coral: ','물고기를 누르면 하트가 떠요 · 친해지면 선물을 줘요':'Tap a fish to give it a heart · close friends bring gifts'});
abyTr(TRJ,{'반짝 산호':'キラキラサンゴ','산호 새싹':'サンゴの芽','아기 산호':'赤ちゃんサンゴ','가지 산호':'えだサンゴ','큰 가지 산호':'大きなえだサンゴ','빛 산호':'光るサンゴ','무지개 산호':'にじ色サンゴ','별빛 산호':'星明かりサンゴ',
  '톡톡':'トントン','산호 ':'サンゴ ','반짝 산호가 자랐어요! ':'キラキラサンゴが育ちました！','진주 샘 +':'真珠の泉 +','% · 선물 진주 +':'% · プレゼント真珠 +','오늘 톡톡 진주는 다 모았어요':'今日のトントン真珠は全部集めました','산호는 계속 자라요 · 내일 또 만나요':'サンゴはまだまだ育ちます · また明日',
  '더 친해졌어요! 선물 진주 +':'もっと仲良くなりました！プレゼント真珠 +','오늘은 실컷 놀았어요':'今日はたくさん遊びました',
  '누군가 수족관을 기웃거려요!':'だれかが水族館をのぞいています！','반짝이는 손님을 눌러 인사해 봐요':'キラキラのお客さんを押してあいさつしよう','친구가 됐어요!':'と友だちになりました！','도감과 수족관에 들어왔어요':'図鑑と水族館に入りました','이미 친구라서 선물을 두고 갔어요 · 진주 +':'もう友だちなのでプレゼントを置いていきました · 真珠 +',
  '손님 도감':'お客さん図鑑','소품 두 가지를 함께 놓으면 손님 물고기가 찾아와요. 반짝이는 손님을 눌러 인사하면 친구가 돼요':'決まった小物を2つ一緒に置くと、お客さんの魚がやってきます。キラキラのお客さんを押してあいさつすると友だちになります','친구예요':'友だち',
  '말미잘과 주황 산호를 좋아해요':'イソギンチャクとオレンジのサンゴが好き','옛 배와 항아리 사이에 숨고 싶어해요':'古い船とつぼのあいだにかくれたい','빛나는 것과 동글동글한 것을 좋아해요':'光るものと、まんまるなものが好き','등대 불빛을 따라 돌다리를 건너와요':'灯台の光をたどって石橋をわたってきます','조용한 정원을 좋아해요':'しずかなお庭が好き','과일 냄새를 맡고 찾아와요':'くだもののにおいにさそわれてきます','조개가 많은 모래밭을 좋아해요':'貝がいっぱいの砂浜が好き','할로윈 밤의 호박 집과 유령 해초를 좋아해요':'ハロウィンの夜のかぼちゃの家とおばけ海藻が好き','마녀 솥과 잭오랜턴 불빛을 좋아해요':'魔女の大なべとジャック・オー・ランタンの光が好き',
  '다녀오셨어요!':'おかえりなさい！','자리를 비운 사이 진주 샘에 진주가 모였어요':'留守のあいだに真珠の泉に真珠がたまりました','진주 ':'真珠 ','받기':'受け取る','광고 보고 2배':'広告を見て2倍','광고를 불러오지 못했어요':'広告を読み込めませんでした','그냥 받았어요':'ふつうに受け取りました','2배로 받았어요!':'2倍で受け取りました！',
  '반짝 산호: ':'キラキラサンゴ：','물고기를 누르면 하트가 떠요 · 친해지면 선물을 줘요':'魚を押すとハートが出ます · 仲良くなるとプレゼントをくれます'});

function AB(){var o=save.aby;if(!o||typeof o!=='object')o=save.aby={tap:0,st:0,d:'',dt:0,dp:0,aff:{},vis:{},hid:0};if(!(o.tap>=0))o.tap=0;if(!(o.st>=0))o.st=0;if(!o.aff||typeof o.aff!=='object')o.aff={};if(!o.vis||typeof o.vis!=='object')o.vis={};
  var d=today();if(o.d!==d){o.d=d;o.dt=0;o.dp=0}return o}
var CORAL_STEP=[0,40,120,300,600,1100,2000],CORAL_N=[T('산호 새싹'),T('아기 산호'),T('가지 산호'),T('큰 가지 산호'),T('빛 산호'),T('무지개 산호'),T('별빛 산호')];
var TAP_PER=6,TAP_DAY=20,AFF_STEP=[5,15,30,60,100],AFF_DAY=5;
var ABY={fx:[],sq:0,vis:null,visT:0,hint:0};
function coralSt(){var n=AB().tap,s=0;for(var i=1;i<CORAL_STEP.length;i++)if(n>=CORAL_STEP[i])s=i;return s}
function coralPos(){var p=housePos(),U=decoU(),st=coralSt(),h=U*(.085+.036*st),w=U*(.11+.024*st),x=p.x-p.w*.52-Math.max(h*.85,U*.1)-10;return {x:x,y:floorAt(x)+ch*.022,w:w,h:h,st:st}}
function coralHit(wx,wy){var c=coralPos();return Math.abs(wx-c.x)<Math.max(34,c.w*.62)&&wy>c.y-c.h*1.15-18&&wy<c.y+16}
/* 집 진주 샘에 산호 단계만큼 2%씩 더한다 */
var houseRateAt0=houseRateAt;houseRateAt=function(lv){var r=houseRateAt0(lv);return r?Math.max(1,Math.round(r*(1+coralSt()*.02))):0};
function abyFxPush(x,y,k,n,sp){for(var i=0;i<n;i++){var a=-Math.PI/2+rnd(-1.1,1.1),v=rnd(40,110)*(sp||1);ABY.fx.push({x:x+rnd(-8,8),y:y+rnd(-6,6),vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:rnd(.8,1.3),max:1.3,k:k,r:rnd(.7,1.2),h:(Math.random()*360)|0})}}
function coralTap(){var o=AB(),c=coralPos(),s0=coralSt();o.tap++;ABY.sq=1;ABY.hint=1;
  abyFxPush(c.x,c.y-c.h*.8,'spark',3+(s0>=4?2:0));
  if(Math.random()<.5)TK_RIP.push({x:c.x+rnd(-c.w*.3,c.w*.3),y:c.y-c.h*.6,vy:-rnd(50,90),r:rnd(3,6),life:rnd(.9,1.4),bub:1});
  svSnd('bub',1.1+Math.random()*.5);buzz(6);
  /* 가까운 물고기 몇 마리가 구경 온다 */
  if(o.tap%4===1){var cand=tank.map(function(f){return [Math.hypot(f.x-c.x,f.y-c.y),f]}).filter(function(a){return a[0]<Math.max(300,viewW()*.6)}).sort(function(a,b){return a[0]-b[0]}).slice(0,3);cand.forEach(function(a,k){a[1].cur={x:c.x+rnd(-60,60),y:c.y-c.h-rnd(20,70),t:2+k*.2}})}
  if(o.tap%TAP_PER===0){if(o.dp<TAP_DAY){o.dp++;save.pearls+=1;tankPops.push({x:c.x+rnd(-14,14),y:c.y-c.h-14,txt:'+1',life:1,sm:1});refreshTank();if(o.dp===TAP_DAY)banner(T('오늘 톡톡 진주는 다 모았어요'),T('산호는 계속 자라요 · 내일 또 만나요'))}}
  else if(o.tap%5===0&&s0<CORAL_STEP.length-1)tankPops.push({x:c.x,y:c.y-c.h-30,txt:T('산호 ')+o.tap+' / '+CORAL_STEP[s0+1],life:.9,sm:1});
  var s1=coralSt();if(s1>s0){o.st=s1;var g=Math.round((30+30*s1)*RW_K*2);save.pearls+=g;abyFxPush(c.x,c.y-c.h,'spark',18,1.6);svSnd('gem');buzz([30,40,60]);
    banner(T('반짝 산호가 자랐어요! ')+CORAL_N[s1],T('진주 샘 +')+(s1*2)+T('% · 선물 진주 +')+g);crumb('coral:'+s1);refreshTank();try{refreshHome(true)}catch(e){}}
  if(o.tap%10===0||o.tap%TAP_PER===0||s1>s0)persist();
}
/* 산호 그리기: 바위 받침 + 가지(단계마다 가지 수 · 높이 · 색이 바뀜) */
var CORAL_COL=[['#9BE07A','#4FA33A'],['#FFB3C7','#E5658E'],['#FFB27A','#E5703A'],['#FF8AD8','#C2409E'],['#9FF4FF','#33B8D8'],null,null];
function drawCoral(){var c=coralPos(),U=decoU();if(c.x<tankCam-c.w*2||c.x>tankCam+viewW()+c.w*2)return;
  var st=c.st,sq=ABY.sq,sx=1+.1*sq,sy=1-.13*sq,ol='rgba(20,40,60,.85)',i;
  ctx.save();ctx.translate(c.x,c.y);ctx.lineCap='round';ctx.lineJoin='round';
  if(st>=4){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.22+.12*Math.sin(t*2.2);var gr=c.h*1.5;ctx.drawImage(glow(st>=5?'255,200,255':'150,240,255'),-gr,-c.h*1.3-gr*.5,gr*2,gr*2);ctx.restore()}
  /* 받침 바위 */
  var bw=Math.max(c.w*.55,U*.07);ctx.beginPath();ctx.ellipse(0,2,bw*1.05,bw*.2,0,0,Math.PI*2);ctx.fillStyle='rgba(20,40,60,.22)';ctx.fill();
  ctx.beginPath();ctx.moveTo(-bw,0);ctx.quadraticCurveTo(-bw*.9,-bw*.42,-bw*.3,-bw*.48);ctx.quadraticCurveTo(bw*.2,-bw*.6,bw*.75,-bw*.38);ctx.quadraticCurveTo(bw*1.05,-bw*.18,bw,0);ctx.closePath();
  var rg=ctx.createLinearGradient(0,-bw*.6,0,0);rg.addColorStop(0,'#B9C4CE');rg.addColorStop(1,'#7E8C99');ctx.fillStyle=rg;ctx.fill();ctx.lineWidth=Math.max(1.6,U*.004);ctx.strokeStyle=ol;ctx.stroke();
  ctx.scale(sx,sy);
  /* 가지 모으기 */
  var segs=[],tips=[],depth=[1,1,2,2,3,3,3][st],trunks=[1,2,3,3,3,4,5][st],H=c.h,lw0=Math.max(4,U*(.016+.002*st));
  function br(x,y,a,len,w,d,id){var sw=Math.sin(t*1.1+id*1.7)*.05,ex=x+Math.cos(a+sw)*len,ey=y+Math.sin(a+sw)*len;segs.push([x,y,ex,ey,w,id]);
    if(d>0){br(ex,ey,a-.42-.1*h2(id,7,1),len*.72,w*.74,d-1,id*2+1);br(ex,ey,a+.38+.1*h2(id,7,2),len*.68,w*.72,d-1,id*2+2)}else tips.push([ex,ey,w,id])}
  for(i=0;i<trunks;i++){var u=trunks>1?i/(trunks-1)-.5:0,a=-Math.PI/2+u*1.1,len=H*(depth>=3?.42:depth===2?.52:.75)*(1-.25*Math.abs(u)),bx=u*bw*.9;br(bx,-bw*.32,a,len,lw0*(1-.2*Math.abs(u)),depth,i+1)}
  function colOf(id,k){if(st>=5){var hh=((t*40+id*47)%360+360)%360;return 'hsl('+hh+','+(k?'78%,58%':'85%,80%')+')'}return CORAL_COL[st][k?1:0]}
  ctx.strokeStyle=ol;for(i=0;i<segs.length;i++){var s=segs[i];ctx.lineWidth=s[4]+Math.max(3,U*.006);ctx.beginPath();ctx.moveTo(s[0],s[1]);ctx.lineTo(s[2],s[3]);ctx.stroke()}
  for(i=0;i<tips.length;i++){var p=tips[i];ctx.beginPath();ctx.arc(p[0],p[1],p[2]*.75+Math.max(1.5,U*.003),0,Math.PI*2);ctx.fillStyle=ol;ctx.fill()}
  for(i=0;i<segs.length;i++){s=segs[i];ctx.lineWidth=s[4];ctx.strokeStyle=colOf(s[5],1);ctx.beginPath();ctx.moveTo(s[0],s[1]);ctx.lineTo(s[2],s[3]);ctx.stroke()}
  for(i=0;i<tips.length;i++){p=tips[i];ctx.beginPath();ctx.arc(p[0],p[1],p[2]*.75,0,Math.PI*2);ctx.fillStyle=colOf(p[3],0);ctx.fill()}
  for(i=0;i<segs.length;i++){s=segs[i];ctx.lineWidth=Math.max(1,s[4]*.28);ctx.strokeStyle='rgba(255,255,255,.45)';ctx.beginPath();ctx.moveTo(s[0]-s[4]*.18,s[1]);ctx.lineTo(s[2]-s[4]*.18,s[3]);ctx.stroke()}
  if(st>=3){ctx.fillStyle='rgba(255,255,255,.85)';for(i=0;i<segs.length;i+=2){s=segs[i];var m=.5+.3*h2(i,9,1);ctx.beginPath();ctx.arc(s[0]+(s[2]-s[0])*m+s[4]*.3,s[1]+(s[3]-s[1])*m,Math.max(1.2,s[4]*.16),0,Math.PI*2);ctx.fill()}}
  ctx.restore();
  /* 별빛 산호: 주위에 반짝이는 별 */
  if(st>=6){ctx.save();for(i=0;i<7;i++){var aa=t*.5+i*.9,rr=c.h*(.55+.25*h2(i,3,1)),x2=c.x+Math.cos(aa)*rr*1.1,y2=c.y-c.h*.7+Math.sin(aa)*rr*.6;ctx.globalAlpha=.4+.6*Math.max(0,Math.sin(t*3+i*1.3));abyStar(x2,y2,3+2*h2(i,3,2),'#FFF6B0')}ctx.restore()}
  /* 처음엔 '톡톡' 말풍선으로 누를 수 있다고 알려 준다 */
  if(AB().tap<12&&!deco.on&&!VISIT){var by=c.y-c.h*sy-26-Math.abs(Math.sin(t*3.4))*8;ctx.save();ctx.font='16px "Black Han Sans", Jua, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';var tw=ctx.measureText(T('톡톡')).width+18;
    ctx.fillStyle='#FFFFFF';ctx.strokeStyle='#0B2C4A';ctx.lineWidth=3;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(c.x-tw/2,by-13,tw,26,13);else ctx.rect(c.x-tw/2,by-13,tw,26);ctx.fill();ctx.stroke();
    ctx.beginPath();ctx.moveTo(c.x-6,by+12);ctx.lineTo(c.x,by+20);ctx.lineTo(c.x+6,by+12);ctx.closePath();ctx.fill();ctx.fillStyle='#0B2C4A';ctx.fillText(T('톡톡'),c.x,by+1);ctx.restore()}
}
function abyStar(x,y,r,col){ctx.beginPath();for(var k=0;k<8;k++){var rr=k%2?r*.38:r,a=k*Math.PI/4-Math.PI/2;ctx.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}ctx.closePath();ctx.fillStyle=col;ctx.fill()}
function abyHeart(x,y,r,col){ctx.beginPath();ctx.moveTo(x,y+r*.9);ctx.bezierCurveTo(x-r*1.5,y-r*.1,x-r*.7,y-r*1.2,x,y-r*.45);ctx.bezierCurveTo(x+r*.7,y-r*1.2,x+r*1.5,y-r*.1,x,y+r*.9);ctx.closePath();ctx.fillStyle=col;ctx.fill();ctx.lineWidth=Math.max(1.2,r*.22);ctx.strokeStyle='#0B2C4A';ctx.stroke()}
var drawHouseA=drawHouse;drawHouse=function(){drawHouseA.apply(this,arguments);try{if(page==='tank')drawCoral()}catch(e){}};

/* ② 물고기 교감 */
function affLv(n){var l=0;for(var i=0;i<AFF_STEP.length;i++)if(n>=AFF_STEP[i])l=i+1;return l}
function affOf(id){var a=AB().aff[id];return a&&a.n>0?a.n:0}
function abyPet(f){var o=AB(),id=f.L.id,a=o.aff[id];if(!a||typeof a!=='object')a=o.aff[id]={n:0,d:'',c:0};if(a.d!==o.d){a.d=o.d;a.c=0}
  var s=tankSize(f.L),hx=f.x,hy=f.y-s*.9;
  if(a.c>=AFF_DAY){abyFxPush(hx,hy,'heart',1,.6);if(!f.tired){f.tired=1;tankPops.push({x:hx,y:hy-22,txt:T('오늘은 실컷 놀았어요'),life:1.2,sm:1})}return}
  var l0=affLv(a.n);a.n++;a.c++;abyFxPush(hx,hy,'heart',3);f.cur={x:f.x+f.dir*s*.9,y:f.y-s*.7,t:.55};
  var l1=affLv(a.n);if(l1>l0){var g=5*l1;save.pearls+=g;abyFxPush(hx,hy,'heart',8,1.5);svSnd('gem');buzz([20,30,40]);banner(f.L.name+' ♥'+l1,T('더 친해졌어요! 선물 진주 +')+g);refreshTank()}
  persist()}
/* 손님 조합: [소품, 소품] → 손님 물고기 */
var GUESTS=[{k:'g1',need:['anem','coralo'],id:'moorish',hint:T('말미잘과 주황 산호를 좋아해요')},{k:'g2',need:['ship','amphora'],id:'moray',hint:T('옛 배와 항아리 사이에 숨고 싶어해요')},
  {k:'g3',need:['mushroom','marimo'],id:'lanternfish',hint:T('빛나는 것과 동글동글한 것을 좋아해요')},{k:'g4',need:['lighthouse','bridge'],id:'flyingfish',hint:T('등대 불빛을 따라 돌다리를 건너와요')},
  {k:'g5',need:['bonsai','iwagumi'],id:'koi',hint:T('조용한 정원을 좋아해요')},{k:'g6',need:['orangehouse','melonhouse'],id:'mandarinfish',hint:T('과일 냄새를 맡고 찾아와요')},
  {k:'g7',need:['clam','shellpile'],id:'stingray',hint:T('조개가 많은 모래밭을 좋아해요')},{k:'g8',need:['pumpkinhouse','ghostweed'],id:'vampiresquid',hint:T('할로윈 밤의 호박 집과 유령 해초를 좋아해요'),hw:1},
  {k:'g9',need:['cauldron','jacko'],id:'chimaera',hint:T('마녀 솥과 잭오랜턴 불빛을 좋아해요'),hw:1}];
function guestReady(){var o=AB(),ks={};DS().placed.forEach(function(q){if(!q.pv)ks[q.k]=1});for(var i=0;i<GUESTS.length;i++){var G=GUESTS[i];if(o.vis[G.k]||!byId(G.id))continue;if(G.need.every(function(k){return ks[k]}))return G}return null}
function guestSpawn(G){var L=byId(G.id),W=TWW(),side=Math.random()<.5?-1:1,x=side<0?tankCam-60:tankCam+viewW()+60;ABY.vis={G:G,L:L,x:clamp(x,-80,W+80),y:ch*rnd(.3,.5),dir:-side,ph:Math.random()*6,tx:tankCam+viewW()*rnd(.3,.7),ty:ch*rnd(.28,.5),tt:0,out:0};
  banner(T('누군가 수족관을 기웃거려요!'),T('반짝이는 손님을 눌러 인사해 봐요'));svSnd('bub',.7);crumb('guest:'+G.k)}
function guestSize(L){return Math.max(tankSize(L)*1.35,26)}
function guestHit(wx,wy){var v=ABY.vis;if(!v||v.out)return false;return Math.hypot(wx-v.x,wy-v.y)<guestSize(v.L)*1.7+20}
function guestMeet(){var v=ABY.vis,o=AB();if(!v||v.out)return;var G=v.G,L=v.L;o.vis[G.k]=Date.now();v.out=1;v.tt=0;abyFxPush(v.x,v.y-guestSize(L)*.6,'heart',10,1.5);abyFxPush(v.x,v.y,'spark',12,1.4);svSnd('gem');buzz([30,40,60]);
  if(save.owned.indexOf(L.id)<0){save.owned.push(L.id);persist();banner(L.name+' '+T('친구가 됐어요!'),T('도감과 수족관에 들어왔어요'));try{renderMenu()}catch(e){}}
  else{save.pearls+=100;persist();banner(L.name,T('이미 친구라서 선물을 두고 갔어요 · 진주 +')+100)}
  crumb('guestMeet:'+G.k);refreshTank();try{refreshHome(true)}catch(e){}}
function guestTick(dt){var v=ABY.vis;
  if(!v){if(page!=='tank'||deco.on||VIEWM){ABY.visT=0;return}ABY.visT+=dt;if(ABY.visT>2.5){ABY.visT=-6;var G=guestReady();if(G)guestSpawn(G)}return}
  if(page!=='tank'&&!v.out){ABY.vis=null;return}
  v.tt+=dt;if(v.out){v.y-=60*dt;v.x+=v.dir*30*dt;if(v.tt>1.4)ABY.vis=null;return}
  var dx=v.tx-v.x,dy=v.ty-v.y,d=Math.hypot(dx,dy);if(d<20||v.tt>7){v.tt=0;v.tx=clamp(tankCam+viewW()*rnd(.2,.8),60,TWW()-60);v.ty=ch*rnd(.26,.52)}
  var sp=Math.min(d,70*dt);if(d>1){v.x+=dx/d*sp;v.y+=dy/d*sp*.7;if(Math.abs(dx)>6)v.dir=dx>0?1:-1}}
function drawGuest(){var v=ABY.vis;if(!v)return;var L=v.L,s=guestSize(L),a=v.out?Math.max(0,1-v.tt/1.4):Math.min(1,v.tt*2+.3);
  ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation='lighter';var gr=s*2.6;ctx.globalAlpha=a*(.55+.2*Math.sin(t*4));ctx.drawImage(glow('255,240,160'),v.x-gr,v.y-gr,gr*2,gr*2);ctx.restore();
  ctx.save();ctx.globalAlpha=a;var ang=v.dir>0?Math.sin(t*1.2+v.ph)*.08:Math.PI-Math.sin(t*1.2+v.ph)*.08;drawFish(ctx,v.x,v.y+Math.sin(t*2+v.ph)*6,s,ang,L,{phase:v.ph,px:s,line:'#FFE45C',minLw:1.4});
  if(!v.out){var by=v.y-s*1.2-18+Math.sin(t*3)*4;ctx.font='22px "Black Han Sans", Jua, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineWidth=5;ctx.strokeStyle='#0B2C4A';ctx.strokeText('?',v.x,by);ctx.fillStyle='#FFE45C';ctx.fillText('?',v.x,by);
    for(var i=0;i<3;i++){var aa=t*2+i*2.1;ctx.globalAlpha=a*(.5+.5*Math.sin(t*5+i));abyStar(v.x+Math.cos(aa)*s*1.3,v.y+Math.sin(aa)*s*.8,3.5,'#FFF6B0')}}
  ctx.restore()}

/* ④ 밤: 22시~6시엔 물고기들이 졸면서 천천히 헤엄친다 */
function abyNight(){var h=new Date().getHours();return h>=22||h<6}
var updateTankA=updateTank;updateTank=function(dt){var sl=page==='tank'&&abyNight()&&!feedP.length;updateTankA(sl?dt*.35:dt);
  if(ABY.sq>0)ABY.sq=Math.max(0,ABY.sq-dt*6);
  for(var i=ABY.fx.length-1;i>=0;i--){var q=ABY.fx[i];q.life-=dt;if(q.life<=0){ABY.fx.splice(i,1);continue}q.x+=q.vx*dt;q.y+=q.vy*dt;q.vx*=Math.exp(-dt*2.5);q.vy=q.vy*Math.exp(-dt*2.5)-(q.k==='heart'?18:6)*dt}
  if(ABY.fx.length>160)ABY.fx.splice(0,ABY.fx.length-160);
  try{guestTick(dt)}catch(e){}};
function drawAbyTop(){var i,q;
  try{drawGuest()}catch(e){}
  if(abyNight()&&!feedP.length&&!deco.on){ctx.save();ctx.font='15px "Black Han Sans", Jua, sans-serif';ctx.textAlign='center';ctx.lineWidth=4;ctx.strokeStyle='rgba(11,44,74,.8)';ctx.fillStyle='#E8F4FF';
    var x0=tankCam-40,x1=tankCam+viewW()+40;for(i=0;i<tank.length;i+=3){var f=tank[i];if(f.x<x0||f.x>x1||f.cur)continue;var s=tankSize(f.L),u=((t*.45+f.ph)%1),hx=f.x+f.dir*s*.55+u*12,hy=f.y-s*.55-u*26;ctx.globalAlpha=Math.sin(u*Math.PI)*.9;ctx.font=Math.round(11+u*7)+'px "Black Han Sans", Jua, sans-serif';ctx.strokeText('z',hx,hy);ctx.fillText('z',hx,hy)}
    ctx.restore()}
  /* 고른 물고기 친밀도 하트 */
  if(!deco.on){for(i=0;i<tank.length;i++){var g=tank[i];if(g.L.id!==sel)continue;var lv=affLv(affOf(g.L.id));if(!lv)break;var sz=tankSize(g.L),ly=g.y+Math.max(sz*g.L.ratio,sz*.45)*1.5+32,lx=clamp(g.x,tankCam+44/tankZ,tankCam+viewW()-44/tankZ);for(var k=0;k<5;k++)abyHeart(lx+(k-2)*15,ly,5.2,k<lv?'#FF6B8E':'rgba(255,255,255,.35)');break}}
  for(i=0;i<ABY.fx.length;i++){q=ABY.fx[i];var al=Math.min(1,q.life/q.max*1.6);ctx.globalAlpha=al;
    if(q.k==='heart')abyHeart(q.x,q.y,7*q.r,'#FF6B8E');else{ctx.save();ctx.globalCompositeOperation='lighter';abyStar(q.x,q.y,6*q.r,coralSt()>=5?'hsl('+q.h+',95%,75%)':'#FFF6B0');ctx.restore()}}
  ctx.globalAlpha=1}
var drawTankPopsA=drawTankPops;drawTankPops=function(dt){if(page==='tank'){try{drawAbyTop()}catch(e){}}return drawTankPopsA(dt)};

/* 누르기: 손님 → 산호 → (원래 처리) → 물고기면 하트 */
var tankTapA=tankTap;tankTap=function(wx,wy){
  if(VIEWM||deco.on)return tankTapA(wx,wy);
  if(guestHit(wx,wy)){guestMeet();return}
  if(coralHit(wx,wy)&&!houseHit(wx,wy)){coralTap();return}
  tankTapA(wx,wy);
  if(houseHit(wx,wy))return;var i=decoHit(wx,wy),pl=DS().placed;if(i>=0&&pl[i].k==='chest')return;
  var bestF=null,bd=1e9;for(var q=0;q<tank.length;q++){var tf=tank[q],dd=Math.hypot(wx-tf.x,wy-tf.y);if(dd<tankSize(tf.L)*1.6+14&&dd<bd){bd=dd;bestF=tf}}
  if(bestF)abyPet(bestF)};

/* 집 창: 산호 · 교감 안내 + 손님 도감 버튼 */
var houseOpenA=houseOpen;houseOpen=function(){houseOpenA.apply(this,arguments);try{var tp=$('hsTip'),st=coralSt();if(tp)tp.textContent+='\n'+T('반짝 산호: ')+CORAL_N[st]+(st?' · '+T('진주 샘 +')+(st*2)+'%':'')+'\n'+T('물고기를 누르면 하트가 떠요 · 친해지면 선물을 줘요');
  var b=$('hsBook');if(!b){b=document.createElement('button');b.className='btn ghost';b.id='hsBook';b.type='button';b.addEventListener('click',function(){houseClose();guestBook()});var cl=$('hsClose');cl.parentNode.insertBefore(b,cl)}
  var n=GUESTS.filter(function(G){return AB().vis[G.k]}).length;b.textContent=T('손님 도감')+' '+n+' / '+GUESTS.length}catch(e){}};
function guestBook(){var el=$('abyBook');if(!el){el=document.createElement('div');el.className='overlay';el.id='abyBook';el.hidden=true;
    el.innerHTML='<div class="panel gb-panel"><h1></h1><p class="lead"></p><ul class="gb-list"></ul><button class="btn ghost" type="button"></button></div>';document.body.appendChild(el);
    el.querySelector('button').addEventListener('click',function(){el.hidden=true});el.addEventListener('click',function(e){if(e.target===el)el.hidden=true})}
  el.querySelector('h1').textContent=T('손님 도감');el.querySelector('.lead').textContent=T('소품 두 가지를 함께 놓으면 손님 물고기가 찾아와요. 반짝이는 손님을 눌러 인사하면 친구가 돼요');el.querySelector('button').textContent=T('닫기');
  var ul=el.querySelector('ul'),o=AB();ul.textContent='';
  GUESTS.forEach(function(G){var L=byId(G.id);if(!L)return;var met=!!o.vis[G.k],li=document.createElement('li');li.className='gb-it'+(met?' met':'');
    var th=document.createElement('i');th.className='gb-th';if(met&&SPRITE_SRC[L.id]){var im=document.createElement('img');im.alt='';im.src=SPRITE_SRC[L.id];th.appendChild(im)}else th.textContent='?';li.appendChild(th);
    var tx=document.createElement('span');tx.className='gb-tx';var b=document.createElement('b');b.textContent=met?L.name:'???';tx.appendChild(b);var sm=document.createElement('small');sm.textContent=met?'✓ '+T('친구예요'):G.hint;tx.appendChild(sm);li.appendChild(tx);
    if(G.hw&&!met){var em=document.createElement('em');em.className='hwtag';em.textContent=T('할로윈 한정');li.appendChild(em)}
    ul.appendChild(li)});
  el.hidden=false}

/* ④ 다녀온 보상: 20분 넘게 비웠다 돌아오면 진주 샘에 쌓인 진주를 창으로 보여 준다(광고 보면 2배) */
var AWAY_MIN=20*60000;
function awayMark(){try{AB().hid=Date.now();persist()}catch(e){}}
function awayBusy(){if(state==='play'||state==='pause'||state==='over')return true;var ids=['news','tutBox','intro','houseSheet','abyBook','modePick','sheet','svCh','notiAsk','onb'];for(var i=0;i<ids.length;i++){var e=$(ids[i]);if(e&&!e.hidden)return true}return false}
function awayCheck(tries){var o=AB(),h=o.hid||0;if(!h||Date.now()-h<AWAY_MIN)return;if(awayBusy()){if((tries||0)<20)setTimeout(function(){awayCheck((tries||0)+1)},1500);return}
  o.hid=0;var H=HS();if(!H.lv)return;var n=houseN();if(n<3)return;awayShow(n)}
function awayShow(n){var el=$('abyAway');if(!el){el=document.createElement('div');el.className='overlay';el.id='abyAway';el.hidden=true;
    el.innerHTML='<div class="panel aw-panel"><h1></h1><p class="lead"></p><p class="aw-n"><i class="aw-pearl" aria-hidden="true"></i><b></b></p><button class="btn" type="button" id="awGet"></button><button class="btn ghost" type="button" id="awAd"></button></div>';document.body.appendChild(el);
    $('awGet').addEventListener('click',function(){el.hidden=true;houseCollect()});
    $('awAd').addEventListener('click',function(){var b=$('awAd');if(b.disabled)return;b.disabled=true;showRewarded(function(ok){b.disabled=false;el.hidden=true;var m=houseN();if(m<1)return;
      if(ok){houseCollect();save.pearls+=m;persist();refreshTank();try{refreshHome(true)}catch(e){}banner(T('2배로 받았어요!'),T('진주 +')+(m*2))}
      else{houseCollect();if(ADS.fail)banner(T('광고를 불러오지 못했어요'),T('그냥 받았어요'))}})})}
  el.querySelector('h1').textContent=T('다녀오셨어요!');el.querySelector('.lead').textContent=T('자리를 비운 사이 진주 샘에 진주가 모였어요');el.querySelector('.aw-n b').textContent=T('진주 ')+nf(n);
  $('awGet').textContent=T('받기');$('awAd').textContent='▶ '+T('광고 보고 2배');el.hidden=false;crumb('away:'+n)}
document.addEventListener('visibilitychange',function(){if(document.hidden)awayMark();else setTimeout(awayCheck,900)});setTimeout(awayCheck,3200);
window.addEventListener('pagehide',awayMark);
(function(){var st=document.createElement('style');st.textContent='#abyBook,#abyAway{z-index:45}.gb-panel{max-width:420px;max-height:86vh;display:flex;flex-direction:column;gap:8px}.gb-panel .lead{margin:0;word-break:keep-all}.gb-list{list-style:none;margin:0;padding:0;overflow:auto;display:flex;flex-direction:column;gap:7px;min-height:0}'+
  '.gb-it{display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:14px;background:rgba(11,44,74,.06);text-align:left;position:relative}.gb-it.met{background:rgba(255,214,90,.22)}'+
  '.gb-th{flex:none;width:52px;height:40px;display:flex;align-items:center;justify-content:center;font-style:normal;font-family:var(--disp);font-size:22px;color:#7A8FA3;background:rgba(255,255,255,.7);border-radius:10px}.gb-th img{max-width:48px;max-height:36px}'+
  '.gb-tx{display:flex;flex-direction:column;min-width:0}.gb-tx b{font-family:var(--disp);font-weight:normal;font-size:16px;color:#0B2C4A}.gb-tx small{font-size:13px;color:#4A6680;word-break:keep-all}.gb-it em.hwtag{position:absolute;right:8px;top:6px}'+
  '.aw-panel{max-width:360px;display:flex;flex-direction:column;gap:10px;text-align:center}.aw-panel .lead{margin:0;word-break:keep-all}.aw-n{margin:2px 0;display:flex;align-items:center;justify-content:center;gap:8px;font-family:var(--disp);font-size:30px;color:#0B2C4A}'+
  '.aw-pearl{width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 32%,#fff 0 18%,#F1D9F7 45%,#C99AD8 100%);box-shadow:0 0 0 3px #0B2C4A}@media (orientation:landscape) and (max-height:560px){#houseSheet #hsBook{order:3}}.gb-panel .btn,.aw-panel .btn{min-height:0!important;height:auto!important;flex:none!important;padding:12px 14px 14px!important;font-size:19px!important}';document.head.appendChild(st)})();
