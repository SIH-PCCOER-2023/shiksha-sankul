const mongoose = require("mongoose");

const TodolistSchema=mongoose.Schema({
    toDo:{
        type:String,
        required:true
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }
})

const toDo = mongoose.model("toDo", TodolistSchema);

module.exports = toDo;
