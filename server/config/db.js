require("dotenv").config();
const mysql = require("mysql2");
const env = process.env;

const pool = mysql.createPool({
  multipleStatements: true,
  host: env.DB_HOST,
  user: env.DB_USER,
  database: env.DB_DATABASE,
  password: env.DB_PASSWORD,
  dateStrings: "date", // For date formatting
});

// Create tables if they don't exist
const usersSql = `
  CREATE TABLE IF NOT EXISTS users(
    userId varchar(20) not null unique primary key,
    name varchar(20) not null,
    role varchar(2) not null check (role in ('일반', '학생', '강사', '기업')),
    password varchar(70) not null,
    statusMessage varchar(20) default null,
    state boolean not null default 0,
    location varchar(4) not null default '공학관' check (location in ('공학관', '백양관', '학생회관', '신촌역'))
  );
`;

const friendSql = `
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

const chatRoomSql = `
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

const messagesSql = `
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

const procSql = `
    DROP PROCEDURE IF EXISTS messageStatusUpdate;
    DROP PROCEDURE IF EXISTS userStatusUpdate;
    CREATE PROCEDURE messageStatusUpdate (IN messageId int)
    BEGIN
    UPDATE messages SET readStatus = 1 WHERE id = messageId;
    END;
    CREATE PROCEDURE userStatusUpdate (IN id varchar(20), IN status int)
    BEGIN
    UPDATE users SET state = status WHERE userId = id;
    END;
`;

pool.getConnection((err, conn) => {
  if (err) throw err;
  conn.execute(usersSql);
  conn.execute(friendSql);
  conn.execute(chatRoomSql);
  conn.execute(messagesSql);
  conn.query(procSql);
  console.log("Database Initialization Complete");
  conn.release();
});

module.exports = pool.promise();
