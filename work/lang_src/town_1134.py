# 1.1.34 (11/26 정세영 님 후기): 마을 새 문구 3개 → i18n/en·ja·es·vi.json + lang/city_<언어>.js 끝에 덧붙임(다시 돌려도 한 번만)
# K1 '한 번에 한 칸씩 열려요' · T2 '다음 칸은 🏛 산호궁 Lv.N' · K3 '🪨 산호석은 산호 광산과 바위 치우기로 모아요'
import json,os
ROOT='/home/claude/gf-qa/';MK='/* town_1134 */'
K1='한 번에 한 칸씩 열려요';T2=r'다음 칸은 🏛 산호궁 Lv\.(\d+)';K3='🪨 산호석은 산호 광산과 바위 치우기로 모아요'
X={
'en':["Plots open one at a time","Next plot at 🏛 Coral Hall Lv.$1","Get 🪨 Coral Stone from the Coral Quarry or by clearing rocks"],
'ja':["土地は一度に1区画ずつ広がります","次の区画は 🏛 サンゴ宮 Lv.$1","🪨 サンゴ石はサンゴ鉱山と岩の撤去で集まります"],
'es':["Las parcelas se abren de una en una","Siguiente parcela: 🏛 Palacio de Coral Nv.$1","Consigue 🪨 Piedra de coral en la Mina de Coral o quitando rocas"],
'vi':["Mỗi lần chỉ mở được một ô đất","Ô tiếp theo: 🏛 Cung San Hô Lv.$1","Lấy 🪨 Đá san hô từ Mỏ San Hô hoặc dọn đá"],
'ar':["تُفتح القطع واحدةً تلو الأخرى","القطعة التالية عند 🏛 قاعة المرجان Lv.$1","احصل على 🪨 حجر المرجان من محجر المرجان أو بإزالة الصخور"],
'ca':["Les parcel·les s'obren d'una en una","Següent parcel·la: 🏛 Sala del Corall Lv.$1","Aconsegueix 🪨 Pedra de corall a la Pedrera de corall o traient roques"],
'cs':["Pozemky se otevírají po jednom","Další pozemek: 🏛 Korálová radnice Lv.$1","🪨 Korálový kámen získáš v Korálovém lomu nebo odklízením skal"],
'da':["Grunde åbner én ad gangen","Næste grund ved 🏛 Koralhallen Lv.$1","Få 🪨 Koralsten fra Koralbruddet eller ved at rydde klipper"],
'de':["Grundstücke öffnen sich einzeln","Nächstes Grundstück ab 🏛 Korallenhalle Lv.$1","🪨 Korallenstein gibt's im Korallensteinbruch oder beim Räumen von Felsen"],
'el':["Τα οικόπεδα ανοίγουν ένα-ένα","Επόμενο οικόπεδο: 🏛 Κοραλλένιο Μέγαρο Lv.$1","Πάρε 🪨 Κοραλλόπετρα από το Λατομείο κοραλλιών ή καθαρίζοντας βράχους"],
'fi':["Tontit avautuvat yksi kerrallaan","Seuraava tontti: 🏛 Korallisali Lv.$1","Saat 🪨 Korallikiveä Korallilouhoksesta tai raivaamalla kiviä"],
'fr':["Les parcelles s'ouvrent une par une","Parcelle suivante : 🏛 Mairie de corail Nv.$1","Obtiens de la 🪨 Pierre de corail à la Carrière de corail ou en dégageant les rochers"],
'he':["החלקות נפתחות אחת בכל פעם","החלקה הבאה ב-🏛 היכל האלמוגים Lv.$1","אבן אלמוג 🪨 מקבלים ממחצבת האלמוגים או מפינוי סלעים"],
'hi':["ज़मीन एक बार में एक हिस्सा खुलती है","अगला हिस्सा 🏛 मूंगा हॉल Lv.$1 पर","🪨 मूंगा पत्थर मूंगा खदान से या चट्टानें हटाकर मिलता है"],
'hr':["Parcele se otvaraju jedna po jedna","Sljedeća parcela: 🏛 Koraljna dvorana Lv.$1","🪨 Koraljni kamen dobivaš iz Koraljnog kamenoloma ili čišćenjem stijena"],
'hu':["A telkek egyenként nyílnak","Következő telek: 🏛 Korallcsarnok Lv.$1","🪨 Korallkövet a Korallbányából vagy sziklák eltakarításával kapsz"],
'id':["Lahan terbuka satu per satu","Lahan berikutnya di 🏛 Balai Karang Lv.$1","Dapatkan 🪨 Batu Karang dari Tambang Karang atau dengan membersihkan batu"],
'it':["I lotti si aprono uno alla volta","Prossimo lotto: 🏛 Sala del Corallo Lv.$1","Ottieni 🪨 Pietra di corallo dalla Cava di corallo o rimuovendo le rocce"],
'ms':["Tanah dibuka satu demi satu","Tanah seterusnya di 🏛 Dewan Karang Lv.$1","Dapatkan 🪨 Batu Karang dari Kuari Karang atau dengan membersihkan batu"],
'nl':["Kavels gaan één voor één open","Volgende kavel bij 🏛 Koraalhal Lv.$1","Haal 🪨 Koraalsteen uit de Koraalgroeve of door rotsen op te ruimen"],
'no':["Tomter åpnes én om gangen","Neste tomt ved 🏛 Korallhallen Lv.$1","Få 🪨 Korallstein fra Korallbruddet eller ved å rydde steiner"],
'pl':["Działki otwierają się po jednej","Następna działka: 🏛 Koralowy ratusz Lv.$1","🪨 Kamień koralowy zdobędziesz w Kamieniołomie koralu lub usuwając skały"],
'pt':["Os terrenos abrem um de cada vez","Próximo terreno: 🏛 Salão de Coral Nv.$1","Consiga 🪨 Pedra de coral na Pedreira de coral ou removendo rochas"],
'ro':["Terenurile se deschid pe rând","Următorul teren la 🏛 Sala Coralului Lv.$1","Primești 🪨 Piatră de coral din Cariera de coral sau curățând stâncile"],
'ru':["Участки открываются по одному","Следующий участок: 🏛 Коралловая ратуша ур. $1","🪨 Коралловый камень даёт Коралловый карьер и расчистка скал"],
'sk':["Pozemky sa otvárajú po jednom","Ďalší pozemok: 🏛 Koralová radnica Lv.$1","🪨 Koralový kameň získaš v Koralovom lome alebo odpratávaním skál"],
'sv':["Tomter öppnas en i taget","Nästa tomt vid 🏛 Korallhallen Lv.$1","Få 🪨 Korallsten från Korallbrottet eller genom att röja stenar"],
'th':["ที่ดินเปิดได้ทีละแปลง","แปลงถัดไปที่ 🏛 ศาลาปะการัง Lv.$1","หา 🪨 หินปะการังได้จากเหมืองหินปะการังหรือการเคลียร์ก้อนหิน"],
'tr':["Araziler tek tek açılır","Sonraki arazi: 🏛 Mercan Salonu Sv.$1","🪨 Mercan Taşı'nı Mercan Ocağı'ndan veya kayaları temizleyerek al"],
'uk':["Ділянки відкриваються по одній","Наступна ділянка: 🏛 Коралова ратуша рів. $1","🪨 Кораловий камінь дає Кораловий кар'єр і розчищення скель"],
'zhs':["土地一次只能开一块","下一块在 🏛 珊瑚大厅 Lv.$1","🪨 珊瑚石来自珊瑚采石场或清理岩石"],
'zht':["土地一次只能開一塊","下一塊在 🏛 珊瑚大廳 Lv.$1","🪨 珊瑚石來自珊瑚採石場或清理岩石"]}
for L,(a,b,c) in X.items():
    if L in('en','ja','es','vi'):
        f=ROOT+'work/city_src/i18n/'+L+'.json';o=json.load(open(f,encoding='utf-8'))
        o['d'][K1]=a;o['d'][K3]=c;o['t']=[x for x in o['t'] if x[0]!=T2]+[[T2,b]]
        json.dump(o,open(f,'w',encoding='utf-8'),ensure_ascii=False)
    else:
        f=ROOT+'lang/city_'+L+'.js';s=open(f,encoding='utf-8').read()
        if MK in s:s=s[:s.index(MK)]
        add='try{I18N_X.d['+json.dumps(K1,ensure_ascii=False)+']='+json.dumps(a,ensure_ascii=False)+';I18N_X.d['+json.dumps(K3,ensure_ascii=False)+']='+json.dumps(c,ensure_ascii=False)+';I18N_X.t.unshift(['+json.dumps(T2,ensure_ascii=False)+','+json.dumps(b,ensure_ascii=False)+'])}catch(e){}'
        open(f,'w',encoding='utf-8').write(s.rstrip('\n')+'\n'+MK+add+'\n')
    print(L,'ok')
