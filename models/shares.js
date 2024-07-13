const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 
const sharedetailsSchema = new Schema({
 
    share_name: {
        type: String,
        required: true
      },

    share_price: {
        type: Array,
        required: true
      }
});
 
module.exports = mongoose.model('ShareDetails', sharedetailsSchema);