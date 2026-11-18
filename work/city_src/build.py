import re
d=open('village-data.js',encoding='utf-8').read()
d=re.sub(r"\+\(process\.env\.\w+\|\|([\d.]+)\)",r"\1",d)
art=open('helpers.js',encoding='utf-8').read()+'\n'+open('palace25.js',encoding='utf-8').read()+'\n'+open('bart.js',encoding='utf-8').read()+'\n'+open('zart.js',encoding='utf-8').read()+'\n'+open('zart2.js',encoding='utf-8').read()+'\n'+d
sh=open('shell.html',encoding='utf-8').read().replace('/*ART*/',art).replace('/*GAME*/',open('game.js',encoding='utf-8').read().replace('/*DESC*/',open('desc.js',encoding='utf-8').read()).replace('/*CITYZ*/',open('cityz.js',encoding='utf-8').read().replace('/*GATE*/',open('gate.js',encoding='utf-8').read())).replace('/*EXTRA*/',open('extra.js',encoding='utf-8').read()).replace('/*EXTRA2*/',open('extra2.js',encoding='utf-8').read()).replace('/*EXTRA3*/',open('extra3.js',encoding='utf-8').read()).replace('/*EXTRA4*/',open('extra4.js',encoding='utf-8').read()).replace('/*UX*/',open('ux.js',encoding='utf-8').read()))
open('city.html','w',encoding='utf-8').write(sh)
