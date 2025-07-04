<!doctype html>
<html lang="pt-BR">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cadastro</title>
    <link href="css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <!-- Navbar Bootstrap -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Cadastro</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="?page=login">Login</a> <!-- 
                        <a class="nav-link active" aria-current="page" href="?page=login">Login</a>     
                        Aqui vou trazer
                    de volta a tela de login pelo Navbar, criei também no switch o case Login (Não deu, ele trás a mesma tela só que sem) -->
                    </li>
                    <li class="nav-item">
                            <!-- em vez de chamar a página  novo-usuario.php, chama com
                             ?page=novo para puxar em switch e trazer para dentro da div na mesma página.                       -->
                        <a class="nav-link" href="?page=novo">Criar conta</a>
                    </li>
                    <!-- <li class="nav-item">
                        <a class="nav-link" href="?page=listar">Listar Usuários</a>
                    </li> -->
                   </ul>
            </div>
        </div>
    </nav>


<!-- Essa div faz com que em vez de abrir asinformações em outra página, trava na mesma em uma divisória (div).-->
<div class="container">
    <div class="'row">
        <div class="col mt-5">

         <!-- Trazer as páginas nos botões, ficando tudo na mesma página -->
        <?php   
            include("config.php");         
            switch (@$_REQUEST["page"]) {
                case "novo":
                    include("novo-usuario.php");
                    break;
                case "listar":
                    include("listar-usuarios.php");
                    break;
                case "salvar":
                    include("salvar-usuario.php");
                    break;
                case "editar":
                    include("editar-usuario.php");
                    break;
                case "login":
                    include("login.html"); // Switch para trazer a tela de Login
                    break;                    
                default:
                    print "<h1>Bem Vindo</h1>";
            }
        ?>
        </div>
    </div>
</div>

    <script src="js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>



</body>

</html>