import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
STEER=open('botsim.py').read().split('BOT="""')[1].split('function one(')[0].replace('(function(cfg){var out=[];','')
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
  ev("VIMG.get('vent');VIMG.get('ember');VIMG.get('smoke');VIMG.get('erupt');1");pg.wait_for_timeout(600)
  print('imgs',ev("['vent','ember','smoke','erupt'].map(function(k){var m=VIMG.im[k];return k+':'+m.naturalWidth+'x'+m.naturalHeight})"))
  ev("CAMP.cur=campFloor(65);CAMP.pend=true;sel='shark';save.pick=sel;startRun('single');1");pg.wait_for_timeout(300)
  def run(cond,maxn):
    return ev("""(function(){%s var n=0;while(state==='play'&&n<%d){if(n%%5===0)try{steer()}catch(e){};update(1/30);n++;P.fx.ghost=0;if(%s)break}return [Math.round(P.time*10)/10,state,!!VOLC.ev,VOLC.ev&&VOLC.ev.t,VOLC.em.length,VOLC.fx.length]})()"""%(STEER,maxn,cond))
  def shot(name):
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});draw();1");pg.wait_for_timeout(80);pg.screenshot(path='pol/'+name+'.png');print(name)
  print(run("VOLC.ev&&VOLC.ev.t>1.1&&VOLC.ev.t<1.2",30*60));shot('vi_warn_'+LANG)
  print(run("VOLC.ev&&VOLC.ev.t>VOLC.ev.warn+.2",30*5));shot('vi_fire_'+LANG)
  print(run("VOLC.ev&&VOLC.ev.t>VOLC.ev.warn+.8",30*5));shot('vi_mid_'+LANG)
  print(run("VOLC.em.length&&VOLC.em[0].life<1.4",30*5));shot('vi_late_'+LANG)
  # solo big
  print('S0',ev("[state,P.dead]"));ev("if(state==='play')endRun(false,true);1");pg.wait_for_timeout(1800);print("S1",ev("[state]"))
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});CAMP.cur=null;CAMP.pend=false;startRun('single');1");print('S2',ev("[state]"));pg.wait_for_timeout(300);print('S3',ev("[state,P.time]"))
  ev("window.__er=[];var endRun_=endRun;endRun=function(){__er.push([P.time,new Error().stack.split('\\n').slice(1,5).join('|')]);return endRun_.apply(this,arguments)};VOLC.bigT=0.5;P.time=31;1");pg.wait_for_timeout(200);print('S4',ev("[state,P.time]"));pg.wait_for_timeout(300);print('S5',ev("[state,P.time,P.dead,__er]"))
  print('solo',ev("[state,!!P.camp,volcOn(),P.time]"));pg.screenshot(path='pol/vi_solo_dbg.png');print(ev("Array.from(document.querySelectorAll('.overlay')).filter(function(o){return !o.hidden}).map(function(o){return o.id+':'+(o.textContent||'').slice(0,80)})"))
  print(run("VOLC.big&&VOLC.big.t<VOLC.big.warn",30*30));shot('vi_big0_'+LANG)
  print(run("VOLC.big&&VOLC.big.t>VOLC.big.warn+1.3",30*30));shot('vi_big1_'+LANG)
  print(run("VOLC.big&&VOLC.big.t>VOLC.big.warn+4",30*30));shot('vi_big2_'+LANG)
  # perf: frame time with lots of fx
  pt=ev("""(function(){var t0=performance.now();for(var k=0;k<60;k++)draw();return Math.round((performance.now()-t0)/60*100)/100})()""")
  print('draw ms/frame',pt,'em',ev("VOLC.em.length"),'fx',ev("VOLC.fx.length"))
  print('errs',errs)
