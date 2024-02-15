const mongoose = require("mongoose");
const validator = require("validator");

const pdfSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    link: {
      type: String,
      required: [true, "Please provide a link"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Pdf = mongoose.model("Pdf", pdfSchema);
module.exports = Pdf;
