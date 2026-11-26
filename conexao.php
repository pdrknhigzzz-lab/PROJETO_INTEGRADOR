<?php
// Desenvolvimento local (XAMPP): localhost / root / senha vazia / hairstyle.
// Em hospedagem, configure as variáveis de ambiente abaixo com credenciais próprias.
$servidor = getenv('HAIRSTYLE_DB_HOST') ?: 'localhost';
$usuario = getenv('HAIRSTYLE_DB_USER') ?: 'root';
$senhaBanco = getenv('HAIRSTYLE_DB_PASSWORD');
$banco = getenv('HAIRSTYLE_DB_NAME') ?: 'hairstyle';

if (!extension_loaded('mysqli')) {
    http_response_code(503);
    exit('A extensão mysqli do PHP não está habilitada.');
}

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conexao = new mysqli(
        $servidor,
        $usuario,
        $senhaBanco === false ? '' : $senhaBanco,
        $banco
    );
    $conexao->set_charset('utf8mb4');
} catch (mysqli_sql_exception $erro) {
    // Não exponha credenciais nem detalhes internos do servidor.
    error_log('Hairstyle: falha ao conectar ao banco de dados.');
    http_response_code(503);
    exit('Não foi possível conectar ao banco de dados. Confira a configuração do MySQL.');
}
