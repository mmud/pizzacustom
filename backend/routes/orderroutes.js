const express = require('express');
const app = express.Router();
const {protect,admin}= require("../authMiddleware");
const order = require('../models/OrderModel');

app.post("/",protect,async(req,res)=>{
    try{
    const {userID,address,ings} =req.body;
    if(!userID||!address || !ings)
        return res.status(404).json({msg:"need data"});

    const power = await order.create({
        userID:userID,
        address:address,
        ings:ings
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
        const users = await order.find();
        res.status(200).json(users);
        
    }
    catch(e)
    {
        console.log(e);
    }
})

app.post("/delete",protect,async(req,res)=>{
    try{
    const {_id} =req.body;
        const codeExists = await order.findOne({_id:_id});

        if(!codeExists)
        {
            res.status(400).json({msg:"الكود غير موجود"});
        return;
        }

        await order.findOneAndDelete({_id:_id});

        res.status(200).json("done");
    }
    catch(e)
    {
        console.log(e);
    }
})

app.post("/edit",admin,async(req,res)=>{
    try{
        const {_id,userID,address,ings} =req.body;
    if(!_id||!userID||!address || !ings)
        return res.status(404).json({msg:"need data"});


    const code = await order.findByIdAndUpdate(_id,{
        userID:userID,
        address:address,
        ings:ings
    },{new:true});


    res.status(200).json("done");
    }
    catch(e)
    {
        console.log(e);
    }
})

module.exports = app;