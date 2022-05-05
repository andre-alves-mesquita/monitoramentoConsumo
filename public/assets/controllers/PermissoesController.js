class PermissoesController {
  constructor() {}

  carregarUsuario(id) {
    let resposta = PermissoesAjax.carregarPermissoes(ip_servidor, id);
    let usuario = UsuariosAjax.pegarUsuarioId(ip_servidor, id);

    $('input[name="hiddenId"]').val(usuario[0].id);
    $('input[name="idModal"]').val(usuario[0].id);
    $('input[name="loginModal"]').val(usuario[0].login);

    $("#selectResponsavelForm").empty();
    resposta.forEach((element) => {
      $("#selectResponsavelForm").append(`
      <option value="${element.id}">${element.permissao}</option>
      `);
    });
  }
}
