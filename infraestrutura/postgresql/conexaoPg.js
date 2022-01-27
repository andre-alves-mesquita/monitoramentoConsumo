const pg = require("pg");

require("dotenv").config();

let host = process.env.BD_PG_HOST;
let port = process.env.BD_PG_PORT;
let user = process.env.BD_PG_USER;
let pass = process.env.BD_PG_PASS;
let database = process.env.BD_PG_DATABASE;

const conexaoPg = new pg.Client({
  user: user,
  host: host,
  database: database,
  password: pass,
  port: port,
});

module.exports = conexaoPg;
