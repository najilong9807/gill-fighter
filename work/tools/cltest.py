from playwright.sync_api import sync_playwright
import sys
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
L=sys.argv[1] if len(sys.argv)>1 else 'ko'
MOCK=r"""
window.__srv={cloud:{},tank:{},n:0};
lbReq=function(path,b){var S=__srv;return new Promise(function(res,rej){setTimeout(function(){try{
 if(path==='rpc/gf_cloud_put'){S.cloud[b.p_code]={data:JSON.parse(JSON.stringify(b.p_data)),ver:b.p_ver,updated_at:new Date().toISOString()};res(new Date().toISOString());return}
 if(path==='rpc/gf_cloud_get'){var r=S.cloud[b.p_code];res(r?[r]:[]);return}
 if(path==='rpc/gf_tank_put'){var c=b.p_code||('T'+(++S.n)+'ABCD').slice(0,6);var t=S.tank[c]||{code:c,hearts:0,hearts_new:0};t.nick=b.p_nick;t.data=b.p_data;t.pub=b.p_pub;S.tank[c]=t;res([{code:c,hearts:t.hearts,hearts_new:t.hearts_new}]);return}
 if(path==='rpc/gf_tank_get'){var t2=S.tank[b.p_code];res(t2?[t2]:[]);return}
 if(path==='rpc/gf_tank_list'){res(Object.keys(S.tank).map(function(k){var t=S.tank[k];return {code:k,nick:t.nick,hearts:t.hearts,fishn:t.data.f.length,house:t.data.h}}));return}
 if(path==='rpc/gf_tank_heart'){var t3=S.tank[b.p_code];t3.hearts++;t3.hearts_new++;res(t3.hearts);return}
 if(path==='rpc/gf_tank_claim'){var t4=S.tank[b.p_code];var n=t4.hearts_new;t4.hearts_new=0;res(n);return}
 rej(new Error('x'))}catch(e){rej(e)}},60)})};1
"""
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2)
    pg.on('pageerror',lambda e:errs.append(str(e)[:300]))
    pg.goto(D+'t2e.html?lang='+L);pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("save.onb=1;save.runs=60;save.nick='늑구';save.pearls=5000;save.gems=10;save.newsSeen=APP_VER;save.dev=false;HS().lv=3;AB().tap=650;save.owned=save.owned.concat(['shark','hammerhead','mako','thresher','goblinshark','frilledshark','greenlandshark','whaleshark','seahorse','goldfish','mandarinfish']);persist();document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});1")
    ev(MOCK)
    # settings backup
    ev("showTab('set');1");pg.wait_for_timeout(500)
    ev("$('setCloud').scrollIntoView();1");pg.wait_for_timeout(300);pg.screenshot(path='cl1.png')
    ev("$('cloudMk').click();1");pg.wait_for_timeout(800);pg.screenshot(path='cl2.png')
    code=ev("CL().code");print('code',code,ev("JSON.stringify(Object.keys(__srv.cloud))"))
    ev("gfDlgClose();save.pearls=1;persist();cloudAsk();1");pg.wait_for_timeout(300)
    pg.fill('.gfd-in',code[:4]+'-'+code[4:8]+'-'+code[8:]);pg.wait_for_timeout(100)
    ev("document.querySelector('#gfDlg .gfd-btns .btn').click();1");pg.wait_for_timeout(600);pg.screenshot(path='cl3.png')
    ev("gfDlgClose();1")
    # friends
    ev("showTab('tank');1");pg.wait_for_timeout(800);pg.screenshot(path='cl4.png')
    ev("$('tkFrBtn').click();1");pg.wait_for_timeout(600)
    ev("$('frPub').click();1");pg.wait_for_timeout(600)
    ev("__srv.tank['QWE234']={code:'QWE234',nick:'친구A',hearts:7,hearts_new:0,pub:true,data:{v:1,f:['shark','clownfish','manta','goldfish','koi'],d:[{k:'ship',x:.3,y:.72,s:1},{k:'lighthouse',x:.65,y:.7,s:1},{k:'bonsai',x:.5,y:.74,s:1}],h:5,c:6,b:'reef'}};tkList();1");pg.wait_for_timeout(500);pg.screenshot(path='cl5.png')
    ev("tkVisit('QWE234');1");pg.wait_for_timeout(1500);pg.screenshot(path='cl6.png')
    ev("document.querySelector('#visBar .vb-heart').click();1");pg.wait_for_timeout(600);pg.screenshot(path='cl7.png')
    print('visit',ev("JSON.stringify([!!VISIT,tank.length,HS().lv,save.house.lv,DS0().placed.length,TKS().sent])"))
    ev("document.querySelector('#visBar .vb-out').click();1");pg.wait_for_timeout(500)
    print('after',ev("JSON.stringify([!!VISIT,tank.length,HS().lv,$('tankUI').hidden])"))
    ev("$('tkFr').hidden=true;__srv.tank[TKS().code].hearts_new=3;tkClaim();1");pg.wait_for_timeout(500);print('claim pearls',ev("save.pearls"))
    # achievements
    ev("showTab('dex');1");pg.wait_for_timeout(600);pg.screenshot(path='cl8.png')
    ev("achOpen();1");pg.wait_for_timeout(400);pg.screenshot(path='cl9.png')
    ev("ACH_TAB='ach';achRender();1");pg.wait_for_timeout(300);pg.screenshot(path='cl10.png')
    g0=ev("save.gems");ev("document.querySelector('#achUl .ach-it.ready .ach-btn').click();1");pg.wait_for_timeout(300);print('gems',g0,ev("save.gems"))
    b.close()
print('errs',errs)
