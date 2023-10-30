const UserRoleController = require("../controllers/userRoleController");
const express = require("express");
const isAuthenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/roles", UserRoleController.get);

router.post("/roles/create", isAuthenticate, UserRoleController.create);
router.post("/roles/update", isAuthenticate, UserRoleController.update);
router.post("/roles/delete", isAuthenticate, UserRoleController.deleteUserRole);

module.exports = router;
