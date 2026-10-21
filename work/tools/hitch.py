import sys,json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
PAGE=sys.argv[1] if len(sys.argv)>1 else 't2e.html'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files']);pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2)
  pg.route(lambda u:'supabase' in u or 'google' in u or 'gvt1' in u, lambda r:r.abort());pg.goto(D+PAGE+'?lang=ko&build=release&hw=1');pg.wait_for_timeout(3500)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  out={}
  for mode,start in [('surv',"svStart(8,true)"),('single',"startRun('single')"),('multi',"NET.room='';startRun('multi')")]:
    r=ev("""(function(){document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=40;save.newsSeen=APP_VER;save.owned=SPECIES.map(function(L){return L.id});sel='clownfish';
      for(var k in SPRITES){try{SPRITES[k]._trim&&SPRITES[k]._trim()}catch(e){}}
      %s;var ts=[];for(var i=0;i<40;i++){var a=performance.now();update(1/60);draw();ts.push(Math.round(performance.now()-a))}var mx=Math.max.apply(null,ts);var lit=0;for(var k2 in SPRITES)if(SPRITES[k2]._live)lit++;try{if(state==='play')endRun(false,true)}catch(e){}return {max:mx,first10:ts.slice(0,10),avg:+(ts.reduce(function(a,b){return a+b},0)/ts.length).toFixed(1),live:lit}})()"""%start)
    out[mode]=r
  print(json.dumps(out))
