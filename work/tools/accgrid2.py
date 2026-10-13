# 물고기 89종 × 할로윈 꾸미기를 한 장 표로(종마다 같은 크기, 오른쪽 보기)
from playwright.sync_api import sync_playwright
import base64,sys,json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
Q=json.loads(sys.argv[1]);OUT=sys.argv[2];ONLY=sys.argv[3].split(',') if len(sys.argv)>3 else None
JS="""(function(a){var Q=a[0],only=a[1];var L=SPECIES.filter(function(x){return !only||only.indexOf(x.id)>=0});var C=8,cwid=200,chh=170,R=Math.ceil(L.length/C);var cv=document.createElement('canvas');cv.width=C*cwid;cv.height=R*chh;var c=cv.getContext('2d');c.fillStyle='#7FB8D6';c.fillRect(0,0,cv.width,cv.height);
L.forEach(function(sp,i){var x=(i%C)*cwid+cwid/2,y=Math.floor(i/C)*chh+chh/2+10;c.strokeStyle='rgba(0,0,0,.15)';c.strokeRect((i%C)*cwid,Math.floor(i/C)*chh,cwid,chh);
 var s=46;try{drawFishDeco(c,null,x,y,s,0,sp,{q:Q,px:s*2,minLw:1.2})}catch(e){c.fillStyle='red';c.fillText('ERR '+e,x-80,y)}
 c.fillStyle='#0B2C4A';c.font='bold 13px sans-serif';c.textAlign='center';c.fillText(i+' '+sp.id,x,Math.floor(i/C)*chh+16)});
return cv.toDataURL('image/png')})"""
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files']);pg=b.new_page(viewport={'width':390,'height':844})
    pg.route(lambda u:'supabase' in u, lambda r:r.abort());pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(2500)
    pg.evaluate("__ev(\"save.owned=SPECIES.map(function(L){return L.id});document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});showTab('dex');1\")");pg.wait_for_timeout(2000)
    pg.evaluate("c=>__ev(c)","Object.keys(HW2H).forEach(function(k){hwAcs(HW2H[k][0])});Object.keys(HW2F).forEach(function(k){hwAcs(HW2F[k][0])});1");pg.wait_for_timeout(4000)
    ok=pg.evaluate("__ev('SPECIES.filter(function(L){var s=SPRITES[L.id];return s&&s.ok}).length+\"/\"+SPECIES.length')");print('sprites',ok)
    d=pg.evaluate("a=>__ev(%s)(a)"%json.dumps(JS),[Q,ONLY])
    open(OUT,'wb').write(base64.b64decode(d.split(',')[1]));b.close()
