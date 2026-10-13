/* ===== 1.1.12 물고기 고르기 개선: 즐겨찾기(★) · 최근 고른 순 · 전체 보기(검색 · 필터 · 정렬) ===== */
function fpL3(k,e,j){return LANG==='en'?e:LANG==='ja'?j:k}
function favs(){if(!Array.isArray(save.fav))save.fav=[];return save.fav}
function isFav(id){return favs().indexOf(id)>=0}
function favToggle(id){var f=favs(),i=f.indexOf(id);if(i>=0)f.splice(i,1);else f.unshift(id);persist();buzz(10);try{favCardStar();renderPickbar()}catch(e){}if(!$('fpk').hidden)fpRender();banner(i>=0?fpL3('즐겨찾기에서 뺐어요','Removed from favorites','お気に入りから外しました'):fpL3('즐겨찾기에 넣었어요 ★','Added to favorites ★','お気に入りに追加 ★'),byId(id).name)}
function recents(){if(!Array.isArray(save.recent))save.recent=[];return save.recent}
function recentPush(id){var r=recents(),i=r.indexOf(id);if(i>=0)r.splice(i,1);r.unshift(id);if(r.length>8)r.length=8}
/* 홈 줄 순서: 즐겨찾기 → 최근 → 나머지(비싼 순) */
function fpOrder(list){var f=favs(),r=recents();return list.slice().sort(function(a,b){var fa=f.indexOf(a.id),fb=f.indexOf(b.id);if((fa>=0)!==(fb>=0))return fa>=0?-1:1;if(fa>=0)return fa-fb;var ra=r.indexOf(a.id),rb=r.indexOf(b.id);if((ra>=0)!==(rb>=0))return ra>=0?-1:1;if(ra>=0)return ra-rb;return (b.price||0)-(a.price||0)})}
var renderPickbarFP=renderPickbar;renderPickbar=function(){var r=renderPickbarFP.apply(this,arguments);try{var box=$('pickbar'),ids=SPECIES.filter(function(L){return owns(L.id)}),ord=fpOrder(ids),cur=null;
  ord.forEach(function(L){var b=$('pb-'+L.id);if(!b)return;box.appendChild(b);b.classList.toggle('fav',isFav(L.id));if(L.id===sel)cur=b});
  if(ids.length>=6){var all=document.createElement('button');all.type='button';all.id='pbAll';all.className='pball';all.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7.5" height="7.5" rx="2" fill="#fff" stroke="#0B2C4A" stroke-width="1.8"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2" fill="#fff" stroke="#0B2C4A" stroke-width="1.8"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2" fill="#fff" stroke="#0B2C4A" stroke-width="1.8"/><circle cx="17.2" cy="17.2" r="3.4" fill="none" stroke="#0B2C4A" stroke-width="2"/><path d="M19.6 19.6l2 2" stroke="#0B2C4A" stroke-width="2.2" stroke-linecap="round"/></svg><span></span>';
    all.querySelector('span').textContent=fpL3('전체 ','All ','すべて ')+ids.length;all.addEventListener('click',fpOpen);box.insertBefore(all,box.firstChild)}
  if(cur)setTimeout(function(){try{box.scrollLeft=cur.offsetLeft-box.clientWidth/2+cur.offsetWidth/2}catch(e){}},0)}catch(e){}return r};
/* 홈 카드 이름 옆 ☆ */
function favCardStar(){var nm=$('hmName');if(!nm)return;var s=$('hmFav');if(!s){s=document.createElement('button');s.type='button';s.id='hmFav';s.className='hmfav';s.addEventListener('click',function(e){e.stopPropagation();favToggle(sel)});var b=nm.parentNode;b.insertBefore(s,nm)}
  var on=isFav(sel);s.textContent=on?'★':'☆';s.classList.toggle('on',on);s.setAttribute('aria-label',on?fpL3('즐겨찾기 빼기','Unfavorite','お気に入り解除'):fpL3('즐겨찾기','Favorite','お気に入り'));s.setAttribute('aria-pressed',on?'true':'false')}
var refreshHomeFP=refreshHome;refreshHome=function(keep){var r=refreshHomeFP.apply(this,arguments);try{favCardStar()}catch(e){}return r};
var startRunFP=startRun;startRun=function(){try{if(sel){recentPush(sel);persist()}}catch(e){}return startRunFP.apply(this,arguments)};
/* 전체 보기 창 */
var FPK={q:'',f:'all',s:'rec'};
function fpOpen(){var el=$('fpk');if(!el){el=document.createElement('div');el.className='overlay';el.id='fpk';el.hidden=true;el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
    el.innerHTML='<div class="panel fpk-panel"><h1 id="fpkH"></h1><div class="fpk-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="#5B7A92" stroke-width="2.4"/><path d="M15.5 15.5l5 5" stroke="#5B7A92" stroke-width="2.6" stroke-linecap="round"/></svg><input id="fpkQ" type="search" autocomplete="off" enterkeyhint="search"><button type="button" id="fpkClr" aria-label="x">✕</button></div>'+
      '<div class="fpk-chips" id="fpkF"></div><div class="fpk-sort" id="fpkS"></div><div class="fpk-grid" id="fpkG"></div><button type="button" class="btn ghost" id="fpkX"></button></div>';
    document.body.appendChild(el);
    $('fpkQ').addEventListener('input',function(){FPK.q=this.value;fpRender()});$('fpkClr').addEventListener('click',function(){FPK.q='';$('fpkQ').value='';fpRender()});
    $('fpkX').addEventListener('click',function(){el.hidden=true});el.addEventListener('click',function(e){if(e.target===el)el.hidden=true})}
  FPK.q='';$('fpkQ').value='';fpRender();el.hidden=false;crumb('fpk')}
function fpRender(){var el=$('fpk');if(!el)return;var own=SPECIES.filter(function(L){return owns(L.id)});
  $('fpkH').textContent='🐟 '+fpL3('물고기 고르기','Choose a fish','魚をえらぶ');$('fpkQ').placeholder=fpL3('이름으로 찾기','Search by name','名前でさがす');$('fpkClr').hidden=!FPK.q;$('fpkX').textContent=fpL3('닫기','Close','閉じる');
  var F=[['all',fpL3('전체','All','すべて')+' '+own.length],['fav','★ '+fpL3('즐겨찾기','Favorites','お気に入り')+' '+own.filter(function(L){return isFav(L.id)}).length],['rec',fpL3('최근','Recent','最近')]];
  GRADES.forEach(function(G,gi){var n=own.filter(function(L){return gradeOf(L)===G}).length;if(n)F.push(['g'+gi,G.name+' '+n])});
  var fb=$('fpkF');fb.textContent='';F.forEach(function(x){var b=document.createElement('button');b.type='button';b.textContent=x[1];b.setAttribute('aria-pressed',FPK.f===x[0]?'true':'false');if(x[0][0]==='g'){var G=GRADES[+x[0].slice(1)];b.style.setProperty('--gc',G.col);b.classList.add('gr')}b.addEventListener('click',function(){FPK.f=x[0];fpRender()});fb.appendChild(b)});
  var S=[['rec',fpL3('추천 순','Suggested','おすすめ順')],['grade',fpL3('등급 높은 순','Best grade','グレード順')],['size',fpL3('큰 순','Biggest','大きい順')],['name',fpL3('이름 순','Name','名前順')]];
  var sb=$('fpkS');sb.textContent='';S.forEach(function(x){var b=document.createElement('button');b.type='button';b.textContent=x[1];b.setAttribute('aria-pressed',FPK.s===x[0]?'true':'false');b.addEventListener('click',function(){FPK.s=x[0];fpRender()});sb.appendChild(b)});
  var q=(FPK.q||'').trim().toLowerCase(),r=recents(),list=own.filter(function(L){if(q&&String(L.name).toLowerCase().indexOf(q)<0&&L.id.indexOf(q)<0)return false;if(FPK.f==='fav')return isFav(L.id);if(FPK.f==='rec')return r.indexOf(L.id)>=0;if(FPK.f[0]==='g')return gradeOf(L)===GRADES[+FPK.f.slice(1)];return true});
  if(FPK.s==='rec')list=fpOrder(list);else if(FPK.s==='grade')list.sort(function(a,b){return (b.price||0)-(a.price||0)});else if(FPK.s==='size')list.sort(function(a,b){return (b.cap||0)-(a.cap||0)});else list.sort(function(a,b){return String(a.name).localeCompare(String(b.name),LANG)});
  if(FPK.f==='rec'&&FPK.s==='rec')list.sort(function(a,b){return r.indexOf(a.id)-r.indexOf(b.id)});
  var g=$('fpkG');g.textContent='';
  if(!list.length){var e=document.createElement('p');e.className='fpk-none';e.textContent=FPK.f==='fav'&&!q?fpL3('☆을 눌러 자주 쓰는 물고기를 모아 두세요','Tap ☆ to keep your go-to fish here','☆を押してよく使う魚を集めよう'):fpL3('찾는 물고기가 없어요','No fish found','見つかりません');g.appendChild(e)}
  list.forEach(function(L){var c=document.createElement('div');c.className='fpk-c'+(L.id===sel?' on':'');var G=gradeOf(L);c.style.setProperty('--gc',G.col);
    var st=document.createElement('button');st.type='button';st.className='fpk-st'+(isFav(L.id)?' on':'');st.textContent=isFav(L.id)?'★':'☆';st.setAttribute('aria-label',fpL3('즐겨찾기','Favorite','お気に入り'));st.addEventListener('click',function(ev){ev.stopPropagation();favToggle(L.id)});c.appendChild(st);
    var th=document.createElement('span');th.className='fpk-th';if(SPRITE_SRC[L.id]){var im=document.createElement('img');im.alt='';im.loading='lazy';im.src=SPRITE_SRC[L.id];th.appendChild(im)}c.appendChild(th);
    var nm=document.createElement('b');nm.textContent=L.name;c.appendChild(nm);
    var sm=document.createElement('small');sm.textContent=G.name+' · Lv.'+lvOf(L.id);c.appendChild(sm);
    c.addEventListener('click',function(){sel=L.id;save.pick=sel;persist();el.hidden=true;try{refreshHome(false)}catch(e){}buzz(8)});g.appendChild(c)})}
(function(){var st=document.createElement('style');st.textContent=
 '.pickbar button.fav::after{content:"★";position:absolute;top:1px;right:4px;font-size:11px;color:#FFC62E;-webkit-text-stroke:.6px #5A3300}.pickbar button{position:relative}'+
 '.pickbar button.pball{background:linear-gradient(180deg,#E6F4FC,#BFDDF1);color:#0B2C4A;box-shadow:0 0 0 2.5px #0B2C4A,0 3px 0 2.5px #0B2C4A;justify-content:center}.pickbar button.pball svg{width:30px;height:30px;display:block}.pickbar button.pball span{font-weight:700}'+
 '.hmfav{border:0;background:none;cursor:pointer;font-size:21px;line-height:1;padding:0 5px 0 0;color:#DDEBF5;-webkit-text-stroke:1.2px #0B2C4A;vertical-align:-2px}.hmfav.on{color:#FFC62E}.hmfav:active{transform:scale(.88)}'+
 '#fpk{z-index:60}.fpk-panel{max-height:calc(100dvh - 60px - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px));overflow:hidden;display:flex;flex-direction:column;gap:8px;background:linear-gradient(180deg,#F2FBFF,#DDF1FB)!important}'+
 '.fpk-panel h1{margin:0;font-family:var(--disp);font-weight:400;color:#0B2C4A}.fpk-search{display:flex;align-items:center;gap:6px;background:#fff;border-radius:14px;padding:6px 10px;box-shadow:0 0 0 2.5px #0B2C4A}.fpk-search svg{width:20px;height:20px;flex:none}'+
 '.fpk-search input{flex:1;min-width:0;border:0;outline:0;font:inherit;font-size:16px;background:transparent;color:#0B2C4A}.fpk-search button{border:0;background:#DCE6EE;border-radius:50%;width:24px;height:24px;font-size:12px;color:#4A6378;cursor:pointer}'+
 '.fpk-chips,.fpk-sort{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;flex:none;padding:2px 2px 4px}.fpk-chips::-webkit-scrollbar,.fpk-sort::-webkit-scrollbar{display:none}'+
 '.fpk-chips button{flex:none;border:0;border-radius:12px;padding:6px 11px 7px;font:inherit;font-family:var(--disp);font-size:14px;background:#fff;color:#0B2C4A;box-shadow:0 0 0 2px #0B2C4A;cursor:pointer;white-space:nowrap}.fpk-chips button.gr{box-shadow:0 0 0 2px var(--gc);color:var(--gc)}'+
 '.fpk-chips button[aria-pressed=true]{background:linear-gradient(180deg,#FFE27A,#FFC62E);color:#0B2C4A;box-shadow:0 0 0 2px #0B2C4A,0 3px 0 2px #0B2C4A}'+
 '.fpk-sort button{flex:none;border:0;background:none;font:inherit;font-size:13px;font-weight:700;color:#5B7A92;padding:3px 6px;cursor:pointer;white-space:nowrap;border-radius:8px}.fpk-sort button[aria-pressed=true]{color:#0B2C4A;background:rgba(11,44,74,.1)}'+
 '.fpk-grid{flex:1;min-height:0;overflow-y:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:8px;padding:4px 3px 8px;align-content:start}'+
 '.fpk-c{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;border-radius:14px;background:#fff;padding:8px 4px 7px;box-shadow:0 0 0 2px #0B2C4A,0 3px 0 2px #0B2C4A,inset 0 -4px 0 var(--gc);cursor:pointer;min-width:0}'+
 '.fpk-c.on{background:linear-gradient(180deg,#FFF6C8,#FFE27A)}.fpk-c:active{transform:translateY(2px)}.fpk-th{width:74px;height:40px;display:grid;place-items:center}.fpk-th img{max-width:74px;max-height:40px;object-fit:contain}'+
 '.fpk-c b{font-family:var(--disp);font-weight:400;font-size:13px;color:#0B2C4A;text-align:center;line-height:1.1;max-width:100%;overflow-wrap:anywhere}.fpk-c small{font-size:10.5px;font-weight:700;color:var(--gc)}'+
 '.fpk-st{position:absolute;top:2px;right:3px;border:0;background:none;font-size:18px;line-height:1;color:#C9D6DF;-webkit-text-stroke:.8px #5B7A92;cursor:pointer;padding:2px}.fpk-st.on{color:#FFC62E;-webkit-text-stroke:.8px #5A3300}'+
 '.fpk-none{grid-column:1/-1;text-align:center;color:#5B7A92;padding:18px 6px}.fpk-panel>.btn{flex:none;min-height:0!important;height:auto!important;padding:10px 12px 12px!important;font-size:16px!important}';
 document.head.appendChild(st)})();
