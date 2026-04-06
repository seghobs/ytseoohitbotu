const express = require('express');
const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const SETTINGS_FILE = 'settings.json';

// Ayarları oku
app.get('/api/settings', (req, res) => {
    if (fs.existsSync(SETTINGS_FILE)) {
        res.json(JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')));
    } else {
        res.json({});
    }
});

// Ayarları kaydet
app.post('/api/settings', (req, res) => {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(req.body, null, 4));
    res.json({ success: true });
});

let botProcess = null;
let sseClients = [];

const broadcastLog = (msg) => {
    const lines = msg.toString().split('\n');
    lines.forEach(line => {
        if (line.trim() !== '') {
            sseClients.forEach(client => {
                client.write(`data: ${line}\n\n`);
            });
        }
    });
};

// Log akışı (SSE)
app.get('/api/logs', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    res.write('data: Bağlantı kuruldu. Sistem Hazır.\n\n');
    sseClients.push(res);
    
    req.on('close', () => {
        sseClients = sseClients.filter(c => c !== res);
    });
});

// Botu başlat
app.post('/api/start', (req, res) => {
    if (botProcess) {
        return res.status(400).json({ error: 'Bot zaten çalışıyor!' });
    }
    
    broadcastLog('🚀 Bot prosesi başlatılıyor...');
    
    botProcess = spawn('node', ['youtube_bot.js'], { cwd: __dirname });
    
    botProcess.stdout.on('data', broadcastLog);
    botProcess.stderr.on('data', broadcastLog);
    
    botProcess.on('close', (code) => {
        broadcastLog(`🔴 Bot işlemi sonlandı. (Kod: ${code})`);
        botProcess = null;
    });
    
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log('Sunucu http://localhost:3000 adresinde çalışıyor.');
});
