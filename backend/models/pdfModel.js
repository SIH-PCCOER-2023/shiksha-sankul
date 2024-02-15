const mongoose = require("mongoose");
const validator = require("validator");

const pdfSchema = mongoose.Schema(
  {
    topic: {
      type: String,
      required: [true, "title is required"],
    },
    author: {
      type: String,
      required: [true, "Please provide a author"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Pdf = mongoose.model("Pdf", pdfSchema);
module.exports = Pdf;
