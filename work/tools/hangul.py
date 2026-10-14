import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
STEER=open('botsim.py').read().split('BOT="""')[1].split('function one(')[0].replace('(function(cfg){var out=[];','')
HOOK="""(function(){window.__HG=window.__HG||{};var re=/[\\uAC00-\\uD7A3]/;function chk(s,src){s=String(s||'');if(re.test(s))__HG[src+': '+s.slice(0,60)]=1}
var tp=texts.push;texts.push=function(){for(var i=0;i<arguments.length;i++){try{chk(arguments[i].txt,'txt')}catch(e){}}return tp.apply(this,arguments)};
var b0=banner;banner=function(a,b){chk(a,'ban');chk(b,'ban');return b0.apply(this,arguments)};
new MutationObserver(function(ms){ms.forEach(function(m){var t=m.target.nodeType===3?m.target.parentElement:m.target;if(!t||!t.getClientRects||!t.getClientRects().length)return;chk(t.textContent&&t.textContent.length<200?t.textContent:'', 'dom#'+(t.id||t.className))})}).observe(document.body,{subtree:true,childList:true,characterData:true})})();1"""
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for lg in ['ja','en']:
    pg=b.new_page(viewport={'width':390,'height':844});pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%lg);pg.wait_for_timeout(1200)
    own=pg.evaluate("c=>__ev(c)","JSON.stringify(SPECIES.map(function(L){return L.id}))")
    cs={str(n):3 for n in range(1,36)}
    sv={'runs':80,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':99999,'gems':500,'owned':json.loads(own),'pick':'shark','camp':{'s':cs,'ch':9},'en':{'n':5,'t':0},'nick':'Finn'}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%lg);pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev(HOOK)
    HIDE="document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});"
    for mode,start,secs in [('single',"sel='shark';startRun('single')",90),('camp36',"sel='shark';campStart(36)",90),('camp40',"sel='tuna';campStart(40)",90),('multi',"sel='tuna';curSrv=SERVERS[0];NET.room='';startRun('multi')",60),('surv',"var S=svSave();S.guide=1;sel='shark';svStart(1)",120)]:
      ev(HIDE+"save.en={n:5,t:0};"+start+";1");pg.wait_for_timeout(500)
      js="(function(){"+STEER+"var n=0;while(state==='play'&&n<%d){steer();update(1/30);n++;try{if(!$('svUp').hidden){var c=$('svUpList').querySelector('.svc');c&&c.click()}if(!$('svBox').hidden)svBoxDone()}catch(e){}}return state})()"%(secs*30)
      try: ev(js)
      except Exception as e: print(mode,'err',str(e)[:100])
      try: ev("if(state==='play')endRun(false);1")
      except Exception as e: pass
      pg.wait_for_timeout(2500)
      ev("try{if(!$('svRev').hidden)svReviveNo()}catch(e){};1");pg.wait_for_timeout(1500)
    print(lg,json.dumps(list(ev("__HG").keys()),ensure_ascii=False,indent=0))
    pg.close()
