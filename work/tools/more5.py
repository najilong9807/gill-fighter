import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
LINT=open('walk2.py').read().split('LINT=r"""')[1].split('"""')[0]
SC=[('p_home',"showTab('home');1"),('p_tank',"showTab('tank');1"),('p_dex',"showTab('dex');1"),('p_shop',"showTab('sea');1"),('modepick',"showTab('home');modePickOpen();1"),('camp',"showTab('home');campOpen();1"),('news',"showTab('home');try{newsShow()}catch(e){};1"),('sveq',"var S=svSave();S.guide=1;svEqShow();1"),('svrk',"svRkShow();1"),('svbud',"svBudShow();1"),('svach',"svAchShow();1"),('svtr',"svTrShow();1"),('svguide',"svGuideShow(1);1"),('rank',"showTab('rec');1"),('rank_camp',"showTab('rec');lbShow('camp');1"),('rank_surv',"showTab('rec');lbShow('surv');1"),('set',"showTab('set');1"),('svch',"showTab('home');svChShow();1"),('dm_w',"showTab('home');dmOpen();DMV.tab='w';dmOpen();1"),('dm_m',"showTab('home');dmOpen();DMV.tab='m';dmOpen();1")]
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for lg in sys.argv[1].split(','):
    pg=b.new_page(viewport={'width':375,'height':667},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    cs={str(n):3 for n in range(1,36)}
    sv={'runs':80,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':12345,'owned':['anchovy','shark','tuna'],'pick':'shark','camp':{'s':cs,'ch':9},'top':{'score':54321},'sv':{'guide':1,'plays':12,'gold':500},'nick':'Finn'}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%lg);pg.add_style_tag(path='gfonts.css');pg.add_style_tag(content=':root{--sat:47px;--sab:34px}');pg.wait_for_timeout(2600)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    for nm,js in SC:
      try: ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});"+js)
      except Exception as e: print(lg,nm,'jserr',str(e)[:120]);continue
      pg.wait_for_timeout(900);pg.screenshot(path='M/375_%s_%s.png'%(lg,nm));r=ev(LINT);r['hov']=ev("[].slice.call(document.querySelectorAll('body *')).filter(function(e){var c=getComputedStyle(e);return e.scrollWidth>e.clientWidth+1&&e.clientWidth>100&&e.getClientRects().length&&c.overflowX!=='visible'&&c.overflowX!=='hidden'}).map(function(e){return (e.id||e.className)+':'+e.scrollWidth+'/'+e.clientWidth}).slice(0,5)");print(lg,nm,json.dumps({k:v for k,v in r.items() if v},ensure_ascii=False)[:300])
    print(lg,'errs',errs[:3]);pg.close()
