import json,sys,collections
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
RATE=float(sys.argv[1]) if len(sys.argv)>1 else 4
sv={'runs':40,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.13','newsMute':'1.1.13','thx1111':2,'pearls':12345,'owned':['anchovy','clownfish','shark'],'pick':'clownfish','introDay':'x'}
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  ctx=b.new_context(viewport={'width':390,'height':844},device_scale_factor=3);pg=ctx.new_page()
  pg.route(lambda u:'supabase' in u or 'google' in u or 'fonts' in u, lambda r:r.abort())
  cdp=ctx.new_cdp_session(pg);cdp.send('Emulation.setCPUThrottlingRate',{'rate':RATE})
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  cdp.send('Profiler.enable');cdp.send('Profiler.setSamplingInterval',{'interval':500});cdp.send('Profiler.start')
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=1',wait_until='commit')
  for i in range(200):
    st=pg.evaluate("window.__ev?__ev('state'):'-'")
    if st=='home': break
    pg.wait_for_timeout(50)
  pg.wait_for_timeout(300)
  prof=cdp.send('Profiler.stop')['profile']
  nodes={n['id']:n for n in prof['nodes']}
  # self time per node from samples/timeDeltas
  self_t=collections.Counter()
  for sid,dt in zip(prof['samples'],prof['timeDeltas']): self_t[sid]+=dt
  # build parent map for inclusive time
  parent={}
  for n in prof['nodes']:
    for c in n.get('children',[]): parent[c]=n['id']
  incl=collections.Counter()
  for nid,t in self_t.items():
    x=nid;seen=set()
    while x is not None and x not in seen:
      seen.add(x);incl[x]+=t;x=parent.get(x)
  def name(n):
    cf=nodes[n]['callFrame'];return (cf['functionName'] or '(anon)')+':'+str(cf['lineNumber'])
  tot=sum(self_t.values())/1000
  print('total sampled ms',round(tot))
  agg=collections.Counter()
  for nid,t in self_t.items(): agg[name(nid)]+=t
  print('--- self top 25')
  for k,v in agg.most_common(25): print(round(v/1000),k)
  agg2=collections.Counter()
  for nid,t in incl.items(): agg2[name(nid)]=max(agg2[name(nid)],t)
  print('--- inclusive top 30')
  for k,v in agg2.most_common(30): print(round(v/1000),k)
