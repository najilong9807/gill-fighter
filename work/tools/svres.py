# 심해 생존 결과창의 모든 버튼(과 그 뒤 열리는 창의 닫기/X)을 눌러 본 뒤 '상태=over인데 창이 없음'(빈 화면)이 남는지
from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
SET="document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});toHome();sel='clownfish';svStart(1);for(var k=0;k<600;k++)update(1/60);SV.hp=0;P.fx.ghost=0;SV.adRev=1;endRun(false,false,null);1"
ST="[state,svOvOpen(),[].map.call(document.querySelectorAll('#svRes button'),function(b){return b.offsetParent?(b.id||b.className)+':'+b.textContent.trim().slice(0,10):null}).filter(Boolean)]"
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page(viewport={'width':393,'height':852})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:150]));pg.route(lambda u:'supabase' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("save.onb=1;save.runs=40;save.newsSeen=APP_VER;save.owned=SPECIES.map(function(L){return L.id});persist();1")
    ev(SET);pg.wait_for_timeout(1500);r=ev(ST);print('after death',r)
    btns=r[2]
    for i,bn in enumerate(btns):
        ev(SET);pg.wait_for_timeout(1500)
        ev("var bs=[].filter.call(document.querySelectorAll('#svRes button'),function(b){return b.offsetParent});bs[%d]&&bs[%d].click();1"%(i,i));pg.wait_for_timeout(900)
        a=ev("[state,svOvOpen()]")
        # 열린 창이 있으면 그 창의 닫기/X 눌러 보기
        ev("var o=svOvOpen();var el=o&&document.getElementById(o);if(el&&o!=='svRes'){var x=[].filter.call(el.querySelectorAll('button'),function(b){return b.offsetParent&&/닫기|✕|×|X|돌아가기/.test(b.textContent+b.getAttribute('aria-label'))})[0];x&&x.click()}1");pg.wait_for_timeout(900)
        c=ev("[state,svOvOpen()]")
        ev("document.dispatchEvent(new Event('visibilitychange'));1");pg.wait_for_timeout(3500)
        d=ev("[state,svOvOpen(),CR.bc.slice(-2).join(' ')]")
        print(bn,'| click->',a,'| close->',c,'| +3.5s->',d,'BLANK' if (c[0]=='over' and not c[1]) else '',flush=True)
    print('errs',errs[:4]);b.close()
