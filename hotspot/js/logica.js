$(document).ready(function() {
    $('#ListaTabela').DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/2.0.1/i18n/pt-BR.json',
    },
      ajax: {
        url: "dados.php",
        dataType: "json",
        dataSrc: ""
      },
      columns: [
        { data: "id" },
        { data: "email" },
        { data: "nome_sobrenome" },
        { data: "telefone" },
        { data: "cpf" },
        { data: "data_cadastro" },
        { data: "cep" },
        { data: "rua" },
        { data: "numero" },
        { data: "bairro" },
        { data: "cidade" },
        { data: "uf" },
        { data: "ip_local" },
        { data: "nome_login" }
      ]
    });
  });