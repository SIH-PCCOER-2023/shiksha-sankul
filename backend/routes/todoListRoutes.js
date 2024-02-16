const express = require("express");
const todoListController=require('./../controllers/todoListController')
const router = express.Router();


router.route("/").get(todoListController.getAll).post(todoListController.createOne);

router
  .route("/:id")
  .get(todoListController.getOne)
  .patch(todoListController.updateOne)
  .delete(todoListController.deleteOne);


module.exports = router;