const express = require('express');
const resourceController = require('../controllers/resourceController.js');
const router = express.Router();

router.post('/bulkadd', resourceController.bulkAddResources)
router.route('/getResources').get(resourceController.getAll)

router
  .route('/')
  .get(resourceController.classifyResources)
  .post(resourceController.createOne);

router
  .route('/:id')
  .patch(resourceController.updateOne)
  .get(resourceController.getOne)
  .delete(resourceController.deleteOne);

module.exports = router;