from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
MOCK="""(function(){var T0=%d,R=Date,st=R.now();function F(a,b,c,d,e,f,g){if(!(this instanceof F))return new R(T0+(R.now()-st)).toString();var x=arguments.length?new (Function.prototype.bind.apply(R,[null].concat([].slice.call(arguments))))():new R(T0+(R.now()-st));Object.setPrototypeOf(x,F.prototype);return x}
F.prototype=Object.create(R.prototype);F.prototype.constructor=F;F.now=function(){return T0+(R.now()-st)};F.UTC=R.UTC;F.parse=R.parse;window.Date=F})()"""
import datetime
def ms(s):return int(datetime.datetime.fromisoformat(s).timestamp()*1000)
SAVE={'runs':12,'onb':1,'tut':1,'newsSeen':'1.1.11','pearls':5000,'gems':50,'owned':['anchovy','clownfish'],'pick':'anchovy','decor':{'placed':[{'k':'jacko','x':.4,'y':.8,'s':1,'f':0}],'inv':{'cauldron':1},'v':2},'tankBg':'hwnight'}
Q="""(function(){var r={HW:HW,season:hwSeason(),can:hwAttCan(),bar:!$('hwBar').hidden,cls:document.body.classList.contains('hw')};
showTab('sea');r.shopHw=[].filter.call(document.querySelectorAll('#sea *'),function(e){return /호박|잭오|유령|마녀|박쥐|할로윈/.test(e.textContent)&&!e.children.length}).length;
showTab('tank');r.decoHw=DS().placed.map(function(q){return q.k}).join(',');r.today=today();return r})()"""
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    for when in ['2026-10-09T12:00','2026-10-10T00:05','2026-11-21T23:50','2026-11-22T00:10','2027-10-12T09:00']:
        ctx=b.new_context(viewport={'width':390,'height':844},timezone_id='Asia/Seoul');pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:150]))
        pg.route(lambda u:'supabase' in u, lambda r:r.abort())
        pg.add_init_script(MOCK%ms(when+'+09:00'))
        pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(SAVE)))
        pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(3500)
        r=pg.evaluate("c=>__ev(c)",Q);print(when,json.dumps(r,ensure_ascii=False),errs[:2],flush=True)
        if when.startswith('2026-11-21'):
            pg.wait_for_timeout(1000)
            # 자정 넘기기: 열린 채로 20분 앞당기기는 어려워 hwSeason만 직접 확인
        ctx.close()
    b.close()
