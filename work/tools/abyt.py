import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for lang in ['ko','en','ja']:
    pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=%s&build=release'%lang);pg.wait_for_timeout(1500)
    own=pg.evaluate("c=>__ev(c)","JSON.stringify(SPECIES.slice(0,40).map(function(L){return L.id}))")
    cs={str(n):3 for n in range(1,31)}
    sv={'runs':50,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':500,'gems':0,'owned':json.loads(own),'pick':'anchovy','camp':{'s':cs,'ch':9},'en':{'n':5,'t':0}}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=%s&build=release'%lang);pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});1")
    if lang=='ko':
      bad=ev("""(function(){var o=[];for(var n=31;n<=99;n++){var f=campFloor(n);var t=campGoalText(f);if(!t||/undefined|NaN/.test(t)||(f.type==='hunt'&&!byId(f.tgt))||(f.type==='boss'&&!byId(f.boss)))o.push(n+':'+t)}return JSON.stringify(o)})()""")
      print('bad floors',bad)
      print('samples',ev(r"""JSON.stringify([31,35,40,44,50,58,60,70,71,80,99].map(function(n){var f=campFloor(n);return [n,f.type,f.z,campGoalText(f),f.lim].join(' ')}))"""))
    ev("modePickOpen();1");pg.wait_for_timeout(300);print(lang,'mp',ev("$('mpCampNext').textContent+' | '+$('mpCampStar').textContent"))
    ev("$('modePick').hidden=true;campOpen(31);1");pg.wait_for_timeout(800)
    print(' N',ev("CAMP_N"),'nodes',ev("document.querySelectorAll('#campMap .cnode').length"),'lock32',ev("$('cfl-32').disabled"),'abyss txt',ev("document.querySelector('.cmap-abyss').textContent"))
    pg.screenshot(path='aby_map_%s.png'%lang)
    ev("var b=$('cfl-31');b.scrollIntoView({block:'center'});1");pg.wait_for_timeout(300);pg.screenshot(path='aby_map31_%s.png'%lang)
    print(' info',ev("$('campInfo').innerText.replace(/\\n/g,' | ')"))
    # play floor 40 milestone (boss) quick: set stars up to 39
    ev("for(var n=31;n<=39;n++)save.camp.s[n]=2;campSync();1")
    ev("campStart(40);1");pg.wait_for_timeout(1500)
    print(' play',ev("JSON.stringify([state,P.camp&&P.camp.n,P.camp&&P.camp.z,P.zone,!!CAMP.boss])"))
    pg.screenshot(path='aby_play40_%s.png'%lang)
    g0=ev("save.gems||0")
    ev("CAMP.bossDown=true;campTick();1");pg.wait_for_timeout(800)
    print(' res',ev("JSON.stringify([$('crTag').textContent,$('crRw').innerText.replace(/\\n/g,' '),$('crNext').hidden,CAMP_N,(save.gems||0)])"),'g0',g0)
    pg.screenshot(path='aby_res40_%s.png'%lang)
    print(' errs',errs);pg.close()
