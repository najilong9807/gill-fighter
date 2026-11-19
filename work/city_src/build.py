import re
d=open('village-data.js',encoding='utf-8').read()
d=re.sub(r"\+\(process\.env\.\w+\|\|([\d.]+)\)",r"\1",d)
art=open('helpers.js',encoding='utf-8').read()+'\n'+open('palace25.js',encoding='utf-8').read()+'\n'+open('bart.js',encoding='utf-8').read()+'\n'+open('zart.js',encoding='utf-8').read()+'\n'+open('zart2.js',encoding='utf-8').read()+'\n'+d
sh=open('shell.html',encoding='utf-8').read().replace('/*ART*/',art).replace('/*GAME*/',open('game.js',encoding='utf-8').read().replace('/*DESC*/',open('desc.js',encoding='utf-8').read()).replace('/*CITYZ*/',open('cityz.js',encoding='utf-8').read().replace('/*GATE*/',open('gate.js',encoding='utf-8').read())).replace('/*EXTRA*/',open('extra.js',encoding='utf-8').read()).replace('/*EXTRA2*/',open('extra2.js',encoding='utf-8').read()).replace('/*EXTRA3*/',open('extra3.js',encoding='utf-8').read()).replace('/*EXTRA4*/',open('extra4.js',encoding='utf-8').read()).replace('/*VISIT*/',open('visit.js',encoding='utf-8').read()).replace('/*PLACE*/',open('place.js',encoding='utf-8').read()).replace('/*QUEST*/',open('quest.js',encoding='utf-8').read()).replace('/*AQLINK*/',open('aqlink.js',encoding='utf-8').read()).replace('/*UX*/',open('ux.js',encoding='utf-8').read()))
import json,glob,os
tb={}
for f in sorted(glob.glob('i18n/*.json')):
    n=os.path.basename(f)[:-5]
    if n in ('en','ja','es','vi'): tb[n]=json.load(open(f,encoding='utf-8'))
i18n='var I18N='+json.dumps(tb,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')+';\n'+open('i18n/i18n.js',encoding='utf-8').read()
sh=sh.replace('/*I18N*/',i18n)
open('city.html','w',encoding='utf-8').write(sh)
