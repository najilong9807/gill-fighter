/* ===== 1.1.28 늑구 '친구에게 진주나 보석 선물하기' → 결정: 진주만 · 자유 금액(보내는 쪽 하루 1,000까지) · 닉네임으로 찾거나 친구 기능
   ① 내 친구: 친구 수족관 창에 「내 친구」 목록(최대 30명, 이 폰에 저장). 친구 추가 = 구경 중 「친구 추가」 · 닉네임 찾기 결과 · 코드
   ② 닉네임으로 찾기: 공개 수족관 중 이름이 같은(앞부분이 같은) 사람 최대 10명 → 놀러 가기 · 친구 추가 · 선물
   ③ 진주 선물: 금액 1~1,000(100 · 300 · 500 · 1,000 빠른 버튼), 오늘 남은 한도 표시, 서버가 받아 주면 내 진주에서 빠짐.
      받는 사람(수족관 코드가 있는 사람)은 앱을 켤 때 · 친구 창을 열 때 받음 → 「OO님이 진주 300을 보냈어요」
   서버: sql/gf_gift.sql (gf_gift_send · gf_gift_claim · gf_gift_left · gf_tank_find). 서버에 함수가 없으면 버튼을 눌러도 「준비 중」 안내만 ===== */
abyTr(TRT,{'내 친구':'My friends','친구 추가':'Add friend','친구를 추가했어요':'Friend added','이미 친구예요':'Already a friend','친구는 30명까지예요':'Up to 30 friends','친구에서 뺐어요':'Removed from friends',
 '닉네임으로 찾기':'Find by nickname','찾기':'Search','찾는 사람이 없어요':'No one found','공개한 수족관만 찾을 수 있어요':'Only public aquariums can be found','아직 친구가 없어요 · 친구 수족관에 놀러 가서 「친구 추가」를 눌러요':'No friends yet · visit an aquarium and tap “Add friend”',
 '진주 선물':'Gift pearls','님에게 진주 보내기':': send pearls','보낼 진주':'Pearls to send','오늘 더 보낼 수 있어요: ':'You can still send today: ','보내기':'Send','선물을 보냈어요!':'Gift sent!','진주가 모자라요':'Not enough pearls',
 '오늘은 더 보낼 수 없어요 (하루 1,000)':'Daily limit reached (1,000 a day)','친구가 오늘 받을 수 있는 양을 넘었어요':'Your friend can’t receive more today','그 코드의 수족관이 없어요':'No aquarium with that code','내 수족관이에요':'That’s your aquarium',
 '선물 기능은 곧 열려요':'Gifts are coming soon','님이 진주 ':' sent you ','개를 보냈어요 🎁':' pearls 🎁','친구에게서 진주 선물이 왔어요 🎁':'Pearl gifts from friends 🎁','1 ~ 1,000':'1 – 1,000','친구':'Friend','놀러 가기':'Visit','빼기':'Remove','진주 ':'Pearls '});
abyTr(TRJ,{'내 친구':'ともだち','친구 추가':'ともだちに追加','친구를 추가했어요':'ともだちに追加しました','이미 친구예요':'もうともだちです','친구는 30명까지예요':'ともだちは30人まで','친구에서 뺐어요':'ともだちから外しました',
 '닉네임으로 찾기':'ニックネームでさがす','찾기':'さがす','찾는 사람이 없어요':'見つかりません','공개한 수족관만 찾을 수 있어요':'公開した水族館だけさがせます','아직 친구가 없어요 · 친구 수족관에 놀러 가서 「친구 추가」를 눌러요':'まだともだちがいません · 水族館に遊びに行って「ともだちに追加」を押してね',
 '진주 선물':'真珠をおくる','님에게 진주 보내기':'さんに真珠をおくる','보낼 진주':'おくる真珠','오늘 더 보낼 수 있어요: ':'今日おくれる残り: ','보내기':'おくる','선물을 보냈어요!':'プレゼントをおくりました！','진주가 모자라요':'真珠が足りません',
 '오늘은 더 보낼 수 없어요 (하루 1,000)':'今日はもうおくれません（1日1,000まで）','친구가 오늘 받을 수 있는 양을 넘었어요':'相手が今日受け取れる量をこえました','그 코드의 수족관이 없어요':'そのコードの水族館はありません','내 수족관이에요':'自分の水族館です',
 '선물 기능은 곧 열려요':'プレゼント機能はもうすぐ','님이 진주 ':'さんから真珠 ','개를 보냈어요 🎁':'個が届きました 🎁','친구에게서 진주 선물이 왔어요 🎁':'ともだちから真珠のプレゼント 🎁','1 ~ 1,000':'1〜1,000','친구':'ともだち','놀러 가기':'遊びに行く','빼기':'外す','진주 ':'真珠 '});
var FG_MAX=1000;
function FRL(){if(!Array.isArray(save.frL))save.frL=[];return save.frL}
function frHas(c){return FRL().some(function(f){return f.c===c})}
function frAdd(c,n){c=String(c||'').toUpperCase().slice(0,6);if(!/^[A-Z0-9]{6}$/.test(c))return;if(c===TKS().code){banner(T('내 수족관이에요'),'');return}if(frHas(c)){banner(T('이미 친구예요'),'');return}
  if(FRL().length>=30){banner(T('친구는 30명까지예요'),'');return}FRL().unshift({c:c,n:visNick(n||'')});persist();crumb('frAdd');try{svSnd('gem');buzz(15)}catch(e){}banner(T('친구를 추가했어요'),visNick(n||'')+' · '+c);frRender();try{visBar()}catch(e){}}
function frDel(c){save.frL=FRL().filter(function(f){return f.c!==c});persist();banner(T('친구에서 뺐어요'),'');frRender();try{visBar()}catch(e){}}
function fgErr(e){var m=String(e&&e.message||e);if(/404|PGRST202|Could not find/.test(m))banner(T('선물 기능은 곧 열려요'),'');else banner(T('인터넷 연결을 확인해 주세요'),'')}
/* 친구 창: 내 친구 + 닉네임 찾기 */
function frRender(){var el=$('tkFr');if(!el)return;var box=el.querySelector('.fr-mine');if(!box){box=document.createElement('div');box.className='fr-box fr-mine';box.innerHTML='<b class="fr-h"></b><ul class="fr-ml"></ul><b class="fr-h fr-h2"></b><div class="fr-row"><input type="text" id="frNick" maxlength="12" autocomplete="off" spellcheck="false"><button type="button" class="btn" id="frFind"></button></div><ul class="fr-fl"></ul>';
    var go=el.querySelector('.fr-go');go.parentNode.insertBefore(box,go.nextSibling);$('frFind').addEventListener('click',frFind);$('frNick').addEventListener('keydown',function(e){if(e.key==='Enter')frFind()})}
  box.querySelector('.fr-h').textContent='💛 '+T('내 친구')+' '+FRL().length;box.querySelector('.fr-h2').textContent='🔎 '+T('닉네임으로 찾기');$('frFind').textContent=T('찾기');$('frNick').placeholder=T('공개한 수족관만 찾을 수 있어요');
  var ul=box.querySelector('.fr-ml');ul.textContent='';if(!FRL().length){var e=document.createElement('li');e.className='fr-empty';e.textContent=T('아직 친구가 없어요 · 친구 수족관에 놀러 가서 「친구 추가」를 눌러요');ul.appendChild(e)}
  FRL().forEach(function(f){ul.appendChild(frRow(f.c,f.n,true))})}
function frRow(c,n,mine,sub){var li=document.createElement('li');li.className='fr-m';var t=document.createElement('span');t.className='fr-mt';var b=document.createElement('b');b.textContent=visNick(n);var s=document.createElement('small');s.textContent=sub||c;t.appendChild(b);t.appendChild(s);li.appendChild(t);
  function bt(txt,cls,fn){var x=document.createElement('button');x.type='button';x.className='fr-mb '+cls;x.textContent=txt;x.addEventListener('click',fn);li.appendChild(x)}
  bt('🏠','go',function(){tkVisit(c)});bt('🎁','gift',function(){fgOpen(c,n)});if(mine)bt('✕','del',function(){frDel(c)});else if(!frHas(c)&&c!==TKS().code)bt('＋','add',function(){frAdd(c,n)});return li}
function frFind(){var q=String($('frNick').value||'').trim().slice(0,12),ul=document.querySelector('#tkFr .fr-fl');if(!q||!ul)return;ul.textContent='';var w=document.createElement('li');w.className='fr-empty';w.textContent=T('불러오는 중…');ul.appendChild(w);
  lbReq('rpc/gf_tank_find',{p_nick:q}).then(function(rows){ul.textContent='';rows=(rows||[]).filter(function(x){return x.code!==TKS().code});if(!rows.length){var e=document.createElement('li');e.className='fr-empty';e.textContent=T('찾는 사람이 없어요');ul.appendChild(e);return}
    rows.forEach(function(x){ul.appendChild(frRow(x.code,x.nick,false,x.code+' · '+T('물고기 ')+Math.min(visNum(x.fishn),40)+T('마리')))})}).catch(function(e){ul.textContent='';fgErr(e)})}
/* 코드로 바로 친구 추가(놀러 가지 않고) */
function frAddCode(){var c=gfCodeIn(($('frCode')||{}).value||'').slice(0,6);if(c.length!==6){banner(T('6자리 코드'),'');return}if(c===TKS().code){banner(T('내 수족관이에요'),'');return}if(frHas(c)){banner(T('이미 친구예요'),'');return}
  lbReq('rpc/gf_tank_get',{p_code:c}).then(function(r){var row=r&&r[0];if(!row){banner(T('그 코드의 수족관이 없어요'),'');return}frAdd(row.code||c,row.nick)}).catch(function(){banner(T('인터넷 연결을 확인해 주세요'),'')})}
var tkFrOpenFG=tkFrOpen;tkFrOpen=function(){var r=tkFrOpenFG.apply(this,arguments);try{var row=document.querySelector('#tkFr .fr-go .fr-row');if(row&&!$('frAddC')){var x=document.createElement('button');x.type='button';x.className='btn ghost';x.id='frAddC';x.addEventListener('click',frAddCode);row.appendChild(x)}if($('frAddC'))$('frAddC').textContent='＋ '+T('친구');frRender();fgClaim()}catch(e){}return r};
/* 구경 중: 친구 추가 · 진주 선물 */
var visBarFG=visBar;visBar=function(){var r=visBarFG.apply(this,arguments);try{var b=$('visBar'),v=VISIT;if(!b||!v)return r;var row=b.querySelector('.vb-btns');var a=b.querySelector('.vb-add'),g=b.querySelector('.vb-gift');
  if(!a){a=document.createElement('button');a.type='button';a.className='btn ghost vb-add';a.addEventListener('click',function(){if(VISIT)frAdd(VISIT.code,VISIT.nick)});row.insertBefore(a,b.querySelector('.vb-out'))}
  if(!g){g=document.createElement('button');g.type='button';g.className='btn vb-gift';g.addEventListener('click',function(){if(VISIT)fgOpen(VISIT.code,VISIT.nick)});row.insertBefore(g,b.querySelector('.vb-out'))}
  var me=v.code===TKS().code;a.hidden=me||frHas(v.code);a.textContent='＋ '+T('친구 추가');g.hidden=me;g.textContent='🎁 '+T('진주 선물')}catch(e){}return r};
/* 선물 창 */
var FG={to:'',n:''};
function fgOpen(code,nick){if(code===TKS().code){banner(T('내 수족관이에요'),'');return}FG.to=code;FG.n=visNick(nick||'');var el=$('fgP');if(!el){el=document.createElement('div');el.className='overlay';el.id='fgP';el.hidden=true;el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
    el.innerHTML='<div class="panel fg-panel"><h1></h1><p class="lead fg-have"></p><label class="fg-l"><span></span><input type="number" id="fgAmt" inputmode="numeric" min="1" max="1000" step="1"></label><div class="fg-q"></div><p class="fg-left"></p><div class="fg-row"><button type="button" class="btn ghost" id="fgX"></button><button type="button" class="btn" id="fgGo"></button></div></div>';document.body.appendChild(el);
    [100,300,500,1000].forEach(function(v){var b=document.createElement('button');b.type='button';b.className='fg-qb';b.textContent=nf(v);b.addEventListener('click',function(){$('fgAmt').value=v;fgPaint()});el.querySelector('.fg-q').appendChild(b)});
    $('fgX').addEventListener('click',function(){el.hidden=true});el.addEventListener('click',function(e){if(e.target===el)el.hidden=true});$('fgAmt').addEventListener('input',fgPaint);$('fgGo').addEventListener('click',fgSend)}
  el.querySelector('h1').textContent='🎁 '+FG.n+(LANG==='en'?'':'')+T('님에게 진주 보내기');el.querySelector('.fg-l span').textContent=T('보낼 진주')+' ('+T('1 ~ 1,000')+')';$('fgX').textContent=T('닫기');$('fgGo').textContent=T('보내기');$('fgAmt').value=100;FG.left=null;fgPaint();el.hidden=false;crumb('fgOpen');
  lbReq('rpc/gf_gift_left',{p_pid:lbPid()}).then(function(n){FG.left=Math.max(0,+n||0);fgPaint()}).catch(function(){FG.left=null;fgPaint()})}
function fgAmt(){var v=Math.floor(+($('fgAmt')&&$('fgAmt').value)||0);return clamp(v,0,FG_MAX)}
function fgPaint(){var el=$('fgP');if(!el)return;var a=fgAmt();el.querySelector('.fg-have').textContent=T('진주 ')+nf(save.pearls|0);el.querySelector('.fg-left').textContent=T('오늘 더 보낼 수 있어요: ')+(FG.left==null?'…':nf(FG.left));
  $('fgGo').disabled=!(a>=1&&a<=(save.pearls|0)&&(FG.left==null||a<=FG.left));el.querySelectorAll('.fg-qb').forEach(function(b){b.classList.toggle('on',+b.textContent.replace(/,/g,'')===a)})}
function fgSend(){var a=fgAmt();if(a<1)return;if((save.pearls|0)<a){banner(T('진주가 모자라요'),'');return}var b=$('fgGo');b.disabled=true;
  lbReq('rpc/gf_gift_send',{p_to:FG.to,p_pid:lbPid(),p_code:TKS().code||null,p_nick:netClean(save.nick||''),p_amt:a}).then(function(n){n=+n;b.disabled=false;
    if(n>=0){if((save.pearls|0)<a){return}save.pearls-=a;persist();FG.left=n;crumb('fgSend');try{svSnd('chest');buzz([20,30,40])}catch(e){}banner(T('선물을 보냈어요!'),FG.n+' · '+T('진주 ')+'-'+nf(a));$('fgP').hidden=true;try{refreshHome(true);refreshTank()}catch(e){}
      try{if(VISIT){for(var i=0;i<tank.length;i+=2)abyFxPush(tank[i].x,tank[i].y-20,'heart',2)}}catch(e){}return}
    banner(n===-3?T('오늘은 더 보낼 수 없어요 (하루 1,000)'):n===-4?T('친구가 오늘 받을 수 있는 양을 넘었어요'):n===-2?T('내 수족관이에요'):n===-1?T('그 코드의 수족관이 없어요'):T('인터넷 연결을 확인해 주세요'),'');if(n===-3){FG.left=0;fgPaint()}}).catch(function(e){b.disabled=false;fgErr(e)})}
/* 받기: 앱을 켤 때 · 친구 창 열 때 */
function fgClaim(){var o=TKS();if(!o.code||!o.sec||fgClaim.busy)return;fgClaim.busy=1;lbReq('rpc/gf_gift_claim',{p_code:o.code,p_sec:o.sec}).then(function(rows){fgClaim.busy=0;rows=rows||[];if(!rows.length)return;var sum=0,by={};
    rows.forEach(function(r){var a=clamp(+r.amt||0,0,FG_MAX);sum+=a;var k=visNick(r.from_nick||'?');by[k]=(by[k]||0)+a});if(sum<=0)return;save.pearls+=sum;persist();crumb('fgGot:'+sum);
    var names=Object.keys(by);try{svSnd('chest');buzz([20,30,40])}catch(e){}banner(names.length===1?names[0]+T('님이 진주 ')+nf(sum)+T('개를 보냈어요 🎁'):T('친구에게서 진주 선물이 왔어요 🎁'),names.length===1?T('진주 +')+nf(sum):names.slice(0,3).join(' · ')+' · '+T('진주 +')+nf(sum));try{refreshHome(true);refreshTank()}catch(e){}}).catch(function(){fgClaim.busy=0})}
setTimeout(function(){try{fgClaim()}catch(e){}},11000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)setTimeout(function(){try{fgClaim()}catch(e){}},3000)});
(function(){var st=document.createElement('style');st.textContent=
 '.fr-mine .fr-h2{display:block;margin-top:10px}.fr-ml,.fr-fl{list-style:none;margin:6px 0 0;padding:0;display:flex;flex-direction:column;gap:5px}.fr-m{display:flex;align-items:center;gap:6px;background:#fff;border-radius:12px;box-shadow:inset 0 0 0 2px #D5E2EC;padding:6px 8px}'+
 '.fr-mt{flex:1;min-width:0;display:flex;flex-direction:column}.fr-mt b{font-family:var(--disp);font-weight:400;font-size:14.5px;color:#0B2C4A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.fr-mt small{font-size:11px;color:#5C7C95}'+
 '.fr-mb{flex:none;width:38px;height:34px;border:0;border-radius:10px;font-size:16px;background:#EAF4FB;box-shadow:inset 0 0 0 2px #B9D4E6;cursor:pointer}.fr-mb.gift{background:#FFF1D6;box-shadow:inset 0 0 0 2px #E8C77A}.fr-mb.add{background:#DFF6E6;box-shadow:inset 0 0 0 2px #8FD3A6;font-weight:700}.fr-mb.del{background:#F4F4F6;color:#8A93A0}'+
 '#fgP{z-index:63}.fg-panel{display:block!important;height:auto!important}.fg-panel>*{margin:0 0 10px}.fg-panel h1{font-size:19px!important;margin:0 0 10px!important}.fg-have{text-align:center;font-weight:700}.fg-l{display:flex;flex-direction:column;gap:4px;font-size:13px;color:#2A5A7A}'+
 '.fg-l input{font:700 22px/1.2 sans-serif;text-align:center;border:0;border-radius:12px;padding:10px;background:#fff;box-shadow:inset 0 0 0 2.5px #0B2C4A;color:#0B2C4A;width:100%;box-sizing:border-box}.fg-q{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.fg-qb{border:0;border-radius:10px;padding:8px 2px;font:700 14px sans-serif;background:#EAF4FB;box-shadow:inset 0 0 0 2px #B9D4E6;color:#0B2C4A;cursor:pointer}.fg-qb.on{background:#FFF4D6;box-shadow:inset 0 0 0 2.5px #E3B95A}'+
 '.fg-left{text-align:center;font-size:12.5px;color:#5C7C95}.fg-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}.fg-row .btn{min-height:0!important;height:46px!important;padding:0!important;margin:0!important}.vb-btns .vb-add,.vb-btns .vb-gift{white-space:nowrap}#frAddC{flex:none;white-space:nowrap;width:auto!important;padding:0 10px!important}@media (max-width:400px){#tkFr .fr-go .fr-row{flex-wrap:wrap}#tkFr .fr-go #frCode{flex:1 1 100%;min-width:0}#tkFr .fr-go #frGo,#tkFr .fr-go #frAddC{flex:1 1 0}}';document.head.appendChild(st)})();
