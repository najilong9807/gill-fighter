# 소스 묶음 만들기: gill-fighter/{fishgame,release,tools}
S=/tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad;O=$S/out;TAG=$1
rm -rf $O;mkdir -p $O/gill-fighter/tools
cp -r /home/claude/fishgame $O/gill-fighter/fishgame;mv $O/gill-fighter/fishgame/release $O/gill-fighter/release;rm -rf $O/gill-fighter/fishgame/i18n/__pycache__
cd $S/w && cp *.py *.js mkev.sh pack.sh base_www.html $O/gill-fighter/tools/ 2>/dev/null; cp -r ja $O/gill-fighter/tools/
cd $O && tar -czf $S/gill-fighter_1.1.11_소스_$TAG.tar.gz gill-fighter && ls -la $S/gill-fighter_1.1.11_소스_$TAG.tar.gz
