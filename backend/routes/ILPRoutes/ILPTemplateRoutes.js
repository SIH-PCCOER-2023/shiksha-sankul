const express = require('express');
var multer = require('multer');
const ILPController = require('../../controllers/ILPControllers/ILPController');
const ILPTemplateController = require('../../controllers/ILPControllers/ILPTemplateController');
const router = express.Router();

router
  .route('/')
  .get(ILPTemplateController.getAllILPTemplates)
  .post(ILPTemplateController.createILPTemplate);

router
  .route('/:id')
  .patch(ILPTemplateController.updateILPTemplate)
  .get(ILPTemplateController.getILPTemplate)
  .delete(ILPTemplateController.deleteILPTemplate);

router.route('/generateILP/:id').get(ILPTemplateController.generateILPfromTemplate)

module.exports = router;
