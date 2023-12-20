const express = require('express');
const questionBankController = require('../controllers/questionBankController');

const router = express.Router();

router.route('/').get(questionBankController.getAll);
router.route('/getSet/:type/:count').get(questionBankController.getCount);
// .post(questionBankController.createOne)

router
  .route('/:id')
  // .patch(questionBankController.updateOne)
  .get(questionBankController.getOne);
// .delete(questionBankController.deleteOne)

router
  .route('/uploadQuestionBank')
  .post(questionBankController.bulkAddQuestions);
module.exports = router;
