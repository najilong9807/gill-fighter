# App Store Connect API helper for the GitHub Actions iOS build (no secrets are printed).
# usage: python3 ci/asc.py team            -> prints Team ID (from an existing App Store profile)
#        python3 ci/asc.py next-build APPID -> prints latest build number + 1
import os,sys,time,json,re,base64,urllib.request,urllib.parse
import jwt  # PyJWT
KID=os.environ['ASC_KEY_ID'];ISS=os.environ['ASC_ISSUER_ID'];P8=os.environ['ASC_KEY_P8']
def token():
    now=int(time.time())
    return jwt.encode({'iss':ISS,'iat':now,'exp':now+1100,'aud':'appstoreconnect-v1'},P8,algorithm='ES256',headers={'kid':KID,'typ':'JWT'})
def get(path,params=None):
    u='https://api.appstoreconnect.apple.com'+path+('?'+urllib.parse.urlencode(params) if params else '')
    last=None
    for i in range(5):  # 애플 API가 잠깐 막히면(5xx · 시간 초과) 다시 시도
        try:
            r=urllib.request.Request(u,headers={'Authorization':'Bearer '+token()})
            with urllib.request.urlopen(r,timeout=60) as f:return json.load(f)
        except Exception as e:
            last=e;body=''
            try:body=e.read().decode()[:300]
            except Exception:pass
            print('retry',i+1,type(e).__name__,getattr(e,'code',''),path,body.replace(chr(10),' '),file=sys.stderr);time.sleep(10*(i+1))
    raise last
cmd=sys.argv[1]
if cmd=='team':
    bid=os.environ.get('BUNDLE_ID','com.gillfighter.game')
    d=get('/v1/profiles',{'filter[profileType]':'IOS_APP_STORE','limit':'200'})
    for p in d.get('data',[]):
        c=base64.b64decode(p['attributes'].get('profileContent') or b'').decode('latin-1')
        if bid not in c:continue
        m=re.search(r'<key>TeamIdentifier</key>\s*<array>\s*<string>([A-Z0-9]{10})</string>',c)
        if m:print(m.group(1));sys.exit(0)
    d=get('/v1/profiles',{'limit':'200'})
    for p in d.get('data',[]):
        c=base64.b64decode(p['attributes'].get('profileContent') or b'').decode('latin-1')
        m=re.search(r'<key>TeamIdentifier</key>\s*<array>\s*<string>([A-Z0-9]{10})</string>',c)
        if m:print(m.group(1));sys.exit(0)
    sys.exit('no profile with TeamIdentifier found')
elif cmd=='next-build':
    app=sys.argv[2];best=0
    d=get('/v1/builds',{'filter[app]':app,'sort':'-uploadedDate','limit':'50','fields[builds]':'version'})
    for b in d.get('data',[]):
        v=b['attributes'].get('version') or '0'
        if v.isdigit():best=max(best,int(v))
    print(best+1)
