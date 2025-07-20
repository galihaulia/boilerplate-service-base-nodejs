// Import dependensi
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const allRoutes = require('./routes');

// Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware dasar
app.set('port', PORT);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Koneksi ke MongoDB
// PENTING: Transaksi Mongoose memerlukan koneksi ke replica set MongoDB.
require('./config/connection/db_connection');

// Rute utama aplikasi
app.use('/api', allRoutes);

// Rute dasar untuk pengecekan
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Mongoose Transaction Service.' });
});

// Middleware untuk menangani error (Error Handler)
app.use((err, req, res, next) => {
    console.error('An error occurred:', err.stack);
    // Jika sesi transaksi ada dan aktif, batalkan
    if (req.transactionSession && req.transactionSession.inTransaction()) {
        req.transactionSession.abortTransaction();
    }
    res.status(err.statusCode || 500).json({
        message: err.message || 'An internal server error occurred.',
        error: process.env.NODE_ENV === 'development' ? err.stack : {},
    });
});

const server = require('http').createServer(app);
server.listen(app.get('port'), () => {
    // console.log(`Server is running on port ${app.get('port')}`);
    console.log('%s App is running at http://localhost:%d in %s mode', '✔️ ', app.get('port'), app.get('env'));
    // console.log(' Press CTRL-C to stop\n');
});
