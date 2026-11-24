# 1.1.33 검수(11/25): 이 스크립트는 index.html 의 '아가미시티 입구'~boot 줄 앞(약 50KB, 1.1.31 모드 잠금 · 1.1.32 선물 · 왕관 등 포함)을
# parts/city_entry.js(옛 18KB)로 통째로 바꿔 끼워 출시 기능을 지워 버림 → 막아 둠. 마을 입구 코드를 고칠 땐 index.html 을 직접 고칠 것.
import sys
if '--force' not in sys.argv:
    print('sync.py 막힘: index.html 의 최신 코드(1.1.31~)를 지움. index.html 을 직접 고치세요. (정말 필요하면 --force)');sys.exit(1)
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
