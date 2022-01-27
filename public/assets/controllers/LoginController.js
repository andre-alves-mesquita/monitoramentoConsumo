class LoginController {
  constructor() {}

  exibirErroLogin() {
    const urlParams = new URLSearchParams(window.location.search);
    const erroLogin = urlParams.get("erro");

    switch (erroLogin) {
      case "nao foi possivel altenticar":
        console.log("nao foi possivel altenticar");
        $("#usuario-senha").css({ display: "block" });
        break;

      case "preencha todos os campos":
        console.log("preencha todos os campos");
        $("#preencha").css({ display: "block" });
        break;

      default:
        break;
    }
  }
}
