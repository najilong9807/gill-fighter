/* ===== 1.1.12 할로윈 2주차: 호박 유령 아귀(싱글 보스) · 할로윈 미션 · 사탕 모으기 · 전용 왕관 ===== */
abyTr(TRT,{'호박 유령 아귀가 나타났어요!':'The Pumpkin Ghost Angler appeared!','입을 피해 몸통을 물어뜯어 작게 만든 뒤 꿀꺽!':'Dodge its mouth, bite its body to shrink it, then gulp!','호박 유령 아귀':'Pumpkin Ghost Angler','호박 유령 아귀 꺼-억!':'Pumpkin Angler GULP!','호박 유령 아귀를 물리쳤어요!':'You beat the Pumpkin Ghost Angler!','사탕 +3 · 판이 끝나면 진주를 더 받아요':'Candy +3 · extra pearls when the run ends',
 '할로윈 이벤트':'Halloween Event','11월 21일까지 · 사탕을 모아 선물을 받아요':'Until Nov 21 · collect candy for gifts','오늘의 할로윈 미션':"Today's Halloween missions",'사탕 모으기':'Candy collection','싱글에서 떠다니는 사탕을 먹거나 미션을 깨면 모여요':'Eat floating candy in Single or clear missions to collect',
 '할로윈 사탕 4개 먹기':'Eat 4 Halloween candies','호박 유령 아귀 물리치기':'Beat the Pumpkin Ghost Angler','싱글 3판 하기':'Play Single 3 times','할로윈 미션 완료!':'Halloween mission complete!',' · 할로윈 이벤트에서 받아요':' · claim it in the Halloween event','받았어요':'Claimed','받기':'Claim','출석 선물':'Daily gift','한정 꾸미기':'Limited items','닫기':'Close',
 '할로윈 보상이 와 있어요!':'Halloween rewards are waiting!','할로윈 이벤트 · 사탕 ':'Halloween event · candy ','보기':'View','호박 유령 왕관':'Pumpkin Ghost Crown','사탕 150개 전용 왕관':'Exclusive crown for 150 candies','왕관을 받았어요!':'You got the crown!','상점 › 꾸미기 › 모자에서 입혀요':'Wear it from Shop › Items › Hats','사탕 선물을 받았어요!':'Candy gift received!','미션 보상을 받았어요!':'Mission reward received!','사탕 ':'Candy ','개':''});
abyTr(TRJ,{'호박 유령 아귀가 나타났어요!':'かぼちゃオバケアンコウが現れた！','입을 피해 몸통을 물어뜯어 작게 만든 뒤 꿀꺽!':'口をよけて体をかじって小さくしてからパクッ！','호박 유령 아귀':'かぼちゃオバケアンコウ','호박 유령 아귀 꺼-억!':'かぼちゃアンコウ、ゲップ！','호박 유령 아귀를 물리쳤어요!':'かぼちゃオバケアンコウを倒しました！','사탕 +3 · 판이 끝나면 진주를 더 받아요':'キャンディ +3 · プレイ終了時に真珠が増えます',
 '할로윈 이벤트':'ハロウィンイベント','11월 21일까지 · 사탕을 모아 선물을 받아요':'11月21日まで · キャンディを集めてプレゼント','오늘의 할로윈 미션':'今日のハロウィンミッション','사탕 모으기':'キャンディ集め','싱글에서 떠다니는 사탕을 먹거나 미션을 깨면 모여요':'シングルで浮かぶキャンディを食べるかミッションクリアで集まります',
 '할로윈 사탕 4개 먹기':'ハロウィンキャンディを4個食べる','호박 유령 아귀 물리치기':'かぼちゃオバケアンコウを倒す','싱글 3판 하기':'シングルを3回プレイ','할로윈 미션 완료!':'ハロウィンミッション達成！',' · 할로윈 이벤트에서 받아요':' · ハロウィンイベントで受け取れます','받았어요':'受け取り済み','받기':'受け取る','출석 선물':'出席プレゼント','한정 꾸미기':'限定アイテム','닫기':'閉じる',
 '할로윈 보상이 와 있어요!':'ハロウィンの報酬が届いています！','할로윈 이벤트 · 사탕 ':'ハロウィンイベント · キャンディ ','보기':'見る','호박 유령 왕관':'かぼちゃオバケの王冠','사탕 150개 전용 왕관':'キャンディ150個の限定王冠','왕관을 받았어요!':'王冠をもらいました！','상점 › 꾸미기 › 모자에서 입혀요':'ショップ › きせかえ › 帽子で着けられます','사탕 선물을 받았어요!':'キャンディのプレゼントをもらいました！','미션 보상을 받았어요!':'ミッション報酬をもらいました！','사탕 ':'キャンディ ','개':'個'});

/* --- 전용 왕관: 사탕 150개 보상으로만(상점엔 가진 사람만 보임) --- */
ACC.push({id:'hw_pumpcrown',slot:'head',name:T('호박 유령 왕관'),c:{cur:'gems',price:0},hw:1,ex:1});
HW2H.hw_pumpcrown=['ac_pumpcrown',1.12,0.13,0];
ACC_HEAD.hw_pumpcrown=function(c,U){var q=HW2H.hw_pumpcrown,im=hwAcs(q[0]);if(!im)return;var w=U*q[1],h=w*im.naturalHeight/im.naturalWidth;c.drawImage(im,-w/2+q[3]*U,U*q[2]-h,w,h)};
var hwListEx=hwList;hwList=function(arr,own){return hwListEx(arr,own).filter(function(o){return !o.ex||own(o)})};

/* --- 사탕 모으기 --- */
var HWC=[{n:30,p:2000},{n:80,g:20},{n:150,a:'hw_pumpcrown'}];
function hwcN(){return save.hwCandy|0}
function hwCandyAdd(n){if(!(n>0))return;var b=hwcN();save.hwCandy=b+n;persist();
  HWC.forEach(function(m){if(b<m.n&&b+n>=m.n)setTimeout(function(){banner(T('사탕 모으기'),nf(m.n)+T('개')+T(' · 할로윈 이벤트에서 받아요'))},1400)});try{hwBarPaint()}catch(e){}}
function hwcGot(i){return (save.hwcGot||[]).indexOf(i)>=0}
function hwcClaim(i){var m=HWC[i];if(!m||hwcGot(i)||hwcN()<m.n)return;save.hwcGot=(save.hwcGot||[]).concat([i]);var sub='';
  if(m.p){save.pearls+=m.p;sub=T('진주 ')+'+'+nf(m.p)}if(m.g){save.gems+=m.g;sub=T('보석 ')+'+'+m.g}
  if(m.a){var A=AS();if(A.own.indexOf(m.a)<0)A.own.push(m.a);sub=T('호박 유령 왕관')}
  persist();crumb('hwc:'+i);try{svSnd('gem');buzz([20,30,40])}catch(e){}
  banner(m.a?T('왕관을 받았어요!'):T('사탕 선물을 받았어요!'),sub);if(m.a)setTimeout(function(){banner(T('호박 유령 왕관'),T('상점 › 꾸미기 › 모자에서 입혀요'))},1800);
  try{refreshHome(true)}catch(e){}hwEvRender();hwBarPaint()}

/* --- 할로윈 미션(매일 같은 3개) --- */
var HWM=[{k:'candy',goal:4,txt:'할로윈 사탕 4개 먹기',p:300,c:3},{k:'boss',goal:1,txt:'호박 유령 아귀 물리치기',p:400,c:5},{k:'solo',goal:3,txt:'싱글 3판 하기',p:200,c:2}];
function HM(){var d=today();if(!save.hwm||save.hwm.d!==d)save.hwm={d:d,v:{},got:{}};return save.hwm}
function hwmAdd(k,n){if(!hwSeason())return;var M=HM(),o=null;HWM.forEach(function(x){if(x.k===k)o=x});if(!o)return;var was=M.v[k]|0;M.v[k]=was+n;persist();
  if(was<o.goal&&M.v[k]>=o.goal)setTimeout(function(){banner(T('할로윈 미션 완료!'),T(o.txt)+T(' · 할로윈 이벤트에서 받아요'))},1100);try{hwBarPaint()}catch(e){}}
function hwmReady(o){var M=HM();return (M.v[o.k]|0)>=o.goal&&!M.got[o.k]}
function hwmClaim(k){var M=HM(),o=null;HWM.forEach(function(x){if(x.k===k)o=x});if(!o||!hwmReady(o))return;M.got[k]=1;save.pearls+=o.p;persist();crumb('hwm:'+k);try{svSnd('gem');buzz([20,30])}catch(e){}
  banner(T('미션 보상을 받았어요!'),T('진주 ')+'+'+nf(o.p)+' · '+T('사탕 ')+'+'+o.c);hwCandyAdd(o.c);try{refreshHome(true)}catch(e){}hwEvRender()}
function hwEvAny(){if(!hwSeason())return false;for(var i=0;i<HWM.length;i++)if(hwmReady(HWM[i]))return true;for(var j=0;j<HWC.length;j++)if(!hwcGot(j)&&hwcN()>=HWC[j].n)return true;return false}

/* --- 이벤트 창 --- */
var HWE_SVG={candy:'<svg viewBox="0 0 24 24"><path d="M5 9l-3-2v10l3-2zM19 9l3-2v10l-3-2z" fill="#B67CFF" stroke="#2E0F52" stroke-width="1.4" stroke-linejoin="round"/><circle cx="12" cy="12" r="6.2" fill="#FF8A1F" stroke="#2E0F52" stroke-width="1.6"/><path d="M8 9l8 6M9 7.4l7 5.2" stroke="#FFE7C2" stroke-width="1.6"/></svg>',
 pearl:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#FFF3FA" stroke="#0B2C4A" stroke-width="1.8"/><circle cx="9.5" cy="9.5" r="2.4" fill="#fff"/></svg>',
 gem:'<svg viewBox="0 0 24 24"><path d="M12 3l8 8-8 10-8-10z" fill="#6FC3FF" stroke="#0B2C4A" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 3v18M4 11h16" stroke="#C8ECFF" stroke-width="1.2"/></svg>',
 ghost:'<svg viewBox="0 0 24 24"><path d="M5 20V11a7 7 0 0114 0v9l-2.3-1.7L14.3 20 12 18.3 9.7 20l-2.4-1.7z" fill="#fff" stroke="#0B2C4A" stroke-width="1.6" stroke-linejoin="round"/><circle cx="9.5" cy="11" r="1.3" fill="#0B2C4A"/><circle cx="14.5" cy="11" r="1.3" fill="#0B2C4A"/></svg>',
 play:'<svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" fill="#7FE3A0" stroke="#0B2C4A" stroke-width="1.8" stroke-linejoin="round"/></svg>'};
function hwEvOpen(){var el=$('hwEv');if(!el){el=document.createElement('div');el.className='overlay';el.id='hwEv';el.hidden=true;el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
    el.innerHTML='<div class="panel hwe-panel"><h1></h1><p class="lead"></p><section class="hwe-sec"><h3 id="hweMisH"></h3><div id="hweMis"></div></section>'+
      '<section class="hwe-sec hwe-candy"><h3><span id="hweCH"></span><b id="hweCnt"></b></h3><div class="hwe-bar"><u id="hweFill"></u></div><div class="hwe-ms" id="hweMs"></div><p class="hwe-tip" id="hweTip"></p></section>'+
      '<div class="hwe-btns"><button type="button" class="btn ghost" id="hweAtt"></button><button type="button" class="btn ghost" id="hweShop"></button></div><button type="button" class="btn" id="hweX"></button></div>';
    document.body.appendChild(el);
    $('hweX').addEventListener('click',function(){el.hidden=true;hwBarPaint()});el.addEventListener('click',function(e){if(e.target===el){el.hidden=true;hwBarPaint()}});
    $('hweAtt').addEventListener('click',function(){el.hidden=true;hwAttOpen()});
    $('hweShop').addEventListener('click',function(){el.hidden=true;try{accSlot='head';showTab('sea');setTimeout(function(){var e=$('goodsAcc');if(e&&e.scrollIntoView)e.scrollIntoView({block:'start',behavior:'smooth'})},250)}catch(e){}})}
  hwEvRender();el.hidden=false;crumb('hwEv')}
function hwEvRender(){var el=$('hwEv');if(!el)return;var M=HM();
  el.querySelector('h1').textContent='🎃 '+T('할로윈 이벤트');el.querySelector('.lead').textContent=T('11월 21일까지 · 사탕을 모아 선물을 받아요');$('hweMisH').textContent=T('오늘의 할로윈 미션');
  var box=$('hweMis');box.textContent='';HWM.forEach(function(o){var v=Math.min(o.goal,M.v[o.k]|0),got=!!M.got[o.k],rd=hwmReady(o);
    var r=document.createElement('div');r.className='hwe-row'+(got?' got':rd?' rd':'');var ic=document.createElement('i');ic.innerHTML=HWE_SVG[o.k==='candy'?'candy':o.k==='boss'?'ghost':'play'];r.appendChild(ic);
    var tx=document.createElement('div');tx.className='hwe-tx';var nm=document.createElement('b');nm.textContent=T(o.txt);var pr=document.createElement('small');pr.textContent=T('진주 ')+nf(o.p)+' · '+T('사탕 ')+o.c;tx.appendChild(nm);tx.appendChild(pr);
    var bar=document.createElement('span');bar.className='hwe-mb';var u=document.createElement('u');u.style.width=(v/o.goal*100)+'%';bar.appendChild(u);var vt=document.createElement('em');vt.textContent=v+'/'+o.goal;bar.appendChild(vt);tx.appendChild(bar);r.appendChild(tx);
    var b=document.createElement('button');b.type='button';b.className='buy'+(rd?'':' off');b.disabled=!rd;b.textContent=got?T('받았어요'):T('받기');b.addEventListener('click',function(){hwmClaim(o.k)});r.appendChild(b);box.appendChild(r)});
  var n=hwcN(),top=HWC[HWC.length-1].n;$('hweCH').textContent=T('사탕 모으기');$('hweCnt').textContent=nf(Math.min(n,999))+' / '+top;$('hweFill').style.width=Math.min(100,n/top*100)+'%';$('hweTip').textContent=T('싱글에서 떠다니는 사탕을 먹거나 미션을 깨면 모여요');
  var ms=$('hweMs');ms.textContent='';HWC.forEach(function(m,i){var got=hwcGot(i),rd=!got&&n>=m.n,c=document.createElement('div');c.className='hwe-m'+(got?' got':rd?' rd':'');
    var ic=document.createElement('i');if(m.a){var im=hwAcs('ac_pumpcrown');if(im){var e=new Image();e.alt='';e.src=im.src;ic.appendChild(e)}else ic.innerHTML=HWE_SVG.ghost}else ic.innerHTML=HWE_SVG[m.p?'pearl':'gem'];c.appendChild(ic);
    var lb=document.createElement('b');lb.textContent=m.a?T('호박 유령 왕관'):m.p?T('진주 ')+nf(m.p):T('보석 ')+m.g;c.appendChild(lb);
    var k=document.createElement('small');k.innerHTML=HWE_SVG.candy;k.appendChild(document.createTextNode(' '+m.n));c.appendChild(k);
    var b=document.createElement('button');b.type='button';b.className='buy'+(rd?'':' off');b.disabled=!rd;b.textContent=got?T('받았어요'):T('받기');b.addEventListener('click',function(){hwcClaim(i)});c.appendChild(b);ms.appendChild(c)});
  $('hweAtt').textContent='🎁 '+T('출석 선물');$('hweShop').textContent='🎩 '+T('한정 꾸미기');$('hweX').textContent=T('닫기')}
(function(){var st=document.createElement('style');st.textContent=
 '.hwe-panel{max-height:calc(100vh - 40px);max-height:calc(100dvh - 40px);overflow-y:auto;gap:10px;background:linear-gradient(180deg,#FFF6E8,#FFE9CC)!important}'+
 '.hwe-panel h1{font-family:var(--disp);font-weight:400;color:#0B2C4A;margin:0}.hwe-panel .lead{margin:0;color:#6A4A22}'+
 '.hwe-sec{border-radius:18px;background:#fff;box-shadow:0 0 0 2.5px #0B2C4A,0 4px 0 2.5px #0B2C4A;padding:10px 11px 11px;display:flex;flex-direction:column;gap:8px}'+
 '.hwe-sec h3{margin:0;font-family:var(--disp);font-weight:400;color:#0B2C4A;font-size:17px;display:flex;justify-content:space-between;align-items:center}.hwe-sec h3 b{font-weight:400;color:#C25A00}'+
 '.hwe-row{display:flex;align-items:center;gap:9px;border-radius:14px;background:#F4F8FC;padding:7px 8px;box-shadow:inset 0 0 0 2px #D5E2EC}.hwe-row.rd{background:#FFF4D6;box-shadow:inset 0 0 0 2px #FFB648}.hwe-row.got{opacity:.6}'+
 '.hwe-row>i{flex:none;width:34px;height:34px;border-radius:11px;background:#2E1B4F;display:grid;place-items:center}.hwe-row>i svg{width:24px;height:24px}'+
 '.hwe-tx{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.hwe-tx b{font-family:var(--disp);font-weight:400;font-size:14.5px;color:#0B2C4A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.hwe-tx small{font-size:12px;color:#7A5A2A}'+
 '.hwe-mb{position:relative;height:13px;border-radius:7px;background:#DCE6EE;box-shadow:inset 0 0 0 1.5px #0B2C4A;overflow:hidden;margin-top:2px}.hwe-mb u{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(180deg,#FFC66B,#FF8A1F);border-radius:7px}.hwe-mb em{position:absolute;inset:0;font-style:normal;font-size:10.5px;line-height:13px;text-align:center;color:#0B2C4A;font-weight:700}'+
 '.hwe-row .buy,.hwe-m .buy{flex:none;min-width:64px;padding:7px 10px 8px;font-size:14px}.hwe-row .buy.off,.hwe-m .buy.off{filter:grayscale(.75);opacity:.7}'+
 '.hwe-bar{position:relative;height:18px;border-radius:10px;background:#E5DCF5;box-shadow:inset 0 0 0 2px #0B2C4A;overflow:hidden}.hwe-bar u{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(180deg,#C9A2FF,#8F4FE8);border-radius:10px;box-shadow:inset 0 -3px 0 rgba(40,0,90,.25)}'+
 '.hwe-ms{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.hwe-m{display:flex;flex-direction:column;align-items:center;gap:3px;border-radius:14px;background:#F4F8FC;box-shadow:inset 0 0 0 2px #D5E2EC;padding:7px 4px 8px;min-width:0}'+
 '.hwe-m.rd{background:#FFF4D6;box-shadow:inset 0 0 0 2px #FFB648}.hwe-m.got{opacity:.6}.hwe-m i{width:42px;height:42px;display:grid;place-items:center}.hwe-m i svg{width:30px;height:30px}.hwe-m i img{max-width:42px;max-height:42px}'+
 '.hwe-m b{font-family:var(--disp);font-weight:400;font-size:13px;color:#0B2C4A;text-align:center;line-height:1.1;max-width:100%;overflow-wrap:anywhere}.hwe-m small{display:flex;align-items:center;gap:2px;font-size:12px;color:#5B3A8A;font-weight:700}.hwe-m small svg{width:15px;height:15px}'+
 '.hwe-m .buy{min-width:0;width:100%}.hwe-tip{margin:0;font-size:12px;color:#7A6A88;text-align:center}'+
 '.hwe-btns{display:grid;grid-template-columns:1fr 1fr;gap:8px}.hwe-panel .btn{min-height:0!important;height:auto!important;flex:none!important;padding:11px 12px 13px!important;font-size:16px!important}';
 document.head.appendChild(st)})();

/* --- 홈 할로윈 띠: 기간 내내 이벤트 입구로 --- */
var hwBarPaintE=hwBarPaint;hwBarPaint=function(){hwBarPaintE.apply(this,arguments);var b=$('hwBar');if(!b||!HW)return;var can=false;try{can=hwAttCan()}catch(e){}if(can)return;
  var rd=hwEvAny();b.hidden=false;b.classList.toggle('ha-on',rd);b.querySelector('span').textContent=rd?T('할로윈 보상이 와 있어요!'):T('할로윈 이벤트 · 사탕 ')+nf(hwcN())+T('개');b.querySelector('b').textContent=rd?T('받기'):T('보기');
  try{var sp=b.querySelector('span');sp.style.fontSize='';if(sp.scrollWidth>sp.clientWidth+1)sp.style.fontSize='12px'}catch(e){}};
(function(){var b=$('hwBar');if(b)b.addEventListener('click',function(e){var can=false;try{can=hwAttCan()}catch(_){}if(can||!HW)return;e.stopImmediatePropagation();hwEvOpen()},true)})();

/* --- 사탕 · 판 수 집계 --- */
var candyEatW=candyEat;candyEat=function(p){var r=candyEatW.apply(this,arguments);try{hwCandyAdd(1);hwmAdd('candy',1)}catch(e){}return r};
var endRunHW2=endRun;endRun=function(win,quit,by){try{if(HW&&mode==='single'&&!P.camp&&!P.surv&&!(typeof TUT!=='undefined'&&TUT.on)&&!P.hwEnd){P.hwEnd=1;hwmAdd('solo',1)}}catch(e){}return endRunHW2.apply(this,arguments)};

/* --- 보스: 할로윈 기간 싱글(기록 도전)에서 50초쯤 지나면 한 번 나온다. 놓치면 30초 뒤 다시 --- */
var HWB={f:null,done:false,next:50};
var startRunHB=startRun;startRun=function(){HWB={f:null,done:false,next:rnd(45,60)};P.hwEnd=0;return startRunHB.apply(this,arguments)};
function hwbSpawn(){var R=viewR(),a=Math.random()*Math.PI*2,x=cam.x+Math.cos(a)*R*1.25,y=clamp(cam.y+Math.sin(a)*R*.8,H*.02,H*.98),L=byId('angler');if(!L)return;
  var f={x:x,y:y,vx:0,vy:0,s:Math.max(P.s*2.3,P.s+20),ang:x>P.x?Math.PI:0,wa:0,wt:1,look:L,chase:.92,stun:0,phase:Math.random()*6,hwb:1,q:{head:'pumpkinhat'}};
  fish.push(f);HWB.f=f;crumb('hwb:spawn');banner(T('호박 유령 아귀가 나타났어요!'),T('입을 피해 몸통을 물어뜯어 작게 만든 뒤 꿀꺽!'));try{buzz([30,40,30]);MUS.sfx('big',1)}catch(e){}}
function hwbTick(){if(!candyOk()||P.time==null)return;var f=HWB.f;
  if(f&&fish.indexOf(f)<0){HWB.f=null;f=null;if(!HWB.done)HWB.next=P.time+30}
  if(!f){if(!HWB.done&&P.time>=HWB.next)hwbSpawn();return}
  var R=viewR(),d=Math.hypot(f.x-P.x,f.y-P.y);if(d>R*1.9){var a=Math.atan2(f.y-P.y,f.x-P.x);f.x=P.x+Math.cos(a)*R*1.3;f.y=clamp(P.y+Math.sin(a)*R*1.0,H*.02,H*.98)}
  if(!f.nb&&f.s<P.s*1.6)f.s=P.s*1.6; /* 물어뜯기 전엔 내가 커져도 위협으로 남게 */}
var updateHB=update;update=function(dt){var r=updateHB.apply(this,arguments);try{if(state==='play')hwbTick()}catch(e){}return r};
var consumeHB=consume;consume=function(f,i){if(f&&f.hwb&&!HWB.done){HWB.done=true;HWB.f=null;try{P.bonus=(P.bonus||0)+250;save.hwBossN=(save.hwBossN|0)+1;hwCandyAdd(3);hwmAdd('boss',1);
    setTimeout(function(){for(var j0=texts.length-1;j0>=0;j0--)if(texts[j0].big)texts.splice(j0,1);texts.push({x:P.x,y:P.y-P.s*2.4-40/zoom,txt:T('호박 유령 아귀 꺼-억!'),life:1.8,big:1})},0);
    for(var k=0;k<24;k++)if(fxs.length<400)fxs.push({x:f.x,y:f.y,vx:rnd(-160,160),vy:rnd(-180,60),life:rnd(.5,.9),r:Math.max(3,f.s*.08),col:k%2?'#FF8A1F':'#B67CFF'});
    shake=reduce?0:Math.max(shake,.25);buzz([30,40,60]);crumb('hwb:down');setTimeout(function(){banner(T('호박 유령 아귀를 물리쳤어요!'),T('사탕 +3 · 판이 끝나면 진주를 더 받아요'))},700)}catch(e){}}
  return consumeHB.apply(this,arguments)};
/* 보스 표시: 주황 빛 고리 + 이름표 */
var svDrawUnderHB=svDrawUnder;svDrawUnder=function(){var r=svDrawUnderHB.apply(this,arguments);try{var f=HWB.f;if(f&&state==='play'&&fish.indexOf(f)>=0){var c=ctx,pul=.5+.5*Math.sin(t*4);
    c.save();c.globalCompositeOperation='lighter';c.globalAlpha=.25+.2*pul;c.drawImage(glow('255,140,40'),f.x-f.s*2.2,f.y-f.s*2.2,f.s*4.4,f.s*4.4);c.restore();
    var ly=f.y-f.s*1.85-26/zoom;c.save();c.font=(15/zoom)+'px "Black Han Sans", Jua, sans-serif';c.textAlign='center';c.lineJoin='round';c.lineWidth=5/zoom;c.strokeStyle='#2E0F52';var nm='👻 '+T('호박 유령 아귀');c.strokeText(nm,f.x,ly);c.fillStyle='#FFB347';c.fillText(nm,f.x,ly);c.restore()}}catch(e){}return r};
