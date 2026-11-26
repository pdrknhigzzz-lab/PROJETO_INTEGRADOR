const botaoMenu = document.querySelector('.site-menu');
const cabecalho = document.querySelector('.site-header');
const telaPequena = window.matchMedia('(max-width: 850px)');

function definirMenu(aberto) {
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    cabecalho.classList.toggle('menu-aberto', aberto);
}

function ajustarMenu() {
    botaoMenu.hidden = !telaPequena.matches;
    definirMenu(false);
}

botaoMenu.addEventListener('click', () => {
    definirMenu(botaoMenu.getAttribute('aria-expanded') === 'false');
});

cabecalho.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && botaoMenu.getAttribute('aria-expanded') === 'true') {
        definirMenu(false);
        botaoMenu.focus();
    }
});

telaPequena.addEventListener('change', ajustarMenu);
ajustarMenu();

const linkEntrar = cabecalho.querySelector('.site-nav a[href="login.html"]');
const conta = document.createElement('form');
conta.className = 'menu-conta';
conta.action = 'logout.php';
conta.method = 'post';

const nomeUsuario = document.createElement('span');
const botaoSair = document.createElement('button');
botaoSair.type = 'submit';
botaoSair.textContent = 'Sair';
conta.append(nomeUsuario, botaoSair);

async function atualizarConta() {
    try {
        const resposta = await fetch('sessao.php', { cache: 'no-store' });
        if (resposta.ok && resposta.headers.get('Content-Type')?.includes('application/json')) {
            const sessao = await resposta.json();
            if (sessao.nome) {
                nomeUsuario.textContent = 'Olá, ' + sessao.nome;
                if (linkEntrar.isConnected) linkEntrar.replaceWith(conta);
                return;
            }
        }
    } catch {
        // A navegação pública também funciona quando o PHP está indisponível.
    }
    if (conta.isConnected) conta.replaceWith(linkEntrar);
}

// Consulta a sessão novamente ao voltar para uma página pelo histórico.
window.addEventListener('pageshow', atualizarConta);
