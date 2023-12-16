const mongoose = require("mongoose");
const validator = require("validator");

const questionSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter your name"],
    },
    subject: {
        type: String,
        required: [true, "please enter the topic "],
    },
    topic: {
        type: String,
        required: [true, "please enter the topic "],
    },
    subtopic: {
        type: String,
        required: [true, "please enter the subtopic "],
    },
    A: {
        type: String,
    },
    B: {
        type: String,
    },
    C: {
        type: String,
    },
    D: {
        type: String,
    },
    correctanswer: {
        type: String,
        required: [true, "give the corrected answer"],
    },
    marks: {
        type: Number,
        required: [true, "please enter the topic "],
    },
    level: {
        type: String,
        required: [true, "please enter the topic "],
    },
    explanation: {
        type: String,
    },
});

const QuestionBank = mongoose.model("QuestionBank", questionSchema);

module.exports = QuestionBank;
