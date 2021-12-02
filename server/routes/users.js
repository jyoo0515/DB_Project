const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const auth = require("../middleware/auth");

router.route("/unique/:userId").get(usersController.checkUnique);

router.route("/me").all(auth.verifyToken).get(usersController.me).patch(usersController.update);

router.route("/nearby").all(auth.verifyToken).get(usersController.nearby);

router.route("/logout").all(auth.verifyToken).get(usersController.logout);

router.route("/register").post(usersController.register);

router.route("/login").post(usersController.login);

router.route("/:userId").all(auth.verifyToken).get(usersController.search).delete(usersController.delete);

module.exports = router;
