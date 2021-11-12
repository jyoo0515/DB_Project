const db = require("../config/db");

// Use sql:divide on fromId and toId
class Message {
  constructor(fromId, toId, content, timeLimit) {
    this.fromId = fromId;
    this.toId = toId;
    this.content = content;
    this.timeLimit = timeLimit;
  }

  async create() {
    let sql;
    if (!this.timeLimit === undefined) {
      sql = `
        INSERT INTO messages(
          fromId,
          toId,
          content,
          expiresAt
        )
        VALUES(
          '${this.fromId}',
          '${this.toId}',
          '${this.content}',
          TIMESTAMPADD(MINUTE, ${this.timeLimit}, CURRENT_TIMESTAMP)
        );
      `;
    } else {
      sql = `
        INSERT INTO messages(
          fromId,
          toId,
          content
        )
        VALUES(
          '${this.fromId}',
          '${this.toId}',
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
