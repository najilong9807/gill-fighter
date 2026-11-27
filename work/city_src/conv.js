/* ===== 1.1.35 마을 편리성 (늑구 '마을 업데이트 준비하고 편리성 확보해') =====
   ① 말풍선 하나만 누르면 같은 재료 말풍선을 마을 전체에서 한 번에 거둠
   ② 같은 건물이 여러 채면 건물 창 위에 ◀ 2 / 3 ▶ — 옆 채로 바로 넘어가 업그레이드
   ③ 🐢 주문 창 '모두 배달' — 지금 창고로 보낼 수 있는 주문을 차례로 한 번에
   ④ 위 줄 🦀 칩을 누르면 '공사 중' 목록(남은 시간) + '지금 올릴 수 있어요' 건물 목록, 누르면 그 건물로
   ⑥ 건물 놓을 때 바위 · 덤불이 있거나 도로에 안 닿아도 ✓ 하나로 '치우고 · 길 잇고 · 짓기'(드는 진주를 미리 보여 줌, 되돌리기 한 번에)
   ⑤ 본게임 알림 띠(어서 오세요 등)가 마을 창 제목 · ✕ · 오른쪽 단추를 덮던 것 → 마을을 한 번 누르면 띠를 닫음 */
(function(){
  try{var st=document.createElement('style');st.textContent=
    '.bnav{display:flex;align-items:center;justify-content:center;gap:10px;margin:-2px 0 8px;font:700 14px/1 system-ui,sans-serif;color:#56627C}'+
    '.bnav button{min-width:44px;height:36px;border-radius:12px;border:2px solid #22304d;background:#fff;font-size:16px;font-weight:700;color:#22304d}'+
    '.bnav button:active{filter:brightness(.9);transform:scale(.97)}'+
    '#crabs{cursor:pointer}#crabs:active{filter:brightness(.92)}'+
    '.crew li{cursor:pointer;padding:8px 4px;min-height:28px}.crew li small{float:right;color:#56627C}'+
    '.crew li.go{color:#1f7a3e}';document.head.appendChild(st)}catch(e){}

  /* ① 같은 재료 한 번에 거두기 */
  var _colC=collect,inAll=false;
  collect=function(b){var rk=bufReady(b);var r=_colC.apply(this,arguments);
    if(!inAll&&rk){inAll=true;try{G.b.forEach(function(o){if(o!==b&&bufReady(o)===rk)_colC(o)})}catch(e){}inAll=false}return r};

  /* ② 같은 건물 여러 채: ◀ n / m ▶ */
  function sameOf(b){return G.b.filter(function(o){return o.k===b.k})}
  var _opC=openPanel;
  openPanel=function(b){var r=_opC.apply(this,arguments);
    try{if(b&&!isZ(b.k)&&!isD(b.k)&&!(b.inc&&typeof INCT!=='undefined'&&INCT[b.inc.k])){var L=sameOf(b);
      if(L.length>1){var el=$('panel'),h2=el.querySelector('h2');if(h2&&!el.querySelector('.bnav')){var i=L.indexOf(b),d=document.createElement('div');d.className='bnav';
        d.innerHTML='<button type="button" data-v="-1" aria-label="◀">◀</button><span>'+(i+1)+' / '+L.length+'</span><button type="button" data-v="1" aria-label="▶">▶</button>';
        h2.parentNode.insertBefore(d,h2.nextSibling);
        d.querySelectorAll('button').forEach(function(x){x.onclick=function(){var nb=L[(i+(+x.dataset.v)+L.length)%L.length];try{focus(nb);clampCam()}catch(e){}SEL=nb;openPanel(nb)}})}}}}catch(e){}
    return r};

  /* ③ 주문 모두 배달 */
  var _ordP=orderPanel;
  orderPanel=function(){var r=_ordP.apply(this,arguments);
    try{var n=ordReady();if(n>=2){var el=$('panel'),box=el.querySelector('.ords');if(box&&!$('oAll')){var d=document.createElement('div');d.className='row';
      d.innerHTML='<button class="main" id="oAll">🐢 모두 배달 · '+n+'</button>';box.parentNode.insertBefore(d,box);
      $('oAll').onclick=function(){(G.ord||[]).slice().forEach(function(o){if(ordCan(o))ordSend(o)})}}}}catch(e){}
    return r};

  /* ④ 🦀 칩 → 공사 목록 · 지금 올릴 수 있는 건물 */
  function crewPanel(){var el=$('panel'),now=NOW(),J=G.b.filter(function(b){return b.job&&!isZ(b.k)}).sort(function(a,b){return a.job.end-b.job.end});
    var nm=function(b){return (typeof DESC!=='undefined'&&DESC[b.k]?DESC[b.k].ic+' ':'')+B[b.k].n};
    var h='<button class="x" id="pX">✕</button><h2>🦀 게 일꾼 <small>'+jobs().filter(function(b){return !(b.job.q&&now<b.job.start)}).length+'/'+crabsMax()+'</small></h2>';
    if(J.length)h+='<p class="role">공사 중</p><div class="box"><ul class="req crew">'+J.map(function(b){var q=b.job.q&&now<b.job.start;return '<li data-i="'+G.b.indexOf(b)+'">'+(q?'⏳ ':'🔨 ')+nm(b)+' Lv.'+b.job.L+' <small>'+dur((b.job.end-now)/1000)+'</small></li>'}).join('')+'</ul></div>';
    var C=G.b.filter(function(b){return !b.job&&!isZ(b.k)&&!isD(b.k)&&B[b.k]&&b.lv&&b.lv<D.HMAX&&!canStart(b.k,b.lv+1).length}).sort(function(a,b){return (a.k==='hall'?-1:0)-(b.k==='hall'?-1:0)||a.lv-b.lv}).slice(0,8);
    h+='<p class="role">지금 올릴 수 있어요</p>'+(C.length?'<div class="box"><ul class="req crew">'+C.map(function(b){return '<li class="go" data-i="'+G.b.indexOf(b)+'">⬆ '+nm(b)+' Lv.'+b.lv+' → '+(b.lv+1)+'</li>'}).join('')+'</ul></div>':'<p class="why">올릴 수 있는 건물이 없어요</p>');
    el.innerHTML=h;el.hidden=false;panelFor=null;$('pX').onclick=closePanel;
    el.querySelectorAll('.crew li').forEach(function(li){li.onclick=function(){var b=G.b[+li.dataset.i];if(!b)return;try{focus(b);clampCam()}catch(e){}SEL=b;openPanel(b)}})}

  /* ⑥ 치우고 · 길 잇고 · 짓기 (집 · 가게 · 장식 말고 건물) */
  var FIXW={'바위 · 덤불을 먼저 치워요':1,'도로에 붙여 지어야 해요':1};
  function fixPlan(k,x,y){var s=sz(k),clr=[],road=[],foot={},i,j;
    for(i=0;i<s;i++)for(j=0;j<s;j++){var X=x+i,Y=y+j,t=X+','+Y;if(!inb(X,Y)||!own(X,Y)||OCC[t]||G.road[t])return null;foot[t]=1;if(G.ter[t])clr.push(t)}
    var near=false,ring=[];for(i=-1;i<=s;i++)for(j=-1;j<=s;j++){if((i<0||i>=s)&&(j<0||j>=s))continue;if(i>=0&&i<s&&j>=0&&j<s)continue;if(isRoad(x+i,y+j))near=true;ring.push([x+i,y+j])}
    if(!near){var pass=function(a,b){var t=a+','+b;return inb(a,b)&&own(a,b)&&!OCC[t]&&!foot[t]&&!G.road[t]&&!(G.rail&&G.rail[t])&&!(G.groad&&G.groad[t])};
      var prev={},q=[],dist={},hit=null;ring.forEach(function(p){var t=p[0]+','+p[1];if(pass(p[0],p[1])&&dist[t]==null){dist[t]=1;prev[t]=null;q.push(p)}});
      for(var h=0;h<q.length&&!hit;h++){var c=q[h],ck=c[0]+','+c[1];if(dist[ck]>30)break;
        var ns=[[1,0],[-1,0],[0,1],[0,-1]];for(var n=0;n<4;n++){var a=c[0]+ns[n][0],b=c[1]+ns[n][1];if(isRoad(a,b)){hit=ck;break}}
        if(hit)break;for(n=0;n<4;n++){a=c[0]+ns[n][0];b=c[1]+ns[n][1];var t2=a+','+b;if(dist[t2]==null&&pass(a,b)){dist[t2]=dist[ck]+1;prev[t2]=ck;q.push([a,b])}}}
      if(!hit)return null;for(var t3=hit;t3;t3=prev[t3]){road.push(t3);if(G.ter[t3])clr.push(t3)}}
    var cost=road.length*D_ROAD;clr.forEach(function(t){cost+=G.ter[t]===1?60:25});
    return {x:x,y:y,clr:clr,road:road,cost:cost}}
  function applyFix(p){p.clr.forEach(function(t){var rk=G.ter[t]===1,gv=rk?40:20,gr=rk?'stone':'kelp';delete G.ter[t];G.res[gr]=Math.min(Math.max(cap(gr),G.res[gr]||0),(G.res[gr]||0)+gv);var q=t.split(','),pz=sc(+q[0],+q[1]);dust(pz.x,pz.y,4,.5)});
    p.road.forEach(function(t){G.road[t]=1;var q=t.split(','),pz=sc(+q[0],+q[1]);dust(pz.x,pz.y,2,.3)});WAL.add('pearl',-p.cost);occ();cityF=0}
  var _pbF=placeBar;
  placeBar=function(){var r=_pbF.apply(this,arguments);
    try{if(GH&&GH.h){var hk=GH.k,hz=GH.h,hw=siteWhy(hk,GH.x,GH.y);GH.fix=null;
      if(hw&&FIXW[hw]&&O2[GH.x+','+GH.y]){var hp=fixPlan(hk,GH.x,GH.y);if(hp){GH.fix=hp;GH.why='';var hparts=[];if(hp.clr.length)hparts.push('🧹 '+hp.clr.length+'곳 치우기');if(hp.road.length)hparts.push('🛣 길 '+hp.road.length+'칸 잇기');
        var hs=$('place').querySelector('small');if(hs)hs.innerHTML=hparts.join(' · ')+' · 🫧'+fmt(hp.cost)+' 더 들어요<br>✓를 누르면 같이 해요';
        var hok=$('pOk');if(hok){hok.disabled=false;hok.onclick=function(){if(!GH||!GH.fix)return;if(WAL.get('pearl')<hp.cost+H_COST){toast('진주가 모자라요');return}var Z=ZN[hz];
          pushUndo(Z.ic+' '+Z.n+' 짓기');applyFix(hp);var ok=placeHouse(hz,GH.x,GH.y);setTimeout(endAct,0);if(!ok)return;save();toast('🦀 게 일꾼들이 '+Z.n+'을(를) 짓기 시작했어요');
          var nk='z'+hz+Math.floor(Math.random()*3),np=hSpot(nk,{i:GH.x,j:GH.y});if(np){GH.k=nk;GH.x=np.x;GH.y=np.y;placeBar()}else{GH=null;$('place').hidden=true;$('ghb').hidden=true}}}}}}}catch(e){}
    try{if(GH&&!GH.h&&!isD(GH.k)){var k=GH.k,why=siteWhy(k,GH.x,GH.y);GH.fix=null;
      if(why&&FIXW[why]){var p=fixPlan(k,GH.x,GH.y);if(p){GH.fix=p;var c=D.cost(k,1),parts=[];if(p.clr.length)parts.push('🧹 '+p.clr.length+'곳 치우기');if(p.road.length)parts.push('🛣 길 '+p.road.length+'칸 잇기');
        var sm=$('place').querySelector('small');if(sm)sm.innerHTML=parts.join(' · ')+' · 🫧'+fmt(p.cost)+' 더 들어요<br>✓를 누르면 같이 해요';
        var ok=$('pOk');if(ok){ok.disabled=false;ok.onclick=function(){if(!GH||!GH.fix)return;var w=canStart(k,1);if(w.length){toast(w[0]);return}
          if(WAL.get('pearl')<p.cost+(c.pearl||0)){toast('진주가 모자라요');return}
          pushUndo(B[k].n+' 짓기');applyFix(p);setTimeout(endAct,0);var b={id:G.nid++,k:k,x:GH.x,y:GH.y,lv:0,buf:{}};G.b.push(b);occ();startJob(b,1);GH=null;$('place').hidden=true;$('ghb').hidden=true;FLOATU={id:b.id,until:NOW()+8000};setTab(null);save();try{gfEv('fixBuild')}catch(e){}
          toast('🦀 게 일꾼이 '+B[k].n+'을(를) 짓기 시작했어요')}}}}}}catch(e){}
    return r};
  /* ⑤ 마을을 누르면 본게임 알림 띠 닫기 */
  try{if(window.parent!==window)document.addEventListener('pointerdown',function(){try{var e=window.parent.document.getElementById('banner');if(e&&!e.hidden)e.hidden=true}catch(x){}},true)}catch(e){}
  window.__crewPanel=crewPanel;
  /* 시험 도구 전용(window.__GF_TEST 를 시험에서만 켬): 마을 안쪽 값 읽기 */
  if(window.__GF_TEST)window.__cv=function(src){return eval(src)};
  try{var c=$('crabs');if(c){c.classList.add('tapme');c.setAttribute('role','button');c.onclick=function(){if(!$('panel').hidden&&$('panel').querySelector('.crew')){closePanel();return}crewPanel()}}}catch(e){}
})();
