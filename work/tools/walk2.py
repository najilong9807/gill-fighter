from playwright.sync_api import sync_playwright
import sys,os,json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
TAG,L,VW,VH=sys.argv[1],sys.argv[2],int(sys.argv[3]),int(sys.argv[4])
ONLY=sys.argv[5].split(',') if len(sys.argv)>5 else None
LINT=r"""(function(){var W=innerWidth,H=innerHeight,out={clip:[],off:[],ovl:[],tiny:[],ko:[]};
function vis(e){if(!e.getClientRects().length)return false;var c=getComputedStyle(e);if(c.visibility==='hidden'||+c.opacity<.05)return false;var a=e;while(a&&a!==document.body){var s=getComputedStyle(a);if(s.display==='none'||a.hidden||+s.opacity<.05)return false;a=a.parentElement}return true}
function nm(e){return (e.id?'#'+e.id:(e.className&&e.className.baseVal===undefined?'.'+String(e.className).split(' ')[0]:e.tagName))+':'+(e.textContent||'').trim().slice(0,22)}
function sc(e){var a=e.parentElement;while(a&&a!==document.body){var s=getComputedStyle(a);if(/(auto|scroll)/.test(s.overflowX+s.overflowY))return a;a=a.parentElement}return null}
var leaves=[];document.querySelectorAll('body *').forEach(function(e){if(e.tagName==='SCRIPT'||e.tagName==='STYLE'||e.tagName==='CANVAS')return;var t=[].some.call(e.childNodes,function(n){return n.nodeType===3&&n.textContent.trim()});if(!t)return;if(!vis(e))return;var r=e.getBoundingClientRect();if(r.width<2||r.height<2)return;
  var cs=getComputedStyle(e);if(e.scrollWidth>e.clientWidth+2&&cs.textOverflow!=='ellipsis'&&cs.overflowX!=='visible'&&cs.overflowX!=='auto'&&cs.overflowX!=='scroll')out.clip.push(nm(e));
  var s=sc(e);if(!s&&r.top<H&&r.bottom>0&&(r.right>W+1||r.left<-1))out.off.push(nm(e)+' '+Math.round(r.left)+'..'+Math.round(r.right));
  if(r.bottom>0&&r.top<H&&r.right>0&&r.left<W)leaves.push([e,r,s]);if(LANG!=='ko'){var tt=[].map.call(e.childNodes,function(n){return n.nodeType===3?n.textContent:''}).join('').trim();if(/[가-힣]/.test(tt.replace(/늑구/g,'')))out.ko.push(tt.slice(0,40))}});
/* text vs text overlap (same scroll container or both fixed), excluding ancestor relations; check topmost at center */
for(var i=0;i<leaves.length;i++)for(var j=i+1;j<leaves.length;j++){var A=leaves[i],B=leaves[j];if(A[0].contains(B[0])||B[0].contains(A[0]))continue;var a=A[1],b=B[1];
  var ix=Math.min(a.right,b.right)-Math.max(a.left,b.left),iy=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);if(ix<=3||iy<=3)continue;var ar=Math.min(a.width*a.height,b.width*b.height);if(ix*iy<ar*.15)continue;
  var cx=(Math.max(a.left,b.left)+Math.min(a.right,b.right))/2,cy=(Math.max(a.top,b.top)+Math.min(a.bottom,b.bottom))/2;var tp=document.elementFromPoint(cx,cy);
  var ta=tp&&(A[0].contains(tp)||tp.contains(A[0])),tb=tp&&(B[0].contains(tp)||tp.contains(B[0]));if(!(ta||tb))continue;
  /* both must be visible at point: the lower one must not be fully covered by an opaque layer - approximate: report if topmost belongs to one and other is in same overlay */
  var oa=A[0].closest('.overlay,#hud,#home,#tankUI'),ob=B[0].closest('.overlay,#hud,#home,#tankUI');if(oa!==ob)continue;
  out.ovl.push(nm(A[0])+' X '+nm(B[0]))}
document.querySelectorAll('button,[role=button]').forEach(function(e){if(!vis(e))return;var r=e.getBoundingClientRect();if(r.bottom<0||r.top>H||r.right<0||r.left>W)return;if((r.width<30||r.height<28)&&!e.closest('.dd-seg,.lbseg'))out.tiny.push(nm(e)+' '+Math.round(r.width)+'x'+Math.round(r.height))});
['clip','off','ovl','tiny','ko'].forEach(function(k){out[k]=out[k].filter(function(v,i,a){return a.indexOf(v)===i}).slice(0,12)});return out})()"""
os.makedirs('W',exist_ok=True);res={}
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    pg=b.new_page(viewport={'width':VW,'height':VH},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:160]))
    pg.route(lambda u:'supabase' in u or 'googleapis' in u, lambda r:r.abort());pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%L);pg.add_style_tag(content=':root{--sat:47px;--sab:34px}');pg.wait_for_timeout(2600)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    def hide(): ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});document.querySelectorAll('.coach').forEach(function(x){x.remove()});bannerOff();1")
    ev("save.onb=1;save.runs=40;save.nick='늑구';save.pearls=4280;save.gems=37;save.newsSeen=APP_VER;save.owned=SPECIES.slice(0,24).map(function(x){return x.id});var S=svSave();S.guide=1;S.gpTip=1;S.plays=8;[1,2,3].forEach(function(n){var O=svChS(n);O.best=n<3?420:255;O.clear=n<3?1:0});svRlCheck(true);var c=campSave();for(var i=1;i<=7;i++)c.s[i]=2;save.mp.games=12;save.mp.wins=2;persist();1")
    def go(name,js,wait=700,pre=True):
        if ONLY and name not in ONLY: return
        if pre: hide();ev("if(state!=='home'){try{toHome()}catch(e){}}1")
        try: ev(js)
        except Exception as e: res[name]={'err':str(e)[:150]};print(name,'ERR',str(e)[:150]);return
        pg.wait_for_timeout(wait);pg.screenshot(path='W/%s_%s.png'%(TAG,name))
        r=ev(LINT);res[name]=r
        bad={k:v for k,v in r.items() if v}
        print(name,json.dumps(bad,ensure_ascii=False) if bad else 'ok',flush=True)

    ev("save.owned=SPECIES.slice(0,40).map(function(x){return x.id});var H=HS();H.lv=3;var o=AB();o.tap=130;o.aff={};o.aff[save.owned[1]]=20;persist();1")
    go('hw_home',"toHome();showTab('home');1",900)
    go('hw_tank',"showTab('tank');1",1200)
    go('coral',"showTab('tank');for(var i=0;i<6;i++)coralTap();1",900)
    go('guestbook',"showTab('tank');guestBook();1")
    go('guest_vis',"showTab('tank');guestSpawn(GUESTS[0]);1",2500)
    go('ach_set',"achOpen();1")
    go('ach_ach',"achOpen();document.querySelector('#achP .ach-seg [data-t=ach]').click();1")
    go('away',"showTab('tank');awayShow(14);1")
    go('frtank',"showTab('tank');tkFrOpen();1",1200)
    go('visit',"visitStart({code:'ABC123',nick:'바다친구',hearts:7,data:{f:save.owned.slice(0,8),d:[],h:3,c:4,b:'reef'}});1",1500)
    go('backup_code',"try{var c=CL();if(!c.code)c.code='ABCDEFGH2345'}catch(e){}cloudShowCode();1")
    go('backup_load',"cloudAsk();1")
    go('settings_cloud',"$('setBtn').click();setTimeout(function(){var e=$('setCloud');e&&e.scrollIntoView()},100);1",900)
    go('settings_hw',"$('setBtn').click();1",700)
    go('tut',"tutStart();1",2500)
    go('tut2',"for(var k=0;k<120;k++)update(1/30);1",1500,False)
    go('hw_single',"TUT.on&&tutEnd(false);$('pause').hidden=true;state='home';sel=save.owned[0];startRun('single');1",1800)
    go('hw_surv',"endRun(false,false,null);toHome();sel=save.owned[0];svStart(1);1",1800)
    go('view_mode',"try{svEnd(false,false)}catch(e){}toHome();showTab('tank');var v=document.querySelector('#tankUI [id*=view],#tankUI .zbtn');1",900)
    b.close()
json.dump({'res':res,'errs':errs},open('W/%s.json'%TAG,'w'),ensure_ascii=False)
print('errs',errs[:8])
