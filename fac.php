<?php
header('Content-Type: text/plain; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit('Envie a pergunta usando o formulário.');
}

$pergunta = $_POST['pergunta'] ?? '';
if (!is_string($pergunta)) {
    http_response_code(422);
    exit('Pergunta inválida.');
}

$pergunta = trim($pergunta);
$tamanho = function_exists('mb_strlen') ? mb_strlen($pergunta, 'UTF-8') : strlen($pergunta);

if ($pergunta === '' || $tamanho > 1000) {
    http_response_code(422);
    exit('Digite uma pergunta de até 1000 caracteres.');
}

require __DIR__ . '/conexao.php';

try {
    $stmt = $conexao->prepare('INSERT INTO perguntas (pergunta, criado_em) VALUES (?, CURRENT_TIMESTAMP)');
    $stmt->bind_param('s', $pergunta);
    $stmt->execute();

    echo 'Sua pergunta foi enviada com sucesso!';
} catch (mysqli_sql_exception $erro) {
    error_log('Hairstyle: falha ao salvar pergunta.');
    http_response_code(500);
    echo 'Erro ao enviar sua pergunta.';
}
