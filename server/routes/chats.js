const express = require("express");
const router = express.Router();
const chatsController = require("../controllers/chatsController");
const auth = require("../middleware/auth");

router.route("/").all(auth.verifyToken).get(chatsController.getChatList);

router.route("/:otherId").all(auth.verifyToken).get(chatsController.getOrCreateRoom);

module.exports = router;
