import difflib,json,sys
a=open('base_www.html',encoding='utf-8').read().split('\n');b=open(__import__('os').environ.get('NEWF','new_www.html'),encoding='utf-8').read().split('\n')
A='\n'.join(a)
ops=[o for o in difflib.SequenceMatcher(None,a,b,autojunk=False).get_opcodes() if o[0]!='equal']
# hunks: [s0,e0,first_op,last_op]
def ctx(i1,i2):
    c=1
    while True:
        s0=max(0,i1-c);e0=min(len(a),i2+c)
        if A.count('\n'.join(a[s0:e0]))==1:return s0,e0
        c+=1
hunks=[]
for o in ops:
    s0,e0=ctx(o[1],o[2])
    if hunks and s0<hunks[-1][1]:
        h=hunks[-1];h[1]=max(h[1],e0);h[3]=o
    else: hunks.append([s0,e0,o,o])
reps=[]
for s0,e0,f,l in hunks:
    bj0=f[3]-(f[1]-s0);bj1=l[4]+(e0-l[2])
    reps.append({'a':'\n'.join(a[s0:e0]),'b':'\n'.join(b[bj0:bj1])})
s=A
for r in reps:
    assert s.count(r['a'])==1;s=s.replace(r['a'],r['b'])
assert s=='\n'.join(b)
json.dump(reps,open('www_patch.json','w',encoding='utf-8'),ensure_ascii=False)
print(len(reps))
