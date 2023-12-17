const express = require("express");
const tagsController=require('../../controllers/discussionControllers/tagsController')

const router = express.Router();



router.route('/').get(tagsController.getAllTag);


router.route('/').post(tagsController.createTag);

module.exports=router;