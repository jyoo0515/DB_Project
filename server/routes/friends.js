const express = require("express");
const router = express.Router();
const friendsController = require("../controllers/friendsController");
const auth = require("../middleware/auth");

router.route("/").all(auth.verifyToken).get(friendsController.getAll).post(friendsController.addFriend);

router.route("/:friendId").all(auth.verifyToken).delete(friendsController.deleteFriend);

module.exports = router;
