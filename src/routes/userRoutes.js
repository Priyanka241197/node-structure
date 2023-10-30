const UserController = require("../controllers/userController");
const AuthController = require("../controllers/authController");
const express = require("express");
const isAuthenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/users", UserController.get);
router.get("/user", isAuthenticate, UserController.getByToken);
router.get("/users/:id", isAuthenticate, UserController.getById);
router.post("/users/active", UserController.userStatus);

router.post("/login", AuthController.login);
router.post("/signup", UserController.create);

module.exports = router;
