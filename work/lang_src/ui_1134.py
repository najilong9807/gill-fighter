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
