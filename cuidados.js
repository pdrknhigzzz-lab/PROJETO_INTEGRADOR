const tiposDeCabelo = {
    liso: { nome: 'Liso', numero: 1 },
    ondulado: { nome: 'Ondulado', numero: 2 },
    cacheado: { nome: 'Cacheado', numero: 3 },
    crespo: { nome: 'Crespo', numero: 4 }
};

const produtos = [
    {
        nome: 'Shampoo Equilíbrio', categoria: 'Limpeza',
        descricao: 'Limpeza suave que respeita a oleosidade natural.',
        uso: 'Use 2x por semana', cor: '#6c3bff', formato: 'frasco'
    },
    {
        nome: 'Máscara Hidratação Profunda', categoria: 'Tratamento',
        descricao: 'Reposição de água e maciez para fios ondulados.',
        uso: '1x por semana, 10 min', cor: '#b78cff', formato: 'pote'
    },
    {
        nome: 'Leave-in Definição', categoria: 'Finalização',
        descricao: 'Define ondas e reduz o frizz sem pesar.',
        uso: 'Diariamente, fios úmidos', cor: '#111111', formato: 'bisnaga'
    },
    {
        nome: 'Óleo Brilho Seda', categoria: 'Finalização',
        descricao: 'Toque final com brilho e proteção térmica.',
        uso: 'Poucas gotas nas pontas', cor: '#d9b36c', formato: 'conta-gotas'
    },
    {
        nome: 'Condicionador Nutri', categoria: 'Limpeza',
        descricao: 'Desembaraça e sela as cutículas após o shampoo.',
        uso: 'Após cada lavagem', cor: '#8a4dff', formato: 'frasco'
    },
    {
        nome: 'Protetor Térmico', categoria: 'Proteção',
        descricao: 'Barreira contra calor de até 230°C.',
        uso: 'Antes de secador e chapinha', cor: '#3b3a44', formato: 'spray'
    }
];

// As ilustrações vêm do componente ProductArt da exportação do Figma Make.
const ilustracoes = {
    frasco: (cor, etiqueta) => `
        <rect x="44" y="6" width="32" height="18" rx="5" fill="#111"/>
        <rect x="50" y="22" width="20" height="10" fill="${cor}" opacity=".8"/>
        <rect x="30" y="30" width="60" height="112" rx="18" fill="${cor}"/>
        <rect x="38" y="62" width="44" height="48" rx="6" fill="${etiqueta}" opacity=".92"/>
        <rect x="44" y="72" width="32" height="4" rx="2" fill="${cor}"/>
        <rect x="44" y="82" width="22" height="3" rx="1.5" fill="${cor}" opacity=".5"/>`,
    pote: (cor, etiqueta) => `
        <rect x="18" y="50" width="84" height="22" rx="8" fill="#111"/>
        <rect x="22" y="70" width="76" height="72" rx="16" fill="${cor}"/>
        <rect x="34" y="88" width="52" height="36" rx="6" fill="${etiqueta}" opacity=".92"/>
        <rect x="42" y="98" width="36" height="4" rx="2" fill="${cor}"/>`,
    bisnaga: (cor, etiqueta) => `
        <path d="M38 12h44l6 118H32z" fill="${cor}"/>
        <rect x="32" y="128" width="56" height="14" rx="3" fill="#b78cff"/>
        <rect x="44" y="52" width="32" height="42" rx="5" fill="${etiqueta}" opacity=".9"/>
        <rect x="49" y="62" width="22" height="4" rx="2" fill="${cor}"/>`,
    'conta-gotas': (cor) => `
        <ellipse cx="60" cy="14" rx="14" ry="12" fill="#111"/>
        <rect x="50" y="22" width="20" height="18" fill="#3b3a44"/>
        <rect x="32" y="38" width="56" height="104" rx="14" fill="${cor}" opacity=".95"/>
        <rect x="40" y="68" width="40" height="44" rx="5" fill="#111"/>
        <rect x="46" y="78" width="28" height="4" rx="2" fill="#d9b36c"/>`,
    spray: (cor, etiqueta) => `
        <rect x="42" y="4" width="36" height="14" rx="4" fill="#b78cff"/>
        <rect x="52" y="16" width="16" height="16" fill="#111"/>
        <rect x="34" y="30" width="52" height="112" rx="14" fill="${cor}"/>
        <rect x="41" y="62" width="38" height="46" rx="5" fill="${etiqueta}" opacity=".92"/>
        <rect x="47" y="72" width="26" height="4" rx="2" fill="${cor}"/>`
};

const botoesTipo = document.querySelectorAll('[data-tipo]');
const nomeCabelo = document.querySelector('#nome-cabelo');
const numeroCabelo = document.querySelector('#numero-cabelo');
const tipoProdutos = document.querySelector('#tipo-produtos');

botoesTipo.forEach((botao) => {
    botao.addEventListener('click', () => {
        const tipo = tiposDeCabelo[botao.dataset.tipo];
        nomeCabelo.textContent = tipo.nome;
        numeroCabelo.textContent = `Tipo ${tipo.numero}`;
        tipoProdutos.textContent = tipo.nome.toLocaleLowerCase('pt-BR');
        botoesTipo.forEach((opcao) => opcao.setAttribute('aria-pressed', opcao === botao));
    });
});

const botoesFiltro = document.querySelectorAll('[data-categoria]');
const gradeProdutos = document.querySelector('#produtos');
const modeloProduto = document.querySelector('#modelo-produto');
const statusProdutos = document.querySelector('#status-produtos');

function mostrarProdutos(categoria) {
    const lista = categoria === 'Todos'
        ? produtos
        : produtos.filter((produto) => produto.categoria === categoria);
    const cartoes = lista.map((produto) => {
        const cartao = modeloProduto.content.cloneNode(true);
        const etiqueta = ['#b78cff', '#d9b36c'].includes(produto.cor) ? '#111' : '#fff';
        const arte = ilustracoes[produto.formato](produto.cor, etiqueta);

        cartao.querySelector('.produto-arte').innerHTML = `<svg viewBox="0 0 120 150" aria-hidden="true">${arte}</svg>`;
        cartao.querySelector('.selo').textContent = produto.categoria;
        cartao.querySelector('h3').textContent = produto.nome;
        cartao.querySelector('.produto-descricao').textContent = produto.descricao;
        cartao.querySelector('.produto-uso').textContent = produto.uso;
        return cartao;
    });

    gradeProdutos.replaceChildren(...cartoes);
    statusProdutos.textContent = lista.length === 1 ? '1 produto exibido.' : `${lista.length} produtos exibidos.`;
}

botoesFiltro.forEach((botao) => {
    botao.addEventListener('click', () => {
        botoesFiltro.forEach((opcao) => opcao.setAttribute('aria-pressed', opcao === botao));
        mostrarProdutos(botao.dataset.categoria);
    });
});

mostrarProdutos('Todos');

const cabecalho = document.querySelector('.cabecalho');
const botaoMenu = document.querySelector('.botao-menu');
const iconeMenu = botaoMenu.querySelector('use');

function alternarMenu(aberto) {
    cabecalho.classList.toggle('menu-aberto', aberto);
    botaoMenu.setAttribute('aria-expanded', aberto);
    botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    iconeMenu.setAttribute('href', aberto ? '#icone-fechar' : '#icone-menu');
}

botaoMenu.addEventListener('click', () => {
    alternarMenu(!cabecalho.classList.contains('menu-aberto'));
});

cabecalho.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && cabecalho.classList.contains('menu-aberto')) {
        alternarMenu(false);
        botaoMenu.focus();
    }
});

document.querySelector('#form-novidades').addEventListener('submit', (evento) => {
    evento.preventDefault();
    document.querySelector('#mensagem-novidades').hidden = false;
});
