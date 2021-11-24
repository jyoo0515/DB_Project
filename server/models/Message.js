const db = require("../config/db");

class Message {
  constructor(fromId, toId, chatRoomId, content, timeLimit) {
    this.fromId = fromId;
    this.toId = toId;
    this.chatRoomId = chatRoomId;
    this.content = content;
    this.timeLimit = timeLimit;
  }

  async create() {
    let sql;
    if (!this.timeLimit == null) {
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
          TIMESTAMPADD(MINUTE, ${this.timeLimit}, CURRENT_TIMESTAMP)
        );
      `;
    } else {
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
    }

    return db.execute(sql);
  }

  static async findAll() {
    let sql = "SELECT * FROM messages;";
    const [messageRows, _] = await db.execute(sql);

    return messageRows;
  }
}

module.exports = Message;
