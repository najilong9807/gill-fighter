/* ===== 44차 💰 구역별 세율 (심시티처럼) =====
   - 주거 · 상업 · 산업 세율 0~20% (기본 9%). 🏛 산호궁 Lv.4에 열림(그 전엔 모두 9%)
   - 세금 = 지금 세금 × (주민 · 가게 일자리 · 공방 일자리 비중으로 섞은 세율 ÷ 9)
   - 올리면: 그 구역 수요 ▼(1%마다 −0.06), 주거는 행복 −1/%, 상업은 물건값이 올라 행복 −0.4/%
   - 내리면: 그 구역 수요 ▲, 주거는 행복 +0.6/%(최대 +5)
   - 저장 G.tax {R,C,I}. ☰ 메뉴 · 마을 현황에서 */
var TXD=9,TXMAX=20,TXAT=4;
function txOpen(){return hallLv()>=TXAT}
function txR(z){if(!txOpen()||!G.tax)return TXD;var v=G.tax[z];return v==null?TXD:v}
function txHappy(){var R=txR('R'),C=txR('C');return Math.round(Math.max(-14,Math.min(5,-Math.max(0,R-TXD)*1+Math.max(0,TXD-R)*.6-Math.ceil(Math.max(0,C-TXD)*.4))))}
function txDem(z){return (txR(z)-TXD)*.06}
function txMul(pop,jC,jI){var sR=pop,sC=jC*1.5,sI=jI*1.2,s=sR+sC+sI;if(!s)return txR('R')/TXD;return (sR*txR('R')+sC*txR('C')+sI*txR('I'))/(TXD*s)}
function taxPanel(){var el=$('panel'),h='<button class="x" id="pX">✕</button><h2>💰 세율</h2>';
  if(!txOpen()){h+='<div class="box">세율은 🏛 산호궁 Lv.'+TXAT+'에 열려요 · 그 전엔 모두 '+TXD+'%</div>';el.innerHTML=h;el.hidden=false;panelFor=null;$('pX').onclick=closePanel;return}
  var hp=txHappy();h+='<p class="role">올리면 진주가 더 들어오지만 그 구역 수요가 줄고(이사 · 가게 · 공방이 덜 생김) 행복이 내려가요 · 기본 '+TXD+'%</p><div class="wq">';
  ['R','C','I'].forEach(function(z){var Z=ZN[z],lock=hallLv()<Z.at,r=txR(z),d=-txDem(z),eff=(d>0?'<span class="pg">▲ 수요 +'+Math.round(d*100)+'%</span>':d<0?'<span class="pb">▼ 수요 −'+Math.round(-d*100)+'%</span>':'수요 그대로');
    if(z==='R'&&r!==TXD)eff+=' · '+(r>TXD?'<span class="pb">행복 −'+(r-TXD)+'</span>':'<span class="pg">행복 +'+Math.min(5,Math.round((TXD-r)*.6))+'</span>');if(z==='C'&&r>TXD)eff+=' · <span class="pb">물건값 ↑ 행복 −'+Math.ceil((r-TXD)*.4)+'</span>';
    h+='<div class="wqr'+(lock?'':' can')+'"><span class="ic">'+Z.ic+'</span><div class="tx"><b>'+Z.n+' '+r+'%</b><small>'+(lock?'🔒 🏛Lv.'+Z.at:eff)+'</small></div><button data-t="'+z+'" data-d="-1"'+(lock||r<=0?' disabled':'')+'>−</button><button data-t="'+z+'" data-d="1"'+(lock||r>=TXMAX?' disabled':'')+'>+</button></div>'});
  h+='</div><div class="box">세금 지금 시간당 🫧<b>'+fmt(Math.round(CS.tax||0))+'</b> · 세율 때문에 행복 '+(hp>0?'+':'')+hp+'</div><div class="row"><button class="sub" id="tReset">모두 '+TXD+'%로</button></div>';
  el.innerHTML=h;el.hidden=false;panelFor=null;$('pX').onclick=closePanel;
  el.querySelectorAll('[data-t]').forEach(function(b){b.onclick=function(){var z=b.dataset.t;G.tax=G.tax||{R:TXD,C:TXD,I:TXD};G.tax[z]=Math.max(0,Math.min(TXMAX,txR(z)+(+b.dataset.d)));cityF=0;snd('tap');gfEv('tax');save();try{cityT=0;cityTick(NOW())}catch(e){}taxPanel()}});
  $('tReset').onclick=function(){G.tax={R:TXD,C:TXD,I:TXD};cityF=0;snd('pop');save();taxPanel()}}
var _menuTx=menuPanel;menuPanel=function(){var r=_menuTx.apply(this,arguments);try{var g=$('panel').querySelector('.mgrid');if(g&&!g.querySelector('[data-m="tax"]')){var b=document.createElement('button');b.dataset.m='tax';
  b.innerHTML='💰<b>세율</b><small>'+(txOpen()?'🏠'+txR('R')+'% 🛍'+txR('C')+'% 🔧'+txR('I')+'%':'🏛 Lv.'+TXAT+'에 열려요')+'</small>';b.onclick=function(){taxPanel()};g.insertBefore(b,g.children[4]||null)}}catch(e){}return r};
var _lifeTx=lifePanel;lifePanel=function(){var r=_lifeTx.apply(this,arguments);try{var row=$('panel').querySelector('#lPol');if(row&&txOpen()){var b=document.createElement('button');b.className='sub';b.textContent='💰 세율';b.onclick=taxPanel;row.parentNode.insertBefore(b,row.nextSibling)}}catch(e){}return r};
window.__tax={set:function(R,C,I){G.tax={R:R,C:C,I:I};cityF=0;return [txHappy(),txDem('R'),txDem('C'),txDem('I')]},cs:function(){return {tax:CS.tax,happy:CS.happy,dem:CS.dem,pop:CS.pop}},open:function(){taxPanel();return 1}};
