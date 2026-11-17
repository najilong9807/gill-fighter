/* ===== 1.1.29 늑구 '눈 쌓이는 효과도 주고 날씨 매번 다르게 햇살 짱짱 진눈깨비 폭설 느낌으로 다양하게'
   겨울(크리스마스 기간 · 12~2월) 수족관 날씨: 2시간마다 바뀜(날짜로 정해져서 모두 같은 날씨)
   ☀️ 햇살 쨍쨍(밤엔 ✨ 맑은 밤) 30% · 🌨️ 눈 조금 30% · 🌧️ 진눈깨비 15% · ❄️ 폭설 25%
   - 햇살: 오른쪽 위 해 + 흔들리는 빛줄기 + 반짝임, 내리던 눈 멈춤 / 진눈깨비: 비스듬한 빗줄기 + 젖은 눈, 살짝 회색 / 폭설: 바람에 날리는 큰 눈 + 하얀 안개
   - 쌓인 눈: 지난 24시간 날씨로 계산(저장 없음). 폭설 +.45 · 눈 조금 +.2 · 진눈깨비 -.05 · 햇살 -.35(2시간마다), 지금 칸 안에서는 서서히
     바닥에 눈 이불 + 소품 그림 윗면을 따라 눈 모자(그림 투명도로 윗면을 찾음)
   - 시간 표시(밤 · 01:07 🎄) 뒤에 날씨 아이콘, 수족관에 들어올 때 날씨가 바뀌었으면 한 번 알림 ===== */
var AQWX_F=null,AQWX_SEEN=0;
var AQWX_W={clear:{ko:'☀️ 햇살 쨍쨍',en:'☀️ Sunny',ja:'☀️ 快晴',es:'☀️ Soleado',vi:'☀️ Nắng đẹp'},night:{ko:'✨ 맑은 밤',en:'✨ Clear night',ja:'✨ 晴れた夜',es:'✨ Noche despejada',vi:'✨ Đêm quang'},
  flurry:{ko:'🌨️ 눈 조금',en:'🌨️ Light snow',ja:'🌨️ 小雪',es:'🌨️ Nieve ligera',vi:'🌨️ Tuyết nhẹ'},sleet:{ko:'🌧️ 진눈깨비',en:'🌧️ Sleet',ja:'🌧️ みぞれ',es:'🌧️ Aguanieve',vi:'🌧️ Mưa tuyết'},
  blizzard:{ko:'❄️ 폭설',en:'❄️ Blizzard',ja:'❄️ 大雪',es:'❄️ Ventisca',vi:'❄️ Bão tuyết'},
  s_snow:{ko:'바닥과 소품에 눈이 쌓여요',en:'Snow is piling up on the sand and decor',ja:'砂やかざりに雪がつもります',es:'La nieve se acumula en la arena y la decoración',vi:'Tuyết phủ lên cát và đồ trang trí'},
  s_melt:{ko:'쌓인 눈이 녹아요',en:'The snow is melting',ja:'つもった雪がとけていきます',es:'La nieve se derrite',vi:'Tuyết đang tan'},
  s_sleet:{ko:'젖은 눈이 섞여 내려요',en:'Wet snow mixed with rain',ja:'雨まじりの雪が降っています',es:'Cae nieve mezclada con lluvia',vi:'Tuyết ướt lẫn mưa'}};
function wxW(k){var L=AQWX_W[k]||{};return L[SUBL||LANG]||L.en||L.ko||k}
function wxOn(){try{return !!(WN||aqSeason()==='winter')}catch(e){return false}}
function wxH(n){var s=Math.sin(n*78.233+12.9898)*43758.5453;return s-Math.floor(s)}
function wxBlock(){return Math.floor(Date.now()/7200000)}
function wxI(b){var x=(b*2654435761)>>>0;x^=x>>>15;x=Math.imul(x,2246822519)>>>0;x^=x>>>13;x=Math.imul(x,3266489917)>>>0;x^=x>>>16;return (x>>>0)/4294967296}
function wxAt(b){var r=wxI(b);return r<.3?'clear':r<.6?'flurry':r<.75?'sleet':'blizzard'}
function aqWx(){if(AQWX_F)return AQWX_F;if(!wxOn())return null;return wxAt(wxBlock())}
var WX_D={clear:-.35,flurry:.2,sleet:-.05,blizzard:.45};
function wxDepth(){if(AQWX_F){return AQWX_F==='clear'?0:AQWX_F==='sleet'?.35:AQWX_F==='flurry'?.55:1}if(!wxOn())return 0;
  var b=wxBlock(),d=0,i;for(i=b-12;i<b;i++)d=clamp(d+WX_D[wxAt(i)],0,1);var fr=(Date.now()%7200000)/7200000;return clamp(d+WX_D[wxAt(b)]*fr,0,1)}
function wxLabel(){var w=aqWx();if(!w)return '';return wxW(w==='clear'&&aqNight()?'night':w)}

/* 원래 내리던 큰 눈(겨울 이벤트): 햇살엔 멈추고, 진눈깨비엔 옅게, 폭설엔 두 겹 */
var xmSnowBigWX=xmSnowBig;xmSnowBig=function(c,W,H,par){var w=page==='tank'?aqWx():null;if(!w||w==='flurry')return xmSnowBigWX.apply(this,arguments);
  if(w==='clear')return;if(w==='sleet'){c.save();c.globalAlpha*=.45;xmSnowBigWX.call(this,c,W,H,par);c.restore();return}
  xmSnowBigWX.call(this,c,W,H,par);c.save();c.translate(W*.43,-H*.27);c.scale(1.15,1.15);xmSnowBigWX.call(this,c,W,H,(par||0)+W*.3);c.restore()};

/* 화면 날씨 효과(화면 좌표) */
function aqWxFx(){var w=aqWx();if(!w)return;var c=ctx,W=cw,H=ch,nt=aqNight(),lite=save.lite||reduce,i,n;c.save();c.setTransform(dpr,0,0,dpr,0,0);
  if(w==='clear'&&!nt){var sx=W*.64-tankCam*.03,sy=H*.24;c.globalCompositeOperation='lighter';c.globalAlpha=.7;c.drawImage(glow('255,214,140'),sx-W*.55,sy-W*.55,W*1.1,W*1.1);c.globalAlpha=1;var sg=c.createRadialGradient(sx,sy,0,sx,sy,W*.6);sg.addColorStop(0,'rgba(255,240,190,.45)');sg.addColorStop(.35,'rgba(255,225,160,.16)');sg.addColorStop(1,'rgba(255,220,150,0)');c.fillStyle=sg;c.fillRect(sx-W*.6,sy-W*.6,W*1.2,W*1.2);c.drawImage(glow('255,248,215'),sx-W*.16,sy-W*.16,W*.32,W*.32);var dg=c.createRadialGradient(sx,sy,0,sx,sy,W*.06);dg.addColorStop(0,'rgba(255,255,245,1)');dg.addColorStop(.6,'rgba(255,248,210,.85)');dg.addColorStop(1,'rgba(255,240,190,0)');c.fillStyle=dg;c.beginPath();c.arc(sx,sy,W*.06,0,Math.PI*2);c.fill();
    for(i=0;i<6;i++){var a=-.38+i*.13+Math.sin(t*.25+i*1.7)*.035,len=H*1.25,wd=W*(.05+.04*wxH(i+3)),al=.22+.1*Math.sin(t*.6+i*2.1);var g=c.createLinearGradient(sx,sy,sx-Math.sin(a)*len,sy+Math.cos(a)*len);g.addColorStop(0,'rgba(255,240,190,'+al.toFixed(3)+')');g.addColorStop(1,'rgba(255,240,190,0)');
      c.fillStyle=g;c.beginPath();c.moveTo(sx,sy);c.lineTo(sx-Math.sin(a-.03)*len-wd,sy+Math.cos(a)*len);c.lineTo(sx-Math.sin(a+.03)*len+wd,sy+Math.cos(a)*len);c.closePath();c.fill()}
    n=lite?10:24;for(i=0;i<n;i++){var tw=Math.max(0,Math.sin(t*(1.2+wxH(i+40))+i*2.3));if(tw<.55)continue;var px=wxH(i+60)*W,py=H*(.12+.6*wxH(i+80)),r=1.5+2.5*wxH(i+90);c.globalAlpha=(tw-.55)*2;c.drawImage(glow('255,250,215'),px-r*3,py-r*3,r*6,r*6)}
    c.globalCompositeOperation='source-over';c.globalAlpha=1;c.fillStyle='rgba(255,226,160,.06)';c.fillRect(0,0,W,H)}
  else if(w==='sleet'){c.fillStyle='rgba(110,130,160,.1)';c.fillRect(0,0,W,H);n=lite?30:70;c.lineCap='round';
    for(i=0;i<n;i++){var sp=H*(1.1+.6*wxH(i+7)),y=((wxH(i+11)*H*1.3+t*sp)%(H*1.3))-H*.15,x=((wxH(i+13)*W*1.3-t*sp*.26-tankCam*.12)%(W*1.3)+W*1.3)%(W*1.3)-W*.1,L=10+12*wxH(i+17);
      c.strokeStyle=i%4?'rgba(215,232,255,.55)':'rgba(255,255,255,.75)';c.lineWidth=i%4?1.1:1.8;c.beginPath();c.moveTo(x,y);c.lineTo(x-L*.26,y+L);c.stroke()}
    n=lite?8:18;c.fillStyle='rgba(240,246,255,.8)';for(i=0;i<n;i++){var sp2=H*(.35+.2*wxH(i+21)),y2=((wxH(i+23)*H*1.2+t*sp2)%(H*1.2))-H*.1,x2=((wxH(i+29)*W*1.2+Math.sin(t+i)*12-t*sp2*.15)%(W*1.2)+W*1.2)%(W*1.2)-W*.1;c.beginPath();c.ellipse(x2,y2,2.2,1.6,0,0,Math.PI*2);c.fill()}}
  else if(w==='blizzard'){var gust=Math.sin(t*.45)*.5+Math.sin(t*1.3)*.2,wind=W*(.22+.18*gust);var hz=c.createLinearGradient(0,0,0,H);hz.addColorStop(0,'rgba(235,242,255,.1)');hz.addColorStop(1,'rgba(240,246,255,'+(.2+.06*gust).toFixed(3)+')');c.fillStyle=hz;c.fillRect(0,0,W,H);
    n=lite?50:120;c.fillStyle='#FFFFFF';for(i=0;i<n;i++){var z=.4+.6*wxH(i+31),fs=H*(.16+.22*z),y3=((wxH(i+37)*H*1.2+t*fs)%(H*1.2))-H*.1,x3=((wxH(i+41)*W*1.4+t*wind*z+Math.sin(t*2+i)*8-tankCam*.2*z)%(W*1.4)+W*1.4)%(W*1.4)-W*.2,r3=(1.1+2.6*z)*Math.min(1.4,Math.max(.8,Math.min(W,H)/420));
      c.globalAlpha=.75+.25*z;c.beginPath();c.ellipse(x3,y3,r3*1.25,r3,.4,0,Math.PI*2);c.fill()}
    if(!lite){c.globalAlpha=1;c.lineCap='round';for(i=0;i<6;i++){var ph=(t*.35+wxH(i+51))%1,yy=H*(.15+.7*wxH(i+53)),xx=-W*.3+ph*W*1.6,al2=Math.sin(ph*Math.PI)*(.12+.1*Math.max(0,gust));c.strokeStyle='rgba(255,255,255,'+al2.toFixed(3)+')';c.lineWidth=2+3*wxH(i+57);c.beginPath();c.moveTo(xx,yy);c.quadraticCurveTo(xx+W*.15,yy-H*.02,xx+W*.32,yy+H*.01);c.stroke()}}}
  c.restore()}
var drawTankFxWX=drawTankFx;drawTankFx=function(B,W,H,cm){var r=drawTankFxWX.apply(this,arguments);try{if(page==='tank'&&!VISIT)aqWxFx()}catch(e){}return r};

/* 바닥에 쌓인 눈(월드 좌표, 바닥 그린 뒤 · 소품 그리기 전) */
var drawTankFloorWX=drawTankFloor;drawTankFloor=function(){var r=drawTankFloorWX.apply(this,arguments);try{if(page!=='tank'||VISIT)return r;var d=wxDepth();if(d<.03)return r;
  var x0=Math.floor((tankCam-60-xOff()/tankZ)/12)*12,x1=tankCam+viewW()+60,x,nt=aqNight(),th=ch*.03*d,c=ctx;
  c.beginPath();for(x=x0;x<=x1;x+=12){var f=floorAt(x),k=.72+.28*Math.sin(x*.029+1)+.14*Math.sin(x*.093);c[x===x0?'moveTo':'lineTo'](x,f-th*k)}for(x=x1;x>=x0;x-=12)c.lineTo(x,floorAt(x)+th*.45);c.closePath();
  var g=c.createLinearGradient(0,floorY()-th,0,floorY()+th);g.addColorStop(0,nt?'#E4ECFA':'#FFFFFF');g.addColorStop(1,nt?'#B9C8E4':'#DCE8F6');c.fillStyle=g;c.fill();
  c.beginPath();for(x=x0;x<=x1;x+=12){var f2=floorAt(x),k2=.72+.28*Math.sin(x*.029+1)+.14*Math.sin(x*.093);c[x===x0?'moveTo':'lineTo'](x,f2-th*k2)}c.lineWidth=1.4;c.strokeStyle='rgba(255,255,255,.95)';c.stroke();
  if(!(save.lite||reduce)){c.save();c.globalCompositeOperation='lighter';for(var i=0;i<26;i++){var sx=x0+((wxH(i+101)*(x1-x0)+Math.floor(t*.3+wxH(i+5))*97)%(x1-x0)),tw=Math.max(0,Math.sin(t*(2+wxH(i+7))+i));if(tw<.6)continue;c.globalAlpha=(tw-.6)*2;var sy=floorAt(sx)-th*.5;c.drawImage(glow('255,255,255'),sx-4,sy-4,8,8)}c.restore()}}catch(e){}return r};

/* 소품 윗면 눈 모자: 그림 투명도로 윗면 높이를 32칸으로 재 둠 */
function wxTop(o){if(o.wxt)return o.wxt;var N=48,Hh=96,top=[];try{var cv2=document.createElement('canvas');cv2.width=N;cv2.height=Hh;var x=cv2.getContext('2d');x.drawImage(o.lit,0,0,N,Hh);var dd=x.getImageData(0,0,N,Hh).data;
  for(var j=0;j<N;j++){var v=-1;for(var yy=0;yy<Hh;yy++)if(dd[(yy*N+j)*4+3]>150){v=yy/Hh;break}top.push(v)}}catch(e){top=[]}o.wxt=top;return top}
var drawDecoItemWX=drawDecoItem;drawDecoItem=function(D,x,y,w,flip,dim,sd){var r=drawDecoItemWX.apply(this,arguments);try{if(page!=='tank'||VISIT||decoThumbMode||!D||D.prop)return r;var dp=wxDepth();if(dp<.06)return r;var o=decoArt(D);if(!o||!o.lit)return r;
  var c=DART[D.draw],h=w*(D.ar||1),ai=o.h/o.w,iw=w*(c.kw||1),ih=iw*ai,hk=c.hk||1.3;if(ih>h*hk){ih=h*hk;iw=ih/ai}var by=h*.47,top=wxTop(o),N=top.length;if(!N)return r;
  var T=dp*Math.max(1.6,iw*.032),nt=aqNight(),segs=[],cur=[],lv=-1,cwd=iw/N,j;
  for(j=0;j<N;j++){var v=top[j];if(v<0||v>.92||(cur.length&&Math.abs(v-lv)*ih>Math.max(T*1.5,cwd*1.25))){if(cur.length>2)segs.push(cur);cur=[];if(v<0||v>.92)continue}cur.push([-iw/2+(j+.5)/N*iw,by-ih+v*ih]);lv=v}if(cur.length>2)segs.push(cur);
  ctx.save();ctx.translate(x,y);if(flip)ctx.scale(-1,1);
  segs.forEach(function(S){var L=S.length,k;ctx.beginPath();for(k=0;k<L;k++){var f=Math.min(1,(k+.5)/2.2,(L-k-.5)/2.2),bump=.75+.25*Math.sin(k*1.9+(sd||0));ctx[k?'lineTo':'moveTo'](S[k][0],S[k][1]-T*f*bump)}for(k=L-1;k>=0;k--)ctx.lineTo(S[k][0],S[k][1]+T*.45);ctx.closePath();
    ctx.fillStyle=nt?'#DCE6F7':'#FAFCFF';ctx.fill();ctx.lineWidth=Math.max(.8,T*.25);ctx.strokeStyle=nt?'rgba(150,170,210,.55)':'rgba(160,190,225,.6)';ctx.stroke()});
  ctx.restore()}catch(e){}return r};

/* 시간 표시 뒤에 날씨 · 날씨가 바뀌었으면 수족관 들어올 때 한 번 알림 */
var aqTimePaintWX=aqTimePaint;aqTimePaint=function(){var r=aqTimePaintWX.apply(this,arguments);try{var b=$('aqTime'),w=aqWx();if(b&&w){var ic=wxLabel().split(' ')[0];if(b.textContent.slice(-ic.length)!==ic)b.textContent=b.textContent+'  '+ic}}catch(e){}return r};
var showTabWX=showTab;showTab=function(p){var r=showTabWX.apply(this,arguments);try{if(p==='tank'&&!VISIT){var w=aqWx(),bk=wxBlock();if(w&&save.wxSeen!==bk&&(save.runs|0)>=1){save.wxSeen=bk;persist();setTimeout(function(){try{if(page==='tank')banner(wxLabel(),wxW(w==='clear'?'s_melt':w==='sleet'?'s_sleet':'s_snow'))}catch(e){}},1400)}}}catch(e){}return r};
