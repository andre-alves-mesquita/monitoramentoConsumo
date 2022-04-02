class pegarUsuariosAjax {
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
}
