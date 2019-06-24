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
    `SELECT id, first, last, hood, email, img, bio FROM users
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

module.exports.addEventNeed = function(id, hood, name, start, end) {
  return db.query(
    `INSERT INTO calendar_need (user_id, hood, title, event_start, event_end)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING title, hood, event_start AS start, event_end AS end`,
    [id, hood, name, start, end]
  );
};

module.exports.addEventOffer = function(id, hood, name, start, end) {
  return db.query(
    `INSERT INTO calendar_offer (user_id, hood, title, event_start, event_end)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING title, hood, event_start AS start, event_end AS end`,
    [id, hood, name, start, end]
  );
};

module.exports.getEventsOffer = function() {
  return db.query(
    `SELECT id, user_id, hood, title, event_start AS start, event_end AS end
        FROM calendar_offer
        ORDER BY event_start ASC`
  );
};

module.exports.getEventsNeed = function() {
  return db.query(
    `SELECT id, user_id, hood, title, event_start AS start, event_end AS end
        FROM calendar_need
        ORDER BY event_start ASC`
  );
};

module.exports.gethood = function(id) {
  return db.query(`SELECT hood FROM users WHERE id = $1`, [id]);
};

module.exports.removeEventOffer = function(id) {
  return db.query(`DELETE FROM calendar_offer WHERE id = $1`, [id]);
};

module.exports.removeEventNeed = function(id) {
  return db.query(`DELETE FROM calendar_need WHERE id = $1`, [id]);
};

module.exports.getMembers = function() {
  return db.query(`SELECT * FROM users`);
};

module.exports.getBioImg = function getBioImg(id) {
  return db.query(
    `
      SELECT *
      FROM bioimg
      WHERE bioimg_id = $1;`,
    [id]
  );
};

module.exports.addBioImg = function addBioImg(
  bioimg_id,
  title,
  description,
  url
) {
  return db.query(
    `
      INSERT INTO bioimg (bioimg_id, title, description, url)
      VALUES ($1, $2, $3, $4) RETURNING *;`,
    [bioimg_id, title, description, url]
  );
};

exports.setBio = function setBio(bio, id) {
  return db.query(
    `
      UPDATE users
      SET bio=$1
      WHERE id=$2;`,
    [bio, id]
  );
};
