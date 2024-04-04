const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const APIFeatures = require("../../utils/apiFeatures");
const factory = require("../handlerFactory");

const Reply = require("./../../models/replyModel");
const Post = require("./../../models/postModel");
//const User = require(../../models/replyM);

exports.createReply = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("There is no such post with this ID", 404));
  }
  const reply = new Reply({
    post: req.params.id,
    comment: req.body.comment,
    author: req.body.author,
    //upvotes:req.body.upvotes

  });
  await reply.save();

  const reply_populated = await Reply.find({ _id: reply._id }); //.populate(
  // "author")
  //).populate("upvotes");
  //const done=await Reply.create(req.body)

  res.status(200).json({
    status: "success",
    data: {
      data: reply_populated, //reply prodeuced
    },
  });
});
exports.updateReply = catchAsync(async (req, res, next) => {
  const reply = await Reply.findByIdAndUpdate(req.params.id, req.body); // Find the reply by its ID
  console.log("Found Reply:", reply);
  if (!reply) {
    return next(new AppError("Reply doesn't exist", 404));
  }

  // Check if the author of the reply is the same as the user making the request
  // if (reply.author.toString() === req.user._id.toString()) {
  //   return res.status(400).send("You can't upvote your own reply");
  // }

  // Update the upvotes array based on user ID
  // const upvoteArray = reply.upvotes;
  // const index = upvoteArray.indexOf(req.user._id);
  // if (index === -1) {
  //   upvoteArray.push(req.user._id);
  // } else {
  //   upvoteArray.splice(index, 1);
  // }
  // reply.upvotes = upvoteArray;

  // Save the updated reply

  // Populate the reply with author details
  // const reply_new = await Reply.findById(reply._id).populate("author").populate();

  // Send the updated reply as a response
  res.status(200).json({
    status: "success",
    data: {
      data: reply,
    },
  });
});

exports.getReply = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("Post doesn't exist", 404));
  }

  // Find all replies for the post and populate the author details
  // const replies = await Reply.find({ post: req.params.id }).populate("author" ,"name").exec()
  // console.log(replies.author)
  const replies = await Reply.find({ post: req.params.id })
    .populate({
      path: "author",
      select: "name -_id", // Specify to include only the 'name' field of the 'author'
    })
    .exec();

  replies.forEach((reply) => {
    if (reply.author) {
      delete reply.author.id;
    }
  });

  // Iterate through each reply to calculate the upvote count
  // const repliesWithUpvoteCount = await Promise.all(replies.map(async (reply) => {
  //   // Calculate the upvote count for the reply
  //   const upvoteCount = reply.upvotes.length;

  //   // Create a new object containing the reply data along with the upvote count
  //   return {
  //     _id: reply._id,
  //     comment: reply.comment,
  //     author: reply.author,
  //     upvoteCount: upvoteCount
  //   };
  // }));

  // Send the response with the populated replies
  res.status(200).json({
    status: "success",
    data: {
      replies,
    },
  });
});
