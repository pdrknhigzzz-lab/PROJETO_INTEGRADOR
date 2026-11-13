
<?php

include("conexao.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nome = trim($_POST["nome"]);
    $email = trim($_POST["email"]);
    $senha = $_POST["senha"];
    $confirmar_senha = $_POST["confirmar_senha"];

    // Verificar se as senhas são iguais
    if ($senha != $confirmar_senha) {

        echo "<script>
            alert('As senhas não são iguais!');
            window.location.href = 'cadastro.html';
        </script>";
        exit;
    }

    // Verificar se o e-mail já existe
    $sql = "SELECT id FROM usuarios WHERE email = ?";

    $stmt = $conexao->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {

        echo "<script>
            alert('Este e-mail já está cadastrado!');
            window.location.href = 'cadastro.html';
        </script>";
        exit;

    }

    $stmt->close();

    // Criptografar a senha
    $senha_criptografada = password_hash(
        $senha,
        PASSWORD_DEFAULT
    );

    // Inserir usuário no banco de dados
    $sql = "INSERT INTO usuarios (nome, email, senha)
            VALUES (?, ?, ?)";

    $stmt = $conexao->prepare($sql);

    $stmt->bind_param(
        "sss",
        $nome,
        $email,
        $senha_criptografada
    );

    if ($stmt->execute()) {

        echo "<script>
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html';
        </script>";

    } else {

        echo "<script>
            alert('Erro ao realizar cadastro!');
            window.location.href = 'cadastro.html';
        </script>";

    }

    $stmt->close();
    $conexao->close();

}

?>
