import json,hashlib,gzip,base64,re,sys
R='/home/claude/fishgame/release/';N=sys.argv[1];OLD=sys.argv[2]
old=open(R+'patch.json',encoding='utf-8').read()
assert hashlib.sha256(old.encode()).hexdigest()[:8]==OLD,hashlib.sha256(old.encode()).hexdigest()[:8]
www=json.load(open('www_patch.json',encoding='utf-8'))
extra=json.load(open('extra.json',encoding='utf-8')) if len(sys.argv)>3 else []
txt=', '.join(json.dumps(r,ensure_ascii=False) for r in www+extra)
new=old[:-1]+', '+txt+']'
P=json.loads(new)
s=open(R+'base_www_build1.html',encoding='utf-8').read()
for i,r in enumerate(P):
    if r.get('f'):continue
    assert s.count(r['a'])==1,i
    s=s.replace(r['a'],r['b'])
print(len(P),'www ok',s==open(R+'www/index.html',encoding='utf-8').read())
open('patch_new%s.json'%N,'w',encoding='utf-8').write(new)
print('new',hashlib.sha256(new.encode()).hexdigest()[:8],len(new))
b64=base64.b64encode(gzip.compress((', '+txt+']').encode('utf-8'),9)).decode()
print('b64',len(b64))
n=9000
for k in range(0,len(b64),n):
  c=b64[k:k+n];open('a%s_%d.txt'%(N,k//n),'w').write(c);print(k//n,len(c),hashlib.sha256(c.encode()).hexdigest()[:8])
  for m in re.finditer(r'(.{2,6})\1{4,}',c): print('  REPEAT',m.start(),m.group(0)[:30],len(m.group(0)))
