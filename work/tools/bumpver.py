import json,sys
p=sys.argv[1];old,new=sys.argv[2],sys.argv[3]
A=json.load(open(p,encoding='utf-8'));n=0
for r in A:
  if r.get('f','').endswith('project.pbxproj') and 'b' in r and 'CODE_SIGN_ENTITLEMENTS' in r['b'] and ('MARKETING_VERSION = %s;'%old) in r['b']:
    r['b']=r['b'].replace('MARKETING_VERSION = %s;'%old,'MARKETING_VERSION = %s;'%new);n+=1
assert n==2,n
json.dump(A,open(p,'w',encoding='utf-8'),ensure_ascii=False);print('bumped',n)
