/* ===== 1.1.30 숨바꼭질 바다 (늑구: '대전을 누르면 탭 두 개 — 일반 대전 · 숨바꼭질') =====
   대전 버튼 → 고르기 창(일반 대전 / 숨바꼭질). 숨바꼭질은 혼자 하는 판(봇이 술래 · 숨는 친구), 에너지 없음.
   규칙: 2분 동안 거대 상어 술래에게 안 잡히면 승리. 해초 · 산호 속에 들어가면 술래 눈에 안 보이지만,
   한자리에 6초 넘게 가만히 있으면 거품이 올라와 들킴. 잡힌 친구는 작은 술래가 되어 같이 찾음(갈수록 술래가 늘어남).
   모드 값은 'hide'(싱글 전용 이벤트 · 낚싯바늘 · 황금 물고기 · 산타 보스 등이 끼지 않게), 기록은 save.hs */
var HSK={pend:false,on:false,T:120,still:6,box:null,spots:[],seek:[],hid:[],t:0,caught:0,end:false,warnT:0,bub:[]};
var HS_HIDERS=['clownfish','bluetang','butterfly','yellowtang','royalgramma','mandarinfish','banggai','seahorse'];
function hsS(){if(!save.hs||typeof save.hs!=='object')save.hs={games:0,wins:0,best:0,caught:0};return save.hs}
function hsL(){return SUBL||LANG}
function hsW(k){var L={
  title:{ko:'숨바꼭질',en:'Hide & Seek',ja:'かくれんぼ',es:'Escondite',vi:'Trốn tìm'},
  arena:{ko:'일반 대전',en:'Arena',ja:'通常対戦',es:'Arena',vi:'Đấu trường'},
  pick:{ko:'대전',en:'Battle',ja:'対戦',es:'Batalla',vi:'Thi đấu'},
  arenaD:{ko:'다른 사람들과 같은 바다에서 누가 더 크게 자라나 겨뤄요 · 에너지 없이 언제든',en:'Grow bigger than everyone else in the same sea · no energy needed',ja:'同じ海でだれが一番大きく育つか競います・エネルギー不要',es:'Crece más que nadie en el mismo mar · sin energía',vi:'Lớn nhanh hơn mọi người trong cùng vùng biển · không tốn năng lượng'},
  go:{ko:'들어가기',en:'Enter',ja:'入る',es:'Entrar',vi:'Vào'},
  room:{ko:'친구 바다',en:'Friend sea',ja:'フレンドの海',es:'Mar de amigos',vi:'Biển bạn bè'},
  r1:{ko:'2분 동안 거대 상어 술래에게 잡히지 않으면 승리!',en:'Avoid the giant shark for 2 minutes to win!',ja:'2分間、巨大ザメの鬼に捕まらなければ勝ち！',es:'¡Evita al tiburón gigante durante 2 minutos!',vi:'Tránh con cá mập khổng lồ trong 2 phút để thắng!'},
  r2:{ko:'해초 · 산호 속에 들어가면 술래 눈에 안 보여요',en:'Inside kelp or coral, the seeker can’t see you',ja:'海藻やサンゴの中なら鬼に見えません',es:'Dentro de algas o coral, no te ve',vi:'Trong rong hoặc san hô, nó không thấy bạn'},
  r3:{ko:'한자리에 6초 넘게 가만히 있으면 거품이 올라와 들켜요 · 조금씩 움직이세요',en:'Stay still over 6 s and bubbles give you away · keep wiggling',ja:'6秒以上じっとすると泡でバレます・少しずつ動こう',es:'Si te quedas quieto 6 s, las burbujas te delatan · muévete',vi:'Đứng yên quá 6 giây sẽ nổi bong bóng lộ chỗ · hãy nhúc nhích'},
  r4:{ko:'잡힌 친구는 술래가 돼요 · 갈수록 술래가 늘어나요',en:'Caught fish join the seekers · they keep multiplying',ja:'捕まった仲間は鬼になります・鬼はどんどん増えます',es:'Los atrapados se vuelven buscadores · cada vez son más',vi:'Cá bị bắt sẽ thành kẻ đi tìm · ngày càng đông'},
  start:{ko:'시작하기',en:'Start',ja:'スタート',es:'Empezar',vi:'Bắt đầu'},
  stat:{ko:'승리 {w} · 최고 {b} · {g}판',en:'Wins {w} · Best {b} · {g} games',ja:'勝利 {w}・最高 {b}・{g}回',es:'Victorias {w} · Récord {b} · {g} partidas',vi:'Thắng {w} · Kỷ lục {b} · {g} ván'},
  free:{ko:'에너지 없음',en:'Free',ja:'無料',es:'Gratis',vi:'Miễn phí'},
  newT:{ko:'새 모드',en:'NEW',ja:'NEW',es:'NUEVO',vi:'MỚI'},
  hidden:{ko:'숨었어요',en:'Hidden',ja:'かくれ中',es:'Escondido',vi:'Đang trốn'},
  bub:{ko:'거품! 움직여요',en:'Bubbles! Move!',ja:'泡！動いて',es:'¡Burbujas! Muévete',vi:'Bong bóng! Di chuyển!'},
  seen:{ko:'들켰어요! 도망쳐요',en:'Spotted! Swim!',ja:'見つかった！逃げて',es:'¡Te vio! ¡Huye!',vi:'Bị phát hiện! Chạy!'},
  left:{ko:'남은 친구',en:'Left',ja:'残り',es:'Quedan',vi:'Còn'},
  win:{ko:'끝까지 숨었어요!',en:'You stayed hidden!',ja:'最後までかくれきった！',es:'¡Aguantaste escondido!',vi:'Bạn đã trốn đến cùng!'},
  lose:{ko:'잡혔어요!',en:'Caught!',ja:'捕まった！',es:'¡Te atraparon!',vi:'Bị bắt rồi!'},
  quit:{ko:'숨바꼭질을 멈췄어요',en:'Game stopped',ja:'かくれんぼをやめました',es:'Partida detenida',vi:'Đã dừng ván'},
  lead:{ko:'버틴 시간 {t} · 끝까지 남은 친구 {n} · 진주 +{p}',en:'Survived {t} · fish left {n} · pearls +{p}',ja:'耐えた時間 {t}・残った仲間 {n}・真珠 +{p}',es:'Aguantaste {t} · quedan {n} · perlas +{p}',vi:'Trụ được {t} · còn {n} cá · ngọc +{p}'},
  rec:{ko:' · 최고 기록!',en:' · New best!',ja:'・最高記録！',es:' · ¡Récord!',vi:' · Kỷ lục mới!'},
  again:{ko:'다시 하기',en:'Play again',ja:'もう一回',es:'Otra vez',vi:'Chơi lại'},
  againD:{ko:'바로 새 판',en:'Start a new round',ja:'すぐ次の回へ',es:'Nueva ronda',vi:'Ván mới ngay'},
  pickD:{ko:'일반 대전 · 숨바꼭질 고르기',en:'Choose Arena or Hide & Seek',ja:'通常対戦・かくれんぼを選ぶ',es:'Elegir Arena o Escondite',vi:'Chọn Đấu trường hoặc Trốn tìm'},
  home:{ko:'홈',en:'Home',ja:'ホーム',es:'Inicio',vi:'Trang chủ'},
  homeD:{ko:'처음 화면으로',en:'Back to home',ja:'ホーム画面へ',es:'Volver al inicio',vi:'Về màn hình chính'},
  last:{ko:'마지막 30초! 술래가 빨라져요',en:'Last 30 s! Seekers speed up',ja:'ラスト30秒！鬼が速くなる',es:'¡Últimos 30 s! Más rápidos',vi:'30 giây cuối! Kẻ tìm nhanh hơn'},
  caughtF:{ko:'친구가 잡혀서 술래가 됐어요',en:'A fish was caught and became a seeker',ja:'仲間が捕まって鬼になった',es:'Atraparon a un pez: ahora busca',vi:'Một bạn bị bắt và thành kẻ tìm'}
}[k]||{};return L[hsL()]||L.en||L.ko||k}
function hsF(s,o){return String(s).replace(/\{(\w+)\}/g,function(m,k){return o[k]!=null?o[k]:m})}
function hsSpecies(id,fb){var L=byId(id);return L&&L.id===id?L:byId(fb)}

/* ---- 판 만들기 ---- */
function hsBuild(){var cx=0,cy=clamp(P.y,900,H-900),W=1250,Hh=760;HSK.box={x0:cx-W,x1:cx+W,y0:cy-Hh,y1:cy+Hh};
  HSK.spots=[];var tries=0;while(HSK.spots.length<17&&tries<900){tries++;var r=rnd(58,92),x=rnd(HSK.box.x0+r+40,HSK.box.x1-r-40),y=rnd(HSK.box.y0+r+40,HSK.box.y1-r-40),ok=true;
    for(var i=0;i<HSK.spots.length;i++){var o=HSK.spots[i];if(Math.hypot(o.x-x,o.y-y)<o.r+r+150){ok=false;break}}if(Math.hypot(x-cx,y-cy)<120)ok=false;
    if(ok)HSK.spots.push({x:x,y:y,r:r,k:Math.random()<.6?'kelp':'coral',seed:Math.random()*9,chk:0})}
  P.x=cx;P.y=cy;P.vx=P.vy=0;
  HSK.hid=[];var ids=HS_HIDERS.slice().sort(function(){return Math.random()-.5}).slice(0,7);
  ids.forEach(function(id,k){var a=k/7*Math.PI*2;HSK.hid.push({x:cx+Math.cos(a)*90,y:cy+Math.sin(a)*70,vx:0,vy:0,s:START_S*rnd(.9,1.08),ang:a,look:hsSpecies(id,'clownfish'),ph:Math.random()*6,tgt:null,still:0,wig:rnd(2,5),seen:0,dead:false,think:rnd(.3,1.2)})});
  HSK.seek=[];hsAddSeek(true);HSK.t=0;HSK.caught=0;HSK.end=false;HSK.warnT=0;HSK.bub=[];HSK.lastHalf=false;P.hsStill=0;P.hsSeen=0;P.hsWas=0}
function hsAddSeek(big,at){var b=HSK.box,x,y;if(at){x=at.x;y=at.y}else{var side=Math.random()<.5;x=side?b.x0+60:b.x1-60;y=rnd(b.y0+100,b.y1-100)}
  var L=big?hsSpecies('tigershark','shark'):hsSpecies('reefshark','shark');
  HSK.seek.push({x:x,y:y,vx:0,vy:0,s:big?START_S*5:START_S*1.7,big:!!big,ang:0,look:L,ph:Math.random()*6,st:'patrol',spot:null,wait:0,tx:x,ty:y,last:null,chase:null,mark:0,red:!big,stun:at?2.2:0})}

/* ---- 숨기 판정 ---- */
function hsSpotAt(x,y){for(var i=0;i<HSK.spots.length;i++){var o=HSK.spots[i];if(Math.hypot(o.x-x,o.y-y)<o.r*.82)return o}return null}
function hsHidden(e){return !!hsSpotAt(e.x,e.y)&&(e.still||0)<HSK.still}
function hsSpd(){return refSpeed()}

/* ---- 매 프레임 ---- */
function hsUpdate(dt,playing){
  var b=HSK.box;if(!b)return;
  if(playing){
    P.x=clamp(P.x,b.x0+P.s,b.x1-P.s);P.y=clamp(P.y,b.y0+P.s,b.y1-P.s);
    HSK.t+=dt;P.time=HSK.t;
    var mv=Math.hypot(P.vx,P.vy);P.still=mv<hsSpd()*.12?(P.still||0)+dt:Math.max(0,(P.still||0)-dt*3);
    var lastHalf=HSK.T-HSK.t<=30;if(lastHalf&&!HSK.lastHalf){HSK.lastHalf=true;banner(hsW('last'),'');try{buzz([30,40,30])}catch(e){}}
    var k=lastHalf?1.1:1,sp=hsSpd(),i,j;
    /* 숨는 친구(봇) */
    for(i=0;i<HSK.hid.length;i++){var h=HSK.hid[i];if(h.dead)continue;h.ph+=dt*6;h.think-=dt;
      var thr=null,td=1e9;for(j=0;j<HSK.seek.length;j++){var s0=HSK.seek[j],d0=Math.hypot(s0.x-h.x,s0.y-h.y);if(d0<td){td=d0;thr=s0}}
      var inS=hsSpotAt(h.x,h.y);
      if(thr&&thr.chase===h){if(h.think<=0||!h.tgt){h.think=.8;var best=null,bs=-1e9;for(j=0;j<HSK.spots.length;j++){var o=HSK.spots[j],sc=Math.hypot(o.x-thr.x,o.y-thr.y)-Math.hypot(o.x-h.x,o.y-h.y)*.8-HSK.hid.filter(function(z){return z!==h&&!z.dead&&z.tgt===o}).length*250;if(sc>bs){bs=sc;best=o}}h.tgt=best}}
      else if(!inS&&(!h.tgt||h.think<=0)){h.think=rnd(1.5,3);var bo=null,bd=1e9;for(j=0;j<HSK.spots.length;j++){var o2=HSK.spots[j],d2=Math.hypot(o2.x-h.x,o2.y-h.y)+rnd(0,160)+HSK.hid.filter(function(z){return z!==h&&!z.dead&&z.tgt===o2}).length*450;if(d2<bd){bd=d2;bo=o2}}h.tgt=bo}
      else if(inS&&h.tgt!==inS&&!(thr&&thr.chase===h))h.tgt=inS;
      var tx=h.x,ty=h.y,want=0;
      if(h.tgt){var ox=h.tgt.x+Math.cos(h.ph*.13+i)*h.tgt.r*.35,oy=h.tgt.y+Math.sin(h.ph*.11+i)*h.tgt.r*.3;tx=ox;ty=oy;var dd=Math.hypot(tx-h.x,ty-h.y);want=dd>h.tgt.r*.5?.92:0;
        if(!want){h.wig-=dt;if(h.wig<=0){h.wig=rnd(1.8,4.8);h.wigT=.7}}}
      if(h.wigT>0){h.wigT-=dt;want=.3}
      var hx=tx-h.x,hy=ty-h.y,hm=Math.hypot(hx,hy)||1,hs=sp*want*(thr&&thr.chase===h?1:.85);
      h.vx+=(hx/hm*hs-h.vx)*Math.min(1,dt*4);h.vy+=(hy/hm*hs-h.vy)*Math.min(1,dt*4);h.x=clamp(h.x+h.vx*dt,b.x0+h.s,b.x1-h.s);h.y=clamp(h.y+h.vy*dt,b.y0+h.s,b.y1-h.s);
      var hv=Math.hypot(h.vx,h.vy);if(hv>8)h.ang=lerpAng(h.ang,Math.atan2(h.vy,h.vx),dt*8);h.still=hv<sp*.12?(h.still||0)+dt:Math.max(0,(h.still||0)-dt*3)}
    /* 술래 */
    var all=[P].concat(HSK.hid.filter(function(x){return !x.dead}));
    for(i=0;i<HSK.seek.length;i++){var s=HSK.seek[i];s.ph+=dt*5;if(s.mark>0)s.mark-=dt;
      var sight=s.big?250:170,see=null,sd=1e9;if(s.stun>0){s.stun-=dt;s.vx*=.9;s.vy*=.9;s.x+=s.vx*dt;s.y+=s.vy*dt;continue}
      for(j=0;j<all.length;j++){var e=all[j];if(e.dead)continue;var d=Math.hypot(e.x-s.x,e.y-s.y),hid=hsHidden(e);
        if(hid&&d>s.s*.3+e.s*.5)continue;if(!hid&&d>sight)continue;if(d<sd){sd=d;see=e}}
      if(s.st==='search'&&s.spot&&!see){for(j=0;j<all.length;j++){var e2=all[j];if(e2.dead)continue;if(hsSpotAt(e2.x,e2.y)===s.spot&&Math.random()<dt*(s.big?.22:.14)){see=e2;break}}}
      if(see){if(s.chase!==see){s.mark=1.2;s.cT=0}s.cT=(s.cT||0)+dt;if(s.st!=='chase'&&!s.big){s.react=.35}s.chase=see;s.st='chase';s.last={x:see.x,y:see.y};s.tx=see.x;s.ty=see.y}
      else if(s.st==='chase'){s.chase=null;s.st='look';s.tx=s.last?s.last.x:s.x;s.ty=s.last?s.last.y:s.y;s.wait=0}
      if(s.st==='patrol'||(s.st==='look'&&Math.hypot(s.tx-s.x,s.ty-s.y)<30)){
        if(s.st==='look'){var nb=null,nd=1e9;for(j=0;j<HSK.spots.length;j++){var o3=HSK.spots[j],d3=Math.hypot(o3.x-s.x,o3.y-s.y);if(d3<nd&&HSK.t-o3.chk>6){nd=d3;nb=o3}}s.spot=nb}
        else if(!s.spot||Math.hypot(s.spot.x-s.x,s.spot.y-s.y)<s.spot.r*.6){if(s.spot&&s.st==='patrol'&&s.wait<1.4){s.st='search';s.wait=0}else{var pk=null,ps=-1e9;for(j=0;j<HSK.spots.length;j++){var o4=HSK.spots[j],sc4=(HSK.t-o4.chk)*1.6-Math.hypot(o4.x-s.x,o4.y-s.y)*.02+rnd(0,8)-(HSK.seek.some(function(q){return q!==s&&q.spot===o4})?30:0);if(sc4>ps){ps=sc4;pk=o4}}s.spot=pk;s.wait=0}}
        if(s.spot){s.tx=s.spot.x;s.ty=s.spot.y;if(s.st==='look')s.st='patrol'}}
      if(s.st==='search'){s.wait+=dt;if(s.spot)s.spot.chk=HSK.t;var sa=s.ph*.6;s.tx=s.spot.x+Math.cos(sa)*s.spot.r*.5;s.ty=s.spot.y+Math.sin(sa)*s.spot.r*.4;if(s.wait>1.6){s.st='patrol';s.spot=null;s.wait=0}}
      var spdK=s.st==='chase'?(s.big?.82:.84):(s.st==='search'?.45:.62),dx=s.tx-s.x,dy=s.ty-s.y,dm=Math.hypot(dx,dy)||1,ss=sp*spdK*k*(dm<20?dm/20:1);
      s.vx+=(dx/dm*ss-s.vx)*Math.min(1,dt*(s.big?2.2:3.2));s.vy+=(dy/dm*ss-s.vy)*Math.min(1,dt*(s.big?2.2:3.2));
      s.x=clamp(s.x+s.vx*dt,b.x0+s.s*.5,b.x1-s.s*.5);s.y=clamp(s.y+s.vy*dt,b.y0+s.s*.5,b.y1-s.s*.5);
      var sv=Math.hypot(s.vx,s.vy);if(sv>6)s.ang=lerpAng(s.ang,Math.atan2(s.vy,s.vx),dt*(s.big?3.5:6));
      /* 잡기 */
      for(j=0;j<all.length;j++){var c=all[j];if(c.dead||s.chase!==c||(s.cT||0)<.7)continue; /* 들킨 뒤 0.7초는 못 잡음(찾았다 → 도망칠 틈) */if(Math.hypot(c.x-s.x,c.y-s.y)<s.s*.62+c.s*.45){
        if(c===P){if(fxOn('ghost'))continue;hsCatch(null,s);return}
        c.dead=true;HSK.caught++;rings.push({x:c.x,y:c.y,r:c.s*4,life:.5,max:.5,col:'229,56,59'});if(HSK.seek.length<5)hsAddSeek(false,{x:c.x,y:c.y});s.chase=null;s.st='patrol';s.spot=null;
        if(Math.hypot(c.x-P.x,c.y-P.y)<viewR()*1.1)texts.push({x:c.x,y:c.y-30,txt:hsW('caughtF'),life:1.4});try{buzz(20)}catch(e){}}}}
    /* 나를 쫓는 술래가 있나 */
    var chasing=HSK.seek.some(function(q){return q.chase===P});if(chasing&&!P.hsWas){banner(hsW('seen'),'');try{buzz([40,30,40])}catch(e){}}P.hsWas=chasing;HSK.warnT=chasing?Math.min(1,HSK.warnT+dt*3):Math.max(0,HSK.warnT-dt*2);
    if(P.still>=HSK.still&&hsSpotAt(P.x,P.y)&&!P.hsBub){P.hsBub=1;banner(hsW('bub'),'')}if(P.still<1)P.hsBub=0;
    /* 거품 */
    if(!reduce){all.forEach(function(e){if((e.still||0)>=HSK.still&&hsSpotAt(e.x,e.y)&&Math.random()<dt*9)HSK.bub.push({x:e.x+rnd(-6,6),y:e.y-e.s*.5,r:rnd(2.5,5.5),life:1.2})})}
    for(i=HSK.bub.length-1;i>=0;i--){var u=HSK.bub[i];u.life-=dt;u.y-=dt*45;u.x+=Math.sin(u.life*9)*.4;if(u.life<=0)HSK.bub.splice(i,1)}
    if(HSK.t>=HSK.T){hsFinish(true,false);return}
  }
  for(var fi=fxs.length-1;fi>=0;fi--){var fx=fxs[fi];fx.life-=dt;if(fx.vy)fx.y+=fx.vy*dt;if(fx.life<=0)fxs.splice(fi,1)}
  for(var ri=rings.length-1;ri>=0;ri--){rings[ri].life-=dt;if(rings[ri].life<=0)rings.splice(ri,1)}
  for(var ti=texts.length-1;ti>=0;ti--){var tx2=texts[ti];tx2.life-=dt;tx2.y-=dt*24;if(tx2.life<=0)texts.splice(ti,1)}
  fish.length=0;plank.length=0;
  var hT=$('hTime');if(hT){hT.hidden=false;var rem=Math.max(0,HSK.T-HSK.t);hT.textContent='⏱ '+fmtTime(rem)+' · '+hsW('left')+' '+(HSK.hid.filter(function(x){return !x.dead}).length+1)}
}

/* ---- 그리기 ---- */
function hsDrawSpot(o,front){var c=ctx,n=o.k==='kelp'?9:7,i;c.save();
  if(o.k==='kelp'){for(i=0;i<n;i++){var a=(i/(n-1)-.5),bx=o.x+a*o.r*1.5,by=o.y+o.r*.9,hh=o.r*(1.5+.35*Math.sin(o.seed+i*1.7)),sw=Math.sin(t*1.3+o.seed+i)*o.r*.22;
      if(front&&i%2===0)continue;if(!front&&i%2===1)continue;
      c.beginPath();c.moveTo(bx,by);c.quadraticCurveTo(bx+sw*1.4,by-hh*.55,bx+sw,by-hh);c.lineWidth=Math.max(7,o.r*.2);c.lineCap='round';c.strokeStyle=front?'rgba(46,160,92,.88)':'rgba(30,120,70,.95)';c.stroke();
      c.lineWidth=Math.max(2,o.r*.06);c.strokeStyle=front?'rgba(140,230,150,.55)':'rgba(90,190,110,.45)';c.stroke()}}
  else{/* 말미잘: 둥근 밑동 + 하늘거리는 촉수(끝이 둥근) */var hue=[[255,120,170],[255,160,90],[190,120,255]][Math.floor(o.seed)%3],m=16;
    if(!front){c.beginPath();c.ellipse(o.x,o.y+o.r*.55,o.r*.7,o.r*.32,0,0,Math.PI*2);c.fillStyle='rgb('+(hue[0]*.55|0)+','+(hue[1]*.45|0)+','+(hue[2]*.55|0)+')';c.fill()}
    for(i=0;i<m;i++){if(front&&i%2===0)continue;if(!front&&i%2===1)continue;var a3=-Math.PI+.25+(i/(m-1))*(Math.PI-.5),L3=o.r*(.95+.25*Math.sin(o.seed*2+i)),sw3=Math.sin(t*1.6+o.seed+i*.7)*.28,bx3=o.x+Math.cos(a3)*o.r*.35,by3=o.y+o.r*.45,ex=bx3+Math.cos(a3+sw3)*L3,ey=by3+Math.sin(a3+sw3)*L3;
      c.beginPath();c.moveTo(bx3,by3);c.quadraticCurveTo(bx3+Math.cos(a3)*L3*.6+sw3*o.r*.4,by3+Math.sin(a3)*L3*.6,ex,ey);c.lineCap='round';c.lineWidth=Math.max(5,o.r*.14);c.strokeStyle='rgba('+hue.join(',')+','+(front?.85:1)+')';c.stroke();
      c.beginPath();c.arc(ex,ey,Math.max(3,o.r*.09),0,Math.PI*2);c.fillStyle='rgba(255,240,250,'+(front?.9:1)+')';c.fill()}}
  c.restore()}
function hsDrawUnder(){if(!P.hide||!HSK.box)return;var c=ctx,b=HSK.box,i,mlw=1.2/zoom;
  c.save();c.fillStyle='rgba(4,20,40,.45)';var L=cam.x-cw/zoom,R=cam.x+cw/zoom,T=cam.y-ch/zoom,B=cam.y+ch/zoom;
  if(L<b.x0)c.fillRect(L,T,b.x0-L,B-T);if(R>b.x1)c.fillRect(b.x1,T,R-b.x1,B-T);if(T<b.y0)c.fillRect(b.x0,T,b.x1-b.x0,b.y0-T);if(B>b.y1)c.fillRect(b.x0,b.y1,b.x1-b.x0,B-b.y1);
  c.setLineDash([14/zoom,10/zoom]);c.lineWidth=3/zoom;c.strokeStyle='rgba(255,255,255,.35)';c.strokeRect(b.x0,b.y0,b.x1-b.x0,b.y1-b.y0);c.setLineDash([]);c.restore();
  for(i=0;i<HSK.spots.length;i++)hsDrawSpot(HSK.spots[i],false);
  for(i=0;i<HSK.hid.length;i++){var h=HSK.hid[i];if(h.dead)continue;drawFish(c,h.x,h.y,h.s,h.ang,h.look,{px:h.s*zoom,phase:h.ph,minLw:mlw})}}
function hsDrawOver(){if(!P.hide||!HSK.box)return;var c=ctx,i,mlw=1.2/zoom;
  for(i=0;i<HSK.spots.length;i++)hsDrawSpot(HSK.spots[i],true);
  for(i=0;i<HSK.bub.length;i++){var u=HSK.bub[i];c.globalAlpha=Math.min(1,u.life*1.5);c.beginPath();c.arc(u.x,u.y,u.r,0,Math.PI*2);c.fillStyle='rgba(255,255,255,.25)';c.fill();c.lineWidth=1.2/zoom;c.strokeStyle='rgba(255,255,255,.9)';c.stroke()}c.globalAlpha=1;
  for(i=0;i<HSK.seek.length;i++){var s=HSK.seek[i];drawFish(c,s.x,s.y,s.s,s.ang,s.look,{px:s.s*zoom,phase:s.ph,minLw:mlw,angry:s.st==='chase'});
    if(s.red){c.save();c.globalAlpha=.35;c.beginPath();c.arc(s.x,s.y,s.s*.9,0,Math.PI*2);c.lineWidth=3/zoom;c.strokeStyle='#E5383B';c.stroke();c.restore()}
    var ic=s.st==='chase'?'!':s.st==='search'?'?':'';if(ic){var fs=Math.max(18,s.s*.5)/Math.max(.6,zoom*.8);c.save();c.font=fs+'px "Black Han Sans", Jua, sans-serif';c.textAlign='center';c.lineJoin='round';c.lineWidth=5/zoom;c.strokeStyle='#0B2C4A';var iy=s.y-s.s*.9-6/zoom;c.strokeText(ic,s.x,iy);c.fillStyle=ic==='!'?'#FF5A5F':'#FFD93B';c.fillText(ic,s.x,iy);c.restore()}}
  if(state==='play'&&!P.dead){var hid=hsHidden(P),stl=P.still||0,lbl=hid?hsW('hidden'):'';var yy=P.y-P.s*2.2-8/zoom;
    if(hsSpotAt(P.x,P.y)&&stl>1.5){var q=Math.min(1,stl/HSK.still);c.save();c.beginPath();c.arc(P.x,P.y,P.s*1.9,-Math.PI/2,-Math.PI/2+Math.PI*2*q);c.lineWidth=3/zoom;c.strokeStyle=q>=1?'#FF5A5F':'rgba(255,255,255,.85)';c.stroke();c.restore()}
    if(lbl){c.save();c.font=(13/zoom)+'px "Black Han Sans", Jua, sans-serif';c.textAlign='center';c.lineJoin='round';c.lineWidth=4/zoom;c.strokeStyle='#0B2C4A';c.strokeText(lbl,P.x,yy);c.fillStyle='#B9FFCF';c.fillText(lbl,P.x,yy);c.restore()}}}
function hsDrawHud(){if(!P.hide||!(state==='play'||state==='pause'))return;if(HSK.warnT>0){var c=ctx,wa=(.42+.18*Math.sin(t*12))*HSK.warnT,g=c.createRadialGradient(cw/2,ch/2,Math.min(cw,ch)*.24,cw/2,ch/2,Math.hypot(cw,ch)*.52);g.addColorStop(0,'rgba(229,56,59,0)');g.addColorStop(1,'rgba(229,56,59,'+wa+')');c.fillStyle=g;c.fillRect(0,0,cw,ch)}}
var svDrawUnderHS=svDrawUnder;svDrawUnder=function(){if(P&&P.hide){try{hsDrawUnder()}catch(e){}return}return svDrawUnderHS.apply(this,arguments)};
var svDrawOverHS=svDrawOver;svDrawOver=function(){if(P&&P.hide){try{hsDrawOver()}catch(e){}return}return svDrawOverHS.apply(this,arguments)};
var svDrawHudHS=svDrawHud;svDrawHud=function(){if(P&&P.hide){try{hsDrawHud()}catch(e){}return}return svDrawHudHS.apply(this,arguments)};
var drawGaugeHS=drawGauge;drawGauge=function(){if(P&&P.hide)return;return drawGaugeHS.apply(this,arguments)};

/* ---- 시작 · 끝 ---- */
var useEnergyHS=useEnergy;useEnergy=function(){if(HSK.pend)return true;return useEnergyHS.apply(this,arguments)};
var startRunHS=startRun;startRun=function(m){if(P)P.hide=false;var hs=HSK.pend&&m==='single';var r=startRunHS.apply(this,arguments);
  if(hs){HSK.pend=false;if(state==='play'){P.hide=true;mode='hide';P.boost={};P.revives=0;P.fx={ghost:2};P.s=P.maxS=START_S;H=H0*scaleOf(P.s);hsBuild();fish.length=0;plank.length=0;
    cam.x=P.x;cam.y=P.y;zoom=targetZoom();lastCX=cam.x;lastCY=cam.y;try{buildFar()}catch(e){}
    ['skill','goal','hint','hudInfo'].forEach(function(id){var e=$(id);if(e)e.hidden=true});var hz=$('hudSize');if(hz)hz.dataset.hs='1';$('hud').dataset.mode='hide';
    try{bannerOff()}catch(e){}setTimeout(function(){if(P.hide)try{bannerOff()}catch(e){}},400);P.wev=null;var hs0=hsS();hs0.games=(hs0.games|0)+1;persist();try{msEv('run_hide')}catch(e){}crumb('hideStart')}}
  else HSK.pend=false;return r};
function hsStart(){var L=byId(sel);if(!L||!owns(L.id)){sel=save.owned[0]}HSK.pend=true;try{$('arPick').hidden=true}catch(e){}NET.room='';startRun('single')}
function hsCatch(by,s){if(P.dead)return;P.dead=true;rings.push({x:P.x,y:P.y,r:P.s*6,life:.6,max:.6,col:'229,56,59'});shake=reduce?0:.4;try{buzz(70)}catch(e){}hsFinish(false,false)}
function hsFinish(win,quit){if(HSK.end)return;HSK.end=true;var tm=Math.round(HSK.t),left=HSK.hid.filter(function(x){return !x.dead}).length,o=hsS(),rec=false;
  state='over';P.dead=true;joy=null;try{bannerOff()}catch(e){}try{if(win&&!quit)MUS.win();else if(!quit)MUS.lose()}catch(e){}
  var gain=quit?Math.floor(tm/4):Math.floor(20+tm*.6+(win?90+left*10:0));gain=Math.floor(gain*(x2On()?2:1));save.pearls+=gain;
  if(win&&!quit)o.wins=(o.wins|0)+1;if(!quit&&tm>(o.best|0)){o.best=tm;rec=true}o.caught=(o.caught|0)+HSK.caught;
  if(tm>=20){try{dmAdd('arena',1)}catch(e){}}try{dmAdd('pearl',gain);dmAdd('time',tm)}catch(e){}persist();crumb('hideEnd:'+(win?'win':quit?'quit':'caught')+':'+tm);
  var ti=quit?hsW('quit'):win?hsW('win'):hsW('lose'),ld=hsF(hsW('lead'),{t:fmtTime(Math.min(tm,HSK.T)),n:left,p:nf(gain)})+(rec?hsW('rec'):'');
  setTimeout(function(){if(state!=='over'||!P.hide)return;$('hud').hidden=true;openSheet((win&&!quit?'🏆 ':'🦈 ')+ti,ld,[
    {id:'hsAgain',name:hsW('again'),tag:hsW('free'),desc:hsW('againD'),go:function(){hsStart()}},
    {id:'hsPick',name:hsW('pick'),tag:'⚔',desc:hsW('pickD'),go:function(){hsHome();arPickOpen()}},
    {id:'hsHome',name:hsW('home'),tag:'⌂',desc:hsW('homeD'),go:function(){hsHome()}}])},win?900:700)}
function hsHome(){P.hide=false;mode='single';HSK.box=null;HSK.seek=[];HSK.hid=[];var hz=$('hudSize');if(hz)delete hz.dataset.hs;try{toHome()}catch(e){}}
$('shClose').addEventListener('click',function(){setTimeout(function(){if(P&&P.hide&&state==='over'&&$('sheet').hidden)hsHome()},0)});
var endRunHS=endRun;endRun=function(win,quit,by){if(P&&P.hide){if(state==='pause'){state='play';$('pause').hidden=true}if(state==='play')hsFinish(false,!!quit);return}return endRunHS.apply(this,arguments)};

/* ---- 대전 고르기 창: 일반 대전 / 숨바꼭질 ---- */
(function(){var st=document.createElement('style');st.textContent=
  '#hud[data-mode=hide] #hudSize,#hud[data-mode=hide] #rankBox{display:none!important}#arPick .panel{max-width:420px}#arPick .ar-tabs{display:flex;gap:6px;background:#2C4459;border-radius:16px;padding:5px;margin:4px 0 12px}'+
  '#arPick .ar-tabs button{flex:1;position:relative;border:0;border-radius:12px;padding:10px 6px;font:400 17px var(--disp);color:#DCE8F2;background:transparent;cursor:pointer}'+
  '#arPick .ar-tabs button[aria-pressed=true]{background:linear-gradient(180deg,#FFD25C,#F2A52A);color:#3A2400;box-shadow:0 3px 0 #B9741A}'+
  '#arPick .ar-tabs .nw{position:absolute;top:-7px;right:6px;font:700 10px system-ui,sans-serif;background:#FF5A5F;color:#fff;border-radius:8px;padding:2px 6px}'+
  '#arPick .ar-body{min-height:190px}#arPick .ar-body p{margin:0 0 8px;line-height:1.4}#arPick .ar-body ul{margin:0 0 10px;padding-left:20px;line-height:1.45}#arPick .ar-body li{margin:3px 0}'+
  '#arPick .ar-stat{font-size:13px;opacity:.8;margin:2px 0 10px}#arPick .ar-row{display:flex;gap:8px}#arPick .ar-row .btn{flex:1}';document.head.appendChild(st)})();
function arPickOpen(){var el=$('arPick');if(!el){el=document.createElement('div');el.className='overlay';el.id='arPick';el.hidden=true;el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
    el.innerHTML='<div class="panel"><h1></h1><div class="ar-tabs" role="tablist"><button type="button" id="arT-arena" role="tab"></button><button type="button" id="arT-hide" role="tab"></button></div><div class="ar-body" id="arBody"></div><div class="row"><button class="btn ghost" id="arX" type="button"></button></div></div>';
    document.body.appendChild(el);$('arX').addEventListener('click',function(){el.hidden=true});el.addEventListener('click',function(e){if(e.target===el)el.hidden=true});
    $('arT-arena').addEventListener('click',function(){arPickTab('arena')});$('arT-hide').addEventListener('click',function(){arPickTab('hide')})}
  el.querySelector('h1').textContent=hsW('pick');$('arX').textContent=T('닫기');arPickTab(save.arTab==='hide'?'hide':'arena');el.hidden=false;crumb('arPick')}
function arPickTab(k){save.arTab=k;persist();var a=$('arT-arena'),h=$('arT-hide'),b=$('arBody');a.textContent=hsW('arena');h.textContent=hsW('title');
  if(!save.hsSeenNew){var nw=document.createElement('span');nw.className='nw';nw.textContent=hsW('newT');h.appendChild(nw)}
  a.setAttribute('aria-pressed',k==='arena'?'true':'false');h.setAttribute('aria-pressed',k==='hide'?'true':'false');b.textContent='';
  if(k==='arena'){var p=document.createElement('p');p.textContent=hsW('arenaD');b.appendChild(p);var row=document.createElement('div');row.className='ar-row';
    var g=document.createElement('button');g.type='button';g.className='btn';g.textContent=hsW('go');g.addEventListener('click',function(){$('arPick').hidden=true;NET.room='';curSrv=SERVERS[0];startRun('multi')});
    var rm=document.createElement('button');rm.type='button';rm.className='btn ghost';rm.textContent=hsW('room');rm.addEventListener('click',function(){$('arPick').hidden=true;try{roomOpen()}catch(e){}});row.appendChild(g);row.appendChild(rm);b.appendChild(row)}
  else{if(!save.hsSeenNew){save.hsSeenNew=1;persist()}var ul=document.createElement('ul');['r1','r2','r3','r4'].forEach(function(r){var li=document.createElement('li');li.textContent=hsW(r);ul.appendChild(li)});b.appendChild(ul);
    var o=hsS(),sp=document.createElement('p');sp.className='ar-stat';sp.textContent=hsF(hsW('stat'),{w:nf(o.wins|0),b:o.best?fmtTime(Math.min(o.best,HSK.T)):'-',g:nf(o.games|0)});b.appendChild(sp);
    var row2=document.createElement('div');row2.className='ar-row';var s=document.createElement('button');s.type='button';s.className='btn';s.textContent=hsW('start')+' · '+hsW('free');s.addEventListener('click',hsStart);row2.appendChild(s);b.appendChild(row2)}}
(function(){var mb=$('mpBtn');if(!mb)return;var nb=mb.cloneNode(true);mb.parentNode.replaceChild(nb,mb);nb.addEventListener('click',function(){arPickOpen()})})();
