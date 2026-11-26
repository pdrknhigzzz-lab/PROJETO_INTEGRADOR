<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$nome = null;
if (isset($_COOKIE[session_name()])) {
    session_start(['read_and_close' => true]);
    if (isset($_SESSION['id'], $_SESSION['nome'])) {
        $nome = $_SESSION['nome'];
    }
}

echo json_encode(['nome' => $nome], JSON_UNESCAPED_UNICODE);
