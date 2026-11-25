<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: cadastro.html', true, 303);
    exit;
}

$nome = $_POST['nome'] ?? '';
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$senha = $_POST['senha'] ?? '';
if (!is_string($nome) || trim($nome) === '' || !$email || !is_string($senha)
    || $senha === '' || $senha !== ($_POST['confirmar_senha'] ?? null)) {
    header('Location: cadastro.html?estado=campos', true, 303);
    exit;
}
$nome = trim($nome);

require __DIR__ . '/conexao.php';
try {
    $stmt = $conexao->prepare('SELECT id FROM usuarios WHERE email = ?');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        header('Location: cadastro.html?estado=email', true, 303);
        exit;
    }
    $stmt->close();
    $hash = password_hash($senha, PASSWORD_DEFAULT);
    $stmt = $conexao->prepare('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)');
    $stmt->bind_param('sss', $nome, $email, $hash);
    $stmt->execute();
    header('Location: login.html?estado=cadastrado', true, 303);
} catch (mysqli_sql_exception $erro) {
    if ($erro->getCode() === 1062) {
        header('Location: cadastro.html?estado=email', true, 303);
        exit;
    }
    http_response_code(503);
    echo 'O cadastro está indisponível no momento.';
}
