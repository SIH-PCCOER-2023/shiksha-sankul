const express = require('express');
var multer = require('multer');
const ILPController=require('../../controllers/ILPControllers/ILPController.js');
const router=express.Router();

router
.route('/')
// .get(ILPController.getAll)
.post(ILPController.createILP)

router
.route("/:id")
.patch(ILPController.updateILP)
.get(ILPController.getILP)
.delete(ILPController.deleteILP)

module.exports=router;