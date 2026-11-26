<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: cadastro.html', true, 303);
    exit;
}

$nome = $_POST['nome'] ?? '';
$emailRecebido = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';
$confirmacao = $_POST['confirmar_senha'] ?? '';

if (!is_string($nome) || !is_string($emailRecebido) ||
    !is_string($senha) || !is_string($confirmacao)) {
    header('Location: cadastro.html?estado=campos', true, 303);
    exit;
}

$nome = trim($nome);
$email = strtolower(trim($emailRecebido));

$nomeTamanho = function_exists('mb_strlen') ? mb_strlen($nome, 'UTF-8') : strlen($nome);

if ($nome === '' || $nomeTamanho > 100 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254 ||
    strlen($senha) < 8 || strlen($senha) > 72 ||
    $senha !== $confirmacao) {
    header('Location: cadastro.html?estado=campos', true, 303);
    exit;
}

require __DIR__ . '/conexao.php';

try {
    // A restrição UNIQUE no campo email também evita cadastros duplicados simultâneos.
    $hash = password_hash($senha, PASSWORD_DEFAULT);
    $stmt = $conexao->prepare(
        'INSERT INTO usuarios (nome, email, senha, criado_em) VALUES (?, ?, ?, CURRENT_TIMESTAMP)'
    );
    $stmt->bind_param('sss', $nome, $email, $hash);
    $stmt->execute();

    header('Location: login.html?estado=cadastrado', true, 303);
    exit;
} catch (mysqli_sql_exception $erro) {
    if ($erro->getCode() === 1062) {
        header('Location: cadastro.html?estado=email', true, 303);
        exit;
    }

    error_log('Hairstyle: falha ao cadastrar usuário.');
    http_response_code(503);
    echo 'O cadastro está indisponível no momento.';
}
