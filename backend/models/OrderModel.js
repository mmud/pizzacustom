const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    address:{
        type:String,
        required:true,
        trim:true
    },
   
    ings:[{type:mongoose.Types.ObjectId,ref:'Ing'}],
    userID:{type:mongoose.Types.ObjectId,ref:'Ing'}
},
{
    timestamps:true
});

module.exports = mongoose.model('Order',OrderSchema);