import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for lang,w,h in [('ko',390,844),('ja',320,640)]:
    pg=b.new_page(viewport={'width':w,'height':h},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%lang);pg.wait_for_timeout(1500)
    own=pg.evaluate("c=>__ev(c)","JSON.stringify(SPECIES.slice(0,40).map(function(L){return L.id}))")
    sv={'runs':12,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':500,'owned':json.loads(own),'pick':'anchovy','hwAtt':{'y':2026,'n':7,'d':'x'},'lv':{'anchovy':5}}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%lang);pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});showTab('home');1");pg.wait_for_timeout(800)
    pg.wait_for_timeout(1500);ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});1");pg.click('#hmFav');pg.wait_for_timeout(300)
    ev("sel=SPECIES[20].id;save.pick=sel;refreshHome(false);favToggle(sel);1");pg.wait_for_timeout(400)
    pg.screenshot(path='fp_home_%s.png'%lang)
    print(lang,'order',ev("JSON.stringify([].slice.call($('pickbar').children,0,5).map(function(b){return b.id+(b.classList.contains('fav')?'*':'')}))"),'fav',ev("JSON.stringify(save.fav)"))
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});1");pg.click('#pbAll');pg.wait_for_timeout(600);pg.screenshot(path='fp_all_%s.png'%lang)
    pg.fill('#fpkQ','고' if lang=='ko' else 'マ');pg.wait_for_timeout(300);print(' search n',ev("$('fpkG').children.length"))
    pg.fill('#fpkQ','');ev("FPK.f='fav';fpRender();1");print(' fav n',ev("$('fpkG').children.length"))
    ev("FPK.f='all';FPK.s='size';fpRender();1");pg.wait_for_timeout(200);pg.screenshot(path='fp_all2_%s.png'%lang)
    ev("$('fpkG').children[3].click();1");pg.wait_for_timeout(300);print(' picked',ev("JSON.stringify([sel,$('fpk').hidden,$('hmName').textContent])"))
    print(' errs',errs);pg.close()
