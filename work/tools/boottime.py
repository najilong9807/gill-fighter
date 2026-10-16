import json,sys,time
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
F=sys.argv[1]; RATE=float(sys.argv[2]); N=int(sys.argv[3]) if len(sys.argv)>3 else 3
sv={'runs':40,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.13','newsMute':'1.1.13','thx1111':2,'pearls':12345,'owned':['anchovy','clownfish','shark'],'pick':'clownfish','introDay':'x'}
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  res=[]
  for k in range(N):
    ctx=b.new_context(viewport={'width':390,'height':844},device_scale_factor=3);pg=ctx.new_page()
    pg.route(lambda u:'supabase' in u or 'google' in u or 'fonts' in u, lambda r:r.abort())
    cdp=ctx.new_cdp_session(pg);cdp.send('Emulation.setCPUThrottlingRate',{'rate':RATE});cdp.send('Performance.enable')
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s);window.__marks={};window.__rafN=0;(function(){var o=window.requestAnimationFrame;window.requestAnimationFrame=function(f){return o.call(window,function(t){if(!window.__firstRaf)window.__firstRaf=performance.now();window.__rafN++;f(t)})}})();"%json.dumps(json.dumps(sv)))
    t0=time.time();pg.goto(D+F+'?lang=ko&build=release&hw=1',wait_until='commit')
    # poll until home tab visible and 10 frames drawn
    for i in range(400):
      st=pg.evaluate("(function(){try{var S=window.__ev?__ev('state'):'-';return {dcl:performance.timing.domContentLoadedEventEnd-performance.timing.navigationStart,load:performance.timing.loadEventEnd-performance.timing.navigationStart,fr:window.__firstRaf||0,n:window.__rafN,state:S,now:performance.now()}}catch(e){return {err:String(e)}}})()")
      if st.get('n',0)>=10 and st.get('state')=='home': break
      pg.wait_for_timeout(50)
    m={x['name']:x['value'] for x in cdp.send('Performance.getMetrics')['metrics']}
    st.update(script=round(m.get('ScriptDuration',0)*1000),layout=round(m.get('LayoutDuration',0)*1000),task=round(m.get('TaskDuration',0)*1000),jsheap=round(m.get('JSHeapUsedSize',0)/1e6,1))
    res.append(st);ctx.close()
  for r in res: print(F,'x%g'%RATE,{k:(round(v) if isinstance(v,float) else v) for k,v in r.items()})
