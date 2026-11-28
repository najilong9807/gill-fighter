/* 아가미시티(물고기 마을) 입구 — 1.1.30
   - 아래 메뉴 탭에 🏘 '마을'을 다섯째 칸(수족관 옆)으로: 플레이 · 수족관처럼 본게임의 한 화면으로 열림
   - 마을은 탭 막대 위 화면을 채운 iframe(city.html). 다른 탭을 누르면 마을을 저장하고 닫음
   - 진주 · 보석은 아가미 파이터와 같은 지갑(window.GF_WALLET)
   - 마을 저장은 같은 기기 localStorage 'gfcity.v1'(본게임 save와 따로) · 저장 백업에는 같이 실림
   - 탭 빨간 점: 처음 한 번(새 메뉴) + 마을에 받을 것이 생겼을 때(공사 끝 · 생산 8시간치 가득) — 마을이 'gfcity.hint'에 다음 시각을 남김 */
(function(){if(window.GF_TOWN_OFF)return; /* 1.1.30 출시엔 마을 끔(맨 앞 GF_TOWN_OFF) */
  window.GF_WALLET={get:function(k){return k==='pearl'?(save.pearls|0):(save.gems|0)},
    add:function(k,n){n=Math.round(n)||0;if(k==='pearl')save.pearls=Math.max(0,(save.pearls|0)+n);else save.gems=Math.max(0,(save.gems|0)+n);try{persist()}catch(e){}}};
  /* 저장 백업에 마을 저장도 같이: 맡길 때 save.city로 싣고, 불러올 때 'gfcity.v1'로 되돌림.
     city 칸이 없는 옛 백업이면 이 폰의 마을은 그대로 두고, 있으면(null 포함) 그 백업의 마을로 바꿈. 바꾸기 전 것은 'gfcity.v1.bak'에 한 벌 남김 */
  var CK='gfcity.v1',_cd=cloudData,_ca=cloudApply;
  cloudData=function(){var o=_cd();o.city=null;try{var c=localStorage.getItem(CK);if(c&&c.length<250000)o.city=JSON.parse(c);else if(c)delete o.city}catch(e){delete o.city}return o}; /* 1.1.32: 너무 크면 city 칸을 빼서 복원 때 그 폰 마을을 지우지 않음 */
  cloudApply=function(code,d){try{if(d&&('city' in d)){var old=localStorage.getItem(CK);if(old)localStorage.setItem(CK+'.bak',old);if(d.city&&typeof d.city==='object')localStorage.setItem(CK,JSON.stringify(d.city));else localStorage.removeItem(CK);localStorage.removeItem('gfcity.hint');delete d.city}}catch(e){}_ca(code,d)};

  var LAB={ko:'마을',en:'Town',ja:'町',es:'Pueblo',vi:'Làng'},NM={ko:'아가미시티',en:'Gill City',ja:'エラシティ',es:'Gill City',vi:'Gill City'};
  function lg(){var l=(typeof SUBL==='string'&&SUBL)||LANG||'ko';if(!LAB[l]&&window.GF_PACK&&GF_PACK.town){LAB[l]=GF_PACK.town;NM[l]=GF_PACK.city||'Gill City'}return LAB[l]?l:'en'}
  /* 탭 막대: 수족관 다음 칸에 '마을' */
  var tabs=document.getElementById('tabs'),tk=document.getElementById('tab-tank'),tb=null;
  if(tabs&&tk&&!document.getElementById('tab-city')){
    tb=document.createElement('button');tb.className='tab';tb.id='tab-city';tb.type='button';tb.setAttribute('data-tab','city');
    tb.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6.6 14.6V26.4a1.4 1.4 0 0 0 1.4 1.4h16a1.4 1.4 0 0 0 1.4-1.4V14.6" fill="currentColor" stroke="#0B2C4A" stroke-width="2.4" stroke-linejoin="round"/><path d="M3.4 15.6 16 5.2l12.6 10.4" fill="none" stroke="#0B2C4A" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><rect x="13.2" y="19.2" width="5.6" height="8.6" rx="2.8" fill="#0B2C4A"/><circle cx="24.6" cy="5.4" r="2.2" fill="#fff" stroke="#0B2C4A" stroke-width="1.6"/><circle cx="28.4" cy="9.6" r="1.3" fill="#fff" stroke="#0B2C4A" stroke-width="1.3"/></svg><span></span><i class="tab-dot" id="cityDot" hidden></i>';
    tb.querySelector('span').textContent=LAB[lg()];
    /* 다른 탭처럼 입체 아이콘(svart/ic_town.webp) — 그림을 못 읽으면 위 SVG 그대로 */
    try{if(typeof icImg==='function'){var im=icImg('town'),sv=tb.querySelector('svg');im.onerror=function(){if(im.parentNode){im.parentNode.replaceChild(sv,im);tb.classList.remove('has3d')}};tb.replaceChild(im,sv);tb.classList.add('has3d')}}catch(e){}tb.setAttribute('aria-label',NM[lg()]);
    tk.parentNode.insertBefore(tb,tk.nextSibling);tabs.classList.add('t5');
    var st=document.createElement('style');st.textContent=
      '#tabs.t5{grid-template-columns:repeat(5,1fr)!important;gap:2px!important;padding-inline:6px!important}'+
      '#tabs.t5 .tab span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}'+
      '#cityOv{position:fixed;left:0;right:0;top:0;z-index:29;background:#1d5f86;overflow:hidden}'+
      '#cityOv iframe{border:0;width:100%;height:100%;display:block;opacity:0;transition:opacity .28s ease-out}'+
      '#cityOv.on iframe{opacity:1}'+
      '#cityOv .cwait{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:#fff;background:radial-gradient(120% 80% at 50% 30%,#3FA9D6 0%,#1d5f86 60%,#0D3159 100%);transition:opacity .3s}'+
      '#cityOv.on .cwait{opacity:0;pointer-events:none}'+
      '#cityOv .cwait b{font-size:26px;letter-spacing:.02em;text-shadow:0 3px 0 #0B2C4A,0 0 18px rgba(255,255,255,.25)}'+
      '#cityOv .cwait i{display:flex;gap:8px}#cityOv .cwait i s{width:12px;height:12px;border-radius:50%;background:#fff;border:2px solid #0B2C4A;animation:cwb 1s ease-in-out infinite}'+
      '#cityOv .cwait i s:nth-child(2){animation-delay:.15s}#cityOv .cwait i s:nth-child(3){animation-delay:.3s}'+
      '@keyframes cwb{0%,100%{transform:translateY(0);opacity:.55}50%{transform:translateY(-9px);opacity:1}}'+
      '@media (prefers-reduced-motion:reduce){#cityOv .cwait i s{animation:none}#cityOv iframe{transition:none}}'+
      'body.cityOn #banner.low{bottom:calc(env(safe-area-inset-bottom,0px) + 150px)!important}'+
      'li.cityg{background:#E3F6EC!important;box-shadow:inset 0 0 0 2px #2E9B55!important}li.cityg b{color:#1F7A42}';
    document.head.appendChild(st)}

  /* 마을 화면 열고 닫기 */
  var ov=null,fr=null;
  function satPx(){var d=document.createElement('div');d.style.cssText='position:fixed;top:0;left:0;height:env(safe-area-inset-top);width:env(safe-area-inset-left);visibility:hidden;pointer-events:none';document.body.appendChild(d);var r=[d.offsetHeight|0,d.offsetWidth|0];d.remove();return r}
  function fit(){if(!ov)return;var t=document.getElementById('tabs'),h=t&&!t.hidden?Math.max(0,innerHeight-t.getBoundingClientRect().top):0;ov.style.bottom=h+'px'}
  var openAt=0;
  function shut(){if(!ov)return;setTimeout(function(){try{cityAqRead()}catch(e){}},50);try{var sec=Math.round((Date.now()-openAt)/1000);if(openAt&&sec>0&&sec<6*3600)cms('citySec',sec);openAt=0;var cg=JSON.parse(localStorage.getItem(CK)||'null'),hl=0;if(cg&&cg.b)cg.b.forEach(function(b){if(b.k==='hall')hl=b.lv|0});if(hl&&typeof msS==='function'){var o=msS();if((o.c.cityHall|0)<hl){o.c.cityHall=hl;persist()}}}catch(e){}try{if(fr&&fr.contentWindow&&fr.contentWindow.GF_CITY_SAVE)fr.contentWindow.GF_CITY_SAVE()}catch(e){}ov.remove();ov=null;fr=null;document.body.classList.remove('cityOn');if(tb)tb.removeAttribute('aria-current');removeEventListener('resize',fit);setTimeout(dot,300)}
  function open(){
    if(ov)return;try{crumb('tab:city')}catch(e){}
    /* 다른 화면과 같은 정리(판 · 꾸미기 · 창 닫기) 뒤, 홈은 감추고 마을만 */
    try{if(typeof deco!=='undefined'&&deco.on)decoEnd()}catch(e){}
    try{pgImgsFree('')}catch(e){}
    page='city';state='menu';try{P.dead=true}catch(e){}joy=null;
    ['over','pause','sheet','hud','skill','hint','home','tankUI','menu','sea','rec','setp'].forEach(function(id){var el=document.getElementById(id);if(el)el.hidden=true});
    var t=document.getElementById('tabs');if(t)t.hidden=false;
    ['home','tank','dex','sea'].forEach(function(k){var b=document.getElementById('tab-'+k);if(b)b.removeAttribute('aria-current')});if(tb)tb.setAttribute('aria-current','page');
    if(!save.cityIn){save.cityIn=Date.now();try{persist()}catch(e){}try{if(typeof nfEv==='function'&&Date.now()-(save.firstAt||Date.now())<7*864e5)nfEv('city1')}catch(e){}} /* 1.1.33: 신규 기록(nb)은 깐 지 7일 안인 사람만 — 원래 하던 사람이 마을 처음 들어갈 때 신규로 잡히던 것(11/24 4명) */
    cms('cityOpen');openAt=Date.now();
    var sa=satPx(),l=lg();
    ov=document.createElement('div');ov.id='cityOv';
    ov.innerHTML='<div class="cwait" aria-hidden="true"><b></b><i><s></s><s></s><s></s></i></div>';ov.querySelector('b').textContent=NM[l];
    fr=document.createElement('iframe');fr.title=NM[l];
    fr.src='city.html?lang='+l+'&tab=1&sat='+sa[0]+'&sal='+sa[1];
    var shown=false,show=function(){if(shown||!ov)return;shown=true;ov.classList.add('on')};
    fr.addEventListener('load',function(){setTimeout(show,180)});setTimeout(show,2500);
    ov.appendChild(fr);document.body.appendChild(ov);document.body.classList.add('cityOn');fit();addEventListener('resize',fit);
    try{localStorage.removeItem('gfcity.hint')}catch(e){}dot()}
  /* 마을이 열려 있는 동안엔 본게임 바다 그리기를 멈춤(덮는 창 목록 COV 에 넣음 · 두 화면을 동시에 그리던 부담) */
  try{if(typeof COV!=='undefined'&&COV.ids.indexOf('cityOv')<0)COV.ids.push('cityOv')}catch(e){}
  window.GF_CITY_TAB=true;
  window.GF_GO=function(t){try{if(t==='tank')toTank();else if(t==='home')toHome();else showTab(t)}catch(e){}};
  /* 내 물고기 나들이: 수족관에 넣어 둔 물고기(없으면 지금 고른 물고기)를 마을에 넘김 · 마을에서 쓰다듬으면 수족관과 같은 친밀도(abyPet 규칙: 하루 5번, 단계 오르면 진주 5×단계) */
  window.GF_MYFISH=function(){try{var ids=tankIds();if(!ids.length&&sel)ids=[sel];return ids.slice(0,12).map(function(id){var L=byId(id);return L&&SPRITE_SRC[id]?{id:id,n:L.name,src:SPRITE_SRC[id],lv:affLv(affOf(id))}:null}).filter(Boolean)}catch(e){return []}};
  window.GF_PET=function(id){try{var o=AB(),a=o.aff[id];if(!a||typeof a!=='object')a=o.aff[id]={n:0,d:'',c:0};if(a.d!==o.d){a.d=o.d;a.c=0}
    if(a.c>=AFF_DAY)return {tired:1,lv:affLv(a.n)};var l0=affLv(a.n);a.n++;a.c++;a.tp=(a.tp|0)+1;var l1=affLv(a.n),g=0;if(l1>l0){g=5*l1;save.pearls+=g}persist();return {lv:l1,up:l1>l0,g:g}}catch(e){return null}};
  /* 본게임 → 마을 ①: 20초 넘게 한 판(싱글 · 대전 · 심해 생존 모두)마다 '마을 재료 상자' 1개, 하루 6개까지.
     상자는 localStorage 'gfcity.gift' {n} 에 쌓이고, 마을이 열릴 때 산호궁 단계에 맞는 재료로 바꿔 받음. 결과 창에 한 줄 */
  var GBX=6;function cgDay(){var d=today(),o=save.cityG;if(!o||o.d!==d)o=save.cityG={d:d,n:0};return o}
  function cgAdd(){var o=cgDay();if(o.n>=GBX)return 0;o.n++;try{var g=JSON.parse(localStorage.getItem('gfcity.gift')||'{}');g.n=(g.n|0)+1;g.at=Date.now();localStorage.setItem('gfcity.gift',JSON.stringify(g))}catch(e){}persist();return o.n}
  var _erC=endRun;endRun=function(){var st0=state,t0=P?(P.time||0):0,done=P&&P.cityG;var r=_erC.apply(this,arguments);
    try{if(st0==='play'&&state!=='play'&&!done&&t0>=20&&!(typeof TUT!=='undefined'&&TUT&&TUT.on)){P.cityG=1;var n=cgAdd();
      if(n){var rec=document.getElementById('oRec');if(rec){var li=document.createElement('li');li.className='cityg';var sp=document.createElement('span'),b=document.createElement('b');sp.textContent=T(CGT);b.textContent='+1 · '+n+' / '+GBX;li.appendChild(sp);li.appendChild(b);rec.appendChild(li);if(!save.cityIn){b.textContent='+1 ›';li.className='cityg cgo';li.setAttribute('role','button');li.tabIndex=0;li.onclick=function(){try{buzz(8)}catch(e){}open()}}}}
      setTimeout(dot,200)}}catch(e){}return r};
  var CGT='🏘 마을 재료 상자',CGV={en:'🏘 Town supply crate',ja:'🏘 町の資材箱',es:'🏘 Caja de materiales del pueblo',vi:'🏘 Thùng vật liệu làng'};
  try{TRT[CGT]=CGV.en}catch(e){}try{TRJ[CGT]=CGV.ja}catch(e){}try{if(SUBL&&CGV[SUBL])TRX[CGT]=CGV[SUBL]}catch(e){}
  /* 본게임 → 마을 ②: 가진 물고기 전부(새로 모은 물고기는 마을로 이사 옴) */
  window.GF_OWNED=function(){try{return ownedIds().map(function(id){var L=byId(id);return L&&SPRITE_SRC[id]?{id:id,n:L.name,src:SPRITE_SRC[id],lv:affLv(affOf(id))}:null}).filter(Boolean)}catch(e){return []}};
  /* ===== 마을 ↔ 수족관 (1.1.30) =====
     ① 마을 '수족관 공방'에서만 만드는 수족관 전용 소품 6종(상점엔 없음 · 가진 것만 서랍에 보임). 그림은 기존 소품을 색 바꿔 구운 svart/dc_town_*.webp
     ③ 마을 '아가미 수족관' 건물 레벨 L → 소품 칸 40+2L · 집 진주 샘 +L% (마을 저장 gfcity.v1 을 읽어 save.cityAq) */
  var TD=[['town_bluelight','푸른 등대','lighthouse',.17,1.9,{fx:'beam',kw:1.4,hk:1.2}],['town_kelpcottage','다시마 지붕 오두막','cottage',.26,.92,{g:['190,255,170',.1,-.05,.55,.18]}],
    ['town_brickcastle','산호 벽돌 성','sandcastle',.34,.8,{g:['255,170,120',0,0,.5,.14]}],['town_pearltable','진주빛 테이블산호','tablecoral',.24,1.28,{kw:1.03}],
    ['town_goldarch','황금 산호 아치','coralarch',.34,.86,{kw:1.02,fx:'spark'}],['town_goldbrain','황금 뇌산호','braincoral',.24,.93,{kw:1.02,fx:'spark'}]];
  var TDN={'푸른 등대':['Blue Lighthouse','青い灯台','Faro azul','Hải đăng xanh'],'다시마 지붕 오두막':['Kelp-Roof Cottage','コンブ屋根の小屋','Cabaña de techo de algas','Nhà mái tảo bẹ'],'산호 벽돌 성':['Coral Brick Castle','サンゴれんがの城','Castillo de ladrillo de coral','Lâu đài gạch san hô'],
    '진주빛 테이블산호':['Pearly Table Coral','真珠色のテーブルサンゴ','Coral mesa perlado','San hô bàn ánh ngọc'],'황금 산호 아치':['Golden Coral Arch','金のサンゴアーチ','Arco de coral dorado','Cổng san hô vàng'],'황금 뇌산호':['Golden Brain Coral','金の脳サンゴ','Coral cerebro dorado','San hô não vàng'],
    '마을 공방에서 만든 소품':['Made in the Town workshop','町の工房で作った小物','Hecho en el taller del pueblo','Làm ở xưởng của làng']};
  try{for(var tk in TDN){TRT[tk]=TDN[tk][0];TRJ[tk]=TDN[tk][1];if(SUBL==='es')TRX[tk]=TDN[tk][2];else if(SUBL==='vi')TRX[tk]=TDN[tk][3]}}catch(e){}
  try{TD.forEach(function(q){DART[q[0]]=q[5];if(!DECO_DRAW[q[0]])DECO_DRAW[q[0]]=DECO_DRAW[q[2]]||function(){};if(!decoById(q[0])||decoById(q[0]).id!==q[0])DECOR.push({id:q[0],name:T(q[1]),w:q[3],ar:q[4],draw:q[0],c:{cur:'gems',price:0},town:1,desc:T('마을 공방에서 만든 소품')})});
    var _hwTD=hwList;hwList=function(arr,own){var r=_hwTD.apply(this,arguments);return r.filter(function(o){return !o.town||own(o)})}}catch(e){}
  window.GF_AQGIFT=function(id){try{if(!TD.some(function(q){return q[0]===id}))return false;var d=DS();d.inv[id]=(d.inv[id]||0)+1;save.cityGot=(save.cityGot||0)+1;persist();cms('cityCraft');setTimeout(function(){try{var t=document.getElementById('tankDot');if(t)t.hidden=false}catch(e){}},300);return true}catch(e){return false}};
  function cityAqRead(){try{var g=JSON.parse(localStorage.getItem(CK)||'null'),L=0;if(g&&g.b)g.b.forEach(function(b){if(b.k==='aqua')L=Math.max(L,b.lv|0)});if((save.cityAq|0)!==L){save.cityAq=L;persist()}}catch(e){}aqApply()}
  function aqApply(){try{DECO_MAX=40+2*(save.cityAq|0)}catch(e){}}
  try{var _hrAQ=houseRateAt;houseRateAt=function(){var r=_hrAQ.apply(this,arguments);var L=save.cityAq|0;return r&&L?Math.max(1,Math.round(r*(1+L*.01))):r}}catch(e){}
  setTimeout(cityAqRead,1500);
  var AQB='🏘 마을 아가미 수족관 Lv.',AQS=' · 소품 칸 +',AQV={en:['🏘 Town Gill Aquarium Lv.',' · decor slots +',' · pearl spring +'],ja:['🏘 町のエラ水族館 Lv.','・小物の枠 +','・真珠の泉 +'],es:['🏘 Acuario Gill del pueblo Nv.',' · espacios de adornos +',' · fuente de perlas +'],vi:['🏘 Bể cá Gill của làng Lv.',' · ô trang trí +',' · suối ngọc +']};
  var _ttAQ=toTank;toTank=function(){var r=_ttAQ.apply(this,arguments);try{cms('tankOpen');var L=save.cityAq|0;if(L>(save.cityAqSeen|0)){save.cityAqSeen=L;persist();var l=lg(),w=l==='ko'?[AQB,AQS,' · 진주 샘 +']:AQV[l]||AQV.en;setTimeout(function(){if(page==='tank')banner(w[0]+L+w[1]+(2*L)+w[2]+L+'%','')},7000)}}catch(e){}return r};
  window.GF_BUZZ=function(v){try{buzz(v)}catch(e){}};
  window.GF_CITY_OPEN=open;
  window.GF_CITY_CLOSE=function(){shut();try{toHome()}catch(e){}};
  /* 다른 탭 · 다른 화면으로 가면 마을을 먼저 저장하고 닫음 */
  var _sh=showTab,_th=toHome,_tt=toTank;
  showTab=function(p){shut();return _sh.apply(this,arguments)};
  toHome=function(){shut();return _th.apply(this,arguments)};
  toTank=function(){shut();return _tt.apply(this,arguments)};
  if(tb)tb.addEventListener('click',function(){if(ov)return;try{buzz(8)}catch(e){}open()});

  /* 오늘의 미션에 마을 한 줄: '마을에서 생산품 3번 받기'(진주 120). 마을이 말풍선을 걷을 때마다 GF_CITY_EV('collect') */
  var MK='마을에서 생산품 3번 받기',MT={en:'Collect goods in Town 3 times',ja:'町で生産品を3回受け取る',es:'Recoge productos en el pueblo 3 veces',vi:'Thu hoạch trong làng 3 lần'};
  try{if(!dmDef('town'))DM_POOL.push({k:'town',goal:3,txt:MK,p:120})}catch(e){}
  try{TRT[MK]=MT.en}catch(e){}try{TRJ[MK]=MT.ja}catch(e){}try{if(SUBL&&MT[SUBL])TRX[MK]=MT[SUBL]}catch(e){}
  try{if(typeof DMI3!=='undefined')DMI3.town='town'}catch(e){}
  try{DM_ICO.town='<path d="M5 11.5V20h14v-8.5M3.5 12 12 4.5l8.5 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/><rect x="10" y="14" width="4" height="6" rx="2" fill="currentColor"/>'}catch(e){}
  /* 마을에서 미션을 채우면 '판이 끝나면 받아요' 대신 '홈으로 돌아가면 받아요'(보상함 자동 받기는 홈에 갈 때 돈다) */
  var HK=' · 홈으로 돌아가면 자동으로 받아요',HT={en:' · auto-collected when you go Home',ja:' · ホームに戻ると自動で受け取ります',es:' · se recoge solo al volver al inicio',vi:' · tự nhận khi về Trang chính'};
  try{TRT[HK]=HT.en}catch(e){}try{TRJ[HK]=HT.ja}catch(e){}try{if(SUBL&&HT[SUBL])TRX[HK]=HT[SUBL]}catch(e){}
  try{var _rbh=rbxHint;rbxHint=function(){if(page==='city'&&rbxAutoOn())return T(HK);return _rbh.apply(this,arguments)}}catch(e){}
  /* 사용 기록(1.1.30): 하루치 횟수만 msEv(kind 'ms' · 3시간에 한 번 · 누구인지 없음)로. 마을 안 행동은 마을이 GF_CITY_EV 로 알려 줌 */
  var CEV={collect:'cityCol',ord:'cityOrd',box:'cityBox',build:'cityBuild',dec:'cityDec',pet:'cityPet',wq:'cityWq',rec:'cityRec',name:'cityName'};
  function cms(k,n){try{if(typeof msEv==='function')msEv(k,n)}catch(e){}}
  window.GF_CITY_EV=function(k,n){try{if(k==='collect')dmAdd('town',n||1)}catch(e){}if(CEV[k])cms(CEV[k],n||1)};
  /* 빨간 점: 아직 한 번도 안 들어가 봤거나, 마을에 받을 것이 생겼을 때 */
  function dot(){var d=document.getElementById('cityDot');if(!d)return;var on=false;
    if(!ov){if(!save.cityIn&&(save.runs|0)>=1)on=true;
      else{try{var h=JSON.parse(localStorage.getItem('gfcity.hint')||'null');if(h&&h.next&&Date.now()>=h.next)on=true;var gg=JSON.parse(localStorage.getItem('gfcity.gift')||'null');if(gg&&gg.n>0)on=true}catch(e){}}}
    d.hidden=!on;tipUp()}
  /* 1.1.35: 첫 판 뒤 홈 '마을' 탭 위 말풍선(처음 들어갈 때까지) — 신규 76명 중 11명만 마을에 들어가 봄(11/14~27) */
  var TIPK='🏘 마을이 열렸어요!',TIPV={en:'🏘 Your Town is open!',ja:'🏘 町が開きました！',es:'🏘 ¡Tu pueblo ya está abierto!',vi:'🏘 Làng của bạn đã mở!'};
  try{TRT[TIPK]=TIPV.en}catch(e){}try{TRJ[TIPK]=TIPV.ja}catch(e){}try{if(SUBL&&TIPV[SUBL])TRX[TIPK]=TIPV[SUBL]}catch(e){}
  try{var tst=document.createElement('style');tst.textContent='#tab-city{position:relative;overflow:visible}#cityTip{position:absolute;left:50%;bottom:calc(100% + 8px);transform:translateX(-50%);white-space:nowrap;padding:7px 12px;border-radius:14px;background:#FFF6D6;color:#0B2C4A;border:2.5px solid #0B2C4A;font:400 13px/1.15 "Jua",system-ui,sans-serif;-webkit-text-stroke:0;text-shadow:none;letter-spacing:0;text-transform:none;box-shadow:0 3px 0 #0B2C4A;pointer-events:none;z-index:3;animation:ctipb 1.6s ease-in-out infinite}#cityTip:after{content:"";position:absolute;left:50%;top:100%;margin-left:-7px;border:7px solid transparent;border-top-color:#0B2C4A}#cityTip[hidden]{display:none}@keyframes ctipb{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,-4px)}}li.cityg.cgo{cursor:pointer}@media (prefers-reduced-motion:reduce){#cityTip{animation:none}}';document.head.appendChild(tst)}catch(e){}
  function tipUp(){try{var tp=document.getElementById('cityTip'),want=!!tb&&!ov&&!save.cityIn&&(save.runs|0)>=1&&typeof page!=='undefined'&&page==='home';
    if(want&&!tp){tp=document.createElement('div');tp.id='cityTip';tp.setAttribute('aria-hidden','true');tb.appendChild(tp)}if(tp){tp.textContent=T(TIPK);tp.hidden=!want}
    if(tp&&want){var r=tp.getBoundingClientRect();if(r.right>innerWidth-6)tp.style.marginLeft=(innerWidth-6-r.right)+'px';else if(r.left<6)tp.style.marginLeft=(6-r.left)+'px'}}catch(e){}}
  /* 게임 안 소식: 마을이 처음 들어가는 버전(CITY_VER)에 두 줄을 덧붙임(같은 버전의 다른 소식 뒤에) */
  try{var CITY_VER='1.1.30',NA="🏘 새 메뉴 「마을」: 아래 탭에서 바닷속 물고기 마을 아가미시티를 지어요 · 진주 · 보석은 아가미 파이터와 같이 써요",NB="오늘의 미션에 「마을에서 생산품 3번 받기」가 나와요 · 마을 수족관에서 내 수족관으로 바로 가요";
    var NT={en:["🏘 New menu 「Town」: build Gill City, an undersea fish town, from the bottom tab · Pearls and Gems are shared with Gill Fighter","Today's missions can include 「Collect goods in Town 3 times」 · jump from the Town aquarium straight to your own aquarium"],
      ja:["🏘 新メニュー「町」：下のタブから海の中の魚の町エラシティを作ろう・真珠とジェムはエラファイターと共通","今日のミッションに「町で生産品を3回受け取る」が登場・町の水族館から自分の水族館へすぐ行けます"],
      es:["🏘 Nuevo menú 「Pueblo」: construye Gill City, un pueblo de peces bajo el mar, desde la pestaña de abajo · las Perlas y Gemas se comparten con Gill Fighter","Las misiones de hoy pueden incluir 「Recoge productos en el pueblo 3 veces」 · desde el acuario del pueblo vas directo a tu acuario"],
      vi:["🏘 Menu mới 「Làng」: xây Gill City, làng cá dưới biển, từ tab bên dưới · Ngọc trai và Đá quý dùng chung với Gill Fighter","Nhiệm vụ hôm nay có thể có 「Thu hoạch trong làng 3 lần」 · từ bể cá của làng đi thẳng tới bể cá của bạn"]};
    try{TRT[NA]=NT.en[0];TRT[NB]=NT.en[1]}catch(e){}try{TRJ[NA]=NT.ja[0];TRJ[NB]=NT.ja[1]}catch(e){}try{if(SUBL&&NT[SUBL]){TRX[NA]=NT[SUBL][0];TRX[NB]=NT[SUBL][1]}}catch(e){}
    NEWS[CITY_VER]=[T(NA),T(NB)].concat(NEWS[CITY_VER]||[])}catch(e){}
  var _rh=refreshHome;refreshHome=function(){var r=_rh.apply(this,arguments);try{dot()}catch(e){}return r};
  setInterval(dot,30000);document.addEventListener('visibilitychange',function(){if(!document.hidden)dot()});setTimeout(dot,800);
})();
