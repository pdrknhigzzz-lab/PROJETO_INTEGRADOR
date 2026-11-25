// Referências disponíveis nas imagens da equipe.
const estilos = {
    Cortes: [
        ['fpi/roxo.png', 'Repicado', 'Corte em camadas'],
        ['fpi/liso.b.png', 'Degradê', 'Comprimentos graduais'],
        ['fpi/curto.p.png', 'Curto', 'Comprimento curto'],
        ['fpi/liso.l.png', 'Longo', 'Comprimento longo'],
    ],
    Cores: [['img/img2.png', 'Tons de cabelo', 'Referência de cores']],
    Comprimentos: [
        ['fpi/curto.p.png', 'Curto', 'Cabelo curto'],
        ['fpi/liso.l.png', 'Longo', 'Cabelo longo'],
    ],
    Texturas: [['img/img4.png', 'Texturas capilares', 'Referência de tipos de fio']],
    Penteados: [
        ['img/img6.png', 'Solto', 'Natural'],
        ['img/img7.png', 'Franja', 'Com franja'],
        ['img/img8.png', 'Coque', 'Preso no alto'],
        ['img/img9.png', 'Rabo de cavalo', 'Rabo baixo'],
    ],
};
const botoes = document.querySelectorAll('[data-filtro]');
const lista = document.querySelector('#lista-estilos');
function mostrarEstilos(categoria) {
    lista.replaceChildren();
    estilos[categoria].forEach(([imagem, nome, descricao]) => {
        const card = document.createElement('article');
        card.className = 'estilo';
        const foto = document.createElement('img');
        foto.src = imagem;
        foto.alt = nome;
        foto.loading = 'lazy';
        const titulo = document.createElement('h4');
        titulo.textContent = nome;
        const texto = document.createElement('p');
        texto.textContent = descricao;
        card.append(foto, titulo, texto);
        lista.append(card);
    });
    botoes.forEach((botao) => {
        const ativo = botao.dataset.filtro === categoria;
        botao.classList.toggle('selecionado', ativo);
        botao.setAttribute('aria-pressed', String(ativo));
    });
    const quantidade = estilos[categoria].length;
    document.querySelector('#status-estilos').textContent =
        categoria + ' · ' + quantidade + (quantidade === 1 ? ' referência' : ' referências');
}
botoes.forEach((botao) => botao.addEventListener('click', () => mostrarEstilos(botao.dataset.filtro)));
mostrarEstilos('Penteados');
document.querySelector('#form-novidades').addEventListener('submit', (evento) => {
    evento.preventDefault();
    document.querySelector('#mensagem-novidades').hidden = false;
});
