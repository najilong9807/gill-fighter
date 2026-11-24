/* ===== 다국어(en · ja · es · vi): 화면에 나가는 글을 마지막 순간에 바꿔 끼운다 =====
   한국어 원문은 소스에 그대로 두고, innerHTML · textContent · 캔버스 글씨 · confirm 을 가로채 번역한다.
   순서: ① 틀(t, 정규식 · 변수가 낀 문장) → ② 낱말 표(d, 긴 것부터) → ③ 숫자 단위(일 · 시간 · 분 · 초 · 칸 · 개 · 마리 · 만)
   표는 i18n/<언어>.json → build.py 가 I18N 으로 묶어 넣는다. 열쇠 목록은 i18n/extract.py 가 뽑는다. */
(function(){
var L='ko';
try{var m=/[?&]lang=([a-z]{2,3})/.exec(location.search||'');if(m)L=m[1];
  else{var r=JSON.parse(localStorage.getItem('fishproto.save2')||'{}');if(r&&/^(ko|en|ja|es|vi)$/.test(r.lang))L=r.lang;
    else{var n=(((navigator.languages&&navigator.languages[0])||navigator.language||'en')+'').toLowerCase();L=n.indexOf('ko')===0?'ko':n.indexOf('ja')===0?'ja':n.indexOf('es')===0?'es':n.indexOf('vi')===0?'vi':'en'}}}catch(e){}
window.CITY_LANG=L;try{document.documentElement.lang=L}catch(e){}
/* 한국어: 이름 뒤 '을(를) · 이(가)'를 받침 보고 바로 고쳐 보여 줌(원문은 다른 언어 번역 열쇠라 그대로 둠) */
if(L==='ko'){var JX=/([\s\S])((?:<\/b>)?)(을\(를\)|이\(가\)|은\(는\))/g,DB='0136780';
  var jo=function(s){if(typeof s!=='string'||s.indexOf('(')<0||!JX.test(s))return s;JX.lastIndex=0;return s.replace(JX,function(_,c,tg,p){var h=c.charCodeAt(0),b=null;if(h>=0xAC00&&h<=0xD7A3)b=(h-0xAC00)%28!==0;else if(/\d/.test(c))b=DB.indexOf(c)>=0;if(b===null)return _;var f0=p.charAt(0);return c+tg+(f0==='을'?(b?'을':'를'):f0==='은'?(b?'은':'는'):(b?'이':'가'))})};
  window.CITY_TR=jo;try{var k1=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');Object.defineProperty(Element.prototype,'innerHTML',{get:k1.get,set:function(v){k1.set.call(this,jo(v))},configurable:true})}catch(e){}
  try{var k2=Object.getOwnPropertyDescriptor(Node.prototype,'textContent');Object.defineProperty(Node.prototype,'textContent',{get:k2.get,set:function(v){k2.set.call(this,jo(v))},configurable:true})}catch(e){}
  return}
var IX=(typeof I18N!=='undefined'&&I18N)||{};if(!IX[L]&&window.I18N_X)IX[L]=window.I18N_X;if(!IX[L]&&L!=='ko'&&IX.en){L='en';window.CITY_LANG='en';try{document.documentElement.lang='en'}catch(e){}}
if(!IX[L]){window.CITY_TR=function(s){return s};return}
/* 베트남어: 제목 글꼴(Black Han Sans · Jua)에 성조 글자가 없어 글자가 섞여 보임 → 기기 글꼴로 */
if(/^(vi|zht|zhs|pl|cs|sk|hu|ro|hr|tr|ru|uk|el|ar|he|hi|th)$/.test(L)){try{var st=document.createElement('style');st.textContent=':root{--disp:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}body,button,input{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif!important}.card b,h2,.main,#bBuild{font-weight:800!important}';document.head.appendChild(st)}catch(e){}}
/* 일본어는 띄어쓰기가 없어 낱말 단위 줄바뀜을 끈다 */
if(L==='ja'){try{var sj=document.createElement('style');sj.textContent='html,body,button{word-break:normal;line-break:strict}';document.head.appendChild(sj)}catch(e){}}
if(L==='ar'||L==='he'){try{var sr=document.createElement('style');sr.textContent='body *{unicode-bidi:plaintext}';document.head.appendChild(sr)}catch(e){}}
var P=IX[L],D=P.d||{},U=P.u||{},HAN=/[가-힣]/;
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
var T=(P.t||[]).map(function(q){return [new RegExp(q[0],'g'),q[1]]});
/* '🦀 게 일꾼'처럼 그림 + 낱말인 열쇠는 낱말 열쇠가 따로 있으면 뺀다(더 긴 '게 일꾼 숙소'를 가로막지 않게) */
Object.keys(D).forEach(function(k){var m=/^([^0-9A-Za-z가-힣<>]+)(.+)$/.exec(k);if(m&&D[m[2]]!=null&&D[k]===m[1]+D[m[2]])delete D[k]});
var keys=Object.keys(D).sort(function(a,b){return b.length-a.length});
var RX=keys.length?new RegExp(keys.map(esc).join('|'),'g'):null;
var cache={},cn=0,MISS={};
function units(o){
  o=o.replace(/(\d+(?:\.\d+)?)만/g,function(_,v){return U.man?v+U.man:(Math.round(v*100)/10)+'K'});
  return o.replace(/(\d)\s?(시간|마리|일|분|초|칸|개)(?![가-힣])/g,function(_,d,u){return d+(U[u]!=null?U[u]:'')})}
function sub(t,a){return t.replace(/\$(\d)/g,function(_,n){return tr(a[+n]==null?'':a[+n])})}
function tr(s){if(typeof s!=='string'||!HAN.test(s))return s;var c=cache[s];if(c!==undefined)return c;var o=s;
  for(var i=0;i<T.length&&HAN.test(o);i++){var rep=T[i][1];o=o.replace(T[i][0],function(){return sub(rep,arguments)})}
  if(RX&&HAN.test(o))o=o.replace(RX,function(k){return D[k]});
  if(HAN.test(o))o=units(o);
  if(HAN.test(o))MISS[s]=o;
  if(cn>3000){cache={};cn=0}cache[s]=o;cn++;return o}
window.CITY_TR=tr;window.__i18nMiss=MISS;
/* 가로채기 */
try{var d1=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');Object.defineProperty(Element.prototype,'innerHTML',{get:d1.get,set:function(v){d1.set.call(this,tr(v))},configurable:true})}catch(e){}
try{var d2=Object.getOwnPropertyDescriptor(Node.prototype,'textContent');Object.defineProperty(Node.prototype,'textContent',{get:d2.get,set:function(v){d2.set.call(this,tr(v))},configurable:true})}catch(e){}
try{var C=CanvasRenderingContext2D.prototype;['fillText','strokeText','measureText'].forEach(function(f){var o=C[f];C[f]=function(){if(typeof arguments[0]==='string'&&HAN.test(arguments[0]))arguments[0]=tr(arguments[0]);return o.apply(this,arguments)}})}catch(e){}
try{var cf=window.confirm;window.confirm=function(s){return cf.call(window,tr(s))}}catch(e){}
/* 처음부터 있던 글(틀 HTML) */
function walk(n){if(n.nodeType===3){if(HAN.test(n.nodeValue))n.nodeValue=tr(n.nodeValue)}else if(n.nodeType===1&&n.tagName!=='SCRIPT'&&n.tagName!=='STYLE'){['aria-label','title'].forEach(function(a){var v=n.getAttribute(a);if(v&&HAN.test(v))n.setAttribute(a,tr(v))});for(var c=n.firstChild;c;c=c.nextSibling)walk(c)}}
try{walk(document.body);if(HAN.test(document.title))document.title=tr(document.title)}catch(e){}
})();
