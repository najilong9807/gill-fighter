# parts/city_entry.js → work/index.html 안 같은 자리 바꿔 끼우기 + 문법 검사용 추출
import subprocess
A="if(window.claude&&window.claude.hot&&window.claude.hot.ready)window.claude.hot.ready(boot);else boot();"
W='/home/claude/gill-fighter/work/'
s=open(W+'index.html',encoding='utf-8').read()
j=s.index(A);i=s.find('/* 아가미시티(물고기 마을) 입구');i=j if i<0 else i
assert s.count(A)==1 and i<=j
e=open(W+'parts/city_entry.js',encoding='utf-8').read().rstrip('\n')+'\n'
s=s[:i]+e+s[j:]
open(W+'index.html','w',encoding='utf-8').write(s)
import re
best=max(re.findall(r'<script(?![^>]*src)[^>]*>([\s\S]*?)</script>',s),key=len)
import os
S=os.path.dirname(os.path.abspath(__file__))+'/'
open(S+'main.js','w',encoding='utf-8').write(best)
print(subprocess.run(['node','--check',S+'main.js'],capture_output=True,text=True).stderr or 'main OK')
c=open(W+'city.html',encoding='utf-8').read()
for k,b in enumerate(re.findall(r'<script>([\s\S]*?)</script>',c)):
    open(S+'c%d.js'%k,'w',encoding='utf-8').write(b)
    r=subprocess.run(['node','--check',S+'c%d.js'%k],capture_output=True,text=True)
    if r.returncode:print('city',k,r.stderr[:400])
print('city checked')
