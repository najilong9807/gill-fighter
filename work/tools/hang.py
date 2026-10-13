from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:150]))
    held=[]
    pg.route(lambda u:'supabase' in u, lambda r:held.append(r))  # 답을 안 줌 = 서버 멈춤
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=9;save.newsSeen=APP_VER;persist();showTab('tank');tkFrOpen();1")
    ev("$('frPub')&&$('frPub').click();$('frCode').value='ABC234';$('frGo').click();1")
    ev("cloudAsk();1");pg.fill('.gfd-in','ABCD-EFGH-2345');ev("document.querySelector('#gfDlg .gfd-btns .btn').click();1")
    pg.wait_for_timeout(1500)
    s1=ev("[ $('frPub')?$('frPub').disabled:null, document.querySelector('#gfDlg .gfd-btns .btn').disabled, document.querySelector('#frUl').textContent.slice(0,30)]")
    pg.wait_for_timeout(9000)
    s2=ev("[ $('frPub')?$('frPub').disabled:null, document.querySelector('#gfDlg .gfd-btns .btn').disabled, document.querySelector('#frUl').textContent.slice(0,30), ($('banner')||{}).textContent]")
    print('after 1.5s',s1);print('after 10.5s',s2);print('held',len(held),'errs',errs)
    b.close()
