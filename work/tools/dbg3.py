import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page(viewport={'width':390,'height':844})
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(2500)
  print(pg.evaluate("c=>__ev(c)","newsOpen('1.1.12');var b=$('newsOk'),cs=getComputedStyle(b),r=$('news').querySelector('.row'),rc=getComputedStyle(r);var M=[];for(var s of document.styleSheets){try{for(var R of s.cssRules){if(R.selectorText&&b.matches(R.selectorText)&&/height|padding|flex/.test(R.cssText))M.push(R.cssText.slice(0,160))}}catch(e){}}JSON.stringify([M,b.offsetHeight,cs.height,cs.minHeight,cs.flex,cs.paddingTop,b.getAttribute('style'),r.offsetHeight,rc.display,rc.flexDirection,rc.height,getComputedStyle(r.parentNode).display,b.parentNode===r])"))
