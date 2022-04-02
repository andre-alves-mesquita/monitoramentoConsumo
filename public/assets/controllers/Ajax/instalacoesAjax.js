class instalacoesAjax {
  static pegarInstalacoes(
    ip_servidor,
    dataInicioForm,
    dataFimForm,
    extraForm,
    vendedor,
    usuario,
    tecnico,
    responsavel
  ) {
    let premiacoes = null;

    var settings = {
      url: `${ip_servidor}/buscar-premiacoes?dataInicio=${dataInicioForm}&dataFim=${dataFimForm}&extra=${extraForm}&vendedor=${vendedor}&usuario=${usuario}&tecnico=${tecnico}&responsavel=${responsavel}`,
      method: "GET",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      premiacoes = response;
    });
    return premiacoes;
  }

  static pegarTecnicos(ip_servidor) {
    let tecnicos = null;

    var settings = {
      url: `${ip_servidor}/buscar-tecnicos-premiacao`,
      method: "GET",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      tecnicos = response;
    });
    return tecnicos;
  }

  static pegarUsuarios(ip_servidor) {
    let usuarios = null;

    var settings = {
      url: `${ip_servidor}/buscar-usuarios-premiacao`,
      method: "GET",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      usuarios = response;
    });
    return usuarios;
  }

  static pegarVendedores(ip_servidor) {
    let vendedores = null;

    var settings = {
      url: `${ip_servidor}/buscar-vendedores-premiacao`,
      method: "GET",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      vendedores = response;
    });
    return vendedores;
  }
}
