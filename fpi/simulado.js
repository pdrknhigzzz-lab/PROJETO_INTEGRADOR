
function selecionar(elemento, nome) {

    // Busca todos os cartões
    let cortes = document.querySelectorAll(".corte");

    // Remove a seleção anterior
    cortes.forEach(function(corte) {
        corte.classList.remove("selecionado");
    });

    // Marca o cartão escolhido
    elemento.classList.add("selecionado");

    // Busca a imagem do cartão clicado
    let imagemEscolhida = elemento.querySelector("img");

    // Troca a imagem do modelo central
    if (imagemEscolhida) {
        document.getElementById("imagemModelo").src = imagemEscolhida.src;
    }

    // Atualiza as informações
    document.getElementById("modelo").innerText =
        "Corte selecionado: " + nome;
}


/* 2. TROCAR AS CATEGORIAS */
function mostrarCategoria(categoria, botao) {

    // Busca todos os botões das categorias
    let botoes = document.querySelectorAll(".abas button");

    // Remove a classe ativo de todos os botões
    botoes.forEach(function(item) {
        item.classList.remove("ativo");
    });

    // Adiciona a classe ativo ao botão clicado
    botao.classList.add("ativo");

    // Busca a área onde as opções serão exibidas
    let opcoes = document.getElementById("opcoes");


    /* CATEGORIA: CORTE */
    if (categoria === "corte") {

        opcoes.innerHTML = `
            <div class="corte" onclick="selecionar(this, 'Degradê')">
                <img src="img_integrador/degrade.png" alt="Degradê">
                <h3>Degradê</h3>
                <p>Nas laterais</p>
            </div>

            <div class="corte" onclick="selecionar(this, 'Curto')">
                <img src=""img_integrador/curto.png" alt="Curto">
                <h3>Curto</h3>
                <p>1 ou 2 dedos</p>
            </div>

            <div class="corte" onclick="selecionar(this, 'Camadas')">
                <img src=""img_integrador/camadas.png" alt="Camadas">
                <h3>Camadas</h3>
                <p>Camadas ao longo do cabelo</p>
            </div>

            <div class="corte" onclick="selecionar(this, 'Longo')">
                <img src=""img_integrador/longo.png" alt="Longo">
                <h3>Longo</h3>
                <p>Comprimento longo</p>
            </div>
        `;
    }


    /* CATEGORIA: COMPRIMENTO */
    else if (categoria === "comprimento") {

        opcoes.innerHTML = `
            <div class="corte" onclick="selecionar(this, 'Muito curto')">
                <img src=""img_integrador/curto.png" alt="Muito curto">
                <h3>Muito curto</h3>
                <p>Comprimento pequeno</p>
            </div>

            <div class="corte" onclick="selecionar(this, 'Médio')">
                <img src=""img_integrador/medio.png" alt="Médio">
                <h3>Médio</h3>
                <p>Comprimento médio</p>
            </div>

            <div class="corte" onclick="selecionar(this, 'Longo')">
                <img src=""img_integrador/longo.png" alt="Longo">
                <h3>Longo</h3>
                <p>Comprimento maior</p>
            </div>
        `;
    }


    /* CATEGORIA: COR */
    else if (categoria === "cor") {

        opcoes.innerHTML = `
            <div class="corte" onclick="selecionar(this, 'Preto')">
                <h3>Preto</h3>
                <p>Cor natural</p>
            </div>

            <div class="corte" onclick="selecionar(this, 'Castanho')">
                <h3>Castanho</h3>
                <p>Tom castanho</p>
            </div>

            <div class="corte" onclick="selecionar(this, 'Loiro')">
                <h3>Loiro</h3>
                <p>Tom loiro</p>
            </div>

            <div class="corte" onclick="selecionar(this, 'Ruivo')">
                <h3>Ruivo</h3>
                <p>Tom ruivo</p>
            </div>
        `;
    }


    /* CATEGORIA: TEXTURA */
    else if (categoria === "textura") {

        opcoes.innerHTML = `
            <div class="corte" onclick="selecionar(this, 'Liso')">
                <h3>Liso</h3>
                <p>Fios lisos</p>
            </div>

            <div class="corte" onclick="selecionar(this, 'Ondulado')">
                <h3>Ondulado</h3>
                <p>Fios ondulados</p>
            </div>

            <div class="corte" onclick="selecionar(this, 'Cacheado')">
                <h3>Cacheado</h3>
                <p>Fios cacheados</p>
            </div>

            <div class="corte" onclick="selecionar(this, 'Crespo')">
                <h3>Crespo</h3>
                <p>Fios crespos</p>
            </div>
        `;
    }

}
