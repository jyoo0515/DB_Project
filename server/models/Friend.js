const db = require("../config/db");
const User = require("./User");

class Friend {
  static async findAll(userId) {
    const friendsSql = `SELECT secondId FROM friends_with WHERE firstId = '${userId}';`;
    const [friendsIdList, _] = await db.execute(friendsSql);
    let friendsList = [];
    for (const friendObject of friendsIdList) {
      const userSql = `SELECT * FROM users WHERE userId = '${friendObject.secondId}' LIMIT 1;`;
      const [friend, _] = await db.execute(userSql);
      friendsList.push(friend[0]);
    }
    return friendsList;
  }

  static async addFriend(firstId, secondId) {
    const sql = `INSERT INTO friends_with(firstId, secondId) VALUES('${firstId}', '${secondId}');`;
    await db.execute(sql);
  }
}

module.exports = Friend;
