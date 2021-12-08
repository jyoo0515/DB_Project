const bcrypt = require("bcrypt");
const db = require("../config/db");

class User {
  constructor(userId, name, role, password, statusMessage, location) {
    this.userId = userId;
    this.name = name;
    this.role = role;
    this.password = password;
    this.statusMessage = statusMessage;
    this.location = location;
  }

  static async userIdUnique(userId) {
    try {
      const user = await this.findOneById(userId);
      if (user) return false;
    } catch (err) {
      return true;
    }
    return true;
  }

  async create() {
    const hashedPassword = await this.hashPassword(this.password);

    const sql = `
      INSERT INTO users(
        userId,
        name,
        role,
        password,
        statusMessage,
        location
      )
      VALUES(
        '${this.userId}',
        '${this.name}',
        '${this.role}',
        '${hashedPassword}',
        '${this.statusMessage}',
        '${this.location}'
      );
    `;

    return db.execute(sql);
  }

  static async findAll() {
    const sql = "SELECT * FROM users ORDER BY binary(name);";
    const [userRows, _] = await db.execute(sql);

    return userRows;
  }

  static async findOneById(userId) {
    const sql = `SELECT * FROM users WHERE userId = '${userId}' LIMIT 1;`;
    const [userRow, _] = await db.execute(sql);

    return userRow[0];
  }

  static async deleteById(userId) {
    const user = await this.findOneById(userId);
    if (!user) {
      return false;
    } else {
      const sql = `DELETE FROM users WHERE userId = '${userId}';`;
      await db.execute(sql);
      return true;
    }
  }

  static async searchUsers(userId) {
    const sql = `SELECT * FROM users WHERE userId LIKE '%${userId}%' ORDER BY binary(name);`;
    const [userRow, _] = await db.execute(sql);
    return userRow;
  }

  static async nearbyUsers(location) {
    const sql = `SELECT * FROM users WHERE location='${location}' ORDER BY binary(name);`;
    const [userRow, _] = await db.execute(sql);
    return userRow;
  }

  static async changeState(userId, state) {
    const sql = `CALL userStatusUpdate('${userId}', ${state});`;
    await db.execute(sql);
  }

  static async updateStatusMessage(userId, statusMessage) {
    const sql = `UPDATE users SET statusMessage = '${statusMessage}' WHERE userId = '${userId}';`;
    await db.execute(sql);
  }

  static async updateLocation(userId, location) {
    const sql = `UPDATE users SET location = '${location}' WHERE userId = '${userId}';`;
    await db.execute(sql);
  }

  static destruct = (user) => {
    const { password, ...userDTO } = user;
    return userDTO;
  };

  static validatePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(password, salt);
  }
}

module.exports = User;
