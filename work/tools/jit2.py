import json,random,sys,statistics as st
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
LOSS=float(sys.argv[1]) if len(sys.argv)>1 else .15; JIT=float(sys.argv[2]) if len(sys.argv)>2 else 120
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
  for on in [False,True]:
    random.seed(7)
    pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u, lambda r:r.abort())
    sv={'runs':50,'onb':1,'tut':1,'newsSeen':'1.1.13','newsMute':'1.1.13','introDay':'x','owned':['anchovy'],'pick':'anchovy'}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2000)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("window.requestAnimationFrame=function(){return 0};NETI.on=%s;document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});sel='anchovy';curSrv=SERVERS[0];NET.room='';startRun('multi');P.fx.ghost=999;for(var k=0;k<30;k++)update(1/30);P.time=30;joy=null;netStart=function(){};window.__pn=0;performance.now=function(){return window.__pn};1"%('true' if on else 'false'))
    sp=90.0;t=0.0;nxt=0.0;px0=ev("P.x+200");rows=[]
    for f in range(900):
      t+=1000/30
      while nxt<=t:
        px=px0+sp*nxt/1000
        if random.random()>LOSS: ev("window.__pn=%f;netState({i:'pj',n:'j',l:'anchovy',s:P.s,x:%f,f:0.5,vx:%f,vy:0,a:0,k:0});1"%(nxt,px,sp))
        nxt+=200+random.uniform(-JIT,JIT)
      ev("window.__pn=%f;P.fx.ghost=999;P.x=%f;joy=null;P.vx=P.vy=0;update(1/30);1"%(t,px0-200))
      rows.append(ev("var b=netFind('pj');b&&b.ent?[Math.round(b.ent.x*10)/10,state]:[null,state]"))
    xs=[r[0] for r in rows];gone=[i for i,r in enumerate(rows) if r[0] is None]
    d=[xs[i+1]-xs[i] for i in range(60,len(xs)-1) if xs[i] is not None and xs[i+1] is not None]
    print('NETI',on,'loss',LOSS,'jit',JIT,'gone',len(gone),gone[:3],'mean',round(st.mean(d),2),'stdev',round(st.pstdev(d),2),'max',round(max(d),1),'min',round(min(d),1),'stalls',sum(1 for x in d if x<.3),'jumps>8',sum(1 for x in d if x>8),errs[:1])
    pg.close()
