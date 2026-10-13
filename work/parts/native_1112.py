# 1.1.12 네이티브 묶음을 release/patch_add.json에 넣는다: 버전 1.1.12 + Apple 로그인 + Game Center
# 사용: python3 parts/native_1112.py [--apple] [--gc]   (기본: 둘 다)  — 개발자 사이트 준비가 끝난 뒤에만!
import json,sys,os
R='/home/claude/fishgame/'
A=json.load(open(R+'release/patch_add.json',encoding='utf-8'))
use_apple='--gc' not in sys.argv or '--apple' in sys.argv
use_gc='--apple' not in sys.argv or '--gc' in sys.argv
# 1) 버전 1.1.11 → 1.1.12 (기존 MARKETING_VERSION 항목의 b를 고침)
n=0
for r in A:
    if r.get('f')=='ios/App/App.xcodeproj/project.pbxproj' and 'MARKETING_VERSION = 1.1.11;' in r.get('b',''):
        r['b']=r['b'].replace('MARKETING_VERSION = 1.1.11;','MARKETING_VERSION = 1.1.12;');n+=1
assert n==2,('version entries',n)
# 이미 넣었으면 빼고 다시
A=[r for r in A if not r.get('n1112')]
def new(f,src):A.append({'f':f,'new':open(src,encoding='utf-8').read(),'n1112':1})
deps=[]
if use_apple:
    P=R+'parts/apple/'
    for f,s in [('plugins/gf-apple-signin/package.json','package.json'),('plugins/gf-apple-signin/index.js','index.js'),('plugins/gf-apple-signin/Package.swift','Package.swift'),('plugins/gf-apple-signin/GfAppleSignin.podspec','GfAppleSignin.podspec'),('plugins/gf-apple-signin/ios/Sources/GfAppleSignInPlugin/Plugin.swift','Plugin.swift')]:new(f,P+s)
    deps.append('"gf-apple-signin": "file:plugins/gf-apple-signin"')
if use_gc:
    P=R+'parts/gamecenter/'
    for f,s in [('plugins/gf-game-center/package.json','package.json'),('plugins/gf-game-center/index.js','index.js'),('plugins/gf-game-center/Package.swift','Package.swift'),('plugins/gf-game-center/GfGameCenter.podspec','GfGameCenter.podspec'),('plugins/gf-game-center/ios/Sources/GfGameCenterPlugin/Plugin.swift','ios/Sources/GfGameCenterPlugin/Plugin.swift')]:new(f,P+s)
    deps.append('"gf-game-center": "file:plugins/gf-game-center"')
# 권한 파일
ent=open(R+'parts/gamecenter/App.entitlements',encoding='utf-8').read()
if not use_apple: ent=ent.replace('\t<key>com.apple.developer.applesignin</key>\n\t<array>\n\t\t<string>Default</string>\n\t</array>\n','')
if not use_gc: ent=ent.replace('\t<key>com.apple.developer.game-center</key>\n\t<true/>\n','')
A.append({'f':'ios/App/App/App.entitlements','new':ent,'n1112':1})
A.append({'f':'package.json','a':'"@capacitor/filesystem": "^8.1.4"','b':'"@capacitor/filesystem": "^8.1.4",\n    '+',\n    '.join(deps),'n1112':1})
for k in ('OTHER_SWIFT_FLAGS','PRODUCT_BUNDLE_IDENTIFIER'):
    A.append({'f':'ios/App/App.xcodeproj/project.pbxproj','a':'MARKETING_VERSION = 1.1.12;\n\t\t\t\t'+k,'b':'CODE_SIGN_ENTITLEMENTS = App/App.entitlements;\n\t\t\t\tMARKETING_VERSION = 1.1.12;\n\t\t\t\t'+k,'n1112':1})
json.dump(A,open(R+'release/patch_add.json','w',encoding='utf-8'),ensure_ascii=False)
print('ok apple',use_apple,'gc',use_gc,'entries',len(A))
