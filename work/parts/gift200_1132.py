# 1.1.32 늑구 '신규는 이제 빼 · 누적 다운로드 200명 감사 공지 · 진주 만 개 보석 오백 개씩 지금 이용하는 모든 사람에게'
# - 1.1.32 를 처음 켤 때 이미 플레이한 적이 있으면 '지금 이용하는 사람'(save.cur132=1), 새로 깐 사람은 0
# - '꾸준히 해 줘서 고마워요' 선물(g1116)은 cur132=1 인 사람만 → 새로 깐 사람 빠짐
# - 다운로드 200명 감사 선물(g1123): cur132=1 인 사람에게 한 번, 진주 10,000 · 보석 500, 12월 31일까지. 홈에서 다른 창이 없을 때 창으로
# - 게임 안 1.1.32 소식: 머리말(감사 인사) + 선물 한 줄. 버전 1.1.32
import json
W='work/index.html'
w=open(W,encoding='utf-8').read();p=json.load(open('patch_add.json',encoding='utf-8'))
js=lambda o:json.dumps(o,ensure_ascii=False,separators=(',',':'))
def rep(a,b):
    global w
    assert w.count(a)==1,(a[:60],w.count(a));w=w.replace(a,b);p.append({'a':a,'b':b})

rep("var APP_VER='1.1.31',","var APP_VER='1.1.32',")
for tail in ['OTHER_SWIFT_FLAGS','PRODUCT_BUNDLE_IDENTIFIER']:
    p.append({'f':'ios/App/App.xcodeproj/project.pbxproj','a':'MARKETING_VERSION = 1.1.31;\n\t\t\t\t'+tail,'b':'MARKETING_VERSION = 1.1.32;\n\t\t\t\t'+tail})

K1='다운로드 200명 감사 선물'
K2='누적 다운로드 200명을 넘었어요! 함께해 주셔서 고마워요 · 지금 함께하는 모든 분께 드려요'
TR={
'en':("200 Downloads Thank-You Gift","We passed 200 total downloads! Thank you for being here · a gift for everyone playing now"),
'ja':("200ダウンロード感謝プレゼント","累計ダウンロードが200人を超えました！遊んでくれてありがとう・いま遊んでいるみなさんへ"),
'es':("Regalo por 200 descargas","¡Superamos las 200 descargas! Gracias por estar aquí · un regalo para todos los que juegan ahora"),
'vi':("Quà cảm ơn 200 lượt tải","Đã vượt 200 lượt tải! Cảm ơn bạn đã đồng hành · quà cho mọi người đang chơi"),
'zht':("200 次下載感謝禮","累計下載突破 200 人！謝謝你的陪伴・送給現在一起玩的每個人"),
'zhs':("200 次下载感谢礼","累计下载突破 200 人！谢谢你的陪伴・送给现在一起玩的每个人"),
'pt':("Presente de 200 downloads","Passamos de 200 downloads! Obrigado por estar aqui · um presente para todos que jogam agora"),
'fr':("Cadeau des 200 téléchargements","Plus de 200 téléchargements ! Merci d’être là · un cadeau pour tous ceux qui jouent en ce moment"),
'de':("Dankeschön für 200 Downloads","Über 200 Downloads! Danke, dass du dabei bist · ein Geschenk für alle, die gerade spielen"),
'it':("Regalo per 200 download","Abbiamo superato i 200 download! Grazie di esserci · un regalo per tutti quelli che giocano ora"),
'nl':("Bedankcadeau voor 200 downloads","Meer dan 200 downloads! Bedankt dat je erbij bent · een cadeau voor iedereen die nu speelt"),
'ru':("Подарок за 200 загрузок","Игру скачали больше 200 раз! Спасибо, что вы с нами · подарок для всех, кто играет сейчас"),
'uk':("Подарунок за 200 завантажень","Понад 200 завантажень! Дякуємо, що ви з нами · подарунок для всіх, хто грає зараз"),
'pl':("Prezent za 200 pobrań","Ponad 200 pobrań! Dziękujemy, że jesteś z nami · prezent dla wszystkich, którzy teraz grają"),
'tr':("200 İndirme Teşekkür Hediyesi","200 indirmeyi geçtik! Burada olduğun için teşekkürler · şu an oynayan herkese bir hediye"),
'id':("Hadiah 200 Unduhan","Sudah lebih dari 200 unduhan! Terima kasih sudah bermain · hadiah untuk semua yang sedang bermain"),
'ms':("Hadiah 200 Muat Turun","Sudah melebihi 200 muat turun! Terima kasih kerana bersama kami · hadiah untuk semua yang bermain sekarang"),
'th':("ของขวัญขอบคุณ 200 ดาวน์โหลด","ยอดดาวน์โหลดเกิน 200 แล้ว! ขอบคุณที่อยู่ด้วยกัน · ของขวัญสำหรับทุกคนที่เล่นอยู่ตอนนี้"),
'hi':("200 डाउनलोड का धन्यवाद उपहार","200 से ज़्यादा डाउनलोड हो गए! साथ रहने के लिए धन्यवाद · अभी खेल रहे सभी के लिए उपहार"),
'ar':("هدية شكر 200 تنزيل","تجاوزنا 200 تنزيل! شكرًا لوجودك معنا · هدية لكل من يلعب الآن"),
'he':("מתנת תודה ל-200 הורדות","עברנו 200 הורדות! תודה שאתם איתנו · מתנה לכל מי שמשחק עכשיו"),
'sv':("Tack för 200 nedladdningar","Över 200 nedladdningar! Tack för att du är med · en gåva till alla som spelar nu"),
'da':("Tak for 200 downloads","Over 200 downloads! Tak fordi du er med · en gave til alle, der spiller nu"),
'no':("Takk for 200 nedlastinger","Over 200 nedlastinger! Takk for at du er med · en gave til alle som spiller nå"),
'fi':("Kiitoslahja 200 latauksesta","Yli 200 latausta! Kiitos, että olet mukana · lahja kaikille, jotka pelaavat nyt"),
'cs':("Dárek za 200 stažení","Přes 200 stažení! Díky, že jste s námi · dárek pro všechny, kdo teď hrají"),
'sk':("Darček za 200 stiahnutí","Viac ako 200 stiahnutí! Ďakujeme, že ste s nami · darček pre všetkých, ktorí teraz hrajú"),
'hu':("Köszönetajándék 200 letöltésért","Több mint 200 letöltés! Köszönjük, hogy velünk vagy · ajándék mindenkinek, aki most játszik"),
'ro':("Cadou pentru 200 de descărcări","Am depășit 200 de descărcări! Mulțumim că ești aici · un cadou pentru toți cei care joacă acum"),
'hr':("Poklon za 200 preuzimanja","Više od 200 preuzimanja! Hvala što ste s nama · poklon za sve koji sada igraju"),
'el':("Δώρο για 200 λήψεις","Ξεπεράσαμε τις 200 λήψεις! Ευχαριστούμε που είστε εδώ · δώρο για όλους όσους παίζουν τώρα"),
'ca':("Regal per 200 descàrregues","Hem superat les 200 descàrregues! Gràcies per ser-hi · un regal per a tothom que juga ara")}
assert len(TR)==32
V1={k:v[0] for k,v in TR.items()};V2={k:v[1] for k,v in TR.items()}

blk=("/* ===== 1.1.32 늑구 '신규는 이제 빼 · 누적 다운로드 200명 감사 공지 · 진주 만 개 보석 오백 개 지금 이용하는 모든 사람에게' =====\n"
"   - 1.1.32 를 처음 켤 때 이미 플레이한 적이 있으면 지금 이용하는 사람(save.cur132=1), 새로 깐 사람은 0\n"
"   - '꾸준히 해 줘서 고마워요' 선물(g1116)도 cur132=1 만 → 새로 깐 사람 빠짐\n"
"   - 다운로드 200명 감사 선물(g1123): cur132=1 인 사람에게 기기마다 한 번, 진주 10,000 · 보석 500, 12월 31일까지 ===== */\n"
"try{(function(){var K1="+js(K1)+",K2="+js(K2)+",V1="+js(V1)+",V2="+js(V2)+";TRT[K1]=V1.en;TRT[K2]=V2.en;TRJ[K1]=V1.ja;TRJ[K2]=V2.ja;if(SUBL){if(V1[SUBL])TRX[K1]=V1[SUBL];if(V2[SUBL])TRX[K2]=V2[SUBL]}\n"
"  if(save.cur132==null){save.cur132=((save.runs|0)>0||save.onb||(save.mp&&save.mp.games>0)||Object.keys(save.best||{}).length>0)?1:0;persist()}\n"
"  var g16B=gift16Ok;gift16Ok=function(){return save.cur132===1&&g16B()};\n"
"  var G={k:'g1123',p:10000,g:500,until:new Date(2026,11,31,23,59,59).getTime()};\n"
"  function ok(){try{return save.cur132===1&&!save[G.k]&&Date.now()<=G.until}catch(e){return false}}\n"
"  function claim(){if(save[G.k])return;save[G.k]=1;save.pearls=(save.pearls||0)+G.p;save.gems=(save.gems||0)+G.g;persist();try{buzzBuy()}catch(e){}try{refreshHome(true)}catch(e){}banner(T('선물을 받았어요!'),T('진주 10,000 · 보석 500'));try{crumb('gift200')}catch(e){}}\n"
"  function show(){var el=$('gift200');if(!el){el=document.createElement('div');el.className='overlay';el.id='gift200';el.hidden=true;el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');\n"
"    el.innerHTML='<div class=\"panel aw-panel g16-panel\"><div class=\"g16-ico\" aria-hidden=\"true\">🎉</div><h1></h1><p class=\"lead\"></p><p class=\"g16-n\"><span><i class=\"aw-pearl\" aria-hidden=\"true\"></i><b>10,000</b></span><span><i class=\"g16-gem\" aria-hidden=\"true\">💎</i><b>500</b></span></p><button class=\"btn\" type=\"button\" id=\"g200Get\"></button></div>';document.body.appendChild(el);\n"
"    $('g200Get').addEventListener('click',function(){el.hidden=true;try{document.body.classList.remove('ovOpen')}catch(e){}claim()})}\n"
"    el.querySelector('h1').textContent=T(K1);el.querySelector('.lead').textContent=T(K2);$('g200Get').textContent=T('선물 받기');el.hidden=false}\n"
"  function busy(){try{return state!=='home'||awayBusy()||gift16Ok()||Array.prototype.some.call(document.querySelectorAll('.overlay'),function(o){return !o.hidden&&o.id!=='banner'})}catch(e){return true}}\n"
"  function check(n){n=n||0;if(!ok())return;if(busy()){if(n<240)setTimeout(function(){check(n+1)},2500);return}show()}\n"
"  setTimeout(check,6000);var erG=endRun;endRun=function(){var r=erG.apply(this,arguments);try{setTimeout(check,4000)}catch(e){}return r};\n"
"  try{NEWS_LEAD['1.1.32']=T(K2);NEWS['1.1.32']=[T(K1)+' · '+T('진주 10,000 · 보석 500')].concat(NEWS['1.1.32']||[])}catch(e){}\n"
"})()}catch(e){}\n")
A="if(window.claude&&window.claude.hot&&window.claude.hot.ready)window.claude.hot.ready(boot);else boot();"
rep(A,blk+A)
open(W,'w',encoding='utf-8').write(w);json.dump(p,open('patch_add.json','w',encoding='utf-8'),ensure_ascii=False);print('patch_add',len(p))
