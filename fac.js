const respostas = {
    projeto: 'A Hairstyle é um projeto de curso para explorar referências de estilos e cuidados capilares.',
    cortes: 'Abra Estilos e escolha a categoria Cortes para ver as referências da galeria.',
    cuidados: 'Em Cuidados, selecione seu tipo de cabelo para ver sugestões de rotina e finalização.',
    resultado: 'Cada cabelo tem suas características. Leve as referências ao profissional para conversar sobre o resultado que você procura.',
    conta: 'Você pode explorar todas as referências e rotinas de cuidados sem criar uma conta.',
    penteados: 'Na página Estilos, use os filtros Penteados e Cores para explorar essas referências.'
};

const painelResposta = document.getElementById('resposta');
const perguntas = document.querySelectorAll('[data-pergunta]');

function exibirResposta(texto) {
    painelResposta.textContent = texto;
    if (window.matchMedia('(max-width: 760px)').matches) {
        painelResposta.scrollIntoView({ block: 'center' });
    }
}

perguntas.forEach((botao) => {
    botao.addEventListener('click', () => exibirResposta(respostas[botao.dataset.pergunta]));
});

const formularioPergunta = document.querySelector('.outra');
formularioPergunta.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const campo = document.getElementById('outraPergunta');
    if (!campo.value.trim()) {
        campo.setCustomValidity('Escreva sua pergunta.');
        campo.reportValidity();
        return;
    }
    if (formularioPergunta.hasAttribute('data-demo')) {
        exibirResposta('O envio de perguntas ainda não está disponível nesta versão.');
        return;
    }

    const enviar = formularioPergunta.querySelector('button');
    if (enviar.disabled) return;
    enviar.disabled = true;
    try {
        const resposta = await fetch(formularioPergunta.action, {
            method: 'POST',
            body: new FormData(formularioPergunta)
        });
        if (!resposta.headers.get('Content-Type')?.startsWith('text/plain')) {
            throw new Error('Resposta do servidor indisponível.');
        }
        const mensagem = await resposta.text();
        exibirResposta(mensagem);
        if (resposta.ok) formularioPergunta.reset();
    } catch {
        exibirResposta('Não foi possível enviar a pergunta. Tente novamente.');
    } finally {
        enviar.disabled = false;
    }
});

document.getElementById('outraPergunta').addEventListener('input', (evento) => {
    evento.target.setCustomValidity('');
});
