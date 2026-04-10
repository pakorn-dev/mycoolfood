const mongoose = require('mongoose');
const { type } = require('os');

const orderSchema = new mongoose.Schema({
    buyerName: {
        type: String,
        required: true,
    },
    buyerPhoneNumber: {
        type: String,
        required: true,
    },
    buyerAddress: {
        type: String,
        require: true,
    },
    order: {
        type: [Object],
        default: undefined
    },
    sellerId: {
        type: String,
        require: true,
    },
    buyerId: {
        type: String,
        require: true,
    },
    isConfirm: {
        type: Boolean,
        default: false,
    },
    confirmLink: {
        type: String,
        require: true,
        default: undefined
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);
