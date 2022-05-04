const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const consign = require("consign");
const conexoesBD = require("./infraestrutura/conexoesBD");
const session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");

require("dotenv").config(); //carregar configurações do dotenv

conexoesBD.conectarTodosBd();

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  app.use(cors());
  next();
});

var options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
};

var sessionStore = new MySQLStore(options);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/perfil", express.static(path.join(__dirname, "public")));
app.use("/perfil/edit", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
consign().include("controllers").into(app);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Servidor Online");
});
