const express=require('express');
const criteriaController=require('../controllers/criteriaController');
const router = require('./discussionForumRoutes/replyRoutes');

router
.route('/changecriteria')
.post(criteriaController.createCriteria);

module.exports=router;