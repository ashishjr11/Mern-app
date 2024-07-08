const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  dateOfSale: { type: Date, required: true },
  sold: { type: Boolean, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;