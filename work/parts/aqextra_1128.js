/* ===== 1.1.28 늑구 '1,5 ㄱ'
   ① 관찰 일지 보상 길: 장면을 N종 모으면 보상 — 3종 진주 500 · 6종 보석 10 · 9종 트리 장식 3개 · 12종(전부) 보석 30 + 배경 「산호 정원」 공짜
      「지금 수족관」 창 일지 위에 보상 칸(받은 것 ✓ · 받을 수 있는 것 반짝) 표시. 장면을 처음 볼 때 자동으로 받음
   ⑤ 전구 줄에 효과: 이은 줄 수만큼 진주 샘 +1%(최대 +10%) · 밤에는 줄 아래로 지나가는 물고기가 반짝이고 가끔 하트가 떠올라요(집 창에 안내) ===== */
abyTr(TRT,{'종':'','일지 보상':'Journal rewards','관찰 일지 ':'Sightings ','종 보상!':'-kind reward!','트리 장식 ':'Ornaments ','전구 줄 ':'Light strings ','줄 · 진주 샘 +':' · pearl spring +'});
abyTr(TRJ,{'종':'種','일지 보상':'日記のごほうび','관찰 일지 ':'観察日記 ','종 보상!':'種のごほうび！','트리 장식 ':'ツリーかざり ','전구 줄 ':'電球 ','줄 · 진주 샘 +':'本 · 真珠の泉 +'});
/* ① 일지 보상 */
var AQ_RW=[{n:3,p:500},{n:6,g:10},{n:9,orn:['wreath','deer','snowman']},{n:12,g:30,bg:'coralgarden'}];
function aqRwText(R){var s=[];if(R.p)s.push(T('진주 +')+R.p);if(R.g)s.push(T('보석 +')+R.g);if(R.orn)s.push(T('트리 장식 ')+R.orn.length);if(R.bg){try{s.push(tankBgById(R.bg).name)}catch(e){}}return s.join(' · ')}
function aqJReward(){try{var o=AQJ();if(!o.r||typeof o.r!=='object')o.r={};var cnt=Object.keys(o.s).length;try{TB()}catch(e){}
  AQ_RW.forEach(function(R){if(cnt<R.n||o.r[R.n])return;o.r[R.n]=1;
    if(R.p)save.pearls+=R.p;if(R.g)save.gems=(save.gems||0)+R.g;if(R.orn)R.orn.forEach(function(k){try{xmOrnAdd(k,1,1)}catch(e){}});
    if(R.bg&&save.tankBgs&&save.tankBgs.indexOf(R.bg)<0)save.tankBgs.push(R.bg);
    (function(txt){setTimeout(function(){banner('📖 '+T('관찰 일지 ')+R.n+T('종 보상!'),txt);try{svSnd('lvl');buzz([20,30,40])}catch(e){}},1500)})(aqRwText(R));crumb('aqRw:'+R.n)});
  persist();try{refreshHome&&refreshHome(true);refreshTank()}catch(e){}}catch(e){}}
var aqSeenRW=aqSeen;aqSeen=function(k){var r=aqSeenRW.apply(this,arguments);try{aqJReward()}catch(e){}return r};
var aqNowOpenRW=aqNowOpen;aqNowOpen=function(){var r=aqNowOpenRW.apply(this,arguments);try{var el=$('aqNow');if(!el)return r;var b=el.querySelector('.aq-body'),lead=b.querySelector('.aq-lead');if(!lead||b.querySelector('.aqj-rw'))return r;
  var o=AQJ(),cnt=Object.keys(o.s).length,h=document.createElement('p');h.className='aqj-rwh';h.textContent='🎁 '+T('일지 보상');var rw=document.createElement('div');rw.className='aqj-rw';
  AQ_RW.forEach(function(R){var c=document.createElement('span'),got=o.r&&o.r[R.n];c.className='aqj-c'+(got?' got':cnt>=R.n?' rdy':'');var tp=document.createElement('b');tp.textContent=R.n+T('종')+(got?' ✓':'');var bt=document.createElement('small');bt.textContent=aqRwText(R);c.appendChild(tp);c.appendChild(bt);rw.appendChild(c)});
  lead.parentNode.insertBefore(h,lead.nextSibling);h.parentNode.insertBefore(rw,h.nextSibling)}catch(e){}return r};
setTimeout(function(){try{aqJReward()}catch(e){}},12000);
/* ⑤ 전구 줄 효과 */
function aqLN(){try{aqPrune();return Math.min(10,AQL().length)}catch(e){return 0}}
var houseRateAtAL=houseRateAt;houseRateAt=function(lv){var r=houseRateAtAL.apply(this,arguments);try{if(r){var n=aqLN();if(n)r=Math.max(1,Math.round(r*(1+n*.01)))}}catch(e){}return r};
var houseOpenAL=houseOpen;houseOpen=function(){var r=houseOpenAL.apply(this,arguments);try{var n=aqLN(),tp=$('hsTip');if(tp&&n)tp.textContent+='\n'+T('전구 줄 ')+n+T('줄 · 진주 샘 +')+n+'%'}catch(e){}return r};
/* 밤: 줄 아래로 지나가는 물고기가 반짝 · 가끔 하트가 떠올라 진주 조금 */
var aqLT=0,aqLHeart=0;
var drawHouseAL=drawHouse;drawHouse=function(){var r=drawHouseAL.apply(this,arguments);try{if(page!=='tank'||deco.on||VISIT||reduce||!aqNight())return r;var L=AQL();if(!L.length)return r;
  var now=t,c=ctx;aqLT=aqLT||now;
  if(now-aqLT>1.1){aqLT=now;var s=L[(Math.random()*L.length)|0],A=aqAnchor(s.a),B=aqAnchor(s.b);if(A&&B){var mx=(A.x+B.x)/2,my=(A.y+B.y)/2+clamp(Math.hypot(B.x-A.x,B.y-A.y)*.2,10,110);
    for(var i=0;i<tank.length;i++){var f=tank[i];if(Math.abs(f.x-mx)<60&&Math.abs(f.y-my)<80){try{abyFxPush(f.x,f.y-tankSize(f.L)*.6,'spark',1)}catch(e){}break}}}}
  if(aqLHeart<=0)aqLHeart=18+Math.random()*22;aqLHeart-=1/60;
  if(aqLHeart<=0&&!AQG.length){var s2=L[(Math.random()*L.length)|0],A2=aqAnchor(s2.a),B2=aqAnchor(s2.b);if(A2&&B2){var hx=(A2.x+B2.x)/2,hy=(A2.y+B2.y)/2+30;AQG.push({x:hx,y:hy,id:'',v:Math.round(10*(typeof RW_K==='number'?RW_K:1)),t:0,ph:Math.random()*6,lite:1})}}}catch(e){}return r};
(function(){var st=document.createElement('style');st.textContent='.aqj-rwh{margin:2px 0 4px;text-align:center;font-family:var(--disp);font-weight:400;font-size:14px;color:#0B2C4A}.aqj-rw{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:10px}.aqj-c{display:flex;flex-direction:column;align-items:center;gap:1px;border-radius:11px;background:#F4F8FC;box-shadow:inset 0 0 0 2px #D5E2EC;padding:5px 3px}.aqj-c.got{background:#DFF6E6;box-shadow:inset 0 0 0 2px #8FD3A6}.aqj-c.rdy{background:#FFF4D6;box-shadow:inset 0 0 0 2.5px #E3B95A;animation:aqjp 1.2s infinite}@keyframes aqjp{50%{box-shadow:inset 0 0 0 2.5px #FFCf5A,0 0 10px rgba(255,200,90,.6)}}.aqj-c b{font-family:var(--disp);font-weight:400;font-size:12.5px;color:#0B2C4A}.aqj-c small{font-size:9.5px;color:#5C7C95;text-align:center;line-height:1.1}';document.head.appendChild(st)})();
