const express = require("express");
const router = express.Router();
const chatsController = require("../controllers/chatsController");
const auth = require("../middleware/auth");

router.route("/").all(auth.verifyToken).get(chatsController.getChatList).post(chatsController.create);

router.route("/:chatRoomId").all(auth.verifyToken).get(chatsController.getChats);

module.exports = router;
