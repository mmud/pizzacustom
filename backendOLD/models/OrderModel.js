const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    ings:[{type:mongoose.Types.ObjectId,ref:'Ing'}],
    userID:{type:mongoose.Types.ObjectId,ref:'Ing'}
},
{
    timestamps:true
});

module.exports = mongoose.model('Order',OrderSchema);