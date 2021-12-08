const User = require("../models/User");
const ChatRoom = require("../models/ChatRoom");

exports.getChatList = async (req, res) => {
  const userId = req.user.userId;
  try {
    const chatList = await ChatRoom.findAll(userId);
    return res.json(chatList);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getOrCreateRoom = async (req, res) => {
  const userId = req.user.userId;
  const otherId = req.params.otherId;
  try {
    const room = new ChatRoom(userId, otherId);
    const existingRoom = await room.findOne();
    if (existingRoom === undefined) {
      const result = await room.create();
      return res.json({ chatRoomId: result.id });
    } else {
      return res.json({ chatRoomId: existingRoom.id });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getFriendInfo = async (req, res) => {
  const userId = req.user.userId;
  const roomId = req.params.chatRoomId;
  let friendId;

  try {
    const room = await ChatRoom.findOneById(roomId);
    if (room.firstId == userId) friendId = room.secondId;
    else if (room.secondId == userId) friendId = room.firstId;
    else {
      return res.status(400).json({ message: "Bad request" });
    }
    const friend = await User.findOneById(friendId);
    const userDTO = User.destruct(friend);
    return res.json(userDTO);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// exports.getChats = async (req, res) => {
//   const chatRoomId = req.params.chatRoomId;
//   try {
//     const messages = await Message.findAll(chatRoomId);
//     return res.json(messages);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };
