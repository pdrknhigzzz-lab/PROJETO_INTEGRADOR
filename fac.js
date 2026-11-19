function mostrarResposta(pergunta) {

    const resposta = document.getElementById("resposta");

    if (pergunta == "pagamento") {
        resposta.innerHTML = "Aceitamos Pix, dinheiro e cartões de crédito e débito.";
    }

    else if (pergunta == "prazo") {
        resposta.innerHTML = "O prazo depende do serviço escolhido. Entre em contato com a loja para confirmar.";
    }

    else if (pergunta == "contato") {
        resposta.innerHTML = "Você pode entrar em contato pelo email hairstyle@gmail.com ou pelo Instagram hairstyle_ofc.";
    }

    else if (pergunta == "horarios") {
        resposta.innerHTML = "Entre em contato com a loja para consultar os horários disponíveis.";
    }

    else if (pergunta == "cancelamento") {
        resposta.innerHTML = "Para cancelar um pedido ou atendimento, entre em contato com a loja.";
    }

    else if (pergunta == "profissionais") {
        resposta.innerHTML = "Entre em contato com a loja para saber quantos profissionais estão disponíveis.";
    }

}


// Função para enviar outra pergunta

function enviarPergunta() {

    const campo = document.getElementById("outraPergunta");
    const resposta = document.getElementById("resposta");

    const pergunta = campo.value.trim();

    if (pergunta == "") {
        resposta.innerHTML = "Por favor, escreva uma pergunta.";
        return;
    }

    fetch("enviar_pergunta.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "pergunta=" + encodeURIComponent(pergunta)
    })

    .then(response => response.text())

    .then(dados => {
        resposta.innerHTML = dados;
        campo.value = "";
    })

    .catch(erro => {
        resposta.innerHTML = "Erro ao enviar sua pergunta.";
    });

}
