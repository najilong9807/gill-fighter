# 번역 결과 → 저장소 lang/<언어>.js(본게임) · lang/city_<언어>.js(마을) · lang/index.js(있는 언어 목록)
# python3 build_lang.py <언어코드> [...]   (validate.py 를 통과한 것만)
import json,sys,os,re
R='/home/claude/gill-fighter/lang/';os.makedirs(R,exist_ok=True)
main=json.load(open('main.json'));K={str(m[0]):m[1] for m in main}
cd=json.load(open('city_d.json'));ct=json.load(open('city_t.json'));mx=json.load(open('mx.json'));rx=json.load(open('rx.json'));mx2=json.load(open('mx2.json'))
def js(o):return json.dumps(o,ensure_ascii=False,separators=(',',':')).replace('</','<\\/').replace('\u2028','\\u2028').replace('\u2029','\\u2029')
for L in sys.argv[1:]:
    O='out/'+L+'/';TRX={}
    for c in range(1,5):
        for i,t in json.load(open(O+'main_%d.json'%c)).items():TRX[K[i]]=t
    o=json.load(open(O+'other.json'))
    M={e:o['mx'][str(i)] for i,e,es in mx}
    for i,e in mx2:
        t=(o.get('mx2') or {}).get(str(i))
        if t:M[e]=t
    RR=[[a,o['rx'][str(i)]] for i,a,b in rx]
    pack={'town':o['pack']['town'],'city':o['pack']['city']}
    open(R+L+'.js','w',encoding='utf-8').write('/* 아가미 파이터 언어 꾸러미 '+L+' — work/lang_src/build_lang.py 로 만듦 */\nwindow.GF_TRX='+js(TRX)+';\nwindow.GF_M='+js(M)+';\nwindow.GF_R='+js(RR)+';\nwindow.GF_LAB={};\nwindow.GF_PACK='+js(pack)+';\n')
    X={'u':o['city_u'],'t':[[k,o['city_t'][str(i)]] for i,k,e in ct],'d':{k:o['city_d'][str(i)] for i,k,e in cd}}
    open(R+'city_'+L+'.js','w',encoding='utf-8').write('/* 아가미시티 언어 꾸러미 '+L+' */\nwindow.I18N_X='+js(X)+';\n')
    print(L,len(TRX),'main keys',os.path.getsize(R+L+'.js'),'bytes')
codes=sorted(f[:-3] for f in os.listdir(R) if f.endswith('.js') and f not in('index.js',) and not f.startswith('city_') and os.path.exists(R+'city_'+f))
open(R+'index.js','w').write('/* 언어 꾸러미가 있는 언어(ko · en · ja · es · vi 는 본문에 있음) */\nwindow.GF_LP='+json.dumps(codes)+';\n')
print('index',codes)
