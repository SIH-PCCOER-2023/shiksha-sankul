const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please specify question"],
  },
  questionType: {
    type: String,
    enum: ["ACADEMIC", "COGNITIVE", "LEARNING STYLE", "COMMUNICATION"],
    required: [true, "Please specify question type"],
  },
  subject: {
    type: String,
    required: [true, "please enter the subject"],
  },
  topic: {
    type: String,
    required: [true, "please enter the topic "],
  },
  subtopic: {
    type: String,
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
    required: [true, "please enter the marks "],
  },
  level: {
    type: String,
    required: [true, "please enter the level "],
  },
  explanation: {
    type: String,
  },
});

const QuestionBank = mongoose.model("QuestionBank", questionSchema);

module.exports = QuestionBank;
