import json,time
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for mode in ['server_ok','server_old']:
    pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:120]))
    sent=[]
    def h(r):
      if 'gf-account' in r.request.url:
        sent.append(r.request.post_data)
        if mode=='server_ok':r.fulfill(status=200,content_type='application/json',body='{"ok":true,"unlinked":true}')
        else:r.fulfill(status=400,content_type='application/json',body='{"error":"op"}')
      else:r.abort()
    pg.route(lambda u:'supabase' in u or 'google' in u,h)
    pg.goto(D+'t2e.html?lang=ko&apple=1');pg.wait_for_timeout(600)
    sv={'runs':30,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.14','newsMute':'1.1.14','thx1111':2,'owned':['anchovy'],'pick':'anchovy','acct':{'on':1,'at':1},'cloud':{'code':'ABCDEFGHJKLM'}}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=ko&apple=1');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});appleToken=function(cb){cb('TOK')};applePlug=function(){return {authorize:function(){}}};showTab('set');renderSetPage();1");pg.wait_for_timeout(500)
    has=ev("!!document.getElementById('acctOff')");print('dbg',ev("[!!document.getElementById('acctBtn'),!!document.getElementById('setCloud'),JSON.stringify(save.acct),dev()]"))
    if mode=='server_ok':
      el=pg.query_selector('#acctOff')
      if el: el.scroll_into_view_if_needed();pg.screenshot(path='unlink_row.png')
    pg.click('#acctOff',force=True,timeout=3000);pg.wait_for_timeout(300)
    pg.screenshot(path='unlink_dlg_%s.png'%mode)
    pg.evaluate("c=>__ev(c)","(function(){var d=document.getElementById('gfDlg');var b=d&&d.querySelector('button');if(b)b.click();return 1})()");pg.wait_for_timeout(800)
    print(mode,'row',has,'sent',[json.loads(x).get('op') for x in sent if x],'acct',ev("JSON.stringify(save.acct)"),'rowAfter',ev("!!document.getElementById('acctOff')"),'banner',ev("(document.querySelector('.banner,#banner')||{}).textContent||''")[:40],'errs',errs[:2])
    pg.close()
