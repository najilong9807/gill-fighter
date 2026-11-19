# 21일 마을 그림 넣기: 받은 그림 폴더 → svart/cb_<id>_<단계>.webp + cityart.js 의 CITY_ART 자동 채우기
# 쓰는 법(저장소 맨 위에서): python3 work/city_src/art_import.py <그림폴더> [--dry]
#   파일 이름: <id>_<단계>.png  예) quarry_1.png · quarry_10.png · hall_5.png · zR0_3.png · d_fount_1.png
#   - 배경이 투명이 아니면 네 모서리 색과 비슷한 바깥 배경을 지움(흰 · 단색 배경용, 복잡한 배경은 먼저 배경 지우기)
#   - 투명 여백을 잘라 아래 끝 = 땅 마름모 아래 꼭짓점이 되게 함
#   - 폭: 1칸 256 · 2칸 448 · 3칸 640 (화면 2배 기준)
import sys,os,re,glob
from PIL import Image
ROOT=os.path.dirname(os.path.abspath(__file__))
REPO=os.path.abspath(os.path.join(ROOT,'..','..'))
def size_of(i):
    if i in ('hall','palace'):return 3
    if i=='pump' or i.startswith('z'):return 1
    return 2
def clear_bg(im,tol=28):
    im=im.convert('RGBA');px=im.load();w,h=im.size
    if any(px[x,y][3]<250 for x,y in [(0,0),(w-1,0),(0,h-1),(w-1,h-1)]):return im  # 이미 투명
    from collections import deque
    seen=bytearray(w*h);q=deque()
    for x,y in [(0,0),(w-1,0),(0,h-1),(w-1,h-1)]:q.append((x,y))
    ref=[px[x,y] for x,y in [(0,0),(w-1,0),(0,h-1),(w-1,h-1)]]
    def near(c):return any(abs(c[0]-r[0])+abs(c[1]-r[1])+abs(c[2]-r[2])<tol*3 for r in ref)
    while q:
        x,y=q.popleft();i=y*w+x
        if x<0 or y<0 or x>=w or y>=h or seen[i]:continue
        seen[i]=1;c=px[x,y]
        if not near(c):continue
        px[x,y]=(c[0],c[1],c[2],0);q.extend([(x+1,y),(x-1,y),(x,y+1),(x,y-1)])
    return im
def main():
    a=[x for x in sys.argv[1:] if not x.startswith('--')];dry='--dry' in sys.argv
    if not a:sys.exit(__doc__ if __doc__ else '그림 폴더를 주세요')
    got={}
    for f in sorted(glob.glob(os.path.join(a[0],'*.png'))+glob.glob(os.path.join(a[0],'*.webp'))):
        m=re.match(r'^(.+)_(\d+)$',os.path.splitext(os.path.basename(f))[0])
        if not m:print('이름 규칙 아님, 건너뜀:',f);continue
        i,t=m.group(1),int(m.group(2))
        im=clear_bg(Image.open(f));bb=im.getchannel('A').point(lambda v:255 if v>16 else 0).getbbox()
        if not bb:print('빈 그림:',f);continue
        im=im.crop(bb);W=256*{1:1,2:1.75,3:2.5}[size_of(i)];W=int(W)
        if im.width!=W:im=im.resize((W,max(1,round(im.height*W/im.width))),Image.LANCZOS)
        out=os.path.join(REPO,'svart','cb_%s_%d.webp'%(i,t))
        if not dry:im.save(out,'WEBP',quality=86,method=6)
        got.setdefault(i,[]).append(t);print('✓',os.path.basename(f),'→',os.path.relpath(out,REPO),im.size)
    if not got:return
    js=os.path.join(ROOT,'cityart.js');s=open(js,encoding='utf-8').read()
    m=re.search(r'var CITY_ART=\{([\s\S]*?)\n\};',s);old={}
    for k,v in re.findall(r"\s*'?([\w]+)'?:(\{[^}]*\})",m.group(1)):old[k]=v
    for i,ts in got.items():
        prev=re.search(r't:\[([\d,]*)\]',old.get(i,'')) ;keep=[int(x) for x in prev.group(1).split(',') if x] if prev else []
        ts=sorted(set(keep+ts));extra=re.sub(r't:\[[\d,]*\],?','',old.get(i,'{}')[1:-1]).strip(',')
        old[i]='{t:['+','.join(map(str,ts))+']'+(','+extra if extra else '')+'}'
    # 구역 집: zR0 처럼 0번만 그렸으면 색 다른 1 · 2번도 같은 그림을 씀(a)
    for i in list(old):
        m2=re.match(r'^z([RCI])0$',i)
        if m2:
            tt=re.search(r't:\[([\d,]*)\]',old[i]).group(1)
            for v in '12':
                j='z'+m2.group(1)+v
                if j not in got: old[j]="{t:["+tt+"],a:'"+i+"'}"
    body='\n'+',\n'.join(" %s:%s"%(k if re.match(r'^[A-Za-z_]\w*$',k) else "'%s'"%k,old[k]) for k in sorted(old))
    s=s[:m.start()]+'var CITY_ART={'+body+'\n};'+s[m.end():]
    if not dry:open(js,'w',encoding='utf-8').write(s)
    print('CITY_ART',len(old),'개 · 다음: cd work/city_src && python3 build.py && cp city.html ../city.html && cd ../.. && python3 work/city_src/to_patch.py')
main()
