# Antigravity YT SEO Hit Studio 🚀
*Gelişmiş Organik Arama (CTR) & İzlenme Otomasyonu*

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Node.js-green.svg">
  <img src="https://img.shields.io/badge/Framework-Express%20JS-lightgrey.svg">
  <img src="https://img.shields.io/badge/Browser%20Engine-Playwright%20Bablosoft-blue.svg">
</p>

Antigravity YT SEO Hit, YouTube'un yapay zeka tabanlı koruma ve bot filtreleme sistemlerini atlatmak üzere geliştirilmiş, doğrudan **Donanım Seviyesinde Sahtecilik (Hardware Spoofing)** yapan profesyonel bir otomasyon sistemidir. Normal web tarayıcı sürücülerinin (Selenium/Puppeteer) aksine, çok daha derinlere inerek ekran kartı (Canvas) hash'lerinden font ve PDF eklentisi detaylarına kadar yepyeni ve sahte cihazlar yaratır.

Ayrıca web tabanlı kontrol paneli (Frontend) ile her ayarı görsel arayüzden yönetmenize olanak tanır.

---

## ⚡ Kurulum ve Çalıştırma (Tek Satır İle)
Eğer sisteminizi formatlı bir PC veya boş bir Windows Uzak Sunucu (VDS) üzerine kuruyorsanız; kod editörü veya kütüphane kurmakla hiç vakit kaybetmeyin.
Sadece bilgisayarınızın arama kutusuna `PowerShell` yazın, programı açın ve aşağıdaki satırı kopyalayıp Enter'a basın:

```powershell
Invoke-WebRequest -Uri "https://github.com/seghobs/ytseoohitbotu/archive/refs/heads/main.zip" -OutFile "ytbot.zip"; Expand-Archive "ytbot.zip" -DestinationPath .; cd ytseoohitbotu-main; .\baslat.bat
```

> **Not:** Sistem `.bat` dosyasını çalıştırdığında eksik olan tüm Node.js bağımlılıklarını kendisi fark eder, indirmeleri gerçekleştirip yönetim panelini (`localhost:3000`) varsayılan tarayıcınızda direkt karşınıza getirir!

---

## 💻 Uygulama Tasarımı (Native App Feel)
Bot sadece stabil bir backend algortimasına değil, mükemmel bir kullanıcı dostu UI'ye de sahiptir.
- **Masaüstünde Electron.js Hissi:** Sistem masaüstünden açıldığında gölgeli, koyu renkli Glassmorphism pencerelere sahip sahte bir yazılım donanımı gibi davranır. (MacOS Pencere kontrolleri taklit edilmiştir.)
- **Mobilden Native Görünüm:** Panele telefondan bağlandığınızda tasarım şekil değiştirir; kenarları sığdırarak uygulamaya dönüşür ve düğmeler telefonda kullanım kolaylığı için ekranın altına sabitlenir.

---

## 🔥 Temel Sistem Mimarı ve Mükemmel Özellikler

### 1. Bablosoft Fingerprint Motoru (Kusursuz Maskeleme)
Tıklamaların spam veya bot'a düşmemesi için projenin merkezine `playwright-with-fingerprints` kütüphanesi yerleştirildi. 
- Her döngüde rastgele `User-Agent` oluşturur.
- Eşsiz ve şifrelenmiş `Canvas` imza verileri üreterek bağlanan cihazın ekran kartı profilini sanki farklı ve gerçek bir bilgisayarmış gibi tasarlar.
- Mevcut Chrome/Windows uyumunu 109. sürümünden 127. sürüme kadar değiştirerek izleri karıştırır.

### 2. Multi-Tasking & Seri Döngü (Infinity Loop)
*Arayüzde bulunan **"Tekrar Sayısı (Döngü)"** ayarı sayesinde tek bir tuşla sistemi otomatiğe bağlayabilirsiniz.*
Girdiğiniz sayı kadar döngü arka planda kusursuz bir sırayla oynatılır. Her video bittiğinde Chrome komple parçalanır (iz kalmaması için bellek temizlenir), ardından yeni bir Parmak İzi ile tekrardan tamamen yeni bir sahte insan misali hayatına başlar.

### 3. Dinamik Mobil Proxy Entegrasyonu (Modem Resetleme)
Panele koyduğunuz IP:Port formundaki mobil proxy adresi her parmak izi değişiminde sisteme enjekte edilir. Bot arayüzündeki **"IP Yenileme API (Reset)"** boşluğuna proxy servisinizin size verdiği linki yapıştırırsanız, ana kod her yeni Chrome sekmesi açtığında arka planda servis sağlayıcınıza HTTP İsteği atar ve mobil modemin internetini sıfırlayarak yepyeni bir Gerçek Telefon IP Adresi temin eder!

### 4. Gelişmiş YouTube Search & Targeting Sistemi
Kendi video hedefinizi arama kutusundan bulmak için arama kutusu ve izleyeceğiniz video URL'si gibi ayarları belirlersiniz.
- `Arama Kutusu Algoritması` Tasarım değişikliklerinden etkilenmemek için arama butonlarını incelemekten kaçınır; bot klavyesi üzerinden direk olarak organik bir şekilde "Enter" tuşuna basarak listelemeyi getirir.
- **Sonsuz Tarama (Scroll Loader):** Eğer aradığınız özel linkli video eşleşmesi listede (sayfa-1) mevcut değilse; tıpkı ısrarcı bir insan gibi sayfanın sonuna kadar kaydırıp (scroll) yeni 15 videonun DOM'a eklenmesini bekler, bulana dek her yeni video ağaçlarını kazır ve eşleştirdiği an Tıklamayı Gerçekleştirir. *(25 sayfalık limit)*

### 5. Reklam Atlama Mekanizması (Ad-Skipper)
YouTube algoritmasının en büyük zaman israf kaynaklarından birini akıllıca ekarte eder.
- Video izlendiği sırada oluşan 30/60 sn. gibi zaman aralığı sürecinde her saniyeyi böler ve dinamik `Observer` gözlemci modülünü çalıştırır. Eğer ekranda `"ytp-ad-skip-button"` tespit edilirse beklemeden Skip (Reklamı Geç) işlemi yapılır, bu sayede sahte zaman kayıpları engellenir; doğrudan organik videoya geçiş yapılır.

### 6. Organik İnsan Davranış Simülatörü (Rastgele Random İhtimaller)
Sisteminizi %100 kusursuz bir izleyici (organik view) kılan kilit özelliğidir! Bot videoyu açtığında robot gibi kaskatı kesilip "30 Saniye Bekle" fonksiyonunu uygulamakla yetinmez:
- **(Nadir %5 İhtimal):** Videonun açıklaması *(Description - Daha fazla göster)* bölümünü okur.
- **(%15 İhtimal):** İzleme esnasında canı sıkılmış ve yorumlara göz atacakmış gibi sayfayı aşağı veya yukarı esnek piksellerde ani scroll işlemiyle kaydırır.
- **(%15 İhtimal):** Fare (Cursor) ekranda tamamen rastgele hızlar (steps) kullanılarak rasgele konumlara ilerletilir. Bu dikkat dağınıklığı hareketidir.
- **(%65 İhtimal):** Hiperaktiviteden uzak bir şekilde videoyu usulca izler ki makine olduğu tespit edilmesin.
`(Her saniye işleyen bu modülün eylem yüzdeleri Math.random() tabanlıdır, birbiriyle asla eşleşen iki döngü gerçekleşmeyeceği için tespit edilebilmesi bilimsel olarak imkansızdır.)`
