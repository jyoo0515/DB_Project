require("dotenv").config();
const mysql = require("mysql2");
const env = process.env;

const pool = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  database: env.DB_DATABASE,
  password: env.DB_PASSWORD,
});

// Create Table if does not exist
let sql = `
  CREATE TABLE IF NOT EXISTS users(
    id int primary key auto_increment,
    userId varchar(50) not null unique,
    name varchar(50) not null,
    role varchar(50) not null,
    password text not null,
    createdAt Date not null,
    updatedAt Date not null
  );
`;

pool.execute(sql, (err) => {
  if (err) throw err;
  console.log("Database Connected");
});

module.exports = pool.promise();
