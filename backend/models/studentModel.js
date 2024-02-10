const mongoose = require("mongoose");
const validator = require("validator");
const { Decimal128 } = require("bson");

// const marks = mongoose.Schema({
//   name: {
//     type: String,
//     enum: {
//       values: [
//         '10th',
//         '12th',
//         'FE SEM1',
//         'FE SEM2',
//         'SE SEM1',
//         'SE SEM2',
//         'TE SEM1',
//         'TE SEM2',
//         'BE SEM1',
//         'BE SEM2',
//       ],
//       message: 'The value {VALUE} is not supported',
//     },
//   },
//   completionDate: Date,
//   marksObtained: Decimal128,
//   totalMarks: Number,
// });

const studentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    class: {
      type: String,
      trim: true,
      required: [true, "enter the class"],
    },
    rollno: {
      type: String,
      trim: true,
      required: [true, "Enter the roll no "],
    },
    // marks: [marks],
    // predictedScore: {
    //   type: Number,
    // },
    learnerType: {
      type: String,
      enum: {
        values: ["slow", "fast", "UNKNOWN"],
      },
      default: "UNKNOWN",
      required: [true, "Learner type required"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
