const express = require("express");
const router = express.Router();
const NotToDoController = require("../controllers/nottodolist");

router.post("/", NotToDoController.create);
router.delete("/", NotToDoController.delete);
router.patch("/", NotToDoController.update);
router.get("/", NotToDoController.get);
router.get("/:id", NotToDoController.getById);

module.exports = router;
