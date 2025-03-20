const ingm = require("../models/ing.model");

// exports.getUsers = async(req, res) => {
//   try{
//   } 
//   catch (error) {
//     // Catch Unexpected Errors
//     console.error('Error creating user:', error);
//     res.status(500).json({
//         success: false,
//         message: 'Internal Server Error.',
//     });
//   }
// };

exports.addIng = async(req, res) => {
  try{
    const {Name,Level,Price,Imgbig,Imgsmall} =req.body;
    if(!Name||!Level || !Price || !Imgbig || !Imgsmall)
        return res.status(404).json({msg:"need data"});

        let timeq =Date.now ()+"q";
        let timea =Date.now ()+"a";
        var base64Dataq = Imgbig.replace("data:image/*;base64,", "");
        var base64Dataa = Imgsmall.replace("data:image/*;base64,", "");
    
        require("fs").writeFile(__dirname+`/../imgs/${timeq}.png`, base64Dataq, 'base64', function(err) {
          console.log(err);
        });   

        require("fs").writeFile(__dirname+`/../imgs/${timea}.png`, base64Dataa, 'base64', function(err) {
            console.log(err);
          }); 
        //`/imgs/${time}.png`

    await ingm.create({
        Name:Name,
        Imgbig:`/imgs/${timeq}.png`,
        Imgsmall:`/imgs/${timea}.png`,
        Level:Level,
        Price:Price
    });

    return res.status(200).json("done");
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

exports.getIngs = async(req, res) => {
  try{
      let num = req.query.num;
      let type = req.query.type;
      let s = req.query.s;
      if(s==""){
        const ings = await ingm.find().skip((num-1)*10).limit(10);
        return res.status(200).json(ings);
      }
      else if(type=="Name"){
        const ings = await ingm.find({Name: {$regex:  s}}).skip((num-1)*10).limit(10);
        return res.status(200).json(ings);
      }
      else{
        const ings = await ingm.find().skip((num-1)*10).limit(10);
        return res.status(200).json(ings);
      }
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

exports.deleteIng = async(req, res) => {
  try{
    const {_id} =req.body;
        const ing = await ingm.findOne({_id:_id});

        if(!ing)
          return res.status(400).json({msg:"الكود غير موجود"});

        await ingm.findOneAndDelete({_id:_id});

        res.status(200).json("done");
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

exports.editIng = async(req, res) => {
  try{
    const {_id,Name,Level,Price,Imgbig,Imgsmall} =req.body;
    if(_id||!Name||!Level || !Price || !Imgbig || !Imgsmall)
        return res.status(404).json({msg:"need data"});

    let timeq =Date.now ()+"q";
    let timea =Date.now ()+"a";
    if(Qimg.includes("data:image/*;base64,"))
    {
    var base64Dataq = Imgbig.replace("data:image/*;base64,", "");
    require("fs").writeFile(__dirname+`/../imgs/${timeq}.png`, base64Dataq, 'base64', function(err) {
        console.log(err);
      });      
    }
    if(Aimg.includes("data:image/*;base64,"))
    {
    var base64Dataa = Imagsmall.replace("data:image/*;base64,", "");
    require("fs").writeFile(__dirname+`/../imgs/${timea}.png`, base64Dataa, 'base64', function(err) {
        console.log(err);
      }); 
    //`/imgs/${time}.png`
    }
    await ingm.findByIdAndUpdate(_id,{
        Imgbig:Imgbig.includes("data:image/*;base64,")?`/imgs/${timeq}.png`:Imgbig,
        Imgsmall:Imgsmall.includes("data:image/*;base64,")?`/imgs/${timea}.png`:Imgsmall,
        Name:Name,
        Price:Price,
        Level:Level
    },{new:true});

    return res.status(200).json("done");
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