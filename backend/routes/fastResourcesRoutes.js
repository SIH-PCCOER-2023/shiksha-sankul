const express = require("express");
const fastLearningResourcesController = require("./../controllers/fastResourcesController");
const router = express.Router();

router.post("/bulkadd", fastLearningResourcesController.bulkAddResources);
//router.route('/getResources').get(fastLearningResourcesController.)

router
  .route("/")
  .get(fastLearningResourcesController.getAll)
  .post(fastLearningResourcesController.createOne);

router
  .route("/:id")
  .patch(fastLearningResourcesController.updateOne)
  .get(fastLearningResourcesController.getOne)
  .delete(fastLearningResourcesController.deleteOne);

module.exports = router;
