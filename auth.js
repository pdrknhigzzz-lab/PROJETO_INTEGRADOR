const formulario = document.querySelector('form');
const campos = formulario.querySelectorAll('input');
const mensagemFormulario = document.querySelector('#mensagem-formulario');

const avisos = new Map([
    ['credenciais', 'Confira seu e-mail e sua senha.'],
    ['campos', 'Confira os campos e a confirmação da senha.'],
    ['email', 'Este e-mail já está cadastrado.'],
    ['cadastrado', 'Cadastro realizado. Entre com seu e-mail e senha.']
]);
if (!formulario.hasAttribute('data-demo')) {
    const avisoDemo = document.querySelector('[data-aviso-demo]');
    if (avisoDemo) avisoDemo.hidden = true;
    mensagemFormulario.textContent = avisos.get(new URLSearchParams(location.search).get('estado')) || '';
}

// Mantém a validação nativa disponível até que os avisos por campo estejam ativos.
formulario.noValidate = true;

function mensagemDoCampo(campo) {
    if (!campo.value.trim()) return 'Preencha este campo.';
    if (campo.type === 'email' && campo.validity.typeMismatch) return 'Digite um e-mail válido.';
    if (campo.name === 'senha' && formulario.id !== 'formLogin' && (campo.value.length < 8 || campo.value.length > 72)) {
        return 'A senha deve ter entre 8 e 72 caracteres.';
    }
    if (campo.name === 'confirmar_senha' && campo.value !== formulario.elements.senha.value) {
        return 'As senhas precisam ser iguais.';
    }
    return '';
}

function validarCampo(campo) {
    const aviso = mensagemDoCampo(campo);
    document.getElementById('erro-' + campo.name).textContent = aviso;
    campo.setAttribute('aria-invalid', String(Boolean(aviso)));
    return !aviso;
}

formulario.addEventListener('submit', (evento) => {
    let primeiroInvalido;
    campos.forEach((campo) => {
        if (!validarCampo(campo) && !primeiroInvalido) primeiroInvalido = campo;
    });
    mensagemFormulario.textContent = '';
    if (primeiroInvalido) {
        evento.preventDefault();
        primeiroInvalido.focus();
    } else if (formulario.hasAttribute('data-demo')) {
        evento.preventDefault();
        mensagemFormulario.textContent = 'Campos validados para o teste. Nenhum dado foi enviado.';
    }
});

formulario.addEventListener('input', (evento) => {
    const campo = evento.target;
    mensagemFormulario.textContent = '';
    if (campo.getAttribute('aria-invalid') === 'true') validarCampo(campo);
    const confirmacao = formulario.elements.confirmar_senha;
    if (campo.name === 'senha' && confirmacao && confirmacao.value) validarCampo(confirmacao);
});

formulario.querySelector('button[type=submit]').disabled = false;
