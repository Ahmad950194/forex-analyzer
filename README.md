# 📈 Forex Analyzer Pro

Aplikasi web modern untuk analisis trading forex dengan data real-time, sinyal AI, dan kalkulator posisi.

## ✨ Fitur

- **📊 Dashboard** - Harga forex real-time dan indikator teknis (RSI, MACD, Trend)
- **🤖 AI Analysis** - Sinyal trading berbasis AI dengan Grok
- **🧮 Calculator** - Kalkulator ukuran posisi untuk manajemen risiko
- **⚡ Live Data** - Update harga real-time via TwelveData API

## 🚀 Setup Cepat

### 1. Dapatkan API Keys

#### TwelveData (Gratis)
- Kunjungi: https://twelvedata.com/
- Daftar akun gratis
- Dapatkan API key di dashboard

#### Grok AI (Opsional untuk AI)
- Kunjungi: https://x.ai/
- Buat akun dan dapatkan API key

### 2. Konfigurasi Keys

#### Cara 1: Browser Console (Tercepat)
Buka browser console (F12) dan jalankan:
```javascript
setAPIKeys('your-twelvedata-key', 'your-grok-key')
```

#### Cara 2: Edit config.js
```javascript
TWELVEDATA_KEY: 'your-key-here',
GROK_KEY: 'your-key-here'
```

## 📁 Struktur File

```
├── index.html          # HTML utama
├── app.js              # Logika aplikasi
├── config.js           # Konfigurasi API
└── README.md           # Dokumentasi ini
```

## 🎯 Cara Penggunaan

1. **Pilih Pair** - EUR/USD, GBP/USD, USD/JPY, atau AUD/USD
2. **Lihat Dashboard** - Harga real-time dan indikator
3. **Generate Signal AI** - Klik tombol untuk analisis AI
4. **Hitung Posisi** - Gunakan kalkulator untuk manajemen risiko

## 🔐 Keamanan

❌ **Jangan:**
- Commit API keys ke GitHub
- Bagikan keys di PR
- Hardcode keys di client-side

✅ **Lakukan:**
- Gunakan environment variables
- Simpan keys di secrets management
- Gunakan backend API untuk operasi sensitif

## 📡 Batasan API

### TwelveData
- Tier gratis: 80 calls/hari, 8/menit
- Tier berbayar: Unlimited

## 🐛 Troubleshooting

### Menampilkan "Using mock data"
- API key belum dikonfigurasi
- Jalankan: `setAPIKeys('key-anda', 'grok-key')`

### Error API
- Verifikasi API keys benar
- Cek rate limits
- Buka console (F12) untuk detail

## 📝 Kustomisasi

### Tambah Currency Pair
Edit `index.html`:
```html
<option value="EUR/GBP">EUR/GBP</option>
```

### Auto-refresh
Edit `app.js`:
```javascript
setInterval(load, 60000); // Refresh setiap 60 detik
```

## 📚 Resources

- [TwelveData Docs](https://twelvedata.com/docs)
- [Grok API](https://x.ai/docs)
- [Forex Learning](https://www.investopedia.com/)

## ⚠️ Disclaimer

Tool ini untuk edukasi saja. BUKAN saran finansial. Selalu lakukan riset sendiri sebelum trading.

---

**Dibuat dengan ❤️ untuk Forex Traders**