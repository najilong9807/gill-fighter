from playwright.sync_api import sync_playwright
import base64,sys,json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
SLOT=sys.argv[1];OUT=sys.argv[2];FISH=sys.argv[3].split(',');S=int(sys.argv[4]) if len(sys.argv)>4 else 40
JS="""(function(a){var slot=a[0],F=a[1],S=a[2];var L=ACC.filter(function(x){return x.slot===slot&&(x.hw||x.hwf)});var C=F.length,cw=Math.round(S*4.6),chh=Math.round(S*3.4);var cv=document.createElement('canvas');cv.width=(C+1)*cw;cv.height=L.length*chh;var c=cv.getContext('2d');c.fillStyle='#5E9CC4';c.fillRect(0,0,cv.width,cv.height);
L.forEach(function(A,r){c.fillStyle='#0B2C4A';c.font='bold 14px sans-serif';c.textAlign='left';c.fillText(r+' '+A.id,6,r*chh+chh/2);c.fillText(A.name,6,r*chh+chh/2+18);
 F.forEach(function(fid,k){var sp=byId(fid);var x=(k+1)*cw+cw*.55,y=r*chh+chh*.58;var q={};q[slot]=A.id;try{drawFishDeco(c,null,x,y,S,0,sp,{q:q,px:S*2,minLw:1.2})}catch(e){c.fillStyle='red';c.fillText('ERR',x,y)}})});
return cv.toDataURL('image/png')})"""
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files']);pg=b.new_page(viewport={'width':390,'height':844})
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort());pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(2500)
    pg.evaluate("__ev(\"save.owned=SPECIES.map(function(L){return L.id});document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});showTab('dex');1\")");pg.wait_for_timeout(5000)
    pg.evaluate("c=>__ev(c)","Object.keys(HW2H).forEach(function(k){hwAcs(HW2H[k][0])});Object.keys(HW2F).forEach(function(k){hwAcs(HW2F[k][0])});Object.keys(HW2X).forEach(function(k){hwAcs(HW2X[k])});1");pg.wait_for_timeout(3000)
    print(pg.evaluate("__ev('ACC.length+\" \"+ACC.filter(function(a){return a.slot===\"head\"}).length+\" \"+ACC.filter(function(a){return a.slot===\"face\"}).length+\" \"+ACC.filter(function(a){return a.slot===\"fx\"}).length')"))
    d=pg.evaluate("a=>__ev(%s)(a)"%json.dumps(JS),[SLOT,FISH,S])
    open(OUT,'wb').write(base64.b64decode(d.split(',')[1]));b.close()
