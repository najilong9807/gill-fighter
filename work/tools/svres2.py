from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
SET="document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});toHome();sel='clownfish';svStart(1);for(var k=0;k<600;k++)update(1/60);SV.hp=0;SV.adRev=1;endRun(false,false,null);1"
OPEN="[].map.call(document.querySelectorAll('.overlay'),function(o){return !o.hidden&&getComputedStyle(o).display!=='none'?o.id:null}).filter(Boolean)"
CLOSE_TOP="""(function(){var ids=%s;var top=ids.filter(function(i){return i!=='svCh'&&i!=='svRes'});if(!top.length)return 'none';var el=document.getElementById(top[top.length-1]);var x=[].filter.call(el.querySelectorAll('button'),function(b){return b.offsetParent&&/✕|×|닫기|Close|돌아가기|확인/.test((b.textContent||'')+(b.getAttribute('aria-label')||''))});if(x.length){x[x.length-1].click();return 'closed '+el.id}el.click&&el.dispatchEvent(new MouseEvent('click',{bubbles:true}));return 'bg '+el.id})()"""%OPEN
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page(viewport={'width':393,'height':852})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:150]));pg.route(lambda u:'supabase' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("save.onb=1;save.runs=40;save.newsSeen=APP_VER;save.owned=SPECIES.map(function(L){return L.id});persist();1")
    ev(SET);pg.wait_for_timeout(1200);ev("$('svChBtn').click();1");pg.wait_for_timeout(600)
    n=ev("[].filter.call(document.querySelectorAll('#svCh button'),function(b){return b.offsetParent}).length")
    for i in range(n):
        ev(SET);pg.wait_for_timeout(1000);ev("$('svChBtn').click();1");pg.wait_for_timeout(600)
        nm=ev("var bs=[].filter.call(document.querySelectorAll('#svCh button'),function(b){return b.offsetParent});var b=bs[%d];var t=b?(b.id||b.className)+':'+(b.textContent.trim().slice(0,8)||''):'';b&&b.click();t"%i)
        pg.wait_for_timeout(700);s1=ev(OPEN)+[ev("state")]
        if ev("state")=='play':
            print(i,nm,'-> started run (skip)');continue
        c=ev(CLOSE_TOP);pg.wait_for_timeout(600)
        ev("var x=$('svChX');x&&x.offsetParent&&x.click();1");pg.wait_for_timeout(600)
        pg.wait_for_timeout(3200)
        s2=[ev("state"),ev(OPEN)]
        blank=s2[0]=='over' and not s2[1]
        print(i,nm,'| open:',s1,'|',c,'| after X +3s:',s2,'BLANK!' if blank else '',flush=True)
    print('errs',errs[:4]);b.close()
