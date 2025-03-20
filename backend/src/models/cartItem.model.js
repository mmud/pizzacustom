const mongoose = require('mongoose');
const CartItemSchema = mongoose.Schema({
    Pizza:{type:mongoose.Types.ObjectId,ref:'Pizza'},
    Count: {
        type: Number,
        required:true,
        default:1
    },
},
{
    timestamps:true
});

module.exports = mongoose.model('CartItem',CartItemSchema);