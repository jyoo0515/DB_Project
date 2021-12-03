const cookie = require("cookie");
const auth = require("./middleware/auth");

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
    const { id, name } = getIdAndName(socket);
    console.log(id);
    console.log(name);
    socket.emit("status", id);

    socket.on("message", (msg) => {
      console.log("Message received: " + msg);

      io.emit("message", msg);
    });

    socket.on("disconnect", () => {
      io.emit("message", "A user has left the chat");
    });
  });
};
