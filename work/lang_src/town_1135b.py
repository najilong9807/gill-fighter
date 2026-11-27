# 1.1.35 '치우고 · 길 잇고 짓기'(conv.js ⑥) 새 문구 → i18n/en·ja·es·vi.json + lang/city_<언어>.js 끝(다시 돌려도 한 번만)
import json,os
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))+'/';MK='/* town_1135b */'
T=[r'🧹 (\d+)곳 치우기',r'🛣 길 (\d+)칸 잇기',r'🫧([^ <]+) 더 들어요'];K='✓를 누르면 같이 해요'
X={
'en':["🧹 clear $1 tiles","🛣 $1 road tiles","🫧$1 extra","Tap ✓ to do it all at once"],
'ja':["🧹 $1か所を片付け","🛣 道を$1マス","追加で🫧$1","✓でまとめて行います"],
'es':["🧹 despejar $1 casillas","🛣 $1 casillas de camino","🫧$1 extra","Toca ✓ para hacerlo todo a la vez"],
'vi':["🧹 dọn $1 ô","🛣 nối $1 ô đường","thêm 🫧$1","Chạm ✓ để làm tất cả cùng lúc"],
'ar':["🧹 تنظيف $1 خانات","🛣 $1 خانات طريق","🫧$1 إضافية","المس ✓ لتنفيذ الكل معًا"],
'ca':["🧹 netejar $1 caselles","🛣 $1 caselles de camí","🫧$1 més","Toca ✓ per fer-ho tot alhora"],
'cs':["🧹 vyklidit $1 políček","🛣 $1 políček cesty","🫧$1 navíc","Klepni na ✓ a udělá se vše najednou"],
'da':["🧹 ryd $1 felter","🛣 $1 vejfelter","🫧$1 ekstra","Tryk ✓ for at gøre det hele på én gang"],
'de':["🧹 $1 Felder räumen","🛣 $1 Straßenfelder","🫧$1 extra","Tippe ✓, um alles auf einmal zu erledigen"],
'el':["🧹 καθάρισμα $1 κελιών","🛣 $1 κελιά δρόμου","🫧$1 επιπλέον","Πατήστε ✓ για να γίνουν όλα μαζί"],
'fi':["🧹 raivaa $1 ruutua","🛣 $1 tieruutua","🫧$1 lisää","Napauta ✓ tehdäksesi kaiken kerralla"],
'fr':["🧹 dégager $1 cases","🛣 $1 cases de route","🫧$1 en plus","Touchez ✓ pour tout faire d’un coup"],
'he':["🧹 פינוי $1 משבצות","🛣 $1 משבצות דרך","🫧$1 נוספים","הקישו ✓ כדי לעשות הכול בבת אחת"],
'hi':["🧹 $1 खाने साफ़","🛣 $1 खाने सड़क","🫧$1 अतिरिक्त","सब एक साथ करने के लिए ✓ छुएँ"],
'hr':["🧹 očisti $1 polja","🛣 $1 polja ceste","🫧$1 više","Dodirni ✓ za sve odjednom"],
'hu':["🧹 $1 mező eltakarítása","🛣 $1 mező út","+🫧$1","Koppints a ✓-ra, és minden egyszerre megtörténik"],
'id':["🧹 bersihkan $1 petak","🛣 $1 petak jalan","🫧$1 tambahan","Ketuk ✓ untuk melakukan semuanya sekaligus"],
'it':["🧹 sgombra $1 caselle","🛣 $1 caselle di strada","🫧$1 in più","Tocca ✓ per fare tutto insieme"],
'ms':["🧹 bersihkan $1 petak","🛣 $1 petak jalan","🫧$1 tambahan","Ketik ✓ untuk buat semuanya sekali gus"],
'nl':["🧹 $1 vakken vrijmaken","🛣 $1 vakken weg","🫧$1 extra","Tik op ✓ om alles in één keer te doen"],
'no':["🧹 rydd $1 ruter","🛣 $1 veiruter","🫧$1 ekstra","Trykk ✓ for å gjøre alt på en gang"],
'pl':["🧹 oczyść $1 pól","🛣 $1 pól drogi","🫧$1 więcej","Dotknij ✓, by zrobić wszystko naraz"],
'pt':["🧹 limpar $1 casas","🛣 $1 casas de estrada","🫧$1 a mais","Toque em ✓ para fazer tudo de uma vez"],
'ro':["🧹 curăță $1 pătrate","🛣 $1 pătrate de drum","🫧$1 în plus","Atinge ✓ ca să faci totul deodată"],
'ru':["🧹 расчистить клеток: $1","🛣 дорога: $1 кл.","ещё 🫧$1","Нажмите ✓, чтобы сделать всё сразу"],
'sk':["🧹 vyčistiť $1 políčok","🛣 $1 políčok cesty","🫧$1 navyše","Ťukni na ✓ a urobí sa všetko naraz"],
'sv':["🧹 röj $1 rutor","🛣 $1 vägrutor","🫧$1 extra","Tryck på ✓ för att göra allt på en gång"],
'th':["🧹 เคลียร์ $1 ช่อง","🛣 ถนน $1 ช่อง","เพิ่ม 🫧$1","แตะ ✓ เพื่อทำทั้งหมดในครั้งเดียว"],
'tr':["🧹 $1 kare temizle","🛣 $1 kare yol","+🫧$1","Hepsini birden yapmak için ✓'ye dokun"],
'uk':["🧹 розчистити клітинок: $1","🛣 дорога: $1 кл.","ще 🫧$1","Натисніть ✓, щоб зробити все одразу"],
'zhs':["🧹 清理 $1 格","🛣 修路 $1 格","另需 🫧$1","点 ✓ 一次完成"],
'zht':["🧹 清理 $1 格","🛣 修路 $1 格","另需 🫧$1","點 ✓ 一次完成"]}
for L,v in X.items():
    if L in('en','ja','es','vi'):
        f=ROOT+'work/city_src/i18n/'+L+'.json';o=json.load(open(f,encoding='utf-8'))
        o['t']=[x for x in o['t'] if x[0] not in T];o['t']=[[T[i],v[i]] for i in range(3)]+o['t'];o['d'][K]=v[3]
        json.dump(o,open(f,'w',encoding='utf-8'),ensure_ascii=False)
    else:
        f=ROOT+'lang/city_'+L+'.js';s=open(f,encoding='utf-8').read()
        if MK in s:s=s[:s.index(MK)]
        add='try{'+''.join('I18N_X.t.unshift(['+json.dumps(T[i],ensure_ascii=False)+','+json.dumps(v[i],ensure_ascii=False)+']);' for i in range(3))+'I18N_X.d['+json.dumps(K,ensure_ascii=False)+']='+json.dumps(v[3],ensure_ascii=False)+'}catch(e){}'
        open(f,'w',encoding='utf-8').write(s.rstrip('\n')+'\n'+MK+add+'\n')
print('town_1135b',len(X))
