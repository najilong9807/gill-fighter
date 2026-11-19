/* ===== 마을 그림 갈아끼우기 준비 (21일 힉스필드 그림용) =====
   CITY_ART 에 적힌 건물만 svart/cb_<id>_<단계>.webp 그림으로 그리고, 없거나 못 읽으면 지금 코드 그림 그대로.
   단계 t: 레벨이 t 이상이면 그 그림(예 {t:[1,10,20]} → Lv1~9 · 10~19 · 20~).
   그림 규칙: 투명 배경 · 위에서 비스듬히(2:1 아이소) · 아래 끝 = 땅 마름모 아래 꼭짓점 · 여백 잘라서(art_import.py 가 자름)
   맞춤값: s(폭 배율, 기본 1.04 = 땅 폭보다 살짝 큼) · b(바닥 위치, 1 = 마름모 아래 꼭짓점) · dx(좌우 밀기) */
var CITY_ART={
};
try{var _cat=localStorage.getItem('gfcity.artTest');if(_cat){var _co=JSON.parse(_cat);for(var _k in _co)CITY_ART[_k]=_co[_k]}}catch(e){}
function caTier(id,L){var c=CITY_ART[id];if(!c)return 0;var t=0;(c.t||[1]).forEach(function(x){if(L>=x)t=x});return t}
function caSrc(id,t){return 'svart/cb_'+id+'_'+t+'.webp'}
var CA_IMG={},CA_CV={};
function caLoad(src,cb){var o=CA_IMG[src];if(!o){o=CA_IMG[src]={im:new Image(),ok:0,cb:[]};o.im.onload=function(){o.ok=1;var q=o.cb;o.cb=[];q.forEach(function(f){try{f()}catch(e){}})};o.im.onerror=function(){o.ok=-1;o.cb=[]};o.im.src=src}
  if(o.ok===1)cb();else if(o.ok===0)o.cb.push(cb);return o}
/* 땅 기준 그림판(W×H, 2배)에 붙여 둔 것 — 같은 그림 · 같은 단계는 한 장을 같이 씀 */
function caCanvas(k,src,bp){var key=src+(bp?'b':'');if(CA_CV[key])return CA_CV[key];var im=CA_IMG[src].im,c=CITY_ART[k]||{},n=sz(k)||1,
  dw=96*n*(c.s||1.04),dh=dw*im.naturalHeight/Math.max(1,im.naturalWidth),bot=GY+24*n*(c.b==null?1:c.b),cv2=document.createElement('canvas');
  cv2.width=W*2;cv2.height=H*2;var x=cv2.getContext('2d');x.scale(2,2);x.drawImage(im,GX-dw/2+(c.dx||0),bot-dh,dw,dh);
  if(bp){x.globalCompositeOperation='source-in';x.fillStyle='rgba(225,240,255,.78)';x.fillRect(0,0,W,H)}
  return CA_CV[key]={cv:cv2,top:Math.max(4,bot-dh)}}
var _artCA=art;art=function(k,L,bp){var key=k+L+(bp?'b':'');if(IMG[key])return IMG[key];var o=_artCA(k,L,bp),t=caTier(k,Math.max(1,L));if(!t)return o;
  var src=caSrc(k,t);caLoad(src,function(){var r=caCanvas(k,src,bp);o.img=r.cv;o.top=r.top;o.ok=true});return o};
var _thumbCA=thumb;thumb=function(k){var t=caTier(k,1);return t&&!(CA_IMG[caSrc(k,t)]&&CA_IMG[caSrc(k,t)].ok<0)?caSrc(k,t):_thumbCA(k)};
window.__cityArt={tier:caTier,src:caSrc,list:function(){return CITY_ART},focus:function(k,z){var b=bOf(k);if(b){if(z)cam.z=z;focus(b)}return !!b}};
