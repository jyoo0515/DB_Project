const db = require("../config/db");
const ChatRoom = require("./ChatRoom");

class Message {
  constructor(fromId, toId, content, timeLimit) {
    this.fromId = fromId;
    this.toId = toId;
    this.chatRoomId = null;
    this.content = content;
    if (timeLimit === undefined || timeLimit == null) {
      this.expiresAt = null;
    } else {
      const today = new Date();
      today.setTime(today.getTime() + timeLimit * 60 * 1000);
      const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + String(today.getDate()).padStart(2, "0");
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.expiresAt = dateTime;
    }
  }

  async create() {
    const room = new ChatRoom(this.fromId, this.toId);
    const existingRoom = await room.findOne();
    if (existingRoom === undefined) {
      const result = await room.create();
      this.chatRoomId = result.id;
    } else {
      this.chatRoomId = existingRoom.id;
    }

    let sql;
    if (this.expiresAt == null) {
      sql = `
        INSERT INTO messages(
          fromId,
          toId,
          chatRoomId,
          content
        )
        VALUES(
          '${this.fromId}',
          '${this.toId}',
          '${this.chatRoomId}',
          '${this.content}'
        );
      `;
    } else {
      sql = `
        INSERT INTO messages(
          fromId,
          toId,
          chatRoomId,
          content,
          expiresAt
        )
        VALUES(
          '${this.fromId}',
          '${this.toId}',
          '${this.chatRoomId}',
          '${this.content}',
          '${this.expiresAt}'
        );
      `;
    }

    return db.execute(sql);
  }

  static async findAll(chatRoomId) {
    const sql = `SELECT * FROM messages WHERE chatRoomId='${chatRoomId}' ORDER BY createdAt;`;
    const [messageRows, _] = await db.execute(sql);

    return messageRows;
  }

  static async findOneById(messageId) {
    const sql = `SELECT * FROM messages WHERE id='${messageId}' LIMIT 1;`;
    const [messageRow, _] = await db.execute(sql);

    return messageRow[0];
  }
}

module.exports = Message;
