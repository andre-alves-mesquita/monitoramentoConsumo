class perfilAjax {
  static atualizarUsuario(ip_servidor, login, email, senha) {
    let resposta = null;
    var settings = {
      url: `${ip_servidor}/atualizar-perfil`,
      method: "POST",
      timeout: 0,
      async: false,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        login: login,
        email: email,
        senha: senha,
      },
    };

    $.ajax(settings).done(function (response) {
      resposta = response;
    });

    return resposta;
  }
}
