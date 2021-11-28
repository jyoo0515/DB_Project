const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

app.use("/api/users", require("./routes/users"));
app.use("/api/chat", require("./routes/chats"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

//Event on connection
io.on("connection", (socket) => {
  socket.emit("usercount", io.engine.clientsCount);

  socket.on("message", (msg) => {
    console.log("Message received: " + msg);

    io.emit("message", msg);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "test.html"));
});

server.listen(PORT, async () => {
  console.log(`Server running on PORT ${PORT}`);
});
