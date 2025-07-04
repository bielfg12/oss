<head>
    <meta charset="utf-8">
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="expires" content="-1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Internet Ágil Hotspot - Cadastro</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery.inputmask.min.js"></script>

    <script>
    $(document).ready(function () {
    $('#cpf').inputmask('999.999.999-99',);
    $('#tel').inputmask('(99)99999-9999',);
    $('#cep').inputmask('99.999-999',);
});
    function validarFormulario() {
        var senha = document.getElementById("senha").value;
        var confirmarSenha = document.getElementById("confirmarSenha").value;

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem. Por favor, verifique a senha informada e tente novamente.");
            return false;
        }

        // Restante da lógica de envio do formulário, se necessário
        return true;
    }
    </script>

</head>


<!-- DB: 	id (id é auto incremento então não precisa mandar);email;nome_sobrenome;telefone;cpf;nome_login;senha, -->
<div class="ie-fixMinHeight">
    <div class="main">
        <div class="wrap animated fadeIn">
            <form onsubmit="return validarFormulario()" action="?page=salvar" method="POST">
                <input type="hidden" name="dst" value="$(link-orig)" />
                <input type="hidden" name="popup" value="true" />
                <img class="logo" data-name="Layer 1" src="img/Agil_Prefeitura.png" alt="Internet Agil"><br>
                <input type="hidden" name="acao" value="cadastrar">

                <div class="mb-3">
                    <label>
                        <img class="ico" src="img/e-mail.png" alt="#" />
                        <input name="email" type="text" placeholder="E-mail" class="form-control" required>
                    </label>
                    <label>
                        <img class="ico" src="img/user.svg" alt="#" />
                        <input name="nome_sobrenome" type="text" placeholder="Nome Completo" class="form-control" required>
                    </label>
                    <label>
                        <img class="ico" src="img/telefone.png" alt="#" />
                        <input name="telefone" id="tel" inputmode="numeric" type="text" placeholder="Telefone" class="form-control" required>
                    </label>
                    <label>
                        <img class="ico" src="img/adress.png" alt="#" />
                        <input name="uf" id="uf" type="text" placeholder="Estado" class="form-control" required>
                    </label>  
                    <label>
                        <img class="ico" src="img/adress.png" alt="#" />
                        <input name="rua" id="rua" type="text" placeholder="Rua" class="form-control" required>
                    </label>
                    <label>
                        <img class="ico" src="img/adress.png" alt="#" />
                        <input name="bairro" id="bairro" type="text" placeholder="Bairro" class="form-control" required>
                    </label>
                    <label>
                        <img class="ico" src="img/adress.png" alt="#" />
                        <input name="cidade" id="cidade" type="text" placeholder="Cidade" class="form-control" required>
                    </label>         
                    <label>
                        <img class="ico" src="img/home.png" alt="#" />
                        <input name="numero" id="numero" type="text" inputmode="numeric" placeholder="Nº da Residência" inputmode="numeric" class="form-control" required>
                    </label>
                    <label>
                        <img class="ico" src="img/arquivo.png" alt="#" />
                        <input name="cpf" id="cpf" inputmode="numeric" type="text" placeholder="CPF" class="form-control" required>
                    </label>
                    <label>
                        <img class="ico" src="img/user.svg" alt="#" />
                        <input name="nome_login" type="text" placeholder="Login" class="form-control" required>
                    </label>
                    <label>
                        <img class="ico" src="img/password.svg" alt="#" />
                        <input name="senha" id="senha" type="password" placeholder="Senha" class="form-control" required>
                    </label>
                    <label>
                        <img class="ico" src="img/password.svg" alt="#" />
                        <input name="confirmarSenha" id="confirmarSenha" type="password" placeholder="Confirme a Senha" class="form-control" required>
                    </label>
                    <div class="mb-3">
                     <button type="submit" class="botao">Cadastrar</button>
                    </div> 
                </input>
            </form>

