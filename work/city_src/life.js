/* ===== 1.1.35 마을 더 살아 있게 (늑구 '마을 많이 부족하잖아' → 할 거리 · 보기 · 큰 마을 정리) =====
   ① 🫧 보물 방울: 마을을 보고 있으면 3~6분마다 큰 방울 하나가 바닥에서 떠오름(18초) → 누르면 진주 · 재료 · ⚡공사 단축. 하루 8번(G.tb)
      도미 비서 첫 단계(G.tut<3)와 산호궁 Lv.1 은 건너뜀 — 처음 배울 때 헷갈리지 않게
   ② 🐟 물고기 떼: 15~35초마다 작은 물고기 5~9마리가 화면 위쪽을 가로질러 헤엄침(화면 좌표 · 누를 수 없음 · 움직임 줄이기 설정이면 없음)
   ③ ⬆ 올릴 수 있는 건물: UPOK(game.js badge)를 1.5초마다 채움 — 🦀 칩 '지금 올릴 수 있어요'와 같은 기준 */
(function(){
  var RM=false;try{RM=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}

  /* ③ ⬆ */
  function upScan(){var o={};try{G.b.forEach(function(b){if(!b.job&&b.lv&&!isZ(b.k)&&!isD(b.k)&&B[b.k]&&b.lv<D.HMAX&&!canStart(b.k,b.lv+1).length)o[b.id]=1})}catch(e){}UPOK=o}
  setInterval(upScan,1500);setTimeout(upScan,300);

  /* ① 🫧 보물 방울 */
  var TB_DAY=8,tb=null,tbNext=NOW()+90000+Math.random()*60000;
  function tbDay(){var d=new Date(NOW()),k=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();if(!G.tb||G.tb.d!==k)G.tb={d:k,n:0};return G.tb}
  function tbOk(){return hallLv()>=2&&(G.tut|0)>=3&&tbDay().n<TB_DAY&&!document.hidden}
  function tbSpawn(){tb={x:VW*(.2+Math.random()*.6),y0:VH+40,t0:performance.now(),dur:18000,ph:Math.random()*6}}
  function tbPos(t){var e=(t-tb.t0)/tb.dur;return {x:tb.x+Math.sin(t*.0012+tb.ph)*26,y:tb.y0-(VH*.82+60)*e,e:e}}
  function tbReward(){var L=hallLv(),r=Math.random(),out;
    if(r<.45){var p=60+25*L;WAL.add('pearl',p);out='🫧+'+fmt(p)}
    else if(r<.8){var ks=['stone','kelp'];if(lvOf('kiln'))ks.push('brick');var k=ks[Math.floor(Math.random()*ks.length)],room=Math.max(0,Math.floor(cap(k)-(G.res[k]||0))),n=Math.min(room,k==='brick'?5+L:20+6*L);
      if(n<=0){var p2=60+25*L;WAL.add('pearl',p2);out='🫧+'+fmt(p2)}else{G.res[k]=(G.res[k]||0)+n;out=ICON[k]+'+'+fmt(n)}}
    else if(typeof boostAdd==='function'){boostAdd(10);out='⚡+10분'}
    else{WAL.add('gem',1);out='💎+1'}
    return out}
  function tbPop(){if(!tb)return false;var P=tbPos(performance.now());tb=null;var o=tbDay();o.n++;
    var got=tbReward();try{addXP(2)}catch(e){}save();try{hud()}catch(e){}snd('coin');sparkle(P.x,P.y,18);bubbleFx(P.x,P.y);float(P.x,P.y-20,got,1);toast('🫧 보물 방울을 터뜨렸어요 · '+got+' ('+o.n+'/'+TB_DAY+')');try{gfEv('tbub')}catch(e){}
    tbNext=NOW()+180000+Math.random()*180000;return true}
  function tbDraw(t){if(!tb){if(NOW()>=tbNext){if(tbOk())tbSpawn();else tbNext=NOW()+60000}return}
    var P=tbPos(t);if(P.e>=1){tb=null;tbNext=NOW()+120000+Math.random()*120000;return}
    var a=P.e<.08?P.e/.08:P.e>.9?(1-P.e)/.1:1,R=26+Math.sin(t*.005)*1.5;
    ctx.save();ctx.globalAlpha=a;
    var g=ctx.createRadialGradient(P.x-8,P.y-10,3,P.x,P.y,R);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.35,'rgba(200,245,255,.55)');g.addColorStop(1,'rgba(120,210,255,.35)');
    ctx.fillStyle=g;ctx.strokeStyle='rgba(255,255,255,.95)';ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(P.x,P.y,R,0,7);ctx.fill();ctx.stroke();
    ctx.font='22px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🎁',P.x,P.y+1);
    ctx.fillStyle='rgba(255,255,255,.9)';ctx.beginPath();ctx.ellipse(P.x-10,P.y-12,6,3.5,-.6,0,7);ctx.fill();
    if(Math.random()<.12)FX.push({k:'b',x:P.x+(Math.random()-.5)*R*1.6,y:P.y+R*.7,vx:(Math.random()-.5)*.4,vy:-.5,r:2+Math.random()*3,l:1,dl:.03});
    ctx.restore();tb.sx=P.x;tb.sy=P.y}
  var _tapL=tap;
  tap=function(x,y){if(tb&&!GH&&!TOOL&&tb.sx!=null&&Math.hypot(x-tb.sx,y-tb.sy)<38){tbPop();return}return _tapL.apply(this,arguments)};

  /* ② 🐟 물고기 떼 */
  var SCH=[],schNext=performance.now()+6000,FC=[['#ffd36b','#e8a23a'],['#8fe3ff','#4fb3e0'],['#ff9f8f','#e06a5a'],['#c8b6ff','#9a84e8']];
  function schSpawn(){var dir=Math.random()<.5?1:-1,n=5+Math.floor(Math.random()*5),y=VH*(.14+Math.random()*.4),c=FC[Math.floor(Math.random()*FC.length)],sp=(38+Math.random()*30)*dir,F=[];
    for(var i=0;i<n;i++)F.push({dx:-dir*(i*16+Math.random()*12),dy:(Math.random()-.5)*36,s:.75+Math.random()*.45,ph:Math.random()*6});
    SCH.push({x:dir>0?-60:VW+60,y:y,dir:dir,v:sp,F:F,c:c,t:performance.now()})}
  function fish(x,y,s,dir,c,w){ctx.save();ctx.translate(x,y);ctx.scale(dir*s,s);ctx.fillStyle=c[0];ctx.strokeStyle='rgba(34,48,77,.55)';ctx.lineWidth=1.2;
    ctx.beginPath();ctx.moveTo(-6,0);ctx.lineTo(-13,-5+w);ctx.lineTo(-13,5+w);ctx.closePath();ctx.fillStyle=c[1];ctx.fill();ctx.stroke();
    ctx.fillStyle=c[0];ctx.beginPath();ctx.ellipse(0,0,8,4.6,0,0,7);ctx.fill();ctx.stroke();ctx.fillStyle='#22304d';ctx.beginPath();ctx.arc(4,-1,1.1,0,7);ctx.fill();ctx.restore()}
  function schDraw(t,dt){if(RM)return;if(t>=schNext){if(SCH.length<2)schSpawn();schNext=t+15000+Math.random()*20000}
    SCH=SCH.filter(function(S){S.x+=S.v*dt;var gone=S.dir>0?S.x-200>VW:S.x+200<0;if(gone)return false;
      ctx.save();ctx.globalAlpha=.8;S.F.forEach(function(f){var w=Math.sin(t*.012+f.ph)*2.2;fish(S.x+f.dx,S.y+f.dy+Math.sin(t*.002+f.ph)*5,f.s*Math.max(.8,Math.min(1.2,cam.z+.4)),S.dir,S.c,w)});ctx.restore();return true})}

  var _fxL=drawFX,lt=0;
  drawFX=function(){var r=_fxL.apply(this,arguments);var t=performance.now(),dt=lt?Math.min(.05,(t-lt)/1000):0;lt=t;
    try{ctx.setTransform(DPR,0,0,DPR,0,0);schDraw(t,dt);tbDraw(t)}catch(e){}return r};
  window.__life={spawnBubble:function(){tbSpawn()},pop:tbPop,bub:function(){return tb},fish:function(){schSpawn();return SCH.length},up:function(){upScan();return Object.keys(UPOK).length},z:function(v){cam.z=v;clampCam()},tb:function(){return G.tb}};
})();
