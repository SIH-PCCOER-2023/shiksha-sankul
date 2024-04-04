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
      incorrectQuestions:
      [
        {
          type: mongoose.Types.ObjectId,
          ref: "QuestionBank",
        }
      ],
    obtainedScore: {
      type: Number,
      required: [true, "Please specify obtained score"],
    },
    totalScore: {
      type: Number,
      required: [true, "Please specify total score"],
    },
    learnerType: {
      type: String,
      enum: {
        values: ["slow", "fast"],
      },
      default: "slow",
      required: [true, "learnerType should be mentioned"],
    },
  },

  { timestamps: true }
);

// // Pre-save hook to append the new test document to the existing test documents for the same student ID
// // and delete the previously created test document
// testSchema.pre("save", async function (next) {
//   try {
//     // Find all previous tests for the same student ID
//     const previousTests = await Test.find({
//       "student": this.student,
//     });

//     // If previous tests exist, append the new test document to the array
//     if (previousTests.length > 0) {
//       // Set the array with all test documents for the same student, including the current test
//       this.set("0", previousTests.concat(this));

//       // Delete the previously created test document(s)
//       await Test.deleteMany({
//         "student": this.student,
//         "_id": { $ne: this._id }, // Exclude the current test document
//       });
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// });



   
// //Pre-save hook to append the new questions and incorrect questions to the existing test document for the same student ID
// testSchema.pre("save", async function (next) {
//   try {
//     const existingTest = await Test.findOne({
//       student: this.student,
//     });

//     if (existingTest) {
//       existingTest.questions = existingTest.questions.concat(this.questions);
//       existingTest.incorrectQuestions = existingTest.incorrectQuestions.concat(
//         this.incorrectQuestions
//       );
//       // Update other fields if needed

//       await existingTest.save();
//     }

//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
