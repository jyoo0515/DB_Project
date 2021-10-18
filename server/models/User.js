const bcrypt = require("bcrypt");
const db = require("../config/db");

class User {
  constructor(userId, name, role, password) {
    this.userId = userId;
    this.name = name;
    this.role = role;
    this.password = password;
  }

  static async userIdUnique(userId) {
    const [user, _] = await this.findOneById(userId);
    if (user[0]) return false;
    return true;
  }

  async create() {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    const createdAt = `${yyyy}-${mm}-${dd}`;
    const hashedPassword = await this.hashPassword(this.password);

    let sql = `
      INSERT INTO users(
        userId,
        name,
        role,
        password,
        createdAt,
        updatedAt
      )
      VALUES(
        '${this.userId}',
        '${this.name}',
        '${this.role}',
        '${hashedPassword}',
        '${createdAt}',
        '${createdAt}'
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
    let sql = `DELETE FROM users WHERE userId = '${userId}';`;

    return db.execute(sql);
  }

  static validatePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(password, salt);
  }
}

module.exports = User;
