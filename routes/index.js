const express = require('express');
const router = express.Router();

// Import rute-rute spesifik
const userRoutes = require('./user.routes');

// Gunakan rute-rute tersebut dengan prefix yang sesuai
// Contoh: semua rute di userRoutes akan diawali dengan /users
// Sehingga endpoint lengkapnya menjadi /api/users/...
router.use('/users', userRoutes);

// Anda bisa menambahkan rute lain di sini
// router.use('/products', productRoutes);

module.exports = router;
