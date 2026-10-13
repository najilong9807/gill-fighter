import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
cases={'stuck1':{'thx1111':1},'zero_old':{'thx1111':0},'got2':{'thx1111':2},'new_user':{'firstAt':1791800000000,'thx1111':0},'from1110':{}}
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
  for k,extra in cases.items():
    pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:120]))
    pg.route(lambda u:'supabase' in u or 'googleapis' in u, lambda r:r.abort())
    sv={'runs':12,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.11','pearls':500,'owned':['anchovy'],'pick':'anchovy'}
    if k=='from1110': sv['newsSeen']='1.1.10'
    sv.update(extra)
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=ko&build=release')
    seen=False
    for i in range(30):
      pg.wait_for_timeout(1000)
      if pg.evaluate("()=>{var t=document.getElementById('thx');return !!t&&!t.hidden}"):
        seen=True;pg.click('#thxOk');pg.wait_for_timeout(500);break
      pg.evaluate("()=>{document.querySelectorAll('.overlay').forEach(o=>{if(o.id!=='thx'&&!o.hidden)o.hidden=true})}")
    print(k,'popup',seen,pg.evaluate("c=>__ev(c)","[save.thx1111,save.pearls]"),errs[:2],flush=True)
    pg.close()
