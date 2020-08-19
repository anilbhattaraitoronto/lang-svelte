const sqlite = require("better-sqlite3");
const DB = new sqlite("langdb.sqlite");

const schema = `
CREATE TABLE IF NOT EXISTS users(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    is_admin INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS posts(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    lang TEXT NOT NULL DEFAULT 'french',
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    content TEXT NOT NULL,
    posted_date DATE DEFAULT CURRENT_TIMESTAMP,
    updated_date DATE DEFAULT CURRENT_TIMESTAMP
);

`;

DB.exec(schema);

module.exports = DB;
