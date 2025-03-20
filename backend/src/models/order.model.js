const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({
    UserId:{type:mongoose.Types.ObjectId,ref:'User'},
    Pizzas:[{type:mongoose.Types.ObjectId,ref:'CartItem'}],
    TotalPrice: {
        type: Number,
        required:true
    },
    Status: {
        type: String,
        required:true
    }
},
{
    timestamps:true
});

module.exports = mongoose.model('Order',OrderSchema);