import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
MOCK="""window.Capacitor={isNativePlatform:function(){return true},Plugins:{LocalNotifications:{calls:[],schedule:function(o){this.calls.push(['s',o]);return Promise.resolve()},cancel:function(o){this.calls.push(['c',o]);return Promise.resolve()},requestPermissions:function(){this.calls.push(['p']);return Promise.resolve({display:'granted'})}}}};"""
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for lang in ['ko','en','ja']:
    pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    sv={'runs':1,'onb':1,'tut':1,'newsSeen':'1.1.13','newsMute':'1.1.13','introDay':'x','thx1111':2,'owned':['anchovy'],'pick':'anchovy','nbC':9,'firstAt':1760000000000}
    pg.add_init_script(MOCK+"localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=%s&build=release'%lang);pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});MUS&&MUS.stop&&MUS.stop();1")
    # run 2 → eaten
    ev("startRun('single');for(var k=0;k<90;k++)update(1/30);endRun(false);1");pg.wait_for_timeout(300)
    st=ev("[save.runs,save.notiPend|0,save.notiAsked|0,state]");print(lang,'after run2',st)
    # go home via the result screen's home button if exists, else toHome
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});toHome();1");pg.wait_for_timeout(1600)
    vis=ev("[!$('notiAsk').hidden,document.querySelector('#notiAsk .lead').textContent,save.notiAsked|0,state]");print(lang,'ask shown',vis)
    pg.screenshot(path='attnoti_%s.png'%lang)
    ev("$('naYes').click();1");pg.wait_for_timeout(400)
    print(lang,'noti',ev("[save.noti,Capacitor.Plugins.LocalNotifications.calls.map(function(c){return c[0]})]"))
    # simulate hide → notiPlan
    ev("Capacitor.Plugins.LocalNotifications.calls.length=0;save.att={last:today(),n:2,claim:true};Object.defineProperty(document,'hidden',{get:function(){return true},configurable:true});document.dispatchEvent(new Event('visibilitychange'));1");pg.wait_for_timeout(300)
    calls=ev("JSON.stringify(Capacitor.Plugins.LocalNotifications.calls.filter(function(c){return c[0]==='s'}).map(function(c){return c[1].notifications.map(function(n){return [n.id,n.body,new Date(n.schedule.at).toString().slice(0,24)]})}))")
    print(lang,'planned',calls,'now',ev("new Date().toString().slice(0,24)"))
    # streak 7 and no attendance today
    ev("Capacitor.Plugins.LocalNotifications.calls.length=0;save.att={last:'2020-1-1',n:7,claim:true};notiPlan();1")
    print(lang,'no-att body',ev("Capacitor.Plugins.LocalNotifications.calls.filter(function(c){return c[0]==='s'}).map(function(c){return c[1].notifications[0].body})"))
    # second time: should not ask again
    ev("startRun('single');for(var k=0;k<60;k++)update(1/30);endRun(false);document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});toHome();1");pg.wait_for_timeout(1500)
    print(lang,'ask again?',ev("[!$('notiAsk').hidden,save.notiPend|0]"),'errs',errs);pg.close()
  # negative: runs=0 → after 1 run no ask
  pg=b.new_page(viewport={'width':390,'height':844});pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  sv['runs']=0;pg.add_init_script(MOCK+"localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500);ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});startRun('single');for(var k=0;k<60;k++)update(1/30);endRun(false);document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});toHome();1");pg.wait_for_timeout(1500)
  print('run1 ask?',ev("[save.runs,!$('notiAsk').hidden,save.notiPend|0]"))
