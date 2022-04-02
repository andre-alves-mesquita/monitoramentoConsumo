const Instalacoes = require("../models/instalacoes");

module.exports = (app) => {
  app.get("/premiacao", async (req, res) => {
    res.render("premiacao/premiacao", { instalacoes: null });
  });

  app.get("/buscar-premiacoes", async (req, res) => {
    let dataInicio = req.query.dataInicio;
    let dataFim = req.query.dataFim;
    let extra = req.query.extra;
    let vendedor = req.query.vendedor;
    let usuario = req.query.usuario;
    let tecnico = req.query.tecnico;
    let responsavel = req.query.responsavel;
    let queryVendedor = "";
    let queryUsuario = "";

    if (vendedor.length != 0) {
      const vendedorArray = vendedor.split(",");
      vendedorArray.forEach((element) => {
        queryVendedor += ` and av.nome = '${element}' `;
      });
    } else {
      queryVendedor = "";
    }

    if (usuario.length != 0) {
      const usuarioArray = usuario.split(",");
      usuarioArray.forEach((element) => {
        queryUsuario += ` and au.name = '${element}' `;
      });
    } else {
      queryUsuario = "";
    }

    const tecnicoArray = tecnico.split(",");
    const responsavelArray = responsavel.split(",");

    console.log(queryUsuario);

    let instalacoes = await Instalacoes.pegarInstalacoes();
    res.status(200).json(instalacoes.rows);
  });

  app.get("/buscar-usuarios-premiacao", async (req, res) => {
    let usuarios = await Instalacoes.pegarFuncionarios();
    res.status(200).json(usuarios.rows);
  });

  app.get("/buscar-tecnicos-premiacao", async (req, res) => {
    let tecnicos = await Instalacoes.pegarTecnicos();
    res.status(200).json(tecnicos.rows);
  });

  app.get("/buscar-vendedores-premiacao", async (req, res) => {
    let vendedores = await Instalacoes.pegarVendedores();
    res.status(200).json(vendedores.rows);
  });

  app.get("/buscar-responsaveis-premiacao", async (req, res) => {
    let instalacoes = await Instalacoes.pegarInstalacoes();
    res.status(200).json(instalacoes);
  });
};
