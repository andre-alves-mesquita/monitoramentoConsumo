class UsuariosAjax {
  static pegarUsuarioId(ip_servidor, id) {
    let usuario = null;
    var settings = {
      url: `${ip_servidor}/pegar-usuario-id`,
      method: "POST",
      timeout: 0,
      async: false,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        id: id,
      },
    };

    $.ajax(settings).done(function (response) {
      usuario = response;
    });

    return usuario;
  }
}
