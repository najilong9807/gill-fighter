# 게임 안 소식 한 줄(33개 언어) + 스토어 새 소식(39개 로캘) + 심사 메모
import json
NV={'ko':'이제 33개 언어로 즐겨요 · 繁體中文 · 简体中文 · Deutsch · Français · Português 등 (설정 › 언어)',
'en':'Now in 33 languages, including Chinese, German, French and Portuguese (Settings › Language)',
'ja':'33言語に対応しました・中国語・ドイツ語・フランス語・ポルトガル語など（設定 › 言語）',
'es':'Ahora en 33 idiomas, como chino, alemán, francés y portugués (Ajustes › Idioma)',
'vi':'Giờ đã có 33 ngôn ngữ, gồm tiếng Trung, Đức, Pháp và Bồ Đào Nha (Cài đặt › Ngôn ngữ)',
'zht':'現在支援 33 種語言，包括繁體中文、簡體中文、德文、法文等（設定 › 語言）',
'zhs':'现在支持 33 种语言，包括简体中文、繁体中文、德语、法语等（设置 › 语言）',
'pt':'Agora em 33 idiomas, incluindo português, chinês, alemão e francês (Ajustes › Idioma)',
'fr':'Désormais en 33 langues, dont le français, le chinois, l’allemand et le portugais (Réglages › Langue)',
'de':'Jetzt in 33 Sprachen, darunter Deutsch, Chinesisch, Französisch und Portugiesisch (Einstellungen › Sprache)',
'it':'Ora in 33 lingue, tra cui italiano, cinese, tedesco e francese (Impostazioni › Lingua)',
'nl':'Nu in 33 talen, waaronder Nederlands, Chinees, Duits en Frans (Instellingen › Taal)',
'ru':'Теперь на 33 языках, включая русский, китайский, немецкий и французский (Настройки › Язык)',
'uk':'Тепер 33 мовами, зокрема українською, китайською, німецькою та французькою (Налаштування › Мова)',
'pl':'Teraz w 33 językach, w tym po polsku, chińsku, niemiecku i francusku (Ustawienia › Język)',
'tr':'Artık Türkçe, Çince, Almanca ve Fransızca dahil 33 dilde (Ayarlar › Dil)',
'id':'Kini tersedia dalam 33 bahasa, termasuk Indonesia, Mandarin, Jerman, dan Prancis (Pengaturan › Bahasa)',
'ms':'Kini dalam 33 bahasa, termasuk Melayu, Cina, Jerman dan Perancis (Tetapan › Bahasa)',
'th':'รองรับแล้ว 33 ภาษา รวมถึงไทย จีน เยอรมัน และฝรั่งเศส (ตั้งค่า › ภาษา)',
'hi':'अब 33 भाषाओं में, जिनमें हिन्दी, चीनी, जर्मन और फ़्रेंच शामिल हैं (सेटिंग्स › भाषा)',
'ar':'متوفرة الآن بـ 33 لغة، منها العربية والصينية والألمانية والفرنسية (الإعدادات › اللغة)',
'he':'עכשיו ב-33 שפות, כולל עברית, סינית, גרמנית וצרפתית (הגדרות › שפה)',
'sv':'Nu på 33 språk, bland annat svenska, kinesiska, tyska och franska (Inställningar › Språk)',
'da':'Nu på 33 sprog, bl.a. dansk, kinesisk, tysk og fransk (Indstillinger › Sprog)',
'no':'Nå på 33 språk, blant annet norsk, kinesisk, tysk og fransk (Innstillinger › Språk)',
'fi':'Nyt 33 kielellä, mm. suomeksi, kiinaksi, saksaksi ja ranskaksi (Asetukset › Kieli)',
'cs':'Nově v 33 jazycích včetně češtiny, čínštiny, němčiny a francouzštiny (Nastavení › Jazyk)',
'sk':'Teraz v 33 jazykoch vrátane slovenčiny, čínštiny, nemčiny a francúzštiny (Nastavenia › Jazyk)',
'hu':'Már 33 nyelven, köztük magyarul, kínaiul, németül és franciául (Beállítások › Nyelv)',
'ro':'Acum în 33 de limbi, inclusiv română, chineză, germană și franceză (Setări › Limbă)',
'hr':'Sada na 33 jezika, uključujući hrvatski, kineski, njemački i francuski (Postavke › Jezik)',
'el':'Τώρα σε 33 γλώσσες, μεταξύ τους ελληνικά, κινεζικά, γερμανικά και γαλλικά (Ρυθμίσεις › Γλώσσα)',
'ca':'Ara en 33 llengües, com el català, el xinès, l’alemany i el francès (Configuració › Llengua)'}
json.dump(NV,open('work/lang_src/news_1131.json','w'),ensure_ascii=False,indent=0)
# 1) 게임 안 소식(1.1.30 목록 끝)
K=NV['ko'];rest={k:v for k,v in NV.items() if k!='ko'}
blk="/* 1.1.31 다국어 소식 한 줄(33개 언어) */\ntry{(function(){var K="+json.dumps(K,ensure_ascii=False)+",V="+json.dumps(rest,ensure_ascii=False)+";TRT[K]=V.en;TRJ[K]=V.ja;if(SUBL&&V[SUBL])TRX[K]=V[SUBL];NEWS['1.1.30']=(NEWS['1.1.30']||[]).concat([T(K)])})()}catch(e){}\n"
A="if(window.claude&&window.claude.hot&&window.claude.hot.ready)window.claude.hot.ready(boot);else boot();"
W='work/index.html';s=open(W,encoding='utf-8').read();assert s.count(A)==1;s=s.replace(A,blk+A);open(W,'w',encoding='utf-8').write(s)
P=json.load(open('patch_add.json',encoding='utf-8'))
city=[x for x in P if x.get('f')=='www/city.html' or (x.get('b','').startswith('/* 아가미시티(물고기 마을) 입구'))];rest2=[x for x in P if x not in city]
P=rest2+[{'a':A,'b':blk+A}]+city;json.dump(P,open('patch_add.json','w',encoding='utf-8'),ensure_ascii=False)
# 2) 스토어 새 소식 1.1.30 (39개 로캘)
LOC={'ko':'ko','en-US':'en','en-GB':'en','en-AU':'en','en-CA':'en','ja':'ja','zh-Hans':'zhs','zh-Hant':'zht','de-DE':'de','fr-FR':'fr','fr-CA':'fr','es-ES':'es','es-MX':'es','it':'it','pt-BR':'pt','pt-PT':'pt','ru':'ru','uk':'uk','ar-SA':'ar','he':'he','hi':'hi','id':'id','ms':'ms','th':'th','vi':'vi','tr':'tr','pl':'pl','nl-NL':'nl','sv':'sv','da':'da','no':'no','fi':'fi','cs':'cs','sk':'sk','hu':'hu','ro':'ro','hr':'hr','el':'el','ca':'ca'}
f='store/whatsnew_1130.json';d=json.load(open(f,encoding='utf-8'))
for loc in d:
    line='- '+NV[LOC[loc]]
    if line not in d[loc]:d[loc]=d[loc]+'\n'+line
    assert len(d[loc])<4000
json.dump(d,open(f,'w',encoding='utf-8'),ensure_ascii=False,indent=1)
# 3) 심사 메모
f='store/review_notes_1130.txt';s=open(f,encoding='utf-8').read()
a="The Christmas season content is unchanged"
add="(7) Languages: the game UI is now available in 33 languages (Korean, English, Japanese, Traditional and Simplified Chinese, Spanish, Portuguese, French, German, Italian, Dutch, Russian, Ukrainian, Polish, Turkish, Indonesian, Malay, Vietnamese, Thai, Hindi, Arabic, Hebrew, Swedish, Danish, Norwegian, Finnish, Czech, Slovak, Hungarian, Romanian, Croatian, Greek, Catalan). The language follows the device language and can be changed in Settings > Language. Text only; no new features or data collection.\n"
if '(7) Languages' not in s:
    assert a in s;s=s.replace(a,add+a)
open(f,'w',encoding='utf-8').write(s)
print('ok')
