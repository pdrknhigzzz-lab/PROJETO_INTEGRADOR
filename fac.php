
<?php

// Conexão com o banco de dados
$servidor = "localhost";
$usuario = "root";
$senha = "";
$banco = "hairstyle";

$conexao = new mysqli($servidor, $usuario, $senha, $banco);

// Verifica a conexão
if ($conexao->connect_error) {
    die("Erro na conexão com o banco de dados.");
}

// Recebe a pergunta
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $pergunta = trim($_POST["pergunta"] ?? "");

    if (empty($pergunta)) {
        echo "Digite uma pergunta.";
    } else {

        $sql = "INSERT INTO perguntas (pergunta)
                VALUES (?)";

        $stmt = $conexao->prepare($sql);
        $stmt->bind_param("s", $pergunta);

        if ($stmt->execute()) {
            echo "Sua pergunta foi enviada com sucesso!";
        } else {
            echo "Erro ao enviar sua pergunta.";
        }

        $stmt->close();
    }
}

$conexao->close();

?>
