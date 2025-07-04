<?php   
    //Conexão com o banco no servidor
    define ('HOST','45.6.167.59');
    define ('USER','cadastromikrotik');
    define ('PASS','Cmc1303!');
    define ('BASE','cadastro');

    $conn = new mysqli(HOST, USER, PASS, BASE);

    if ($conn->connect_error) {
        die("Erro de conexão: " . $conn->connect_error);
    } else {
        echo "Conexão bem-sucedida!";
    }

