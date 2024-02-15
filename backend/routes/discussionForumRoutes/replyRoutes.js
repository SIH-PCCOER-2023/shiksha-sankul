const express = require("express");
const replyController=require('../../controllers/discussionControllers/replyController')

const router = express.Router();


router
.route('/:id')
.get(replyController.getReply).patch(replyController.updateReply)

router
.route('/create/:id')
.post(replyController.createReply)

// router
// .route('/like/:id')
// .patch(replyController.updateReply)

module.exports=router;