import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
LINT=open('walk2.py').read().split('LINT=r"""')[1].split('"""')[0]
src=open('decoex.py').read();LAY=eval(src.split('LAY=')[1].split('\nFISH=')[0]);JSTANK=src.split('js="""')[1].split('"""')[0]
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  ctx=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2,timezone_id='Asia/Seoul')
  pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
  pg.clock.install(time=sys.argv[1] if len(sys.argv)>1 else '2026-11-22T10:00:00+09:00')
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  sv={'runs':120,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.13','newsMute':'1.1.13','thx1111':2,'introDay':'Sun Nov 22 2026','pearls':50000,'gems':300,'owned':['dumbo','shark','clownfish'],'pick':'dumbo','tankBgs':['hwnight','reef'],'tankBg':'hwnight','acc':{'own':['hw_witch','hw_batlens','hw_souls'],'eq':{'dumbo':{'head':'hw_witch','fx':'hw_souls'}}},'hwAtt':{'y':2026,'n':7,'d':'x'},'house':{'lv':3,'acc':0,'at':1791800000000,'fed':0,'boost':0}}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=ko&build=release');pg.add_style_tag(path='gfonts.css');pg.wait_for_timeout(3000)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  print('season',ev("hwSeason()"),'date',ev("new Date().toString()"))
  pg.evaluate("a=>__ev(a[0])(a[1])",[JSTANK,LAY['hw']])
  for nm,js in [('home',"showTab('home')"),('tank',"showTab('tank')"),('shop',"showTab('sea')"),('dex',"showTab('dex')"),('daily',"showTab('home');dmOpen()"),('play',"document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});sel='dumbo';startRun('single');for(var k=0;k<200;k++)update(1/30)"),('surv',"endRun(false);document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});var S=svSave();S.guide=1;svStart(1);for(var k=0;k<200;k++)update(1/30)")]:
    try: ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});"+js+";1")
    except Exception as e: print(nm,'jserr',str(e)[:150]);continue
    pg.wait_for_timeout(1000);pg.screenshot(path='ph_%s.png'%nm);r=ev(LINT);print(nm,json.dumps({k:v for k,v in r.items() if v},ensure_ascii=False)[:300])
  print('hwtext',ev("[].slice.call(document.querySelectorAll('body *')).filter(function(e){return e.getClientRects().length&&e.children.length==0&&/할로윈|호박|사탕/.test(e.textContent)}).map(function(e){return (e.id||e.className)+':'+e.textContent.slice(0,30)}).slice(0,15)"))
  print('errs',errs)
