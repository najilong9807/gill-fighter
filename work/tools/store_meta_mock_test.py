import sys,json,os,re,importlib.util,collections
os.environ.update(APP_STORE_CONNECT_PRIVATE_KEY='x',DRY=sys.argv[1] if len(sys.argv)>1 else '0')
spec=importlib.util.spec_from_file_location('sm','/home/claude/gill-fighter/store_meta.py');sm=importlib.util.module_from_spec(spec)
import subprocess;subprocess.run=lambda *a,**k:None
spec.loader.exec_module(sm)
LOC="ar-SA ca cs da de-DE el en-AU en-CA en-GB en-US es-ES es-MX fi fr-CA fr-FR he hi hr hu id it ja ko ms nl-NL no pl pt-BR pt-PT ro ru sk sv th tr uk vi zh-Hans zh-Hant".split()
class R:
  def __init__(s,c,j=None):s.status_code=c;s._j=j;s.text=json.dumps(j) if j is not None else ''
  def json(s):return s._j
class S:
  def __init__(s):
    s.calls=collections.Counter();s.versions=[{'id':'v112','attributes':{'versionString':'1.1.12','appStoreState':'READY_FOR_SALE'}}]
    s.locs={};s.sets={};s.shots={};s.n=0;s.wn={};s.order={}
  def request(s,m,url,headers=None,data=None,timeout=None):
    p=url.replace(sm.B,'').split('?')[0];s.calls[m+' '+re.sub(r'/[^/]*\d[^/]*','/{id}',p)]+=1
    b=json.loads(data) if data and m!='PUT' else None
    if m=='PUT': return R(200)
    if m=='GET' and p.endswith('/appStoreVersions'):return R(200,{'data':s.versions})
    if m=='POST' and p=='appStoreVersions':
      v={'id':'v113','attributes':{'versionString':'1.1.13','appStoreState':'PREPARE_FOR_SUBMISSION'}};s.versions.append(v)
      s.locs={l:{'id':'L'+l,'attributes':{'locale':l,'whatsNew':None}} for l in LOC}
      for l in ['ko','en-US','ja']:
        for d in ['APP_IPHONE_67','APP_IPHONE_65']+(['APP_IPAD_PRO_3GEN_129'] if l!='ja' else []):
          sid='S'+l+d;s.sets[sid]=(l,d);s.shots[sid]=['old%d'%i+sid for i in range(6)]
      return R(201,{'data':v})
    if m=='GET' and p.endswith('/appStoreVersionLocalizations'):return R(200,{'data':list(s.locs.values())})
    if m=='PATCH' and p.startswith('appStoreVersionLocalizations/'):
      lid=p.split('/')[1];s.wn[lid]=b['data']['attributes']['whatsNew'];return R(200,{})
    if m=='GET' and p.endswith('/appScreenshotSets'):
      lid=p.split('/')[1][1:];return R(200,{'data':[{'id':k,'attributes':{'screenshotDisplayType':v[1]}} for k,v in s.sets.items() if v[0]==lid]})
    if m=='POST' and p=='appScreenshotSets':
      lid=b['data']['relationships']['appStoreVersionLocalization']['data']['id'][1:];sid='S'+lid+b['data']['attributes']['screenshotDisplayType'];s.sets[sid]=(lid,b['data']['attributes']['screenshotDisplayType']);s.shots[sid]=[];return R(201,{'data':{'id':sid}})
    if m=='GET' and re.match(r'appScreenshotSets/[^/]+/appScreenshots$',p):return R(200,{'data':[{'id':x} for x in s.shots[p.split('/')[1]]]})
    if m=='DELETE':
      sid=p.split('/')[1]
      for k in s.shots: s.shots[k]=[x for x in s.shots[k] if x!=sid]
      return R(204)
    if m=='POST' and p=='appScreenshots':
      s.n+=1;sid='N%d'%s.n;st=b['data']['relationships']['appScreenshotSet']['data']['id'];s.shots[st].append(sid);sz=b['data']['attributes']['fileSize']
      return R(201,{'data':{'id':sid,'attributes':{'uploadOperations':[{'method':'PUT','url':'https://up/'+sid+'/a','offset':0,'length':sz//2,'requestHeaders':[{'name':'Content-Type','value':'image/jpeg'}]},{'method':'PUT','url':'https://up/'+sid+'/b','offset':sz//2,'length':sz-sz//2,'requestHeaders':[]}]}}})
    if m=='PATCH' and p.startswith('appScreenshots/'):return R(200,{})
    if m=='GET' and p.startswith('appScreenshots/'):return R(200,{'data':{'attributes':{'assetDeliveryState':{'state':'COMPLETE'}}}})
    if m=='PATCH' and p.endswith('/relationships/appScreenshots'):s.order[p.split('/')[1]]=[x['id'] for x in b['data']];return R(204)
    if m=='GET' and p.endswith('/gameCenterDetail'):return R(200,{'data':{'id':'gc1'}})
    if m=='GET' and p.endswith('/gameCenterLeaderboards'):return R(200,{'data':[{'id':'1','attributes':{'vendorIdentifier':'gd_camp','referenceName':'camp','scoreRangeStart':'0','scoreRangeEnd':'10000'}},{'id':'2','attributes':{'vendorIdentifier':'gd_surv','referenceName':'surv','scoreRangeStart':None,'scoreRangeEnd':None}}]})
    return R(404,{'err':p})
s=S()
sm.Api.token=lambda self:'t'
orig=sm.Api.__init__
sm.Api.__init__=lambda self,session=None:orig(self,s)
sm.time.sleep=lambda x:None
sm.main()
print(dict(s.calls))
print('whatsnew set',len(s.wn),'order sets',len(s.order),'shots per set',{k:len(v) for k,v in s.shots.items()})
