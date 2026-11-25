<?php

// Configure estas variáveis no servidor PHP quando o banco do projeto estiver pronto.
$servidor = getenv('HAIRSTYLE_DB_HOST') ?: 'localhost';
$usuario = getenv('HAIRSTYLE_DB_USER');
$senha = getenv('HAIRSTYLE_DB_PASSWORD');
$banco = getenv('HAIRSTYLE_DB_NAME');

if (!$banco || !$usuario || !extension_loaded('mysqli')) {
    http_response_code(503);
    exit('A conexão com o banco de dados ainda não está disponível.');
}

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
try {
    $conexao = new mysqli($servidor, $usuario, $senha === false ? '' : $senha, $banco);
    $conexao->set_charset('utf8mb4');
} catch (mysqli_sql_exception $erro) {
    http_response_code(503);
    exit('Não foi possível conectar ao banco de dados.');
}
