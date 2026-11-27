# 1.1.34: 수족관 집터 창 '꾸밈 ★ · 진주 샘 · 소품 종류' 줄과 '꾸밈 ★' 띠가 꾸러미 언어 · es · vi 에서 영어로 남던 것 → 숫자 틀
# 28개는 lang/<언어>.js 끝(rx_1134b 표시, 다시 돌려도 한 번만), es · vi 는 index.html 의 1.1.34 틀 줄에 덧붙임(patch_add 같이)
import json,subprocess,re
ROOT='/home/claude/gf-qa/';MK='/* rx_1134b */'
# K: '$1 kinds placed' · N: 'next ★ at $1' · E: 'Pearl spring +$1% for more kinds of decor'
X={'ar':["$1 أنواع موضوعة","★ التالية عند $1","نبع اللؤلؤ +$1% لتنوّع الديكور"],
'ca':["$1 tipus col·locats","següent ★ a $1","Font de perles +$1% per tenir més tipus de decoració"],
'cs':["$1 druhů umístěno","další ★ při $1","Perlový pramen +$1 % za více druhů dekorací"],
'da':["$1 slags placeret","næste ★ ved $1","Perlekilde +$1% for flere slags pynt"],
'de':["$1 Arten platziert","nächster ★ bei $1","Perlenquelle +$1% für mehr Deko-Arten"],
'el':["$1 είδη τοποθετημένα","επόμενο ★ στα $1","Πηγή μαργαριταριών +$1% για περισσότερα είδη διακόσμησης"],
'fi':["$1 lajia sijoitettu","seuraava ★ kun $1","Helmilähde +$1 % useammista koristelajeista"],
'fr':["$1 types placés","★ suivante à $1","Source de perles +$1 % grâce à plus de types de déco"],
'he':["$1 סוגים הוצבו","★ הבא ב-$1","מעיין פנינים +$1% על יותר סוגי קישוטים"],
'hi':["$1 तरह की सजावट रखी","अगला ★ $1 पर","ज़्यादा तरह की सजावट से मोती झरना +$1%"],
'hr':["$1 vrsta postavljeno","sljedeća ★ na $1","Izvor bisera +$1 % za više vrsta ukrasa"],
'hu':["$1 fajta lerakva","következő ★: $1","Gyöngyforrás +$1% a többféle díszért"],
'id':["$1 jenis dipasang","★ berikutnya di $1","Mata air mutiara +$1% karena dekorasi makin beragam"],
'it':["$1 tipi piazzati","prossima ★ a $1","Fonte di perle +$1% grazie a più tipi di arredi"],
'ms':["$1 jenis diletak","★ seterusnya pada $1","Mata air mutiara +$1% kerana hiasan lebih pelbagai"],
'nl':["$1 soorten geplaatst","volgende ★ bij $1","Parelbron +$1% voor meer soorten decoratie"],
'no':["$1 typer plassert","neste ★ ved $1","Perlekilde +$1 % for flere typer pynt"],
'pl':["$1 rodzajów ustawionych","następna ★ przy $1","Źródło pereł +$1% za więcej rodzajów dekoracji"],
'pt':["$1 tipos colocados","próxima ★ em $1","Fonte de pérolas +$1% por ter mais tipos de decoração"],
'ro':["$1 tipuri puse","următoarea ★ la $1","Izvor de perle +$1% pentru mai multe tipuri de decor"],
'ru':["$1 видов размещено","следующая ★ при $1","Жемчужный источник +$1% за разнообразие декора"],
'sk':["$1 druhov umiestnených","ďalšia ★ pri $1","Perlový prameň +$1 % za viac druhov dekorácií"],
'sv':["$1 sorter placerade","nästa ★ vid $1","Pärlkälla +$1 % för fler sorters dekor"],
'th':["วางแล้ว $1 แบบ","★ ถัดไปที่ $1","น้ำพุไข่มุก +$1% เพราะของตกแต่งหลากหลายขึ้น"],
'tr':["$1 tür yerleştirildi","sonraki ★: $1","Daha çok dekor türü için İnci kaynağı +%$1"],
'uk':["$1 видів розміщено","наступна ★ при $1","Перлове джерело +$1% за різноманітність декору"],
'zhs':["已摆 $1 种","下一颗★：$1 种","摆件种类变多，珍珠泉 +$1%"],
'zht':["已擺 $1 種","下一顆★：$1 種","擺件種類變多，珍珠泉 +$1%"],
'es':["$1 tipos colocados","siguiente ★ con $1","Fuente de perlas +$1% por más tipos de adornos"],
'vi':["Đã đặt $1 loại","★ tiếp theo ở $1","Suối ngọc trai +$1% nhờ nhiều loại trang trí hơn"]}
DS={'es':("Decoración","Fuente de perlas"),'vi':("Trang trí","Suối ngọc trai")}
def rules(L,D,S):
    K,N,E=X[L]
    return [[r"Decor ★(\d+) · spring \+(\d+)% · ",D+" ★$1 · "+S+" +$2% · "],[r"Decor (?=\d)",D+" "],[r"(\d+) kinds placed",K],[r" · next ★ at (\d+)"," · "+N],[r"^Pearl spring \+(\d+)% for more kinds of decor$",E]]
for L in X:
    if L in DS: continue
    f=ROOT+'lang/'+L+'.js';s=open(f,encoding='utf-8').read()
    if MK in s:s=s[:s.index(MK)]
    M=json.loads(subprocess.check_output(['node','-e','const w={};new Function("window",require("fs").readFileSync(process.argv[1],"utf8"))(w);process.stdout.write(JSON.stringify([w.GF_TRX["꾸밈 "],w.GF_TRX["진주 샘 +"]]))',f]))
    D=M[0].strip();S=M[1].replace('+','').strip()
    s=s.rstrip('\n')+'\n'+MK+'window.GF_R=(window.GF_R||[]).concat('+json.dumps(rules(L,D,S),ensure_ascii=False)+');\n'
    open(f,'w',encoding='utf-8').write(s)
# es · vi: index.html 의 1.1.34 틀 줄
p=ROOT+'work/index.html';h=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
A="[/^Again (⚡\\d+)$/,'Otra vez $1']]"
B="[/^Again (⚡\\d+)$/,'Chơi lại $1']]"
def js(rs):return ','.join('[/'+a.replace('/','\\/')+'/,'+json.dumps(b,ensure_ascii=False).replace('"',"'")+']' for a,b in rs)
for a,L in ((A,'es'),(B,'vi')):
    if 'Decor ★' in h.split(a)[0][-2000:] and h.count(a)==1 and ('Decor ★' in h[h.index(a)-2000:h.index(a)+len(a)+50]): continue
    assert h.count(a)==1,(L,h.count(a))
    b=a[:-1]+','+js(rules(L,*DS[L]))+']'
    h=h.replace(a,b);pa.append({"a":a,"b":b})
open(p,'w',encoding='utf-8').write(h);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False))
print('ok')
