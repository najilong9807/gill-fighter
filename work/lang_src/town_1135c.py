# 1.1.35 '마을 더 살아 있게'(life.js · mid.js · 본게임 입구) — 저장소 맨 위에서 python3 work/lang_src/town_1135c.py (다시 돌려도 한 번만)
#  ① 마을 새 문구: '보물 방울을 터뜨렸어요' → i18n/en·ja·es·vi.json + lang/city_<언어>.js 끝
#     '🏛 Lv.2에 열려요'(오늘의 마을 일 Lv.3 → Lv.2) → 이미 있는 '🏛 Lv.6에 열려요' 번역을 6 → 2 로 베껴 씀
#  ② 본게임 입구(work/index.html + work/parts/city_entry.js + patch_add.json a/b):
#     · 판 결과 창 '🏘 마을 재료 상자' 줄을 마을에 안 가 본 사람에게도 보여 주고, 누르면 마을로
#     · 첫 판 뒤 홈 '마을' 탭 위 말풍선 '🏘 마을이 열렸어요!'(처음 들어갈 때까지) — 본게임 언어 꾸러미 lang/<언어>.js 끝에 번역
import json,os,re
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))+'/'
MKC='/* town_1135c */'
BUB='보물 방울을 터뜨렸어요';LV6='🏛 Lv.6에 열려요';LV2='🏛 Lv.2에 열려요';TIP='🏘 마을이 열렸어요!'
X={  # [보물 방울, 마을이 열렸어요]
'en':["Treasure bubble popped","🏘 Your Town is open!"],
'ja':["宝のあわを割りました","🏘 町が開きました！"],
'es':["¡Burbuja del tesoro reventada","🏘 ¡Tu pueblo ya está abierto!"],
'vi':["Đã chọc vỡ bong bóng kho báu","🏘 Làng của bạn đã mở!"],
'ar':["فرقعت فقاعة الكنز","🏘 قريتك مفتوحة الآن!"],
'ca':["Has rebentat una bombolla del tresor","🏘 El teu poble ja és obert!"],
'cs':["Bublina s pokladem praskla","🏘 Tvoje městečko je otevřené!"],
'da':["Skatteboble sprunget","🏘 Din by er åben!"],
'de':["Schatzblase geplatzt","🏘 Dein Dorf ist offen!"],
'el':["Έσκασες τη φούσκα θησαυρού","🏘 Το χωριό σου άνοιξε!"],
'fi':["Aarrekupla puhkaistu","🏘 Kylasi on auki!"],
'fr':["Bulle au trésor éclatée","🏘 Ton village est ouvert !"],
'he':["פוצצת בועת אוצר","🏘 הכפר שלך נפתח!"],
'hi':["खज़ाने का बुलबुला फोड़ा","🏘 आपका गाँव खुल गया!"],
'hr':["Mjehurić s blagom je pukao","🏘 Tvoje selo je otvoreno!"],
'hu':["Kincsbuborék kipukkasztva","🏘 Megnyílt a falud!"],
'id':["Gelembung harta dipecahkan","🏘 Desamu sudah terbuka!"],
'it':["Bolla del tesoro scoppiata","🏘 Il tuo villaggio è aperto!"],
'ms':["Gelembung harta dipecahkan","🏘 Kampung anda sudah dibuka!"],
'nl':["Schatbel geknapt","🏘 Je dorp is open!"],
'no':["Skatteboble sprakk","🏘 Byen din er åpen!"],
'pl':["Bańka ze skarbem pękła","🏘 Twoja wioska jest otwarta!"],
'pt':["Bolha do tesouro estourada","🏘 Sua vila está aberta!"],
'ro':["Bula cu comoară a fost spartă","🏘 Satul tău e deschis!"],
'ru':["Пузырь с сокровищем лопнул","🏘 Твоя деревня открыта!"],
'sk':["Bublina s pokladom praskla","🏘 Tvoje mestečko je otvorené!"],
'sv':["Skattbubbla sprack","🏘 Din by är öppen!"],
'th':["เป่าฟองสมบัติแตกแล้ว","🏘 หมู่บ้านของคุณเปิดแล้ว!"],
'tr':["Hazine baloncuğu patladı","🏘 Köyün açıldı!"],
'uk':["Бульбашка зі скарбом лопнула","🏘 Твоє село відкрите!"],
'zhs':["戳破了宝藏泡泡","🏘 你的小镇开放了！"],
'zht':["戳破了寶藏泡泡","🏘 你的小鎮開放了！"]}
X['fi'][1]="🏘 Kyläsi on auki!"
X['es'][0]="Burbuja del tesoro reventada"

# ① 마을 문구
for L,v in X.items():
    if L in('en','ja','es','vi'):
        f=ROOT+'work/city_src/i18n/'+L+'.json';o=json.load(open(f,encoding='utf-8'))
        o['d'][BUB]=v[0];o['d'][LV2]=o['d'][LV6].replace('6','2')
        json.dump(o,open(f,'w',encoding='utf-8'),ensure_ascii=False)
    else:
        f=ROOT+'lang/city_'+L+'.js';s=open(f,encoding='utf-8').read()
        if MKC in s:s=s[:s.index(MKC)]
        m=re.search(re.escape(json.dumps(LV6,ensure_ascii=False))+r'\s*:\s*("(?:[^"\\]|\\.)*")',s);assert m,L
        lv2=json.loads(m.group(1)).replace('6','2')
        add='try{I18N_X.d['+json.dumps(BUB,ensure_ascii=False)+']='+json.dumps(v[0],ensure_ascii=False)+';I18N_X.d['+json.dumps(LV2,ensure_ascii=False)+']='+json.dumps(lv2,ensure_ascii=False)+'}catch(e){}'
        open(f,'w',encoding='utf-8').write(s.rstrip('\n')+'\n'+MKC+add+'\n')
# 본게임 언어 꾸러미(en · ja · es · vi 는 아래 코드 안에서)
for L,v in X.items():
    if L in('en','ja','es','vi'):continue
    f=ROOT+'lang/'+L+'.js';s=open(f,encoding='utf-8').read()
    if MKC in s:s=s[:s.index(MKC)]
    add='try{window.GF_TRX['+json.dumps(TIP,ensure_ascii=False)+']='+json.dumps(v[1],ensure_ascii=False)+'}catch(e){}'
    open(f,'w',encoding='utf-8').write(s.rstrip('\n')+'\n'+MKC+add+'\n')

# ② 본게임 입구
A1="if(n&&save.cityIn){var rec=document.getElementById('oRec');if(rec){var li=document.createElement('li');li.className='cityg';var sp=document.createElement('span'),b=document.createElement('b');sp.textContent=T(CGT);b.textContent='+1 · '+n+' / '+GBX;li.appendChild(sp);li.appendChild(b);rec.appendChild(li)}}"
B1=("if(n){var rec=document.getElementById('oRec');if(rec){var li=document.createElement('li');li.className='cityg';var sp=document.createElement('span'),b=document.createElement('b');sp.textContent=T(CGT);b.textContent='+1 · '+n+' / '+GBX;li.appendChild(sp);li.appendChild(b);rec.appendChild(li);"
    "if(!save.cityIn){b.textContent='+1 ›';li.className='cityg cgo';li.setAttribute('role','button');li.tabIndex=0;li.onclick=function(){try{buzz(8)}catch(e){}open()}}}}")  # 1.1.35: 마을에 안 가 본 사람에게도 보여 주고 누르면 마을로
A2="    d.hidden=!on}"
B2=("    d.hidden=!on;tipUp()}\n"
    "  /* 1.1.35: 첫 판 뒤 홈 '마을' 탭 위 말풍선(처음 들어갈 때까지) — 신규 76명 중 11명만 마을에 들어가 봄(11/14~27) */\n"
    "  var TIPK='🏘 마을이 열렸어요!',TIPV={en:'🏘 Your Town is open!',ja:'🏘 町が開きました！',es:'🏘 ¡Tu pueblo ya está abierto!',vi:'🏘 Làng của bạn đã mở!'};\n"
    "  try{TRT[TIPK]=TIPV.en}catch(e){}try{TRJ[TIPK]=TIPV.ja}catch(e){}try{if(SUBL&&TIPV[SUBL])TRX[TIPK]=TIPV[SUBL]}catch(e){}\n"
    "  try{var tst=document.createElement('style');tst.textContent='#tab-city{position:relative;overflow:visible}#cityTip{position:absolute;left:50%;bottom:calc(100% + 8px);transform:translateX(-50%);white-space:nowrap;padding:7px 12px;border-radius:14px;background:#FFF6D6;color:#0B2C4A;border:2.5px solid #0B2C4A;font:400 13px/1.15 \"Jua\",system-ui,sans-serif;-webkit-text-stroke:0;text-shadow:none;letter-spacing:0;text-transform:none;box-shadow:0 3px 0 #0B2C4A;pointer-events:none;z-index:3;animation:ctipb 1.6s ease-in-out infinite}#cityTip:after{content:\"\";position:absolute;left:50%;top:100%;margin-left:-7px;border:7px solid transparent;border-top-color:#0B2C4A}#cityTip[hidden]{display:none}@keyframes ctipb{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,-4px)}}li.cityg.cgo{cursor:pointer}@media (prefers-reduced-motion:reduce){#cityTip{animation:none}}';document.head.appendChild(tst)}catch(e){}\n"
    "  function tipUp(){try{var tp=document.getElementById('cityTip'),want=!!tb&&!ov&&!save.cityIn&&(save.runs|0)>=1&&typeof page!=='undefined'&&page==='home';\n"
    "    if(want&&!tp){tp=document.createElement('div');tp.id='cityTip';tp.setAttribute('aria-hidden','true');tb.appendChild(tp)}if(tp){tp.textContent=T(TIPK);tp.hidden=!want}\n"
    "    if(tp&&want){var r=tp.getBoundingClientRect();if(r.right>innerWidth-6)tp.style.marginLeft=(innerWidth-6-r.right)+'px';else if(r.left<6)tp.style.marginLeft=(6-r.left)+'px'}}catch(e){}}")
for p in ['work/parts/city_entry.js','work/index.html']:
    s=open(ROOT+p,encoding='utf-8').read()
    if 'function tipUp()' in s:print('already',p);continue
    for a,b in [(A1,B1),(A2,B2)]:
        assert s.count(a)==1,(p,a[:40]);s=s.replace(a,b)
    open(ROOT+p,'w',encoding='utf-8').write(s);print('ok',p)
pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
if not any(r.get('b')==B2 for r in pa):
    pa.append({"a":A1,"b":B1});pa.append({"a":A2,"b":B2})
    open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('patch_add +2')
print('town_1135c',len(X))
