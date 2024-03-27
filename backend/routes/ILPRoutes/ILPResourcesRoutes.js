const express = require('express');
var multer = require('multer');
const ILPTemplateController = require('../../controllers/ILPControllers/ILPTemplateController');
const ILPResourcesController=require('../../controllers/ILPControllers/ILPResourcesController');
const router = express.Router();

router.route('/:studentId').get(ILPResourcesController.createResourcesILP)
module.exports=router;