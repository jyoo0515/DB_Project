const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const auth = require("../middleware/auth");

router.route("/").get(usersController.getAll);

router.route("/me").all(auth.verifyToken).get(usersController.me);

router.route("/logout").all(auth.verifyToken).get(usersController.logout);

router.route("/:userId").get(usersController.search).delete(usersController.delete);

router.route("/register").post(usersController.register);

router.route("/login").post(usersController.login);

module.exports = router;
