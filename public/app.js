document.addEventListener("DOMContentLoaded", () => {
    const inputs = {
        aranan: document.getElementById("aranan_kelime"),
        hedef: document.getElementById("hedef_video_linki"),
        sure: document.getElementById("izleme_suresi"),
        tekrar: document.getElementById("tekrar_sayisi"),
        proxy: document.getElementById("proxy_url"),
        resetUrl: document.getElementById("proxy_reset_url"),
        babloKey: document.getElementById("bablosoft_key")
    };
    
    const terminal = document.getElementById("terminalBox");
    const statusBadge = document.getElementById("botStatus");

    fetch('/api/settings')
        .then(res => res.json())
        .then(data => {
            if(data.aranan_kelime) inputs.aranan.value = data.aranan_kelime;
            if(data.hedef_video_linki) inputs.hedef.value = data.hedef_video_linki;
            if(data.izleme_suresi) inputs.sure.value = data.izleme_suresi;
            if(data.tekrar_sayisi) inputs.tekrar.value = data.tekrar_sayisi;
            if(data.proxy_url) inputs.proxy.value = data.proxy_url;
            if(data.proxy_reset_url) inputs.resetUrl.value = data.proxy_reset_url;
            if(data.bablosoft_key) inputs.babloKey.value = data.bablosoft_key;
        });

    document.getElementById("saveBtn").addEventListener("click", () => {
        const payload = {
            aranan_kelime: inputs.aranan.value,
            hedef_video_linki: inputs.hedef.value,
            izleme_suresi: parseInt(inputs.sure.value) || 30,
            tekrar_sayisi: parseInt(inputs.tekrar.value) || 1,
            proxy_url: inputs.proxy.value,
            proxy_reset_url: inputs.resetUrl.value,
            bablosoft_key: inputs.babloKey.value
        };
        
        const btn = document.getElementById("saveBtn");
        btn.innerHTML = `<i class="fa-solid fa-check"></i> Kaydedildi!`;
        
        fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(() => {
            setTimeout(() => {
                btn.innerHTML = `<i class="fa-solid fa-save"></i> Kaydet`;
            }, 2000);
        });
    });

    document.getElementById("settingsForm").addEventListener("submit", (e) => {
        e.preventDefault();
        fetch('/api/start', { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                if(data.error) alert(data.error);
                else {
                    statusBadge.innerText = "SİSTEM ÇALIŞIYOR";
                    statusBadge.style.color = "#fbbf24";
                    statusBadge.style.background = "rgba(251, 191, 36, 0.1)";
                    statusBadge.style.borderColor = "rgba(251, 191, 36, 0.3)";
                    
                    // Mobilde başlatıldıktan sonra terminale otomatik kaydır
                    if(window.innerWidth <= 900) {
                        window.scrollTo({ top: terminal.offsetTop - 50, behavior: 'smooth' });
                    }
                }
            });
    });

    const evtSource = new EventSource('/api/logs');
    evtSource.onmessage = function(event) {
        if(event.data) {
            const div = document.createElement("div");
            div.className = "log-line";
            div.textContent = "> " + event.data;
            terminal.appendChild(div);
            
            // Otomatik Auto-scroll mekanizması
            terminal.scrollTop = terminal.scrollHeight;
            
            if(event.data.includes("TÜM DÖNGÜ VE GÖREVLER EKSİKSİZ TAMAMLANDI") || event.data.includes("Bot işlemi sonlandı")) {
                statusBadge.innerText = "İŞLEMLER BİTTİ (BEKLEMEDE)";
                statusBadge.style.color = "#10b981";
                statusBadge.style.background = "rgba(16, 211, 153, 0.1)";
                statusBadge.style.borderColor = "rgba(16, 211, 153, 0.3)";
            }
        }
    };
});
