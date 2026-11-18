# 화면에 나가는 한국어 조각 목록을 뽑는다 → i18n/keys.json (번역 표의 열쇠)
import re,json,sys
F="game.js cityz.js gate.js desc.js extra.js extra2.js extra3.js extra4.js ux.js shell.html village-data.js".split()
UNIT={'마리','칸','개','분','시간','초','일','만'}
INL=r'</?(?:b|i|small|em|strong|br)>'
keys={}
for f in F:
    s=open(f,encoding='utf-8').read()
    s=re.sub(r'/\*.*?\*/','',s,flags=re.S)
    lits=[]
    if f.endswith('.html'):
        h=s[:s.index('<script')];h=re.sub(r'<style.*?</style>','',h,flags=re.S);lits.append(h)
    for m in re.finditer(r"'((?:[^'\\\n]|\\.)*)'|\"((?:[^\"\\\n]|\\.)*)\"",s):
        t=m.group(1) if m.group(1) is not None else m.group(2)
        if t and re.search('[가-힣]',t): lits.append(t.replace("\\'","'"))
    for t in lits:
        for a in re.findall(r'(?:aria-label|title)="([^"]*)"',t):
            if re.search('[가-힣]',a): keys.setdefault(a.strip(),f)
        t=re.sub(r'(<(?!'+INL[1:]+r')[^>]*>)',lambda m:'\x00',t)
        t=re.sub(r'^[^<>]*>|<[^<>]*$',lambda m:'\x00' if ('=' in m.group(0) or '"' in m.group(0)) else m.group(0),t)
        for p in t.split('\x00'):
            p=p.strip()
            p=re.sub(r'^(?:<br>|>|\s|·)+|(?:<br>|\s|·)+$','',p)
            p=re.sub(r'^(?:</(?:b|i|small|em|strong)>\s*)+|(?:\s*<(?:b|i|small|em|strong)>)+$','',p)
            p=re.sub(r'^(?:<br>|\s|·)+|(?:<br>|\s|·)+$','',p)
            if re.search('[가-힣]',p) and p not in UNIT: keys.setdefault(p,f)
ks=sorted(keys,key=lambda k:(F.index(keys[k]),k))
json.dump(ks,open('i18n/keys.json','w',encoding='utf-8'),ensure_ascii=False,indent=0)
print(len(ks))
if len(sys.argv)>1:
    for k in ks:
        if '<' in k or '"' in k or '>' in k: print(keys[k][:5],'|',k)
