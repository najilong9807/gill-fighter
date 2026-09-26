# app.zip(기준본) 위에 patch.json의 수정 사항을 덮어쓴다. 각 수정은 기준본에서 정확히 한 번만 나와야 한다.
import json,sys
p='www/index.html'
s=open(p,encoding='utf-8').read()
reps=json.load(open('patch.json',encoding='utf-8'))
for i,r in enumerate(reps):
    n=s.count(r['a'])
    if n!=1:
        sys.exit('patch %d: found %d times'%(i,n))
    s=s.replace(r['a'],r['b'])
open(p,'w',encoding='utf-8').write(s)
print('patched',len(reps))
