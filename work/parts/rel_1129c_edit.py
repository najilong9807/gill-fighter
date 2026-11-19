import json
w=open('work/index.html',encoding='utf-8').read()
E=[]
def rep(a,b):
    global w
    assert w.count(a)==1,(a[:60],w.count(a)); w=w.replace(a,b); E.append({'a':a,'b':b})
# 1) 알 그림: 개구리알 같던 것 → 무늬 있는 귀여운 알 하나
a=w[w.index("    for(j=0;j<6;j++){var a=j/6*Math.PI*2,ex=Math.cos(a)*R*.55"):]
a=a[:a.index("\n")]
b="""    (function(){var ew=R*.86,eh=R*1.02,wob=rd?Math.sin(t*9+i)*.13:Math.sin(t*1.6+i)*.04,cs=[['#FF9DB5','#FFC2D1'],['#7FD9C4','#B5EEDF'],['#8FC2FF','#C3DEFF'],['#FFC466','#FFE0A8']][(Math.round(e.x*97)+i)%4];
      ctx.fillStyle='rgba(11,44,74,.18)';ctx.beginPath();ctx.ellipse(0,R*.06,ew*.85,R*.17,0,0,Math.PI*2);ctx.fill();ctx.save();ctx.rotate(wob);
      function egg(){ctx.beginPath();ctx.moveTo(0,-2*eh);ctx.bezierCurveTo(ew*.62,-2*eh,ew,-1.25*eh,ew,-.78*eh);ctx.bezierCurveTo(ew,-.3*eh,ew*.6,0,0,0);ctx.bezierCurveTo(-ew*.6,0,-ew,-.3*eh,-ew,-.78*eh);ctx.bezierCurveTo(-ew,-1.25*eh,-ew*.62,-2*eh,0,-2*eh);ctx.closePath()}
      var gr=ctx.createLinearGradient(0,-2*eh,0,0);gr.addColorStop(0,'#FFFDF6');gr.addColorStop(1,'#FFE6CC');egg();ctx.fillStyle=gr;ctx.fill();ctx.save();egg();ctx.clip();
      ctx.fillStyle=cs[1];ctx.fillRect(-ew,-eh*1.02,ew*2,eh*.34);ctx.fillStyle=cs[0];[[-.5,-1.5,.2],[.42,-1.42,.16],[0,-.4,.2],[-.62,-.48,.13],[.6,-.5,.15],[.05,-1.72,.1]].forEach(function(q){ctx.beginPath();ctx.arc(q[0]*ew,q[1]*eh,q[2]*ew,0,Math.PI*2);ctx.fill()});
      ctx.fillStyle='rgba(255,255,255,.75)';ctx.beginPath();ctx.ellipse(-ew*.38,-eh*1.5,ew*.16,eh*.3,-.4,0,Math.PI*2);ctx.fill();ctx.restore();
      egg();ctx.lineWidth=Math.max(1.5,R*.1);ctx.strokeStyle='#0B2C4A';ctx.lineJoin='round';ctx.stroke();
      if(rd){ctx.beginPath();ctx.moveTo(-ew*.9,-eh*1.1);[[-.55,-1.3],[-.25,-1.05],[.05,-1.3],[.35,-1.05],[.62,-1.28],[.9,-1.1]].forEach(function(q){ctx.lineTo(q[0]*ew,q[1]*eh)});ctx.lineWidth=Math.max(1.2,R*.08);ctx.stroke()}
      ctx.restore()})();"""
rep(a,b)
rep("ctx.arc(0,-R*.55,R*1.35,0,Math.PI*2);ctx.stroke();ctx.strokeStyle='#FFE45C';ctx.beginPath();ctx.arc(0,-R*.55,R*1.35,-Math.PI/2","ctx.arc(0,-R*1.02,R*1.5,0,Math.PI*2);ctx.stroke();ctx.strokeStyle='#FFE45C';ctx.beginPath();ctx.arc(0,-R*1.02,R*1.5,-Math.PI/2")
rep("ctx.strokeText('!',0,-R*1.6);ctx.fillStyle='#FFE45C';ctx.fillText('!',0,-R*1.6)}","ctx.strokeText('!',0,-R*2.45);ctx.fillStyle='#FFE45C';ctx.fillText('!',0,-R*2.45)}")
rep("if(Math.hypot(wx-p.x,wy-(p.y-p.r*.6))<p.r*2.2){tkHatch(i);return}","if(Math.hypot(wx-p.x,wy-(p.y-p.r*1.0))<p.r*2.3){tkHatch(i);return}")
# 2) 산타 선물: 트리 밑에만 · 놓인 선물을 받아야 다음 선물
rep("if(G.g.length>=2||G.n>=3)return;if(Date.now()-(G.at||0)<2*3600e3)return;\n  G.at=Date.now();G.n++;G.g.push({x:rnd(.18,.82),t:Date.now()});persist();if(page==='tank')banner(T('산타가 수족관에 선물을 두고 갔어요!'),T('모래 위 선물을 눌러 열어요'))",
    "var it0=xmTreeIt();if(!it0||G.g.length>=1||G.n>=3)return;if(Date.now()-(G.at||0)<2*3600e3)return;\n  G.at=Date.now();G.n++;G.g.push({x:it0.x,t:Date.now()});persist();if(page==='tank')banner(T('산타가 트리 밑에 선물을 두고 갔어요!'),T('트리 밑 선물을 눌러 열어요'))")
rep("function xmTreeIt(){","/* 1.1.29 산타 선물 자리: 트리가 있으면 트리 왼쪽 밑(하루 선물은 오른쪽 밑) */\nfunction xgX(g,i,W,R){var it=xmTreeIt();return it?it.x*W-R*(2.2+i*1.9):g.x*W}\nabyTr(TRT,{'산타가 트리 밑에 선물을 두고 갔어요!':'Santa left a present under your tree!','트리 밑 선물을 눌러 열어요':'Tap the present under the tree to open it'});abyTr(TRJ,{'산타가 트리 밑에 선물을 두고 갔어요!':'サンタがツリーの下にプレゼントを置いていきました！','트리 밑 선물을 눌러 열어요':'ツリーの下のプレゼントをタップして開けましょう'});if(SUBL==='es')abyTr(TRX,{'산타가 트리 밑에 선물을 두고 갔어요!':'¡Santa dejó un regalo bajo tu árbol!','트리 밑 선물을 눌러 열어요':'Toca el regalo bajo el árbol para abrirlo'});else if(SUBL==='vi')abyTr(TRX,{'산타가 트리 밑에 선물을 두고 갔어요!':'Ông già Noel để quà dưới gốc cây!','트리 밑 선물을 눌러 열어요':'Chạm vào món quà dưới gốc cây để mở'});\nfunction xmTreeIt(){")
rep("G.g.forEach(function(g,i){var x=g.x*W;xmGiftDraw(","G.g.forEach(function(g,i){var x=xgX(g,i,W,R);xmGiftDraw(")
rep("for(i=0;i<G.g.length;i++){var x=G.g[i].x*W,y=floorAt(x)-2;","for(i=0;i<G.g.length;i++){var x=xgX(G.g[i],i,W,R),y=floorAt(x)-2;")
# 3) 장식 16종 더 (앱에 있던 그림: 모자 · 과자 집 · 썰매 · 고드름 · 인형 …) → 모두 51종
N=[['r_santa','산타 모자',180,'ac_xmsanta','Santa hat','サンタ帽','Gorro de Santa','Mũ ông già Noel'],['r_elf','엘프 모자',180,'ac_xmelf','Elf hat','エルフ帽','Gorro de elfo','Mũ yêu tinh'],['r_beanie','털모자',160,'ac_xmbeanie','Knit beanie','ニット帽','Gorro de lana','Mũ len'],
['r_holly','호랑가시',160,'ac_holly','Holly','ヒイラギ','Acebo','Cành ô rô'],['r_house','과자 집',240,'dc_xm_ginger','Gingerbread house','お菓子の家','Casita de jengibre','Nhà bánh gừng'],['r_sleigh','산타 썰매',260,'dc_xm_sleigh',"Santa's sleigh",'サンタのそり','Trineo de Santa','Xe trượt tuyết'],
['r_gifts','선물 꾸러미',220,'dc_xm_gifts','Gift pile','プレゼントの山','Montón de regalos','Chồng quà'],['r_icicle','고드름',140,'icicle','Icicle','つらら','Carámbano','Nhũ băng'],['r_minitree','꼬마 트리',200,'ac_xmtreehat','Mini tree','ミニツリー','Arbolito','Cây thông nhỏ'],
['r_antler','사슴뿔',160,'ac_xmantler','Antlers','トナカイの角','Astas de reno','Gạc tuần lộc'],['r_snowbud','눈사람 친구',220,'pet_snowman','Snowman buddy','雪だるまの友だち','Amigo de nieve','Bạn người tuyết'],['r_bunny','토끼 인형',200,'pet_bunny','Bunny plush','うさぎのぬいぐるみ','Peluche de conejo','Thỏ bông'],
['r_puppy','강아지 인형',200,'pet_puppy','Puppy plush','子犬のぬいぐるみ','Peluche de perrito','Cún bông'],['r_kitten','고양이 인형',200,'pet_kitten','Kitten plush','子猫のぬいぐるみ','Peluche de gatito','Mèo bông'],['r_hamster','햄스터 인형',200,'pet_hamster','Hamster plush','ハムスターのぬいぐるみ','Peluche de hámster','Hamster bông'],
['r_otter','수달 인형',200,'pet_otter','Otter plush','ラッコのぬいぐるみ','Peluche de nutria','Rái cá bông']]
js=lambda o:json.dumps(o,ensure_ascii=False,separators=(',',':'))
code="\n/* 1.1.29 장식 16종 더: 앱에 있던 그림을 장식으로(색만 다른 것 없이) */\nvar XT_NEW3="+js([[q[0],q[1],q[2]] for q in N])+";XT_NEW3.forEach(function(q){XORN.push([q[0],q[1]]);XORN_P[q[0]]=q[2]});(function(a){for(var k in a)XT_ART[k]=a[k]})("+js({q[0]:q[3] for q in N})+");\nabyTr(TRT,"+js({q[1]:q[4] for q in N})+");abyTr(TRJ,"+js({q[1]:q[5] for q in N})+");if(SUBL==='es')abyTr(TRX,"+js({q[1]:q[6] for q in N})+");else if(SUBL==='vi')abyTr(TRX,"+js({q[1]:q[7] for q in N})+");"
a="XT_NEW2.forEach(function(q){XORN.push([q[0],q[1]]);XORN_P[q[0]]=q[2]});"
rep(a,a+code)
# 4) 게임 안 1.1.29 소식: 트리 한 그루 · 새 장식 · 겨울 날씨
A="트리 꾸미기 새 단장: 장식을 톡 누르면 알아서 붙고, 끌어서 원하는 자리에 · 알아서 꾸미기 · 장식 51가지 · 반짝이 줄 · 트리 전구 · 트리는 더 크게 한 그루, 꾸미기에서 옮길 수 있어요"
B="겨울 수족관 날씨: 햇살 · 눈 조금 · 진눈깨비 · 폭설이 2시간마다 바뀌고 트리 · 소품 · 집에 눈이 쌓여요 · 산타 선물은 트리 밑에 놓여요"
tr={'e':{A:"Tree decorating revamp: tap an ornament to hang it, or drag it wherever you like · Auto-decorate · 51 ornaments · tinsel · tree lights · one bigger tree you can move in Decorate mode",B:"Winter aquarium weather: sunshine, light snow, sleet and blizzards change every 2 hours, and snow piles up on your tree, decor and house · Santa now leaves presents under the tree"},
'j':{A:"ツリーかざり新しく：タップで自動でつく・ドラッグで好きな場所に・おまかせ・かざり51種類・モール・ツリー電球・ツリーは大きな1本になり、かざりモードで動かせます",B:"冬の水族館の天気：晴れ・小雪・みぞれ・大雪が2時間ごとに変わり、ツリー・かざり・家に雪がつもります・サンタのプレゼントはツリーの下に"},
's':{A:"Decoración del árbol renovada: toca un adorno para colgarlo o arrástralo adonde quieras · Decorar solo · 51 adornos · guirnaldas · luces · un árbol más grande que puedes mover en el modo Decorar",B:"Clima invernal en el acuario: sol, nieve ligera, aguanieve y ventisca cambian cada 2 horas, y la nieve se acumula en el árbol, los adornos y la casa · Santa deja los regalos bajo el árbol"},
'v':{A:"Trang trí cây thông mới: chạm để treo hoặc kéo đến chỗ bạn thích · Tự trang trí · 51 món trang trí · dây kim tuyến · đèn cây · một cây thông to hơn, di chuyển được trong chế độ Trang trí",B:"Thời tiết mùa đông trong bể cá: nắng, tuyết nhẹ, mưa tuyết và bão tuyết đổi mỗi 2 giờ, tuyết phủ lên cây thông, đồ trang trí và ngôi nhà · Quà của ông già Noel nằm dưới gốc cây"}}
part="/* ===== 1.1.29 소식 보탬: 트리 한 그루 · 장식 51가지 · 겨울 날씨 ===== */\n(function(){var A="+js(A)+",B="+js(B)+";abyTr(TRT,"+js(tr['e'])+");abyTr(TRJ,"+js(tr['j'])+");if(SUBL==='es')abyTr(TRX,"+js(tr['s'])+");else if(SUBL==='vi')abyTr(TRX,"+js(tr['v'])+");try{var n=NEWS['1.1.29'];if(n&&n.length){n[0]=T(A);n.splice(1,0,T(B))}}catch(er){}})();\n"
a="if(window.claude&&window.claude.hot&&window.claude.hot.ready)window.claude.hot.ready(boot);else boot();"
rep(a,part+a)
open('work/index.html','w',encoding='utf-8').write(w)
p=json.load(open('patch_add.json',encoding='utf-8'));p+=E;json.dump(p,open('patch_add.json','w',encoding='utf-8'),ensure_ascii=False);print(len(E),len(p))
