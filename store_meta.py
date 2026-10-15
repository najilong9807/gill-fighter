# 1.1.13 스토어 정보 자동 등록 (Codemagic에서 실행, 키 값은 출력하지 않음)
#   1) 1.1.13 버전이 없으면 만든다
#   2) 업데이트 문구(What's New) 39개 언어 → store/whatsnew_1113.json
#   3) 스크린샷 교체: 한·영·일 아이폰 6.9/6.5형, 한국어 아이패드 13형 (1~5번 shots_1112, 6번 shots_1113)
#   4) Game Center 순위표 점수 범위 보고 (바꾸지는 않음)
# 환경변수: DRY=1 이면 읽기만 하고 아무것도 바꾸지 않음. STEPS=version,whatsnew,shots,gc (기본: 전부)
import os, sys, time, json, hashlib, subprocess
subprocess.run([sys.executable, '-m', 'pip', 'install', '-q', 'pyjwt', 'cryptography', 'requests'], check=False)
import requests

APP = os.environ.get('APP_STORE_APPLE_ID', '6816376999')
VER = os.environ.get('STORE_VERSION', '1.1.13')
DRY = os.environ.get('DRY', '0') == '1'
STEPS = set((os.environ.get('STEPS') or 'version,whatsnew,shots,gc').split(','))
ROOT = os.path.dirname(os.path.abspath(__file__))
B = 'https://api.appstoreconnect.apple.com/v1/'

# 스크린샷: (ASC 언어, 화면 종류, 파일 접두사)
SHOT_SETS = [
    ('ko', 'APP_IPHONE_67', '69_ko'), ('ko', 'APP_IPHONE_65', '65_ko'), ('ko', 'APP_IPAD_PRO_3GEN_129', 'ipad13_ko'),
    ('en-US', 'APP_IPHONE_67', '69_en'), ('en-US', 'APP_IPHONE_65', '65_en'),
    ('ja', 'APP_IPHONE_67', '69_ja'), ('ja', 'APP_IPHONE_65', '65_ja'),
]
def shot_files(prefix):
    out = []
    for n in range(1, 7):
        d = 'shots_1113' if n == 6 else 'shots_1112'
        out.append(os.path.join(ROOT, 'store', d, '%s_%d.jpg' % (prefix, n)))
    return out

class Api:
    def __init__(self, session=None):
        self.s = session or requests.Session()
        self._tok = None; self._exp = 0
    def token(self):
        if self._tok and time.time() < self._exp - 60: return self._tok
        import jwt
        kid = os.environ['APP_STORE_CONNECT_KEY_IDENTIFIER']; iss = os.environ['APP_STORE_CONNECT_ISSUER_ID']; pk = os.environ['APP_STORE_CONNECT_PRIVATE_KEY']
        self._exp = int(time.time()) + 1100
        self._tok = jwt.encode({'iss': iss, 'exp': self._exp, 'aud': 'appstoreconnect-v1'}, pk, algorithm='ES256', headers={'kid': kid, 'typ': 'JWT'})
        return self._tok
    def req(self, method, path, body=None, ok=(200, 201, 204)):
        url = path if path.startswith('http') else B + path
        for attempt in range(4):
            r = self.s.request(method, url, headers={'Authorization': 'Bearer ' + self.token(), 'Content-Type': 'application/json'},
                               data=json.dumps(body) if body is not None else None, timeout=90)
            if r.status_code in (429, 500, 502, 503, 504) and attempt < 3:
                time.sleep(3 * (attempt + 1)); continue
            break
        if r.status_code not in ok:
            msg = r.text[:600]
            raise RuntimeError('%s %s -> %d %s' % (method, url.split('?')[0].replace(B, ''), r.status_code, msg))
        return r.json() if r.text else {}
    def get(self, p): return self.req('GET', p)
    def all(self, p):
        out = []; nxt = p
        while nxt:
            j = self.get(nxt); out += j.get('data', []); nxt = (j.get('links') or {}).get('next')
        return out

def log(*a): print(*a, flush=True)

def find_version(api, create):
    vs = api.all('apps/%s/appStoreVersions?filter[platform]=IOS&limit=50' % APP)
    for v in vs:
        if v['attributes'].get('versionString') == VER:
            log('VERSION', VER, 'exists id', v['id'], 'state', v['attributes'].get('appStoreState') or v['attributes'].get('appVersionState'))
            return v
    if not create:
        log('VERSION', VER, 'missing'); return None
    if DRY:
        log('DRY: would create version', VER); return None
    j = api.req('POST', 'appStoreVersions', {'data': {'type': 'appStoreVersions', 'attributes': {'platform': 'IOS', 'versionString': VER},
            'relationships': {'app': {'data': {'type': 'apps', 'id': APP}}}}})
    log('VERSION', VER, 'created id', j['data']['id']); return j['data']

def localizations(api, vid):
    return {l['attributes']['locale']: l for l in api.all('appStoreVersions/%s/appStoreVersionLocalizations?limit=50' % vid)}

def step_whatsnew(api, vid):
    wn = json.load(open(os.path.join(ROOT, 'store', 'whatsnew_1113.json'), encoding='utf-8'))
    locs = localizations(api, vid)
    log('LOCALES in ASC', len(locs), sorted(locs))
    miss = [k for k in locs if k not in wn]
    if miss: log('WARN no text for', miss, '-> en-US text used')
    done = 0
    for loc, l in sorted(locs.items()):
        txt = wn.get(loc) or wn['en-US']
        if (l['attributes'].get('whatsNew') or '') == txt: continue
        if DRY: log('DRY: whatsNew', loc, len(txt)); continue
        api.req('PATCH', 'appStoreVersionLocalizations/%s' % l['id'], {'data': {'type': 'appStoreVersionLocalizations', 'id': l['id'], 'attributes': {'whatsNew': txt}}})
        done += 1
    log('WHATSNEW updated', done)

def upload_shot(api, set_id, path):
    data = open(path, 'rb').read(); name = os.path.basename(path)
    j = api.req('POST', 'appScreenshots', {'data': {'type': 'appScreenshots', 'attributes': {'fileName': name, 'fileSize': len(data)},
            'relationships': {'appScreenshotSet': {'data': {'type': 'appScreenshotSets', 'id': set_id}}}}})
    sid = j['data']['id']
    for op in j['data']['attributes'].get('uploadOperations') or []:
        h = {x['name']: x['value'] for x in op.get('requestHeaders') or []}
        chunk = data[op['offset']:op['offset'] + op['length']]
        for attempt in range(4):
            r = api.s.request(op.get('method', 'PUT'), op['url'], headers=h, data=chunk, timeout=120)
            if r.status_code < 300: break
            time.sleep(3)
        else:
            raise RuntimeError('upload part failed %s %d' % (name, r.status_code))
    api.req('PATCH', 'appScreenshots/%s' % sid, {'data': {'type': 'appScreenshots', 'id': sid,
            'attributes': {'uploaded': True, 'sourceFileChecksum': hashlib.md5(data).hexdigest()}}})
    return sid

def wait_done(api, ids, limit=240):
    t0 = time.time(); left = set(ids)
    while left and time.time() - t0 < limit:
        for sid in list(left):
            st = ((api.get('appScreenshots/%s' % sid)['data']['attributes'].get('assetDeliveryState') or {}).get('state'))
            if st == 'COMPLETE': left.discard(sid)
            elif st == 'FAILED': raise RuntimeError('screenshot processing failed ' + sid)
        if left: time.sleep(4)
    return not left

def step_shots(api, vid):
    locs = localizations(api, vid)
    for loc, dtype, prefix in SHOT_SETS:
        files = shot_files(prefix)
        lack = [f for f in files if not os.path.exists(f)]
        if lack: raise RuntimeError('missing files ' + ','.join(lack))
        if loc not in locs: log('WARN locale missing in ASC', loc); continue
        lid = locs[loc]['id']
        sets = {s['attributes']['screenshotDisplayType']: s for s in api.all('appStoreVersionLocalizations/%s/appScreenshotSets?limit=50' % lid)}
        old = []
        if dtype in sets:
            set_id = sets[dtype]['id']; old = [x['id'] for x in api.all('appScreenshotSets/%s/appScreenshots?limit=50' % set_id)]
        else:
            set_id = None
        log('SHOTS', loc, dtype, 'old', len(old), 'new', len(files))
        if DRY: continue
        if not set_id:
            set_id = api.req('POST', 'appScreenshotSets', {'data': {'type': 'appScreenshotSets', 'attributes': {'screenshotDisplayType': dtype},
                     'relationships': {'appStoreVersionLocalization': {'data': {'type': 'appStoreVersionLocalizations', 'id': lid}}}}})['data']['id']
        for sid in old:  # 이 버전(제출 전 초안)에 복사된 예전 스크린샷만 지운다
            api.req('DELETE', 'appScreenshots/%s' % sid)
        new = [upload_shot(api, set_id, f) for f in files]
        ok = wait_done(api, new)
        api.req('PATCH', 'appScreenshotSets/%s/relationships/appScreenshots' % set_id, {'data': [{'type': 'appScreenshots', 'id': i} for i in new]})
        log('  uploaded', len(new), 'processed' if ok else 'still processing')

def step_gc(api):
    try:
        gd = api.get('apps/%s/gameCenterDetail' % APP).get('data')
    except Exception as e:
        log('GC detail error', str(e)[:200]); return
    if not gd: log('GC no detail'); return
    for lb in api.all('gameCenterDetails/%s/gameCenterLeaderboards?limit=50' % gd['id']):
        a = lb['attributes']
        log('GC', a.get('vendorIdentifier'), '|', a.get('referenceName'), '| range', a.get('scoreRangeStart'), '~', a.get('scoreRangeEnd'),
            '| sort', a.get('scoreSortType'), '| fmt', a.get('defaultFormatter'), '| live', a.get('archived'))
    need = {'gd_camp': 29799, 'gd_surv': 20999}
    for lb in api.all('gameCenterDetails/%s/gameCenterLeaderboards?limit=50' % gd['id']):
        a = lb['attributes']; v = a.get('vendorIdentifier')
        if v in need:
            end = a.get('scoreRangeEnd')
            try: endn = int(end) if end not in (None, '') else None
            except: endn = None
            log('GC CHECK', v, 'need <=', need[v], 'range end', end, '->', 'OK' if endn is None or endn >= need[v] else 'TOO SMALL')

def main():
    if not os.environ.get('APP_STORE_CONNECT_PRIVATE_KEY'):
        log('no ASC key env; stop'); return
    api = Api()
    log('MODE', 'DRY' if DRY else 'WRITE', 'steps', sorted(STEPS))
    v = find_version(api, create='version' in STEPS)
    if v:
        st = v['attributes'].get('appStoreState') or ''
        if st in ('READY_FOR_SALE', 'PROCESSING_FOR_APP_STORE', 'PENDING_DEVELOPER_RELEASE', 'IN_REVIEW', 'WAITING_FOR_REVIEW'):
            log('version not editable (%s) -> skip text/shots' % st)
        else:
            if 'whatsnew' in STEPS: step_whatsnew(api, v['id'])
            if 'shots' in STEPS: step_shots(api, v['id'])
    if 'gc' in STEPS: step_gc(api)
    log('DONE')

if __name__ == '__main__':
    main()
