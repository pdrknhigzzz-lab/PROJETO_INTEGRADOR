
const formulario = document.getElementById("formLogin");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const mensagem = document.getElementById("mensagemErro");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    email.classList.remove("erro");
    senha.classList.remove("erro");
    mensagem.textContent = "";

    if (email.value.trim() === "" || senha.value.trim() === "") {
        mensagem.textContent = "Preencha o e-mail e a senha!";

        if (email.value.trim() === "") {
            email.classList.add("erro");
        }

        if (senha.value.trim() === "") {
            senha.classList.add("erro");
        }
    }
});

[email, senha].forEach(function(campo) {
    campo.addEventListener("input", function() {
        if (campo.value.trim() !== "") {
            campo.classList.remove("erro");
        }

        if (email.value.trim() !== "" && senha.value.trim() !== "") {
            mensagem.textContent = "";
        }
    });
});
