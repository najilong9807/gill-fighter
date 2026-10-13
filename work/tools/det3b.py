import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for lang in ['ko','en']:
    pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    sv={'runs':12,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.11','newsMute':'1.1.11','thx1111':1,'pearls':500,'owned':['anchovy'],'pick':'anchovy','hwAtt':{'y':2026,'n':3,'d':'x'}}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%lang)
    seq=[]
    for i in range(40):
      pg.wait_for_timeout(1000)
      o=pg.evaluate("()=>[].filter.call(document.querySelectorAll('.overlay'),function(e){return !e.hidden}).map(function(e){return e.id}).join(',')")
      if not seq or seq[-1]!=o: seq.append(o)
      if o=='news' and len(seq)<=4:
        pg.wait_for_timeout(600);pg.screenshot(path='d3_news_%s.png'%lang);print(pg.evaluate("()=>{var b=document.getElementById('newsOk');return [b.offsetHeight,getComputedStyle(b).height,b.className,b.parentNode.className,getComputedStyle(b).flex]}"))
      if o: 
        pg.wait_for_timeout(700)
        btn={'news':'#newsOk','thx':'#thxOk','hwAtt':'#haGet','daily':'#dmClose'}.get(o.split(',')[0])
        if btn:
          try: pg.click(btn,timeout=2000)
          except Exception as e: pass
          if o.startswith('hwAtt'):
            pg.wait_for_timeout(500)
            try:pg.click('#haX',timeout=2000)
            except:pass
    print(lang,seq,pg.evaluate("c=>__ev(c)","JSON.stringify([save.pearls,save.thx1111,save.newsSeen])"),errs)
    pg.close()
