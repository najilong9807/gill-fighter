import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:160]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  print('N',ev("SV_CH.length-1"),ev("JSON.stringify(svChS(1))"))
  cases={'half':"for(var n=1;n<=5;n++){var O=svChS(n);O.best=420;O.clear=1}svChS(6).best=200;",
   'allnormal':"for(var n=1;n<=8;n++){var O=svChS(n);O.best=420;O.clear=1}",
   'hard3':"for(var n=1;n<=8;n++){var O=svChS(n);O.best=420;O.clear=1}for(n=1;n<=2;n++){svChS(n).hbest=420;svChS(n).hclear=1}svChS(3).hbest=310;",
   'hardnoall':"for(var n=1;n<=6;n++){var O=svChS(n);O.best=420;O.clear=1;O.hbest=420;O.hclear=1}",
   'inf':"for(var n=1;n<=8;n++){var O=svChS(n);O.best=420;O.clear=1;O.hbest=420;O.hclear=1}svChS(8).inf=1325;"}
  for k,js in cases.items():
    ev("save.sv=null;"+js+"1")
    v=ev("svLbScore()");print(k,v,ev("svLbTxt(%d)"%v),ev("lbVal('surv',%d)"%v))
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});modePickOpen();1");print('  meta',ev("$('mpSurvMeta').textContent"))
  print(errs)
