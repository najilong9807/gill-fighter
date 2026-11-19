/* ===== 배치 효과가 바로 보이게 (재미 개선 2) =====
   땅값이 집 단계 · 행복 · 세금을 정하는데(zUpWhy · happy), 지금까지는 숫자가 안 보여 '어디에 둬도 같다'로 느껴졌음.
   ① 건물 · 장식을 놓기 전(미리보기): 영향 범위 칸을 초록(+) · 빨강(−)으로 칠하고, 그 안 집 위에 '+6' / '−9' 배지
      아래 놓기 창에 '🏠 둘레 집 7채 땅값 +5 · 이 자리면 2채가 다음 단계에 닿아요'
   ② 집(구역 건물) 창: 땅값 내역 — 기본 40 · 🌸 장식 +8 · 🏭 광산 −9 · 덤불 +2 · 행복 +4 (큰 것부터 4개)
   계산은 fields()와 같은 effOf(범위 · 세기) — 맨해튼 거리 d 칸에서 세기 × (1 − d/(범위+1)) */
function plcCenter(k,x,y){var s=sz(k);return [x+(s-1)/2,y+(s-1)/2]}
function plcDelta(k,L,cx,cy,bx,by){var e=effOf(k,L),r=e[0],v=e[1];if(!r||!v)return 0;var d=Math.abs(Math.round(cx-bx))+Math.abs(Math.round(cy-by));if(d>r)return 0;return v*(1-d/(r+1))}
function plcInfo(){if(!GH||!effOf(GH.k,1)[1])return null;var c=plcCenter(GH.k,GH.x,GH.y),L=[],up=0,sum=0;
  G.b.forEach(function(b){if(!isZ(b.k)||!b.lv)return;var dv=plcDelta(GH.k,1,c[0],c[1],b.x,b.y);if(Math.abs(dv)<.5)return;var d=Math.round(dv);L.push({b:b,d:d});sum+=d;
    if(d>0&&b.lv<5){var now=landVal(b.x,b.y),need=ZLV[b.lv];if(now<need&&now+d>=need)up++}});
  return {c:c,e:effOf(GH.k,1),L:L,avg:L.length?Math.round(sum/L.length):0,up:up}}
/* ① 칸 칠하기: 바닥 그린 다음(건물보다 아래) */
var _drawTilesP=drawTiles;drawTiles=function(t){var r=_drawTilesP.apply(this,arguments);try{if(GH){var e=effOf(GH.k,1),R=e[0],V=e[1];if(R&&V){var c=plcCenter(GH.k,GH.x,GH.y),z=cam.z,w=TW*z,h=TH*z,pos=V>0;
    ctx.save();for(var i=-R;i<=R;i++)for(var j=-R;j<=R;j++){var d=Math.abs(i)+Math.abs(j);if(d>R)continue;var p=sc(Math.round(c[0]+i),Math.round(c[1]+j));if(p.x<-w||p.x>VW+w||p.y<-h||p.y>VH+h)continue;var a=.08+.26*(1-d/(R+1));
      diamond(p.x,p.y,w*.94,h*.94);ctx.fillStyle=pos?'rgba(46,190,110,'+a+')':'rgba(230,70,90,'+a+')';ctx.fill()}
    /* 바깥 테두리 */
    ctx.setLineDash([6,5]);ctx.lineWidth=2;ctx.strokeStyle=pos?'rgba(30,140,80,.75)':'rgba(200,50,70,.75)';var t0=sc(c[0],c[1]-R-.5),t1=sc(c[0]+R+.5,c[1]),t2=sc(c[0],c[1]+R+.5),t3=sc(c[0]-R-.5,c[1]);
    ctx.beginPath();ctx.moveTo(t0.x,t0.y);ctx.lineTo(t1.x,t1.y);ctx.lineTo(t2.x,t2.y);ctx.lineTo(t3.x,t3.y);ctx.closePath();ctx.stroke();ctx.restore()}}}catch(x){}return r};
/* ① 배지: 건물 위(맨 위에) */
var _drawWorldP=drawWorld;drawWorld=function(t,now){var r=_drawWorldP.apply(this,arguments);try{var I=plcInfo();if(I){var z=cam.z;ctx.save();ctx.font='400 '+Math.round(11+5*Math.min(1.2,z))+'px "Black Han Sans",sans-serif';ctx.textAlign='center';
    I.L.forEach(function(q){var c=centerOf(q.b);if(c.x<-30||c.x>VW+30||c.y<-30||c.y>VH+60)return;var tx=(q.d>0?'+':'−')+Math.abs(q.d),y=c.y-62*z,w=ctx.measureText(tx).width+12,hh=18*Math.min(1.2,z)+4;
      ctx.fillStyle=q.d>0?'#2e9b55':'#d2485a';ctx.strokeStyle='#fff';ctx.lineWidth=2;rr(c.x-w/2,y-hh/2,w,hh,hh/2);ctx.fill();ctx.stroke();ctx.fillStyle='#fff';ctx.fillText(tx,c.x,y+hh*.28)});ctx.restore()}}catch(x){}return r};
/* ① 놓기 창에 한 줄 */
var _placeBarP=placeBar;placeBar=function(){var r=_placeBarP.apply(this,arguments);try{var I=plcInfo(),pt=$('place').querySelector('.pt');if(pt&&!pt.querySelector('.pfx')){var h;
    if(!I)h='';else if(!I.L.length)h=(I.e[1]>0?'🌿 둘레 '+I.e[0]+'칸 땅값 +':'🏭 둘레 '+I.e[0]+'칸 땅값 −')+' · 아직 영향 받는 집이 없어요';
    else h='🏠 둘레 집 '+I.L.length+'채 땅값 '+(I.avg>0?'+':'−')+Math.abs(I.avg)+(I.up?' · 이 자리면 '+I.up+'채가 다음 단계에 닿아요':I.avg<0?' · 집에서 떨어뜨리면 덜 깎여요':'');
    if(h)pt.insertAdjacentHTML('beforeend','<div class="pfx '+(I&&I.e[1]<0?'neg':'pos')+'">'+(window.CITY_TR||String)(h)+'</div>')}}catch(x){}return r};
/* GH 를 옮길 때마다 놓기 창 줄도 새로(placeBar 가 다시 불리지 않는 경로 대비) */
var _plcKey='';setInterval(function(){try{var k=GH?GH.k+GH.x+','+GH.y:'';if(k&&k!==_plcKey&&!$('place').hidden){_plcKey=k;var pt=$('place').querySelector('.pfx');if(pt)pt.remove();placeBar()}else if(!k)_plcKey=''}catch(x){}},400);
/* ② 집 창: 땅값 내역 */
function lvParts(x,y){var P=[];G.b.forEach(function(b){if(!b.lv||isZ(b.k))return;var c=plcCenter(b.k,b.x,b.y),dv=plcDelta(b.k,b.lv,c[0],c[1],x,y);if(Math.abs(dv)>=.5)P.push({n:(DESC[b.k]?DESC[b.k].ic+' ':DEC[b.k]?'🌸 ':'')+(B[b.k]?B[b.k].n:DEC[b.k]?DEC[b.k].n:b.k),v:dv})});
  var near=0;for(var i=-2;i<=2;i++)for(var j=-2;j<=2;j++)if(G.ter[(x+i)+','+(y+j)]===2)near++;if(near)P.push({n:'🌿 다시마 덤불',v:Math.min(8,near*2)});var hp=Math.max(0,((CS&&CS.happy)||60)-60)/5;if(hp>=.5)P.push({n:'😊 행복',v:hp});
  /* 같은 이름은 합침 */var M={};P.forEach(function(p){M[p.n]=(M[p.n]||0)+p.v});return Object.keys(M).map(function(n){return {n:n,v:Math.round(M[n])}}).filter(function(p){return p.v}).sort(function(a,b){return Math.abs(b.v)-Math.abs(a.v)})}
var _zonePanelP=zonePanel;zonePanel=function(b){var r=_zonePanelP.apply(this,arguments);try{var el=$('panel'),h2=el.querySelector('h2');if(h2&&!el.querySelector('.lvp')){var P=lvParts(b.x,b.y),tot=landVal(b.x,b.y),sh=P.slice(0,4);
    var h='<div class="lvp"><b>🏷 땅값 '+tot+'</b> = 기본 40'+sh.map(function(p){return ' <span class="'+(p.v>0?'p':'n')+'">'+p.n+' '+(p.v>0?'+':'−')+Math.abs(p.v)+'</span>'}).join('')+(P.length>4?' …':'')+
      '<br><small>장식 · 학교 · 식당 · 명소 가까이면 오르고, 광산 · 가마 · 공장 가까이면 내려가요'+(b.lv<5?' · 다음 단계에 땅값 '+ZLV[b.lv]+' 필요':'')+'</small></div>';h2.insertAdjacentHTML('afterend',(window.CITY_TR||String)(h))}}catch(x){}return r};
(function(){var st=document.createElement('style');st.textContent='.pfx{margin-top:4px;font-size:12.5px;font-weight:800;padding:3px 8px;border-radius:9px;display:inline-block}.pfx.pos{background:#e3f6ec;color:#1f7a42}.pfx.neg{background:#fde6ea;color:#b23a4e}'+
  '.lvp{margin:2px 0 8px;padding:7px 9px;border-radius:11px;background:#f4f7fb;font-size:13px;line-height:1.55;word-break:keep-all}.lvp span{display:inline-block;margin-left:5px;font-weight:800;white-space:nowrap}.lvp .p{color:#1f7a42}.lvp .n{color:#c23b52}.lvp small{color:#5a6a88}';document.head.appendChild(st)})();
window.__plc=function(){var b=G.b.filter(function(q){return isZ(q.k)&&q.k.charAt(1)==='R'&&q.lv})[0];if(b){focus(b);SEL=b;openPanel(b)}return b?[b.x,b.y]:null};window.__plcI=function(){var I=plcInfo();return I?{n:I.L.length,avg:I.avg,up:I.up}:null};
