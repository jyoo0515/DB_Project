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

// Create tables if they don't exist
let usersSql = `
  CREATE TABLE IF NOT EXISTS users(
    userId varchar(20) not null unique primary key,
    name varchar(20) not null,
    role varchar(2) not null check (role in ('일반', '학생', '강사', '기업')),
    password varchar(70) not null,
    statusMessage varchar(20) default null,
    state boolean not null default 1,
    location varchar(4) not null default '공학관' check (location in ('공학관', '백양관', '학생회관', '신촌역'))
  );
`;

let friendSql = `
  CREATE TABLE IF NOT EXISTS friends_with(
    firstId varchar(20) not null,
    secondId varchar(20) not null,
    primary key (firstId, secondId),
    constraint friend_not_equal check (firstId <> secondId),
    foreign key (firstId) references users(userId)
      on delete cascade,
    foreign key (secondId) references users(userId)
      on delete cascade
  );
`;
// createdAt timestamp not null default current_timestamp,
// updatedAt timestamp not null default current_timestamp on update current_timestamp

let chatRoomSql = `
  CREATE TABLE IF NOT EXISTS chatRooms(
    id int primary key auto_increment,
    firstId varchar(20) not null,
    secondId varchar(20) not null,
    foreign key (firstId) references users(userId)
      on delete cascade,
    foreign key (secondId) references users(userId)
      on delete cascade
  );
`;

let messagesSql = `
  CREATE TABLE IF NOT EXISTS messages(
    id int primary key auto_increment,
    fromId varchar(20) not null,
    toId varchar(20) not null,
    readStatus boolean not null default 0,
    chatRoomId int not null,
    content text not null,
    createdAt timestamp not null default current_timestamp,
    expiresAt timestamp default null,
    constraint message_not_equal check (fromId <> toId),
    foreign key (chatRoomId) references chatRooms(id)
      on delete cascade
  );
`;

pool.execute(usersSql, (err) => {
  if (err) throw err;
  console.log("Users table confirmed");
});

pool.execute(chatRoomSql, (err) => {
  if (err) throw err;
  console.log("ChatRooms table confirmed");
});

pool.execute(friendSql, (err) => {
  if (err) throw err;
  console.log("Friends table confirmed");
});

pool.execute(messagesSql, (err) => {
  if (err) throw err;
  console.log("Messages table confirmed");
});

module.exports = pool.promise();
