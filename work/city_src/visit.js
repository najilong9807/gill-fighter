/* ===== 내 물고기 나들이 (로드맵 Y): 아가미 파이터 수족관의 내 물고기가 가끔 마을에 놀러 와요
   - 본게임이 넘겨 주는 GF_MYFISH() = 수족관에 넣어 둔 물고기 [{id,n(이름),src(그림),lv(친밀도)}]
   - 처음엔 8초 뒤, 그다음엔 50~90초마다 한 마리: 입구 바깥 바다에서 헤엄쳐 와 → 길을 따라 산호궁(또는 명소) 앞까지 → 12초 머물며 빙글 → 다시 길로 나가 바다로
   - 진짜 그림 + 이름표(♥친밀도) + 발밑 빛 동그라미로 마을 주민과 구별
   - 누르면 하트 · 본게임 수족관과 같은 친밀도가 오름(물고기마다 하루 5번, GF_PET) · 명성 +2. 친해지면 본게임 규칙대로 진주 선물 ===== */
var VIS=null,VIS_NEXT=NOW()+8000,VIS_LAST={},VIS_IMG={};
function visList(){try{if(!EMB||!window.parent.GF_MYFISH)return [];return window.parent.GF_MYFISH()||[]}catch(e){return []}}
function visImg(f){var o=VIS_IMG[f.id];if(!o){o=VIS_IMG[f.id]={im:new Image(),ok:false};o.im.onload=function(){o.ok=true};o.im.src=f.src}return o}
function visDest(){var c=['hall','hall','aqua','school','diner','palace'].map(bOf).filter(function(b){return b&&b.lv&&roadNear(b)});return c.length?c[Math.floor(Math.random()*c.length)]:null}
function visStart(now){if(!G.gate||document.hidden)return;var L=visList().filter(function(f){return f.src});if(!L.length){VIS_NEXT=now+60000;return}
  L.sort(function(a,b){return (VIS_LAST[a.id]||0)-(VIS_LAST[b.id]||0)});var f=L[Math.floor(Math.random()*Math.min(2,L.length))],d=visDest();if(!d){VIS_NEXT=now+60000;return}
  var p=path([G.gate.x,G.gate.y],roadNear(d));if(!p||p.length<2){VIS_NEXT=now+60000;return}
  VIS_LAST[f.id]=now;visImg(f);VIS={f:f,st:'in',fx:G.gate.x-9,fy:G.gate.y-1.5+Math.random()*3,p:p,i:0,t:0,u:0,stay:0,al:0,ph:Math.random()*6,dir:1,hop:0};
  setTimeout(function(){if(!VIS||VIS.f!==f)return;var el=$('arrN');if(!el){toast('🐠 내 물고기 '+f.n+' 놀러 왔어요 · 눌러서 쓰다듬어요');return}
    el.hidden=false;el.dataset.vis='1';el.style.top=$('tut').hidden?'':Math.round($('tut').getBoundingClientRect().bottom+10)+'px';el.innerHTML='🐠 내 물고기 '+f.n+' 놀러 왔어요 <b>보러 가기 ›</b>';clearTimeout(el.t);el.t=setTimeout(function(){el.hidden=true;delete el.dataset.vis},15000)},1800)}
/* 알림 '보러 가기': 내 물고기 쪽으로 카메라 */
(function(){var el=$('arrN');if(!el)return;var o=el.onclick;el.onclick=function(){if(el.dataset.vis&&VIS){el.hidden=true;delete el.dataset.vis;var v=VIS;CAMGO={x:(v.fx-v.fy)*TW/2,y:(v.fx+v.fy)*TH/2-30,z:Math.max(cam.z,1.1),t:1600};return}return o&&o.apply(this,arguments)}})();
function visTick(dt,now){if(!VIS){if(now>=VIS_NEXT)visStart(now);return}var v=VIS;v.hop=Math.max(0,v.hop-dt*2.4);
  if(v.st==='in'){v.al=Math.min(1,v.al+dt*.8);if(swimTo(v,G.gate.x-.3,G.gate.y,dt,1.4)){v.st='road';v.u=0}return}
  if(v.st==='road'||v.st==='back'){var n=v.p.length-1,sp=1.25*dt;v.u=v.st==='road'?Math.min(n,v.u+sp):Math.max(0,v.u-sp);var q=pathPt(v,v.u);if(q[0]-q[1]!==v.fx-v.fy)v.dir=(q[0]-q[1])>(v.fx-v.fy)?1:-1;v.fx=q[0];v.fy=q[1];
    if(v.st==='road'&&v.u>=n){v.st='stay';v.stay=12;v.cx=v.fx;v.cy=v.fy}else if(v.st==='back'&&v.u<=0){v.st='out';v.gx=G.gate.x-10;v.gy=G.gate.y+(Math.random()-.5)*4}return}
  if(v.st==='stay'){v.stay-=dt;var a=(12-v.stay)*1.3+v.ph,nx=v.cx+Math.cos(a)*.55,ny=v.cy+Math.sin(a)*.55;v.dir=Math.cos(a+1.57)-Math.sin(a+1.57)>0?1:-1;v.fx=nx;v.fy=ny;if(v.stay<=0){v.st='back';v.u=v.p.length-1}return}
  if(v.st==='out'){v.al=Math.max(0,v.al-dt*.5);swimTo(v,v.gx,v.gy,dt,1.6);if(v.al<=0){VIS=null;VIS_NEXT=now+50000+Math.random()*40000}}}
function visScreen(){var v=VIS;if(!v)return null;var p=sc(v.fx,v.fy),z=cam.z,fl=(v.st==='in'||v.st==='out')?22:34,bob=Math.sin(NOW()*.003+v.ph)*3;return {x:p.x,y:p.y-(fl+bob+v.hop*14)*z,g:p,z:z,w:Math.max(40,64*z)}}
function visDraw(){var v=VIS;if(!v||v.al<=0)return;var s=visScreen();if(s.x<-80||s.x>VW+80||s.y<-80||s.y>VH+80)return;var o=visImg(v.f),z=s.z;
  ctx.save();ctx.globalAlpha=v.al;
  /* 발밑 빛 동그라미 */
  if(v.st!=='in'&&v.st!=='out'){ctx.save();ctx.globalCompositeOperation='lighter';var gr=ctx.createRadialGradient(s.g.x,s.g.y,2,s.g.x,s.g.y,30*z);gr.addColorStop(0,'rgba(255,240,150,.55)');gr.addColorStop(1,'rgba(255,240,150,0)');ctx.fillStyle=gr;ctx.beginPath();ctx.ellipse(s.g.x,s.g.y,30*z,13*z,0,0,7);ctx.fill();ctx.restore()}
  ctx.fillStyle='rgba(15,60,80,.16)';ctx.beginPath();ctx.ellipse(s.g.x,s.g.y,s.w*.42,s.w*.12,0,0,7);ctx.fill();
  if(o.ok){var w=s.w,h=w*o.im.height/o.im.width;ctx.save();ctx.translate(s.x,s.y);ctx.scale(v.dir,1);ctx.rotate(Math.sin(NOW()*.004+v.ph)*.06);ctx.drawImage(o.im,-w/2,-h/2,w,h);ctx.restore()}
  /* 이름표 */
  var lab=v.f.n+((v.f.lv|0)?'  ♥'+v.f.lv:''),fs=Math.max(10,Math.round(11*Math.min(1.2,z+.25)));ctx.font='700 '+fs+'px Jua,sans-serif';var tw=ctx.measureText(lab).width+14,ty=s.y-s.w*.55-fs;
  ctx.fillStyle='#fffdf7';ctx.strokeStyle=OUT;ctx.lineWidth=2;rr(s.x-tw/2,ty-fs*.8,tw,fs*1.5,fs*.7);ctx.fill();ctx.stroke();ctx.fillStyle='#e5507a';ctx.textAlign='center';ctx.fillText(lab,s.x,ty+fs*.25);
  ctx.restore()}
function visHit(x,y){var s=visScreen();if(!s||VIS.al<.5)return false;return Math.abs(x-s.x)<Math.max(30,s.w*.7)&&Math.abs(y-s.y)<Math.max(30,s.w*.7)}
function visPet(){var v=VIS,s=visScreen(),r=null;try{r=window.parent.GF_PET(v.f.id)}catch(e){}v.hop=1;
  if(!r){sparkle(s.x,s.y,6);return}
  if(r.tired){float(s.x,s.y-30,'💤 오늘은 실컷 놀았어요');snd('tap');return}
  v.f.lv=r.lv;try{window.parent.GF_CITY_EV('pet')}catch(e){}snd('pop');sparkle(s.x,s.y,10);float(s.x,s.y-34,'♥ +1',true);addXP(2);if(v.st==='stay')v.stay=Math.max(v.stay,8);
  if(r.up)toast('💗 '+v.f.n+' ♥'+r.lv+' · 더 친해졌어요! 🫧+'+r.g);save()}
var _tapV=tap;tap=function(x,y){if(VIS&&visHit(x,y)){visPet();return}return _tapV.apply(this,arguments)};
var _drawWorldV=drawWorld,_visT=0;drawWorld=function(t,now){var r=_drawWorldV.apply(this,arguments);var dt=_visT?Math.min(.05,(t-_visT)/1000):0;_visT=t;try{visTick(dt,NOW());visDraw()}catch(e){}return r};
window.__vis=function(){var s=visScreen();return s?{x:s.x,y:s.y,st:VIS.st,n:VIS.f.n,lv:VIS.f.lv}:null};

/* ===== 본게임 → 마을 (늑구 '본게임을 하면 마을에 생기는 일'):
   ① 판에서 모은 '마을 재료 상자'(본게임이 'gfcity.gift' 에 쌓음, 20초 넘는 판마다 1개 · 하루 6개)
      → 마을 위 알림 '📦 재료 상자 n개 · 받기' → 산호궁 단계에 맞는 재료(산호석 · 다시마 · 7단계부터 벽돌 · 8단계부터 못), 창고 한도까지
      상자 하나 = 광산 · 농장 Lv(산호궁) 1.2시간치. 명성 +3 · 축제 토큰 +3 씩
   ② 새로 모은 물고기는 마을로 이사: 처음 연 날 가진 물고기는 조용히 등록(G.kf), 그 뒤 새로 생긴 물고기는 '이사 왔어요' + 명성 +10 + 다음 나들이 1순위 ===== */
function boxWorth(){var L=Math.max(1,hallLv()),o={},q=D.prodPerHour('quarry',L),f=D.prodPerHour('farm',L);o.stone=Math.max(20,Math.round((q.stone||0)*1.2));o.kelp=Math.max(10,Math.round((f.kelp||0)*1.2));
  if(L>=7){var k=D.prodPerHour('kiln',L);o.brick=Math.max(2,Math.round((k.brick||0)*.6))}if(L>=8){var p=D.prodPerHour('pearl',L);o.nail=Math.max(1,Math.round((p.nail||0)*1))}return o}
function giftN(){try{var g=JSON.parse(localStorage.getItem('gfcity.gift')||'null');return g&&g.n>0?g.n|0:0}catch(e){return 0}}
function giftEl(){var el=$('giftN');if(!el){el=document.createElement('div');el.id='giftN';el.hidden=true;document.body.appendChild(el);var st=document.createElement('style');st.textContent='#giftN{position:fixed;left:50%;transform:translateX(-50%);top:calc(var(--sat,env(safe-area-inset-top)) + 206px);background:#e3f6ec;border:2.5px solid var(--ink);border-radius:16px;padding:8px 14px;font-size:14px;box-shadow:0 3px 0 var(--ink);z-index:8;white-space:nowrap;cursor:pointer;animation:gfIn .3s ease-out}#giftN b{font-family:var(--disp);font-weight:400;color:#1f7a42}@keyframes gfIn{from{transform:translate(-50%,-10px);opacity:0}}';document.head.appendChild(st);el.onclick=function(){giftTake()}}return el}
function giftShow(){var n=giftN(),el=giftEl();if(!n||!G.gate&&!hallLv()){el.hidden=true;return}var t='📦 판에서 모은 재료 상자 '+n+'개 <b>받기 ›</b>';if(el.dataset.t!==t){el.dataset.t=t;el.innerHTML=t}el.hidden=false}
function giftTake(){var n=giftN();$('giftN').hidden=true;if(!n)return;try{localStorage.setItem('gfcity.gift',JSON.stringify({n:0,at:Date.now()}))}catch(e){}
  var w=boxWorth(),got=[],full=[];for(var k in w){var add=w[k]*n,room=Math.max(0,Math.floor(cap(k)-(G.res[k]||0))),t=Math.min(add,room);G.res[k]=(G.res[k]||0)+t;if(t>0)got.push(ICON[k]+'+'+fmt(t));if(t<add)full.push(RNAME[k])}
  snd('coin');addXP(3*n);try{evtAdd(3*n)}catch(e){}var h=bOf('hall');if(h){var c=centerOf(h);sparkle(c.x,c.y-60*cam.z,14+n*2);float(c.x,c.y-90*cam.z,got.join(' '),true)}
  toast('📦 재료 상자 '+n+'개를 열었어요 '+got.join(' ')+(full.length?' · 창고가 가득 찬 재료는 일부만':''));save();hud()}
/* ② 새 물고기 이사 */
var VIS_NEW=[];function ownedList(){try{return EMB&&window.parent.GF_OWNED?window.parent.GF_OWNED()||[]:[]}catch(e){return []}}
function newFishCheck(){var L=ownedList();if(!L.length)return;if(!G.kf){G.kf={};L.forEach(function(f){G.kf[f.id]=1});save();return}
  var nw=L.filter(function(f){return !G.kf[f.id]});if(!nw.length)return;nw.forEach(function(f){G.kf[f.id]=1;VIS_NEW.push(f)});addXP(10*nw.length);save();
  setTimeout(function(){toast('🐟 새 물고기 '+nw.map(function(f){return f.n}).join(' · ')+' 마을로 이사 왔어요! ⭐+'+10*nw.length);snd('done')},1200);VIS_NEXT=Math.min(VIS_NEXT,NOW()+4000)}
/* 나들이 고르기: 새로 이사 온 물고기 먼저, 그다음 수족관 물고기, 수족관이 비면 가진 물고기 */
var visListG=visList;visList=function(){if(VIS_NEW.length)return [VIS_NEW.shift()];var L=visListG();if(L.length)return L;return ownedList().slice(0,20)};
setTimeout(function(){try{newFishCheck();giftShow()}catch(e){}},2500);setInterval(function(){try{giftShow()}catch(e){}},5000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)try{newFishCheck();giftShow()}catch(e){}});
