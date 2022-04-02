class pegarTecnicosAjax {
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
}
