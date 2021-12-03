const cookie = require("cookie");
const auth = require("./middleware/auth");
const Message = require("./models/Message");

const getIdAndName = (socket) =>
  (socket.handshake.headers["cookie"] &&
    cookie.parse(socket.handshake.headers["cookie"]).access_token &&
    auth.verify(cookie.parse(socket.handshake.headers["cookie"]).access_token)) ||
  {};

const updateOnlineList = (io, roomName) => {
  const roomPeople = io.sockets.adapter.rooms.get(roomName)
    ? Array.from(io.sockets.adapter.rooms.get(roomName)).map((socket_id) => ({
        id: io.sockets.sockets.get(socket_id).user_id,
        name: io.sockets.sockets.get(socket_id).name,
      }))
    : [];

  // notification(알림) to people
  io.to(roomName).emit("UPDATE_ONLINE_USERS", roomPeople);
};

const findSocketById = (io, id) => {
  const sockets = [];
  for (let socket of io.sockets.sockets.values()) {
    if (socket.user_id === id) {
      sockets.push(socket);
    }
  }

  return sockets;
};

module.exports = (io) => {
  //Event on connection
  io.on("connection", (socket) => {
    const { userId, name } = getIdAndName(socket);

    // if (userId) {
    //   findSocketById(io, userId).map((socket) => socket.disconnet());
    //   socket.user_id = userId;
    //   socket.name = name;
    //   socket.join("online");
    //   updateOnlineList(io, "online");
    //   console.log(`${userId} joined online`);
    // } else {
    //   socket.disconnet();
    // }

    // socket.on("message", (msg) => {
    //   const { fromId, toId, content, timeLimit } = msg;
    //   const targetSockets = findSocketById(io, toId);
    //   const message = new Message(fromId, toId, null, content, timeLimit);

    //   io.emit("message", msg);
    // });

    // socket.on("disconnect", () => {
    //   if (socket.user_id) {
    //     socket.leave("online");
    //     updateOnlineList(io, "online");
    //     console.log(`${socket.user_id} left online`);
    //   }
    // });
  });
};
