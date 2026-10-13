/* ===== 1.1.11 연습 바다(조작해 보는 프롤로그): 처음 켜면 그림 이야기 대신 첫 판 안에서 직접 해 본다.
   ① 작은 물고기 3마리 먹기 → ② 빨간 테두리 큰 물고기 입 피하기 → ③ 큰 물고기 몸통 물기 → ④ 진짜 바다로.
   연습 중(①~③)에는 먹혀도 튕겨 나가기만 하고 판이 끝나지 않는다. '건너뛰기'로 언제든 끝낼 수 있다 ===== */
Object.assign(TRT,{"넓은 바다에서 작은 치어가 태어났어요":"A tiny fry is born in the wide sea","나보다 작은 물고기에게 다가가 먹어 보세요":"Swim to a fish smaller than you and eat it","쑥쑥 컸어요!":"You're growing!",
  "빨간 테두리 물고기는 나보다 커요. 입을 피해 보세요":"A red ring means it's bigger than you. Stay away from its mouth","입만 피하면 몸통 · 꼬리를 물 수 있어요. 콱 물어 보세요!":"Dodge the mouth and bite its body or tail!",
  "잘했어요! 물 때마다 큰 물고기는 작아지고 나는 커져요":"Nice! Every bite shrinks it and grows you","깊이 내려갈수록 더 큰 먹이가 있어요. 이제 진짜 바다예요!":"Bigger food lives deeper down. Now the real sea begins!",
  "연습 중이라 먹혀도 괜찮아요":"It's practice, so getting eaten is OK","건너뛰기":"Skip","연습 바다":"Practice","연습 바다 다시 하기":"Practice again","먹는 법 · 피하는 법 · 무는 법을 직접 해 봐요":"Try eating, dodging and biting yourself"});
var TUT={on:0,step:0,t:0,e0:0,n0:0,big:null};
function tutStart(){if(!owns(sel))sel=save.owned[0];save.onb=1;save.pick=sel;persist();crumb('tut');
  TUT={on:1,step:0,t:0,e0:0,n0:0,big:null};startRun('single');if(state!=='play'){TUT.on=0;return}
  P.coachBite=1;TUT.e0=P.eaten|0;TUT.n0=P.nibbles|0;tutPaint()}
function tutEnd(done){if(!TUT.on)return;TUT.on=0;if(state==='play'){P.fx.ghost=Math.max(P.fx.ghost||0,2.2);if(TUT.big){TUT.big.stun=Math.max(TUT.big.stun||0,2);TUT.big.rage=0}}var b=$('tutBox');if(b)b.hidden=true;if(done){save.tut=1;persist()}crumb('tutEnd:'+(done?1:0))}
function tutNear(ratio,dmin,dmax){spawnFish(true,ratio<1);var f=fish[fish.length-1];if(!f)return null;var a=Math.random()*Math.PI*2,R=viewR(),d=R*(dmin+(dmax-dmin)*Math.random());
  f.x=P.x+Math.cos(a)*d;f.y=clamp(P.y+Math.sin(a)*d*.7,P.s*2,H*.98);f.s=Math.max(5,P.s*ratio);f.ang=f.wa=Math.atan2(P.y-f.y,P.x-f.x);return f}
function tutPaint(){var b=$('tutBox');if(!b)return;var S=TUT.step,L=[
  [T('넓은 바다에서 작은 치어가 태어났어요'),T('나보다 작은 물고기에게 다가가 먹어 보세요')],
  [T('나보다 작은 물고기에게 다가가 먹어 보세요'),'0 / 3'],
  [T('쑥쑥 컸어요!'),T('빨간 테두리 물고기는 나보다 커요. 입을 피해 보세요')],
  [T('입만 피하면 몸통 · 꼬리를 물 수 있어요. 콱 물어 보세요!'),T('연습 중이라 먹혀도 괜찮아요')],
  [T('잘했어요! 물 때마다 큰 물고기는 작아지고 나는 커져요'),T('깊이 내려갈수록 더 큰 먹이가 있어요. 이제 진짜 바다예요!')]][S]||['',''];
  b.querySelector('b').textContent=L[0];var sm=b.querySelector('small');sm.textContent=S===1?(Math.min(3,(P.eaten|0)-TUT.e0)+' / 3'):L[1];
  var ds=b.querySelector('.tut-dots');ds.textContent='';for(var i=1;i<=4;i++){var e=document.createElement('i');if(i<=Math.max(1,S))e.className='on';ds.appendChild(e)}
  b.hidden=false;b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')}
function tutTick(dt){if(!TUT.on)return;if(state!=='play'&&state!=='pause'){tutEnd(false);return}if(state==='pause')return;TUT.t+=dt;var S=TUT.step,i,n;
  if(S===0){if(TUT.t>2.6){TUT.step=1;TUT.t=0;for(i=0;i<4;i++)tutNear(.55,.3,.55);tutPaint()}return}
  if(S===1){n=(P.eaten|0)-TUT.e0;var sm=$('tutBox').querySelector('small'),txt=Math.min(3,n)+' / 3';if(sm.textContent!==txt)sm.textContent=txt;
    if(TUT.t>3.5){TUT.t=0;var near=0;for(i=0;i<fish.length;i++){var f=fish[i];if(f.s<P.s*.95&&Math.hypot(f.x-P.x,f.y-P.y)<viewR()*.6)near++}if(near<2)for(i=0;i<3;i++)tutNear(.55,.3,.55)}
    if(n>=3){TUT.step=2;TUT.t=0;TUT.n0=P.nibbles|0;TUT.big=tutNear(1.7,.55,.7);if(TUT.big){TUT.big.chase=.42}(function(){try{svSnd('lvl')}catch(e){}})();tutPaint()}return}
  if(S===2){if(TUT.big&&fish.indexOf(TUT.big)<0)TUT.big=null;if(!TUT.big)TUT.big=tutNear(1.7,.55,.7);if((P.nibbles|0)>TUT.n0){TUT.step=3;TUT.t=99;return}if(TUT.t>6){TUT.step=3;TUT.t=0;TUT.n0=P.nibbles|0;tutPaint()}return}
  if(S===3){if(TUT.big&&fish.indexOf(TUT.big)<0)TUT.big=null;if(!TUT.big&&TUT.t>1){TUT.big=tutNear(1.6,.45,.6);if(TUT.big)TUT.big.chase=.35}
    if((P.nibbles|0)>TUT.n0||TUT.t>22){if(TUT.t>=99)TUT.t=0;TUT.step=4;TUT.t=0;if(TUT.big){TUT.big.stun=3;TUT.big.rage=0;TUT.big.chase=.2}tutPaint();(function(){try{svSnd('lvl')}catch(e){}})()}return}
  if(S===4&&TUT.t>4.2)tutEnd(true)}
var invulnTut=invuln;invuln=function(){return (TUT.on&&state==='play')||invulnTut()};
var updateTut=update;update=function(dt){updateTut(dt);if(TUT.on)tutTick(dt)};
(function(){var b=document.createElement('div');b.id='tutBox';b.hidden=true;b.setAttribute('role','status');
  b.innerHTML='<div class="tut-top"><span class="tut-tag"></span><span class="tut-dots"></span><button type="button" class="tut-skip"></button></div><b></b><small></small>';
  b.querySelector('.tut-tag').textContent=T('연습 바다');b.querySelector('.tut-skip').textContent=T('건너뛰기');
  b.querySelector('.tut-skip').addEventListener('click',function(e){e.stopPropagation();tutEnd(true)});document.body.appendChild(b);
  var st=document.createElement('style');st.textContent=
  '#tutBox{position:fixed;left:50%;top:calc(env(safe-area-inset-top,0px) + 118px);transform:translateX(-50%);z-index:26;width:min(330px,calc(100vw - 92px));box-sizing:border-box;padding:10px 14px 12px;border-radius:18px;background:rgba(255,248,232,.96);border:3px solid #16324A;box-shadow:0 5px 0 rgba(12,40,60,.45);color:#16324A;text-align:center;pointer-events:none}'+
  '#tutBox[hidden]{display:none}#tutBox.pop{animation:tutPop .35s ease-out}@keyframes tutPop{0%{transform:translateX(-50%) scale(.9);opacity:.3}100%{transform:translateX(-50%) scale(1);opacity:1}}'+
  '#tutBox .tut-top{display:flex;align-items:center;gap:8px;margin-bottom:4px}#tutBox .tut-tag{font-size:12px;color:#fff;background:#2FA9C4;border-radius:99px;padding:1px 9px}'+
  '#tutBox .tut-dots{display:flex;gap:4px;flex:1}#tutBox .tut-dots i{width:7px;height:7px;border-radius:50%;background:#B9C9D6}#tutBox .tut-dots i.on{background:#2FA9C4}'+
  '#tutBox .tut-skip{pointer-events:auto;font:inherit;font-size:13px;border:0;background:#E3ECF3;color:#16324A;border-radius:99px;padding:5px 11px;min-height:30px;cursor:pointer}'+
  '#tutBox b{display:block;font-family:var(--disp);font-weight:400;font-size:18px;line-height:1.35;word-break:keep-all}#tutBox small{display:block;font-size:14px;color:#3E5A72;margin-top:3px;line-height:1.4;word-break:keep-all}'+
  '@media (orientation:landscape) and (max-height:560px){#tutBox{top:calc(env(safe-area-inset-top,0px) + 12px);width:min(380px,48vw)}}';
  document.head.appendChild(st)})();
