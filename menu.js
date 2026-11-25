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
