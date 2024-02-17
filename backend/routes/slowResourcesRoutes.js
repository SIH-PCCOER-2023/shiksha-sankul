const express = require("express");
const slowLearningResourcesController = require("./../controllers/slowResourcesController");
const router = express.Router();

router.post("/bulkadd", slowLearningResourcesController.bulkAddResources);
//router.route('/getResources').get(slowLearningResourcesController.)

router
  .route("/")
  .get(slowLearningResourcesController.getAll)
  .post(slowLearningResourcesController.createOne);

router
  .route("/:id")
  .patch(slowLearningResourcesController.updateOne)
  .get(slowLearningResourcesController.getOne)
  .delete(slowLearningResourcesController.deleteOne);

module.exports = router;
