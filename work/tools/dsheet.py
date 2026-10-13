from playwright.sync_api import sync_playwright
import base64
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
    pg=b.new_page(viewport={'width':900,'height':800})
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(4500)
    js='''(function(){var cols=8,S=200,H=170,n=DECOR.length,rows=Math.ceil(n/cols),c=document.createElement('canvas');c.width=cols*S;c.height=rows*H;var x=c.getContext('2d');x.fillStyle='#2E6E9E';x.fillRect(0,0,c.width,c.height);
    var real=ctx;ctx=x;decoThumbMode=true;
    DECOR.forEach(function(D,i){var cx=(i%cols)*S+S/2,cy=Math.floor(i/cols)*H+H/2;ctx.save();var ar=decoAR(D),w=Math.min(S*.85,H*.8/ar);try{drawDecoItem(D,cx,cy+6,w,false,false,1.3)}catch(e){}ctx.restore();ctx.fillStyle='#fff';ctx.font='14px sans-serif';ctx.fillText(i+' '+D.id,cx-S/2+4,cy-H/2+14)});
    ctx=real;decoThumbMode=false;return c.toDataURL('image/png')})()'''
    u=pg.evaluate("c=>__ev(c)",js)
    open('W/dsheet.png','wb').write(base64.b64decode(u.split(',')[1]))
