const express = require("express");
const SpController = require("../controllers/spController");
const router = express.Router();

router.get("/sp", SpController.get);
router.get("/sp/getuser", SpController.getUser);

module.exports = router;
