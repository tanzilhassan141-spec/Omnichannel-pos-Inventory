const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Cashier', 'Manager', 'System Administrator'],
    default: 'Cashier',
    required: true
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store', // Yeh aage chalkar Store schema se link hoga
    required: function() {
      // Admin ke alawa sabka store se link hona zaroori hai
      return this.role !== 'System Administrator'; 
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);