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
        enum: ['In Making', 'shipped', 'delivered', 'cancelled'],
        required:true
    },
    PaymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
    PaymentIntentId: {
        type: String, 
    }
},
{
    timestamps:true
});

module.exports = mongoose.model('Order',OrderSchema);