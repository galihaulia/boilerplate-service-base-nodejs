const User = require('../models/user.model');
const Order = require('../models/order.model');

/**
 * UserController dalam format class-based service.
 * Setiap method adalah static agar bisa dipanggil langsung tanpa perlu instansiasi.
 */
class UserController {
    /**
     * Membuat User baru beserta Order pertamanya dalam satu transaksi.
     * Jika salah satu gagal (misal, email duplikat), keduanya akan dibatalkan.
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     * @param {function} next - Express next middleware function
     */
    static async createUserAndOrder(req, res, next) {
        // Mengambil sesi transaksi dari request object yang sudah disiapkan oleh middleware
        const session = req.transactionSession;

        try {
            const { name, email, product_name, amount } = req.body;

            // 1. Membuat User baru.
            // Operasi ini harus menyertakan { session } untuk menjadi bagian dari transaksi.
            const newUser = new User({ name, email });
            await newUser.save({ session });

            // Simulasi error untuk pengujian: jika nama produk adalah 'fail', lempar error
            if (product_name === 'fail') {
                throw new Error("Simulated failure: Product name is 'fail'. Transaction will be aborted.");
            }

            // 2. Membuat Order baru yang berelasi dengan user di atas.
            // Operasi ini juga harus menyertakan { session }.
            const newOrder = new Order({
                product_name,
                amount,
                user: newUser._id,
            });
            await newOrder.save({ session });

            // Jika semua berhasil, kirim response sukses
            res.status(201).json({
                message: 'User and Order created successfully within a transaction.',
                user: newUser,
                order: newOrder,
            });
        } catch (error) {
            // Jika terjadi error, panggil `next(error)`.
            // Middleware transaksi akan menangkap ini dan membatalkan transaksi.
            next(
                res.status(400).json({
                    message: error.message || 'Failed to create User and Order.',
                })
            );
            // Catatan: Tidak perlu memanggil `session.abortTransaction()` di sini,
            // next(error);
        }
    }

    /**
     * Contoh method lain untuk mendapatkan semua user
     * (tidak memerlukan transaksi, tapi bisa saja tetap menggunakannya jika diperlukan)
     */
    static async getAllUsers(req, res, next) {
        try {
            const users = await User.find();
            res.status(200).json({
                message: 'Successfully retrieved all users.',
                data: users,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
