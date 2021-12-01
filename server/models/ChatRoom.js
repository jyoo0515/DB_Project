const db = require("../config/db");

class ChatRoom {
  constructor(firstId, secondId) {
    const idList = [firstId, secondId];
    idList.sort();
    this.firstId = idList[0];
    this.secondId = idList[1];
  }

  async findOne() {
    const sql = `SELECT * FROM chatRooms WHERE firstId='${this.firstId}' AND secondId='${this.secondId}' LIMIT 1;`;
    const [chatRoom, _] = await db.execute(sql);

    return chatRoom[0];
  }

  async create() {
    const sql = `INSERT INTO chatRooms(
      firstId,
      secondId
    )
    VALUES(
      '${this.firstId}',
      '${this.secondId}'
    );
    `;
    await db.execute(sql);
    return await this.findOne();
  }

  static async findAll() {
    const sql = `SELECT * FROM chatRooms`;
  }
}

module.exports = ChatRoom;
