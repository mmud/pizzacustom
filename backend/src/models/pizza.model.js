const mongoose = require('mongoose');
const PizzaSchema = mongoose.Schema({
    UserId:{type:mongoose.Types.ObjectId,ref:'User'},
    Ings:[{type:mongoose.Types.ObjectId,ref:'Ing'}]
},
{
    timestamps:true
});

module.exports = mongoose.model('Pizza',PizzaSchema);