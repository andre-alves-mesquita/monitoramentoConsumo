const isAuth = require("../middlewares/auth");

const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/perfil", isAuth, async (req, res) => {
    res.redirect("/perfil/" + req.session.id_usuario);
  });
  app.get("/perfil/:id", isAuth, async (req, res) => {
    let usuario = await Usuario.buscarUsuario(req.session.id_usuario);

    res.render("perfil/index", { usuario: usuario[0] });
  });

  app.get("/perfil/edit/:id", isAuth, async (req, res) => {
    let usuario = await Usuario.buscarUsuario(req.params.id);

    res.render("perfil/index", { usuario: usuario[0] });
  });
};
