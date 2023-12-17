const express = require("express");
const userController=require('../../controllers/discussionControllers/userController')

const router = express.Router();



router
.route('/register')
.post(userController.updateUser);

router.route('/:id').get(userController.getUser);

router.route('/me').get(userController.get);

router.route('/login').post(userController.update);

module.exports=router;
