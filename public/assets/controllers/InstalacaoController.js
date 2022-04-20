class InstalacaoController {
  constructor() {
    this.buscarTecnicos();
    this.buscarUsuarios();
    this.buscarResponsaveis();
    this.buscarVendedores();
    this.preencherCamposFormulario();
  }

  preencherCamposFormulario() {
    let dataInicioForm = localStorage.getItem("dataInicioForm");
    let dataFimForm = localStorage.getItem("dataFimForm");
    let extraForm = localStorage.getItem("extraForm");

    if (dataInicioForm == null && dataFimForm == null && extraForm == null) {
      let dataAtual = moment().format("DD-MM-YYYY");
      let arrayDataAtual = dataAtual.split("-");

      let dataInicioMes = moment([
        arrayDataAtual[2],
        arrayDataAtual[1] - 1,
        arrayDataAtual[0],
      ])
        .startOf("month")
        .format("YYYY-MM-DD");

      let dataFimMes = moment([
        arrayDataAtual[2],
        arrayDataAtual[1] - 1,
        arrayDataAtual[0],
      ])
        .endOf("month")
        .format("YYYY-MM-DD");

      document.querySelector('input[name="dataInicioForm"]').value =
        dataInicioMes;

      document.querySelector('input[name="dataFimForm"]').value = dataFimMes;
    } else {
      document.querySelector('input[name="dataInicioForm"]').value =
        dataInicioForm;

      document.querySelector('input[name="dataFimForm"]').value = dataFimForm;
    }
  }

  limparCampos() {
    document.querySelector('input[name="dataInicioForm"]').value = "";
    document.querySelector('input[name="dataFimForm"]').value = "";
    document.querySelector('select[name="extraForm"]').value = "";
    document.querySelector('select[name="selectUsuarioForm"]').value = "";
    document.querySelector('select[name="selectTecnicoForm"]').value = "";
    document.querySelector('select[name="selectResponsavelForm"]').value = "";
    document.querySelector('select[name="selectVendedorForm"]').value = "";
  }

  buscarVendedores() {
    let usuarios = instalacoesAjax.pegarVendedores(ip_servidor);
    $("#selectVendedorForm").empty();
    usuarios.forEach((element) => {
      $("#selectVendedorForm").append(
        `<option value="${element.nome}">${element.nome}</option>`
      );
    });
  }
  buscarUsuarios() {
    let usuarios = instalacoesAjax.pegarUsuarios(ip_servidor);
    $("#selectUsuarioForm").empty();
    usuarios.forEach((element) => {
      $("#selectUsuarioForm").append(
        `<option value="${element.name}">${element.name}</option>`
      );
    });
  }
  buscarTecnicos() {
    let tecnicos = instalacoesAjax.pegarTecnicos(ip_servidor);
    $("#selectTecnicoForm").empty();
    tecnicos.forEach((element) => {
      $("#selectTecnicoForm").append(`<option>${element.name}</option>`);
    });
  }
  buscarResponsaveis() {
    let responsaveis = instalacoesAjax.pegarUsuarios(ip_servidor);
    $("#selectResponsavelForm").empty();
    responsaveis.forEach((element) => {
      $("#selectResponsavelForm").append(
        `<option value="${element.name}">${element.name}</option>`
      );
    });
  }
  guardarInformacoesFormulario() {
    let dataInicioForm = $('input[name="dataInicioForm"]').val();
    let dataFimForm = $('input[name="dataFimForm"]').val();
    let extraForm = $('select[name="extraForm"]').val();

    localStorage.clear();

    localStorage.setItem("dataInicioForm", dataInicioForm);
    localStorage.setItem("dataFimForm", dataFimForm);
    localStorage.setItem("extraForm", extraForm);
  }

  /*
  pesquisarFormulario() {
    let dataInicioForm = $('input[name="dataInicioForm"]').val();
    let dataFimForm = $('input[name="dataFimForm"]').val();
    let extraForm = $('select[name="extraForm"]').val();
    let selectVendedorForm = $('select[name="selectVendedorForm"]').val();
    let selectUsuarioForm = $('select[name="selectUsuarioForm"]').val();
    let selectTecnicoForm = $('select[name="selectTecnicoForm"]').val();
    let selectResponsavelForm = $('select[name="selectResponsavelForm"]').val();

    let vendedor = "";
    let tecnico = "";
    let usuario = "";
    let responsavel = "";

    selectVendedorForm.forEach((element) => {
      if (vendedor == "") {
        vendedor += `${element}`;
      } else {
        vendedor += `,${element}`;
      }
    });

    selectTecnicoForm.forEach((element) => {
      if (tecnico == "") {
        tecnico += `${element}`;
      } else {
        tecnico += `,${element}`;
      }
    });

    selectUsuarioForm.forEach((element) => {
      if (usuario == "") {
        usuario += `${element}`;
      } else {
        usuario += `,${element}`;
      }
    });
    selectResponsavelForm.forEach((element) => {
      if (responsavel == "") {
        responsavel += `${element}`;
      } else {
        responsavel += `,${element}`;
      }
    });

    let instalacoes = instalacoesAjax.pegarInstalacoes(
      ip_servidor,
      dataInicioForm,
      dataFimForm,
      extraForm,
      vendedor,
      usuario,
      tecnico,
      responsavel
    );
    $("#bodyTable").empty();

    instalacoes.forEach((element) => {
      $("#bodyTable").append(`
      <tr>
      <td>
      ${element.Contrato_Nome}
      </td>
      <td>
      ${element.Plano}
      </td>
      <td>
      ${element.Preço}
      </td>
      <td>
      ${element.Data_de_Cadastro}
      </td>
      <td>
      ${element.Data_finalização}
      </td>
      <td>
      ${element.Vendedor}
      </td>
      <td>
      ${element.Usuário_R_Cadastro}
      </td>
      <td>
      ${element.Técnico_responsável}
      </td>
      <td>
      ${element.Usuario_Finaliza}
      </td>
      <td>
      ${element.extra}
      </td>
  </tr>
  
      `);
    });
  }*/
}
