const express = require("express");
const postController = require("./../../controllers/discussionControllers/postController");

const router = express.Router();

router.route("/").get(postController.getAllPost);

router.route("/create").post(postController.createPost);

router
  .route("/:id")
  .get(postController.getPost)
  .patch(postController.updatePost);

router.route("/upvote/:userId/:postId").patch(postController.updateVote);

module.exports = router;
