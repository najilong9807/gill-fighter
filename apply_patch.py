# app.zip(기준본) 위에 patch.json의 수정 사항을 덮어쓴다.
# 항목 형식: {"a":찾을 문자열,"b":바꿀 문자열[, "f":파일 경로(기본 www/index.html)]} 또는 {"f":경로,"new":새 파일 내용}
# 바꾸기는 파일 안에서 정확히 한 번만 나와야 한다.
# patch_add.json이 있으면 patch.json 뒤에 이어 붙여 적용한다(큰 patch.json을 다시 올리지 않고 추가분만 올리기).
import json,sys,os
reps=json.load(open('patch.json',encoding='utf-8'))
if os.path.exists('patch_add.json'):
    add=json.load(open('patch_add.json',encoding='utf-8'));print('patch_add',len(add));reps=reps+add
cache={}
def get(p):
    if p not in cache: cache[p]=open(p,encoding='utf-8').read()
    return cache[p]
for i,r in enumerate(reps):
    p=r.get('f','www/index.html')
    if 'new' in r:
        d=os.path.dirname(p)
        if d: os.makedirs(d,exist_ok=True)
        cache[p]=r['new'];continue
    s=get(p);n=s.count(r['a'])
    if n!=1: sys.exit('patch %d (%s): found %d times'%(i,p,n))
    cache[p]=s.replace(r['a'],r['b'])
for p,s in cache.items():
    open(p,'w',encoding='utf-8').write(s)
print('patched',len(reps),'files',len(cache))
