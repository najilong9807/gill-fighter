# 1.1.31 출시 준비: 마을 켜기(GF_TOWN_OFF 지움) · 버전 1.1.31 · 마을 소식은 1.1.31 소식으로 · 처음 3판 동안 대전 · 친구 · 심해 생존 잠금
# work/index.html 을 고치고 같은 바꾸기를 patch_add.json 끝에 붙인다(빌드 체인 = app.zip + patch.json + patch_add.json)
import json
W='work/index.html'
w=open(W,encoding='utf-8').read();p=json.load(open('patch_add.json',encoding='utf-8'))
def rep(a,b):
    global w
    assert w.count(a)==1,(a[:60],w.count(a));w=w.replace(a,b);p.append({'a':a,'b':b})

# 1) 마을 켜기
rep("<script>window.GF_TOWN_OFF=1; /* 1.1.30 출시: 마을(아가미시티)은 그림 작업 뒤 1.1.31에 켬 — 이 줄을 지우면 마을 탭 · 마을 미션 · 마을 소식 · 택배 거북이 다시 켜짐 */</script>\n","")
# 2) 버전
rep("var APP_VER='1.1.30',","var APP_VER='1.1.31',")
for tail in ['OTHER_SWIFT_FLAGS','PRODUCT_BUNDLE_IDENTIFIER']:
    p.append({'f':'ios/App/App.xcodeproj/project.pbxproj','a':'MARKETING_VERSION = 1.1.30;\n\t\t\t\t'+tail,'b':'MARKETING_VERSION = 1.1.31;\n\t\t\t\t'+tail})
# 3) 마을 소식(두 줄 + 택배 거북 + 마을 기록)은 1.1.31 소식으로
rep("try{var CITY_VER='1.1.30',","try{var CITY_VER='1.1.31',")
for k in ('NK3','NK4'):
    rep("NEWS['1.1.30']=(NEWS['1.1.30']||[]).concat([T(%s)])"%k,"NEWS['1.1.31']=(NEWS['1.1.31']||[]).concat([T(%s)])"%k)

# 4) 처음 3판 동안 대전 · 친구 · 심해 생존 잠금 (심해 탐험은 1.1.13부터 '처음이면 여기!' 길이라 그대로 열어 둠)
K0='3판 뒤 열려요';K1='아직 잠겨 있어요'
TR={'en':("Unlocks after 3 runs","Still locked"),'ja':("3回遊ぶと解放","まだロック中です"),'es':("Se desbloquea tras 3 partidas","Aún bloqueado"),
'vi':("Mở sau 3 lượt chơi","Vẫn đang khóa"),'zht':("玩 3 局後解鎖","尚未解鎖"),'zhs':("玩 3 局后解锁","尚未解锁"),'pt':("Desbloqueia após 3 partidas","Ainda bloqueado"),
'fr':("Débloqué après 3 parties","Encore verrouillé"),'de':("Nach 3 Runden freigeschaltet","Noch gesperrt"),'it':("Si sblocca dopo 3 partite","Ancora bloccato"),
'nl':("Ontgrendeld na 3 potjes","Nog vergrendeld"),'ru':("Откроется после 3 забегов","Пока закрыто"),'uk':("Відкриється після 3 забігів","Поки що закрито"),
'pl':("Odblokujesz po 3 grach","Jeszcze zablokowane"),'tr':("3 oyundan sonra açılır","Henüz kilitli"),'id':("Terbuka setelah 3 permainan","Masih terkunci"),
'ms':("Dibuka selepas 3 permainan","Masih dikunci"),'th':("ปลดล็อกหลังเล่น 3 รอบ","ยังล็อกอยู่"),'hi':("3 राउंड के बाद खुलेगा","अभी लॉक है"),
'ar':("يُفتح بعد 3 جولات","ما زال مقفلًا"),'he':("נפתח אחרי 3 משחקים","עדיין נעול"),'sv':("Låses upp efter 3 rundor","Fortfarande låst"),
'da':("Låses op efter 3 runder","Stadig låst"),'no':("Låses opp etter 3 runder","Fortsatt låst"),'fi':("Avautuu 3 pelin jälkeen","Vielä lukittu"),
'cs':("Odemkne se po 3 hrách","Zatím zamčeno"),'sk':("Odomkne sa po 3 hrách","Zatiaľ zamknuté"),'hu':("3 kör után nyílik meg","Még zárolva"),
'ro':("Se deblochează după 3 runde","Încă blocat"),'hr':("Otključava se nakon 3 igre","Još zaključano"),'el':("Ξεκλειδώνει μετά από 3 γύρους","Ακόμα κλειδωμένο"),
'ca':("Es desbloqueja després de 3 partides","Encara bloquejat")}
assert len(TR)==32
V0={k:v[0] for k,v in TR.items()};V1={k:v[1] for k,v in TR.items()}
js=lambda o:json.dumps(o,ensure_ascii=False,separators=(',',':'))
blk=("/* ===== 1.1.31 늑구 '싱글 빼고 저조 → 없애기보다 신규에게 덜 보이게': 처음 3판(save.runs<3) 동안 대전 · 친구 · 심해 생존을 잠금\n"
"   - 홈 대전 · 친구 버튼과 모드 고르기의 심해 생존 카드를 흐리게 + 🔒 '3판 뒤 열려요', 누르면 알림만(시작 안 함)\n"
"   - 심해 탐험(1.1.13 '처음이면 여기!')과 기록 도전은 그대로. 이미 3판 넘게 한 사람은 아무것도 안 바뀜 ===== */\n"
"try{(function(){var K0="+js(K0)+",K1="+js(K1)+",V0="+js(V0)+",V1="+js(V1)+";TRT[K0]=V0.en;TRT[K1]=V1.en;TRJ[K0]=V0.ja;TRJ[K1]=V1.ja;if(SUBL){if(V0[SUBL])TRX[K0]=V0[SUBL];if(V1[SUBL])TRX[K1]=V1[SUBL]}\n"
"  var IDS=['mpBtn','frBtn','mpSurv'],N=3;function locked(){try{return (save.runs|0)<N}catch(e){return false}}window.GF_MODE_LOCKED=locked;\n"
"  var st=document.createElement('style');st.textContent='.mlocked{opacity:.5;filter:grayscale(.7)}#mpBtn.mlocked small{display:none}.mlocked .mlk{display:block}.mlk{display:none;font-style:normal;font-size:11px;line-height:1.2;margin-top:2px;opacity:.95;white-space:nowrap}#frBtn .mlk{position:absolute;left:0;right:0;bottom:4px;text-align:center}#mpSurv.mlocked #mpSurvMeta{visibility:hidden}#mpSurv .mlk{position:absolute;left:40px;right:90px;bottom:25px;font-size:14px;text-align:left;overflow:hidden;text-overflow:ellipsis;color:#fff}#frBtn,#mpSurv{position:relative}';document.head.appendChild(st);\n"
"  function paint(){var on=locked();IDS.forEach(function(id){var b=$(id);if(!b)return;var m=b.querySelector('.mlk');if(on&&!m){m=document.createElement('em');m.className='mlk';b.appendChild(m)}if(m)m.textContent=id==='frBtn'?'🔒':'🔒 '+T(K0);if(b.classList.contains('mlocked')!==on)b.classList.toggle('mlocked',on)});return on}\n"
"  IDS.forEach(function(id){var b=$(id);if(b)b.addEventListener('click',function(e){if(!locked())return;e.stopImmediatePropagation();e.preventDefault();try{buzz(15)}catch(x){}banner('🔒 '+T(K1),T(K0))},true)});\n"
"  var rh=refreshHome;refreshHome=function(){var r=rh.apply(this,arguments);try{paint()}catch(e){}return r};\n"
"  var mo=modePickOpen;modePickOpen=function(){var r=mo.apply(this,arguments);try{paint()}catch(e){}return r};\n"
"  var tk=setInterval(function(){try{if(!paint())clearInterval(tk)}catch(e){clearInterval(tk)}},1500)})()}catch(e){}\n")
A="if(window.claude&&window.claude.hot&&window.claude.hot.ready)window.claude.hot.ready(boot);else boot();"
rep(A,blk+A)
open(W,'w',encoding='utf-8').write(w);json.dump(p,open('patch_add.json','w',encoding='utf-8'),ensure_ascii=False);print('patch_add',len(p))
