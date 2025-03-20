const mongoose = require('mongoose');
const IngSchema = mongoose.Schema({
    Name: {
        type: String,
        required:true
    },
    Level: {
        type: Number,
        required:true
    },
    Price: {
        type: String,
        required:true
    },
    Imgbig: {
        type: String,
        required:true
    },
    Imgsmall: {
        type: String,
        required:true
    },
},
{
    timestamps:true
});

module.exports = mongoose.model('Ing',IngSchema);