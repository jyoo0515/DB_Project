const db = require("../config/db");
const User = require("./User");

class Friend {
  static async findAll(userId) {
    const friendsSql = `SELECT secondId FROM friends_with WHERE firstId = '${userId}';`;
    const [friendsIdRow, _] = await db.execute(friendsSql);
    let friendsList = [];
    for (const friendObject of friendsIdRow) {
      const userSql = `SELECT * FROM users WHERE userId = '${friendObject.secondId}' LIMIT 1;`;
      const [friend, _] = await db.execute(userSql);
      friendsList.push(User.destruct(friend[0]));
    }
    return friendsList;
  }

  static async checkIfExists(userId, friendId) {
    const sql = `SELECT * FROM friends_with WHERE firstId = '${userId}' AND secondId = '${friendId}';`;
    try {
      const [friendIdRow, _] = await db.execute(sql);
      if (friendIdRow[0]) return true;
    } catch (err) {
      return false;
    }
  }

  static async addFriend(userId, friendId) {
    const sql = `INSERT INTO friends_with(firstId, secondId) VALUES('${userId}', '${friendId}');`;
    await db.execute(sql);
  }

  static async deleteById(userId, friendId) {
    const sql = `DELETE FROM friends_with WHERE firstId = '${userId}' AND secondId = '${friendId}';`;
    await db.execute(sql);
  }
}

module.exports = Friend;
