from playwright.sync_api import sync_playwright
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    for L in ('ko','en','ja'):
        pg=b.new_page(viewport={'width':390,'height':844});pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        pg.goto('file:///home/claude/fishgame/release/www/index.html?lang='+L);pg.wait_for_timeout(3500)
        print(L,pg.evaluate("[document.body.className,document.documentElement.getAttribute('data-lang'),document.querySelector('.note')&&document.querySelector('.note').textContent]"))
        pg.close()
    b.close()
print('errs',errs)
