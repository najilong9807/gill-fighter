from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page(viewport={'width':390,'height':844})
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.add_init_script("localStorage.setItem('fishproto.save2',JSON.stringify({runs:5,onb:1,newsSeen:'1.1.11',pearls:100,owned:['anchovy','clownfish'],pick:'anchovy'}))")
    pg.goto(D+'t2e.html');pg.wait_for_timeout(3000)
    pg.evaluate("void(Storage.prototype.setItem=function(){throw new DOMException('QuotaExceededError','QuotaExceededError')})")
    print(pg.evaluate("__ev(\"sel='clownfish';startRun('single');for(var k=0;k<90;k++)update(1/30);endRun(false,false,null);persist();toHome();state\")"))
    pg.wait_for_timeout(4000);print(pg.evaluate("__ev('state')"))
    b.close()
print('errs',errs[:5])
