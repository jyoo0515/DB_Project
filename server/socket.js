const cookie = require("cookie");
const auth = require("./middleware/auth");
const Message = require("./models/Message");

const getIdAndName = (socket) =>
  (socket.handshake.headers["cookie"] &&
    cookie.parse(socket.handshake.headers["cookie"]).access_token &&
    auth.verify(cookie.parse(socket.handshake.headers["cookie"]).access_token)) ||
  {};

const findSocketById = (io, id) => {
  const sockets = [];
  for (const socket of io.sockets.sockets.values()) {
    if (socket.user_id === id) {
      sockets.push(socket);
    }
  }

  return sockets;
};

module.exports = (io) => {
  io.on("connection", (socket) => {
    const { userId, name } = getIdAndName(socket);
    io.sockets.userId = userId;

    socket.on("enter_room", async (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
      const messages = await Message.findAll(roomId);
      io.to(roomId).emit("load", messages);
    });

    socket.on("send_message", (data) => {
      // const message = new Message(fromId, toId, null, content, timeLimit);
      socket.to(data.roomId).emit("receive_message", data);
      console.log(message);

      io.emit("message", msg);
    });

    socket.on("disconnect", () => {
      socket.disconnect();
    });
  });
};
