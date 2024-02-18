const mongoose = require("mongoose");
const validator = require("validator");
const { Decimal128 } = require("bson");

const authController = require("./../controllers/authController");

const studentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    class: {
      type: String,
      trim: true,
      //required: [true, 'enter the class'],
    },
    rollno: {
      type: String,
      trim: true,
      unique: true,
      //required: [true, 'Enter the roll no '],
    },
    obtainedScores: {
      type: [Number],
      default: [],
    },
    //marks: [marks],
    /*predictedScore: {
      type: Number,
    },*/
    learnerType: {
      type: String,
      enum: {
        values: ["slow", "fast"],
      },
      //default: "UNKNOWN",
      required: [true, "Learner type required"],
    },
    preReqTestCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

studentSchema.post("save", async function (doc) {
  console.log("%s have been saved ", doc._id);
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
