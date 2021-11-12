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

    let sql = `
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
    let sql = "SELECT * FROM users;";
    const [userRows, _] = await db.execute(sql);

    return userRows;
  }

  static async findOneById(userId) {
    let sql = `SELECT * FROM users WHERE userId = '${userId}' LIMIT 1;`;
    const [userRow, _] = await db.execute(sql);

    return userRow[0];
  }

  static async deleteById(userId) {
    const user = await this.findOneById(userId);
    if (!user) {
      return false;
    } else {
      let sql = `DELETE FROM users WHERE userId = '${userId}';`;
      db.execute(sql);
      return true;
    }
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
