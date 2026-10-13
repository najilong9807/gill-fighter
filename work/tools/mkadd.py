# 1.1.11 patch_add.json 다시 만들기: (기준본+patch.json) → 지금 www 줄 단위 diff + 기존 네이티브 항목 유지, 체인 검증
import json,difflib,subprocess,os
R='/home/claude/fishgame/release/';os.chdir(R)
subprocess.run(['python3','/home/claude/fishgame/build_release.py','www'],check=True,cwd='/home/claude/fishgame')
P=json.load(open('patch.json',encoding='utf-8'));A=json.load(open('patch_add.json',encoding='utf-8'))
s=open('base_www_build1.html',encoding='utf-8').read()
for r in P:
    if r.get('f'):continue
    assert s.count(r['a'])==1;s=s.replace(r['a'],r['b'])
a=s.split('\n');new=open('www/index.html',encoding='utf-8').read();b=new.split('\n');A0='\n'.join(a)
ops=[o for o in difflib.SequenceMatcher(None,a,b,autojunk=False).get_opcodes() if o[0]!='equal']
def ctx(i1,i2):
    c=1
    while True:
        s0=max(0,i1-c);e0=min(len(a),i2+c)
        if A0.count('\n'.join(a[s0:e0]))==1:return s0,e0
        c+=1
hunks=[]
for o in ops:
    s0,e0=ctx(o[1],o[2])
    if hunks and s0<hunks[-1][1]:
        h=hunks[-1];h[1]=max(h[1],e0);h[3]=o
    else: hunks.append([s0,e0,o,o])
reps=[]
for s0,e0,f,l in hunks:
    bj0=f[3]-(f[1]-s0);bj1=l[4]+(e0-l[2]);reps.append({'a':'\n'.join(a[s0:e0]),'b':'\n'.join(b[bj0:bj1])})
out=reps+[r for r in A if r.get('f')]
open('patch_add.json','w',encoding='utf-8').write(json.dumps(out,ensure_ascii=False))
t=open('base_www_build1.html',encoding='utf-8').read()
for i,r in enumerate(P+out):
    if r.get('f'):continue
    assert t.count(r['a'])==1,i;t=t.replace(r['a'],r['b'])
assert t==new
blob=subprocess.run(['git','hash-object','patch_add.json'],capture_output=True,text=True).stdout.strip()
print('patch_add',len(out),'entries',os.path.getsize('patch_add.json'),'bytes blob',blob[:8],'chain ok')
