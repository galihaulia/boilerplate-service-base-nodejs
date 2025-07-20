const mongoose = require('mongoose');
const { Schema } = mongoose;

// Skema untuk Order
const orderSchema = new Schema({
    product_name: {
        type: String,
        required: [true, 'Product name is required'],
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
    },
    // Relasi ke koleksi User
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    order_date: {
        type: Date,
        default: Date.now,
    },
});

// Membuat model Order dari skema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
