const cookie = require("cookie");
const auth = require("./middleware/auth");
const Message = require("./models/Message");

const getIdAndName = (socket) =>
  (socket.handshake.headers["cookie"] &&
    cookie.parse(socket.handshake.headers["cookie"]).access_token &&
    auth.verify(cookie.parse(socket.handshake.headers["cookie"]).access_token)) ||
  {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    const { userId, name } = getIdAndName(socket);

    if (userId) {
      io.sockets.userId = userId;

      socket.on("enter_room", async (roomId) => {
        socket.join(roomId);
        socket.roomId = roomId;
        console.log(`User ${socket.id} joined room ${roomId}`);
        const messages = await Message.findAll(socket.roomId);
        io.to(socket.roomId).emit("load_total", messages);
      });

      socket.on("send", async (data) => {
        const message = new Message(userId, "ttmyid", data.content, data.timeLimit);
        const [result, _] = await message.create();
        const createdMessage = await Message.findOneById(result.insertId);
        io.to(socket.roomId).emit("load_message", createdMessage);
      });

      socket.on("disconnect", () => {
        socket.disconnect();
        console.log("Disconnected");
      });
    }
  });
};
