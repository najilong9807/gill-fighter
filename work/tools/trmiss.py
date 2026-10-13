from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
K=json.load(open('keys.json'))
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page()
    pg.route(lambda u:'supabase' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=ja&build=release');pg.wait_for_timeout(2500)
    r=pg.evaluate("K=>__ev('(function(K){var mj=[],me=[];K.forEach(function(k){if(TRJ[k]===undefined)mj.push(k);if(TRT[k]===undefined)me.push(k)});return [mj,me]})')(K)",K)
    json.dump(r,open('miss.json','w'),ensure_ascii=False,indent=0)
    print('missing ja',len(r[0]),'missing en',len(r[1]))
    b.close()
