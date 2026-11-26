import sys,glob
from PIL import Image
fs=sorted(glob.glob(sys.argv[1]+'/*.png'));ims=[Image.open(f).convert('RGB').resize((222,480)) for f in fs];W=Image.new('RGB',(222*len(ims),480));[W.paste(im,(i*222,0)) for i,im in enumerate(ims)];W.save(sys.argv[2]);print(fs)
