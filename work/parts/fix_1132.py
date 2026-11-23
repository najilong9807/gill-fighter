# 1.1.32 재점검 수정 (11/23 늑구 '현재 시점에서 재점검해서 최적화 · 완성도 높이기')
# work/index.html 을 고치고 patch_add.json 도 맞춘다(빌드 체인 = app.zip + patch.json + patch_add.json)
import json
W='work/index.html'
w=open(W,encoding='utf-8').read();p=json.load(open('patch_add.json',encoding='utf-8'))
js=lambda o:json.dumps(o,ensure_ascii=False,separators=(',',':'))
def inplace(a,b):
    """1.1.31 블록 안을 고침: index.html 과, 그 글을 담은 patch_add 항목의 b 를 같이"""
    global w
    assert w.count(a)==1,(a[:60],w.count(a));w=w.replace(a,b);n=0
    for r in p:
        if a in r.get('b',''):r['b']=r['b'].replace(a,b);n+=1
    assert n==1,(a[:60],n)

# ① 잠금 글씨: 몇 판 했는지 세어 주기(· 1/3) + 대전 버튼 폭 안에서 두 줄까지(스페인어 등 긴 글이 싱글 버튼 위로 튀어나오던 것)
inplace("if(m)m.textContent=id==='frBtn'?'🔒':'🔒 '+T(K0);",
        "if(m)m.textContent=id==='frBtn'?'🔒':'🔒 '+T(K0)+' · '+Math.min(N-1,save.runs|0)+'/'+N;")
inplace(".mlk{display:none;font-style:normal;font-size:11px;line-height:1.2;margin-top:2px;opacity:.95;white-space:nowrap}",
        ".mlk{display:none;font-style:normal;font-size:11px;line-height:1.2;margin-top:2px;opacity:.95;white-space:nowrap}#mpBtn.mlocked .mlk{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;white-space:normal;overflow:hidden;max-width:100%;font-size:10.5px;word-break:keep-all}")

# 심해 탐험 · 심해 생존: 30개 언어에서 영어로 남던 '30 chapters' · 'Eat 14 fish → Boss …'
CH={'es':'{n} capítulos','vi':'{n} chương','zht':'{n} 章','zhs':'{n} 章','pt':'{n} capítulos','fr':'{n} chapitres','de':'{n} Kapitel','it':'{n} capitoli',
'nl':'{n} hoofdstukken','ru':'{n} глав','uk':'{n} розділів','pl':'{n} rozdziałów','tr':'{n} bölüm','id':'{n} bab','ms':'{n} bab','th':'{n} บท','hi':'{n} अध्याय',
'ar':'{n} فصلًا','he':'{n} פרקים','sv':'{n} kapitel','da':'{n} kapitler','no':'{n} kapitler','fi':'{n} lukua','cs':'{n} kapitol','sk':'{n} kapitol','hu':'{n} fejezet',
'ro':'{n} de capitole','hr':'{n} poglavlja','el':'{n} κεφάλαια','ca':'{n} capítols'}
assert len(CH)==30

blk=("/* ===== 1.1.32 재점검(11/23 늑구 '최적화 · 완성도') =====\n"
"   ① 대전 시작 보호: 1.1.30 기록 peerBig 19건 — 막 들어온 멸치가 5~10초 안에 컴퓨터 물고기에게 계속 먹힘(싱글엔 있는 시작 보호가 대전엔 없었음)\n"
"      → 대전도 시작하자마자 잠깐 안 먹힘(방울 표시 그대로): 20판 전 6초, 그 뒤 3초. 사람 상대 물기(netBite)도 invuln 을 보므로 같이 막힘\n"
"   ② 기록 보내기 겹침: crashSend 가 동시에 두 번 불리면 같은 기록을 두 번 보내고 다음 기록을 하나 버림(nb 287건 중 58건 겹침) → 한 번에 하나만, 보낸 것만 지움\n"
"   ③ '함께해 줘서 고마워요' 감사 선물(thx1111)은 10/12 이전에 시작한 사람만(thxRescue 와 같은 기준) — 새로 깐 사람에게 뜨던 것\n"
"   ④ 결과 창(싱글 · 심해 탐험)이 화면보다 길면 아래 버튼이 화면 밖으로 → 세로 화면에서 버튼 줄을 아래에 붙임, 키 작은 폰은 체험 꾸미기 칸 숨김\n"
"   ⑤ 안내 띠가 창이 닫힌 뒤에도 아래(.low)에 남아 홈 모드 버튼을 가리던 것 → 창이 닫히면 자리 다시 정함\n"
"   ⑥ 30개 언어: 심해 생존 '30 chapters', 심해 탐험 'Eat 14 fish → Boss …' 가 영어로 남던 것 */\n"
"try{(function(){\n"
"  /* ① */\n"
"  var srMG=startRun;startRun=function(){var r=srMG.apply(this,arguments);try{if(mode==='multi'&&P&&!P.surv)P.grace=(save.runs|0)<20?6:3}catch(e){}return r};\n"
"  /* ② */\n"
"  var csBusy=0;crashSend=function(){var C=window.Capacitor;if(!(C&&C.isNativePlatform&&C.isNativePlatform())&&location.search.indexOf('crtest')<0)return;if(csBusy)return;\n"
"    var q=save.crashQ||[];if(!q.length)return;var a=q[0];csBusy=1;var to=setTimeout(function(){csBusy=0},20000);\n"
"    lbReq('rpc/gf_crash_log',{p_pid:lbPid(),p_v:String(a.v||''),p_dev:crDev(),p_info:a}).then(function(){clearTimeout(to);csBusy=0;save.crashQ=(save.crashQ||[]).filter(function(x){return x!==a});persist();if(save.crashQ.length)setTimeout(crashSend,1500)}).catch(function(){clearTimeout(to);csBusy=0})};\n"
"  /* ③ */\n"
"  var ncTX=newsCheck;newsCheck=function(n){try{if(save.thx1111==null&&!(save.firstAt&&save.firstAt<THX_CUT)){save.thx1111=0;persist()}}catch(e){}return ncTX.apply(this,arguments)};\n"
"  /* ④ */\n"
"  var st=document.createElement('style');st.textContent='@media (max-aspect-ratio:4/5){#over .panel>.row,#campRes .crbtns{position:sticky;bottom:0;z-index:3;padding-top:10px;padding-bottom:calc(6px + env(safe-area-inset-bottom,0px));background:linear-gradient(180deg,rgba(245,236,221,0) 0,#F5ECDD 10px)}}@media (max-aspect-ratio:4/5) and (max-height:760px){#crTrial{display:none!important}}';document.head.appendChild(st);\n"
"  /* ⑤ */\n"
"  try{var bn=$('banner'),mo=new MutationObserver(function(){try{if(bn&&!bn.hidden&&bn.classList.contains('low')&&!banLow())bn.classList.remove('low')}catch(e){}});document.querySelectorAll('.overlay').forEach(function(o){if(o.id!=='banner')mo.observe(o,{attributes:true,attributeFilter:['hidden']})})}catch(e){}\n"
"  /* ⑥ */\n"
"  var CH="+js(CH)+";if(SUBL&&CH[SUBL]){svChN=function(){return CH[SUBL].replace('{n}',SV_CH.length-1)}}\n"
"  if(SUBL&&window.__subTx){var cgB=campGoalText;campGoalText=function(f,L){var t=cgB.apply(this,arguments);try{var m=/^(.*) → Boss (.+)$/.exec(t);if(m){var a=window.__subTx(m[1]);t=(a||m[1])+' → '+String(T('보스 ')).trim()+' '+m[2]}}catch(e){}return t}}\n"
"})()}catch(e){}\n")
A="if(window.claude&&window.claude.hot&&window.claude.hot.ready)window.claude.hot.ready(boot);else boot();"
assert w.count(A)==1;w=w.replace(A,blk+A);p.append({'a':A,'b':blk+A})
open(W,'w',encoding='utf-8').write(w);json.dump(p,open('patch_add.json','w',encoding='utf-8'),ensure_ascii=False);print('patch_add',len(p))
