<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: login.html', true, 303);
    exit;
}

$emailRecebido = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

if (!is_string($emailRecebido) || !is_string($senha) ||
    !filter_var(trim($emailRecebido), FILTER_VALIDATE_EMAIL) ||
    $senha === '' || strlen($senha) > 72) {
    header('Location: login.html?estado=credenciais', true, 303);
    exit;
}

$email = strtolower(trim($emailRecebido));

require __DIR__ . '/conexao.php';

try {
    $stmt = $conexao->prepare(
        'SELECT id, nome, senha FROM usuarios WHERE email = ? LIMIT 1'
    );
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->bind_result($id, $nome, $hash);

    if (!$stmt->fetch() || !password_verify($senha, $hash)) {
        header('Location: login.html?estado=credenciais', true, 303);
        exit;
    }

    // Cookie de sessão com HttpOnly e SameSite; Secure quando estiver em HTTPS.
    $https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    session_set_cookie_params([
        'httponly' => true,
        'secure' => $https,
        'samesite' => 'Lax',
        'path' => '/'
    ]);
    session_start();
    session_regenerate_id(true);

    $_SESSION['id'] = (int) $id;
    $_SESSION['nome'] = $nome;

    header('Location: index.html', true, 303);
    exit;
} catch (mysqli_sql_exception $erro) {
    error_log('Hairstyle: falha na consulta de login (' . $erro->getCode() . '): ' . $erro->getMessage());
    http_response_code(503);
    echo 'O login está indisponível no momento.';
}
