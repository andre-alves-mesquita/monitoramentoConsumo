const isAuth = require("../middlewares/auth");
const moment = require("moment"); // require

module.exports = (app) => {
  app.get("/dashboard", isAuth, async (req, res) => {});

  app.get("/dashboard-instalacoes", isAuth, async (req, res) => {});

  app.get("/dashboard-valor-mes", isAuth, async (req, res) => {});

  app.get("/dashboard-instalacoes", isAuth, async (req, res) => {});
};
