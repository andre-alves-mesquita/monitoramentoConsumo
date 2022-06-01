class ViabilidadeController {
  constructor(erro) {
    this.verificarErro(erro);
  }

  mudarPlace() {
    var tipo = document.getElementById("inputGroupSelect01");
    var value = tipo.options[tipo.selectedIndex].value;

    if (value == "endereco") {
      document.getElementById("endereco").placeholder =
        "Quadra x Rua x Casa x Lote x São Sebastiao DF";
      document.querySelector("#endereco").value = "";
    } else {
      document.getElementById("endereco").placeholder =
        "Ex.: -15.906618,-47.763946";
      document.querySelector("#endereco").value = "";
    }
  }

  ocultarMostrar(mostrar) {
    if (mostrar == true) {
      document.getElementById("tabelaCtos").removeAttribute("hidden");
      document.getElementById("avisoDeUso").removeAttribute("hidden");
      document.getElementById("map").removeAttribute("hidden");
    } else {
      document.getElementById("tabelaCtos").setAttribute("hidden", true);
      document.getElementById("avisoDeUso").setAttribute("hidden", true);
      document.getElementById("map").setAttribute("hidden", true);
    }
  }
  verificarErro(erro) {
    if (erro == "") {
      //document.getElementById("AvisoErro").setAttribute("hidden", true);
    } else {
      document.getElementById("tabelaCtos").setAttribute("hidden", true);
      document.getElementById("avisoDeUso").setAttribute("hidden", true);
      document.getElementById("map").setAttribute("hidden", true);
    }
  }
}
