const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const generateToken = require("../utils/jwtgenerate");

exports.getUsers = async(req, res) => {
  try{
  } 
  catch (error) {
    // Catch Unexpected Errors
    console.error('Error creating user:', error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error.',
    });
  }
};

exports.register=async(req,res)=>{
  try{
    const {UserName,Email,Address,Password1,Password2,Phone} = req.body;

    if(!UserName || !Email ||!Address|| !Password1 || !Password2 || !Phone)
      return res.status(400).json({msg:"الرجاء ادخال البيانات"});
    
    
    if(UserName.toLowerCase().replace(/ /g,'').length<6)
      return res.status(400).json({msg:"الأسم يجب ان يكون اكثر من 6 حروف"});
    

    if(!Email.toLowerCase().replace(/ /g,'')
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))
      return res.status(400).json({msg:"الرجاء كتابة بريد الكتروني صحيح"});
    

    if(!Phone.toLowerCase().replace(/ /g,'')
    .match(
        /^01[0125][0-9]{8}$/
    ))
      return  res.status(400).json({msg:"الرجاء كتابة رقم هاتف صحيح"});


    if(!Password1.replace(/ /g,'').match(/^[a-zA-Z\d]{6,}$/) )
      return res.status(400).json({msg:"كلمة المرور يجب ان تكون اكثر من 6 حرف"});
        

    if(Password1.replace(/ /g,'') != Password2.replace(/ /g,''))  
      return res.status(400).json({msg:"كلمة المرور غير مطابقة"});
    
    

    const userExists = await User.findOne({Email:Email.toLowerCase().replace(/ /g,'')});

    if(userExists)
      return res.status(400).json({msg:"البريد الاكتروني مستخدم بالفعل"});

    const userPhone = await User.findOne({Phone:Phone.replace(/ /g,'')});

    if(userPhone)
      return res.status(400).json({msg:"رقم الهاتف مستخدم بالفعل"});
    
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(Password1.replace(/ /g,''),salt);

    //token verify email
    var emailverifyToken = Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2);

    //create user
    const user = await User.create({
        UserName:UserName.toLowerCase().replace(/ /g,''),
        Email:Email.replace(/ /g,''),
        Password:hashedpassword,
        Role:"user",
        Phone:Phone.replace(/ /g,''),
        Address:Address,
        emailverifyToken,
        emailverifyTokenresendExpire:Date.now()+12*(60*60*1000),
        resetPasswordnextdate:Date.now()
    })
    if(user)
    {
        res.status(201).json({meg:"done"});
        
        //send verify email
        await sendEmail({
            to:Email.replace(/ /g,''),
            subject:"Verify Email",
            text:`
            <h1>You need to verify your email</h1>
            <p>Please go to this link to verify your email</p>
            <a href=${process.env.FRONTURL}/users/${user._id}/verify/${emailverifyToken} clicktracking=off>${process.env.FRONTURL}/users/${user._id}/verify/${emailverifyToken}</a>
            `
        });
    }
    else
      return res.status(500).json({msg:"الرجاء ادخال بيانات صحيحة"})
  } 
  catch (error) {
    // Catch Unexpected Errors
    console.error('Error creating user:', error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error.',
    });
  }
};

exports.login = async(req, res) => {
  try{
    const {Email,Password} = req.body;

      if(!Email || !Password)
      return res.status(400).json({msg:"الرجاء ادخال البيانات"});
      
      const user = await User.findOne({Email:Email});

      if(user &&(await bcrypt.compare(Password,user.Password)))
      {
          if(user.verified == false)
            return res.status(400).json({msg:"الرجاء تفعيل حسابك"});

          return res.status(201).json({
              id:user.id,
              name:user.UserName,
              email:user.Email,
              token:generateToken(user._id,user.Role)
          });
      }
      else
        return res.status(400).json({msg:"كلمة المرور او البريد الاكتروني"});
  } 
  catch (error) {
    // Catch Unexpected Errors
    console.error('Error creating user:', error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error.',
    });
  }
};

exports.getme = async(req, res) => {
  try{
    const {_id,UserName,Email,Role,Cart}=await User.findById(req.user.id);
    return res.status(200).json({
        _id:_id,
        UserName:UserName,
        Email:Email,
        Role:Role,
        Cart:Cart
    })
  } 
  catch (error) {
    // Catch Unexpected Errors
    console.error('Error creating user:', error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error.',
    });
  }
};

exports.verify = async(req, res) => {
  try{
      const {id,token}=req.body;
      if(!id||!token)
        return res.status(404).send({message:"not found"});

      const user = await User.findOne({_id:id,emailverifyToken:token});
      if(!user)
        return res.status(404).send({message:"not found"});
      await User.findByIdAndUpdate({_id:user._id},{verified:true,emailverifyToken:null})
      
      return res.status(200).send({message:"done"});
  } 
  catch (error) {
    // Catch Unexpected Errors
    console.error('Error creating user:', error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error.',
    });
  }
};

exports.resendverify = async(req, res) => {
  try{
    const {email}=req.body;
        if(!email)
          return res.status(400).json({msg:"الرجاء ادخال البيانات"});

        const user = await User.findOne({
            Email:email,
            emailverifyTokenresendExpire:{$lt:Date.now()}
        });
        if(!user)
          return res.status(404).send({msg:"لقد تجاوزت عدد المرات المسموح بها"});

        if(user.verified)
          return res.status(404).send({msg:"لقد تجاوزت عدد المرات المسموح بها"});

        var emailverifyToken = Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2);
        await User.findByIdAndUpdate({_id:user._id},{emailverifyToken:emailverifyToken,})
        await sendEmail({
            to:email.replace(/ /g,''),
            subject:"Verify Email",
            text:`
            <h1>You need to verify your email</h1>
            <p>Please go to this link to verify your email</p>
            <a href=${process.env.FRONTURL}/users/${user._id}/verify/${emailverifyToken} clicktracking=off>${process.env.FRONTURL}/users/${user._id}/verify/${emailverifyToken}</a>
            `
        });
        return res.status(200).send({msg:"تم اعادة ارسال ايميل التفعيل"});
  } 
  catch (error) {
    // Catch Unexpected Errors
    console.error('Error creating user:', error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error.',
    });
  }
};

exports.forgetpassword = async(req, res) => {
  try{
    const {email} = req.body;

    if(!email)
    return res.status(400).json({msg:"الرجاء ادخال البيانات"});
    
    const user = await User.findOne({Email:email,
        resetPasswordnextdate:{$lt:Date.now()}
    });

    if(user)
    {
        const resetToken = await Math.random().toString(36).split('.')[1];
        const resetPasswordExpire = Date.now()+10*(60*1000);
        const resetPasswordnextdate = Date.now()+12*(60*60*1000);
        await User.findOneAndUpdate({Email:email},{resetPasswordToken:resetToken,resetPasswordExpire:resetPasswordExpire,resetPasswordnextdate:resetPasswordnextdate});
        const resetURL = `${process.env.FRONTURL}/resetpassword/${resetToken}`;
        const mailmessage=`
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetURL} clicktracking=off>${resetURL}</a>
        `;

        //email send
        await sendEmail({
            to:email.replace(/ /g,''),
            subject:"Reset password",
            text:mailmessage
        });
        return res.status(200).send({msg:"تم ارسال ايميل تغير الكلمة المرور"});

    }
    else
      return res.status(404).send({msg:"لقد تجاوزت عدد المرات المسموح بها"});

  } 
  catch (error) {
    // Catch Unexpected Errors
    console.error('Error creating user:', error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error.',
    });
  }
};

exports.resetpassword = async(req, res) => {
  try{
    const user=await User.findOne({
        resetPasswordToken:req.params.token,
        resetPasswordExpire:{$gt:Date.now()}
    });

    if(!user)
        return res.status(400).json({msg:"لقد حدث خطاء حاول لاحقاً"})
    
    if(!req.body.Password.replace(/ /g,'').match(/^[a-zA-Z\d]{6,}$/) )
      return res.status(400).json({msg:"كلمة المرور يجب ان تكون اكثر من 6 حرف"});

    if(req.body.Password==req.body.Password2){
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.Password,salt);
        
        await User.findOneAndUpdate({Email:user.Email},{resetPasswordToken:null,resetPasswordExpire:null,Password:hashedpassword});
        return res.status(200).json({msg:"تم تغير كلمة السر"})
    }
    else
      return res.status(400).json({msg:"كلمة المرور غير متطابقة"})

  } 
  catch (error) {
    // Catch Unexpected Errors
    console.error('Error creating user:', error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error.',
    });
  }
};

exports.isloggedin = async(req, res) => {
  try{
    return res.status(200).send("logedin");
  } 
  catch (error) {
    // Catch Unexpected Errors
    console.error('Error creating user:', error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error.',
    });
  }
};