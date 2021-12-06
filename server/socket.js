const cookie = require("cookie");
const auth = require("./middleware/auth");
const ChatRoom = require("./models/ChatRoom");
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
        const room = await ChatRoom.findOneById(roomId);
        if (room.firstId != userId && room.secondId != userId) {
          socket.emit("error", { message: "Unauthorized" });
          socket.disconnect();
          return;
        }
        socket.join(roomId);
        socket.roomId = roomId;
        if (room.firstId == userId) socket.friendId = room.secondId;
        else socket.friendId = room.firstId;
        console.log(`User ${socket.id} joined room ${roomId}`);
        const messages = await Message.findAll(socket.roomId);
        io.to(socket.roomId).emit("load_total", messages);
      });

      socket.on("send", async (data) => {
        const message = new Message(userId, socket.friendId, data.content, data.timeLimit);
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
