const mongoose = require('mongoose');

/**
 * Middleware untuk membuat dan mengelola sesi transaksi Mongoose.
 * Setiap request yang menggunakan middleware ini akan dibungkus dalam sebuah transaksi.
 * Jika controller berhasil, transaksi akan di-commit.
 * Jika terjadi error di controller, transaksi akan di-abort.
 */
const transactionMiddleware = async (req, res, next) => {
    // Memulai sesi baru dengan database
    const session = await mongoose.startSession();

    // Menyimpan sesi di objek request agar bisa diakses oleh controller
    req.transactionSession = session;

    try {
        // Memulai transaksi
        session.startTransaction();

        // Melanjutkan ke controller atau middleware berikutnya
        await next();

        // Jika controller selesai tanpa error, commit transaksi
        // Pengecekan `headersSent` memastikan kita tidak mencoba commit setelah response dikirim
        if (!res.headersSent) {
            await session.commitTransaction();
        } else {
            // Jika response sudah terkirim (misalnya streaming), transaksi mungkin sudah tidak relevan
            // atau perlu penanganan khusus. Di sini kita batalkan untuk keamanan.
            await session.abortTransaction();
        }
    } catch (error) {
        // Jika terjadi error di `next()` (yaitu di dalam controller),
        // batalkan (abort) transaksi
        console.log('Transaction aborted due to an error.');
        await session.abortTransaction();

        // Teruskan error ke error handler utama di app.js
        next(error);
    } finally {
        // Selalu akhiri sesi setelah selesai, baik commit maupun abort
        session.endSession();
    }
};

module.exports = transactionMiddleware;
