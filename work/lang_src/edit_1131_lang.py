# 1.1.31 다국어 틀: work/index.html 고치고 같은 바꾸기를 patch_add.json 에 더함(한 번만 돌릴 것)
import json,sys
W='work/index.html';s=open(W,encoding='utf-8').read();P=json.load(open('patch_add.json',encoding='utf-8'))
city=[x for x in P if x.get('f')=='www/city.html' or (x.get('b','').startswith('/* 아가미시티(물고기 마을) 입구'))]
rest=[x for x in P if x not in city]
add=[]
def rep(a,b):
    global s
    assert s.count(a)==1,('anchor',a[:60],s.count(a));s=s.replace(a,b);add.append({'a':a,'b':b})
EARLY=r'''<title>아가미 파이터</title>
<script src="lang/index.js"></script>
<script>/* 1.1.31 다국어: 언어를 가장 먼저 정하고, ko · en · ja · es · vi 말고는 lang/<언어>.js 꾸러미를 먼저 읽는다(본문 스크립트보다 앞) */
(function(){var LP=window.GF_LP||[],A=['ko','en','ja','es','vi'].concat(LP);
  var NAME={ko:'한국어',en:'English',ja:'日本語',zht:'繁體中文',zhs:'简体中文',es:'Español',pt:'Português',fr:'Français',de:'Deutsch',it:'Italiano',nl:'Nederlands',ru:'Русский',uk:'Українська',pl:'Polski',tr:'Türkçe',id:'Bahasa Indonesia',ms:'Bahasa Melayu',vi:'Tiếng Việt',th:'ไทย',hi:'हिन्दी',ar:'العربية',he:'עברית',sv:'Svenska',da:'Dansk',no:'Norsk',fi:'Suomi',cs:'Čeština',sk:'Slovenčina',hu:'Magyar',ro:'Română',hr:'Hrvatski',el:'Ελληνικά',ca:'Català'};
  function dev(n){n=(n+'').toLowerCase();if(n.indexOf('zh')===0)return /hant|-tw|-hk|-mo/.test(n)?'zht':'zhs';if(/^(nb|nn|no)\b/.test(n))return 'no';if(/^iw\b/.test(n))return 'he';if(/^in\b/.test(n))return 'id';return n.slice(0,2)}
  var l='';try{var m=/[?&]lang=([a-z]{2,3})/.exec(location.search||'');if(m&&A.indexOf(m[1])>=0)l=m[1]}catch(e){}
  if(!l)try{var r=JSON.parse(localStorage.getItem('fishproto.save2')||'{}');if(r&&A.indexOf(r.lang)>=0)l=r.lang}catch(e){}
  if(!l){var ls=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||'en'];for(var i=0;i<ls.length&&!l;i++){var c=dev(ls[i]);if(A.indexOf(c)>=0)l=c}}
  l=l||'en';window.GF_LC=l;window.gfLangPick=function(){return l};
  window.GF_LANGLIST=function(){var o=['ko','en','ja','zht','zhs','es','pt','fr','de','it','nl','ru','uk','pl','tr','id','ms','vi','th','hi','ar','he','sv','da','no','fi','cs','sk','hu','ro','hr','el','ca'].filter(function(k){return A.indexOf(k)>=0});return o.map(function(k){return [k,NAME[k]]})};
  if(LP.indexOf(l)>=0)document.write('<script src="lang/'+l+'.js"><\/script>');
  /* 제목 글꼴(Jua · Black Han Sans)은 한글 · 기본 라틴 글자만 있어서, 그 밖의 글자를 쓰는 언어는 기기 글꼴로 */
  var css='';if(/^(zht|zhs|vi|pl|cs|sk|hu|ro|hr|tr|ru|uk|el|ar|he|hi|th)$/.test(l))css+=':root{--disp:system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans",sans-serif!important}body,body *{font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans",sans-serif!important}b,strong,h1,h2,h3,button,.chip b{font-weight:700}';
  if(l==='ar'||l==='he')css+='body *{unicode-bidi:plaintext}';
  if(css)document.write('<style id="gfLangCss">'+css+'</style>')})();</script>'''
rep('<title>아가미 파이터</title>',EARLY)
i=s.find("LANG=(function(){var l=''; /* 1.1.28");j=s.find("return l})();",i)+len("return l})();")
old=s[i:j];assert old.count('\n')<8
rep(old,"LANG=(function(){var l=window.gfLangPick?gfLangPick():'en'; /* 1.1.31: 언어는 맨 앞 스크립트(GF_LC)에서 정함. ko · en · ja 말고는 화면 글자만 SUBL 표에서 찾고 코드 분기는 영어로 */\n  if(l!=='ko'&&l!=='en'&&l!=='ja'){SUBL=l;l='en'}\n  return l})();")
rep("var TRX=TRX_ALL[SUBL]||{};","var TRX=TRX_ALL[SUBL]||window.GF_TRX||{};")
rep("if(l==='es'||l==='vi'){SUBL=l;LANG='en'}else{SUBL='';LANG=l}","if(l!=='ko'&&l!=='en'&&l!=='ja'){SUBL=l;LANG='en'}else{SUBL='';LANG=l}")
rep("[['ko','한국어'],['en','English'],['ja','日本語'],['es','Español'],['vi','Tiếng Việt']].forEach(function(o){","(window.GF_LANGLIST?GF_LANGLIST():[['ko','한국어'],['en','English'],['ja','日本語'],['es','Español'],['vi','Tiếng Việt']]).forEach(function(o){")
rep("}[SUBL];\n  for(k in M)EX[k]=M[k];","}[SUBL]||window.GF_M||{};\n  for(k in M)EX[k]=M[k];")
rep("]]}[SUBL];\n  function tx(t)","]]}[SUBL]||(window.GF_R||[]).map(function(q){return [new RegExp(q[0]),q[1]]});\n  function tx(t)")
rep("}}[SUBL];\n  function txl","}}[SUBL]||window.GF_LAB||{};\n  function txl")
# 언어 버튼이 많아지면 3줄 칸으로
rep("lgw.className='dd-seg langseg';","lgw.className='dd-seg langseg'+((window.GF_LP||[]).length?' many':'');")
open(W,'w',encoding='utf-8').write(s)
P=rest+add+city
json.dump(P,open('patch_add.json','w',encoding='utf-8'),ensure_ascii=False)
print('ok',len(add),len(P))
