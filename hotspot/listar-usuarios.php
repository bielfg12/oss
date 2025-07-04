<h1>Listar Usuários</h1>
<?php
//conexão com o banco de dados, puxando os dados da tabela usuarios 
$sql = "SELECT * FROM usuarios";
$res = $conn->query($sql);
$qtd = $res->num_rows;

if ($qtd > 0) {
    print "<table class='table table-hover table-striped table-bordered' >"; //para exibir no formato tabela, se não fica tudo junto, o class trás o bootstrap para embelezar
    //table-hover para mostrar seleção quando passar o mouse em cima, table-striped já diferencia as linhas (zebrada)

        print "<tr>";
        print "<th>#</th>";
        print "<th>E-mail</th>";
        print "<th>Nome e Sobrenome</th>";
        print "<th>Telefone</th>";
        print "<th>CPF</th>";
        print "<th>Nome Login</th>";
        print "<th>Ações</th>";
    //a senha do cliente não vamos trazer.
    print "</tr>";
    while ($row = $res->fetch_object()) {
        print "<tr>";
        print "<td>" . $row->id . "</td>";
        print "<td>" . $row->email . "</td>";
        print "<td>" . $row->nome_sobrenome . "</td>";
        print "<td>" . $row->telefone . "</td>";
        print "<td>" . $row->cpf . "</td>";
        print "<td>" . $row->nome_login . "</td>";
        //a senha do cliente não vamos trazer.
        print "<td>
                <button onclick=\"location.href='?page=editar&id=".$row-> id."';\" class='btn btn-success'>Editar</button>
                <button onclick=\"if (confirm('Tem certeza que deseja excluir?')){location.href='?page=salvar&acao=excluir&id=".$row-> id."'}else{false;}\" class='btn btn-danger'>Excluir</button>
              </td>";
        print "</tr>";
    }
    print "</table";
} else {
    print "p class='alert alert-danger'>Não encontrou resultados!</p>";
}
?>