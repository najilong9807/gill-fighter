# 1.1.34 그래픽 검토 반영(본게임 index.html): 바꾸기마다 work/index.html 과 patch_add.json 에 같은 항목
import json,sys
ROOT='/home/claude/gf-qa/'
R=[
 # 대비 4.5:1 넘기기
 ("border-radius:99px;background:#FF4D4D;color:#fff","border-radius:99px;background:#D92B2B;color:#fff"),
 ("accent-color:#3FB950}#rbxBtn{position:relative}#rbxBtn .rbx-n{position:absolute;right:-6px;top:-6px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:#FF4D4D","accent-color:#3FB950}#rbxBtn{position:relative}#rbxBtn .rbx-n{position:absolute;right:-6px;top:-6px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:#D92B2B"),
 ("st.textContent='#rbxBtn{position:relative}#rbxBtn .rbx-n{position:absolute;right:-6px;top:-6px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:#FF4D4D","st.textContent='#rbxBtn{position:relative}#rbxBtn .rbx-n{position:absolute;right:-6px;top:-6px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:#D92B2B"),
 (".good em{font-style:normal;font-size:11.5px;color:#0E8F7A",".good em{font-style:normal;font-size:11.5px;color:#0B7262"),
 (".dddesc{font-size:10.5px;color:#0E8F7A",".dddesc{font-size:10.5px;color:#0B7262"),
 ('.shsub small{font-family:"Jua",sans-serif;font-size:12px;color:#6A8299','.shsub small{font-family:"Jua",sans-serif;font-size:12px;color:#4E6378'),
 (".shsub.prem{color:#B07800",".shsub.prem{color:#8A5E00"),
 ("#oMsg.omsg .ml.hi{color:#B85C00","#oMsg.omsg .ml.hi{color:#9A4D00"),
 # 받기 단추 높이 44 · 멈춤 창 켜기/끄기를 설정 창과 같은 초록/회남색으로
 ('.sw[aria-pressed="true"]{-webkit-text-stroke:3px #0D4A1F;background:linear-gradient(180deg,#C2F86F,#2FA636)}',
  '.sw[aria-pressed="true"]{-webkit-text-stroke:3px #0D4A1F;background:linear-gradient(180deg,#C2F86F,#2FA636)}.dmb{min-height:44px;align-content:center}#dmClaimAll{min-height:44px}#setPause .boost[aria-pressed="true"]:not(.hand){color:#fff!important;-webkit-text-stroke:2.5px #0D4A1F!important;paint-order:stroke fill;text-shadow:none;background:linear-gradient(180deg,#C2F86F,#2FA636);box-shadow:inset 0 2px 0 rgba(255,255,255,.75),0 0 0 2.5px #0D4A1F,0 4px 0 2.5px #0D4A1F}'),
 # 새 저장의 수족관 유리는 깨끗하게 시작(이끼는 다음 날부터)
 ("o=save.tkc={clean:Date.now()-16*3600e3,","o=save.tkc={clean:Date.now(),"),
]
p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read()
pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
for a,b in R:
    if b in s: print('already',a[:40]);continue
    n=s.count(a)
    if n==0 and s.count(b)>=1: print('already',a[:50]);continue
    if n!=1: sys.exit('count %d: %s'%(n,a[:80]))
    s=s.replace(a,b);pa.append({"a":a,"b":b})
open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('ok',len(R))

# --- 야간 점검: 진주가 모자라 흐린 '사기' 단추를 눌러도 아무 반응이 없던 것 → '진주가 모자라요' 띠 + 살짝 흔들기(번역 있는 문구) ---
R2=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 값이 모자라 흐려진 사기 단추(disabled)는 눌러도 반응이 없었음 → 카드를 누르면 '진주가 모자라요' 알림 + 흔들기 */\ndocument.addEventListener('click',function(e){try{var c=e.target&&e.target.closest&&e.target.closest('#sea .good');if(!c)return;var bt=c.querySelector('button.buy');if(!bt||!bt.disabled)return;var n=+String(bt.textContent||'').replace(/[^0-9]/g,'');if(!(n>0))return;var gem=/gemonly/.test(c.className);if(gem?(save.gems|0)>=n:(save.pearls|0)>=n)return;if(!gem){banner(T('진주가 모자라요'),'')}buzz(30);c.classList.remove('nope');void c.offsetWidth;c.classList.add('nope');setTimeout(function(){c.classList.remove('nope')},450)}catch(x){}},true);\n(function(){var s=document.createElement('style');s.textContent='@keyframes gfnope{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}#sea .good.nope{animation:gfnope .35s ease}';document.head.appendChild(s)})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r2':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    for a,b in R2:
        if 'gfnope' in s: print('already');continue
        assert s.count(a)==1;s=s.replace(a,b);pa.append({"a":a,"b":b})
    open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r2 ok')

# --- 야간 점검: 멈춤 창 켜기/끄기 단추가 긴 언어(ru · vi)에서 '· 켜짐/꺼짐'이 잘려 상태가 안 보이던 것 → 두 줄 허용 ---
R3=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 멈춤 창 켜기/끄기가 긴 언어(ru · vi)에서 '· 켜짐/꺼짐'까지 잘리던 것 → 두 줄 허용 */(function(){var s=document.createElement('style');s.textContent='.setbox .boost,#setPause .toggles .boost{white-space:normal;line-height:1.12;text-wrap:balance;text-overflow:clip}';document.head.appendChild(s)})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r3':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    for a,b in R3:
        if '멈춤 창 켜기/끄기가 긴 언어' in s: print('already');continue
        assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
    open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r3 ok')

# --- 야간 점검: 보상함 줄 이름이 긴 언어(de · ru · vi)에서 '…'로 잘리던 것 → 두 줄까지 ---
R4=[('.rbx-r b{display:block;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}','.rbx-r b{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:14px;line-height:1.2;overflow:hidden;overflow-wrap:anywhere}')]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r4':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    for a,b in R4:
        if b in s: print('already');continue
        assert s.count(a)==1;s=s.replace(a,b);pa.append({"a":a,"b":b})
    open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r4 ok')

# --- 야간 점검(사용자 질문 '조용한 정원 그거 뭐 해야 열림'): 손님 도감에서 아직 못 만난 손님 줄을 누르면 필요한 소품 이름 · 놓았는지(✓/○)를 보여 줌 ---
R5=[("    if(G.hw&&!met){var em=document.createElement('em');em.className='hwtag';",
 "    if(!met){sm.textContent=G.hint+' 👆';li.style.cursor='pointer';li.addEventListener('click',function(){try{var ks={};DS().placed.forEach(function(q){if(!q.pv)ks[q.k]=1});sm.textContent=G.hint+' — '+G.need.map(function(k){var D=decoById(k);return (ks[k]?'✓ ':'○ ')+(D?D.name:k)}).join(' · ');li.classList.add('gb-open')}catch(x){}})}\n    if(G.hw&&!met){var em=document.createElement('em');em.className='hwtag';")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r5':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    for a,b in R5:
        if 'gb-open' in s: print('already');continue
        assert s.count(a)==1;s=s.replace(a,b);pa.append({"a":a,"b":b})
    open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r5 ok')

# --- 야간 점검: 꾸미기 서랍 소품 이름이 한국어도 '다시마 크리스마…'로 잘리던 것 → 두 줄까지 ---
R6=[('.ddcard b{font-family:var(--disp);font-weight:400;font-size:13px;line-height:1.1;white-space:nowrap;max-width:88px;overflow:hidden;text-overflow:ellipsis}',
     '.ddcard b{font-family:var(--disp);font-weight:400;font-size:12px;line-height:1.1;max-width:88px;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;text-align:center;overflow-wrap:break-word;-webkit-hyphens:auto;hyphens:auto}')]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r6':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    for a,b in R6:
        if b in s: print('already');continue
        assert s.count(a)==1;s=s.replace(a,b);pa.append({"a":a,"b":b})
    open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r6 ok')

# --- 야간 점검: 미션 창 위 '100명 감사 이벤트' 띠가 긴 언어에서 거의 다 잘리던 것 → 두 줄까지 ---
R7=[('.dmhw span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}','.dmhw span{flex:1;min-width:0;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;line-height:1.15;font-size:min(1em,14px);-webkit-hyphens:auto;hyphens:auto}')]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r7':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    for a,b in R7:
        if b in s: print('already');continue
        assert s.count(a)==1;s=s.replace(a,b);pa.append({"a":a,"b":b})
    open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r7 ok')

# --- 야간 점검: 설정 › 언어 'Bahasa Indonesia · Bahasa Melayu'가 '…'로 잘리던 것 → 두 줄 허용(높이 38 그대로) ---
R8=[('.langseg.many button{min-height:38px}','.langseg.many button{min-height:38px}.langseg.many button{white-space:normal!important;text-overflow:clip!important;line-height:1.05;overflow-wrap:break-word}')]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r8':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    for a,b in R8:
        if b in s: print('already');continue
        assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
    open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r8 ok')

# --- 야간 점검(1.1.32 남긴 것 es '1 recompensas'): 보상이 1개일 때 자동 받기 알림이 'Rewards 1 rewards…' 처럼 복수로 나오던 것 → 1개면 '보상을 받았어요!' ---
R9=[("banner(auto?T('🎁 보상 ')+n+T('개를 자동으로 받았어요'):n>1?","banner(auto&&n>1?T('🎁 보상 ')+n+T('개를 자동으로 받았어요'):auto?'🎁 '+T('보상을 받았어요!'):n>1?")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r9':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    for a,b in R9:
        if b in s: print('already');continue
        assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
    open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r9 ok')

# --- 야간 점검: 홈 아래 알림 띠(크리스마스 선물 · 업데이트 등)가 세로 화면 긴 언어(ja · es · ru)에서 '…'로 잘리던 것 → 가로 화면처럼 두 줄 ---
R10=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 홈 알림 띠 두 줄 */(function(){var s=document.createElement('style');s.textContent='.updbar span{white-space:normal!important;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:1.15;text-overflow:clip}';document.head.appendChild(s)})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r10':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    for a,b in R10:
        if '홈 알림 띠 두 줄' in s: print('already');continue
        assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
    open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r10 ok')

# --- 야간 점검: 모드 고르기 '기록 도전' 아래 줄('첫 기록을 남겨 보세요')이 ca · fi · el · hu · it · he 등에서 '…'로 잘리던 것 → 두 줄 ---
R11=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 기록 도전 아래 줄 두 줄 */(function(){var s=document.createElement('style');s.textContent='#modePick .mcard.rec .mc-meta{white-space:normal;text-overflow:clip;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:1.15;font-size:14px}';document.head.appendChild(s)})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r11':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    for a,b in R11:
        if '기록 도전 아래 줄 두 줄' in s: print('already');continue
        assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
    open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r11 ok')

# --- 야간 점검: 심해 탐험 지도 위 '심해 탐험' 이름 칩이 hr · hu · fi · id · el 등에서 '…'로 잘리던 것 → 두 줄 · 작게 ---
R12=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 탐험 지도 이름 칩 두 줄 */(function(){var s=document.createElement('style');s.textContent='html:not([data-lang=ko]) #camp .head .tag{white-space:normal;text-overflow:clip;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:1.1;font-size:11.5px;text-align:center}';document.head.appendChild(s)})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r12':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    for a,b in R12:
        if '탐험 지도 이름 칩 두 줄' in s: print('already');continue
        assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
    open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r12 ok')

# --- 야간 점검: 출석 7칸이 긴 언어(it 'Giorno 7')에서 줄 밖으로 밀려 7일째 칸이 잘리던 것 → 칸이 줄어들게(minmax 0) · 글자 작게 ---
R13=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 출석 7칸 맞춤 */(function(){var s=document.createElement('style');s.textContent='.attrow{grid-template-columns:repeat(7,minmax(0,1fr))!important}html:not([data-lang=ko]) .attrow li b{font-size:min(12px,2.8vw);letter-spacing:-.04em}';document.head.appendChild(s)})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r13':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    for a,b in R13:
        if '출석 7칸 맞춤' in s: print('already');continue
        assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
    open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r13 ok')

# --- 야간 점검: 수족관 '꾸미기' 단추가 긴 언어(uk 'Прикрасити')에서 화면 오른쪽 밖으로 나가던 것 → 줄어들게 · 한국어 말고는 글자 조금 작게 ---
R14=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 수족관 꾸미기 단추 맞춤 */(function(){var s=document.createElement('style');s.textContent='.tank-bottom .deco-btn{flex:0 1 auto;min-width:0}html:not([data-lang=ko]) .tank-bottom .deco-btn{font-size:min(22px,5.2vw);padding-left:10px;padding-right:12px}';document.head.appendChild(s)})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r14':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    for a,b in R14:
        if '수족관 꾸미기 단추 맞춤' in s: print('already');continue
        assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
    open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r14 ok')

# --- 야간 점검: 진주 · 보석이 아주 많을 때(백만 넘음) 홈 진주 칸이 잘리고 도감 보석 칸이 화면 밖으로 나가던 것 → 백만부터 짧게(언어별 9.9억 · 988M · 9,9 Mio.) ---
R15=[("function fmtBig(n){","/* 1.1.34 야간 점검: 재화 칸 짧은 숫자 */function pillN(n){n=Math.round(+n||0);if(n<1000000)return nf(n);try{var L={zhs:'zh-CN',zht:'zh-TW',no:'nb'}[LANG]||LANG;return new Intl.NumberFormat(L,{notation:'compact',maximumFractionDigits:1}).format(n)}catch(e){return nf(n)}}\nfunction fmtBig(n){")]
for _i in ['hmPearl','mPearl','sPearl','tkPearl','rPearl']: R15.append(("$('%s').textContent=nf(save.pearls)"%_i,"$('%s').textContent=pillN(save.pearls)"%_i))
for _i in ['hmGem','mGem','sGem','tkGem']: R15.append(("$('%s').textContent=nf(save.gems)"%_i,"$('%s').textContent=pillN(save.gems)"%_i))
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r15':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if '재화 칸 짧은 숫자' in s: print('already')
    else:
        for a,b in R15:
            assert s.count(a)==1,(a,s.count(a));s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r15 ok')

# --- 야간 점검: 작은 누름 칸(꾸미기 모자/얼굴 칸 34 · 도감 NEW 29)이 44 보다 작아 누르기 어려움 + 설정 켜짐/꺼짐은 누르면 3px 내려가 위 가장자리를 누르면 안 바뀌던 것 → 보이는 모양은 그대로, 눌리는 칸만 투명하게 넓힘 ---
R16=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 작은 단추 누름 칸 넓힘 */(function(){var s=document.createElement('style');s.textContent='.dd-seg.acc-seg>button,.dex-fbar .nwb{position:relative}.dd-seg.acc-seg>button::before{content:\"\";position:absolute;left:0;right:0;top:-5px;bottom:-5px}.dex-fbar .nwb::before{content:\"\";position:absolute;left:0;right:0;top:-8px;bottom:-8px}#setAll .sw::after{top:-10px}';document.head.appendChild(s)})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r16':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if '작은 단추 누름 칸 넓힘' in s: print('already')
    else:
        for a,b in R16:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r16 ok')

# --- 야간 점검: 심해 생존 위쪽 '꺼-억' 게이지 이름이 긴 언어(ru ОТРЫЖКА · de RÜLPS · el ΜΠΟΥΡΠ)에서 게이지 막대 밑으로 들어가던 것 → 이름 칸(36px)에 맞게 가로로 줄여 그림 ---
R17=[("ctx.strokeText(T('꺼-억'),x+2,gy+5);ctx.fillStyle='#B9FFCF';ctx.fillText(T('꺼-억'),x+2,gy+5);",
 "ctx.strokeText(T('꺼-억'),x+2,gy+5,36);ctx.fillStyle='#B9FFCF';ctx.fillText(T('꺼-억'),x+2,gy+5,36);/*1.1.34 야간 점검: 게이지 이름 맞춤*/")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r17':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if '게이지 이름 맞춤' in s: print('already')
    else:
        for a,b in R17:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r17 ok')

# --- 야간 점검: 마을에서 창(다녀오셨어요 · 건물 창 등)이 떠 있을 때 위에서 오는 알림 띠가 아래쪽(+150px)에 떠서 그 창의 「모두 받기」 같은 단추를 몇 초 덮던 것 → 마을 창이 열려 있으면 띠를 위쪽 원래 자리에 ---
R18=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 마을 창 위 알림 띠 */window.addEventListener('load',function(){setTimeout(function(){if(typeof banner1!=='function')return;var prev=banner1;banner1=function(){var r=prev.apply(this,arguments);try{if(document.body.classList.contains('cityOn')){var f=document.querySelector('#cityOv iframe'),d=f&&f.contentDocument,pn=d&&d.getElementById('panel');if(pn&&!pn.hidden&&pn.offsetHeight>0)$('banner').classList.remove('low')}}catch(e){}return r}},1500)});\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r18':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if '마을 창 위 알림 띠' in s: print('already')
    else:
        for a,b in R18:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r18 ok')

# --- 야간 점검: 게임 중 아래 안내 줄('작은 물고기를 먹고, 큰 물고기는 <em>입</em>만 피해요')을 세 조각으로 따로 번역해서 여러 언어에서 문장이 깨짐(es "a los grandes' boca", de "weich den großen aus Maul", hr "usta … usta", tr 동사 빠짐 등) → 언어별 한 문장으로(ko · ja · fi · hu · zh 는 그대로) ---
HINT_FIX={"en": "Eat smaller fish and dodge the <em>mouths</em> of big ones", "es": "Come peces más pequeños y esquiva la <em>boca</em> de los grandes", "vi": "Ăn cá nhỏ hơn và né <em>miệng</em> cá lớn", "ar": "كُل السمك الأصغر وتفادَ <em>فم</em> السمك الكبير", "ca": "Menja peixos més petits i esquiva la <em>boca</em> dels grans", "cs": "Žer menší ryby a vyhýbej se <em>tlamě</em> velkých", "da": "Æd mindre fisk og undvig de stores <em>mund</em>", "de": "Friss kleinere Fische und weich dem <em>Maul</em> der großen aus", "el": "Φάε μικρότερα ψάρια και απόφυγε το <em>στόμα</em> των μεγάλων", "fr": "Mange les petits poissons et évite la <em>bouche</em> des gros", "he": "אכלו דגים קטנים יותר והתחמקו <em>מהפה</em> של הגדולים", "hi": "छोटी मछलियाँ खाओ और बड़ी मछलियों के <em>मुँह</em> से बचो", "hr": "Jedi manje ribe i izbjegavaj <em>usta</em> velikih", "id": "Makan ikan yang lebih kecil dan hindari <em>mulut</em> ikan besar", "it": "Mangia i pesci più piccoli e schiva la <em>bocca</em> di quelli grandi", "ms": "Makan ikan lebih kecil dan elak <em>mulut</em> ikan besar", "nl": "Eet kleinere vissen en ontwijk de <em>bek</em> van de grote", "no": "Spis mindre fisker og unngå <em>munnen</em> til de store", "pl": "Jedz mniejsze ryby i unikaj <em>pysków</em> dużych", "pt": "Coma peixes menores e desvie da <em>boca</em> dos grandes", "ro": "Mănâncă pești mai mici și ferește-te de <em>gura</em> celor mari", "ru": "Ешь рыб поменьше и уворачивайся от <em>пасти</em> больших", "sk": "Jedz menšie ryby a vyhýbaj sa <em>papuli</em> veľkých", "sv": "Ät mindre fiskar och undvik de storas <em>mun</em>", "th": "กินปลาที่เล็กกว่าและหลบ<em>ปาก</em>ของปลาใหญ่", "tr": "Küçük balıkları ye, büyüklerin <em>ağzından</em> kaç", "uk": "Їж менших риб і уникай <em>пащі</em> великих"}
R19=[("function showTab(p){crumb('tab:'+p);","/* 1.1.34 야간 점검: 안내 줄 한 문장 */var HINT_FIX="+json.dumps(HINT_FIX,ensure_ascii=False)+";\nfunction showTab(p){crumb('tab:'+p);"),
 ("else hn.innerHTML=hn._h0}","else hn.innerHTML=(typeof HINT_FIX!=='undefined'&&HINT_FIX[window.GF_LC||LANG])||hn._h0}")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r19':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if '안내 줄 한 문장' in s: print('already')
    else:
        for a,b in R19:
            assert s.count(a)==1,(a,s.count(a));s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r19 ok')

# --- 야간 점검: 판 시작 알림 띠(보물 바다 · 이번 주 기록 도전 …)가 떠 있는 동안 멈추면 띠가 멈춤 창 제목 · 첫 줄을 덮음(375×667 같은 짧은 화면에서 잘 보임) → 멈춤 창이 열릴 때 이미 떠 있던 띠는 닫음(멈춘 뒤에 뜨는 띠는 그대로) ---
R20=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 멈춤 창 위 띠 닫기 */(function(){try{var pz=document.getElementById('pause');if(!pz)return;new MutationObserver(function(){if(!pz.hidden){var bn=document.getElementById('banner');if(bn&&!bn.hidden)bn.hidden=true}}).observe(pz,{attributes:true,attributeFilter:['hidden']})}catch(e){}})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r20':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if '멈춤 창 위 띠 닫기' in s: print('already')
    else:
        for a,b in R20:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r20 ok')

# --- 야간 점검: 좁은 화면(320폭 · iOS 15 지원 기기 iPhone SE 1세대)에서 결과창 '이어하기' 상자가 창 오른쪽 밖으로 나가 '공유하고' 단추가 잘리던 것(min-width:auto) → 상자가 줄어들게, 한국어 말고는 단추 글자 조금 작게 ---
R21=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 이어하기 상자 좁은 화면 */(function(){var s=document.createElement('style');s.textContent='#contBox{min-width:0;max-width:100%}#contBox .contbtns{min-width:0}#contBox .contbtns>*{min-width:0}html:not([data-lang=ko]) #over #contBox .contbtns>.btn{font-size:min(18px,4.7vw)!important;padding-left:6px!important;padding-right:6px!important}';document.head.appendChild(s)})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r21':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if '이어하기 상자 좁은 화면' in s: print('already')
    else:
        for a,b in R21:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r21 ok')

# --- 야간 점검: 멈춤 창 켜기/끄기 단추 높이 32px(손가락 권장 44 보다 작음, 안에 overflow:hidden 이라 투명 확장 불가) → 세로 640px 이상 화면에서만 40px(375×667 · 360×800 에서 창이 화면 안에 들어감 확인, 320×568 은 그대로) ---
R22=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 멈춤 창 단추 높이 */(function(){var s=document.createElement('style');s.textContent='@media (min-height:640px){#setPause .toggles .boost{min-height:40px}}';document.head.appendChild(s)})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r22':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if '멈춤 창 단추 높이' in s: print('already')
    else:
        for a,b in R22:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r22 ok')

# --- 야간 점검: 출석 · 미션 보상 '받기'를 눌러도 진동 한 번과 숫자만 조용히 바뀌어 받은 느낌이 약함 → 누른 자리에 '+50'(진주 금색 · 보석 파랑)이 떠오르며 사라짐(움직임 줄이기 설정이면 흐려지기만) ---
R23=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 보상 받기 +숫자 */(function(){try{var s=document.createElement('style');s.textContent='.gfplus{position:fixed;z-index:9999;pointer-events:none;transform:translate(-50%,-50%);font-family:var(--disp);font-size:24px;color:#FFE45C;-webkit-text-stroke:5px #6A3B00;paint-order:stroke fill;white-space:nowrap;animation:gfplus .95s ease-out forwards}.gfplus.g{color:#9FE7FF;-webkit-text-stroke-color:#0B2C4A}@keyframes gfplus{0%{opacity:0;transform:translate(-50%,-30%) scale(.7)}20%{opacity:1;transform:translate(-50%,-80%) scale(1.12)}100%{opacity:0;transform:translate(-50%,-190%) scale(1)}}@media (prefers-reduced-motion:reduce){.gfplus{animation:gfplusR .9s forwards}@keyframes gfplusR{0%,60%{opacity:1}100%{opacity:0}}}';document.head.appendChild(s);var lt={x:innerWidth/2,y:innerHeight/2};document.addEventListener('pointerdown',function(e){lt={x:e.clientX,y:e.clientY}},true);if(typeof dmGive!=='function')return;var g0=dmGive;dmGive=function(o){g0(o);try{var n=o&&(o.g||o.p);if(!n)return;var el=document.createElement('div');el.className='gfplus'+(o.g?' g':'');el.textContent='+'+nf(n);el.style.left=Math.max(40,Math.min(innerWidth-40,lt.x))+'px';el.style.top=Math.max(60,lt.y)+'px';document.body.appendChild(el);setTimeout(function(){el.remove()},1000)}catch(e){}}}catch(e){}})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r23':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if '보상 받기 +숫자' in s: print('already')
    else:
        for a,b in R23:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r23 ok')

# --- 야간 점검: 문의 보내기에 언어가 LANG(ru · de 등 꾸러미 언어는 모두 'en')로 가서 받은 메일에서 실제 언어를 알 수 없던 것 → 실제 언어 코드(GF_LC) ---
R24=[("reply_email:mail||'(없음)',app:APP_VER,lang:LANG,","reply_email:mail||'(없음)',app:APP_VER,lang:(window.GF_LC||LANG),")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r24':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if 'lang:(window.GF_LC||LANG),' in s: print('already')
    else:
        for a,b in R24:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r24 ok')

# --- 야간 점검: 저장 백업 코드로 불러오면 d.lang=LANG 을 써서 ko · en · ja 말고 30개 언어(ru · de · es …) 사용자는 다시 켤 때 영어로 바뀌던 것 → 실제 언어 코드(GF_LC) ---
R25=[("CLOUD_LOCK=1;d.cloud={code:code,at:Date.now(),h:''};d.lang=LANG;","CLOUD_LOCK=1;d.cloud={code:code,at:Date.now(),h:''};d.lang=(window.GF_LC||LANG);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r25':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if 'd.lang=(window.GF_LC||LANG);' in s: print('already')
    else:
        for a,b in R25:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r25 ok')

# --- 야간 점검: 별점 요청 기록(crashQ → gf_crash)에 lang:LANG 이라 꾸러미 언어가 모두 'en' 으로 쌓이던 것 → SUBL||LANG(다른 기록과 같게) ---
R26=[("d:Math.floor((now-save.firstAt)/864e5),lang:LANG}]","d:Math.floor((now-save.firstAt)/864e5),lang:(typeof SUBL==='string'&&SUBL)||LANG}]")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r26':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if "864e5),lang:(typeof SUBL==='string'&&SUBL)||LANG}]" in s: print('already')
    else:
        for a,b in R26:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r26 ok')

# --- 야간 점검: fmtBig 이 en 말고는 모두 '만'(한국어 단위)이라 일본어에서 비싼 물고기 레벨 업 값이 '真珠 11.9만'처럼 나오던 것 → ja 는 '万' ---
R27=[("function fmtBig(n){if(n<100000)return nf(n);return LANG==='en'?(Math.round(n/100)/10)+'K':(Math.round(n/1000)/10)+'만'}",
 "function fmtBig(n){if(n<100000)return nf(n);return LANG==='en'?(Math.round(n/100)/10)+'K':(Math.round(n/1000)/10)+(LANG==='ja'?'万':'만')}")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r27':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if "(LANG==='ja'?'万':'만')" in s: print('already')
    else:
        for a,b in R27:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r27 ok')

# --- 야간 점검: 도감에서 물고기를 고르면 나오는 '레벨 업' 단추 아래 값이 꾸러미 언어(ru · de …)에서 '100 pearls'(영어)로 남던 것 → 그 언어의 '진주' 낱말 ---
R28=[("lsm.textContent=(LANG==='en'?fmtBig(lc.price)+' pearls':(LANG==='ja'?'真珠 ':'진주 ')+fmtBig(lc.price));",
 "lsm.textContent=((typeof SUBL==='string'&&SUBL)?T('진주 ')+fmtBig(lc.price):LANG==='en'?fmtBig(lc.price)+' pearls':(LANG==='ja'?'真珠 ':'진주 ')+fmtBig(lc.price));")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r28':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if "(typeof SUBL==='string'&&SUBL)?T('진주 ')+fmtBig(lc.price)" in s: print('already')
    else:
        for a,b in R28:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r28 ok')

# --- 야간 점검: 수족관 친구 창 '📖 Tap a fish to read its story'가 꾸러미 언어(ru 등)에서 영어로 남던 것 — 코드가 '📖 '를 앞에 붙여 번역표(정확히 같은 문장)와 안 맞음 → 그림과 문장을 다른 글 조각으로 ---
R29=[("hn.className='aq-lead aqs-hint';hn.textContent='📖 '+W.hint;","hn.className='aq-lead aqs-hint';hn.textContent='📖 ';hn.appendChild(document.createTextNode(W.hint));")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r29':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if "hn.appendChild(document.createTextNode(W.hint));" in s: print('already')
    else:
        for a,b in R29:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r29 ok')

# --- 야간 점검(R23 보완): 자동 받기(앱 켤 때 출석 자동 수령)도 dmGive 를 불러 누르지 않았는데 화면 가운데 '+50'이 뜨던 것 → 누른 뒤 1.5초 안의 받기만 ---
R30=[("document.addEventListener('pointerdown',function(e){lt={x:e.clientX,y:e.clientY}},true);","document.addEventListener('pointerdown',function(e){lt={x:e.clientX,y:e.clientY,t:Date.now()}},true);"),
 ("dmGive=function(o){g0(o);try{var n=o&&(o.g||o.p);if(!n)return;","dmGive=function(o){g0(o);try{var n=o&&(o.g||o.p);if(!n||Date.now()-(lt.t||0)>1500)return;")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r30':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if "Date.now()-(lt.t||0)>1500" in s: print('already')
    else:
        for a,b in R30:
            assert s.count(a)==1,(a,s.count(a));s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r30 ok')

# --- 야간 점검: 결과창 '다음 물고기 해금까지 진주 N개 남았어요' 줄이 꾸러미 언어 30개에서 영어('Рыба-клоун needs 99 more pearls to unlock.')로 남던 것 → 문법이 필요 없는 꼴 '🔒 Рыба-клоун · Жемчуг 1 / 100' (en · ko · ja 그대로) ---
R31=[("(LANG==='en'?n.name+' needs '+nf(fishPrice(n)-save.pearls)+' more pearls to unlock.':",
 "((typeof SUBL==='string'&&SUBL)?'🔒 '+n.name+' · '+T('진주 ')+nf(save.pearls)+' / '+nf(fishPrice(n))+'.':LANG==='en'?n.name+' needs '+nf(fishPrice(n)-save.pearls)+' more pearls to unlock.':")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r31':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if "'🔒 '+n.name+' · '+T('진주 ')" in s: print('already')
    else:
        for a,b in R31:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r31 ok')

# --- 야간 점검: 320폭에서 심해 생존 첫 안내 창 '건너뛰기 · 다음' 두 단추 칸이 글자 폭대로 커져 창 오른쪽 밖으로 나가던 것(ru 'Пропустить') → 칸이 줄어들게, 한국어 말고는 글자 조금 작게 ---
R32=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 생존 안내 단추 칸 */(function(){var s=document.createElement('style');s.textContent='.svgd-btns{grid-template-columns:minmax(0,1.4fr) minmax(0,1fr)!important}.svgd-btns>*{min-width:0}html:not([data-lang=ko]) .svgd-btns>.btn{font-size:min(22px,6vw)!important;padding-left:6px!important;padding-right:6px!important}';document.head.appendChild(s)})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r32':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if '생존 안내 단추 칸' in s: print('already')
    else:
        for a,b in R32:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r32 ok')

# --- 야간 점검: 320폭 미션 이름이 긴 낱말(ru 'Продержись')에서 낱말 중간으로 꺾이던 것 → 340px 이하 · 한국어 말고는 14px + 자동 하이픈 ---
R33=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 좁은 화면 미션 이름 */(function(){var s=document.createElement('style');s.textContent='@media (max-width:340px){html:not([data-lang=ko]) .dmt strong{font-size:14px!important;hyphens:auto;-webkit-hyphens:auto}}';document.head.appendChild(s)})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r33':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if '좁은 화면 미션 이름' in s: print('already')
    else:
        for a,b in R33:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r33 ok')

# --- 야간 점검: 심해 탐험 지도 위 이름 칩이 좁은 화면(320 · 360) 긴 언어에서 낱말 중간으로 꺾이던 것(ru 'Глубоководн-ая…') → 380px 이하 · 한국어 말고는 칩 숨김(화면 이름을 되풀이하는 칩, 생존 창들도 같은 방식) ---
R34=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 탐험 칩 좁은 화면 */(function(){var s=document.createElement('style');s.textContent='@media (max-width:380px){html:not([data-lang=ko]) #camp .head .tag{display:none}}';document.head.appendChild(s)})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r34':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if '탐험 칩 좁은 화면' in s: print('already')
    else:
        for a,b in R34:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r34 ok')

# --- 야간 점검: 모드 고르기 '심해 생존' 카드 아래 줄('챕터 30개 · 처음 도전해 보세요')이 한국어(375폭)도 '…'로 잘리던 것 → 기록 도전 카드(R11)처럼 두 줄 ---
R35=[("function showTab(p){crumb('tab:'+p);",
 "/* 1.1.34 야간 점검: 생존 카드 아래 줄 두 줄 */(function(){var s=document.createElement('style');s.textContent='#modePick .mcard.surv .mc-meta{white-space:normal;text-overflow:clip;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:1.15;font-size:14px}';document.head.appendChild(s)})();\nfunction showTab(p){crumb('tab:'+p);")]
if __name__=='__main__' and len(sys.argv)>1 and sys.argv[1]=='r35':
    p=ROOT+'work/index.html';s=open(p,encoding='utf-8').read();pa=json.load(open(ROOT+'patch_add.json',encoding='utf-8'))
    if '생존 카드 아래 줄 두 줄' in s: print('already')
    else:
        for a,b in R35:
            assert s.count(a)==1,s.count(a);s=s.replace(a,b);pa.append({"a":a,"b":b})
        open(p,'w',encoding='utf-8').write(s);open(ROOT+'patch_add.json','w',encoding='utf-8').write(json.dumps(pa,ensure_ascii=False));print('r35 ok')
