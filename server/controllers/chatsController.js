const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");

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
