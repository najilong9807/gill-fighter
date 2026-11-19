# 마을 소스를 고친 뒤: python3 build.py → ../city.html 로 복사 → 저장소 맨 위에서 python3 work/city_src/to_patch.py
# patch_add.json 에서 마을 두 항목(입구 코드 · www/city.html)을 빼고 맨 끝에 새로 붙인다(main 이 앞에 항목을 더해도 됨). 글꼴 링크는 앱 안 파일로 바꿔 넣는다.
import json
A="if(window.claude&&window.claude.hot&&window.claude.hot.ready)window.claude.hot.ready(boot);else boot();"
OLD='<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Jua&display=swap">'
p=json.load(open('patch_add.json',encoding='utf-8'))
p=[r for r in p if not (r.get('f')=='www/city.html' or '아가미시티(물고기 마을) 입구' in r.get('b',''))]
entry=open('work/parts/city_entry.js',encoding='utf-8').read().rstrip('\n')+'\n'
city=open('work/city.html',encoding='utf-8').read();assert city.count(OLD)==1
p.append({"a":A,"b":entry+A})
p.append({"f":"www/city.html","new":city.replace(OLD,'<link rel="stylesheet" href="fonts/black-han-sans/index.css"><link rel="stylesheet" href="fonts/jua/index.css">')})
json.dump(p,open('patch_add.json','w',encoding='utf-8'),ensure_ascii=False);print('patch_add',len(p))
