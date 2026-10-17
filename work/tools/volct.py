import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
STEER=open('botsim.py').read().split('BOT="""')[1].split('function one(')[0].replace('(function(cfg){var out=[];','')
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.add_init_script("(function(){var css=%s;function go(){var st=document.createElement('style');st.textContent=css;document.head.appendChild(st)}if(document.head)go();else document.addEventListener('DOMContentLoaded',go)})()"%json.dumps(open('gfonts.css').read()))
  cs={str(n):3 for n in range(1,65)}
  sv={'runs':80,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.13','newsMute':'1.1.13','thx1111':2,'pearls':100000,'gems':500,'owned':['shark','anchovy'],'pick':'shark','camp':{'s':cs,'ch':9},'en':{'n':99,'t':0},'lv':{'shark':7}}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=0');pg.wait_for_timeout(2500)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});MUS&&MUS.stop&&MUS.stop();banner=function(a,b){window.__ban=(window.__ban||[]).concat([a+' | '+b])};1")
  # camp floor 65
  ev("CAMP.cur=campFloor(65);CAMP.pend=true;sel='shark';save.pick=sel;startRun('single');1");pg.wait_for_timeout(300)
  print('zone',ev("[P.camp&&P.camp.z,zoneAt(P.y),volcOn(),VOLC.next]"))
  r=ev("""(function(){%s var n=0,er=0,em=0,hits=0,s0=P.s,shot=0;window.__ev2=null;
    while(state==='play'&&n<30*60){if(n%%5===0)try{steer()}catch(e){};var had=!!VOLC.ev;update(1/30);if(!had&&VOLC.ev)er++;em=Math.max(em,VOLC.em.length);n++;P.fx.ghost=0;
      if(VOLC.ev&&VOLC.ev.t>VOLC.ev.warn+.15&&!window.__ev2){window.__ev2=1;break}}
    return {t:Math.round(P.time),eruptions:er,maxEmbers:em,crumbs:(CR.bc||[]).filter(function(x){return /volc/.test(x)}).length,state:state}})()"""%STEER)
  print(r);ev("draw();1");pg.wait_for_timeout(100);pg.screenshot(path='pol/volc_erupt.png')
  # advance few frames and shot embers
  ev("for(var k=0;k<12;k++)update(1/30);draw();1");pg.wait_for_timeout(100);pg.screenshot(path='pol/volc_embers.png')
  # continue to see warn phase of next eruption
  r2=ev("""(function(){%s var n=0;while(state==='play'&&n<30*40){if(n%%5===0)try{steer()}catch(e){};update(1/30);n++;if(VOLC.ev&&VOLC.ev.t>0.9&&VOLC.ev.t<1.0)break}return [Math.round(P.time),!!VOLC.ev,VOLC.em.length]})()"""%STEER)
  print('warn',r2);ev("draw();1");pg.wait_for_timeout(100);pg.screenshot(path='pol/volc_warn.png')
  # long sim for hit stats
  r3=ev("""(function(){%s var n=0,er=0,hb=(CR.bc||[]).filter(function(x){return x==='volcHit'}).length;while(state==='play'&&n<30*150){if(n%%5===0)try{steer()}catch(e){};var had=!!VOLC.ev;update(1/30);if(!had&&VOLC.ev)er++;n++}
    return {t:Math.round(P.time),eruptions:er,hitsMe:(CR.bc||[]).filter(function(x){return x==='volcHit'}).length-hb,state:state,cm:cmOf(P.s)}})()"""%STEER)
  print(r3)
  # single mode deep zone
  ev("if(state==='play')endRun(false,true);document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});startRun('single');P.y=H*0.93;P.s=P.capS*0.8;rescaleWorld();1");pg.wait_for_timeout(200)
  print('single deep',ev("[zoneAt(P.y),volcOn()]"))
  r4=ev("""(function(){%s var n=0,er=0;while(state==='play'&&n<30*60){if(n%%5===0)try{steer()}catch(e){};var had=!!VOLC.ev;update(1/30);if(!had&&VOLC.ev)er++;n++;if(P.y<H*.85)P.y=H*.93}return {er:er,t:Math.round(P.time)}})()"""%STEER)
  print('single',r4)
  # multi: must be off
  ev("endRun(false,true);document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});netStart=function(){};startRun('multi');P.y=H*.93;1");print('multi off',ev("[volcOn()]"))
  print('errs',errs)
