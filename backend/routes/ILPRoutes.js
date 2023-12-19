const express = require('express');
var multer = require('multer');
const ILPController=require('../controllers/ILPController.js');
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


router
.route('/templates/')
.get(ILPController.getAllILPTemplates)
.post(ILPController.createILPTemplate)

router
.route("/:id")
// .patch(ILPController.updateILP)
.get(ILPController.generateILPfromTemplate)
// .delete(ILPController.deleteILP)


// router.route("/upload").post(upload.single("uploadfile"), importExcel)

module.exports=router;