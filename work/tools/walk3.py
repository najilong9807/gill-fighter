from playwright.sync_api import sync_playwright
import sys,os,json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
L,VW,VH=sys.argv[1],int(sys.argv[2]),int(sys.argv[3]);TAG='%s%d'%(L,VW)
LINT=open('walk2.py').read().split('LINT=r"""')[1].split('"""')[0]
os.makedirs('W3',exist_ok=True)
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':VW,'height':VH},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:160]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%L);pg.wait_for_timeout(1500)
  own=pg.evaluate("c=>__ev(c)","JSON.stringify(SPECIES.map(function(L){return L.id}))")
  cs={str(n):3 for n in range(1,31)};cs.update({str(n):2 for n in range(31,36)})
  sv={'runs':80,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':123456,'gems':321,'owned':json.loads(own),'pick':'shark','camp':{'s':cs,'ch':9},'en':{'n':5,'t':0},'fav':['shark','manta'],'recent':['shark','anchovy'],'top':{'score':54321}}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.add_init_script("1")
  pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%L);pg.add_style_tag(content=':root{--sat:47px;--sab:34px}');pg.wait_for_timeout(2600)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  def hide(): ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});document.querySelectorAll('.coach').forEach(function(x){x.remove()});bannerOff();1")
  out={}
  def go(name,js,wait=700):
    hide()
    try: ev(js+";1")
    except Exception as e: out[name]={'jserr':str(e)[:120]};return
    pg.wait_for_timeout(wait);pg.screenshot(path='W3/%s_%s.png'%(TAG,name))
    r=ev(LINT);bad={k:v for k,v in r.items() if v}
    if bad: out[name]=bad
  go('home',"showTab('home')")
  go('modepick',"showTab('home');modePickOpen()")
  go('camp',"campOpen(36)")
  go('camp31',"campOpen(31);var b=$('cfl-31');b&&b.scrollIntoView({block:'center'})")
  go('fpk',"showTab('home');fpOpen()")
  go('mydeco',"showTab('tank');mydOpen()")
  go('hwev',"hwEvOpen()")
  go('shop',"showTab('sea')")
  go('dex',"showTab('dex')")
  go('daily',"showTab('home');dmOpen&&dmOpen()")
  go('news',"newsOpen&&newsOpen(true)")
  print(TAG,json.dumps(out,ensure_ascii=False));print(TAG,'errs',errs[:5])
