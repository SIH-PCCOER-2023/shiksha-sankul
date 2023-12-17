const express = require('express');
const universityController = require('./../controllers/universityController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(universityController.getAllUniversities)
  .post(universityController.createUniversity);

router.get('/getUniOfUser', universityController.getUniversityOfUser);

router.get('/:id/getAllDepartments', universityController.getAllDepartments);

router.patch(
  '/:id/uploadSyllabus',
  universityController.uploadS3,
  universityController.uploadSyllabus
);

router
  .route('/:id')
  .get(universityController.getUniversity)
  .patch(universityController.updateUniversity)
  .delete(universityController.deleteUniversity);

module.exports = router;
