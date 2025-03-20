const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  UserName:{
      type:String,
      required:true,
      trim:true
  },
  Email:{
      type:String,
      required:true,
      unique:true
  },
  Phone:{
      type:String,
      required:true,
      unique:true
  },
  Password: {
      type: String,
      required:true
  },
  Role:{
      type:String,
      default:"member"
  },
  Address:{
    type:String,
    required:true
  },
  SavedPizza:[{type:mongoose.Types.ObjectId,ref:'Pizza'}],
  Cart:[{type:mongoose.Types.ObjectId,ref:'CartItem'}],
  verified:{
      type:Boolean,
      default:false
  }
  ,
  emailverifyToken:String,
  emailverifyTokenresendExpire:Date,
  resetPasswordToken:String,
  resetPasswordExpire:Date,
  resetPasswordnextdate:Date
},
{
  timestamps:true
});
module.exports = mongoose.model('User', UserSchema);