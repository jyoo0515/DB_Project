const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");
const auth = require("../middleware/auth");

router.route("/").all(auth.verifyToken).get(messagesController.getAll).post(messagesController.create);

module.exports = router;
