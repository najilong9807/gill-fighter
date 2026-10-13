import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
LAY={
 'hw':{'bg':'hwnight','items':[['hw_spooktree',.04,1.25,0],['ghostweed',.095,1.1,0],['hw_tomb',.14,.95,0],['jacko',.175,.85,0],['mushroom',.205,.9,1],
   ['hw_lanternpost',.255,1.05,0],['pumpkinhouse',.315,1.1,0],['hw_jackpile',.375,.9,1],['cauldron',.415,.95,0],['hw_candles',.445,.85,0],
   ['hw_candles',.585,.75,1],['hw_lanternpost',.615,1.05,1],['hw_webcoral',.655,1,0],['ghostweed',.695,1.15,1],['hw_skullrock',.735,1,0],['jacko',.77,.8,1],
   ['mushroom',.795,.85,0],['hw_fishbones',.83,.95,1],['moss',.865,.9,0],['hw_spooktree',.905,1.2,1],['ghostweed',.95,1,0],['jacko',.975,.75,0],['hw_jackpile',.12,1.1,0,.9],['jacko',.33,1.05,1,.93],['hw_candles',.42,1,0,.92],['hw_fishbones',.6,1.05,0,.92],['jacko',.69,1.1,0,.94],['mushroom',.88,1.05,1,.92]]},
 'reef':{'bg':'coralgarden','items':[['coralp',.04,1.25,0],['anem',.09,1,0],['purplecoral',.13,1.1,1],['weed',.17,1.1,0],['shellpile',.205,.9,0],['carpet',.24,1,0],
   ['orangehouse',.295,1.05,0],['bluecoral',.35,1.05,1],['star',.385,.9,0],['clam',.42,.95,0],['marimo',.445,.8,0],
   ['bubbler',.58,.9,0],['coralo',.615,1.1,0],['redweed',.655,1.05,1],['pearlarch',.705,1,0],['goldweed',.75,1.1,0],['crystal',.79,.95,1],
   ['carpet',.825,1,0],['bonsai',.865,1,0],['lighthouse',.915,1.05,0],['moss',.955,.9,1],['star',.98,.8,1],['shellpile',.12,1.15,0,.91],['star',.33,1.1,1,.93],['clam',.42,1.05,0,.92],['star',.6,1,0,.94],['shellpile',.68,1.1,1,.92],['marimo',.88,1.1,0,.93]]}}
FISH=['clownfish','bluetang','angelfish','butterfly','mandarinfish','seahorse','moorish','yellowtang','lionfish','goldfish','koi','puffer','manta','turtle']
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for key,L in LAY.items():
    for vw,vh,tag in [(1280,720,'wide'),(390,844,'phone')]:
      pg=b.new_page(viewport={'width':vw,'height':vh},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
      pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
      sv={'runs':40,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':90000,'gems':900,'owned':FISH,'pick':'clownfish','hwAtt':{'y':2026,'n':7,'d':'x'},'house':{'lv':5,'acc':0,'at':1791800000000,'fed':0,'boost':0},'tankBgs':[L['bg']],'tankBg':L['bg'],'hwSeen':2026,'tankTabTip':1}
      pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
      pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(2500)
      ev=lambda c:pg.evaluate("c=>__ev(c)",c)
      js="""(function(L){document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});var d=DS();d.placed=[];d.inv={};var W=TWW();
        L.items.forEach(function(a){var Dd=decoById(a[0]);if(!Dd)return;var x=a[1];var y=a[4]!=null?a[4]:clamp((floorAt(x*W)+ch*.03-decoW(Dd,a[2])*decoAR(Dd)*.42)/ch,.25,.95);d.placed.push({k:a[0],x:x,y:y,s:a[2],f:a[3]})});
        try{setTankBg(L.bg)}catch(e){save.tankBg=L.bg}persist();showTab('tank');try{buildTank()}catch(e){}refreshTank();return d.placed.length})"""
      n=pg.evaluate("a=>__ev(a[0])(a[1])",[js,L]);pg.wait_for_timeout(1500)
      ev("var st=document.createElement('style');st.textContent='.overlay,.coach,#vmHint,.toast,.banner{display:none!important}';document.head.appendChild(st);try{setZoom(ZMIN())}catch(e){};try{viewOn()}catch(e){};1");pg.wait_for_timeout(3000)
      if tag=='wide':
        pg.screenshot(path='dex_%s_wide.png'%key)
      else:
        for i,c in enumerate([0,.5,1]):
          ev("tankCam=camMax()*%s;VIEWM=true;1"%c);pg.wait_for_timeout(900);pg.screenshot(path='dex_%s_p%d.png'%(key,i))
      print(key,tag,n,errs[:2]);pg.close()
