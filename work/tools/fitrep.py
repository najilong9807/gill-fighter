import json,collections,sys
H=json.load(open('fit_head.json'));F=json.load(open('fit_face.json'))
EYEW=set('round shades heartg monocle patch pixel holo goldmask nerd mask visor starg goggles squareg catg aviator roundsun threed skigoggle heromask thiefmask snorkel rainbowg diamondg pumpkinglass hw_mask hw_patch hw_mono hw_batlens wn_glass chaing hw_vampeye sparkleeye eyeglow lashes'.split())
OVER_EYE=set(['hw_mummy'])
FLOAT_OK=set(['halo','orbit','ghostpal','spiderdrop','wn_star'])
def bad_head(r):
  if r.get('empty') or r.get('err'):return ['empty' if r.get('empty') else 'err']
  b=[]
  if r['touch']<.25 and r['i'] not in FLOAT_OK:b.append('float')
  if r['eye']>.3 and r['i'] not in OVER_EYE:b.append('eye')
  if r['out']>.6:b.append('stick')
  return b
def bad_face(r):
  if r.get('empty') or r.get('err'):return ['empty' if r.get('empty') else 'err']
  b=[]
  if r['i'] in EYEW:
    if r['eye']<.5 and r['dEye']>.35:b.append('offeye')
    if r['ov']<.3:b.append('inwater')
  return b
for name,R,fn in [('HEAD',H,bad_head),('FACE',F,fn2) if False else ('FACE',F,bad_face)]:
  tot=collections.Counter();byi=collections.defaultdict(collections.Counter);byf=collections.defaultdict(collections.Counter);byp=collections.Counter();n=collections.Counter()
  for r in R:
    n[r['p']]+=1;b=fn(r)
    for k in b:tot[k]+=1;byi[r['i']][k]+=1;byf[r['f']][k]+=1;byp[(r['p'],k)]+=1
  bad=sum(1 for r in R if fn(r))
  print('==',name,'조합',len(R),'어색',bad,dict(tot));print(' 자세별',dict(byp))
  print(' 아이템 TOP',sorted(((sum(v.values()),k,dict(v)) for k,v in byi.items()),reverse=True)[:25])
  print(' 물고기 TOP',sorted(((sum(v.values()),k,dict(v)) for k,v in byf.items()),reverse=True)[:25])
