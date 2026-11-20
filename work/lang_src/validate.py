# 번역 결과 점검: python3 validate.py <언어코드>  → 빠짐 · 태그/자리표시 달라짐 · 한글 남음
import json,re,sys,os,collections
L=sys.argv[1];O='out/'+L+'/';bad=[];warn=0
TAG=re.compile(r'</?[a-zA-Z][^>]*>');PH=re.compile(r'\$\d|\{[a-zA-Z0-9_]+\}|%[sd]|\\n');HAN=re.compile('[가-힣]')
def tags(s):return collections.Counter(re.sub(r'\s+style="[^"]*"','',t) for t in TAG.findall(s))
def chk(where,i,en,tr):
    if tr is None or (isinstance(tr,str) and not tr.strip() and en.strip()):bad.append((where,i,'missing'));return
    if HAN.search(tr):bad.append((where,i,'hangul',tr[:60]))
    if tags(en)!=tags(tr):bad.append((where,i,'tags',en[:80],tr[:80]))
    if collections.Counter(PH.findall(en))!=collections.Counter(PH.findall(tr)):bad.append((where,i,'placeholder',en[:80],tr[:80]))
for c in range(1,5):
    src=json.load(open('src_main_%d.json'%c));f=O+'main_%d.json'%c
    if not os.path.exists(f):bad.append(('main_%d'%c,'-','file missing'));continue
    out=json.load(open(f))
    for r in src:chk('main_%d'%c,r[0],r[1],out.get(str(r[0])))
so=json.load(open('src_other.json'));f=O+'other.json'
if not os.path.exists(f):bad.append(('other','-','file missing'))
else:
    o=json.load(open(f))
    for k in ['city_d','city_t','mx','mx2']:
        for i,en in so[k]:chk(k,i,en,(o.get(k) or {}).get(str(i)))
    for i,rgx,ex in so['rx']:chk('rx',i,ex,(o.get('rx') or {}).get(str(i)))
    for k in so['city_u']:
        if k not in (o.get('city_u') or {}):bad.append(('city_u',k,'missing'))
    p=o.get('pack') or {}
    for k in ['town','city']:
        if not p.get(k):bad.append(('pack',k,'missing'))
for b in bad[:60]:print(b)
print(L,'problems',len(bad))
sys.exit(1 if bad else 0)
