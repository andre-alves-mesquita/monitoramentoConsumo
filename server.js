const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const consign = require("consign");
const conexoesBD = require("./infraestrutura/conexoesBD");

require("dotenv").config(); //carregar configurações do dotenv

conexoesBD.conectarTodosBd();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
consign().include("controllers").into(app);

app.listen(process.env.SERVER_PORT, () => {
  console.log("conectou");
});
