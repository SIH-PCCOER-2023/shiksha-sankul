const mongoose = require('mongoose');

const learningResourcesSchema = new mongoose.Schema(
  {
    title: String,
    topic: String,
    type: String,
    url: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const LearningResources = mongoose.model('LearningResources', learningResourcesSchema);
module.exports.LearningResources = LearningResources;
