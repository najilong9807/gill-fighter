import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
F=sys.argv[1]; FISH=sys.argv[2]
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:80]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  sv={'runs':20,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'9','newsMute':'9','thx1111':2,'owned':[FISH,'anchovy'],'pick':FISH}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+F+'?lang=ko&hw=0');pg.wait_for_timeout(2500)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});sel='%s';save.pick=sel;startRun('single');1"%FISH);pg.wait_for_timeout(300)
  out=[]
  for frac in [0,.1,.25,.5,.75,1.0]:
    r=ev("""(function(){P.s=P.startS+(P.capS-P.startS)*%s;rescaleWorld();for(var i=0;i<240;i++){zoom=targetZoom();}keys={ArrowRight:true};P.vx=0;P.vy=0;
      var x0=P.x,z=targetZoom();for(var k=0;k<60;k++){update(1/60);P.fx={}}var d=(P.x-x0);keys={};
      return {cm:Math.round(cmOf(P.s)),screen:Math.round(d*z),bodyLensPerSec:+(d/(P.s*2.75)).toFixed(2)}})()"""%frac)
    out.append(r)
  base=out[0]['screen'] or 1
  for r in out: print(r['cm'],'cm  screen px/s',r['screen'],' (%d%%)'%round(100*r['screen']/base),' body-lengths/s',r['bodyLensPerSec'])
  print('errs',errs[:2])
