import json,sys
from playwright.sync_api import sync_playwright
D='/tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
LANG=sys.argv[1];TAG=sys.argv[2];W,H=[int(x) for x in sys.argv[3].split(',')];SRC=sys.argv[4] if len(sys.argv)>4 else TAG
CAP={'ko':[('작게 태어나<br>꿀꺽꿀꺽 자라요','작은 물고기부터 먹으며 커지는 바다 생존','#2A1B5E','#6B3FA0'),
 ('먹을수록 커지고<br>클수록 깊어져요','멸치에서 백상아리, 고래상어까지','#0E3A5C','#1E7BA6'),
 ('할로윈 보스<br>호박 유령 아귀 등장!','11월 21일까지 할로윈 바다 🎃','#3A1450','#C0561E'),
 ('실시간 대전<br>누가 제일 커질까?','모두 같은 조건, 실력으로 겨뤄요','#14214F','#2F5FD0'),
 ('나만의 수족관<br>예쁘게 꾸미기','모은 물고기와 소품으로 꾸며요','#2B1747','#8A3FB0'),
 ('층마다 다른 미션<br>심해 탐험','30층 바다를 내려가며 별 모으기','#0D3B3E','#1F8F86')],
 'en':[('Start tiny,<br>gulp your way up','Eat smaller fish, grow, survive the sea','#2A1B5E','#6B3FA0'),
 ('Eat more,<br>grow bigger','From anchovy to great white and whale shark','#0E3A5C','#1E7BA6'),
 ('Halloween boss:<br>Pumpkin Ghost Angler','Halloween sea until Nov 21 🎃','#3A1450','#C0561E'),
 ('Live battles —<br>who grows biggest?','Same rules for everyone, pure skill','#14214F','#2F5FD0'),
 ('Decorate<br>your aquarium','Show off the fish and decor you collect','#2B1747','#8A3FB0'),
 ('A new mission<br>every floor','Dive 30 floors and collect stars','#0D3B3E','#1F8F86')],
 'ja':[('小さく生まれて<br>パクパク成長','小さな魚を食べて大きくなる海のサバイバル','#2A1B5E','#6B3FA0'),
 ('食べるほど大きく<br>大きいほど深く','カタクチイワシからホホジロザメ、ジンベエザメまで','#0E3A5C','#1E7BA6'),
 ('ハロウィンボス<br>かぼちゃオバケアンコウ','11月21日までハロウィンの海 🎃','#3A1450','#C0561E'),
 ('リアルタイム対戦<br>一番大きくなるのは？','みんな同じ条件、実力で勝負','#14214F','#2F5FD0'),
 ('自分だけの水族館<br>かわいくデコ','集めた魚とアイテムで飾ろう','#2B1747','#8A3FB0'),
 ('階ごとに違うミッション<br>深海探検','30階の海を下りながら星を集めよう','#0D3B3E','#1F8F86')]}
NAMES=['1_small','2_big','3_boss','4_battle','5_tank','6_camp']
css=open(D+'gfonts.css').read()
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':W,'height':H},device_scale_factor=1)
  for i,n in enumerate(NAMES):
    t,sub,c1,c2=CAP[LANG][i]
    capH=int(H*.205);ih=H-capH-int(H*.03);
    html="""<html><head><style>%s
    body{margin:0;width:%dpx;height:%dpx;overflow:hidden;background:linear-gradient(170deg,%s 0%%,%s 100%%);font-family:'Black Han Sans','Noto Sans CJK KR','Noto Sans CJK JP',sans-serif}
    .cap{position:absolute;left:0;right:0;top:0;height:%dpx;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff}
    h1{margin:0;font-size:%dpx;line-height:1.12;font-weight:%s;letter-spacing:-.01em;text-shadow:0 %dpx 0 rgba(0,0,0,.28)}
    p{margin:%dpx 0 0;font-family:Jua,'Noto Sans CJK KR','Noto Sans CJK JP',sans-serif;font-size:%dpx;color:#FFE7A8;opacity:.95}
    .ph{position:absolute;left:50%%;transform:translateX(-50%%);top:%dpx;height:%dpx;border-radius:%dpx;overflow:hidden;box-shadow:0 %dpx %dpx rgba(0,0,0,.45);border:%dpx solid rgba(255,255,255,.9)}
    .ph img{height:100%%;display:block}
    .bub{position:absolute;border-radius:50%%;background:rgba(255,255,255,.12)}
    </style></head><body>
    <div class=bub style="width:%dpx;height:%dpx;left:6%%;top:4%%"></div><div class=bub style="width:%dpx;height:%dpx;right:8%%;top:12%%"></div>
    <div class=cap><h1>%s</h1><p>%s</p></div><script>document.fonts.ready.then(function(){var h=document.querySelector('h1'),f=parseFloat(getComputedStyle(h).fontSize);h.style.whiteSpace='nowrap';var lines=h.innerHTML.split('<br>');while(f>20){var w=0;var t=document.createElement('span');t.style.cssText='position:absolute;visibility:hidden;white-space:nowrap;font:'+getComputedStyle(h).font;document.body.appendChild(t);lines.forEach(function(l){t.innerHTML=l;w=Math.max(w,t.offsetWidth)});t.remove();if(w<=innerWidth*.9)break;f-=2;h.style.fontSize=f+'px'}})</script><div class=ph><img src="file://%sshots/%s_%s_%s.png"></div></body></html>"""%(css,W,H,c1,c2,capH,int(W*.083 if LANG!='ja' else W*.07),('900' if LANG=='ja' else '400'),int(W*.006),int(W*.018),int(W*.04),capH,ih,int(W*.06),int(W*.02),int(W*.05),int(W*.008),int(W*.05),int(W*.05),int(W*.03),int(W*.03),t,sub,D,SRC,LANG,n)
    open(D+'cmp.html','w').write(html);pg.goto('file://'+D+'cmp.html');pg.wait_for_timeout(900)
    out=D+'shots/final_%s_%s_%d.png'%(TAG,LANG,i+1);pg.screenshot(path=out);print(out)
