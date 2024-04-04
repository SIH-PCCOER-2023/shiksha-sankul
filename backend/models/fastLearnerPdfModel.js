const mongoose = require("mongoose");
const validator = require("validator");

const fastLearnerPdfSchema = mongoose.Schema(
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

const fastLearnerPdf = mongoose.model("fastLearnerPdf", fastLearnerPdfSchema);
module.exports = fastLearnerPdf;
