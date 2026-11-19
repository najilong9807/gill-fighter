/* ===== 고래 항구 교역 · 현황 지도 · 소리 ===== */
/* --- 🐋 고래 항구: 상자를 채워 먼 바다 마을에 보내면 진주 못 · 보석 · 희귀 장식 --- */
DEC.d_whale={n:'고래 조각상',s:2,c:0,at:1,v:22,r:5,gift:1};DEC.d_shipw={n:'가라앉은 배',s:2,c:0,at:1,v:18,r:4,gift:1};
function giftArt(k,bp){var p=pal(bp),cx=GX,cy=GY,g=box(p,cx,cy,88,6,sp(p,'#f2f6fa'),sp(p,'#dde6f0'),sp(p,'#b9c8dc')),y=cy-6;
  if(k==='d_whale'){g+='<path d="M'+(cx-60)+','+(y-10)+' q40,-70 104,-20 q14,12 -4,26 q-50,22 -100,-6Z" fill="'+sp(p,'#6f8fc9')+'"'+S(p)+'/>'+'<path d="M'+(cx+44)+','+(y-4)+' l26,-24 l2,30Z" fill="'+sp(p,'#6f8fc9')+'"'+S(p)+'/>'+(p.bp?'':'<path d="M'+(cx-46)+','+(y-4)+' q40,12 86,-2" fill="none" stroke="#e8f0ff" stroke-width="5" stroke-linecap="round"/><circle cx="'+(cx-30)+'" cy="'+(y-28)+'" r="3.5" fill="'+OUT+'"/><path d="M'+(cx-10)+','+(y-58)+' q-6,-20 6,-30 M'+(cx-10)+','+(y-58)+' q10,-16 22,-14" stroke="#bff3ff" stroke-width="4" fill="none" stroke-linecap="round"/>')}
  else{g+='<path d="M'+(cx-64)+','+(y-6)+' L'+(cx+50)+','+(y-30)+' L'+(cx+60)+','+(y-4)+' L'+(cx-50)+','+(y+18)+'Z" fill="'+sp(p,'#a97a52')+'"'+S(p)+'/><path d="M'+(cx-4)+','+(y-12)+' L'+(cx+6)+','+(y-92)+'" stroke="'+OUT+'" stroke-width="7"/><path d="M'+(cx-4)+','+(y-12)+' L'+(cx+6)+','+(y-92)+'" stroke="'+sp(p,'#c99a6a')+'" stroke-width="4"/>'+
    '<path d="M'+(cx+6)+','+(y-88)+' q30,16 4,46Z" fill="'+sp(p,'#f2e6cf')+'"'+S(p)+'/>'+coral(p,cx-40,y+10,.6,p.coralA)+kelp(p,cx+40,y+6,34)}
  return {svg:g,top:y-110}}
var _artFor3=artFor;artFor=function(id,L,bp){if(id==='d_whale'||id==='d_shipw')return giftArt(id,bp);return _artFor3(id,L,bp)};
function portBoxes(){return lvOf('port')>=10?3:2}
function portNew(){var L=hallLv(),pool=goodsPool(),bx=[];if(!pool.length)pool=['stone'];
  for(var i=0;i<portBoxes();i++){var it={},n=Math.min(2,pool.length),sh=pool.slice().sort(function(){return Math.random()-.5});for(var j=0;j<n;j++){var g=sh[j];it[g]=Math.max(2,Math.round(GB[g]*2.2*(1+L*.3)*(.8+Math.random()*.4)))}bx.push({it:it,full:false})}
  var pl=lvOf('port'),rw={nail:Math.round(3*pl*(1+pl*.05)),gem:1,xp:30+pl*4};if(Math.random()<.25)rw.gift=Math.random()<.5?'d_whale':'d_shipw';return {st:'load',bx:bx,rw:rw}}
function portTrip(){return 7200}
function portTick(now){if(!lvOf('port'))return;if(!G.pt)G.pt=portNew();if(G.pt.st==='away'&&now>=G.pt.back)G.pt.st='back'}
function boxOk(c){for(var k in c.it)if((G.res[k]||0)<c.it[k])return false;return true}
function portPanel(b){var el=$('panel'),T=G.pt,h='<button class="x" id="pX">✕</button><h2>🐋 고래 항구 <small>Lv.'+lvOf('port')+'</small></h2>';
  if(!T)h+='<div class="box">항구를 다 지으면 고래 배가 들어와요</div>';
  else if(T.st==='away')h+='<div class="box">🐋 먼 바다 마을로 가는 중 · <b>'+dur((T.back-NOW())/1000)+'</b></div><div class="row"><button id="xRush">💎 '+D.rushGems((T.back-NOW())/1000)+' 바로 돌아오기</button></div>';
  else if(T.st==='back')h+='<div class="box">🐋 돌아왔어요! 📌 '+T.rw.nail+' · 💎 '+T.rw.gem+(T.rw.gift?' · 🎁 '+DEC[T.rw.gift].n:'')+' · ⭐'+T.rw.xp+'</div><div class="row"><button id="xGet">받기</button></div>';
  else{h+='<div class="cars">'+T.bx.map(function(c,i){return '<div class="car'+(c.full?' full':'')+'">'+Object.keys(c.it).map(function(k){var ok=(G.res[k]||0)>=c.it[k];return '<b class="'+(c.full||ok?'':'no')+'">'+ICON[k]+' '+c.it[k]+'</b>'}).join('')+(c.full?'<small>✓ 채웠어요</small>':'<button data-x="'+i+'"'+(boxOk(c)?'':' disabled')+'>채우기</button>')+'</div>'}).join('')+'</div>';
    h+='<p class="role">상자를 다 채우면 2시간 다녀와요 · 📌 '+T.rw.nail+' · 💎 '+T.rw.gem+' · ⭐'+T.rw.xp+(T.rw.gift?' · 🎁 희귀 장식 「'+DEC[T.rw.gift].n+'」':'')+'</p>'}
  el.innerHTML=h;el.hidden=false;$('pX').onclick=function(){SEL=null;closePanel()};
  el.querySelectorAll('[data-x]').forEach(function(x){x.onclick=function(){var c=T.bx[+x.dataset.x];if(!boxOk(c))return;for(var k in c.it)G.res[k]-=c.it[k];c.full=true;snd('load');if(T.bx.every(function(q){return q.full})){T.st='away';T.back=NOW()+portTrip()*1000;toast('🐋 고래 배가 떠났어요');snd('go')}save();portPanel(b)}});
  if($('xGet'))$('xGet').onclick=function(){G.res.nail+=T.rw.nail;WAL.add('gem',T.rw.gem);addXP(T.rw.xp);evtAdd(25);if(T.rw.gift){G.inv=G.inv||{};G.inv[T.rw.gift]=(G.inv[T.rw.gift]|0)+1;toast('🎁 '+DEC[T.rw.gift].n+'을(를) 받았어요 · 짓기 → 장식에서 놓아요')}snd('coin');G.pt=portNew();save();portPanel(b)};
  if($('xRush'))$('xRush').onclick=function(){var g=D.rushGems((T.back-NOW())/1000);if(!gemPay(g))return;T.back=NOW();T.st='back';save();portPanel(b)};panelFor={pt:b}}

/* --- 🗺 현황 지도: 산소 · 땅값 · 행복(집) 겹쳐 보기 --- */
var VIEW=0,VIEWS=['','산소','땅값','서비스'];
function viewTint(key,i,j,p,w,h){if(!VIEW||G.road[key])return;var c;if(VIEW===1)c=O2[key]?'rgba(80,190,255,.42)':'rgba(30,40,70,.28)';else if(VIEW===3){var cv2=COV[key]|0,n=(cv2&1)+((cv2>>1)&1)+((cv2>>2)&1);c=['rgba(30,40,70,.3)','rgba(255,150,80,.38)','rgba(255,220,80,.4)','rgba(90,210,120,.45)'][n]}else{var v=landVal(i,j),t=Math.max(0,Math.min(1,(v-30)/40));c='rgba('+Math.round(230-150*t)+','+Math.round(80+130*t)+',90,.42)'}diamond(p.x,p.y,w,h);ctx.fillStyle=c;ctx.fill()}
function viewBtn(){VIEW=(VIEW+1)%VIEWS.length;$('bView').innerHTML=VIEW?'🗺<small>'+VIEWS[VIEW]+'</small>':'🗺';$('legend').hidden=!VIEW;$('legend').innerHTML=VIEW===3?'닿는 서비스(🚒 · 👮 · 🏥) <i style="background:#ff9650"></i>1 <i style="background:#ffdc50"></i>2 <i style="background:#5ad278"></i>3 · 3단계 🚒 · 4단계 +👮 · 5단계 +🏥':VIEW===1?'<i style="background:#50beff"></i> 산소 닿음 <i style="background:#1e2846"></i> 안 닿음':'<i style="background:#e65a5a"></i> 낮음 <i style="background:#9fb45a"></i> 보통 <i style="background:#50d25a"></i> 높음 (주택이 자라는 기준 45 · 58)'}
$('bView').onclick=viewBtn;

/* --- 🔊 소리: 코드로 만든 짧은 효과음 --- */
var AC=null,SND=true;try{SND=localStorage.getItem('gfcity.snd')!=='0'}catch(e){}
/* 본게임에서 효과음을 꺼 두었으면 마을도 처음엔 조용히(마을 메뉴에서 따로 켤 수 있음) */
try{if(EMB&&localStorage.getItem('gfcity.snd')==null){var ms=JSON.parse(localStorage.getItem('fishproto.save2')||'{}');if(ms.sfx===false)SND=false}}catch(e){}
document.addEventListener('pointerdown',function(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}},true);
function tone(f,t0,d,type,vol,f2){var o=AC.createOscillator(),g=AC.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,AC.currentTime+t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,AC.currentTime+t0+d);g.gain.setValueAtTime(0,AC.currentTime+t0);g.gain.linearRampToValueAtTime(vol||.18,AC.currentTime+t0+.01);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+t0+d);o.connect(g);g.connect(AC.destination);o.start(AC.currentTime+t0);o.stop(AC.currentTime+t0+d+.02)}
function noise(t0,d,vol){var n=AC.sampleRate*d,buf=AC.createBuffer(1,n,AC.sampleRate),a=buf.getChannelData(0);for(var i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n);var s=AC.createBufferSource(),g=AC.createGain(),f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=900;s.buffer=buf;g.gain.value=vol||.25;s.connect(f);f.connect(g);g.connect(AC.destination);s.start(AC.currentTime+t0)}
var lastSnd={};
/* 본게임 탭 안: 진동은 본게임 설정(진동 켬/끔)을 그대로 따라 GF_BUZZ 로 */
var HAP={pop:8,coin:10,build:14,done:[20,30,20],lvl:[20,30,20],load:8,go:12};
function snd(k){try{if(HAP[k]&&EMB&&window.parent.GF_BUZZ)window.parent.GF_BUZZ(HAP[k])}catch(e){}if(!SND||!AC)return;var t=performance.now();if(lastSnd[k]&&t-lastSnd[k]<(k==='tap'?60:120))return;lastSnd[k]=t;try{
  if(k==='build'){noise(0,.08,.3);noise(.12,.08,.25);tone(140,0,.12,'square',.08)}
  else if(k==='done'){[523,659,784,1047].forEach(function(f,i){tone(f,i*.07,.22,'triangle',.16)})}
  else if(k==='pop'){tone(600,0,.12,'sine',.2,1200)}
  else if(k==='coin'){tone(988,0,.08,'square',.08);tone(1319,.07,.25,'square',.08)}
  else if(k==='load'){tone(220,0,.1,'triangle',.18,160);noise(0,.05,.15)}
  else if(k==='go'){tone(300,0,.5,'sawtooth',.06,600)}
  else if(k==='lvl'){[392,523,659,784,1047].forEach(function(f,i){tone(f,i*.09,.3,'triangle',.15)})}
  else if(k==='tap'){tone(900,0,.04,'sine',.06)}}catch(e){}}
function sndToggle(){SND=!SND;try{localStorage.setItem('gfcity.snd',SND?'1':'0')}catch(e){}toast(SND?'🔊 소리 켬':'🔇 소리 끔');if(SND)snd('pop')}
