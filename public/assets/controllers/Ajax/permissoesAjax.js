class PermissoesAjax {
  static carregarPermissoes(ip_servidor, id) {
    let resposta = null;
    var settings = {
      url: `${ip_servidor}/buscar-permissoes`,
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
      resposta = response;
    });

    return resposta;
  }
}
