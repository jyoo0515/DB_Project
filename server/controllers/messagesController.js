const Message = require("../models/Message");

exports.getAll = async (req, res) => {
  try {
    const messages = await Message.findAll();
    return res.json({ messages });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.create = async (req, res) => {
  const { fromId, toId, content, timeLimit } = req.body;
  try {
    const message = new Message(fromId, toId, content, timeLimit);
    await message.create();
    return res.json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
