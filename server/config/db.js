require("dotenv").config();
const mysql = require("mysql2");
const env = process.env;

const pool = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  database: env.DB_DATABASE,
  password: env.DB_PASSWORD,
  dateStrings: "date", // For date formatting
});

// Create Table if does not exist
let usersSql = `
  CREATE TABLE IF NOT EXISTS users(
    userId varchar(50) not null unique primary key,
    name varchar(50) not null,
    role varchar(50) not null,
    password varchar(70) not null,
    statusMessage text not null,
    location varchar(50) not null,
    createdAt timestamp not null default current_timestamp,
    updatedAt timestamp not null default current_timestamp on update current_timestamp
  );
`;

let messagesSql = `
  CREATE TABLE IF NOT EXISTS messages(
    id int primary key auto_increment,
    fromId varchar(50) not null,
    toId varchar(50) not null,
    content text not null,
    createdAt timestamp not null default current_timestamp,
    expiresAt timestamp default null,
    foreign key (fromId) references users(userId),
    foreign key (toId) references users(userId)
  );
`;

pool.execute(usersSql, (err) => {
  if (err) throw err;
  console.log("Users table confirmed");
});

pool.execute(messagesSql, (err) => {
  if (err) throw err;
  console.log("Messages table confirmed");
});

module.exports = pool.promise();
