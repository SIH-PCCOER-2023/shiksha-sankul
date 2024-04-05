const express = require('express');
var multer = require('multer');
const ILPController=require('../../controllers/ILPControllers/ILPController.js');
const router=express.Router();

router
.route('/generateilp/:userId')
// .get(ILPController.getAll)
.post(ILPController.createILP)

// router
// .route("/:id")
// .patch(ILPController.updateILP)
// .get(ILPController.getILP)
// .delete(ILPController.deleteILP)
router
.route('/startworker/:userId')
.get(ILPController.createILP)

router.route('/:ilpId').get(ILPController.getIlpProgress).patch(ILPController.updateIlpProgress)
router.route('/createprogress').post(ILPController.createIlpProgress)



module.exports=router;