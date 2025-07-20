# 🚀 Boilerplate Service Base - Node.js

Boilerplate ini dirancang sebagai fondasi awal untuk membangun aplikasi backend berbasis Node.js dan Express, dengan dukungan konfigurasi modular, logging, koneksi database MongoDB via Mongoose, serta integrasi Docker dan security scan menggunakan Trivy.

---

## 📁 Struktur Proyek

.
├── config/
│   ├── connection/           # Koneksi database & konfigurasi
│   ├── default.json          # Konfigurasi default
│   └── logger.js             # Konfigurasi Winston logger
├── controllers/              # Logika bisnis / kontrol API
├── middleware/               # Middleware (contoh: transaksi)
├── models/                   # Schema & model Mongoose
├── routes/                   # Routing API
├── app.js                    # Entry point aplikasi
├── package.json              # Metadata proyek & dependensi
├── .env.example              # Contoh environment variable
└── README.md                 # Dokumentasi proyek ini

---

## 🔧 Fitur Utama

- Express.js sebagai web framework
- Mongoose untuk koneksi & manipulasi MongoDB
- Logger menggunakan Winston
- Struktur folder modular (MVC style)
- Environment management dengan `config` & `dotenv`
- Dockerfile & build image support
- Trivy untuk security image scanning

---

## 🚀 Cara Instalasi

```bash
# Clone repository
git clone https://github.com/galihaulia/boilerplate-service-base-nodejs.git
cd boilerplate-service-base-nodejs

# Install dependencies
npm install
```

---

## 🛠 Menjalankan Aplikasi

```bash
# Jalankan dengan nodemon (dev mode)
npm run dev
```

---

## ⚙️ Environment Variables

Buat file `.env` berdasarkan `.env.example`. Contoh:

PORT=3000
DB_URI=mongodb://localhost:27017/namadatabase
NODE_ENV=development

---

## 🐳 Docker Support

```bash
# Build Docker image
npm run build

# Deploy Docker container
npm run deploy
```

---

## 🔒 Security Scan (Trivy)

```bash
# Scan Docker image untuk critical vulnerabilities
npm run scan
```

---

## 📦 NPM Scripts

| Perintah       | Deskripsi                                     |
|----------------|-----------------------------------------------|
| `npm run dev`  | Jalankan app dengan nodemon (mode dev)        |
| `npm run clean`| Hapus `node_modules`, lock files & cache npm  |
| `npm run rebuild` | Clean & install ulang dependensi         |
| `npm run build`| Build Docker image                            |
| `npm run deploy`| Deploy Docker image                          |
| `npm run scan` | Scan security image (CRITICAL level)          |

---

## 🔬 Testing

> Belum tersedia. Direkomendasikan untuk menambahkan `jest` dan `supertest` untuk testing unit dan integrasi.

---

## 🧠 Saran Pengembangan Lanjutan

- Tambahkan autentikasi berbasis JWT
- Middleware error handler global
- Dokumentasi API (Swagger/OpenAPI)
- Implementasi rate limiter, CORS policy ketat
- CI/CD Pipeline

---

## 👤 Author

Galih Haulia

---

## 📜 License

ISC License © 2025
