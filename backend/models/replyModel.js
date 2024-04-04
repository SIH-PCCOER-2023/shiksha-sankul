const mongoose = require("mongoose");
const { User } = require("./userModel");

const replySchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    //required: true,
  },
  comment: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 5000,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    //required: true,
  },
  upvotes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

// replySchema.pre(/^find/, function (next) {
//     this.populate("author", "name");
  
//     next();
// });
const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
