const mongoose = require("mongoose");

const slowLearningResourcesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    url: {
      type: String,
      required: [true, "Please provide a URL"],
    },
    //topic: String,
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

const slowLearningResources = mongoose.model(
  "slowLearningResources",
  slowLearningResourcesSchema
);
module.exports = slowLearningResources;
