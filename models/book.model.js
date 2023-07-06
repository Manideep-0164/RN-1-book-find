const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    Title:{type:String, required:true},
    Author:{type:String, required:true},
    Genre :{type:String, required:true, enum:['Fiction', 'Science', 'Comic']},
    Description:{type:String, required:true},
    Price:{type:Number, required:true},
},{versionKey:false});


const BookModel = mongoose.model("Book", bookSchema);

module.exports = {BookModel};