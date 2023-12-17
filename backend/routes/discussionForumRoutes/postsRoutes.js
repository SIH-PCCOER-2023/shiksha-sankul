const express = require("express");
const postController=require('../../controllers/discussionControllers/postController')

const router = express.Router();


router
.route('/')
.get(postController.getAllPost)

router.route('/create').post(postController.createPost)

router
.route('/:id')
.get(postController.getPost)
.patch(postController.updatePost)
 
module.exports=router;