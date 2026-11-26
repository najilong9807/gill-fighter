/* ===== 공공 서비스 범위(소방 · 순찰 · 병원) · 영토 확장 ===== */
var SVC={fire:{b:1,n:'🚒 소방',ic:'🚒'},police:{b:2,n:'👮 순찰',ic:'👮'},clinic:{b:4,n:'🏥 병원',ic:'🏥'}},COV={};
function svcR(lv){return 5+Math.floor(lv*.7)}
function covCalc(){COV={};G.b.forEach(function(b){var S2=SVC[b.k];if(!S2||!b.lv)return;var s=sz(b.k),cx=b.x+(s-1)/2,cy=b.y+(s-1)/2,r=svcR(b.lv);
  for(var i=-r;i<=r;i++)for(var j=-r;j<=r;j++)if(Math.abs(i)+Math.abs(j)<=r*1.25){var k=Math.round(cx+i)+','+Math.round(cy+j);COV[k]=(COV[k]|0)|S2.b}})}
function svcWhy(b,to){var c=COV[b.x+','+b.y]|0,w=[];if(to>=3&&!(c&1))w.push('🚒 소방서 범위 안이어야 해요');if(to>=4&&!(c&2))w.push('👮 순찰대 범위 안이어야 해요');if(to>=5&&!(c&4))w.push('🏥 병원 범위 안이어야 해요');return w}

/* --- 땅: 16칸 구획, 처음엔 가운데 2×2(32×32), 산호궁 레벨 · 진주로 넓힘 --- */

function ownInit(){if(G.own)return;G.own={};var m=Math.floor(N/CK/2);for(var a=m-1;a<=m;a++)for(var b=m-1;b<=m;b++)G.own[a+','+b]=1;
  G.b.forEach(function(x){G.own[Math.floor(x.x/CK)+','+Math.floor(x.y/CK)]=1});for(var k in G.road){var q=k.split(',');G.own[Math.floor(q[0]/CK)+','+Math.floor(q[1]/CK)]=1}}
function own(i,j){return !!G.own[Math.floor(i/CK)+','+Math.floor(j/CK)]}
function chunkN(){return Object.keys(G.own).length}
function chunkCost(){var n=chunkN()-4;return {pearl:Math.round(800*Math.pow(1.55,n)/100)*100,lv:3+n*2}}
function buyable(a,b){if(G.own[a+','+b]||a<0||b<0||a>=N/CK||b>=N/CK)return false;return !!(G.own[(a-1)+','+b]||G.own[(a+1)+','+b]||G.own[a+','+(b-1)]||G.own[a+','+(b+1)])}
var SIGNS=[];
function drawLand(){SIGNS=[];var M=N/CK,c=chunkCost();for(var a=0;a<M;a++)for(var b=0;b<M;b++){if(!buyable(a,b))continue;var p=sc(a*CK+CK/2-.5,b*CK+CK/2-.5);if(p.x<-60||p.x>VW+60||p.y<-60||p.y>VH+60)continue;
  var ok=hallLv()>=c.lv;ctx.save();ctx.translate(p.x,p.y);ctx.fillStyle=ok?'#fffdf7':'#e6e9ef';ctx.strokeStyle=OUT;ctx.lineWidth=2.5;rr(-46,-34,92,40,12);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(-6,6);ctx.lineTo(0,16);ctx.lineTo(6,6);ctx.fill();ctx.stroke();
  ctx.font='800 13px "Jua",-apple-system,sans-serif';ctx.textAlign='center';ctx.fillStyle=OUT;ctx.fillText(ok?'🗺 영토 확장':'🔒 🏛Lv.'+c.lv,0,-17);ctx.fillText(ok?'🫧'+fmt(c.pearl):'에 열려요',0,-2);ctx.restore();SIGNS.push({a:a,b:b,x:p.x,y:p.y-14})}}
function landPanel(sg){var c=chunkCost(),el=$('panel'),ok=hallLv()>=c.lv,h='<button class="x" id="pX">✕</button><h2>🗺 영토 확장</h2><div class="box">게 일꾼들이 말뚝을 박고 길을 내어 16×16칸 새 땅을 열어요 · 바위 · 덤불이 있어요<div class="cost">'+costHtml({pearl:c.pearl})+' · 🏛 산호궁 Lv.'+c.lv+(ok?' ✓':'')+'</div><p class="tip">한 번에 한 칸씩 열려요 · 다음 칸은 🏛 산호궁 Lv.'+(c.lv+2)+'</p></div><div class="row"><button id="lBuy"'+(ok&&WAL.get('pearl')>=c.pearl?'':' disabled')+'>열기</button></div>'+(ok?'':'<p class="why">산호궁 Lv.'+c.lv+'이 되면 열 수 있어요</p>');
  el.innerHTML=h;el.hidden=false;panelFor=null;$('pX').onclick=closePanel;$('lBuy').onclick=function(){if(WAL.get('pearl')<c.pearl||hallLv()<c.lv)return;pushUndo('영토 확장');setTimeout(endAct,0);WAL.add('pearl',-c.pearl);G.own[sg.a+','+sg.b]=1;closePanel();snd('done');sparkle(sg.x,sg.y,24);toast('🗺 새 땅이 열렸어요! · 다음 칸은 🏛 산호궁 Lv.'+(c.lv+2));addXP(20);save()}}
function fogTile(key,i,j,p,w,h){if(own(i,j)||G.groad&&G.groad[key])return;diamond(p.x,p.y,w+1,h+1);ctx.fillStyle='rgba(12,40,70,.42)';ctx.fill()}
ownInit();
