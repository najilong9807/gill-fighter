import sys,os,glob,re,numpy as np
from PIL import Image
from collections import deque
S=os.path.dirname(os.path.abspath(__file__));SRC=S+'/raw';OUT=S+'/imp2'
def clear_bg(im,tol=28):
    im=im.convert('RGBA');a=np.array(im);h,w=a.shape[:2]
    if min(a[0,0,3],a[0,-1,3],a[-1,0,3],a[-1,-1,3])<250:return im
    ref=[a[0,0,:3],a[0,-1,:3],a[-1,0,:3],a[-1,-1,:3]].copy() if False else [a[y,x,:3].astype(int) for y,x in [(0,0),(0,w-1),(h-1,0),(h-1,w-1)]]
    rgb=a[:,:,:3].astype(int);near=np.zeros((h,w),bool)
    for r in ref:near|=np.abs(rgb-r).sum(2)<tol*3
    seen=np.zeros((h,w),bool);q=deque([(0,0),(0,w-1),(h-1,0),(h-1,w-1)])
    while q:
        y,x=q.popleft()
        if y<0 or x<0 or y>=h or x>=w or seen[y,x] or not near[y,x]:continue
        seen[y,x]=1;q.extend([(y+1,x),(y-1,x),(y,x+1),(y,x-1)])
    a[seen,3]=0;return Image.fromarray(a)
def tone(im,sat=.82,val=.9):
    a=np.array(im);al=a[:,:,3:];hsv=np.array(Image.fromarray(a[:,:,:3]).convert('HSV')).astype(float)
    hsv[:,:,1]*=sat;hsv[:,:,2]*=val
    rgb=np.array(Image.fromarray(hsv.clip(0,255).astype('uint8'),'HSV').convert('RGB'))
    # 바닷속 느낌으로 아주 살짝 푸르게
    rgb=(rgb*np.array([.97,.99,1.03])).clip(0,255).astype('uint8')
    return Image.fromarray(np.concatenate([rgb,al],2))
def hueshift(im,lo,hi,smin,shift,vmul=1.0,smul=1.0):
    a=np.array(im);al=a[:,:,3:];hsv=np.array(Image.fromarray(a[:,:,:3]).convert('HSV')).astype(int)
    H=hsv[:,:,0]*360//255;S2=hsv[:,:,1]/255
    m=((H>=lo)&(H<=hi) if lo<=hi else ((H>=lo)|(H<=hi)))&(S2>=smin)&(al[:,:,0]>0)
    hsv[:,:,0]=np.where(m,(hsv[:,:,0]+int(shift*255/360))%256,hsv[:,:,0])
    hsv[:,:,2]=np.where(m,(hsv[:,:,2]*vmul).clip(0,255),hsv[:,:,2]);hsv[:,:,1]=np.where(m,(hsv[:,:,1]*smul).clip(0,255),hsv[:,:,1])
    rgb=np.array(Image.fromarray(hsv.astype('uint8'),'HSV').convert('RGB'));return Image.fromarray(np.concatenate([rgb,al],2))
# 구역 색 바꾸기: (색 범위, 최소 채도, 돌릴 각도, 밝기, 채도)
VAR={'R':[(320,20,.25,-120,1.0,.85),(320,20,.25,150,.95,.62)],   # 분홍 벽 → 하늘 · 민트
     'C':[(150,200,.2,-150,1.0,.85),(150,200,.2,100,1.0,.9)],     # 청록 → 노랑초록 · 보라
     'I':[(5,30,.6,190,1.0,.8),(5,30,.6,-30,.95,.8)]}            # 주황 지붕 → 파랑 · 붉은 벽돌
for f in sorted(glob.glob(SRC+'/*.png')):
    n=os.path.splitext(os.path.basename(f))[0]
    im=tone(clear_bg(Image.open(f)));im.save(OUT+'/'+n+'.png')
    m=re.match(r'^z([RCI])0_(\d)$',n)
    if m:
        for v,(lo,hi,smin,sh,vm,sm) in enumerate(VAR[m.group(1)],1):
            if os.path.exists(SRC+'/z%s%d_%s.png'%(m.group(1),v,m.group(2))):continue  # 모양 다른 판이 있으면 색 바꾼 판은 안 만듦
            hueshift(im,lo,hi,smin,sh,vm,sm).save(OUT+'/z%s%d_%s.png'%(m.group(1),v,m.group(2)))
print(len(os.listdir(OUT)))
