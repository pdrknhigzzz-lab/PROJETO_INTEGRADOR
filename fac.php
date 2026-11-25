<?php

header('Content-Type: text/plain; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit('Envie a pergunta usando o formulário.');
}

$pergunta = $_POST['pergunta'] ?? '';
if (!is_string($pergunta) || trim($pergunta) === '') {
    http_response_code(422);
    exit('Digite uma pergunta.');
}
$pergunta = trim($pergunta);

require __DIR__ . '/conexao.php';
try {
    $stmt = $conexao->prepare('INSERT INTO perguntas (pergunta) VALUES (?)');
    $stmt->bind_param('s', $pergunta);
    $stmt->execute();
    echo 'Sua pergunta foi enviada com sucesso!';
} catch (mysqli_sql_exception $erro) {
    http_response_code(500);
    echo 'Erro ao enviar sua pergunta.';
}
