class PerfilController {
  constructor() {
    localStorage.clear();
  }

  atualizarDados() {
    $("#erro").empty();

    let id = $('input[name="id"]').val();
    let login = $('input[name="Login"]').val();
    let email = $('input[name="email"]').val();
    let senha = $('input[name="senha"]').val();
    let confSenha = $('input[name="confSenha"]').val();
    let vazio = false;
    let senhaDiferentes = false;

    let arrayInputs = [login, email, senha, confSenha];

    arrayInputs.forEach((element) => {
      if (element == null || element == "") {
        vazio = true;
      }
    });

    if (senha != confSenha) {
      senhaDiferentes = true;
    }

    if (vazio == true) {
      console.log("campo vazio");
      $("#erro").append(
        `<div class="col-12 text-center bg-danger rounded"><span>Campo vazio</span></div>`
      );
    } else if (senhaDiferentes == true) {
      $("#erro").append(
        `<div class="col-12 text-center bg-danger rounded"><span>Senha diferente</span></div>`
      );
    } else {
      let resposta = perfilAjax.atualizarUsuario(
        ip_servidor,
        id,
        login,
        email,
        senha
      );
      $('input[name="senha"]').val("");
      $('input[name="confSenha"]').val("");

      toastr.success(`${resposta}`);
    }
  }
}
