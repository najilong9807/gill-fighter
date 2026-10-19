# 동시접속 N명 서버 부하 시뮬 (1.1.14 코드의 실제 통신 규칙을 그대로 옮김)
#  - 앱이 켜져 있는 동안: 로비 연결 1개(실시간 접속자 수 · presence 'gf-lobby' 한 채널에 모두)
#  - 대전: 바다(shard)당 16명, 바다 6개까지(maxShard 6) — 6번째는 넘쳐도 계속 들어감
#  - 대전 중 내 상태: 사람 상대가 있으면 초당 3.5~7번(평균 5번) 그 바다 전원에게 broadcast
#  - 판 끝: 기록 RPC(바뀐 모드만) · 앱 나갈 때 백업(6시간 안 같은 내용이면 안 보냄) · 판 기록(처음 8판)
import random,math,json,sys
random.seed(7)
def run(N,arena_share=.35,session_min=12,maxShard=6,maxPer=16,hz=5.0,lobby='presence',label=''):
  arena=int(N*arena_share);other=N-arena
  # 바다 배치(코드 그대로: 1번부터 차례로, 16명 차면 다음, 6번째에서 멈춤)
  shards=[0]*maxShard
  for i in range(arena):
    k=0
    while k<maxShard-1 and shards[k]>=maxPer:k+=1
    shards[k]+=1
  conns=N # 앱 켜진 사람마다 웹소켓 1개(대전 중엔 같은 연결로 로비도)
  # 대전 broadcast: 보낸 1개 → 같은 바다 (n-1)명에게 전달. Supabase는 보낸 것 + 받은 것 모두 메시지로 셈
  a_in=sum(n*hz for n in shards if n>1)
  a_out=sum(n*hz*(n-1) for n in shards if n>1)
  # 로비 presence: 들어오고 나갈 때마다 diff가 로비 전원에게. 세션 길이로 초당 출입 수 계산(+대전 들어갈 때 바다 join/leave)
  churn=N/(session_min*60)*2            # 앱 켜기 + 끄기(뒤로 가기)
  if lobby=='presence':
    p_in=churn; p_out=churn*N
  else: # 대안: 서버가 30초마다 접속자 수 한 번만 보냄
    p_in=0; p_out=N/30
  runs_s=N/180.0                         # 3분에 한 판
  rpc=runs_s*1.3 + N/(session_min*60)*.6 + runs_s*.15   # 기록 · 백업 · 판 기록
  msgs=a_in+a_out+p_in+p_out
  month=msgs*3600*24*30*.35              # 하루 평균은 최고치의 35% 정도로 가정
  biggest=max(shards)
  return dict(label=label,N=N,arena=arena,shards=shards[:6],biggest=biggest,conns=conns,arena_msgs=round(a_in+a_out),lobby_msgs=round(p_in+p_out),msgs=round(msgs),rpc=round(rpc,1),
              month_msgs_M=round(month/1e6),cost_msgs=round(max(0,month/1e6-5)*2.5),cost_conn=round(max(0,conns-500)/1000*10))
rows=[]
for N in [100,1000,10000]:
  rows.append(run(N,label='지금 코드'))
rows.append(run(10000,maxShard=10**6,label='① 바다 수 제한 풀기'))
rows.append(run(10000,maxShard=10**6,lobby='count',label='①+② 로비는 숫자만'))
rows.append(run(10000,maxShard=10**6,lobby='count',maxPer=10,hz=3,label='①+②+③ 바다 10명 · 초당 3번'))
print(json.dumps(rows,ensure_ascii=False,indent=0))
