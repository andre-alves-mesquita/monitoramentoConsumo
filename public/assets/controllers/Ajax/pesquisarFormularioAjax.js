class HeaderRequisicoesAjax {
  static pegarUsuarioLogado(ip_servidor) {
    let usuario = null;

    var settings = {
      url: `${ip_servidor}/usuario-logado`,
      method: "POST",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      usuario = response;
    });
    return usuario;
  }
}
