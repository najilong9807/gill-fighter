cd /tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w
L=regq_logs; mkdir -p $L; : > $L/_done
run(){ n=$1; shift; python3 "$@" > $L/$n.log 2>&1; echo "done $n $?" >> $L/_done; }
for t in reltest qtest endtest cltest langt abyt svlb shopt newstest; do run $t $t.py & done
run hangul hangul.py & run more4 more4.py ko,en,ja & run more5 more5.py ko,en,ja & run newuser newuser.py & run attnoti attnoti.py & run monkey monkey.py now,2026-11-25 ko & run nftest nftest.py &
wait
echo ALL >> $L/_done
