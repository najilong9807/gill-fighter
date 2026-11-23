# 1.1.32 스토어 새 소식에 마을 중반 재미 한 줄 더하기(오늘의 마을 일 · 광장: 축제의 날 · 기념물 3개) — t45 번역 · 용어집 이름 그대로
import json,glob,os,re
k=json.load(open('work/lang_src/t45/keys.json',encoding='utf-8'));g=json.load(open('work/lang_src/glossary.json',encoding='utf-8'))
W={'ko':('마을','오늘의 마을 일','광장','축제의 날','기념물 3개'),'en':('Town',"Today's Town Tasks",'Plaza','Festival Day','3 monuments')}
MON={'ja':'記念碑3つ','es':'3 monumentos','vi':'3 công trình kỷ niệm','zht':'3座紀念碑','zhs':'3座纪念碑','pt':'3 monumentos','fr':'3 monuments','de':'3 Denkmäler','it':'3 monumenti','nl':'3 monumenten','ru':'3 памятника','uk':"3 пам'ятки",'pl':'3 pomniki','tr':'3 anıt','id':'3 monumen','ms':'3 monumen','th':'อนุสาวรีย์ 3 แห่ง','hi':'3 स्मारक','ar':'3 معالم','he':'3 אנדרטאות','sv':'3 monument','da':'3 monumenter','no':'3 monumenter','fi':'3 muistomerkkiä','cs':'3 památníky','sk':'3 pamätníky','hu':'3 emlékmű','ro':'3 monumente','hr':'3 spomenika','el':'3 μνημεία','ca':'3 monuments'}
TOWN={'ja':'町','es':'Pueblo','vi':'Làng'}
for f in glob.glob('work/lang_src/t45/out/*.json'):
    c=os.path.basename(f)[:-5];o=json.load(open(f,encoding='utf-8'));d=o.get('d',o)
    if isinstance(d,list):d={x[0]:x[1] for x in d}
    town=TOWN.get(c) or g.get(c,{}).get('Town (bottom tab label, very short)')
    W[c]=(town,d['오늘의 마을 일'],d['광장'],d['축제의 날'],MON[c])
assert len(W)==33,len(W)
LOC={'ko':'ko','en-US':'en','en-GB':'en','en-AU':'en','en-CA':'en','ja':'ja','zh-Hans':'zhs','zh-Hant':'zht','de-DE':'de','fr-FR':'fr','fr-CA':'fr','es-ES':'es','es-MX':'es','it':'it','pt-BR':'pt','pt-PT':'pt','ru':'ru','uk':'uk','ar-SA':'ar','he':'he','hi':'hi','id':'id','ms':'ms','th':'th','vi':'vi','tr':'tr','pl':'pl','nl-NL':'nl','sv':'sv','da':'da','no':'no','fi':'fi','cs':'cs','sk':'sk','hu':'hu','ro':'ro','hr':'hr','el':'el','ca':'ca'}
bad=re.compile('[☀-➿\U0001F000-\U0001FFFF️]')
f='store/whatsnew_1132.json';d=json.load(open(f,encoding='utf-8'))
for loc in d:
    t,a,p,fe,m=W[LOC[loc]];line='- %s: %s · %s(%s · %s)'%(t,a,p,fe,m) if LOC[loc] in ('ko','ja','zht','zhs') else '- %s: %s · %s (%s · %s)'%(t,a,p,fe,m)
    L=d[loc].split('\n')
    if line not in L:L.insert(2,line)
    s='\n'.join(L);assert not bad.search(s) and len(s)<4000;d[loc]=s
json.dump(d,open(f,'w',encoding='utf-8'),ensure_ascii=False,indent=1);print(d['ko']);print(d['de-DE'])
