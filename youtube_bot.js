const { plugin } = require('playwright-with-fingerprints');
const fs = require('fs');

async function skipAdsIfPresent(page) {
    const adSelectors = [
        '.ytp-ad-skip-button-modern', 
        '.ytp-ad-skip-button', 
        '.ytp-skip-ad-button',
        '.videoAdUiSkipButton',
        'button.ytp-ad-skip-button-text'
    ];
    for (const sel of adSelectors) {
        try {
            const adBtn = page.locator(sel);
            if (await adBtn.count() > 0 && await adBtn.nth(0).isVisible()) {
                console.log("📺 Reklam Ön-Planda/Tespit Edildi! 'Reklamı Geç' butonuna tıklanıyor...");
                await adBtn.nth(0).click();
                await page.waitForTimeout(1000); // Sistem tepkisine şans ver
            }
        } catch(e) { } 
    }
}

// YEPYENİ EKLENEN ORGANİK İNSAN SİMÜLATÖRÜ FONKSİYONU
async function performRandomHumanAction(page) {
    const chance = Math.random();
    try {
        if (chance < 0.05) { 
            // %5 İhtimal (Nadir eylem): Açıklamayı / Yorumları genişletme
            const descBtn = page.locator('tp-yt-paper-button#expand'); 
            if (await descBtn.count() > 0 && await descBtn.nth(0).isVisible()) {
                console.log("👤 [İnsan Hareketi Eğilimi]: İzleyici videoyla ilgilendi, Açıklama / Yorumlar genişletiliyor.");
                await descBtn.nth(0).click();
                await page.mouse.move(Math.floor(Math.random() * 500), Math.floor(Math.random() * 500));
            }
        } 
        else if (chance >= 0.05 && chance < 0.20) { 
            // %15 İhtimal: Dinamik (Aşağı/Yukarı) Kaydırma
            // Her saniye aynısını yapmaz, -200px (yukarı) ile +800px (aşağı) arası rastgele seçer
            const scrollAmount = Math.floor(Math.random() * 1000) - 200; 
            console.log(`👤 [İnsan Hareketi Eğilimi]: Fare topuyla sayfa kaydırılıyor (${scrollAmount > 0 ? 'Aşağı Yorumlara' : 'Yukarı Videoya'} bakıldı)`);
            await page.evaluate((y) => window.scrollBy({ top: y, behavior: 'smooth' }), scrollAmount);
            await page.waitForTimeout(500); // Ekranın smooth inmesini bekle
        }
        else if (chance >= 0.20 && chance < 0.35) { 
            // %15 İhtimal: Dikkati dağınık veya rastgele fareyi hareket ettiren bir insan simülasyonu
            const targetX = Math.floor(Math.random() * 1200) + 100;
            const targetY = Math.floor(Math.random() * 800) + 50;
            const speed = Math.floor(Math.random() * 20) + 10;
            await page.mouse.move(targetX, targetY, { steps: speed });
        }
        // Kalan yüksek %65 ihtimalle izleyici arkasına yaslanıp sabit izlemeye devam eder.
        // Bu ihtimal sayesinde bot her saniye titreyen tuhaf bir makine gibi değil, normal bir insan gibi nefes alır.
    } catch(err) {
        // Hatada sistemi durdurma, sadece bu saniyelik haraketi iptal et.
    }
}

async function runBotSession(ayarlar, sessionCount) {
    console.log(`\n=================================================`);
    console.log(`🚀 BAŞLATILIYOR: GÖREV ${sessionCount} / ${ayarlar.tekrar_sayisi || 1}`);
    console.log(`=================================================`);
    
    plugin.setServiceKey(ayarlar.bablosoft_key || '');
    
    console.log("1. Gerçek cihaz ve parmak izi aranıyor...");
    const fingerprint = await plugin.fetch({ tags: ['Microsoft Windows', 'Chrome'] });
    console.log("✅ Bablosoft Sunucusundan Parmak İzi Başarıyla Çekildi!");
    
    if (ayarlar.proxy_reset_url && ayarlar.proxy_reset_url.length > 5) {
        console.log("🔄 Mobil proxy'den yeni IP isteniyor...");
        try {
            await fetch(ayarlar.proxy_reset_url);
            console.log("⏳ Sistemin modemi resetlemesi bekleniyor (8 saniye)...");
            await new Promise(r => setTimeout(r, 8000));
        } catch(err) {
            console.log("⚠️ IP Resetleme hatası:", err.message);
        }
    }
    
    const proxyUrl = ayarlar.proxy_url || "";
    if (proxyUrl && proxyUrl.includes('http')) {
        console.log(`📡 Bağlantı Proxy Üzerinden Kuruluyor: ${proxyUrl}`);
        plugin.useProxy(proxyUrl);
    } else {
        console.log("⚠️ Proxy tanımlanmadı, cihazın kendi yerel IP adresi ile devam ediliyor.");
    }

    plugin.useFingerprint(fingerprint);
    console.log("2. Parmak izi ve IP bağlantı ayarları sisteme enjekte edildi, tarayıcı başlatılıyor...");
    
    const browser = await plugin.launch({ headless: false });
    const page = await browser.newPage();
    
    const userAgent = await page.evaluate(() => navigator.userAgent);
    console.log("🕵️ Aktif Sahte Kimlik (User Agent):", userAgent);
    
    console.log("\nYouTube'a gidiliyor...");
    await page.goto("https://www.youtube.com");
    
    const aranan_kelime = ayarlar.aranan_kelime || "Python";
    const hedef_video_linki = ayarlar.hedef_video_linki || "";
    const izleme_suresi_ms = (parseInt(ayarlar.izleme_suresi) || 30) * 1000;

    console.log(`'${aranan_kelime}' kelimesi arama kutusuna yazılıyor...`);
    
    let videoId = "";
    if (hedef_video_linki.includes("v=")) {
        videoId = hedef_video_linki.split("v=")[1].split("&")[0];
    } else if (hedef_video_linki.includes("youtu.be/")) {
        videoId = hedef_video_linki.split("youtu.be/")[1].split("?")[0];
    } else {
        videoId = hedef_video_linki; 
    }
    
    const searchInput = 'input[name="search_query"]';
    await page.waitForSelector(searchInput, { timeout: 15000 });
    await page.click(searchInput);
    await page.fill(searchInput, aranan_kelime);
    
    await page.keyboard.press('Enter');
    
    await page.waitForSelector('ytd-video-renderer', { timeout: 15000 });
    await page.waitForTimeout(3000); 
    
    let tiklandi = false;
    let maxScroll = 25; 
    
    for (let scrollCounter = 0; scrollCounter < maxScroll; scrollCounter++) {
        const videos = page.locator('ytd-video-renderer');
        const videoCount = await videos.count();
        
        console.log(`🔎 Tarama: Katman ${scrollCounter+1}. Ekranda şu an ${videoCount} adet video yüklü.`);
        
        for (let i = 0; i < videoCount; i++) {
            const videoLinkEl = videos.nth(i).locator('a#video-title');
            const href = await videoLinkEl.getAttribute('href');
            
            if (href && videoId && href.includes(videoId)) {
                console.log(`🎯 Bingo! Hedef Video Linki Eşleşti! Tıklanıyor... (${href})`);
                await videoLinkEl.click();
                tiklandi = true;
                break;
            }
        }
        
        if (tiklandi) break;
        
        console.log("⬇️ Hedef video bu kısımda yok, aşağı kaydırılıp diğer sonuçlar yükleniyor...");
        await page.evaluate(() => window.scrollBy(0, 1500));
        await page.waitForTimeout(3000); 
    }
    
    if (!tiklandi) {
        console.log("❌ Video bulunamadı! Yedek önlem olarak rastgele sistemsel tıklama gerçekleştiriliyor...");
        await page.locator('ytd-video-renderer').nth(0).locator('a#video-title').click();
    }
    
    console.log(`\n👁️ Ana İzleme İşlemi Başladı. ${izleme_suresi_ms/1000} Saniye boyunca videoda kalınacak...`);
    const bitisZamani = Date.now() + izleme_suresi_ms;
    
    // YENİ HARMANLANMIŞ AD-SKIPPER + ORGANİK DAVRANIŞ İZLEME DÖNGÜSÜ
    while (Date.now() < bitisZamani) {
        await skipAdsIfPresent(page);
        
        // Rastgele İnsan Hareketleri Algoritmasını tetikle!
        await performRandomHumanAction(page);
        
        await page.waitForTimeout(1000);
    }
    
    console.log(`\n✅ Görev ${sessionCount} İzlenmesi Tamamlandı, İz kalmamak için tarayıcı tamamiyle kapatılıyor.`);
    await browser.close();
}

(async () => {
    let ayarlar = {};
    try {
        ayarlar = JSON.parse(fs.readFileSync('./settings.json', 'utf8'));
    } catch(e) {
        console.error("Ayarlar okunamadı!");
    }
    
    const tekrar_sayisi = parseInt(ayarlar.tekrar_sayisi) || 1;
    
    for (let loopIndex = 1; loopIndex <= tekrar_sayisi; loopIndex++) {
        try {
            await runBotSession(ayarlar, loopIndex);
        } catch(err) {
            console.error(`❌ BEKLENMEYEN HATA (Görev ${loopIndex}):`, err.message);
        }
        
        if (loopIndex < tekrar_sayisi) {
            console.log("\n⏱️ Bir sonraki benzersiz kimlik görevine/sayfasına geçmek için 5 saniye dinleniliyor...");
            await new Promise(r => setTimeout(r, 5000));
        }
    }
    
    console.log("\n🎉 GİRİLEN TÜM DÖNGÜ VE GÖREVLER EKSİKSİZ TAMAMLANDI! İşlemler Sonu.");
})();
