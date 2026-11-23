
/* ========================================
   1. CONFIGURAÇÕES DO JOGO
======================================== */

var LINHAS = 28
var COLUNAS = 24

var palavras = [

    {
        resposta: "MICROCONTROLADOR",
        pista: "Circuito integrado programável usado para controlar funções de equipamentos eletrônicos.",
        direcao: "horizontal",
        linha: 0,
        coluna: 8,
        numero: 1
    },

    {
        resposta: "MEMORIADEMASSA",
        pista: "Meio destinado a guardar grandes volumes de arquivos por longos períodos.",
        direcao: "vertical",
        linha: 0,
        coluna: 8,
        numero: 1
    },

    {
        resposta: "ADDRESSBUS",
        pista: "Conjunto de linhas que identifica a posição acessada durante uma transferência.",
        direcao: "horizontal",
        linha: 11,
        coluna: 3,
        numero: 2
    },

    {
        resposta: "REGISTRADORES",
        pista: "Pequenos espaços internos que guardam valores usados durante o processamento.",
        direcao: "horizontal",
        linha: 13,
        coluna: 1,
        numero: 3
    },

    {
        resposta: "ROM",
        pista: "Mantém instruções gravadas mesmo quando o equipamento está desligado.",
        direcao: "vertical",
        linha: 13,
        coluna: 1,
        numero: 3
    },

    {
        resposta: "DUALCORE",
        pista: "Configuração de processamento que reúne dois núcleos independentes.",
        direcao: "vertical",
        linha: 13,
        coluna: 9,
        numero: 4
    },

    {
        resposta: "DMA",
        pista: "Mecanismo que transfere informações entre periféricos e armazenamento sem controle contínuo da unidade central.",
        direcao: "horizontal",
        linha: 15,
        coluna: 0,
        numero: 5
    },

    {
        resposta: "RAM",
        pista: "Armazena temporariamente programas e informações enquanto o equipamento está ligado.",
        direcao: "horizontal",
        linha: 15,
        coluna: 8,
        numero: 6
    },

    {
        resposta: "UC",
        pista: "Parte que coordena a sequência de etapas durante a execução.",
        direcao: "horizontal",
        linha: 18,
        coluna: 2,
        numero: 7
    },

    {
        resposta: "CPU",
        pista: "Componente central que interpreta e executa as instruções dos programas.",
        direcao: "vertical",
        linha: 18,
        coluna: 3,
        numero: 8
    },

    {
        resposta: "EEPROM",
        pista: "Tecnologia cujos conteúdos podem ser apagados e regravados eletricamente.",
        direcao: "horizontal",
        linha: 18,
        coluna: 5,
        numero: 9
    },

    {
        resposta: "QUADCORE",
        pista: "Configuração de processamento que reúne quatro núcleos independentes.",
        direcao: "horizontal",
        linha: 20,
        coluna: 2,
        numero: 10
    },

    {
        resposta: "DATABUS",
        pista: "Conjunto de linhas por onde os valores circulam entre componentes.",
        direcao: "vertical",
        linha: 20,
        coluna: 5,
        numero: 11
    },

    {
        resposta: "CACHE",
        pista: "Guarda cópias de informações acessadas frequentemente para acelerar consultas.",
        direcao: "horizontal",
        linha: 23,
        coluna: 4,
        numero: 12
    },

    {
        resposta: "ULA",
        pista: "Bloco responsável por operações matemáticas e decisões booleanas.",
        direcao: "vertical",
        linha: 25,
        coluna: 3,
        numero: 13
    },

    {
        resposta: "FLASH",
        pista: "Tecnologia de armazenamento usada em pen drives e cartões.",
        direcao: "horizontal",
        linha: 26,
        coluna: 2,
        numero: 14
    }

]

/* ========================================
   2. ELEMENTOS DA PÁGINA
======================================== */

var tabuleiro = document.getElementById("crossword")

var listaHorizontal = document.getElementById("horizontal-clues")
var listaVertical = document.getElementById("vertical-clues")

var quantidadeHorizontal = document.getElementById("horizontal-count")
var quantidadeVertical = document.getElementById("vertical-count")

var letrasCorretas = {}

/* ========================================
   3. PREPARAÇÃO DO TABULEIRO
======================================== */

function prepararTabuleiro() {

    var casas = {}
    var numeros = {}

    palavras.forEach(function(palavra) {

        var linha = palavra.linha
        var coluna = palavra.coluna

        numeros[linha + "-" + coluna] = palavra.numero

        for (var i = 0; i < palavra.resposta.length; i++) {

            var chave = linha + "-" + coluna

            if (palavra.direcao == "horizontal") {
                coluna = palavra.coluna + i
            } else {
                linha = palavra.linha + i
            }

            chave = linha + "-" + coluna

            var letra = palavra.resposta[i]

            casas[chave] = letra

        }

    })

    letrasCorretas = casas

    tabuleiro.style.setProperty("--linhas", LINHAS)
    tabuleiro.style.setProperty("--colunas", COLUNAS)

    tabuleiro.innerHTML = ""

    for (var linhaAtual = 0; linhaAtual < LINHAS; linhaAtual++) {

        for (var colunaAtual = 0; colunaAtual < COLUNAS; colunaAtual++) {

            var chaveAtual = linhaAtual + "-" + colunaAtual

            var celula = document.createElement("div")

            if (casas[chaveAtual]) {

                celula.className = "celula"

                var numero = numeros[chaveAtual]

                if (numero) {

                    var numeroHTML = document.createElement("span")

                    numeroHTML.className = "numero-celula"
                    numeroHTML.innerText = numero

                    celula.appendChild(numeroHTML)

                }

                var campo = document.createElement("input")

                campo.type = "text"
                campo.maxLength = 1
                campo.autocomplete = "off"
                campo.spellcheck = false

                campo.setAttribute("aria-label", "Linha " + (linhaAtual + 1) + ", coluna " + (colunaAtual + 1))

                campo.dataset.linha = linhaAtual
                campo.dataset.coluna = colunaAtual

                celula.appendChild(campo)

            } else {

                celula.className = "celula escura"

            }

            tabuleiro.appendChild(celula)

        }

    }

}

/* ========================================
   4. EXIBIÇÃO DAS PISTAS
======================================== */

function mostrarPistas() {

    listaHorizontal.innerHTML = ""
    listaVertical.innerHTML = ""

    var totalHorizontal = 0
    var totalVertical = 0

    palavras.forEach(function(palavra) {

        var item = document.createElement("div")

        item.className = "pista-item"
        item.dataset.numero = palavra.numero

        var numero = document.createElement("span")

        numero.className = "pista-numero"
        numero.innerText = palavra.numero

        var texto = document.createElement("p")

        texto.className = "pista-texto"
        texto.innerText = palavra.pista

        item.appendChild(numero)
        item.appendChild(texto)

        if (palavra.direcao == "horizontal") {

            listaHorizontal.appendChild(item)
            totalHorizontal++

        } else {

            listaVertical.appendChild(item)
            totalVertical++

        }

    })

    quantidadeHorizontal.innerText = totalHorizontal + " palavras"
    quantidadeVertical.innerText = totalVertical + " palavras"

}

/* ========================================
   5. INICIALIZAÇÃO
======================================== */

prepararTabuleiro()
mostrarPistas()


/* ========================================
   6. VERIFICAÇÃO DAS RESPOSTAS
======================================== */

function verificarRespostas() {

    var totalAcertos = 0
    var statusPalavras = {}
    var palavrasPorCelula = {}

    // Verifica cada palavra do jogo

    palavras.forEach(function(palavra) {

        var respostaCompleta = true

        for (var i = 0; i < palavra.resposta.length; i++) {

            var linha = palavra.linha
            var coluna = palavra.coluna

            if (palavra.direcao == "horizontal") {
                coluna = palavra.coluna + i
            } else {
                linha = palavra.linha + i
            }

            var chave = linha + "-" + coluna

            var campo = tabuleiro.querySelector(
                'input[data-linha="' + linha + '"][data-coluna="' + coluna + '"]'
            )

            var letraDigitada = campo.value.toUpperCase()
            var letraCorreta = palavra.resposta[i]

            // Compara a letra digitada com a resposta

            if (letraDigitada != letraCorreta) {
                respostaCompleta = false
            }

            // Guarda quais palavras passam por cada casa

            if (!palavrasPorCelula[chave]) {
                palavrasPorCelula[chave] = []
            }

            palavrasPorCelula[chave].push(palavra.numero)

        }

        statusPalavras[palavra.numero] = respostaCompleta

        if (respostaCompleta) {
            totalAcertos++
        }

        // Atualiza a aparência da pista

        var pista = document.querySelector(
            '.pista-item[data-numero="' + palavra.numero + '"]'
        )

        pista.classList.remove("resolvida")
        pista.classList.remove("incorreta")

        if (respostaCompleta) {
            pista.classList.add("resolvida")
        } else {
            pista.classList.add("incorreta")
        }

    })

    // Atualiza as cores das letras no tabuleiro

    for (var chave in palavrasPorCelula) {

        var coordenadas = chave.split("-")

        var linha = coordenadas[0]
        var coluna = coordenadas[1]

        var campo = tabuleiro.querySelector(
            'input[data-linha="' + linha + '"][data-coluna="' + coluna + '"]'
        )

        var todasCorretas = true

        palavrasPorCelula[chave].forEach(function(numero) {

            if (!statusPalavras[numero]) {
                todasCorretas = false
            }

        })

        campo.classList.remove("correta")
        campo.classList.remove("incorreta")

        if (campo.value != "") {

            if (todasCorretas) {
                campo.classList.add("correta")
            } else {
                campo.classList.add("incorreta")
            }

        }

    }

    // Atualiza a pontuação e o progresso

    document.getElementById("score").innerText = totalAcertos

    var porcentagem = (totalAcertos / palavras.length) * 100

    document.getElementById("progress-fill").style.width = porcentagem + "%"

    var mensagem = document.getElementById("progress-message")

    if (totalAcertos == palavras.length) {

        mensagem.innerText = "Parabéns! Você completou o desafio!"

    } else if (totalAcertos > 0) {

        mensagem.innerText = totalAcertos + " de " + palavras.length + " palavras corretas"

    } else {

        mensagem.innerText = "Continue tentando!"

    }

}

/* ========================================
   7. REINICIAR A PARTIDA
======================================== */

function reiniciarJogo() {

    // Limpa todas as letras digitadas

    var campos = tabuleiro.querySelectorAll("input")

    campos.forEach(function(campo) {

        campo.value = ""

        campo.classList.remove("correta")
        campo.classList.remove("incorreta")

    })

    // Remove os destaques das pistas

    var pistas = document.querySelectorAll(".pista-item")

    pistas.forEach(function(pista) {

        pista.classList.remove("resolvida")
        pista.classList.remove("incorreta")

    })

    // Zera a pontuação e o progresso

    document.getElementById("score").innerText = "0"

    document.getElementById("progress-fill").style.width = "0%"

    document.getElementById("progress-message").innerText = "Comece a resolver!"

}

/* ========================================
   8. CONFIGURAÇÃO DOS EVENTOS
======================================== */

// Transforma as letras digitadas em maiúsculas

var camposTabuleiro = tabuleiro.querySelectorAll("input")

camposTabuleiro.forEach(function(campo) {

    campo.addEventListener("input", function() {

        this.value = this.value.toUpperCase().replace(/[^A-Z]/g, "")

    })

})

// Botão de conferir respostas

document.getElementById("check-button").addEventListener("click", function() {

    verificarRespostas()

})

// Botão de reiniciar

document.getElementById("reset-button").addEventListener("click", function() {

    reiniciarJogo()

})
