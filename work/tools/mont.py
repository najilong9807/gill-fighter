import sys
from PIL import Image
out=sys.argv[1];fs=sys.argv[2:]
ims=[Image.open('W/'+f+'.png') for f in fs]
h=max(i.height for i in ims);W=sum(i.width for i in ims)
o=Image.new('RGB',(W,h),'white');x=0
for i in ims:o.paste(i,(x,0));x+=i.width
s=min(1,2400/W);o=o.resize((int(W*s),int(h*s)));o.save(out)
