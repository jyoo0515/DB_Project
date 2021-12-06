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
        const messages = await Message.findAll(roomId);
        io.to(roomId).emit("load", messages);
      });

      // socket.on("send_message", (data) => {
      //   // const message = new Message(fromId, toId, null, content, timeLimit);
      //   // io.to(data.roomId).emit("receive_message", data);
      //   console.log(data);
      // });

      socket.on("disconnect", () => {
        console.log("Disconnected");
        socket.disconnect();
      });
    }
  });
};
