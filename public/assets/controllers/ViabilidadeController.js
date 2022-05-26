class ViabilidadeController {
  constructor(mostrar) {
    this.ocultarMostrar(mostrar);
  }

  mudarPlace() {
    var tipo = document.getElementById("inputGroupSelect01");
    var value = tipo.options[tipo.selectedIndex].value;

    if (value == "endereco") {
      document.getElementById("endereco").placeholder =
        "Quadra x Rua x Casa x Lote x São Sebastiao DF";
    } else {
      document.getElementById("endereco").placeholder =
        "Ex.: -15.906618,-47.763946";
    }
  }

  ocultarMostrar(mostrar) {
    if (mostrar == true) {
      //document.getElementById("tabelaCtos").removeAttribute("hidden");
      //document.getElementById("avisoDeUso").removeAttribute("hidden");
    } else {
      //document.getElementById("tabelaCtos").setAttribute("hidden", true);
      //document.getElementById("avisoDeUso").setAttribute("hidden", true);
    }
  }
}
