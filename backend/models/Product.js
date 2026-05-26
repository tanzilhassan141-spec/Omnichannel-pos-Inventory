const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  variants: {
    size: { type: String },
    color: { type: String }
  },
  basePrice: {
    type: Number,
    required: true
  },
  dynamicPricingRule: {
    type: String,
    enum: ['None', 'Bulk Discount', 'Holiday Sale', 'Clearance'],
    default: 'None'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// High-frequency search queries ke liye indexing 
productSchema.index({ name: 'text', sku: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);