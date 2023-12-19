const express = require('express');
const facultyController = require('../controllers/facultyController');
const ILPTemplateRoutes = require('./ILPRoutes/ILPTemplateRoutes');
const StudentRoutes = require('./studentRoutes.js');
const router = express.Router();


router.use('/manageilptemplates/', ILPTemplateRoutes);
router.use('/managestudent', StudentRoutes)

router
  .route('/')
  .get(facultyController.getAll)
  .post(facultyController.createOne);

router
  .route('/:id')
  .patch(facultyController.updateOne)
  .get(facultyController.getOne)
  .delete(facultyController.deleteOne);


module.exports = router;
