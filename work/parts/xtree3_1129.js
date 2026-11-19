/* ===== 1.1.29 트리 꾸미기 손질 (11/19 늑구 '구매 방식은 이전이 낫고 · 끌어다 놓는 게 안 됨')
   ① 끌어다 놓기: 포인터 이벤트만 쓰던 것에 터치 이벤트를 덧댐(아이폰에서 끌기 도중 화면 밀기로 넘어가 끊기던 것).
      위로만이 아니라 어느 쪽으로 끌어도(옆으로 미는 것만 서랍 넘기기) · 0.26초 꾹 눌러도 집힘 · 끄는 동안 창은 안 밀림
   ② 장식 가게: 탭 안에 숨기지 않고 예전처럼 아래에 늘 보이는 칸으로. 사면 바로 트리에 달림 ===== */
(function(){
  var st=document.createElement('style');st.textContent='#xtP .xt-tabs button[data-t="shop"]{display:none}#xtP .xt-shop{margin-top:8px;border-top:2px dashed #C9D8E6;padding-top:10px}#xtP .xt-shop h2{margin:0;font:400 16px var(--disp);color:#0B2C4A}#xtP .xt-shop p{margin:2px 0 8px;font:12px system-ui,sans-serif;color:#0B2C4A;opacity:.8}#xtP .xt-shopg{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding-bottom:6px}#xtP .xt-shopg .xt-it{width:auto;min-width:0;touch-action:pan-y;font:inherit;min-height:112px;justify-content:flex-start}#xtP .xt-shopg .xt-it small{max-width:100%}#xtP.xt-drag .xt-body,#xtP.xt-drag .xt-tray{overflow:hidden}';document.head.appendChild(st);
  var W={shop:{ko:'장식 가게',en:'Ornament shop',ja:'かざりショップ',es:'Tienda de adornos',vi:'Cửa hàng trang trí'},
    sub:{ko:'진주로 사면 바로 트리에 달려요 · 단 장식은 끌어서 옮겨요',en:'Buy with pearls and it goes straight onto the tree · drag to move it',ja:'真珠で買うとすぐツリーにつきます・ドラッグで動かせます',es:'Compra con perlas y se cuelga al instante · arrastra para moverlo',vi:'Mua bằng ngọc trai là treo ngay lên cây · kéo để di chuyển'}};
  function w(k){var l=(typeof SUBL==='string'&&SUBL)||LANG;return W[k][l]||W[k].en}
  XT_WORDS.lead={ko:'장식을 끌어다 원하는 자리에 놓아요 · 톡 누르면 알아서 붙어요 · 트리 밖으로 빼면 떼어져요',en:'Drag an ornament to any spot · tap to hang it automatically · drag it off the tree to remove it',ja:'かざりをドラッグして好きな場所に・タップで自動でつきます・ツリーの外に出すと外れます',es:'Arrastra un adorno adonde quieras · toca para colgarlo solo · sácalo del árbol para quitarlo',vi:'Kéo đồ trang trí đến chỗ bạn thích · chạm để tự treo · kéo ra ngoài cây để gỡ'};
  /* ② 가게 */
  var R0=xtRender;xtRender=function(){if(XTE.tab==='shop')XTE.tab='orn';var r=R0.apply(this,arguments);try{var el=$('xtP');if(!el)return r;var body=el.querySelector('.xt-body'),sh=$('xtShop');
      if(!sh){sh=document.createElement('div');sh.className='xt-shop';sh.id='xtShop';sh.innerHTML='<h2></h2><p></p><div class="xt-shopg"></div>';body.appendChild(sh)}
      sh.querySelector('h2').textContent=w('shop');sh.querySelector('p').textContent=w('sub');var g=sh.querySelector('.xt-shopg'),o=XT();g.textContent='';
      XORN.forEach(function(q){var k=q[0],c={cur:'pearls',price:XORN_P[k]||150},b=document.createElement('button');b.type='button';b.className='xt-it';b.appendChild(xtThumb(k));var s=document.createElement('small');s.textContent=xtName(k);b.appendChild(s);
        var sub=document.createElement('span');sub.className='cost';sub.appendChild(costEl(c));b.appendChild(sub);var own=o.inv[k]|0;xtF().forEach(function(it){if(it.k===k)own++});var i2=document.createElement('small');i2.textContent=own?xtW('own')+own:' ';b.appendChild(i2);
        if(!canPay(c))b.dataset.poor='1';b.setAttribute('aria-label',xtName(k)+' '+c.price);b.addEventListener('click',function(){xbtBuy(k)});g.appendChild(b)})}catch(e){}return r};
  var B0=xbtBuy;xbtBuy=function(k){var n0=XT().inv[k]|0;B0.apply(this,arguments);try{if((XT().inv[k]|0)>n0){var kd=xtKind(k);XTE.tab=(kd==='gar'||kd==='light')?'str':'orn';xtPlaceOne(k);xtRender()}}catch(e){}};
  /* ① 터치 끌기 */
  var TD0=xtTrayDown;xtTrayDown=function(e,k,b){try{b.dataset.k=k}catch(x){}return TD0.apply(this,arguments)};
  var xtUp0=xtUp;xtUp=function(e){if(XTE.tch&&e&&e.type==='pointercancel')return;return xtUp0.apply(this,arguments)};
  function fe(t){return {clientX:t.clientX,clientY:t.clientY,pointerId:-1,pointerType:'touch',type:'touch'}}
  var TP=null,LT=0;
  function begin(P,t){XTE.pend=null;if(XTE.drag)return;if(xtF().length>=XT_MAX){banner(xtW('full'),'');return}XTE.drag={from:'tray',k:P.k,sx:P.sx,sy:P.sy,moved:true,over:false};XTE.jd=Date.now();XTE.tch=1;var el=$('xtP');if(el)el.classList.add('xt-drag');try{buzz(12)}catch(e){}xtGhost(P.k,fe(t));xtMove(fe(t))}
  document.addEventListener('touchstart',function(e){try{var el=$('xtP');if(!el||el.hidden||e.touches.length!==1)return;var t=e.touches[0],tg=e.target&&e.target.closest?e.target.closest('#xtTray .xt-it'):null;
      if(tg&&tg.dataset.k){TP={k:tg.dataset.k,sx:t.clientX,sy:t.clientY,lx:t.clientX,ly:t.clientY};clearTimeout(LT);LT=setTimeout(function(){if(TP&&!XTE.drag){var P=TP;TP=null;begin(P,{clientX:P.lx,clientY:P.ly})}},260)}
      else if(e.target&&e.target.id==='xtCv'){XTE.tch=1;if(!XTE.drag){try{xtCvDown.call(e.target,fe(t))}catch(x){}}if(XTE.drag)el.classList.add('xt-drag')}}catch(x){}},{passive:true,capture:true});
  document.addEventListener('touchmove',function(e){try{var t=e.touches[0];if(!t)return;var el=$('xtP');if(!el||el.hidden)return;
      if(XTE.drag){XTE.tch=1;clearTimeout(LT);TP=null;el.classList.add('xt-drag');if(e.cancelable)e.preventDefault();xtMove(fe(t));return}
      if(TP){TP.lx=t.clientX;TP.ly=t.clientY;var dx=t.clientX-TP.sx,dy=t.clientY-TP.sy;if(Math.hypot(dx,dy)>8){clearTimeout(LT);var P=TP;TP=null;if(Math.abs(dx)>Math.abs(dy)*1.6){XTE.pend=null}else{if(e.cancelable)e.preventDefault();begin(P,t)}}}}catch(x){}},{passive:false,capture:true});
  function end(e){try{clearTimeout(LT);TP=null;var el=$('xtP');if(el)el.classList.remove('xt-drag');if(XTE.drag&&XTE.tch){var t=e.changedTouches&&e.changedTouches[0];XTE.jd=Date.now();xtUp0(t?fe(t):{clientX:-1,clientY:-1})}XTE.tch=0}catch(x){XTE.tch=0}}
  document.addEventListener('touchend',end,true);document.addEventListener('touchcancel',end,true);
})();
