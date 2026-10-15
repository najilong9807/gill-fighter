import json,random,sys,statistics as st,math,os
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
LOSS=float(sys.argv[1]);JIT=float(sys.argv[2]);PATH=sys.argv[3] if len(sys.argv)>3 else 'line'
def truex(ms): return 200*math.sin(ms/1000*1.2) if PATH=='zig' else 90*ms/1000
def truev(ms): return 200*1.2*math.cos(ms/1000*1.2) if PATH=='zig' else 90
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
  for mode in [os.environ.get('K')]:
    random.seed(11)
    pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u, lambda r:r.abort())
    sv={'runs':50,'onb':1,'tut':1,'newsSeen':'1.1.13','newsMute':'1.1.13','introDay':'x','owned':['anchovy'],'pick':'anchovy'}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2000)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("window.requestAnimationFrame=function(){return 0};NETI.on=true;NETI.k=%s;document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});sel='anchovy';curSrv=SERVERS[0];NET.room='';startRun('multi');P.fx.ghost=999;for(var k=0;k<30;k++)update(1/30);P.time=30;joy=null;netStart=function(){};window.__pn=0;performance.now=function(){return window.__pn};1"%(mode))
    px0=ev("P.x+200")
    # schedule packets: sender every 200ms; arrival = send + 60 + U(0,JIT); loss
    pk=[];snd=0.0;q=0
    while snd<31000:
      q+=1
      if random.random()>LOSS: pk.append((snd+60+random.uniform(0,JIT),snd,q))
      snd+=200
    pk.sort();pi=0;t=0.0;rows=[]
    for f in range(900):
      t+=1000/30
      while pi<len(pk) and pk[pi][0]<=t:
        arr,sn,qq=pk[pi];pi+=1
        extra=",c:%d,q:%d"%(round(sn+5000),qq) 
        ev("window.__pn=%f;netState({i:'pj',n:'j',l:'anchovy',s:P.s,x:%f,f:0.5,vx:%f,vy:0,a:0,k:0%s});1"%(arr,px0+truex(sn),truev(sn),extra))
      ev("window.__pn=%f;P.fx.ghost=999;P.x=%f;joy=null;P.vx=P.vy=0;update(1/30);1"%(t,px0-200))
      r=ev("var b=netFind('pj');b&&b.ent?b.ent.x:null");rows.append((r,px0+truex(t)))
    xs=[r[0] for r in rows]
    d=[xs[i+1]-xs[i] for i in range(90,len(xs)-1) if xs[i] is not None and xs[i+1] is not None]
    err=[abs(r[0]-r[1]) for r in rows[90:] if r[0] is not None]
    print('%-11s loss %.2f jit %3d %s | step stdev %.2f max %.1f min %.1f stalls %d | err mean %.1f p90 %.1f'%(mode,LOSS,JIT,PATH,st.pstdev(d),max(d),min(d),sum(1 for x in d if x<.3),st.mean(err),sorted(err)[int(len(err)*.9)]),errs[:1])
    pg.close()
