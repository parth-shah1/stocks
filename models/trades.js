const { Int32 } = require('bson');
const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 
const tradesSchema = new Schema({

    uid: { 
        type: Schema.Types.ObjectId, 
        ref: 'user' 
      },
 
    amount: {
        type: Number,
        required: true
      },

      tcs: {
        type: [Number],
        required: true
      },

      hdfc: {
        type: Array,
        required: true
      },

      bpcl: {
        type: Array,
        required: true
      },

      heromotocorp: {
        type: Array,
        required: true
      },

      pfizer: {
        type: Array,
        required: true
      },


});
 
module.exports = mongoose.model('Trades', tradesSchema);