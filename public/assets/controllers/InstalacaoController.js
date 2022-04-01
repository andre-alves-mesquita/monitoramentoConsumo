class InstalacaoController {
  constructor() {}

  limparCampos() {
    document.querySelector('input[name="tecnicoForm"]').value = "";
    document.querySelector('input[name="dataInicioForm"]').value = "";
    document.querySelector('input[name="dataFimForm"]').value = "";
    document.querySelector('input[name="vendedorForm"]').value = "";
    document.querySelector('input[name="usuarioForm"]').value = "";
  }

  pesquisarFormulario() {
    let tecnicoForm = document.querySelector('input[name="tecnicoForm"]').value;
    let dataInicioForm = document.querySelector(
      'input[name="dataInicioForm"]'
    ).value;
    let dataFimForm = document.querySelector('input[name="dataFimForm"]').value;
    let vendedorForm = document.querySelector(
      'input[name="vendedorForm"]'
    ).value;
    let usuarioForm = document.querySelector('input[name="usuarioForm"]').value;


    
  }
}
