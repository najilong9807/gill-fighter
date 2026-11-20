/* ===== 41차 🚦 교통: 길 막힘 · 길 넓히기 · 해류 버스 정류장 =====
   - 길 칸마다 '오가는 양' = 둘레 3칸 안 건물의 사람 수(집 주민 절반 · 가게 · 공방 · 생산 건물 일자리)를 거리에 따라 나눠 더함
   - 막힘 = 오가는 양 ÷ 길 넓이(모래길 1 · 자갈길 2.2배 · 산호 대로 4.5배). 1 넘으면 막힘
   - 막히면: 그 길에 붙은 건물 생산 최대 −40% · 집 입주 최대 −40% · 마을 행복 −(최대 10) · 구역 4단계부터는 막힘 1 이하여야 자람
   - 🛣 도로 탭 '⬆ 길 넓히기'(끌어서 칠함): 모래길 → 자갈길(🏛 Lv.5 · 40🫧 · 🪨20) → 산호 대로(🏛 Lv.12 · 120🫧 · 🪨60)
   - 🚌 해류 버스 정류장(⚙ 기반 · Lv.7 · 600🫧 · 여러 개): 둘레 4칸 길의 오가는 양 −35%
   - 🗺 지도 다섯째 '교통'. 저장 G.rt {칸: 2|3} */
var TCAP=60,RTM=[1,1,2.2,4.5],TL={},JAM={};
function rTier(k){return (G.rt&&G.rt[k])|0||1}
function tWeight(b){if(!b.lv)return 0;if(isZ(b.k)){var z=b.k.charAt(1);return z==='R'?(b.occ|0)*.5:z==='C'?ZN.C.jobs[b.lv]:ZN.I.jobs[b.lv]}if(b.k==='hall')return 10;if(JOBS[b.k])return JOBS[b.k]+b.lv;return 0}
function trafCalc(){var T={},bus={};G.b.forEach(function(b){var d0=DEC[b.k];if(d0&&d0.bus){var s0=sz(b.k),r0=d0.bus;for(var i=-r0;i<=r0;i++)for(var j=-r0;j<=r0;j++)if(Math.abs(i)+Math.abs(j)<=r0)bus[(b.x+i)+','+(b.y+j)]=1;return}
    var w=tWeight(b);if(!w)return;var s=sz(b.k),cx=b.x+(s-1)/2,cy=b.y+(s-1)/2,R=3,list=[],tot=0;
    for(var i=-R-1;i<=R+1;i++)for(var j=-R-1;j<=R+1;j++){var x=Math.round(cx+i),y=Math.round(cy+j),d=Math.abs(x-cx)+Math.abs(y-cy);if(d>R+s/2)continue;if(!G.road[x+','+y])continue;var f=1-d/(R+2);list.push([x+','+y,f]);tot+=f}
    if(!tot)return;list.forEach(function(q){T[q[0]]=(T[q[0]]||0)+w*q[1]/tot*6})});
  var J={};for(var k in T){var v=T[k]*(bus[k]?.65:1);T[k]=v;J[k]=v/(TCAP*RTM[rTier(k)])}TL=T;JAM=J}
function jamAt(k){return JAM?(JAM[k]||0):0}
function bJam(b){var s=sz(b.k),m=0;for(var i=-1;i<=s;i++)for(var j=-1;j<=s;j++){if((i<0||i>=s)&&(j<0||j>=s))continue;if(i>=0&&i<s&&j>=0&&j<s)continue;var k=(b.x+i)+','+(b.y+j);if(G.road[k])m=Math.max(m,jamAt(k))}return m}
function trafM(b){var j=bJam(b);return j>1?Math.max(.6,1-(j-1)*.4):1}
var _fieldsT=fields;fields=function(){_fieldsT.apply(this,arguments);try{trafCalc()}catch(e){}};
var _ratesT=rates;rates=function(b){var o=_ratesT.apply(this,arguments);if(b.k==='hall'||isZ(b.k))return o;var m=trafM(b);if(m<1)for(var q in o)o[q]*=m;return o};
/* 길 넓히기 도구 */
var RUP=[null,null,{at:5,p:40,s:20,n:'자갈길'},{at:12,p:120,s:60,n:'산호 대로'}];
TOOLN.rup='⬆ 길 넓히기';
var _paintT=paintAt;paintAt=function(x,y){if(TOOL!=='rup'){var r=_paintT.apply(this,arguments);try{if(TOOL==='clear'&&G.rt){var t0=tileAt(x,y),k0=t0.i+','+t0.j;if(!G.road[k0]&&G.rt[k0]){delete G.rt[k0];cityF=0}}}catch(e){}return r}
  var t=tileAt(x,y),k=t.i+','+t.j;if(k===lastPaint||!inb(t.i,t.j))return;lastPaint=k;if(!G.road[k]||G.groad&&G.groad[k])return;var cur=rTier(k),nx=RUP[cur+1];if(!nx){return}
  if(hallLv()<nx.at){toast('🏛 산호궁 Lv.'+nx.at+'에 '+nx.n+'이(가) 열려요');return}if(WAL.get('pearl')<nx.p){toast('진주가 모자라요');return}if((G.res.stone||0)<nx.s){toast('🪨 산호석이 모자라요');return}
  WAL.add('pearl',-nx.p);G.res.stone-=nx.s;G.rt=G.rt||{};G.rt[k]=cur+1;cityF=0;snd('tap');var p=sc(t.i,t.j);dust(p.x,p.y,5,.6);float(p.x,p.y-16,nx.n,true);gfEv('rup')};
var _startToolT=startTool;startTool=function(t){var r=_startToolT.apply(this,arguments);if(t==='rup'){try{var s=$('toolbar').querySelector('.tl small');if(s)s.textContent='끌어서 길을 넓혀요 · 자갈길 40🫧 🪨20 · 산호 대로 120🫧 🪨60 · 이동은 두 손가락';if(VIEW!==5){VIEW=4;viewBtn()}}catch(e){}}return r};
var _endToolT=endTool;endTool=function(){var was=TOOL;var r=_endToolT.apply(this,arguments);if(was==='rup'&&VIEW===5){VIEW=VIEWS.length-1;viewBtn()}return r};
var _showCatT=showCat;showCat=function(c){var r=_showCatT.apply(this,arguments);if(c==='road'){try{var w=$('tray').querySelector('.tools1');if(w&&!w.querySelector('[data-tool=rup]')){var L=hallLv(),b=document.createElement('button');b.dataset.tool='rup';if(L<5)b.className='off';
  b.innerHTML='<b>⬆ 길 넓히기</b><i>'+(L<5?'🔒 🏛Lv.5':'막힌 길을 자갈길 · 산호 대로로')+'</i>';b.onclick=function(){if(hallLv()<5){toast('🏛 산호궁 Lv.5에 열려요');return}startTool('rup')};w.insertBefore(b,w.querySelector('.tip'))}}catch(e){}}return r};
/* 길 색: 자갈길 · 산호 대로 */
var RTC=[null,null,'#d6d2c8','#f4d8cf'];
var _drawTilesT=drawTiles;drawTiles=function(t){_drawTilesT.apply(this,arguments);if(!G.rt)return;var w=TW*cam.z,h=TH*cam.z,V=visB();for(var k in G.rt){var q=k.split(','),i=+q[0],j=+q[1];if(i<V.i0||i>V.i1||j<V.j0||j>V.j1||!G.road[k])continue;var p=sc(i,j);if(p.x<-w||p.x>VW+w||p.y<-h||p.y>VH+h)continue;
  var T2=G.rt[k];diamond(p.x,p.y,w*.86,h*.86);ctx.fillStyle=RTC[T2];ctx.fill();if(T2===2&&cam.z>.5){ctx.fillStyle='rgba(120,120,130,.35)';for(var n=0;n<5;n++){var a=hh(i*5+j*7+n),c=hh(i*11+j*3+n);ctx.beginPath();ctx.arc(p.x+(a-.5)*w*.5,p.y+(c-.5)*h*.5,1.6*cam.z,0,7);ctx.fill()}}
  if(T2===3){ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=Math.max(1,2*cam.z);ctx.setLineDash([4*cam.z,4*cam.z]);ctx.beginPath();var hor=isRoad(i+1,j)||isRoad(i-1,j);if(hor){ctx.moveTo(p.x-w*.25,p.y-h*.25);ctx.lineTo(p.x+w*.25,p.y+h*.25)}else{ctx.moveTo(p.x+w*.25,p.y-h*.25);ctx.lineTo(p.x-w*.25,p.y+h*.25)}ctx.stroke();ctx.setLineDash([])}}};
/* 지도: 교통 */
VIEWS.push('교통');
var _viewTintT=viewTint;viewTint=function(key,i,j,p,w,h){if(VIEW!==5)return _viewTintT.apply(this,arguments);var c;if(G.road[key]){var v=jamAt(key);c=v<.7?'rgba(70,200,110,.55)':v<1?'rgba(255,200,60,.6)':'rgba(235,70,60,.65)'}else c='rgba(30,40,70,.22)';diamond(p.x,p.y,w,h);ctx.fillStyle=c;ctx.fill()};
var _viewBtnT=viewBtn;viewBtn=function(){var r=_viewBtnT.apply(this,arguments);if(VIEW===5)$('legend').innerHTML='<i style="background:#46c86e"></i> 한산 <i style="background:#ffc83c"></i> 붐빔 <i style="background:#eb463c"></i> 막힘 · ⬆ 길 넓히기 · 🚌 버스 정류장으로 풀어요';return r};
window.__traf={stat:function(){var a=[];for(var k in JAM)a.push(JAM[k]);a.sort(function(x,y){return x-y});var n=a.length;return {n:n,p50:a[n>>1],p90:a[Math.floor(n*.9)],max:a[n-1],over:a.filter(function(v){return v>1}).length}},cap:function(v){TCAP=v;trafCalc();return window.__traf.stat()},
 paint:function(t){var n=0;G.rt=G.rt||{};for(var k in JAM)if(JAM[k]>1){G.rt[k]=t||2;n++}trafCalc();return n},bus:function(x,y){G.b.push({id:G.nid++,k:'d_bus',x:x,y:y,lv:1,buf:{}});occ();fields();return window.__traf.stat()}};
