class footerAjax {
  static buscarNomeUsuario(ip_servidor) {
    let usuario = null;
    var settings = {
      url: `${ip_servidor}/pegar-usuario`,
      method: "GET",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      usuario = response[0];
    });

    return usuario;
  }
}
