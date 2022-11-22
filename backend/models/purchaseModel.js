const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchaseSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    total: Number,
    items: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Purchase', purchaseSchema);
