const mongoose = require('mongoose');

const orderLineItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unitPrice: {
    type: Number,
    required: true
  },
  subTotal: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  cashierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lineItems: [orderLineItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  taxAmount: {
    type: Number,
    required: true,
    default: 0
  },
  grandTotal: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Credit Card', 'Digital Wallet'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Refunded'],
    default: 'Completed'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);