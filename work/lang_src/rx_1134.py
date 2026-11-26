# 1.1.34 (11/26): 심해 탐험 카드 · 결과에서 코드에 영어로 쓴 글(LANG==='en' 갈래)이 28개 언어에서 영어로 남던 것 → 숫자 · 이름 들어간 틀 7개를 lang/<언어>.js 끝에 덧붙임(다시 돌려도 한 번만)
# python3 work/lang_src/rx_1134.py
import json,os,re,subprocess
R='/home/claude/gill-fighter/lang/';MK='/* rx_1134 */'
G={ # Grow to X · Survive for Ns · Eat the boss: X · Clear within T · Eat N fish while surviving
'ar':["انمُ حتى $1","انجُ $1 ثانية","التهم الزعيم: $1","أنهِ خلال $1","كُل $1 سمكة أثناء النجاة"],
'ca':["Creix fins a $1","Sobreviu $1 s","Menja't el cap: $1","Supera en $1","Menja $1 peixos mentre sobrevius"],
'cs':["Vyrůst na $1","Přežij $1 s","Sněz bosse: $1","Dokonči do $1","Sněz $1 ryb a přežij"],
'da':["Vokse til $1","Overlev i $1 s","Spis bossen: $1","Klar det inden $1","Spis $1 fisk mens du overlever"],
'de':["Wachse auf $1","Überlebe $1 s","Friss den Boss: $1","Schaffe es in $1","Friss $1 Fische und überlebe"],
'el':["Μεγάλωσε ως $1","Επίζησε $1 δ","Φάε τον αρχηγό: $1","Τερμάτισε σε $1","Φάε $1 ψάρια επιζώντας"],
'fi':["Kasva kokoon $1","Selviydy $1 s","Syö pomo: $1","Läpäise ajassa $1","Syö $1 kalaa selviytyessäsi"],
'fr':["Grandis jusqu'à $1","Survis $1 s","Mange le boss : $1","Termine en $1","Mange $1 poissons en survivant"],
'he':["גדלו עד $1","שרדו $1 שניות","אכלו את הבוס: $1","סיימו תוך $1","אכלו $1 דגים תוך כדי הישרדות"],
'hi':["$1 तक बढ़ें","$1 सेकंड टिके रहें","बॉस को खाएँ: $1","$1 में पूरा करें","टिके रहते हुए $1 मछलियाँ खाएँ"],
'hr':["Narasti do $1","Preživi $1 s","Pojedi šefa: $1","Prođi unutar $1","Pojedi $1 riba i preživi"],
'hu':["Nőj meg: $1","Élj túl $1 mp-ig","Edd meg a főellenséget: $1","Teljesítsd $1 alatt","Egyél $1 halat túlélés közben"],
'id':["Tumbuh hingga $1","Bertahan $1 detik","Makan bos: $1","Selesaikan dalam $1","Makan $1 ikan sambil bertahan"],
'it':["Cresci fino a $1","Sopravvivi $1 s","Mangia il boss: $1","Completa entro $1","Mangia $1 pesci sopravvivendo"],
'ms':["Membesar hingga $1","Bertahan $1 saat","Makan bos: $1","Selesaikan dalam $1","Makan $1 ikan sambil bertahan"],
'nl':["Groei tot $1","Overleef $1 s","Eet de baas: $1","Haal het binnen $1","Eet $1 vissen terwijl je overleeft"],
'no':["Voks til $1","Overlev i $1 s","Spis bossen: $1","Klar det innen $1","Spis $1 fisk mens du overlever"],
'pl':["Urośnij do $1","Przetrwaj $1 s","Zjedz bossa: $1","Ukończ w $1","Zjedz $1 ryb, przetrwając"],
'pt':["Cresça até $1","Sobreviva $1 s","Coma o chefe: $1","Conclua em $1","Coma $1 peixes sobrevivendo"],
'ro':["Crește până la $1","Supraviețuiește $1 s","Mănâncă șeful: $1","Termină în $1","Mănâncă $1 pești supraviețuind"],
'ru':["Вырасти до $1","Продержись $1 с","Съешь босса: $1","Пройди за $1","Съешь $1 рыб и выживи"],
'sk':["Vyrásť na $1","Prežiť $1 s","Zjedz bossa: $1","Dokonči do $1","Zjedz $1 rýb a prežij"],
'sv':["Väx till $1","Överlev i $1 s","Ät bossen: $1","Klara det inom $1","Ät $1 fiskar medan du överlever"],
'th':["โตให้ถึง $1","เอาตัวรอด $1 วินาที","กินบอส: $1","ผ่านภายใน $1","กินปลา $1 ตัวระหว่างเอาตัวรอด"],
'tr':["$1 boyuna ulaş","$1 sn hayatta kal","Patronu ye: $1","$1 içinde geç","Hayatta kalırken $1 balık ye"],
'uk':["Вирости до $1","Протримайся $1 с","З'їж боса: $1","Пройди за $1","З'їж $1 рибок і виживи"],
'zhs':["长到 $1","存活 $1 秒","吃掉首领：$1","在 $1 内过关","存活时吃掉 $1 条鱼"],
'zht':["長到 $1","存活 $1 秒","吃掉首領：$1","在 $1 內過關","存活時吃掉 $1 條魚"]}
P=[r"^Grow to (.+)$",r"^Survive for (\d+)s$",r"^Eat the boss: (.+)$",r"^Clear within (.+)$",r"^Eat (\d+) fish while surviving$"]
for L,tr in G.items():
    f=R+L+'.js';s=open(f,encoding='utf-8').read()
    if MK in s: s=s[:s.index(MK)]
    M=json.loads(subprocess.check_output(['node','-e','const w={};new Function("window",require("fs").readFileSync(process.argv[1],"utf8"))(w);process.stdout.write(JSON.stringify({b:w.GF_M["Based on your fish ("],a:w.GF_M["Again"]}))',f]))
    close='）' if M['b'].endswith('（') else ')'
    rx=[[P[i],tr[i]] for i in range(5)]+[[r"^Based on your fish \((.+)\)$",M['b']+'$1'+close],[r"^Again (⚡\d+)$",M['a']+' $1']]
    s=s.rstrip('\n')+'\n'+MK+'window.GF_R=(window.GF_R||[]).concat('+json.dumps(rx,ensure_ascii=False)+');\n'
    open(f,'w',encoding='utf-8').write(s);print(L,'ok')
