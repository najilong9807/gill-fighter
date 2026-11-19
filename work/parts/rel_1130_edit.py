import json
w=open('work/index.html',encoding='utf-8').read();p=json.load(open('patch_add.json',encoding='utf-8'))
def rep(a,b):
    global w
    assert w.count(a)==1,(a[:50],w.count(a));w=w.replace(a,b);p.append({'a':a,'b':b})
rep("var APP_VER='1.1.29',","var APP_VER='1.1.30',")
for tail in ['OTHER_SWIFT_FLAGS','PRODUCT_BUNDLE_IDENTIFIER']:
    p.append({'f':'ios/App/App.xcodeproj/project.pbxproj','a':'MARKETING_VERSION = 1.1.29;\n\t\t\t\t'+tail,'b':'MARKETING_VERSION = 1.1.30;\n\t\t\t\t'+tail})
js=lambda o:json.dumps(o,ensure_ascii=False,separators=(',',':'))
A="트리 꾸미기: 장식을 손가락으로 끌어다 원하는 자리에 놓을 수 있어요 (끌다가 끊기던 문제를 고쳤어요) · 꾹 눌러도 집혀요"
B="장식 가게가 다시 아래에 늘 보여요 · 사면 바로 트리에 달려요"
tr={'e':{A:"Tree decorating: drag ornaments with your finger and drop them where you like (fixed drags getting cut off) · press and hold also picks one up",B:"The ornament shop is always visible below again · anything you buy goes straight onto the tree"},
'j':{A:"ツリーかざり：かざりを指でドラッグして好きな場所に置けます（ドラッグが途中で切れる問題を修正）・長押しでもつかめます",B:"かざりショップがまた下にいつも表示されます・買うとすぐツリーにつきます"},
's':{A:"Decoración del árbol: arrastra los adornos con el dedo y suéltalos donde quieras (arreglado: el arrastre se cortaba) · también puedes mantener pulsado para tomar uno",B:"La tienda de adornos vuelve a estar siempre visible abajo · lo que compras se cuelga al instante"},
'v':{A:"Trang trí cây thông: dùng ngón tay kéo đồ trang trí và thả vào chỗ bạn thích (đã sửa lỗi kéo bị ngắt) · nhấn giữ cũng nhặt được",B:"Cửa hàng trang trí lại luôn hiển thị bên dưới · mua xong là treo ngay lên cây"}}
part="/* ===== 1.1.30 소식: 트리 장식 끌어다 놓기 고침 · 장식 가게 아래에 ===== */\n(function(){var A="+js(A)+",B="+js(B)+";abyTr(TRT,"+js(tr['e'])+");abyTr(TRJ,"+js(tr['j'])+");if(SUBL==='es')abyTr(TRX,"+js(tr['s'])+");else if(SUBL==='vi')abyTr(TRX,"+js(tr['v'])+");try{NEWS['1.1.30']=[T(A),T(B)]}catch(er){}})();\n"
a="if(window.claude&&window.claude.hot&&window.claude.hot.ready)window.claude.hot.ready(boot);else boot();"
rep(a,part+a)
open('work/index.html','w',encoding='utf-8').write(w);json.dump(p,open('patch_add.json','w',encoding='utf-8'),ensure_ascii=False);print(len(p))
