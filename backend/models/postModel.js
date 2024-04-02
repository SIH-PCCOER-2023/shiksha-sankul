const mongoose = require("mongoose");
const { User } = require("./userModel");
const validator = require("validator");
const { tagSchema } = require("./discussionModels/tagModel");
const PostSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "title is required"],
    minlength: 5,
    maxlength: 80,
    //unique: true,
  },

  description: {
    type: String,
    minlength: 5,
    maxlength: 1024,
  },
  // views: {
  //   type: Number,
  //   default: 1,
  //   min: 1,
  // },
  upvotes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  time: {
    type: Date,
    default: Date.now,
  },
});
// PostSchema.pre(/^find/, function (next) {
//   this.populate("upvotes").populate("author");

//   next();
// });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
