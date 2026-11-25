const cortes = [
    { nome: 'Degradê', comprimento: 'Médio', foto: 'fpi/medio.arr.png' },
    { nome: 'Curto', comprimento: 'Curto', foto: 'fpi/curto.m.h.png' },
    { nome: 'Camadas', comprimento: 'Médio', foto: 'fpi/medio.degrade.png' },
    { nome: 'Longo', comprimento: 'Longo', foto: 'fpi/longo.m.h.png' }
];
const cores = { Preto: '#272324', Castanho: '#764830', Loiro: '#d4ad70', Ruivo: '#ad4b30' };
const opcoes = {
    corte: cortes.map(corte => corte.nome),
    comprimento: ['Curto', 'Médio', 'Longo'],
    cor: Object.keys(cores),
    textura: ['Liso', 'Ondulado', 'Cacheado', 'Crespo']
};

const abas = document.querySelectorAll('.abas button');
const lista = document.querySelector('#opcoes');
const foto = document.querySelector('#imagemModelo');
const preferencias = { cor: '', textura: '' };
let categoria = 'corte';
let corteAtual = cortes[0];

function corteDaOpcao(valor) {
    if (categoria === 'corte') return cortes.find(corte => corte.nome === valor);
    if (categoria === 'comprimento') {
        if (corteAtual.comprimento === valor) return corteAtual;
        return cortes.find(corte => corte.comprimento === valor);
    }
}

function marcarSelecao() {
    const selecionado = { corte: corteAtual.nome, comprimento: corteAtual.comprimento, ...preferencias };
    for (const botao of lista.children) {
        botao.setAttribute('aria-pressed', String(botao.value === selecionado[categoria]));
    }
}

function exibirOpcoes() {
    lista.replaceChildren();
    lista.setAttribute('aria-label', 'Opções de ' + categoria);
    for (const valor of opcoes[categoria]) {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'corte';
        botao.value = valor;
        const referencia = corteDaOpcao(valor);
        if (referencia) {
            const img = document.createElement('img');
            img.src = referencia.foto;
            img.alt = '';
            botao.append(img);
        } else if (categoria === 'cor') {
            const amostra = document.createElement('span');
            amostra.className = 'amostra';
            amostra.style.backgroundColor = cores[valor];
            botao.append(amostra);
        }
        botao.append(document.createTextNode(valor));
        lista.append(botao);
    }
    marcarSelecao();
}

abas.forEach(aba => aba.addEventListener('click', () => {
    categoria = aba.dataset.categoria;
    abas.forEach(item => item.setAttribute('aria-pressed', String(item === aba)));
    exibirOpcoes();
}));

lista.addEventListener('click', evento => {
    const botao = evento.target.closest('button');
    if (!botao) return;
    const referencia = corteDaOpcao(botao.value);
    if (referencia) {
        corteAtual = referencia;
        foto.src = referencia.foto;
        foto.alt = 'Corte ' + referencia.nome;
        document.querySelector('#modelo').textContent = referencia.nome + ' · ' + referencia.comprimento;
    } else {
        preferencias[categoria] = botao.value;
        const resumo = [];
        if (preferencias.cor) resumo.push('Cor: ' + preferencias.cor);
        if (preferencias.textura) resumo.push('Textura: ' + preferencias.textura);
        document.querySelector('#preferencias').textContent = resumo.join(' · ');
    }
    marcarSelecao();
});

exibirOpcoes();
