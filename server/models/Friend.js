const db = require("../config/db");
const User = require("./User");

class Friend {
  static async findAll(userId) {
    const friendsSql = `SELECT * FROM users WHERE userId IN(SELECT secondId FROM friends_with WHERE firstId = '${userId}') ORDER BY name;`;
    const [friendsRow, _] = await db.execute(friendsSql);
    let friendsList = [];
    friendsRow.forEach((friend) => friendsList.push(User.destruct(friend)));
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
