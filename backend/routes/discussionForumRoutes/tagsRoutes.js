const express = require("express");
const tagsController=require('./../../controllers/discussionControllers/tagController')

const router = express.Router();



router.route('/').get(tagsController.getAllTag).post(tagsController.createTag);


//router.route('/').post(tagsController.createTag);

module.exports=router;