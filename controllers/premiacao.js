const Instalacoes = require("../models/instalacoes");
const moment = require("moment"); // require

module.exports = (app) => {
  app.get("/premiacao", async (req, res) => {
    res.render("premiacao/premiacao", { instalacoes: null });
  });

  app.post("/premiacao", async (req, res) => {
    let dataInicio = req.body.dataInicioForm;
    let dataFim = req.body.dataFimForm;
    let extra = req.body.extraForm;
    let vendedor = req.body.selectVendedorForm;
    let usuario = req.body.selectUsuarioForm;
    let tecnico = req.body.selectTecnicoForm;
    let responsavel = req.body.selectResponsavelForm;
    let queryDataInicio = "";
    let queryDataFim = "";
    let queryVendedor = "";
    let queryUsuario = "";
    let queryTecnico = "";
    let queryResponsavel = "";
    let queryExtra = "";
    let queryFinal = "";

    if (dataInicio != "") {
      queryDataInicio += `and TO_DATE(to_char(ao2.data_finalizacao,'YYYY-MM-DD'),'YYYY-MM-DD') <= TO_DATE(to_char(date('${dataInicio}'),'YYYY-MM-DD'),'YYYY-MM-DD') `;
    }

    if (dataFim != "") {
      queryDataFim += `and TO_DATE(to_char(ao2.data_finalizacao,'YYYY-MM-DD'),'YYYY-MM-DD') >= TO_DATE(to_char(date('${dataFim}') ,'YYYY-MM-DD'),'YYYY-MM-DD') `;
    }

    if (extra == "sim") {
      queryExtra += "";
    }

    if (vendedor) {
      const vendedorArray = vendedor.split(",");
      vendedorArray.forEach((element) => {
        queryVendedor += ` and av.nome = '${element}' `;
      });
    } else {
      queryVendedor = "";
    }

    if (usuario) {
      const usuarioArray = usuario.split(",");
      usuarioArray.forEach((element) => {
        queryUsuario += ` and au.name = '${element}' `;
      });
    } else {
      queryUsuario = "";
    }

    if (responsavel) {
      const responsavelArray = responsavel.split(",");
      responsavelArray.forEach((element) => {
        queryResponsavel += ` and au.name = '${element}' `;
      });
    } else {
      queryResponsavel = "";
    }

    if (tecnico) {
      const tecnicoArray = tecnico.split(",");
      tecnicoArray.forEach((element) => {
        queryTecnico += ` and au.name = '${element}' `;
      });
    } else {
      queryTecnico = "";
    }

    queryFinal +=
      queryDataInicio +
      queryDataFim +
      queryExtra +
      queryResponsavel +
      queryTecnico +
      queryVendedor +
      queryUsuario;

    let instalacoes = await Instalacoes.pegarInstalacoes(queryFinal);

    res.render("premiacao/premiacao", {
      instalacoes: instalacoes.rows,
    });
  });

  app.post("/buscar-premiacoes", async (req, res) => {
    let dataInicio = req.query.dataInicio;
    let dataFim = req.query.dataFim;
    let extra = req.query.extra;
    let vendedor = req.query.vendedor;
    let usuario = req.query.usuario;
    let tecnico = req.query.tecnico;
    let responsavel = req.query.responsavel;
    let queryDataInicio = "";
    let queryDataFim = "";
    let queryVendedor = "";
    let queryUsuario = "";
    let queryTecnico = "";
    let queryResponsavel = "";
    let queryExtra = "";
    let queryFinal = "";

    if (dataInicio != "") {
      queryDataInicio += `and TO_DATE(to_char(ao2.data_finalizacao,'YYYY-MM-DD'),'YYYY-MM-DD') <= TO_DATE(to_char(date('${dataInicio}'),'YYYY-MM-DD'),'YYYY-MM-DD') `;
    }

    if (dataFim != "") {
      queryDataFim += `and TO_DATE(to_char(ao2.data_finalizacao,'YYYY-MM-DD'),'YYYY-MM-DD') >= TO_DATE(to_char(date('${dataFim}') ,'YYYY-MM-DD'),'YYYY-MM-DD') `;
    }

    if (extra == "sim") {
      queryExtra += "";
    }

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

    if (responsavel.length != 0) {
      const responsavelArray = responsavel.split(",");
      responsavelArray.forEach((element) => {
        queryResponsavel += ` and au.name = '${element}' `;
      });
    } else {
      queryResponsavel = "";
    }

    if (tecnico.length != 0) {
      const tecnicoArray = tecnico.split(",");
      tecnicoArray.forEach((element) => {
        queryTecnico += ` and au.name = '${element}' `;
      });
    } else {
      queryTecnico = "";
    }

    queryFinal +=
      queryDataInicio +
      queryDataFim +
      queryExtra +
      queryResponsavel +
      queryTecnico +
      queryVendedor +
      queryUsuario;

    let instalacoes = await Instalacoes.pegarInstalacoes(queryFinal);

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
