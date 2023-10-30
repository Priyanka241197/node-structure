const express = require("express");
const MultipleDataController = require("../controllers/multipleDataController");
const router = express.Router();

router.get("/multiple", MultipleDataController.get);
router.post("/multiple/create", MultipleDataController.create);
router.post("/multiple/update", MultipleDataController.update);

router.delete("/multiple/:id", MultipleDataController.delete);

module.exports = router;
