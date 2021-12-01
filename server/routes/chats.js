const express = require("express");
const router = express.Router();
const chatsController = require("../controllers/chatsController");
const auth = require("../middleware/auth");

router.route("/").all(auth.verifyToken).get(chatsController.getChats).post(chatsController.create);

module.exports = router;
