const mongoose = require("mongoose");
const validator = require("validator");

const slowLearnerPdfSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    link: {
      type: String,
      required: [true, "Please provide a link"],
    },
    learnerType: {
        type: mongoose.Types.ObjectId,
        ref: "Student",
      },
    resourcesType: {
        type: String,
        enum: {
          values: ["slowresource", "fastresource"],
        },
      },
    },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const slowLearnerPdf = mongoose.model("slowLearnerPdf", slowLearnerPdfSchema);
module.exports = slowLearnerPdf;
