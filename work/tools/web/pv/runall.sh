#!/bin/bash
# 두 줄로 나눠 언어별 영상 만들기
cd "$(dirname "$0")"
run(){ for l in "$@"; do [ -f out/preview_$l.mp4 ] && continue; for t in 1 2; do node make.js $l > log_$l.txt 2>&1 && break; done; done; }
run ar ja ko en es vi ca cs da de el fi fr he hi hr hu > q1.txt 2>&1 &
run th id it ms nl no pl pt ro ru sk sv tr uk zhs zht > q2.txt 2>&1 &
wait
echo ALLDONE > done.txt
