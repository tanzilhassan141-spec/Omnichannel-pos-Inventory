const mongoose = require('mongoose');

const inventoryLedgerSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  reorderPoint: {
    type: Number,
    default: 10
  },
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

// Ek store mein ek product ka ek hi ledger entry hona chahiye
inventoryLedgerSchema.index({ storeId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('InventoryLedger', inventoryLedgerSchema);