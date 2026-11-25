const produtos = [
    {
        nome: 'Shampoo Equilíbrio', categoria: 'Limpeza',
        descricao: 'Limpeza suave que respeita a oleosidade natural.',
        uso: 'Frequência conforme a necessidade', cor: '#6c3bff', formato: 'frasco'
    },
    {
        nome: 'Máscara Hidratação Profunda', categoria: 'Tratamento',
        descricao: 'Máscara para hidratar e dar maciez aos fios.',
        uso: 'Conforme as instruções do rótulo', cor: '#b78cff', formato: 'pote'
    },
    {
        nome: 'Leave-in', categoria: 'Finalização', personalizarUso: true,
        descricao: 'Ajuda na definição e no controle do frizz.',
        uso: 'Nos fios úmidos, se necessário', cor: '#111111', formato: 'bisnaga'
    },
    {
        nome: 'Óleo Brilho Seda', categoria: 'Finalização',
        descricao: 'Toque final para brilho e maciez.',
        uso: 'Poucas gotas nas pontas', cor: '#d9b36c', formato: 'conta-gotas'
    },
    {
        nome: 'Condicionador Nutri', categoria: 'Limpeza',
        descricao: 'Desembaraça e sela as cutículas após o shampoo.',
        uso: 'Após cada lavagem', cor: '#8a4dff', formato: 'frasco'
    },
    {
        nome: 'Protetor Térmico', categoria: 'Proteção',
        descricao: 'Use conforme as instruções do fabricante.',
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

const tiposDeCabelo = {
    liso: {
        nome: 'Liso', numero: 1,
        dicas: ['Limpeza conforme a oleosidade', 'Condicionador no comprimento', 'Proteção antes do calor'],
        rotina: ['Shampoo suave e condicionador', 'Máscara leve se necessário', 'Lavar conforme a oleosidade', 'Óleo leve nas pontas'],
        usoLeaveIn: 'Distribua uma pequena quantidade no comprimento, evitando a raiz.'
    },
    ondulado: {
        nome: 'Ondulado', numero: 2,
        dicas: ['Hidratação conforme a necessidade', 'Leave-in leve para definir', 'Proteção antes do calor'],
        rotina: ['Shampoo suave e condicionador', 'Máscara de hidratação', 'Lavar e finalizar com leave-in', 'Reativar as ondas se necessário'],
        usoLeaveIn: 'Amasse as pontas úmidas de baixo para cima para realçar as ondas.'
    },
    cacheado: {
        nome: 'Cacheado', numero: 3,
        dicas: ['Hidratação regular', 'Desembaraçar com delicadeza', 'Finalização com creme'],
        rotina: ['Lavar e desembaraçar com condicionador', 'Hidratar conforme a necessidade', 'Lavar e definir os cachos', 'Reativar os cachos se necessário'],
        usoLeaveIn: 'Espalhe o creme em mechas úmidas e modele os cachos com os dedos.'
    },
    crespo: {
        nome: 'Crespo', numero: 4,
        dicas: ['Hidratação conforme a necessidade', 'Desembaraçar em mechas', 'Evitar excesso de calor'],
        rotina: ['Lavar suavemente e condicionar', 'Máscara de hidratação', 'Lavar e finalizar em mechas', 'Deixar os fios soltos, sem tração'],
        usoLeaveIn: 'Divida o cabelo úmido em seções para distribuir o creme por todo o comprimento.'
    }
};
let tipoAtual = tiposDeCabelo.ondulado;
let categoriaAtual = 'Todos';

function atualizarCuidados() {
    nomeCabelo.textContent = tipoAtual.nome;
    numeroCabelo.textContent = `Tipo ${tipoAtual.numero}`;
    tipoProdutos.textContent = tipoAtual.nome.toLocaleLowerCase('pt-BR');
    document.querySelectorAll('.lista-recomendacoes li span').forEach((texto, indice) => {
        texto.textContent = tipoAtual.dicas[indice];
    });
    document.querySelectorAll('.rotina-lista li p').forEach((texto, indice) => {
        texto.textContent = tipoAtual.rotina[indice];
    });
    mostrarProdutos(categoriaAtual);
}

botoesTipo.forEach((botao) => {
    botao.addEventListener('click', () => {
        tipoAtual = tiposDeCabelo[botao.dataset.tipo];
        botoesTipo.forEach((opcao) => opcao.setAttribute('aria-pressed', opcao === botao));
        atualizarCuidados();
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
        cartao.querySelector('.produto-uso').textContent = produto.personalizarUso ? tipoAtual.usoLeaveIn : produto.uso;
        return cartao;
    });

    gradeProdutos.replaceChildren(...cartoes);
    statusProdutos.textContent = lista.length === 1 ? '1 produto exibido.' : `${lista.length} produtos exibidos.`;
}

botoesFiltro.forEach((botao) => {
    botao.addEventListener('click', () => {
        botoesFiltro.forEach((opcao) => opcao.setAttribute('aria-pressed', opcao === botao));
        categoriaAtual = botao.dataset.categoria;
        mostrarProdutos(categoriaAtual);
    });
});

atualizarCuidados();

document.querySelector('#form-novidades').addEventListener('submit', (evento) => {
    evento.preventDefault();
    document.querySelector('#mensagem-novidades').hidden = false;
});
