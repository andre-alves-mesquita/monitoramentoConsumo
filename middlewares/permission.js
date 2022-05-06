const Usuario = require("../models/usuarios");
const Permissoes = require("../models/permissoes");

const Permission = async (req, res, next) => {
  let usuarioLogado = req.session.id_usuario;
  let rota = req.route.path;
  let usuario = await Usuario.buscarUsuario(usuarioLogado);
  let todasPermissoes = await Permissoes.buscarTodasPermissoes();
  let permissoes = [];
  let avancar = false;

  let permissoesUsuario = await Permissoes.buscarTodasPermissoesUsuariosId(
    usuario[0].id
  );

  permissoesUsuario.forEach((element) => {
    todasPermissoes.forEach((permission) => {
      if (element.id_permissao == permission.id) {
        permissoes.push(permission.rota);
      }
    });
  });

  if (permissoes.includes(rota)) {
    next();
  } else {
    res.redirect("/404");
  }
};

module.exports = Permission;
