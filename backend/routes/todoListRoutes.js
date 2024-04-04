const express = require("express");
const todoListController=require('./../controllers/todoListController')
const router = express.Router();


router.route("/").get(todoListController.getAll)

router.route("/:id").get(todoListController.getOne).post(todoListController.createOne);
router.route("/:todoId").patch(todoListController.updateOne).delete(todoListController.deleteOne);

//router.route("/:userId/:todoId").patch(todoListController.updateOne).delete(todoListController.deleteOne);


module.exports = router;