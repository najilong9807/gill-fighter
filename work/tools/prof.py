from playwright.sync_api import sync_playwright
import sys,json,collections
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
SC=sys.argv[1]
SETUP={
 'home':"showTab('home');1",
 'tank':"var S=AS();save.owned.forEach(function(id,i){if(i%3==0)S.eq[id]={head:'crown',fx:['fire','hearts','neon','orbitgems'][i%4]}});var H=HS();H.lv=5;showTab('tank');tankZ=1;1",
 'play':"var S=AS();S.eq[sel]={head:'wizard',face:'shades',fx:'comet'};document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});startRun('solo');1",
}
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
    pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2)
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(2500)
    pg.evaluate("c=>__ev(c)","document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=40;save.hwAttAuto=today();save.owned=SPECIES.slice(0,40).map(function(x){return x.id});persist();toHome();1")
    pg.wait_for_timeout(500);pg.evaluate("c=>__ev(c)",SETUP[SC]);pg.wait_for_timeout(2500)
    cdp=pg.context.new_cdp_session(pg);cdp.send('Profiler.enable');cdp.send('Profiler.setSamplingInterval',{'interval':200});cdp.send('Profiler.start')
    pg.wait_for_timeout(5000)
    prof=cdp.send('Profiler.stop')['profile']
    nodes={n['id']:n for n in prof['nodes']};cnt=collections.Counter(prof['samples']);tot=sum(cnt.values())
    self=collections.Counter()
    for nid,c in cnt.items():
        n=nodes[nid];cf=n['callFrame'];self[(cf['functionName'] or '(anon)')+':'+str(cf['lineNumber'])]+=c
    for k,v in self.most_common(18):print('%5.1f%% %s'%(100*v/tot,k))
    b.close()
