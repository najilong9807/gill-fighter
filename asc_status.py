# App Store Connect 심사 상태 조회 (Codemagic에서 실행, 키 값은 출력하지 않음)
import os,sys,time,json,subprocess
subprocess.run([sys.executable,'-m','pip','install','-q','pyjwt','cryptography','requests'],check=False)
import jwt,requests
names=[k for k in os.environ if 'APP_STORE' in k or 'ASC' in k]
print('env names:',sorted(names))
kid=os.environ.get('APP_STORE_CONNECT_KEY_IDENTIFIER');iss=os.environ.get('APP_STORE_CONNECT_ISSUER_ID');pk=os.environ.get('APP_STORE_CONNECT_PRIVATE_KEY')
if not (kid and iss and pk): print('no key env; skip python check');sys.exit(0)
tok=jwt.encode({'iss':iss,'exp':int(time.time())+600,'aud':'appstoreconnect-v1'},pk,algorithm='ES256',headers={'kid':kid,'typ':'JWT'})
H={'Authorization':'Bearer '+tok};B='https://api.appstoreconnect.apple.com/v1/'
APP=os.environ.get('APP_STORE_APPLE_ID','6816376999')
def g(p):
    r=requests.get(B+p,headers=H,timeout=60);print('GET',p.split('?')[0],r.status_code);return r.json() if r.ok else {}
for v in g('apps/%s/appStoreVersions?limit=10'%APP).get('data',[]):
    a=v['attributes'];print('VERSION',a.get('versionString'),a.get('platform'),'state=',a.get('appStoreState'),'/',a.get('appVersionState'),'release=',a.get('releaseType'))
for s in g('apps/%s/reviewSubmissions?limit=10&filter[platform]=IOS'%APP).get('data',[]):
    a=s['attributes'];print('SUBMISSION',s['id'],'state=',a.get('state'),'submitted=',a.get('submittedDate'))
for b in g('builds?filter[app]=%s&sort=-uploadedDate&limit=6&include=preReleaseVersion'%APP).get('data',[]):
    a=b['attributes'];print('BUILD',a.get('version'),'processing=',a.get('processingState'),'uploaded=',a.get('uploadedDate'))
