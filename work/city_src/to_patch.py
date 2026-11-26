# 마을 소스를 고친 뒤: python3 build.py → ../city.html 로 복사 → 저장소 맨 위에서 python3 work/city_src/to_patch.py
# 1.1.34: patch_add.json 의 www/city.html 항목만 '제자리에서' 새 내용으로 바꾼다.
#  (예전엔 입구 코드 항목까지 빼서 맨 끝에 붙였는데, 그 뒤 항목들이 입구 코드 안을 고치는 게 있어서 빌드가 깨졌음 — 입구 코드는 index.html 항목으로 따로 고칠 것)
import json
OLD='<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Jua&display=swap">'
p=json.load(open('patch_add.json',encoding='utf-8'))
city=open('work/city.html',encoding='utf-8').read();assert city.count(OLD)==1
new=city.replace(OLD,'<link rel="stylesheet" href="fonts/black-han-sans/index.css"><link rel="stylesheet" href="fonts/jua/index.css">')
n=0
for r in p:
    if r.get('f')=='www/city.html' and 'new' in r: r['new']=new;n+=1
if n==0: p.append({"f":"www/city.html","new":new})
open('patch_add.json','w',encoding='utf-8').write(json.dumps(p,ensure_ascii=False));print('patch_add',len(p),'city entry updated',n)
