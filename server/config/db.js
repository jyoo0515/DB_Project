require("dotenv").config();
const mysql = require("mysql2");
const env = process.env;

const pool = mysql.createPool({
  multipleStatements: true,
  host: env.DB_HOST,
  user: env.DB_USER,
  database: env.DB_DATABASE,
  password: env.DB_PASSWORD,
  port: env.DB_PORT || 3306,
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
    location varchar(4) not null check (location in ('공학관', '백양관', '학생회관', '신촌역')),
    createdAt timestamp not null default current_timestamp,
    expiresAt timestamp default null,
    constraint message_not_equal check (fromId <> toId),
    foreign key (chatRoomId) references chatRooms(id)
      on delete cascade
  );
`;

const viewSql = `
  CREATE or REPLACE VIEW chatRoomsView AS
  SELECT c.firstId AS firstId, c.secondId AS secondId, m.chatRoomId as chatRoomId, max(m.createdAt) AS lastOnline
  FROM  chatRooms AS c, messages AS m
  WHERE c.id = m.chatRoomId
  GROUP BY c.id;
`;

const procSql = `
  DROP PROCEDURE IF EXISTS messageStatusUpdate;
  DROP PROCEDURE IF EXISTS userStatusUpdate;
  DROP PROCEDURE IF EXISTS deleteExpired;
  CREATE PROCEDURE messageStatusUpdate (IN messageId int, IN userId varchar(20))
  BEGIN
  UPDATE messages SET readStatus = 1 WHERE id = messageId AND userId = toId;
  END;
  CREATE PROCEDURE userStatusUpdate (IN id varchar(20), IN status int)
  BEGIN
  UPDATE users SET state = status WHERE userId = id;
  END;
  CREATE PROCEDURE deleteExpired ()
  BEGIN
  DELETE FROM messages WHERE expiresAt < current_timestamp;
  END;
`;

const eventSql = `
  DROP EVENT IF EXISTS checkExpiry;
  CREATE EVENT checkExpiry 
    ON SCHEDULE EVERY 1 SECOND
    DO CALL deleteExpired();
`;

pool.getConnection((err, conn) => {
  if (err) throw err;
  conn.execute(usersSql);
  conn.execute(friendSql);
  conn.execute(chatRoomSql);
  conn.execute(messagesSql);
  conn.query(viewSql);
  conn.query(procSql);
  conn.query(eventSql);
  console.log("Database Initialization Complete");
  conn.release();
});

module.exports = pool.promise();
