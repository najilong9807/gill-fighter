import json
from playwright.sync_api import sync_playwright
D='file://'+__import__('os').getcwd()+'/'
CASES=[('en','Someone is visiting your aquarium!','Tap the sparkling fish to make friends'),('ko','손님 물고기가 찾아왔어요!','반짝이는 물고기를 눌러 친구가 되어 보세요'),('ja','お客さんの魚が遊びに来ました!','キラキラの魚をタップして友だちになろう'),('en','A very very long achievement title that cannot fit anywhere at all','x')]
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for i,(lg,a,s) in enumerate(CASES):
    pg=b.new_page(viewport={'width':320,'height':568},device_scale_factor=2)
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps({'runs':5,'onb':1,'tut':1,'newsSeen':'1.1.12','newsMute':'1.1.12'})))
    pg.goto(D+'t2e.html?lang=%s&build=release'%lg);pg.add_style_tag(path='gfonts.css');pg.wait_for_timeout(2500)
    pg.evaluate("a=>__ev(\"document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});banner1(\"+JSON.stringify(a[0])+\",\"+JSON.stringify(a[1])+\");1\")",[a,s])
    pg.wait_for_timeout(1500)
    r=pg.evaluate("()=>{var e=document.getElementById('banner');return [...e.children].map(q=>{var r=q.getBoundingClientRect();return [q.tagName,Math.round(r.left),Math.round(r.right),Math.round(r.height),getComputedStyle(q).fontSize]})}")
    print(lg,r);pg.screenshot(path='bant%d.png'%i);pg.close()
