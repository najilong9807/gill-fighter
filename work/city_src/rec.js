/* ===== 🏆 마을 기록(도장) + 마을 이름 짓기 (38차) =====
   - 오래 하는 목표: 산호궁 · 주민 · 배달 · 말풍선 · 구역 · 장식 · 열차/고래 배 · 주간 의뢰 · 쓰다듬기 · 명성
   - 줄마다 단계(도장)가 있고, 단계를 넘으면 받기 → 💎 1·2·3·5·8·10 + ⭐ 명성. 다 모으면 💎 약 150(몇 달에 걸쳐)
   - ☰ 메뉴 → 🏆 마을 기록. 받을 게 있으면 ☰ 메뉴 버튼에 빨간 점
   - 마을 이름: 기록 창 맨 위 ✏ → 입구 간판 · 기록 창 제목에 나옴(최대 10글자). 저장 G.name
   - 세는 값: G.rc {col 말풍선, trip 열차 · 고래 배 받기, wq 주간 의뢰 다 끝낸 주, pet 쓰다듬기}, G.rcg {줄: 받은 단계 수} */
var RC_GEM=[1,2,3,5,8,10];
function decoN(){var n=0;G.b.forEach(function(b){if(isD(b.k))n++});return n}
function rcN(k){return (G.rc&&G.rc[k])|0}
var RC=[
 {k:'hall',ic:'🏛',t:function(g){return '산호궁 Lv.'+g+' 만들기'},s:[3,5,10,15,20,25],v:function(){return hallLv()}},
 {k:'pop',ic:'🐟',t:function(g){return '주민 '+g+'마리 모으기'},s:[100,300,700,1500,3000],v:function(){return CS.pop|0}},
 {k:'xl',ic:'⭐',t:function(g){return '명성 Lv.'+g+' 되기'},s:[5,10,20,30,40],v:function(){return G.xl||1}},
 {k:'ord',ic:'🐢',t:function(g){return '주문 '+g+'번 배달하기'},s:[10,50,150,400,1000],v:function(){return G.ordSent|0}},
 {k:'col',ic:'🫧',t:function(g){return '건물 말풍선 '+g+'번 받기'},s:[50,300,1000,3000,8000],v:function(){return rcN('col')}},
 {k:'zone',ic:'🏘',t:function(g){return '구역 건물 단계 합 '+g+' 만들기'},s:[30,100,250,500,1000],v:function(){return zLvSum()}},
 {k:'deco',ic:'🌸',t:function(g){return '장식 '+g+'개 놓기'},s:[3,10,25,50],v:function(){return decoN()}},
 {k:'trip',ic:'🚋',t:function(g){return '열차 · 고래 배 '+g+'번 다녀오기'},s:[3,15,50,150],v:function(){return rcN('trip')}},
 {k:'blk',ic:'🛡',t:function(g){return '마을 사건 '+g+'번 막아 내기'},s:[3,10,30,80],v:function(){return (G.inc&&G.inc.blk)|0}},
 {k:'wq',ic:'📜',t:function(g){return '주간 의뢰 3개를 '+g+'주 다 끝내기'},s:[1,4,12,26],v:function(){return rcN('wq')}},
 {k:'pet',ic:'💗',t:function(g){return '마을에 놀러 온 내 물고기 '+g+'번 쓰다듬기'},s:[5,30,100,300],v:function(){return rcN('pet')},emb:1}];
function rcList(){return RC.filter(function(r){return !r.emb||EMB})}
function rcAdd(k,n){G.rc=G.rc||{};G.rc[k]=(G.rc[k]|0)+(n||1)}
function rcGot(r){return (G.rcg&&G.rcg[r.k])|0}
function rcVal(r){try{return r.v()|0}catch(e){return 0}}
function rcReady(){var n=0;rcList().forEach(function(r){var i=rcGot(r);if(i<r.s.length&&rcVal(r)>=r.s[i])n++});return n}
function rcStamps(){var a=0,b=0;rcList().forEach(function(r){a+=Math.min(rcGot(r),r.s.length);b+=r.s.length});return [a,b]}
function cityName(){return (G.name&&String(G.name).trim())||'아가미시티'}
function rcDot(){var b=$('bMenu');if(!b)return;var e=b.querySelector('.rcd');if(!e){e=document.createElement('em');e.className='rcd';e.hidden=true;b.appendChild(e)}e.hidden=!rcReady()}
function rcTake(r){var i=rcGot(r);if(i>=r.s.length||rcVal(r)<r.s[i])return;G.rcg=G.rcg||{};G.rcg[r.k]=i+1;var gem=RC_GEM[Math.min(i,RC_GEM.length-1)];WAL.add('gem',gem);addXP(10*(i+1));
  snd(i+1>=r.s.length?'lvl':'coin');sparkle(VW/2,VH*.38,18+i*4);toast('🏆 도장 받기! '+r.t(r.s[i])+' · 💎'+gem);save();gfEv('rec');hud();rcDot()}
function rcPanel(){var el=$('panel'),st=rcStamps(),h='<button class="x" id="pX">✕</button><h2>🏆 마을 기록</h2>'+
  '<div class="rcn"><span class="nm">'+esc(cityName())+'</span><button id="rcEd" aria-label="마을 이름 바꾸기">✏</button></div>'+
  '<p class="role">도장 <b>'+st[0]+' / '+st[1]+'</b> · 단계를 넘으면 💎 · ⭐ 명성을 받아요</p><div class="wq">';
  rcList().map(function(r,n){var i=rcGot(r),d=i>=r.s.length;return {r:r,o:d?2:rcVal(r)>=r.s[i]?0:1,n:n}}).sort(function(a,b){return a.o-b.o||a.n-b.n}).forEach(function(x){var r=x.r,i=rcGot(r),done=i>=r.s.length,g=done?r.s[r.s.length-1]:r.s[i],v=rcVal(r),ok=!done&&v>=g,lo=i>0?r.s[i-1]:0,pc=done?100:Math.max(0,Math.min(100,Math.round((v-lo)/Math.max(1,g-lo)*100)));
    var dots='';for(var j=0;j<r.s.length;j++)dots+='<i class="'+(j<i?'on':'')+'"></i>';
    h+='<div class="wqr'+(done?' got':ok?' can':'')+'"><span class="ic">'+r.ic+'</span><div class="tx"><b>'+r.t(g)+'</b><span class="rcs">'+dots+'</span><i class="bar"><u style="width:'+pc+'%"></u></i><small>'+fmt(Math.min(v,g))+' / '+fmt(g)+'</small></div>'+
     (done?'<em>✓ 다 모음</em>':'<button data-r="'+r.k+'"'+(ok?'':' disabled')+'>💎'+RC_GEM[Math.min(i,RC_GEM.length-1)]+'</button>')+'</div>'});
  h+='</div>';el.innerHTML=h;el.hidden=false;panelFor=null;$('pX').onclick=closePanel;
  $('rcEd').onclick=function(){var cur=G.name||'',n=null;try{n=prompt((window.CITY_TR||String)('마을 이름 (10글자까지)'),cur||cityName())}catch(e){}if(n==null)return;n=String(n).replace(/[<>&"'`\\]/g,'').replace(/\s+/g,' ').trim();
    if(Array.from(n).length>10)n=Array.from(n).slice(0,10).join('');G.name=n||'';if(!n)delete G.name;save();gfEv('name');toast('🏷 '+cityName());rcPanel()};
  el.querySelectorAll('[data-r]').forEach(function(b){b.onclick=function(){var k=b.dataset.r;rcList().forEach(function(r){if(r.k===k)rcTake(r)});rcPanel()}})}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
/* ☰ 메뉴에 🏆 칸 더하기 */
var _menuRc=menuPanel;menuPanel=function(){var r=_menuRc.apply(this,arguments);try{var g=$('panel').querySelector('.mgrid');if(g&&!g.querySelector('[data-m="rec"]')){var b=document.createElement('button');b.dataset.m='rec';var n=rcReady();
  b.innerHTML='🏆<b>마을 기록</b><small>'+(n?'받을 도장 '+n+'개':'도장 모으기')+'</small>'+(n?'<em class="rcd"></em>':'');b.style.position='relative';b.onclick=function(){rcPanel()};g.insertBefore(b,g.children[2]||null)}}catch(e){}return r};
/* 세기 */
var _collectRc=collect;collect=function(b){var before=JSON.stringify(b.buf);var r=_collectRc.apply(this,arguments);try{if(JSON.stringify(b.buf)!==before)rcAdd('col',1)}catch(e){}return r};
var _trainNewRc=trainNew;trainNew=function(){try{if(G.tr&&G.tr.st==='back')rcAdd('trip',1)}catch(e){}return _trainNewRc.apply(this,arguments)};
var _portNewRc=portNew;portNew=function(){try{if(G.pt&&G.pt.st==='back')rcAdd('trip',1)}catch(e){}return _portNewRc.apply(this,arguments)};
var _visPetRc=visPet;visPet=function(){var t0=G.xp,l0=G.xl;var r=_visPetRc.apply(this,arguments);try{if(G.xp!==t0||G.xl!==l0)rcAdd('pet',1)}catch(e){}return r};
function rcWq(){var S=G.wq;if(S&&S.all&&G.rcwq!==S.wk){G.rcwq=S.wk;rcAdd('wq',1);save()}}
(function(){var st=document.createElement('style');st.textContent='.rcd{position:absolute;right:-3px;top:-3px;width:14px;height:14px;border-radius:7px;background:#ff5d5d;border:2px solid var(--ink)}'+
  '.rcn{display:flex;align-items:center;justify-content:center;gap:8px;margin:-2px 0 6px}.rcn .nm{font-family:var(--disp);font-size:20px;padding:4px 14px;border:2.5px solid var(--ink);border-radius:12px;background:#fffdf7;max-width:70%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
  '.rcn button{width:36px;height:36px;border:2px solid var(--ink);border-radius:10px;background:#e8f1ff;font-size:16px}'+
  '.rcs{display:flex;gap:3px}.rcs i{width:11px;height:11px;border-radius:6px;border:1.5px solid var(--ink);background:#fff}.rcs i.on{background:#ffcf3a}';document.head.appendChild(st);
  setTimeout(rcDot,600);setInterval(function(){try{rcWq();rcDot()}catch(e){}},3000)})();
window.__rc=function(){return rcList().map(function(r){return r.k+':'+rcVal(r)+'/'+rcGot(r)}).join(' ')};
window.__rcGate=function(){closePanel();cam.x=(G.gate.x-G.gate.y)*TW/2+60;cam.y=(G.gate.x+G.gate.y)*TH/2-60;cam.z=1.6;return G.name||''};
