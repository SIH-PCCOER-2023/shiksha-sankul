const mongoose = require("mongoose");
const validator = require("validator");

const resourceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    // type1:String,
    // type2:String,
    url: {
      type: String,
      required: [true,"Please provide a URL"],
    },
    topic: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
const Resource = mongoose.model("Resource", resourceSchema);
module.exports = Resource;
