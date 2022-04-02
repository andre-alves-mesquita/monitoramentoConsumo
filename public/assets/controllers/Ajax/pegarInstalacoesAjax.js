class pegarInstalacoesAjax {
  static pegarInstalacoes(ip_servidor) {
    let premiacoes = null;

    var settings = {
      url: `${ip_servidor}/buscar-premiacoes`,
      method: "GET",
      timeout: 0,
      async: false,
    };

    $.ajax(settings).done(function (response) {
      premiacoes = response;
    });
    return premiacoes;
  }
}
