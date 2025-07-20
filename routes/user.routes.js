const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const transactionMiddleware = require('../middleware/transaction.middleware');

// Endpoint untuk membuat user dan order dalam satu transaksi.
// Middleware `transactionMiddleware` dijalankan SEBELUM controller.
router.post('/create-with-order', transactionMiddleware, UserController.createUserAndOrder);

// Endpoint untuk mendapatkan semua user (tidak perlu transaksi)
router.get('/', UserController.getAllUsers);

module.exports = router;
