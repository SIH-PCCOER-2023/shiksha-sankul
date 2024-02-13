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
      required: [true, "URL is required"],
    },
    topic: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// resourceSchema.virtual("type").get(function () {
//   if (!this.type2) {
//     return [this.type1];
//   }
//   return [this.type1, this.type2];
// });
const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
