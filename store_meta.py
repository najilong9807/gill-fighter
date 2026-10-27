# 1.1.13 스토어 정보 자동 등록 (Codemagic에서 실행, 키 값은 출력하지 않음)
#   1) 1.1.13 버전이 없으면 만든다
#   2) 업데이트 문구(What's New) 39개 언어 → store/whatsnew_1113.json
#   3) 스크린샷 교체: 한·영·일 아이폰 6.9/6.5형 + 아이패드 13형 (1~5번 shots_1112, 6번 shots_1113) = 54장
#   5) [STEPS에 'listing'을 넣을 때만] 키워드·홍보 문구(1.1.13용)·부제목 → store/listing_1113.json (ko · en-* · ja, 종한이 확인한 뒤에만)
#   6) [STEPS에 'promo_now'를 넣을 때만] 지금 판매 중인 버전의 홍보 문구만 바꿈(심사 없이 바로 반영)
#   4) Game Center 순위표 점수 범위 보고 (바꾸지는 않음)
# 환경변수: DRY=1 이면 읽기만 하고 아무것도 바꾸지 않음. STEPS=version,whatsnew,shots,gc (기본: 전부)
import os, sys, time, json, hashlib, subprocess
subprocess.run([sys.executable, '-m', 'pip', 'install', '-q', 'pyjwt', 'cryptography', 'requests'], check=False)
import requests

APP = os.environ.get('APP_STORE_APPLE_ID', '6816376999')
VER = os.environ.get('STORE_VERSION', '1.1.13')
DRY = os.environ.get('DRY', '0') == '1'
STEPS = set((os.environ.get('STEPS') or 'version,whatsnew,shots,gc').split(','))  # listing · promo_now · build · notes · submit 는 넣을 때만
# submit 은 이중 잠금: DRY=0 이고 SUBMIT_OK=<버전> (예: SUBMIT_OK=1.1.14) 일 때만 실제로 심사에 제출
SUBMIT_OK = os.environ.get('SUBMIT_OK', '')
ROOT = os.path.dirname(os.path.abspath(__file__))
B = 'https://api.appstoreconnect.apple.com/v1/'

# 스크린샷: (ASC 언어, 화면 종류, 파일 접두사)
SHOT_SETS = [
    ('ko', 'APP_IPHONE_67', '69_ko'), ('ko', 'APP_IPHONE_65', '65_ko'), ('ko', 'APP_IPAD_PRO_3GEN_129', 'ipad13_ko'),
    ('en-US', 'APP_IPHONE_67', '69_en'), ('en-US', 'APP_IPHONE_65', '65_en'), ('en-US', 'APP_IPAD_PRO_3GEN_129', 'ipad13_en'),
    ('ja', 'APP_IPHONE_67', '69_ja'), ('ja', 'APP_IPHONE_65', '65_ja'), ('ja', 'APP_IPAD_PRO_3GEN_129', 'ipad13_ja'),
]
def shot_files(prefix):
    # 1.1.18부터: store/shots_<버전>/ 에 6장이 다 있으면 그 버전 것을 씀
    vd = os.path.join(ROOT, 'store', 'shots_%s' % VER.replace('.', ''))
    vf = [os.path.join(vd, '%s_%d.jpg' % (prefix, n)) for n in range(1, 7)]
    if all(os.path.exists(f) for f in vf): return vf
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
    wn = json.load(open(os.path.join(ROOT, 'store', 'whatsnew_%s.json' % VER.replace('.', '')), encoding='utf-8'))  # 버전별 파일 (1.1.14 → whatsnew_1114.json)
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

# 1.1.18 앱 미리보기 영상: store/previews_<버전>/preview_<언어>.mp4 (886x1920, 15~30초) → 아이폰 6.9 · 6.5 칸
PREV_SETS = [('ko', 'ko'), ('en-US', 'en'), ('ja', 'ja')]
PREV_TYPES = ['IPHONE_67', 'IPHONE_65']
def step_previews(api, vid):
    locs = localizations(api, vid)
    d = os.path.join(ROOT, 'store', 'previews_%s' % VER.replace('.', ''))
    pend = []
    for loc, lg in PREV_SETS:
        f = os.path.join(d, 'preview_%s.mp4' % lg)
        if not os.path.exists(f): raise RuntimeError('missing ' + f)
        if loc not in locs: log('WARN locale missing in ASC', loc); continue
        lid = locs[loc]['id']
        sets = {x['attributes']['previewType']: x for x in api.all('appStoreVersionLocalizations/%s/appPreviewSets?limit=50' % lid)}
        for pt in PREV_TYPES:
            old = []
            if pt in sets:
                set_id = sets[pt]['id']; old = [x['id'] for x in api.all('appPreviewSets/%s/appPreviews?limit=10' % set_id)]
            else:
                set_id = None
            same = False
            if set_id and len(old) == 1:
                try:
                    at = api.get('appPreviews/%s' % old[0])['data']['attributes']
                    same = (at.get('sourceFileChecksum') or '') == hashlib.md5(open(f, 'rb').read()).hexdigest() and ((at.get('videoDeliveryState') or {}).get('state')) != 'FAILED'
                except Exception: same = False
            log('PREVIEW', loc, pt, 'old', len(old), 'new 1', 'SAME-skip' if same else '')
            if DRY or same: continue
            if not set_id:
                set_id = api.req('POST', 'appPreviewSets', {'data': {'type': 'appPreviewSets', 'attributes': {'previewType': pt},
                         'relationships': {'appStoreVersionLocalization': {'data': {'type': 'appStoreVersionLocalizations', 'id': lid}}}}})['data']['id']
            for pid in old: api.req('DELETE', 'appPreviews/%s' % pid)
            data = open(f, 'rb').read(); name = os.path.basename(f)
            j = api.req('POST', 'appPreviews', {'data': {'type': 'appPreviews', 'attributes': {'fileName': name, 'fileSize': len(data), 'mimeType': 'video/mp4', 'previewFrameTimeCode': '00:00:02:00'},
                    'relationships': {'appPreviewSet': {'data': {'type': 'appPreviewSets', 'id': set_id}}}}})
            pid = j['data']['id']
            for op in j['data']['attributes'].get('uploadOperations') or []:
                h = {x['name']: x['value'] for x in op.get('requestHeaders') or []}
                chunk = data[op['offset']:op['offset'] + op['length']]
                for attempt in range(4):
                    r = api.s.request(op.get('method', 'PUT'), op['url'], headers=h, data=chunk, timeout=300)
                    if r.status_code < 300: break
                    time.sleep(3)
                else:
                    raise RuntimeError('preview upload part failed %s %d' % (name, r.status_code))
            api.req('PATCH', 'appPreviews/%s' % pid, {'data': {'type': 'appPreviews', 'id': pid,
                    'attributes': {'uploaded': True, 'sourceFileChecksum': hashlib.md5(data).hexdigest()}}})
            pend.append((loc, pt, pid)); log('  preview uploaded', loc, pt)
    t0 = time.time(); left = list(pend)
    while left and time.time() - t0 < 600:
        for q in list(left):
            st = ((api.get('appPreviews/%s' % q[2])['data']['attributes'].get('videoDeliveryState') or {}).get('state'))
            if st == 'COMPLETE': left.remove(q); log('  preview ready', q[0], q[1])
            elif st == 'FAILED': raise RuntimeError('preview processing failed %s %s' % (q[0], q[1]))
        if left: time.sleep(8)
    log('PREVIEWS done', len(pend) - len(left), '/', len(pend), 'ready' + ('' if not left else ' (rest still processing at Apple)'))

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
        same = False
        if set_id and len(old) == len(files):
            try:
                have = [((api.get('appScreenshots/%s' % x)['data']['attributes'].get('sourceFileChecksum')) or '') for x in old]
                want = [hashlib.md5(open(f, 'rb').read()).hexdigest() for f in files]
                same = have == want
            except Exception: same = False
        log('SHOTS', loc, dtype, 'old', len(old), 'new', len(files), 'SAME-skip' if same else '')
        if DRY or same: continue
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

def listing_text(lt, loc):
    return lt.get(loc) or (lt.get('en-US') if loc.startswith('en-') else None)

def step_listing(api, vid):
    lt = json.load(open(os.path.join(ROOT, 'store', 'listing_1113.json'), encoding='utf-8'))
    locs = localizations(api, vid); done = 0
    for loc, l in sorted(locs.items()):
        t = listing_text(lt, loc)
        if not t: continue
        a = l['attributes']; attrs = {}
        if t.get('kw') and (a.get('keywords') or '') != t['kw']: attrs['keywords'] = t['kw']
        if t.get('promo_1113') and (a.get('promotionalText') or '') != t['promo_1113']: attrs['promotionalText'] = t['promo_1113']
        if not attrs: continue
        log('LISTING', loc, sorted(attrs))
        if DRY: continue
        api.req('PATCH', 'appStoreVersionLocalizations/%s' % l['id'], {'data': {'type': 'appStoreVersionLocalizations', 'id': l['id'], 'attributes': attrs}}); done += 1
    # 부제목은 버전이 아니라 앱 정보(appInfo) 쪽
    try:
        infos = api.all('apps/%s/appInfos?limit=10' % APP)
    except Exception as e:
        log('APPINFO error', str(e)[:200]); infos = []
    for info in infos:
        st = info['attributes'].get('appStoreState') or info['attributes'].get('state') or ''
        if st in ('READY_FOR_SALE',): continue  # 판매 중인 쪽은 못 바꿈, 준비 중인 appInfo만
        for l in api.all('appInfos/%s/appInfoLocalizations?limit=50' % info['id']):
            loc = l['attributes']['locale']; t = listing_text(lt, loc)
            if not t or not t.get('sub') or (l['attributes'].get('subtitle') or '') == t['sub']: continue
            log('SUBTITLE', loc, info['id'], st)
            if DRY: continue
            api.req('PATCH', 'appInfoLocalizations/%s' % l['id'], {'data': {'type': 'appInfoLocalizations', 'id': l['id'], 'attributes': {'subtitle': t['sub']}}}); done += 1
    log('LISTING updated', done)

def step_promo_now(api):
    lt = json.load(open(os.path.join(ROOT, 'store', 'listing_1113.json'), encoding='utf-8'))
    live = [v for v in api.all('apps/%s/appStoreVersions?filter[platform]=IOS&limit=50' % APP) if (v['attributes'].get('appStoreState') or '') == 'READY_FOR_SALE']
    if not live: log('PROMO no live version'); return
    locs = localizations(api, live[0]['id']); done = 0
    for loc, l in sorted(locs.items()):
        t = listing_text(lt, loc)
        if not t or not t.get('promo') or (l['attributes'].get('promotionalText') or '') == t['promo']: continue
        log('PROMO', loc, len(t['promo']))
        if DRY: continue
        api.req('PATCH', 'appStoreVersionLocalizations/%s' % l['id'], {'data': {'type': 'appStoreVersionLocalizations', 'id': l['id'], 'attributes': {'promotionalText': t['promo']}}}); done += 1
    log('PROMO updated', done)

def step_build(api, v):
    """그 버전 번호로 올라온 빌드 중 처리 끝난(VALID) 가장 최근 것을 스토어 버전에 붙인다"""
    bs = api.all('builds?filter[app]=%s&filter[preReleaseVersion.version]=%s&filter[processingState]=VALID&sort=-uploadedDate&limit=20' % (APP, VER))
    bs = [b for b in bs if not b['attributes'].get('expired')]
    if not bs: log('BUILD none VALID for', VER); return None
    b = bs[0]; num = b['attributes'].get('version')
    cur = (api.get('appStoreVersions/%s/relationships/build' % v['id']).get('data') or {}).get('id')
    if cur == b['id']: log('BUILD already attached', num); return b
    log('BUILD attach', num, '(was %s)' % (cur or 'none'))
    if DRY: return b
    api.req('PATCH', 'appStoreVersions/%s/relationships/build' % v['id'], {'data': {'type': 'builds', 'id': b['id']}})
    return b

def step_notes(api, v):
    """store/review_notes_<버전>.txt 가 있으면 심사 메모로 넣는다"""
    f = os.path.join(ROOT, 'store', 'review_notes_%s.txt' % VER.replace('.', ''))
    if not os.path.exists(f): log('NOTES file missing', os.path.basename(f), '-> skip'); return
    txt = open(f, encoding='utf-8').read().strip()[:4000]
    d = api.get('appStoreVersions/%s/appStoreReviewDetail' % v['id']).get('data')
    if d and (d['attributes'].get('notes') or '').strip() == txt: log('NOTES same'); return
    log('NOTES set', len(txt), 'chars')
    if DRY: return
    if d:
        api.req('PATCH', 'appStoreReviewDetails/%s' % d['id'], {'data': {'type': 'appStoreReviewDetails', 'id': d['id'], 'attributes': {'notes': txt}}})
    else:
        api.req('POST', 'appStoreReviewDetails', {'data': {'type': 'appStoreReviewDetails', 'attributes': {'notes': txt},
                 'relationships': {'appStoreVersion': {'data': {'type': 'appStoreVersions', 'id': v['id']}}}}})

def step_submit(api, v):
    """심사 제출 (reviewSubmissions). 빌드가 붙어 있어야 하고, DRY=0 + SUBMIT_OK=<버전> 일 때만 실제 제출"""
    cur = (api.get('appStoreVersions/%s/relationships/build' % v['id']).get('data') or {}).get('id')
    if not cur: log('SUBMIT stop: no build attached'); return False
    live = DRY is False and SUBMIT_OK == VER
    if not live: log('SUBMIT check ok (build attached) · not submitting (DRY=%s, SUBMIT_OK=%r)' % (int(DRY), SUBMIT_OK)); return False
    subs = api.all('reviewSubmissions?filter[app]=%s&filter[platform]=IOS&filter[state]=READY_FOR_REVIEW&limit=10' % APP)
    if subs: sid = subs[0]['id']; log('SUBMIT reuse submission', sid)
    else:
        sid = api.req('POST', 'reviewSubmissions', {'data': {'type': 'reviewSubmissions', 'attributes': {'platform': 'IOS'},
                     'relationships': {'app': {'data': {'type': 'apps', 'id': APP}}}}})['data']['id']; log('SUBMIT new submission', sid)
    items = api.all('reviewSubmissions/%s/items?limit=20' % sid)
    has = any(((i.get('relationships') or {}).get('appStoreVersion') or {}).get('data', {}) .get('id') == v['id'] for i in items)
    if not has:
        api.req('POST', 'reviewSubmissionItems', {'data': {'type': 'reviewSubmissionItems',
                 'relationships': {'reviewSubmission': {'data': {'type': 'reviewSubmissions', 'id': sid}},
                                   'appStoreVersion': {'data': {'type': 'appStoreVersions', 'id': v['id']}}}}})
    api.req('PATCH', 'reviewSubmissions/%s' % sid, {'data': {'type': 'reviewSubmissions', 'id': sid, 'attributes': {'submitted': True}}})
    log('SUBMITTED', VER, 'submission', sid); return True

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
            if 'previews' in STEPS: step_previews(api, v['id'])
            if 'listing' in STEPS: step_listing(api, v['id'])
            if 'build' in STEPS: step_build(api, v)
            if 'notes' in STEPS: step_notes(api, v)
            if 'submit' in STEPS: step_submit(api, v)
    if 'gc' in STEPS: step_gc(api)
    if 'promo_now' in STEPS: step_promo_now(api)
    log('DONE')

if __name__ == '__main__':
    main()
