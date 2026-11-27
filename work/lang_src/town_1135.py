# 1.1.35 마을 편리성(conv.js) 새 문구 3개 → i18n/en·ja·es·vi.json + lang/city_<언어>.js 끝에 덧붙임(다시 돌려도 한 번만)
import json,os
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))+'/';MK='/* town_1135 */'
K=['모두 배달','지금 올릴 수 있어요','올릴 수 있는 건물이 없어요']
X={
'en':["Deliver all","Ready to upgrade","No buildings can be upgraded right now"],
'ja':["まとめて配達","今アップグレードできます","今アップグレードできる建物はありません"],
'es':["Entregar todo","Listos para mejorar","Ahora no hay edificios para mejorar"],
'vi':["Giao tất cả","Có thể nâng cấp ngay","Hiện chưa có công trình nào nâng cấp được"],
'ar':["تسليم الكل","جاهز للترقية","لا توجد مبانٍ يمكن ترقيتها الآن"],
'ca':["Lliura-ho tot","A punt per millorar","Ara no hi ha edificis per millorar"],
'cs':["Doručit vše","Lze vylepšit hned","Teď nejde vylepšit žádnou budovu"],
'da':["Lever alle","Klar til opgradering","Ingen bygninger kan opgraderes lige nu"],
'de':["Alle liefern","Jetzt verbesserbar","Gerade lässt sich kein Gebäude verbessern"],
'el':["Παράδοση όλων","Έτοιμα για αναβάθμιση","Δεν υπάρχει κτίριο για αναβάθμιση τώρα"],
'fi':["Toimita kaikki","Voi päivittää nyt","Mitään rakennusta ei voi päivittää nyt"],
'fr':["Tout livrer","Prêts à améliorer","Aucun bâtiment à améliorer pour l'instant"],
'he':["למסור הכול","מוכן לשדרוג","אין כרגע מבנים לשדרוג"],
'hi':["सब पहुँचाएँ","अभी अपग्रेड हो सकता है","अभी कोई इमारत अपग्रेड नहीं हो सकती"],
'hr':["Dostavi sve","Spremno za nadogradnju","Trenutno se nijedna zgrada ne može nadograditi"],
'hu':["Összes kiszállítása","Most fejleszthető","Most egyik épület sem fejleszthető"],
'id':["Antar semua","Siap ditingkatkan","Belum ada bangunan yang bisa ditingkatkan"],
'it':["Consegna tutto","Pronti da migliorare","Nessun edificio da migliorare ora"],
'ms':["Hantar semua","Sedia dinaik taraf","Tiada bangunan boleh dinaik taraf sekarang"],
'nl':["Alles bezorgen","Klaar om te verbeteren","Er is nu geen gebouw te verbeteren"],
'no':["Lever alle","Klar til oppgradering","Ingen bygninger kan oppgraderes nå"],
'pl':["Dostarcz wszystko","Gotowe do ulepszenia","Teraz nie można ulepszyć żadnego budynku"],
'pt':["Entregar tudo","Prontos para melhorar","Nenhum prédio pode ser melhorado agora"],
'ro':["Livrează tot","Gata de îmbunătățire","Acum nu se poate îmbunătăți nicio clădire"],
'ru':["Доставить все","Можно улучшить","Сейчас нечего улучшать"],
'sk':["Doručiť všetko","Dá sa vylepšiť hneď","Teraz sa nedá vylepšiť žiadna budova"],
'sv':["Leverera alla","Redo att uppgradera","Inga byggnader kan uppgraderas just nu"],
'th':["ส่งทั้งหมด","อัปเกรดได้เลย","ตอนนี้ยังไม่มีอาคารที่อัปเกรดได้"],
'tr':["Hepsini teslim et","Şimdi yükseltilebilir","Şu an yükseltilebilecek bina yok"],
'uk':["Доставити все","Можна покращити","Зараз нічого покращити"],
'zhs':["全部配送","现在可以升级","现在没有可升级的建筑"],
'zht':["全部配送","現在可以升級","現在沒有可升級的建築"]}
for L,v in X.items():
    if L in('en','ja','es','vi'):
        f=ROOT+'work/city_src/i18n/'+L+'.json';o=json.load(open(f,encoding='utf-8'))
        for k,t in zip(K,v):o['d'][k]=t
        json.dump(o,open(f,'w',encoding='utf-8'),ensure_ascii=False)
    else:
        f=ROOT+'lang/city_'+L+'.js';s=open(f,encoding='utf-8').read()
        if MK in s:s=s[:s.index(MK)]
        add='try{'+''.join('I18N_X.d['+json.dumps(k,ensure_ascii=False)+']='+json.dumps(t,ensure_ascii=False)+';' for k,t in zip(K,v))+'}catch(e){}'
        open(f,'w',encoding='utf-8').write(s.rstrip('\n')+'\n'+MK+add+'\n')
print('town_1135',len(X))
