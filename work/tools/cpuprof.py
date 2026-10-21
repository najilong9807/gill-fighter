import sys,json,collections
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
MODE=sys.argv[1];START={'surv':"svStart(8,true)",'single':"startRun('single')",'multi':"NET.room='';startRun('multi')"}[MODE];PAGE=sys.argv[2] if len(sys.argv)>2 else 't2e.html'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files']);pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2)
  pg.route(lambda u:'supabase' in u or 'google' in u or 'gvt1' in u, lambda r:r.abort());pg.goto(D+PAGE+'?lang=ko&build=release&hw=1');pg.wait_for_timeout(3500)
  cdp=pg.context.new_cdp_session(pg);cdp.send('Profiler.enable');cdp.send('Profiler.setSamplingInterval',{'interval':200});cdp.send('Profiler.start')
  r=pg.evaluate("c=>__ev(c)","""(function(){document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=40;save.newsSeen=APP_VER;save.owned=SPECIES.map(function(L){return L.id});sel='clownfish';
      %s;var ts=[];for(var i=0;i<40;i++){var a=performance.now();update(1/60);draw();ts.push(Math.round(performance.now()-a))}return ts})()"""%START)
  prof=cdp.send('Profiler.stop')['profile']
  nodes={n['id']:n for n in prof['nodes']};parent={}
  for n in prof['nodes']:
    for c in n.get('children',[]):parent[c]=n['id']
  dt=prof['timeDeltas'];samples=prof['samples'];self_t=collections.Counter();incl=collections.Counter()
  for s,d in zip(samples,dt):
    n=nodes[s];cf=n['callFrame'];self_t[(cf['functionName'] or '(anon)')+':'+str(cf['lineNumber'])]+=d
    seen=set();x=s
    while x in nodes:
      cf=nodes[x]['callFrame'];k=(cf['functionName'] or '(anon)')+':'+str(cf['lineNumber'])
      if k not in seen:incl[k]+=d;seen.add(k)
      x=parent.get(x)
      if x is None:break
  print('frames',r)
  print('SELF',[(k,round(v/1000)) for k,v in self_t.most_common(12)])
  print('INCL',[(k,round(v/1000)) for k,v in incl.most_common(25)])
