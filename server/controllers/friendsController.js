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
  const alreadyExists = await Friend.checkIfExists(userId, friendId);

  if (!alreadyExists) {
    try {
      await Friend.addFriend(userId, friendId);
      return res.json({ success: true, message: "Succesfully added friend" });
    } catch {
      console.log(err);
      return res.status(500).json({ success: false, message: "Something went wrong" });
    }
  } else {
    return res.status(400).json({ success: false, message: "Friend already exists" });
  }
};

exports.deleteFriend = async (req, res) => {
  const userId = req.user.userId;
  const friendId = req.params.friendId;
  const alreadyExists = await Friend.checkIfExists(userId, friendId);

  if (alreadyExists) {
    try {
      await Friend.deleteById(userId, friendId);
      return res.json({ success: true, message: "Successfully removed friend" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Something went wrong" });
    }
  } else {
    return res.status(400).json({ success: false, message: "Friend does not exist" });
  }
};
