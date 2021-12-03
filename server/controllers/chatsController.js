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

exports.getChats = async (req, res) => {
  const chatRoomId = req.params.chatRoomId;
  try {
    const messages = await Message.findAll(chatRoomId);
    return res.json(messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.create = async (req, res) => {
  const { fromId, toId, content, timeLimit } = req.body;
  try {
    const message = new Message(fromId, toId, null, content, timeLimit);
    const room = new ChatRoom(fromId, toId);
    const existingRoom = await room.findOne();
    if (existingRoom === undefined) {
      const result = await room.create();
      message.chatRoomId = result.id;
      message.create();
    } else {
      message.chatRoomId = existingRoom.id;
      message.create();
    }
    return res.json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
