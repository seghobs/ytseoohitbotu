const { plugin } = require('playwright-with-fingerprints');

(async () => {
    console.log("📡 Bablosoft Sunucularına Parmak İzi İstek İsteği Atılıyor...");
    try {
        const fingerprint = await plugin.fetch({ 
            tags: ['Microsoft Windows', 'Chrome'] 
        });
        console.log("✅ BAŞARILI! Bablosoft Sisteminden Bir Kimlik Yakalandı!");
        console.log("📦 Gelen Saf Parmak İzi Tipi:", typeof fingerprint);
        // Çok uzun olduğu için ilk 800 karakteri yazdırıyoruz
        const dataStr = typeof fingerprint === 'string' ? fingerprint : JSON.stringify(fingerprint);
        console.log("👉 Değer (İlk 800 Karakter):\n\n" + dataStr.substring(0, 800) + "\n\n... (Verinin kalanı gizlendi)");
        
    } catch (e) {
        console.error("❌ HATA OLUŞTU:", e.message);
    }
})();
