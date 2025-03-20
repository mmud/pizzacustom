const express = require('express');
const app = express.Router();
const {protect,admin}= require("../authMiddleware");
const ingm = require('../models/IngModel');

app.post("/",admin,async(req,res)=>{
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

    const power = await ingm.create({
        Name:Name,
        Imgbig:`/imgs/${timeq}.png`,
        Imgsmall:`/imgs/${timea}.png`,
        Level:Level,
        Price:Price
    });

    res.status(200).json("done");
    }
    catch(e)
    {
        console.log(e);
    }
})

app.get("/",protect,async(req,res)=>{
    try{
        let num = req.query.num;
        let type = req.query.type;
        let s = req.query.s;
        if(s==""){
        const users = await ingm.find().skip((num-1)*10).limit(10);
        res.status(200).json(users);
    }
        else if(type=="Name"){
            const users = await ingm.find({Name: {$regex:  s}}).skip((num-1)*10).limit(10);
            res.status(200).json(users);
        }
        else{
            const users = await ingm.find().skip((num-1)*10).limit(10);
            res.status(200).json(users);
        }
    }
    catch(e)
    {
        console.log(e);
    }
})

app.post("/delete",admin,async(req,res)=>{
    try{
    const {_id} =req.body;
        const codeExists = await ingm.findOne({_id:_id});

        if(!codeExists)
        {
            res.status(400).json({msg:"الكود غير موجود"});
        return;
        }

        await ingm.findOneAndDelete({_id:_id});

        res.status(200).json("done");
    }
    catch(e)
    {
        console.log(e);
    }
})

app.post("/edit",admin,async(req,res)=>{
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
    const code = await ingm.findByIdAndUpdate(_id,{
        Imgbig:Imgbig.includes("data:image/*;base64,")?`/imgs/${timeq}.png`:Imgbig,
        Imgsmall:Imgsmall.includes("data:image/*;base64,")?`/imgs/${timea}.png`:Imgsmall,
        Name:Name,
        Price:Price,
        Level:Level
    },{new:true});


    res.status(200).json("done");
    }
    catch(e)
    {
        console.log(e);
    }
})

module.exports = app;