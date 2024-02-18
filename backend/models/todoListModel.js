const mongoose = require("mongoose");

const TodolistSchema=mongoose.Schema({
    toDo:{
        type:String,
        required:true
    }
})

const toDo = mongoose.model("toDo", TodolistSchema);

module.exports = toDo;
