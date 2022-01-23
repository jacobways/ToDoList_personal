const express = require("express");
const router = express.Router();
const ToDoController = require("../controllers/todolist");

router.post("/", ToDoController.create);
router.delete("/", ToDoController.delete);
router.patch("/", ToDoController.update);
router.get("/", ToDoController.get);
router.get("/:id", ToDoController.getById);

module.exports = router;
