# store_meta.py 의 build · notes · submit 단계를 가짜 ASC로 시험 (네트워크 없음)
import sys,json,os,re,importlib.util,collections
def load(env):
  for k in ['DRY','SUBMIT_OK','STEPS','STORE_VERSION']:os.environ.pop(k,None)
  os.environ.update(APP_STORE_CONNECT_PRIVATE_KEY='x',STORE_VERSION='1.1.14',STEPS='build,notes,submit',**env)
  spec=importlib.util.spec_from_file_location('sm','/home/claude/gill-fighter/store_meta.py');sm=importlib.util.module_from_spec(spec);spec.loader.exec_module(sm);return sm
class R:
  def __init__(s,c,j=None):s.status_code=c;s._j=j;s.text=json.dumps(j) if j is not None else ''
  def json(s):return s._j
class S:
  def __init__(s,sm):
    s.sm=sm;s.calls=collections.Counter();s.writes=[];s.build=None;s.notes=None;s.sub=None;s.items=[];s.submitted=False
  def request(s,m,url,headers=None,data=None,timeout=None):
    p=url.replace(s.sm.B,'').split('?')[0];q=url.split('?')[1] if '?' in url else ''
    s.calls[m+' '+p]+=1;b=json.loads(data) if data else None
    if m!='GET':s.writes.append(m+' '+p)
    if m=='GET' and p.endswith('/appStoreVersions'):return R(200,{'data':[{'id':'v114','attributes':{'versionString':'1.1.14','appStoreState':'PREPARE_FOR_SUBMISSION'}}]})
    if m=='GET' and p=='builds':
      assert 'preReleaseVersion.version%s'%'' or True
      return R(200,{'data':[{'id':'b153','attributes':{'version':'153','expired':False}},{'id':'b152','attributes':{'version':'152','expired':False}}]})
    if p=='appStoreVersions/v114/relationships/build':
      if m=='GET':return R(200,{'data':{'type':'builds','id':s.build} if s.build else None})
      s.build=b['data']['id'];return R(204)
    if m=='GET' and p=='appStoreVersions/v114/appStoreReviewDetail':return R(200,{'data':{'id':'rd1','attributes':{'notes':s.notes or 'old'}}})
    if m=='PATCH' and p=='appStoreReviewDetails/rd1':s.notes=b['data']['attributes']['notes'];return R(200,{})
    if m=='GET' and p=='reviewSubmissions':return R(200,{'data':[{'id':s.sub}] if s.sub else []})
    if m=='POST' and p=='reviewSubmissions':s.sub='rs1';return R(201,{'data':{'id':'rs1'}})
    if m=='GET' and p=='reviewSubmissions/rs1/items':return R(200,{'data':s.items})
    if m=='POST' and p=='reviewSubmissionItems':s.items.append({'relationships':{'appStoreVersion':{'data':{'id':b['data']['relationships']['appStoreVersion']['data']['id']}}}});return R(201,{'data':{'id':'it1'}})
    if m=='PATCH' and p=='reviewSubmissions/rs1':s.submitted=b['data']['attributes'].get('submitted');return R(200,{})
    return R(404,{'err':p})
def run(label,env,pre=None):
  sm=load(env);s=S(sm)
  if pre:pre(s)
  sm.Api.token=lambda self:'t';orig=sm.Api.__init__;sm.Api.__init__=lambda self,session=None:orig(self,s);sm.time.sleep=lambda x:None
  import io,contextlib;buf=io.StringIO()
  with contextlib.redirect_stdout(buf):sm.main()
  print('==',label,'| writes',s.writes,'| build',s.build,'| notes',len(s.notes or ''),'| submitted',s.submitted)
  return s
ok=True
a=run('DRY=1',{'DRY':'1','SUBMIT_OK':'1.1.14'});ok&=a.writes==[] and not a.submitted
b=run('DRY=0 no lock',{'DRY':'0'});ok&=b.build=='b153' and b.notes and not b.submitted and 'POST reviewSubmissions' not in b.writes
c=run('DRY=0 wrong lock',{'DRY':'0','SUBMIT_OK':'1.1.13'});ok&=not c.submitted
d=run('DRY=0 SUBMIT_OK=1.1.14',{'DRY':'0','SUBMIT_OK':'1.1.14'});ok&=d.submitted is True and d.build=='b153'
e=run('rerun same (idempotent)',{'DRY':'0'},pre=lambda s:(setattr(s,'build','b153'),setattr(s,'notes',open('/home/claude/gill-fighter/store/review_notes_1114.txt',encoding='utf-8').read().strip())));ok&=e.writes==[]
print('ALL OK' if ok else 'FAIL')
