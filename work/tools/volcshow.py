import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
LANG=sys.argv[1] if len(sys.argv)>1 else 'ko'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.add_init_script("(function(){var css=%s;function go(){var st=document.createElement('style');st.textContent=css;document.head.appendChild(st)}if(document.head)go();else document.addEventListener('DOMContentLoaded',go)})()"%json.dumps(open('gfonts.css').read()))
  cs={str(n):3 for n in range(1,65)}
  sv={'runs':80,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.13','newsMute':'1.1.13','thx1111':2,'pearls':100000,'gems':500,'owned':['shark','anchovy'],'pick':'shark','camp':{'s':cs,'ch':9},'en':{'n':99,'t':0},'lv':{'shark':7}}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=%s&build=release&hw=0'%LANG);pg.wait_for_timeout(2500)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});MUS&&MUS.stop&&MUS.stop();1")
  ev("CAMP.cur=campFloor(65);CAMP.pend=true;sel='shark';save.pick=sel;startRun('single');window.__upd=update;update=function(){};1");pg.wait_for_timeout(800)
  def step(n): ev("for(var k=0;k<%d;k++){__upd(1/30);P.fx.ghost=0;P.vx=0;P.vy=0;}1"%n)
  def shot(name):
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});1");pg.wait_for_timeout(120);pg.screenshot(path='pol/'+name+'.png');print(name)
  step(90)
  # place vent just below the player, centered
  ev("var R=viewR();VOLC.ev={x:P.x,y:P.y+R*.42,r:P.s*2.2+70*scaleOf(P.s),t:0,warn:1.6,fired:0};VOLC.next=99;banner(T('화산이 꿈틀거려요!'),T('↑ 불똥을 피해요'));1")
  step(36);shot('vs_warn_'+LANG)       # t=1.2 warn
  step(18);shot('vs_fire_'+LANG)       # t=1.8 just fired
  step(20);shot('vs_mid_'+LANG)        # t=2.47
  step(25);shot('vs_late_'+LANG)       # t=3.3
  # solo big
  ev("update=__upd;endRun(false,true);1");pg.wait_for_timeout(1800)
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});CAMP.cur=null;CAMP.pend=false;startRun('single');update=function(){};P.time=31;VOLC.bigT=.3;1");pg.wait_for_timeout(500)
  step(30);shot('vs_big0_'+LANG)
  step(75);step(5);shot('vs_big1_'+LANG)
  step(30);shot('vs_big2_'+LANG)
  print('errs',errs)
