/* ===== 1.1.30 숨바꼭질 바다 (늑구: '대전을 누르면 탭 두 개 — 일반 대전 · 숨바꼭질') =====
   대전 버튼 → 고르기 창(일반 대전 / 숨바꼭질). 숨바꼭질은 혼자 하는 판(봇이 술래 · 숨는 친구), 에너지 없음.
   규칙: 2분 동안 거대 상어 술래에게 안 잡히면 승리. 해초 · 산호 속에 들어가면 술래 눈에 안 보이지만,
   한자리에 6초 넘게 가만히 있으면 거품이 올라와 들킴. 잡힌 친구는 작은 술래가 되어 같이 찾음(갈수록 술래가 늘어남).
   모드 값은 'hide'(싱글 전용 이벤트 · 낚싯바늘 · 황금 물고기 · 산타 보스 등이 끼지 않게), 기록은 save.hs */
var HSK={pend:false,on:false,T:120,still:6,box:null,spots:[],seek:[],hid:[],t:0,cd:0,caught:0,end:false,warnT:0,bub:[],rip:[],why:''};
var HS_HIDERS=['clownfish','bluetang','butterfly','yellowtang','royalgramma','mandarinfish','banggai','seahorse'];
/* 들키는 이유(늑구 '숨었는데 막 찾아내는 건 이상'): 운으로 찾아내는 규칙은 없음. 아래 넷 중 하나를 해야 들킴
   ① 탁 트인 물에 있음 → 술래 시야(큰 상어 250 · 작은 술래 170)에 보임
   ② 숨는 곳 가장자리 → 꼬리가 삐져나옴, 술래가 가까이(150) 오면 보임
   ③ 숨는 곳에서 빠르게 움직임(조이스틱 끝까지) → 해초가 흔들리고 물결 소리, 술래가 듣고(260) 찾아옴 → 가까이(110)서 또 흔들리면 들킴
   ④ 6초 넘게 가만히 → 거품이 올라와 보임(시야 안)
   천천히(조이스틱 반쯤) 움직이며 숨는 곳 한가운데에 있으면 술래가 바로 옆을 지나가도 안 들킴. 술래는 숨는 곳 가장자리를 돌며 살핌 */
var HS_EDGE=.62,HS_FAST=.55;
var HS_WORDS={
  title:{ko:'숨바꼭질',en:'Hide & Seek',ja:'かくれんぼ',es:'Escondite',vi:'Trốn tìm'},
  arena:{ko:'일반 대전',en:'Arena',ja:'通常対戦',es:'Arena',vi:'Đấu trường'},
  pick:{ko:'대전',en:'Battle',ja:'対戦',es:'Batalla',vi:'Thi đấu'},
  arenaD:{ko:'다른 사람들과 같은 바다에서 누가 더 크게 자라나 겨뤄요 · 에너지 없이 언제든',en:'Grow bigger than everyone else in the same sea · no energy needed',ja:'同じ海でだれが一番大きく育つか競います・エネルギー不要',es:'Crece más que nadie en el mismo mar · sin energía',vi:'Lớn nhanh hơn mọi người trong cùng vùng biển · không tốn năng lượng'},
  go:{ko:'들어가기',en:'Enter',ja:'入る',es:'Entrar',vi:'Vào'},
  room:{ko:'친구 바다',en:'Friend sea',ja:'フレンドの海',es:'Mar de amigos',vi:'Biển bạn bè'},
  r1:{ko:'2분 동안 거대 상어 술래에게 잡히지 않으면 승리!',en:'Avoid the giant shark for 2 minutes to win!',ja:'2分間、巨大ザメの鬼に捕まらなければ勝ち！',es:'¡Evita al tiburón gigante durante 2 minutos!',vi:'Tránh con cá mập khổng lồ trong 2 phút để thắng!'},
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
  caughtF:{ko:'친구가 잡혀서 술래가 됐어요',en:'A fish was caught and became a seeker',ja:'仲間が捕まって鬼になった',es:'Atraparon a un pez: ahora busca',vi:'Một bạn bị bắt và thành kẻ tìm'},
  r2:{"ko": "해초 · 말미잘 · 산호 · 바위 한가운데에 숨으면 술래가 바로 옆을 지나가도 못 찾아요", "en": "Hide in the middle of kelp, anemones, coral or rocks and the seeker swims right past you", "ja": "海藻・イソギンチャク・サンゴ・岩の真ん中にかくれれば、鬼がすぐ横を通っても見つかりません", "es": "Escóndete en el centro de algas, anémonas, coral o rocas y el buscador pasará de largo", "vi": "Trốn giữa rong, hải quỳ, san hô hoặc đá thì kẻ tìm đi ngang cũng không thấy"},
  r3:{"ko": "들키는 이유 셋: 가장자리(꼬리가 삐져나옴) · 빨리 움직임(해초가 흔들림) · 6초 넘게 가만히(거품)", "en": "You get spotted for 3 reasons: at the edge (tail sticks out) · moving fast (cover shakes) · still over 6 s (bubbles)", "ja": "見つかる理由は3つ：はじっこ（しっぽが出る）・速く動く（海藻がゆれる）・6秒以上じっと（泡）", "es": "Te descubren por 3 cosas: en el borde (se ve la cola) · moverte rápido (se agita) · quieto 6 s (burbujas)", "vi": "Bị lộ vì 3 lý do: ở mép (lòi đuôi) · bơi nhanh (rong rung) · đứng yên quá 6 giây (bong bóng)"},
  go:{"ko": "술래 출발!", "en": "Here it comes!", "ja": "鬼が動き出した！", "es": "¡Ahí viene!", "vi": "Kẻ tìm xuất phát!"},
  goD:{"ko": "천천히 움직이며 숨는 곳 한가운데로", "en": "Move slowly, stay in the middle of cover", "ja": "ゆっくり動いて、かくれ場所の真ん中へ", "es": "Muévete despacio, al centro del escondite", "vi": "Bơi chậm, ở giữa chỗ nấp"},
  cd:{"ko": "숨을 곳을 찾아요!", "en": "Find a place to hide!", "ja": "かくれる場所をさがそう！", "es": "¡Busca dónde esconderte!", "vi": "Tìm chỗ trốn đi!"},
  tip:{"ko": "조이스틱을 반만 밀면 천천히 움직여요", "en": "Push the stick halfway to sneak", "ja": "スティックを半分だけ倒すとゆっくり動けます", "es": "Empuja el mando a medias para ir sigiloso", "vi": "Đẩy cần nửa chừng để bơi lén"},
  tipD:{"ko": "빨리 움직이면 해초가 흔들려 들켜요", "en": "Moving fast shakes the cover and gives you away", "ja": "速く動くと海藻がゆれてバレます", "es": "Si vas rápido, el escondite se agita y te delata", "vi": "Bơi nhanh làm rong rung và bị lộ"},
  st_bub:{"ko": "거품! 조금 움직여요", "en": "Bubbles! Move a bit", "ja": "泡！少し動いて", "es": "¡Burbujas! Muévete", "vi": "Bong bóng! Nhúc nhích đi"},
  st_tail:{"ko": "꼬리가 보여요 · 더 안으로", "en": "Tail showing · go deeper", "ja": "しっぽが見えてる・もっと奥へ", "es": "Se ve la cola · más adentro", "vi": "Lòi đuôi · vào sâu hơn"},
  st_noise:{"ko": "흔들려요 · 천천히", "en": "Shaking · slow down", "ja": "ゆれてる・ゆっくり", "es": "Se agita · más despacio", "vi": "Đang rung · chậm lại"},
  why_open:{"ko": "탁 트인 물에서 보였어요", "en": "Seen in open water", "ja": "ひらけた水で見つかった", "es": "Te vio en aguas abiertas", "vi": "Bị thấy ở vùng nước trống"},
  why_bub:{"ko": "거품 때문에 들켰어요", "en": "Your bubbles gave you away", "ja": "泡でバレた", "es": "Te delataron las burbujas", "vi": "Bị lộ vì bong bóng"},
  why_tail:{"ko": "꼬리가 삐져나와 들켰어요", "en": "Your tail was sticking out", "ja": "しっぽが出ていてバレた", "es": "Se te veía la cola", "vi": "Bị lộ vì lòi đuôi"},
  why_noise:{"ko": "해초가 흔들려 들켰어요", "en": "The cover shook and gave you away", "ja": "海藻がゆれてバレた", "es": "El escondite se agitó", "vi": "Bị lộ vì rong rung"},
  why_bump:{"ko": "술래와 부딪혔어요", "en": "You bumped into the seeker", "ja": "鬼にぶつかった", "es": "Chocaste con el buscador", "vi": "Va phải kẻ tìm"},
  whyL:{"ko": "들킨 이유: ", "en": "Spotted: ", "ja": "バレた理由：", "es": "Te descubrió: ", "vi": "Bị lộ: "}
};
function hsS(){if(!save.hs||typeof save.hs!=='object')save.hs={games:0,wins:0,best:0,caught:0};return save.hs}
function hsL(){return SUBL||LANG}
function hsW(k){var L=HS_WORDS[k]||{};return L[hsL()]||L.en||L.ko||k}
function hsF(s,o){return String(s).replace(/\{(\w+)\}/g,function(m,k){return o[k]!=null?o[k]:m})}
function hsSpecies(id,fb){var L=byId(id);return L&&L.id===id?L:byId(fb)}

/* ---- 판 만들기 ---- */
var HS_KINDS=['kelp','kelp','anem','coral','rock'];
function hsBuild(){var cx=0,cy=clamp(P.y,900,H-900),W=1250,Hh=760;HSK.box={x0:cx-W,x1:cx+W,y0:cy-Hh,y1:cy+Hh};
  HSK.spots=[];var tries=0;while(HSK.spots.length<17&&tries<900){tries++;var r=rnd(62,92),x=rnd(HSK.box.x0+r+40,HSK.box.x1-r-40),y=rnd(HSK.box.y0+r+40,HSK.box.y1-r-40),ok=true;
    for(var i=0;i<HSK.spots.length;i++){var o=HSK.spots[i];if(Math.hypot(o.x-x,o.y-y)<o.r+r+150){ok=false;break}}if(Math.hypot(x-cx,y-cy)<120)ok=false;
    if(ok)HSK.spots.push({x:x,y:y,r:r,k:HS_KINDS[HSK.spots.length%HS_KINDS.length],seed:Math.random()*9,flip:Math.random()<.5,shake:0})}
  P.x=cx;P.y=cy;P.vx=P.vy=0;
  HSK.hid=[];var ids=HS_HIDERS.slice().sort(function(){return Math.random()-.5}).slice(0,7);
  ids.forEach(function(id,k){var a=k/7*Math.PI*2;HSK.hid.push({x:cx+Math.cos(a)*90,y:cy+Math.sin(a)*70,vx:0,vy:0,s:START_S*rnd(.9,1.08),ang:a,look:hsSpecies(id,'clownfish'),ph:Math.random()*6,tgt:null,still:0,wig:rnd(2,5),dead:false,think:rnd(.3,1.2),noise:0})});
  HSK.seek=[];hsAddSeek(true);HSK.t=0;HSK.cd=4;HSK.caught=0;HSK.end=false;HSK.warnT=0;HSK.bub=[];HSK.rip=[];HSK.why='';HSK.lastHalf=false;HSK.hb=0;P.still=0;P.noise=0;P.hsWas=0;P.hsBub=0;P.hsTip=0}
function hsAddSeek(big,at){var b=HSK.box,x,y;if(at){x=at.x;y=at.y}else{x=Math.random()<.5?b.x0+60:b.x1-60;y=rnd(b.y0+100,b.y1-100)}
  var L=big?hsSpecies('tigershark','shark'):hsSpecies('reefshark','shark');
  HSK.seek.push({x:x,y:y,vx:0,vy:0,s:big?START_S*5:START_S*1.7,big:!!big,ang:0,look:L,ph:Math.random()*6,st:'patrol',spot:null,wait:0,tx:x,ty:y,last:null,chase:null,cT:0,red:!big,stun:at?2.2:0,orb:Math.random()*6})}

/* ---- 숨기 판정 ---- */
function hsSpotAt(x,y){for(var i=0;i<HSK.spots.length;i++){var o=HSK.spots[i];if(Math.hypot(o.x-x,o.y-y)<o.r*.82)return o}return null}
function hsDeep(e){var o=hsSpotAt(e.x,e.y);return o&&Math.hypot(o.x-e.x,o.y-e.y)<o.r*HS_EDGE?o:null}
function hsHidden(e){return !!hsSpotAt(e.x,e.y)&&(e.still||0)<HSK.still}
function hsSpd(){return refSpeed()}
/* 술래 s가 e를 볼 수 있으면 이유를, 못 보면 '' */
function hsSees(s,e){var d=Math.hypot(e.x-s.x,e.y-s.y),sight=s.big?250:170,o=hsSpotAt(e.x,e.y);
  if(d<s.s*.3+e.s*.5)return 'bump';
  if(!o)return d<sight?'open':'';
  if((e.still||0)>=HSK.still)return d<sight?'bub':'';
  if(Math.hypot(o.x-e.x,o.y-e.y)>=o.r*HS_EDGE)return d<150?'tail':'';
  if((e.noise||0)>.5)return d<110?'noise':'';
  return ''}

/* ---- 매 프레임 ---- */
function hsMoveStat(e,v,dt){var sp=hsSpd(),r=v/sp,o=hsSpotAt(e.x,e.y);e.still=r<.12?(e.still||0)+dt:Math.max(0,(e.still||0)-dt*8);
  var fast=o&&r>HS_FAST;e.noise=fast?Math.min(1,(e.noise||0)+dt*3):Math.max(0,(e.noise||0)-dt*2);if(fast){o.shake=Math.min(1,o.shake+dt*4);e.ripT=(e.ripT||0)-dt;if(e.ripT<=0){e.ripT=.45;HSK.rip.push({x:e.x,y:e.y,life:.8});
      for(var j=0;j<HSK.seek.length;j++){var s=HSK.seek[j];if(s.st!=='chase'&&s.stun<=0&&Math.hypot(s.x-e.x,s.y-e.y)<260){s.st='look';s.tx=e.x;s.ty=e.y;s.spot=o;s.heard=1}}}}}
function hsUpdate(dt,playing){
  var b=HSK.box;if(!b)return;
  if(playing){
    P.x=clamp(P.x,b.x0+P.s,b.x1-P.s);P.y=clamp(P.y,b.y0+P.s,b.y1-P.s);
    var sp=hsSpd(),i,j;hsMoveStat(P,Math.hypot(P.vx,P.vy),dt);
    for(i=0;i<HSK.spots.length;i++)HSK.spots[i].shake=Math.max(0,HSK.spots[i].shake-dt*1.5);
    if(HSK.cd>0){HSK.cd-=dt;P.time=0;if(HSK.cd<=0){banner(hsW('go'),hsW('goD'));try{buzz([30,30,60])}catch(e){}}}
    else{HSK.t+=dt;P.time=HSK.t}
    var lastHalf=HSK.T-HSK.t<=30;if(lastHalf&&!HSK.lastHalf){HSK.lastHalf=true;banner(hsW('last'),'');try{buzz([30,40,30])}catch(e){}}
    var k=lastHalf?1.1:1;
    /* 숨는 친구(봇): 숨는 곳 한가운데로 천천히, 가끔 살짝 움직여 거품을 피함. 들키면 먼 숨는 곳으로 도망 */
    for(i=0;i<HSK.hid.length;i++){var h=HSK.hid[i];if(h.dead)continue;h.ph+=dt*6;h.think-=dt;
      var thr=null;for(j=0;j<HSK.seek.length;j++)if(HSK.seek[j].chase===h)thr=HSK.seek[j];
      var inS=hsSpotAt(h.x,h.y);
      if(thr){if(h.think<=0||!h.tgt||h.tgt===inS){h.think=.8;var best=null,bs=-1e9;for(j=0;j<HSK.spots.length;j++){var o=HSK.spots[j],sc=Math.hypot(o.x-thr.x,o.y-thr.y)-Math.hypot(o.x-h.x,o.y-h.y)*.8-HSK.hid.filter(function(z){return z!==h&&!z.dead&&z.tgt===o}).length*250;if(sc>bs){bs=sc;best=o}}h.tgt=best}}
      else if(!inS&&(!h.tgt||h.think<=0)){h.think=rnd(1.5,3);var bo=null,bd=1e9;for(j=0;j<HSK.spots.length;j++){var o2=HSK.spots[j],d2=Math.hypot(o2.x-h.x,o2.y-h.y)+rnd(0,160)+HSK.hid.filter(function(z){return z!==h&&!z.dead&&z.tgt===o2}).length*450;if(d2<bd){bd=d2;bo=o2}}h.tgt=bo}
      else if(inS&&!thr)h.tgt=inS;
      var tx=h.x,ty=h.y,want=0;
      if(h.tgt){tx=h.tgt.x+Math.cos(h.ph*.05+i)*h.tgt.r*.2;ty=h.tgt.y+Math.sin(h.ph*.04+i)*h.tgt.r*.15;var dd=Math.hypot(tx-h.x,ty-h.y);want=thr?.95:dd>h.tgt.r*.35?(inS?.45:.85):0;
        if(!want){h.wig-=dt;if(h.wig<=0){h.wig=rnd(2,4.8);h.wigT=.7}}}
      if(h.wigT>0){h.wigT-=dt;want=.28;ty+=Math.sin(h.ph)*20}
      var hx=tx-h.x,hy=ty-h.y,hm=Math.hypot(hx,hy)||1,hs=sp*want;
      h.vx+=(hx/hm*hs-h.vx)*Math.min(1,dt*4);h.vy+=(hy/hm*hs-h.vy)*Math.min(1,dt*4);h.x=clamp(h.x+h.vx*dt,b.x0+h.s,b.x1-h.s);h.y=clamp(h.y+h.vy*dt,b.y0+h.s,b.y1-h.s);
      var hv=Math.hypot(h.vx,h.vy);if(hv>8)h.ang=lerpAng(h.ang,Math.atan2(h.vy,h.vx),dt*8);hsMoveStat(h,hv,dt)}
    /* 술래 */
    var all=[P].concat(HSK.hid.filter(function(x){return !x.dead}));
    for(i=0;i<HSK.seek.length;i++){var s=HSK.seek[i];s.ph+=dt*5;s.orb+=dt*.9;
      if(HSK.cd>0||s.stun>0){if(s.stun>0)s.stun-=dt;s.vx*=.9;s.vy*=.9;s.x+=s.vx*dt;s.y+=s.vy*dt;continue}
      var see=null,sd=1e9,why='';
      for(j=0;j<all.length;j++){var e=all[j];if(e.dead)continue;var w=hsSees(s,e);if(!w)continue;var d=Math.hypot(e.x-s.x,e.y-s.y);if(d<sd){sd=d;see=e;why=w}}
      if(see){if(s.chase!==see){s.cT=0;if(see===P){HSK.why=why;P.hsWhy=why}}s.cT+=dt;s.chase=see;s.st='chase';s.last={x:see.x,y:see.y};s.tx=see.x;s.ty=see.y}
      else if(s.st==='chase'){s.chase=null;s.st='look';s.tx=s.last?s.last.x:s.x;s.ty=s.last?s.last.y:s.y;s.spot=hsSpotAt(s.tx,s.ty)}
      if(s.st==='look'&&Math.hypot(s.tx-s.x,s.ty-s.y)<40){s.st=s.spot?'search':'patrol';s.wait=0}
      if(s.st==='patrol'&&(!s.spot||Math.hypot(s.spot.x-s.x,s.spot.y-s.y)<s.spot.r*1.3)){
        if(s.spot&&s.wait<.1){s.st='search';s.wait=0}else{var pk=null,ps=-1e9;for(j=0;j<HSK.spots.length;j++){var o4=HSK.spots[j],sc4=(HSK.t-(o4.chk||-30))*1.6-Math.hypot(o4.x-s.x,o4.y-s.y)*.02+rnd(0,8)-(HSK.seek.some(function(q){return q!==s&&q.spot===o4})?30:0);if(sc4>ps){ps=sc4;pk=o4}}s.spot=pk;s.wait=0}}
      if(s.st==='patrol'&&s.spot){s.tx=s.spot.x;s.ty=s.spot.y}
      if(s.st==='search'&&s.spot){s.wait+=dt;s.spot.chk=HSK.t;var sa=s.orb*1.6;s.tx=s.spot.x+Math.cos(sa)*s.spot.r*1.05;s.ty=s.spot.y+Math.sin(sa)*s.spot.r*.95;if(s.wait>2.2){s.st='patrol';s.wait=1}}
      var spdK=s.st==='chase'?(s.big?.82:.84):s.st==='search'?.42:s.st==='look'?.7:.6,dx=s.tx-s.x,dy=s.ty-s.y,dm=Math.hypot(dx,dy)||1,ss=sp*spdK*k*(dm<20?dm/20:1);
      s.vx+=(dx/dm*ss-s.vx)*Math.min(1,dt*(s.big?2.2:3.2));s.vy+=(dy/dm*ss-s.vy)*Math.min(1,dt*(s.big?2.2:3.2));
      s.x=clamp(s.x+s.vx*dt,b.x0+s.s*.5,b.x1-s.s*.5);s.y=clamp(s.y+s.vy*dt,b.y0+s.s*.5,b.y1-s.s*.5);
      var sv=Math.hypot(s.vx,s.vy);if(sv>6)s.ang=lerpAng(s.ang,Math.atan2(s.vy,s.vx),dt*(s.big?3.5:6));
      /* 잡기: 들킨 뒤 0.7초는 못 잡음(도망칠 틈) */
      for(j=0;j<all.length;j++){var c=all[j];if(c.dead||s.chase!==c||s.cT<.7)continue;if(Math.hypot(c.x-s.x,c.y-s.y)<s.s*.62+c.s*.45){
        if(c===P){if(fxOn('ghost'))continue;hsCatch(null,s);return}
        c.dead=true;HSK.caught++;rings.push({x:c.x,y:c.y,r:c.s*4,life:.5,max:.5,col:'229,56,59'});if(HSK.seek.length<5)hsAddSeek(false,{x:c.x,y:c.y});s.chase=null;s.st='patrol';s.spot=null;
        if(Math.hypot(c.x-P.x,c.y-P.y)<viewR()*1.1)texts.push({x:c.x,y:c.y-30,txt:hsW('caughtF'),life:1.4});try{buzz(20)}catch(e){}}}}
    /* 내 상태 알림 */
    var chasing=HSK.seek.some(function(q){return q.chase===P});
    if(chasing&&!P.hsWas){banner(hsW('seen'),hsW('why_'+(P.hsWhy||'open')));try{buzz([40,30,40])}catch(e){}}P.hsWas=chasing;HSK.warnT=chasing?Math.min(1,HSK.warnT+dt*3):Math.max(0,HSK.warnT-dt*2);
    if(P.still>=HSK.still&&hsSpotAt(P.x,P.y)&&!P.hsBub){P.hsBub=1;banner(hsW('bub'),'')}if(P.still<1)P.hsBub=0;
    if(!chasing&&hsDeep(P)&&P.still<HSK.still){var nd=1e9;HSK.seek.forEach(function(q){nd=Math.min(nd,Math.hypot(q.x-P.x,q.y-P.y))});HSK.hb-=dt;if(nd<200&&HSK.hb<=0){HSK.hb=.8;try{buzz(12)}catch(e){}}}
    if(!P.hsTip&&HSK.t>3&&hsSpotAt(P.x,P.y)){P.hsTip=1;banner(hsW('tip'),hsW('tipD'))}
    /* 거품 · 물결 */
    if(!reduce){all.forEach(function(e){if(!e.dead&&(e.still||0)>=HSK.still&&hsSpotAt(e.x,e.y)&&Math.random()<dt*9)HSK.bub.push({x:e.x+rnd(-6,6),y:e.y-e.s*.5,r:rnd(2.5,5.5),life:1.2})})}
    for(i=HSK.bub.length-1;i>=0;i--){var u=HSK.bub[i];u.life-=dt;u.y-=dt*45;u.x+=Math.sin(u.life*9)*.4;if(u.life<=0)HSK.bub.splice(i,1)}
    for(i=HSK.rip.length-1;i>=0;i--){HSK.rip[i].life-=dt;if(HSK.rip[i].life<=0)HSK.rip.splice(i,1)}
    if(HSK.t>=HSK.T){hsFinish(true,false);return}
  }
  for(var fi=fxs.length-1;fi>=0;fi--){var fx=fxs[fi];fx.life-=dt;if(fx.vy)fx.y+=fx.vy*dt;if(fx.life<=0)fxs.splice(fi,1)}
  for(var ri=rings.length-1;ri>=0;ri--){rings[ri].life-=dt;if(rings[ri].life<=0)rings.splice(ri,1)}
  for(var ti=texts.length-1;ti>=0;ti--){var tx2=texts[ti];tx2.life-=dt;tx2.y-=dt*24;if(tx2.life<=0)texts.splice(ti,1)}
  fish.length=0;plank.length=0;
  var hT=$('hTime');if(hT){hT.hidden=false;var rem=Math.max(0,HSK.T-HSK.t);hT.textContent='⏱ '+fmtTime(rem)+' · 🐟 '+(HSK.hid.filter(function(x){return !x.dead}).length+1)}
}

/* ---- 그리기: 수족관 소품 그림(해초 · 말미잘 · 산호 · 바위)으로 숨는 곳 ---- */
function hsProp(k,x,y,w,a,flip,sway){try{drawProp(k,x,y,w,a,false,flip,sway)}catch(e){}}
function hsPropH(k,w){var p=PROPS[k];return p&&p.ok?w*p.img.height/p.img.width:w}
function hsDrawSpot(o,front){var r=o.r,sh=o.shake*Math.sin(t*28)*.12,base=o.y+r*.85,i,w,hh;
  if(!front){var c=ctx;c.save();c.globalAlpha=.25;c.beginPath();c.ellipse(o.x,base,r*1.05,r*.22,0,0,Math.PI*2);c.fillStyle='#062A44';c.fill();c.restore()}
  if(o.k==='kelp'){var n=5;for(i=0;i<n;i++){if(front!==(i%2===1))continue;w=r*(.78+.12*Math.sin(o.seed+i));hh=hsPropH('weed',w);var x=o.x+(i/(n-1)-.5)*r*1.25,sw=Math.sin(t*1.2+o.seed+i)*.1+sh;hsProp('weed',x,base-hh/2,w,1,(i+o.flip)%2===0,sw)}}
  else if(o.k==='anem'){if(!front){w=r*1.3;hh=hsPropH('rock',w);hsProp('rock',o.x+r*.35,base-hh*.35,w,1,o.flip,0)}else{w=r*1.75;hh=hsPropH('anem',w);hsProp('anem',o.x,base-hh/2,w,1,o.flip,sh+Math.sin(t*1.4+o.seed)*.04);w=r*.9;hh=hsPropH('anem',w);hsProp('anem',o.x-r*.7,base-hh/2+4,w,1,!o.flip,sh)}}
  else if(o.k==='coral'){if(!front){w=r*1.2;hh=hsPropH('coralp',w);hsProp('coralp',o.x-r*.45,base-hh/2,w,1,o.flip,sh)}else{w=r*1.55;hh=hsPropH('coralo',w);hsProp('coralo',o.x+r*.2,base-hh/2,w,1,o.flip,sh);w=r*.95;hh=hsPropH('coralp',w);hsProp('coralp',o.x+r*.8,base-hh/2+3,w,1,!o.flip,sh)}}
  else{if(!front){w=r*1.9;hh=hsPropH('rock',w);hsProp('rock',o.x,base-hh*.45,w,1,o.flip,0)}else{w=r*1.5;hh=hsPropH('moss',w);hsProp('moss',o.x-r*.25,base-hh*.45,w,1,!o.flip,0);w=r*.7;hh=hsPropH('weed',w);hsProp('weed',o.x+r*.65,base-hh/2,w,1,o.flip,Math.sin(t*1.3+o.seed)*.1+sh)}}}
function hsDrawUnder(){if(!P.hide||!HSK.box)return;var c=ctx,b=HSK.box,i,mlw=1.2/zoom;
  c.save();c.fillStyle='rgba(4,20,40,.45)';var L=cam.x-cw/zoom,R=cam.x+cw/zoom,T=cam.y-ch/zoom,B=cam.y+ch/zoom;
  if(L<b.x0)c.fillRect(L,T,b.x0-L,B-T);if(R>b.x1)c.fillRect(b.x1,T,R-b.x1,B-T);if(T<b.y0)c.fillRect(b.x0,T,b.x1-b.x0,b.y0-T);if(B>b.y1)c.fillRect(b.x0,b.y1,b.x1-b.x0,B-b.y1);
  c.setLineDash([14/zoom,10/zoom]);c.lineWidth=3/zoom;c.strokeStyle='rgba(255,255,255,.35)';c.strokeRect(b.x0,b.y0,b.x1-b.x0,b.y1-b.y0);c.setLineDash([]);c.restore();
  for(i=0;i<HSK.spots.length;i++)hsDrawSpot(HSK.spots[i],false);
  for(i=0;i<HSK.hid.length;i++){var h=HSK.hid[i];if(h.dead)continue;drawFish(c,h.x,h.y,h.s,h.ang,h.look,{px:h.s*zoom,phase:h.ph,minLw:mlw})}}
function hsDrawOver(){if(!P.hide||!HSK.box)return;var c=ctx,i,mlw=1.2/zoom;
  for(i=0;i<HSK.spots.length;i++)hsDrawSpot(HSK.spots[i],true);
  /* 내 물고기는 숨는 곳 앞에 반투명으로 한 번 더(어디 있는지 보이게) */
  if(!P.dead&&hsSpotAt(P.x,P.y)){c.save();c.globalAlpha=.5;drawFish(c,P.x,P.y,P.s,P.ang,P.look,{px:P.s*zoom,phase:t*6,minLw:mlw});c.restore()}
  for(i=0;i<HSK.rip.length;i++){var rp=HSK.rip[i],q=1-rp.life/.8;c.beginPath();c.arc(rp.x,rp.y,10+q*60,0,Math.PI*2);c.lineWidth=2.4/zoom;c.strokeStyle='rgba(255,255,255,'+(.7*(1-q))+')';c.stroke()}
  for(i=0;i<HSK.bub.length;i++){var u=HSK.bub[i];c.globalAlpha=Math.min(1,u.life*1.5);c.beginPath();c.arc(u.x,u.y,u.r,0,Math.PI*2);c.fillStyle='rgba(255,255,255,.25)';c.fill();c.lineWidth=1.2/zoom;c.strokeStyle='rgba(255,255,255,.9)';c.stroke()}c.globalAlpha=1;
  for(i=0;i<HSK.seek.length;i++){var s=HSK.seek[i];
    if(s.st!=='chase'&&HSK.cd<=0){c.save();c.globalAlpha=.08;c.beginPath();c.arc(s.x,s.y,s.big?250:170,0,Math.PI*2);c.fillStyle='#FFE27A';c.fill();c.restore()}
    c.save();if(HSK.cd>0||s.stun>0)c.globalAlpha=.6;drawFish(c,s.x,s.y,s.s,s.ang,s.look,{px:s.s*zoom,phase:s.ph,minLw:mlw,angry:s.st==='chase'});c.restore();
    if(s.red){c.save();c.globalAlpha=.35;c.beginPath();c.arc(s.x,s.y,s.s*.9,0,Math.PI*2);c.lineWidth=3/zoom;c.strokeStyle='#E5383B';c.stroke();c.restore()}
    var ic=HSK.cd>0||s.stun>0?'💤':s.st==='chase'?'!':(s.st==='search'||s.st==='look')?'?':'';if(ic){var fs=Math.max(18,s.s*.5)/Math.max(.6,zoom*.8);c.save();c.font=fs+'px "Black Han Sans", Jua, sans-serif';c.textAlign='center';c.lineJoin='round';c.lineWidth=5/zoom;c.strokeStyle='#0B2C4A';var iy=s.y-s.s*.9-6/zoom;if(ic!=='💤')c.strokeText(ic,s.x,iy);c.fillStyle=ic==='!'?'#FF5A5F':'#FFD93B';c.fillText(ic,s.x,iy);c.restore()}}
  if(state==='play'&&!P.dead){var o=hsSpotAt(P.x,P.y),yy=P.y-P.s*2.4-8/zoom,lbl='',col='#B9FFCF';
    if(o){var edge=Math.hypot(o.x-P.x,o.y-P.y)>=o.r*HS_EDGE;if(P.still>=HSK.still){lbl=hsW('st_bub');col='#FF9C94'}else if(edge){lbl=hsW('st_tail');col='#FFD93B'}else if(P.noise>.5){lbl=hsW('st_noise');col='#FFD93B'}else lbl=hsW('hidden')}
    if(o&&P.still>1.5){var q2=Math.min(1,P.still/HSK.still);c.save();c.beginPath();c.arc(P.x,P.y,P.s*1.9,-Math.PI/2,-Math.PI/2+Math.PI*2*q2);c.lineWidth=3/zoom;c.strokeStyle=q2>=1?'#FF5A5F':'rgba(255,255,255,.85)';c.stroke();c.restore()}
    if(lbl){c.save();c.font=(13/zoom)+'px "Black Han Sans", Jua, sans-serif';c.textAlign='center';c.lineJoin='round';c.lineWidth=4/zoom;c.strokeStyle='#0B2C4A';c.strokeText(lbl,P.x,yy);c.fillStyle=col;c.fillText(lbl,P.x,yy);c.restore()}}}
function hsDrawHud(){if(!P.hide||!(state==='play'||state==='pause'))return;var c=ctx,i;
  if(HSK.warnT>0){var wa=(.42+.18*Math.sin(t*12))*HSK.warnT,g=c.createRadialGradient(cw/2,ch/2,Math.min(cw,ch)*.24,cw/2,ch/2,Math.hypot(cw,ch)*.52);g.addColorStop(0,'rgba(229,56,59,0)');g.addColorStop(1,'rgba(229,56,59,'+wa+')');c.fillStyle=g;c.fillRect(0,0,cw,ch)}
  else if(hsDeep(P)&&P.still<HSK.still&&(P.noise||0)<.5){var g2=c.createRadialGradient(cw/2,ch/2,Math.min(cw,ch)*.3,cw/2,ch/2,Math.hypot(cw,ch)*.55);g2.addColorStop(0,'rgba(4,30,20,0)');g2.addColorStop(1,'rgba(4,30,20,.35)');c.fillStyle=g2;c.fillRect(0,0,cw,ch)}
  /* 화면 밖 술래 방향(700 안쪽) */
  for(i=0;i<HSK.seek.length;i++){var s=HSK.seek[i],sx=(s.x-cam.x)*zoom+cw/2,sy=(s.y-cam.y)*zoom+ch/2,m=26;if(sx>-10&&sx<cw+10&&sy>-10&&sy<ch+10)continue;if(Math.hypot(s.x-P.x,s.y-P.y)>700)continue;
    var ax=clamp(sx,m,cw-m),ay=clamp(sy,m+70,ch-m-90),an=Math.atan2(sy-ay,sx-ax),hot=s.chase===P;c.save();c.translate(ax,ay);c.rotate(an);c.beginPath();c.moveTo(13,0);c.lineTo(-8,-10);c.lineTo(-8,10);c.closePath();c.fillStyle=hot?'#FF5A5F':'rgba(255,226,122,.9)';c.fill();c.lineWidth=2.5;c.strokeStyle='#0B2C4A';c.stroke();c.restore()}
  /* 시작 카운트다운 */
  if(HSK.cd>0){var n=Math.ceil(HSK.cd-1);c.save();c.textAlign='center';c.lineJoin='round';c.font='64px "Black Han Sans", Jua, sans-serif';c.lineWidth=9;c.strokeStyle='#0B2C4A';var cy=ch*.36;if(n>0){c.strokeText(n,cw/2,cy);c.fillStyle='#FFE27A';c.fillText(n,cw/2,cy)}
    c.font='20px "Black Han Sans", Jua, sans-serif';c.lineWidth=6;var tt=hsW('cd');c.strokeText(tt,cw/2,cy+44);c.fillStyle='#fff';c.fillText(tt,cw/2,cy+44);c.restore()}}
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
  var ti=quit?hsW('quit'):win?hsW('win'):hsW('lose'),ld=hsF(hsW('lead'),{t:fmtTime(Math.min(tm,HSK.T)),n:left,p:nf(gain)})+(rec?hsW('rec'):'')+(!win&&!quit&&HSK.why?' · '+hsW('whyL')+hsW('why_'+HSK.why).replace(/^.*?:\s*/,''):'');
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
