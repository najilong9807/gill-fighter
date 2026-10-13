/* ===== 1.1.12 「내 소품」: 산 수족관 소품을 한눈에(놓은 수 · 보관 수) 보고 하나씩 넣고 빼기 ===== */
abyTr(TRT,{'내 소품':'My decor','놓은 소품 ':'Placed ','보관 ':'Stored ','종류 ':'Kinds ','가지':'','전체':'All','놓은 것':'Placed','보관 중':'Stored','놓음 ':'Placed ','넣기':'Place','빼기':'Store','전부 보관':'Store all','닫기':'Close','아직 산 소품이 없어요':'No decor yet','상점 › 소품에서 사 오면 여기 모여요':'Buy decor in the drawer and it shows up here','전부 보관했어요':'Stored everything','개':''});
abyTr(TRJ,{'내 소품':'マイ小物','놓은 소품 ':'置いた小物 ','보관 ':'保管 ','종류 ':'種類 ','가지':'種','전체':'すべて','놓은 것':'置いたもの','보관 중':'保管中','놓음 ':'置いた ','넣기':'置く','빼기':'しまう','전부 보관':'全部しまう','닫기':'閉じる','아직 산 소품이 없어요':'まだ小物がありません','상점 › 소품에서 사 오면 여기 모여요':'小物を買うとここに集まります','전부 보관했어요':'全部しまいました','개':'個'});
var MYD={f:'all'};
function mydCounts(){var d=DS(),c={};d.placed.forEach(function(q){if(!q||q.pv||!decoById(q.k))return;var o=c[q.k]||(c[q.k]={on:0,inv:0});o.on++});
  Object.keys(d.inv||{}).forEach(function(k){var n=d.inv[k]|0;if(n>0&&decoById(k)){var o=c[k]||(c[k]={on:0,inv:0});o.inv+=n}});return c}
function mydStoreOne(k){var d=DS(),p=d.placed;for(var i=p.length-1;i>=0;i--){var it=p[i];if(it&&!it.pv&&it.k===k){if(it.k==='chest'){try{chestCollect(it)}catch(e){}delete it.t}p.splice(i,1);d.inv[k]=(d.inv[k]||0)+1;if(deco.sel>=p.length||deco.sel===i)deco.sel=-1;else if(deco.sel>i)deco.sel--;return true}}return false}
function mydAfter(){persist();try{renderDrawer();decoTools();refreshTank()}catch(e){}mydRender()}
function mydOpen(){var el=$('myDeco');if(!el){el=document.createElement('div');el.className='overlay';el.id='myDeco';el.hidden=true;el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
    el.innerHTML='<div class="panel myd-panel"><h1 id="mydH"></h1><p class="myd-sum" id="mydSum"></p><div class="myd-tabs" role="group"><button type="button" data-f="all"></button><button type="button" data-f="on"></button><button type="button" data-f="inv"></button></div><div class="myd-grid" id="mydGrid"></div><div class="myd-btns"><button type="button" class="btn ghost" id="mydAll"></button><button type="button" class="btn" id="mydX"></button></div></div>';
    document.body.appendChild(el);
    el.querySelectorAll('.myd-tabs button').forEach(function(b){b.addEventListener('click',function(){MYD.f=b.dataset.f;mydRender()})});
    $('mydX').addEventListener('click',function(){el.hidden=true});el.addEventListener('click',function(e){if(e.target===el)el.hidden=true});
    $('mydAll').addEventListener('click',function(){var d=DS(),n=0;for(var i=d.placed.length-1;i>=0;i--){var it=d.placed[i];if(it&&!it.pv&&decoById(it.k)){if(mydStoreOne(it.k))n++}}if(n){mydAfter();banner(T('전부 보관했어요'),T('보관 ')+n+T('개'))}})}
  try{decoCancelPv(true)}catch(e){}mydRender();el.hidden=false;crumb('myDeco')}
function mydRender(){var el=$('myDeco');if(!el)return;var d=DS(),c=mydCounts(),ks=Object.keys(c),on=0,inv=0;ks.forEach(function(k){on+=c[k].on;inv+=c[k].inv});
  $('mydH').textContent='🪸 '+T('내 소품');$('mydSum').textContent=T('놓은 소품 ')+on+' / '+DECO_MAX+'  ·  '+T('보관 ')+inv+T('개')+'  ·  '+T('종류 ')+ks.length+T('가지');
  var lb={all:T('전체'),on:T('놓은 것'),inv:T('보관 중')};el.querySelectorAll('.myd-tabs button').forEach(function(b){b.textContent=lb[b.dataset.f];b.setAttribute('aria-pressed',MYD.f===b.dataset.f?'true':'false')});
  var g=$('mydGrid');g.textContent='';var list=DECOR.filter(function(D){var o=c[D.id];if(!o)return false;return MYD.f==='all'||(MYD.f==='on'?o.on>0:o.inv>0)});
  list.sort(function(a,b){return (c[b.id].on+c[b.id].inv)-(c[a.id].on+c[a.id].inv)});
  if(!list.length){var e=document.createElement('div');e.className='myd-none';var b1=document.createElement('b');b1.textContent=T('아직 산 소품이 없어요');var s1=document.createElement('small');s1.textContent=T('상점 › 소품에서 사 오면 여기 모여요');e.appendChild(b1);e.appendChild(s1);g.appendChild(e)}
  var full=on>=DECO_MAX;
  list.forEach(function(D){var o=c[D.id],card=document.createElement('div');card.className='myd-c';var th=document.createElement('span');th.className='myd-th';try{th.appendChild(decoThumb(D))}catch(e){}card.appendChild(th);
    var nm=document.createElement('b');nm.textContent=D.name;card.appendChild(nm);
    var ct=document.createElement('small');ct.innerHTML='<em class="on"></em><em class="iv"></em>';ct.firstChild.textContent=T('놓음 ')+o.on;ct.lastChild.textContent=T('보관 ')+o.inv;card.appendChild(ct);
    var row=document.createElement('div');row.className='myd-row';
    var bo=document.createElement('button');bo.type='button';bo.className='myd-b out';bo.textContent='− '+T('빼기');bo.disabled=o.on<1;bo.addEventListener('click',function(){if(mydStoreOne(D.id)){buzz(8);mydAfter()}});
    var bi=document.createElement('button');bi.type='button';bi.className='myd-b in';bi.textContent='+ '+T('넣기');bi.disabled=o.inv<1||full;bi.addEventListener('click',function(){var n0=DS().placed.length;decoPlace(D);if(DS().placed.length>n0)mydAfter()});
    row.appendChild(bo);row.appendChild(bi);card.appendChild(row);g.appendChild(card)});
  $('mydAll').textContent=T('전부 보관');$('mydAll').disabled=on<1;$('mydX').textContent=T('닫기')}
(function(){var st=document.createElement('style');st.textContent=
 '#myDeco{z-index:60}.myd-panel{max-height:calc(100dvh - 60px - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px));overflow-y:auto;gap:10px;background:linear-gradient(180deg,#F2FBFF,#DDF1FB)!important}'+
 '.myd-panel h1{font-family:var(--disp);font-weight:400;margin:0;color:#0B2C4A}.myd-sum{margin:0;text-align:center;font-weight:700;color:#2A5A7A;font-size:13.5px}'+
 '.myd-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;border-radius:14px;background:#0B2C4A;padding:4px}.myd-tabs button{border:0;border-radius:10px;padding:7px 4px 8px;font:inherit;font-family:var(--disp);font-size:14.5px;background:transparent;color:#BFE3F7;cursor:pointer}.myd-tabs button[aria-pressed=true]{background:linear-gradient(180deg,#FFE27A,#FFC62E);color:#0B2C4A}'+
 '.myd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:8px}.myd-c{display:flex;flex-direction:column;align-items:center;gap:3px;border-radius:16px;background:#fff;box-shadow:0 0 0 2.5px #0B2C4A,0 3px 0 2.5px #0B2C4A;padding:8px 7px 9px;min-width:0}'+
 '.myd-th{width:66px;height:52px;display:grid;place-items:center;overflow:hidden}.myd-th>*{max-width:66px;max-height:52px}.myd-c b{font-family:var(--disp);font-weight:400;font-size:13.5px;color:#0B2C4A;text-align:center;line-height:1.15;max-width:100%;overflow-wrap:anywhere}'+
 '.myd-c small{display:flex;gap:6px;font-size:12px;font-weight:700}.myd-c small em{font-style:normal;border-radius:8px;padding:1px 6px}.myd-c small .on{background:#DFF6E6;color:#1E7A3E}.myd-c small .iv{background:#EAF0F6;color:#4A6378}'+
 '.myd-row{display:grid;grid-template-columns:1fr 1fr;gap:5px;width:100%;margin-top:3px}.myd-b{border:0;border-radius:11px;padding:7px 2px 8px;font:inherit;font-family:var(--disp);font-size:13.5px;color:#fff;cursor:pointer;box-shadow:0 0 0 2px #0B2C4A,0 3px 0 2px #0B2C4A;white-space:nowrap}'+
 '.myd-b.out{background:linear-gradient(180deg,#8FB3CC,#5F87A6)}.myd-b.in{background:linear-gradient(180deg,#7FE3A0,#2FB35E)}.myd-b:disabled{filter:grayscale(1);opacity:.45;cursor:default}.myd-b:not(:disabled):active{transform:translateY(2px);box-shadow:0 0 0 2px #0B2C4A,0 1px 0 2px #0B2C4A}'+
 '.myd-none{grid-column:1/-1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:18px 8px;color:#4A6378}.myd-none b{font-family:var(--disp);font-weight:400;font-size:16px;color:#0B2C4A}'+
 '.myd-btns{display:grid;grid-template-columns:1fr 1fr;gap:8px}.myd-panel .btn{min-height:0!important;height:auto!important;flex:none!important;padding:11px 12px 13px!important;font-size:16px!important}';
 document.head.appendChild(st)})();
/* 서랍(소품 칸)에 「내 소품」 버튼 */
(function(){var acts=document.querySelector('#decoDrawer .dd-acts')||($('ddFold')&&$('ddFold').parentNode);if(!acts||$('ddMine'))return;var b=document.createElement('button');b.type='button';b.className='dd-fold';b.id='ddMine';b.textContent=T('내 소품');acts.insertBefore(b,acts.firstChild);b.addEventListener('click',mydOpen)})();
var renderDrawerMY=renderDrawer;renderDrawer=function(){var r=renderDrawerMY.apply(this,arguments);try{var b=$('ddMine');if(b)b.hidden=deco.seg!=='decor'}catch(e){}return r};
