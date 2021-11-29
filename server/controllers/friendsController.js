const Friend = require("../models/Friend");

exports.getAll = async (req, res) => {
  const userId = req.user.userId;
  try {
    const friends = await Friend.findAll(userId);
    return res.json(friends);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.addFriend = async (req, res) => {
  const userId = req.user.userId;
  const { friendId } = req.body;
  try {
    await Friend.addFriend(userId, friendId);
    return res.json({ success: true, message: "Succesfully added friend" });
  } catch {
    console.log(err);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
