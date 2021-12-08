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
      SELECT firstId AS friendId, chatRoomId, lastOnline FROM chatRoomsView WHERE secondId='${userId}'
      ORDER BY lastOnline DESC;
      `;
    const [chatRooms, _] = await db.execute(sql);
    const chatRoomDto = [];
    for (const chatRoom of chatRooms) {
      const sql = `SELECT name, role, state FROM users WHERE userId='${chatRoom.friendId}';`;
      const [userRow, _] = await db.execute(sql);
      chatRoomDto.push({ ...chatRoom, ...userRow[0] });
    }
    return chatRoomDto;
  }

  async findOne() {
    const sql = `SELECT * FROM chatRooms WHERE firstId='${this.firstId}' AND secondId='${this.secondId}' LIMIT 1;`;
    const [chatRoom, _] = await db.execute(sql);

    return chatRoom[0];
  }

  static async findOneById(chatRoomId) {
    const sql = `SELECT * FROM chatRooms WHERE id='${chatRoomId}' LIMIT 1`;
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
