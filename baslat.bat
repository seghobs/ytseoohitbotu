@echo off
title YT Hit Studio - Kontrol Paneli
color 0b

echo =======================================================
echo          ANTIGRAVITY SEO ENGINE V2 BASLATILIYOR...
echo =======================================================
echo.

:: KÜTÜPHANELERİN YÜKLÜ OLUP OLMADIĞINI KONTROL ET
IF NOT EXIST "node_modules\" (
    color 0e
    echo [!] Dikkat: Projede gerekli Node.js kutuphaneleri (node_modules) bulunamadi!
    echo [*] Sistemin calismasi icin dosyalari otomatik indiriyorum. Bu islem hizina gore 1-2 dakika surebilir...
    echo.
    call npm install
    echo.
    echo [+] Kutuphaneler basariyla kuruldu! Ana isleme geciliyor...
    color 0b
)

echo [OK] Kutuphaneler mevcut. Sunucu baglantilari hazirlaniyor...
echo Lutfen bu siyah ekrani ARKADA ACIK BIRAKIN (Kapatmayiniz).
echo Uygulama yuzu, kullandigin tarayicida otomatik olarak 2 saniye icinde acilacaktir!
echo.

:: 2 saniye bekletiyoruz ki arka planda node calismaya hazir olsun
timeout /t 2 /nobreak >nul

:: Tarayiciyi otomatik yonlendir
start http://localhost:3000

:: Son olarak asil node.js kodunu calistir ve ekranda goster
node server.js

pause
