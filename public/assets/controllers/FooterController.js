class FooterController {
  constructor() {
    this.carregarUsuarioTemplate();
  }

  carregarUsuarioTemplate() {
    let usuarios = footerAjax.buscarNomeUsuario(ip_servidor);
    $("#usuarioTemplate").empty();
    $("#usuarioTemplate").append(usuarios.nome_usuario);
  }
}
