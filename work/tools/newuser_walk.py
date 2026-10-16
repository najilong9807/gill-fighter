import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
LANG=sys.argv[1] if len(sys.argv)>1 else 'ko'
STEER=open('botsim.py').read().split('BOT="""')[1].split('function one(')[0].replace('(function(cfg){var out=[];','')
MOCK="""window.Capacitor={isNativePlatform:function(){return true},Plugins:{LocalNotifications:{schedule:function(){return Promise.resolve()},cancel:function(){return Promise.resolve()},requestPermissions:function(){return Promise.resolve({display:'granted'})}}}};"""
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.add_init_script(MOCK+"(function(){var css=%s;function go(){var st=document.createElement('style');st.textContent=css;document.head.appendChild(st)}if(document.head)go();else document.addEventListener('DOMContentLoaded',go)})()"%json.dumps(open('gfonts.css').read()))
  pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%LANG);pg.wait_for_timeout(3000)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  n=[0]
  def shot(name,wait=600):
    pg.wait_for_timeout(wait);n[0]+=1;pg.screenshot(path='nu/%s_%02d_%s.png'%(LANG,n[0],name))
    vis=ev("[].filter.call(document.querySelectorAll('.overlay'),function(o){return !o.hidden&&o.getClientRects().length}).map(function(o){return o.id})")
    print(n[0],name,vis,ev("[state,save.runs|0,save.pearls|0,save.gems|0,save.nbC|0,save.notiPend|0,save.notiAsked|0]"),flush=True)
  def play(sec):
    return ev("(function(){%s var n=0;while(state==='play'&&n<30*%d){if(n%%6===0)try{steer()}catch(e){};update(1/30);n++}return [state,Math.round(P.time),P.eaten|0,!!P.nbContd]})()"%(STEER,sec))
  def closeTop(tag):
    for k in range(4):
      vis=ev("[].filter.call(document.querySelectorAll('.overlay'),function(o){return !o.hidden&&o.getClientRects().length}).map(function(o){return o.id})")
      if not vis: return
      shot(tag+'_'+vis[-1],100)
      btn=ev("(function(){var o=document.getElementById('%s');var bs=[].filter.call(o.querySelectorAll('button'),function(b){return b.getClientRects().length&&!b.disabled});var b=bs[bs.length-1];return b?('#'+(b.id||'')):''})()"%vis[-1])
      print('  close via',btn,ev("(function(){var o=document.getElementById('%s');return [].filter.call(o.querySelectorAll('button'),function(b){return b.getClientRects().length}).map(function(b){return b.id+':'+b.textContent.trim().slice(0,12)})})()"%vis[-1]))
      if btn and btn!='#': pg.click(btn,timeout=3000)
      else: ev("$('%s').hidden=true;1"%vis[-1])
      pg.wait_for_timeout(1200)
  ev("MUS&&MUS.stop&&MUS.stop();1")
  shot('tutorial_start',300)
  print('tut',play(25));shot('tutorial_25s',200)
  ev("endRun(false);1");shot('tutorial_eaten_result',1800)
  if ev("state==='play'"): print('continued in tutorial!',play(12));ev("endRun(false);1");shot('tutorial_result2',1800)
  print('  result text:',ev("(function(){var o=document.querySelector('.overlay:not([hidden]) h1');return [o&&o.textContent,($('oMsg')||{}).textContent]})()"))
  closeTop('after_tut')
  shot('home1',800)
  closeTop('home1')
  pg.click('#playBtn');shot('modepick')
  pg.click('#mpCamp',force=True);shot('campmap',900)
  pg.click('#campGo');shot('camp1_start',900)
  print('camp',play(20));ev("endRun(false);1");shot('camp1_eaten',1800)
  closeTop('after_camp')
  shot('home2',800);shot('home2b',3200);closeTop('home2')
  pg.click('#playBtn');pg.wait_for_timeout(400);pg.click('#mpRec');shot('solo_start',900)
  print('solo',play(20));ev("endRun(false);1");shot('solo_eaten_cont',1500)
  if ev("state==='play'"): print('solo cont',play(15));ev("endRun(false);1")
  shot('solo_result',1800)
  print('  result text:',ev("(function(){var o=document.querySelector('.overlay:not([hidden]) h1');return [o&&o.textContent,($('oMsg')||{}).textContent]})()"))
  closeTop('after_solo')
  shot('home3',1500);closeTop('home3')
  shot('home3b',1500);closeTop('home3c')
  print('errs',errs)
