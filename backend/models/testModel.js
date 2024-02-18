const mongoose = require("mongoose");

const testSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
    },
    questions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "QuestionBank",
      },
    ],

    obtainedScore: 
      {
        type: Number,
        required: [true, "Please specify obtained score"],
      },
    

    totalScore: {
      type: Number,
      required: [true, "Please specify total score"],
    },
    // learnerType:{
    //     type: String,
    //     enum:{
    //         values:[ "SLOW", "FAST","UNKNOWN"],

    //     },
    //     default:"UNKNOWN",
    //     required:[true,'learnerType should be mentioned']
    // }
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
