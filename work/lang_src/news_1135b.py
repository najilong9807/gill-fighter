# 1.1.35 소식 두 줄 더(life.js · 오늘의 마을 일 Lv.2): 게임 안 소식(work/index.html + patch_add 같은 항목) 맨 앞 + 스토어 새 소식 39 로캘 맨 앞
# 저장소 맨 위에서 python3 work/lang_src/news_1135b.py (다시 돌려도 한 번만)
import json
K=["마을: 🫧 보물 방울이 가끔 떠올라요 · 누르면 진주 · 재료 · 공사 단축을 받아요","마을: 지금 올릴 수 있는 건물에 초록 ⬆ 표시 · 오늘의 마을 일은 산호궁 Lv.2부터"]
X={
'en':["Town: 🫧 treasure bubbles float up now and then — tap one for Pearls, materials or build time","Town: buildings you can upgrade now show a green ⬆ · Daily town tasks start at Coral Hall Lv.2"],
'ja':["町：🫧 宝のあわがときどき浮かんできます。タップで真珠・資材・工事短縮がもらえます","町：今アップグレードできる建物に緑の⬆ · 今日の町の仕事はサンゴ宮Lv.2から"],
'es':["Pueblo: 🫧 de vez en cuando suben burbujas del tesoro; tócalas para ganar Perlas, materiales o tiempo de obra","Pueblo: los edificios que ya puedes mejorar muestran un ⬆ verde · las tareas diarias empiezan en el Salón de Coral Nv 2"],
'vi':["Làng: 🫧 thỉnh thoảng có bong bóng kho báu nổi lên — chạm để nhận Ngọc trai, vật liệu hoặc rút ngắn thời gian xây","Làng: công trình nâng cấp được ngay có dấu ⬆ xanh · Việc làng hôm nay mở từ Cung San hô Lv.2"],
'ar':["القرية: 🫧 تطفو فقاعات الكنز أحيانًا — المسها لتحصل على لآلئ أو مواد أو تقليل وقت البناء","القرية: المباني التي يمكنك ترقيتها الآن تظهر عليها ⬆ خضراء · مهام القرية اليومية تبدأ من قاعة المرجان مستوى 2"],
'ca':["Poble: 🫧 de tant en tant pugen bombolles del tresor; toca-les per guanyar Perles, materials o temps d'obra","Poble: els edificis que ja pots millorar mostren una ⬆ verda · les tasques diàries comencen a la Sala de Corall Nv.2"],
'cs':["Městečko: 🫧 občas vyplují bubliny s pokladem — klepni a získej perly, materiál nebo zkrácení stavby","Městečko: budovy, které lze hned vylepšit, mají zelenou ⬆ · denní úkoly začínají od Korálové síně úr. 2"],
'da':["By: 🫧 skattebobler stiger op en gang imellem — tryk for perler, materialer eller kortere byggetid","By: bygninger, du kan opgradere nu, viser en grøn ⬆ · daglige byopgaver starter ved Koralhallen Niv.2"],
'de':["Dorf: 🫧 ab und zu steigen Schatzblasen auf – tippe für Perlen, Material oder kürzere Bauzeit","Dorf: Gebäude, die du jetzt verbessern kannst, zeigen ein grünes ⬆ · tägliche Dorfaufgaben ab Korallenhalle Lv.2"],
'el':["Χωριό: 🫧 πότε πότε ανεβαίνουν φούσκες θησαυρού — πατήστε για μαργαριτάρια, υλικά ή λιγότερο χρόνο κατασκευής","Χωριό: τα κτίρια που αναβαθμίζονται τώρα δείχνουν πράσινο ⬆ · οι ημερήσιες εργασίες ξεκινούν από Κοραλλένιο Μέγαρο επ. 2"],
'fi':["Kylä: 🫧 aarrekuplia nousee välillä — napauta ja saat helmiä, materiaaleja tai lyhyemmän rakennusajan","Kylä: nyt päivitettävissä olevissa rakennuksissa on vihreä ⬆ · päivän kylätehtävät alkavat Korallisalin tasolta 2"],
'fr':["Village : 🫧 des bulles au trésor remontent de temps en temps — touchez-les pour des Perles, des matériaux ou du temps de chantier","Village : les bâtiments améliorables tout de suite affichent un ⬆ vert · les tâches du jour débutent au Palais de corail Nv 2"],
'he':["כפר: 🫧 מדי פעם עולות בועות אוצר — הקישו כדי לקבל פנינים, חומרים או קיצור בנייה","כפר: מבנים שאפשר לשדרג עכשיו מסומנים ב-⬆ ירוק · משימות הכפר היומיות נפתחות מאולם האלמוגים רמה 2"],
'hi':["गाँव: 🫧 कभी-कभी खज़ाने के बुलबुले ऊपर आते हैं — छूकर मोती, सामग्री या निर्माण समय में कटौती पाएँ","गाँव: जिन इमारतों को अभी अपग्रेड कर सकते हैं उन पर हरा ⬆ · आज के गाँव के काम कोरल हॉल Lv.2 से"],
'hr':["Selo: 🫧 povremeno isplivaju mjehurići s blagom — dodirni za bisere, materijal ili kraću gradnju","Selo: zgrade koje sada možeš nadograditi imaju zelenu ⬆ · dnevni zadaci sela od Koraljne dvorane razine 2"],
'hu':["Falu: 🫧 időnként kincsbuborékok úsznak fel — koppints rájuk gyöngyért, nyersanyagért vagy rövidebb építésért","Falu: a most fejleszthető épületeken zöld ⬆ látszik · a napi falusi feladatok a Korallcsarnok 2. szintjétől"],
'id':["Desa: 🫧 sesekali gelembung harta melayang naik — ketuk untuk Mutiara, bahan, atau mempercepat bangunan","Desa: bangunan yang bisa ditingkatkan sekarang diberi ⬆ hijau · tugas desa harian mulai dari Aula Karang Lv.2"],
'it':["Villaggio: 🫧 ogni tanto salgono bolle del tesoro — toccale per Perle, materiali o tempo di costruzione","Villaggio: gli edifici migliorabili subito mostrano una ⬆ verde · i compiti del giorno partono dalla Sala di corallo Lv.2"],
'ms':["Kampung: 🫧 sesekali gelembung harta naik — ketik untuk Mutiara, bahan atau masa bina lebih singkat","Kampung: bangunan yang boleh dinaik taraf sekarang ada ⬆ hijau · tugasan harian bermula di Dewan Karang Lv.2"],
'nl':["Dorp: 🫧 af en toe stijgen schatbellen op — tik voor Parels, materialen of kortere bouwtijd","Dorp: gebouwen die je nu kunt verbeteren tonen een groene ⬆ · dagelijkse dorpstaken vanaf Koraalhal Lv.2"],
'no':["By: 🫧 av og til stiger skattebobler opp — trykk for perler, materialer eller kortere byggetid","By: bygninger du kan oppgradere nå, viser en grønn ⬆ · daglige byoppgaver starter ved Korallhallen niv. 2"],
'pl':["Wioska: 🫧 co jakiś czas wypływają bańki ze skarbem — dotknij, by zdobyć perły, materiały lub skrócić budowę","Wioska: budynki do ulepszenia mają zieloną ⬆ · codzienne zadania od Koralowej Sali poz. 2"],
'pt':["Vila: 🫧 de vez em quando sobem bolhas do tesouro — toque para ganhar Pérolas, materiais ou tempo de obra","Vila: prédios que você já pode melhorar mostram uma ⬆ verde · tarefas diárias começam no Salão de Coral Nv.2"],
'ro':["Sat: 🫧 din când în când urcă bule cu comori — atinge-le pentru perle, materiale sau construcție mai scurtă","Sat: clădirile pe care le poți îmbunătăți acum au o ⬆ verde · sarcinile zilnice încep de la Sala de corali nv. 2"],
'ru':["Городок: 🫧 иногда всплывают пузыри с сокровищами — нажми и получи жемчуг, материалы или ускорение стройки","Городок: здания, которые можно улучшить сейчас, отмечены зелёной ⬆ · задания дня открываются с Кораллового зала ур. 2"],
'sk':["Mestečko: 🫧 občas vyplávajú bubliny s pokladom — ťukni a získaš perly, materiál alebo skrátenie stavby","Mestečko: budovy, ktoré môžeš hneď vylepšiť, majú zelenú ⬆ · denné úlohy od Koralovej siene úr. 2"],
'sv':["By: 🫧 ibland stiger skattbubblor upp — tryck för pärlor, material eller kortare byggtid","By: byggnader du kan uppgradera nu visar en grön ⬆ · dagliga byuppdrag börjar vid Korallhallen niv. 2"],
'th':["หมู่บ้าน: 🫧 บางครั้งจะมีฟองสมบัติลอยขึ้นมา — แตะเพื่อรับไข่มุก วัสดุ หรือลดเวลาก่อสร้าง","หมู่บ้าน: อาคารที่อัปเกรดได้ตอนนี้มี ⬆ สีเขียว · งานประจำวันเริ่มที่โถงปะการัง Lv.2"],
'tr':["Köy: 🫧 ara sıra hazine baloncukları yükselir — dokun, inci, malzeme ya da inşaat süresi kazan","Köy: şimdi yükseltilebilen binalarda yeşil ⬆ var · günlük köy görevleri Mercan Salonu Sv.2'den başlar"],
'uk':["Село: 🫧 час від часу спливають бульбашки зі скарбами — торкнись і отримай перли, матеріали чи пришвидшення будівництва","Село: будівлі, які можна покращити зараз, мають зелену ⬆ · завдання дня відкриваються з Коралової зали рів. 2"],
'zhs':["小镇：🫧 宝藏泡泡会不时浮上来，点一下可得珍珠、材料或缩短工期","小镇：现在可升级的建筑会显示绿色 ⬆ · 今日小镇任务从珊瑚宫 Lv.2 开放"],
'zht':["小鎮：🫧 寶藏泡泡會不時浮上來，點一下可得珍珠、材料或縮短工期","小鎮：現在可升級的建築會顯示綠色 ⬆ · 今日小鎮任務從珊瑚宮 Lv.2 開放"]}
# 스토어 로캘 → 게임 언어
LOC={'ar-SA':'ar','de-DE':'de','en-AU':'en','en-CA':'en','en-GB':'en','en-US':'en','es-ES':'es','es-MX':'es','fr-CA':'fr','fr-FR':'fr','nl-NL':'nl','pt-BR':'pt','pt-PT':'pt','zh-Hans':'zhs','zh-Hant':'zht','ko':'ko'}
# 게임 안 소식
p='work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open('patch_add.json',encoding='utf-8'))
A='try{(function(){var K=["마을: 건물 놓을'
if K[0] in s:print('news already')
else:
    i=s.index(A);j=s.index("NEWS['1.1.35']||[])})()}catch(e){}",i);blk=s[i:j]
    vs=blk.index(',V=')+3;ve=blk.index('};K.forEach')+1;V=json.loads(blk[vs:ve]);Kold=json.loads(blk[len('try{(function(){var K='):vs-3])
    for L in V:V[L]=X[L]+V[L]
    nb='try{(function(){var K='+json.dumps(K+Kold,ensure_ascii=False)+',V='+json.dumps(V,ensure_ascii=False)+blk[ve:]
    s=s.replace(blk,nb);open(p,'w',encoding='utf-8').write(s)
    n=0
    for r in pa:
        if 'b' in r and blk in r['b']:r['b']=r['b'].replace(blk,nb);n+=1
    assert n==1,n;open('patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('news ok',len(V))
# 스토어 새 소식
f='store/whatsnew_1135.json';o=json.load(open(f,encoding='utf-8'))
for loc in o:
    L=LOC.get(loc,loc);lines=K if L=='ko' else X[L]
    if lines[0] in o[loc]:continue
    o[loc]=''.join('- '+x+'\n' for x in lines)+o[loc];assert len(o[loc])<4000
json.dump(o,open(f,'w',encoding='utf-8'),ensure_ascii=False,indent=1);print('store ok',len(o))
