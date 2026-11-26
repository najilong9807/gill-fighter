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
