const mongoose = require('mongoose');

const fastLearningResourcesSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: [true, "title is required"],
    },
    url: {
        type: String,
        required: [true,"Please provide a URL"],
    },
    topic: String,
    learnerType: {
        type: String,
        enum: {
          values: ["slow", "fast"],
        },
        required: [true, "Learner type required"],
      },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const fastLearningResources = mongoose.model('fastLearningResources', fastLearningResourcesSchema);
module.exports = fastLearningResources;