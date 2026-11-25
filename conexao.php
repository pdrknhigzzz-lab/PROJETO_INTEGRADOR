<?php
// Configure estas variáveis no ambiente do servidor:
// HAIRSTYLE_DB_HOST, HAIRSTYLE_DB_USER, HAIRSTYLE_DB_PASSWORD e HAIRSTYLE_DB_NAME.

$servidor = getenv('HAIRSTYLE_DB_HOST') ?: 'localhost';
$usuario = getenv('HAIRSTYLE_DB_USER');
$senha = getenv('HAIRSTYLE_DB_PASSWORD');
$banco = getenv('HAIRSTYLE_DB_NAME');

if (!$usuario || !$banco || !extension_loaded('mysqli')) {
    http_response_code(503);
    exit('A conexão com o banco de dados ainda não está disponível.');
}

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conexao = new mysqli(
        $servidor,
        $usuario,
        $senha === false ? '' : $senha,
        $banco
    );
    $conexao->set_charset('utf8mb4');
} catch (mysqli_sql_exception $erro) {
    // Não exponha credenciais nem detalhes internos do servidor.
    error_log('Hairstyle: falha ao conectar ao banco de dados.');
    http_response_code(503);
    exit('Não foi possível conectar ao banco de dados.');
}
