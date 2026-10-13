# 1.1.11 새 저장 칸이 망가져 있어도(타입 엉망) 켜지고, 주요 화면이 오류 없이 열리는지
from playwright.sync_api import sync_playwright
import json,random
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
FIELDS=['aby','hwAtt','ach','cloud','tks','house','decor','tips','hwAttAuto','tut','acct','hwOff','newsSeen','owned','pick','mp','tank']
BAD=[None,'x',5,-3,[],[1,'a'],{},{'n':'q','d':7,'aff':'z','vis':3,'got':None,'placed':'no','inv':[1]},True,1e309]
random.seed(7)
cases=[]
for f in FIELDS:
    for v in BAD: cases.append({f:v})
for k in range(40):
    cases.append({f:random.choice(BAD) for f in random.sample(FIELDS,5)})
ACT="""(function(){var out=[];function t(n,f){try{f();out.push(n)}catch(e){out.push(n+'!'+String(e).slice(0,80))}}
t('home',function(){showTab('home')});t('tank',function(){showTab('tank');for(var i=0;i<7;i++)coralTap()});t('guest',function(){guestReady()});
t('ach',function(){achOpen()});t('gb',function(){guestBook()});t('fr',function(){tkFrOpen()});t('ha',function(){hwAttOpen();hwAttClaim()});
t('dot',function(){chestDot()});t('set',function(){$('setBtn').click()});t('run',function(){document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});sel=save.owned[0];startRun('single');for(var k=0;k<60;k++)update(1/30);endRun(false,false,null)});
t('persist',function(){persist()});return out.filter(function(x){return x.indexOf('!')>0})})()"""
bad=0
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    for i,c in enumerate(cases):
        base={'runs':12,'onb':1,'tut':1,'newsSeen':'1.1.11','pearls':500,'gems':5,'owned':['anchovy','clownfish'],'pick':'anchovy'}
        base.update(c)
        ctx=b.new_context(viewport={'width':390,'height':844});pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:140]))
        pg.route(lambda u:'supabase' in u, lambda r:r.abort())
        pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(base,allow_nan=True)))
        pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(1800)
        try: r=pg.evaluate("c=>__ev(c)",ACT)
        except Exception as e: r=['EVAL '+str(e)[:120]]
        pg.wait_for_timeout(300)
        if r or errs:
            bad+=1;print(i,json.dumps(c,ensure_ascii=False)[:120],'->',r[:3],errs[:2],flush=True)
        ctx.close()
    b.close()
print('cases',len(cases),'bad',bad)
