const isAuth = require("../middlewares/auth");
const Permission = require("../middlewares/permission");
const Usuario = require("../models/usuarios");
const Permissoes = require("../models/permissoes");

module.exports = (app) => {
  app.get("/permissoes", isAuth, Permission, async (req, res) => {
    let usuarios = await Usuario.buscarTodosUsuarios();
    let permissoes = await Permissoes.buscarTodasPermissoes();
    let usuario_permissoes = await Permissoes.buscarTodasPermissoesUsuarios();

    usuarios.forEach((usuario) => {
      usuario.permissoes = [];
      usuario_permissoes.forEach((permissao) => {
        if (permissao.id_usuario == usuario.id) {
          permissoes.forEach((element) => {
            if (permissao.id_permissao == element.id) {
              usuario.permissoes.push(element.permissao);
            }
          });
        }
      });
    });

    res.render("permissoes/index", {
      usuarios: usuarios,
      permissoes: permissoes,
    });
  });

  app.post("/permissoes-cadastrar", isAuth, async (req, res) => {
    let permissao = req.body.permissao;
    let rota = req.body.rota;
    let jaCadastrado = false;

    let permissoes = await Permissoes.buscarTodasPermissoes();

    permissoes.forEach((element) => {
      if (permissao == element.permissao || rota == element.rota) {
        jaCadastrado = true;
      }
    });

    if (jaCadastrado == false) {
      let resposta = await Permissoes.InserirPermissao({
        permissao: permissao,
        rota: rota,
      });
    } else {
      console.log("ja cadastrado");
    }

    res.redirect("/permissoes");
  });

  app.post("/permissoes-adicionar-permissao", isAuth, async (req, res) => {
    let permissoes = await Permissoes.buscarTodasPermissoes();
    let permissoesUsuario = await Permissoes.buscarTodasPermissoesUsuariosId(
      req.body.funcionario
    );
    let id_usuario = req.body.funcionario;
    let id_permissao = req.body.permissao;
    let permissaoCadastrada = false;

    permissoesUsuario.forEach((element) => {
      if (element.id_permissao == id_permissao) {
        permissaoCadastrada = true;
      }
    });

    if (permissaoCadastrada == false) {
      let resposta = await Permissoes.inserirPermissaoFuncionario({
        id_usuario: id_usuario,
        id_permissao: id_permissao,
      });
    } else {
      console.log("permissao ja cadastrada");
    }

    res.redirect("/permissoes");
  });

  app.post("/remover-permissao-usuario", isAuth, async (req, res) => {
    let idUsuario = req.body.hiddenId;
    let loginModal = req.body.loginModal;
    let permissoes = req.body.selectResponsavelForm;

    if (typeof permissoes == "string") {
      let resposta = await Permissoes.removerPermissaoUsuario(
        idUsuario,
        permissoes
      );
    } else {
      permissoes.forEach((element) => {
        let resposta = Permissoes.removerPermissaoUsuario(idUsuario, element);
      });
    }

    res.redirect("/permissoes");
  });

  app.post("/remover-permissao", isAuth, async (req, res) => {
    let idPermissao = req.body.removerPermissao;

    /*
    if (typeof permissoes == "string") {
      let resposta = await Permissoes.removerPermissaoUsuario(
        idUsuario,
        permissoes
      );
    } else {
      permissoes.forEach((element) => {
        let resposta = Permissoes.removerPermissaoUsuario(idUsuario, element);
      });
    }
    */
    let resposta = await Permissoes.removerPermissao(idPermissao);
    let resposta2 = await Permissoes.removerPermissaoTodosUsuario(idPermissao);

    res.redirect("/permissoes");
  });
};
