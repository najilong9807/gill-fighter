# iOS 지역화 폴더(<언어>.lproj/InfoPlist.strings)를 33개 언어로 → 앱스토어 '언어' 목록이 게임 언어와 같아짐
import json
PH={'es':'Solo se usa para guardar tu tarjeta de récord en Fotos cuando eliges Guardar imagen.',
'vi':'Chỉ dùng để lưu thẻ kỷ lục vào Ảnh khi bạn chọn Lưu ảnh.',
'pt-BR':'Usado só para salvar seu cartão de recorde em Fotos quando você escolhe Salvar imagem.',
'fr':'Utilisé uniquement pour enregistrer ta carte de record dans Photos quand tu choisis Enregistrer l’image.',
'de':'Wird nur verwendet, um deine Rekordkarte in Fotos zu sichern, wenn du „Bild sichern“ wählst.',
'it':'Usato solo per salvare la tua scheda record in Foto quando scegli Salva immagine.',
'nl':'Alleen gebruikt om je recordkaart in Foto’s te bewaren wanneer je Afbeelding bewaren kiest.',
'ru':'Используется только для сохранения карточки рекорда в «Фото», когда ты выбираешь «Сохранить изображение».',
'uk':'Використовується лише для збереження картки рекорду у «Фото», коли ти вибираєш «Зберегти зображення».',
'pl':'Używane tylko do zapisania karty rekordu w Zdjęciach, gdy wybierzesz Zapisz obraz.',
'tr':'Yalnızca Görseli Kaydet’i seçtiğinde rekor kartını Fotoğraflar’a kaydetmek için kullanılır.',
'id':'Hanya dipakai untuk menyimpan kartu rekor ke Foto saat kamu memilih Simpan Gambar.',
'ms':'Hanya digunakan untuk menyimpan kad rekod ke Foto apabila anda memilih Simpan Imej.',
'th':'ใช้เฉพาะตอนที่คุณเลือก "บันทึกรูปภาพ" เพื่อบันทึกการ์ดสถิติลงในรูปภาพ',
'hi':'सिर्फ़ तब इस्तेमाल होता है जब आप "इमेज सेव करें" चुनकर रिकॉर्ड कार्ड को फ़ोटो में सेव करते हैं।',
'ar':'يُستخدم فقط لحفظ بطاقة رقمك القياسي في الصور عندما تختار حفظ الصورة.',
'he':'משמש רק לשמירת כרטיס השיא שלך בתמונות כשבוחרים "שמירת תמונה".',
'sv':'Används bara för att spara ditt rekordkort i Bilder när du väljer Spara bild.',
'da':'Bruges kun til at gemme dit rekordkort i Fotos, når du vælger Gem billede.',
'nb':'Brukes bare til å lagre rekordkortet ditt i Bilder når du velger Lagre bilde.',
'fi':'Käytetään vain ennätyskorttisi tallentamiseen Kuviin, kun valitset Tallenna kuva.',
'cs':'Používá se jen k uložení karty rekordu do Fotek, když zvolíš Uložit obrázek.',
'sk':'Používa sa len na uloženie karty rekordu do Fotiek, keď zvolíš Uložiť obrázok.',
'hu':'Csak arra használjuk, hogy a rekordkártyádat a Fotókba mentsük, amikor a Kép mentése lehetőséget választod.',
'ro':'Folosit doar pentru a salva cardul de record în Poze când alegi Salvează imaginea.',
'hr':'Koristi se samo za spremanje kartice rekorda u Fotografije kada odabereš Spremi sliku.',
'el':'Χρησιμοποιείται μόνο για να αποθηκεύσεις την κάρτα ρεκόρ στις Φωτογραφίες όταν επιλέγεις Αποθήκευση εικόνας.',
'ca':'Només s’utilitza per desar la teva targeta de rècord a Fotos quan tries Desa la imatge.'}
P=json.load(open('patch_add.json',encoding='utf-8'))
if any('6A1F00000000000000000010' in json.dumps(x) for x in P): raise SystemExit('already')
city=[x for x in P if x.get('f')=='www/city.html' or (x.get('b','').startswith('/* 아가미시티(물고기 마을) 입구'))];rest=[x for x in P if x not in city]
F='ios/App/App.xcodeproj/project.pbxproj';add=[]
regs=list(PH);ids={r:'6A1F0000000000000000%04X'%(0x10+i) for i,r in enumerate(regs)}
q=lambda r:('"%s"'%r) if '-' in r else r
add.append({'f':F,'a':'\t\t\t\t"zh-Hant",\n\t\t\t\tBase,\n','b':'\t\t\t\t"zh-Hant",\n'+''.join('\t\t\t\t%s,\n'%q(r) for r in regs)+'\t\t\t\tBase,\n'})
a='\t\t6A1F00000000000000000007 /* zh-Hant */ = {isa = PBXFileReference;'
add.append({'f':F,'a':a,'b':''.join('\t\t%s /* %s */ = {isa = PBXFileReference; lastKnownFileType = text.plist.strings; name = %s; path = %s; sourceTree = "<group>"; };\n'%(ids[r],r,q(r),('"%s.lproj/InfoPlist.strings"'%r) if '-' in r else '%s.lproj/InfoPlist.strings'%r) for r in regs)+a})
a='\t\t\t\t6A1F00000000000000000007 /* zh-Hant */,\n\t\t\t);'
add.append({'f':F,'a':a,'b':'\t\t\t\t6A1F00000000000000000007 /* zh-Hant */,\n'+''.join('\t\t\t\t%s /* %s */,\n'%(ids[r],r) for r in regs)+'\t\t\t);'})
for r in regs:
    t=PH[r].replace('"','\\"')
    add.append({'f':'ios/App/App/%s.lproj/InfoPlist.strings'%r,'new':'/* %s 기기에서 홈 화면에 보이는 앱 이름 */\n"CFBundleDisplayName" = "Gill Fighter";\n"CFBundleName" = "Gill Fighter";\n"NSPhotoLibraryAddUsageDescription" = "%s";\n'%(r,t)})
json.dump(rest+add+city,open('patch_add.json','w',encoding='utf-8'),ensure_ascii=False)
print('added',len(add))
