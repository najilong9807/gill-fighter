# 1.1.32 늑구 '진주 상한을 10만으로 했는데 상한을 아예 없애': 한 판 진주 상한(10만) · 판 결과 복구 상한(10만) 없앰. 대전(fair) 600 은 그대로
import json
W='work/index.html'
w=open(W,encoding='utf-8').read();p=json.load(open('patch_add.json',encoding='utf-8'))
def rep(a,b):
    global w
    assert w.count(a)==1,(a[:60],w.count(a));w=w.replace(a,b);p.append({'a':a,'b':b})
rep("return Math.min(Math.max(0,g)|0,fair()?600:100000)}","return fair()?Math.min(Math.max(0,g)|0,600):Math.max(0,Math.floor(g))} /* 1.1.32 늑구: 싱글 · 탐험 한 판 진주 상한 없앰 */")
rep("var g=!old&&r.g>0?Math.min(Math.floor(r.g),100000):0;","var g=!old&&r.g>0?Math.floor(r.g):0;")
open(W,'w',encoding='utf-8').write(w);json.dump(p,open('patch_add.json','w',encoding='utf-8'),ensure_ascii=False);print('patch_add',len(p))
