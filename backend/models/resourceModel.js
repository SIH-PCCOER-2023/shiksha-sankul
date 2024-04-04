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
    topic:{
      type:String,
      enum:["basic","array","Sorting and Searching","stack","linked list","tree","graphs","hashing"],
      required:true

    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
const Resource = mongoose.model("Resource", resourceSchema);
module.exports = Resource;
