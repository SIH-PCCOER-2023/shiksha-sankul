const mongoose = require("mongoose");
const { User } = require("./userModel");
const validator = require("validator");
//const { tagSchema } = require("./discussionModels/tagModel");
const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    minlength: 10,
    maxlength: 80,
  },

  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  views: {
    type: Number,
    default: 1,
    min: 1,
  },
  upvotes: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true],
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
