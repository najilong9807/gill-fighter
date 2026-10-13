from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
OLD=json.dumps({"pearls":900000,"gems":500,"owned":["anchovy","dumbo"],"pick":"dumbo","best":{"anchovy":500},"runs":7,"newsSeen":"1.1.11","thx1111":2})
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
    ctx=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2);pg=ctx.new_page();pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(OLD))
    pg.goto(D+'t_mp.html?lang=ko');pg.wait_for_timeout(5000)
    pg.evaluate("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true})")
    r=pg.evaluate("""__ev(`(function(){showTab('tank');var out=[];var ids=['lighthouse','chest','clam','bonsai','marimo','anchor','amphora','crystal'];
      ids.forEach(function(id){var D=decoById(id);if(!D){out.push(id+':none');return}var n0=DS().placed.length;decoPlace(D);var it=DS().placed[DS().placed.length-1];var hp=housePos(),W=TWW();
        out.push(id+' x='+it.x.toFixed(3)+' dHouse='+Math.round(Math.abs(it.x*W-hp.x))+' need>'+Math.round(hp.w*.62))});return out.join(' | ')})()`)""")
    print(r)
    pg.wait_for_timeout(1500);pg.screenshot(path='spot.png')
    # results screen
    pg.evaluate("__ev(`showTab('home')`)");pg.wait_for_timeout(500)
    ctx.close();b.close()
print('errs',errs[:5])
