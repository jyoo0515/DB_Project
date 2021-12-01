const db = require("../config/db");

class ChatRoom {
  constructor(firstId, secondId) {
    const idList = [firstId, secondId];
    idList.sort();
    this.firstId = idList[0];
    this.secondId = idList[1];
  }

  static async findAll(userId) {
    const sql = `
      SELECT secondId AS friendId, chatRoomId, lastOnline FROM chatRoomsView WHERE firstId='${userId}'
      UNION
      SELECT firstId AS friendId, chatRoomId, lastOnline FROM chatRoomsView WHERE secondId='${userId}';
      `;
    const [chatRooms, _] = await db.execute(sql);
    return chatRooms;
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
}

module.exports = ChatRoom;
