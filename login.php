<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: login.html', true, 303);
    exit;
}

$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$senha = $_POST['senha'] ?? '';
if (!$email || !is_string($senha) || $senha === '') {
    header('Location: login.html?estado=credenciais', true, 303);
    exit;
}

require __DIR__ . '/conexao.php';
try {
    $stmt = $conexao->prepare('SELECT id, nome, senha FROM usuarios WHERE email = ?');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->bind_result($id, $nome, $hash);
    if (!$stmt->fetch() || !password_verify($senha, $hash)) {
        header('Location: login.html?estado=credenciais', true, 303);
        exit;
    }
    session_start();
    session_regenerate_id(true);
    $_SESSION['id'] = $id;
    $_SESSION['nome'] = $nome;
    header('Location: index.html', true, 303);
} catch (mysqli_sql_exception $erro) {
    http_response_code(503);
    echo 'O login está indisponível no momento.';
}
