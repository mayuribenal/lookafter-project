const spicedPg = require('spiced-pg');

// let db;
//
// if (process.env.DATABASE_URL) {
//   db = spicedPg(process.env.DATABASE_URL);
// } else {
//   // const { dbUser, dbPass } = require("./secrets.json");
//   // db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/final`);
//   db = spicedPg(`postgres:postgres:postgres@localhost:5432/finaltest`);
// }

const dbUrl =
  process.env.DATABASE_URL ||
  'postgres:postgres:postgres@localhost:5432/finaltest';

var db = spicedPg(dbUrl);

module.exports.registerUser = function(first, last, hood, email, password) {
  return db.query(
    `INSERT INTO users (first, last, hood, email, password)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
    [first, last, hood, email, password]
  );
};

module.exports.verifyPassword = function(email) {
  return db.query(
    `SELECT id, password FROM users
        WHERE $1 = email`,
    [email]
  );
};

module.exports.getUser = function(id) {
  return db.query(
    `SELECT id, first, last, hood, email, img FROM users
        WHERE $1 = id`,
    [id]
  );
};

module.exports.addProfilePic = function(profilepic, id) {
  return db.query(
    `UPDATE users
        SET img = $1
        WHERE id = $2
        RETURNING img`,
    [profilepic, id]
  );
};

module.exports.getGear = function() {
  return db.query(
    `SELECT *
        FROM gear`
  );
};

module.exports.addGear = function(type, item, owner, shared) {
  return db.query(
    `INSERT INTO gear (type, item, owner, shared)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
    [type, item, owner, shared]
  );
};

module.exports.getItem = function(id) {
  return db.query(
    `SELECT * FROM gear
        WHERE id = $1`,
    [id]
  );
};

module.exports.removeItem = function(id) {
  return db.query(
    `DELETE FROM gear
        WHERE id = $1`,
    [id]
  );
};

module.exports.getChat = function() {
  return db.query(
    `SELECT chat.id, chat.user_id, users.first, chat.message, created_at, users.last, users.img
        FROM chat
        JOIN users
        ON chat.user_id = users.id
        ORDER BY chat.id DESC`
  );
};

module.exports.addMessage = function(id, message) {
  return db.query(
    `INSERT INTO chat (user_id, message)
        values ($1, $2)
        RETURNING *`,
    [id, message]
  );
};

module.exports.addEvent = function(id, hood, name, start, end) {
  return db.query(
    `INSERT INTO calendar (user_id, hood, title, event_start, event_end)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING title, hood, event_start AS start, event_end AS end`,
    [id, hood, name, start, end]
  );
};

module.exports.getEvents = function() {
  return db.query(
    `SELECT id, user_id, hood, title, event_start AS start, event_end AS end
        FROM calendar
        ORDER BY event_start ASC`
  );
};

module.exports.gethood = function(id) {
  return db.query(`SELECT hood FROM users WHERE id = $1`, [id]);
};

module.exports.removeEvent = function(id) {
  return db.query(`DELETE FROM calendar WHERE id = $1`, [id]);
};

module.exports.getMembers = function() {
  return db.query(`SELECT * FROM users`);
};
