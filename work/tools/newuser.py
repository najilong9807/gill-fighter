# 새 사용자 첫 흐름: 빈 저장 → (프롤로그 대신 연습 바다) → 첫 판 끝 → 결과 → 홈. 0.5초마다 떠 있는 창 · 말풍선 기록
from playwright.sync_api import sync_playwright
import json,sys
L=sys.argv[1] if len(sys.argv)>1 else 'ko'
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
SNAP="(function(){var o=[];document.querySelectorAll('.overlay').forEach(function(e){if(!e.hidden&&e.id)o.push(e.id)});var c=document.querySelector('.coach');var bn=document.getElementById('banner');return [state,page,o.join(','),c?c.textContent.slice(0,20):'',bn&&!bn.hidden&&getComputedStyle(bn).opacity>.1?bn.textContent.slice(0,24):'']})()"
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:150]))
    pg.route(lambda u:'supabase' in u, lambda r:r.abort())
    pg.goto(D+'t_real.html?lang=%s&build=release'%L);pg.wait_for_timeout(1500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    log=[];last=None
    def watch(sec,tag):
        global last
        for i in range(int(sec*2)):
            s=ev(SNAP)
            if s!=last: log.append((tag,round(i/2,1),s));last=s
            pg.wait_for_timeout(500)
    pg.evaluate("window.__ev=function(c){return eval(c)}") if False else None
    watch(8,'boot')
    ev("if(TUT.on)tutEnd(true);1");watch(2,'tutdone')
    ev("for(var k=0;k<300;k++)update(1/30);endRun(false,false,null);1");watch(5,'over')
    ev("var b=document.querySelector('#over #homeBtn,#over .home,#overHome')||[].filter.call(document.querySelectorAll('#over button'),function(x){return /홈|Home|ホーム/.test(x.textContent)})[0];b?b.click():toHome();1");watch(14,'home1')
    ev("showTab('tank');1");watch(4,'tank')
    ev("showTab('home');1");watch(6,'home2')
    # 첫 화면이 프롤로그/게임 방법이면 넘기고 연습 바다 진행
    ev("try{document.querySelectorAll('.overlay').forEach(function(o){if(o.id==='prolog'||o.id==='onb')o.hidden=true})}catch(e){}1") if False else None
    print('\n'.join(str(x) for x in log));print('errs',errs)
    b.close()
