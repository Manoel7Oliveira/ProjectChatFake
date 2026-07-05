const listaDeContatos = [
    {
        id: 1,
        nome: 'Joaquin',
        UltimaMensagem: 'Ola, vamos programar?',
        HorarioUltimaMensagem: '20:20',
        Avatar: "./src/assets/images/jessica--drew.png",
        conversas: [
            { mensagem: "Oi, eu sou o novo programador", tipo: "recebida", horario: "20:20" },
            { mensagem: "Que legal, eu tambem sou", tipo: "enviada", horario: "20:20" },
            { mensagem: "Vamos codar juntos", tipo: "recebida", horario: "20:20" }
        ],
    },
    {
        id: 2,
        nome: 'Maria',
        UltimaMensagem: 'Quer programar comigo?',
        HorarioUltimaMensagem: '20:20',
        Avatar: "./src/assets/images/david--moore.png",
        conversas: [
            { mensagem: "Oi, eu sou o novo programador", tipo: "recebida", horario: "20:20" },
            { mensagem: "Que legal, eu tambem sou", tipo: "enviada", horario: "20:20" },
            { mensagem: "Vamos codar juntos", tipo: "recebida", horario: "20:20" }
        ],
    },
    {
        id: 3,
        nome: 'Joao',
        UltimaMensagem: 'Eu sou o Novo Programador',
        HorarioUltimaMensagem: '20:20',
        Avatar: "./src/assets/images/greg--james.png",
        conversas: [
            { mensagem: "Oi, eu sou o novo programador", tipo: "recebida", horario: "20:20" },
            { mensagem: "Que legal, eu tambem sou", tipo: "enviada", horario: "20:20" },
            { mensagem: "Vamos codar juntos", tipo: "recebida", horario: "20:20" }
        ],
    },
    {
        id: 4,
        nome: 'José',
        UltimaMensagem: 'Tem café?',
        HorarioUltimaMensagem: '20:20',
        Avatar: "./src/assets/images/emily--dorson.png",
        conversas: [
            { mensagem: "Oi, eu sou o novo programador", tipo: "recebida", horario: "20:20" },
            { mensagem: "Que legal, eu tambem sou", tipo: "enviada", horario: "20:20" },
            { mensagem: "Tem café ai ?", tipo: "recebida", horario: "20:20" }
        ],
    },

]

document.addEventListener('DOMContentLoaded', () => {

    const inputMsg = document.querySelector("#inputMensagem");

    let abaFocada = true;
    const tituloOriginal = document.title;

    inputMsg.placeholder = 'Digite a sua mensagem';

    const buttons = document.querySelectorAll('.cursor--pointer');
    const buttonsend = document.querySelector(".cursor--pointer[src*= 'send']");
    const listaMensagens = document.querySelector(".div--messages");
    const inputBuscaContato = document.querySelector(".div--search input[type='search']");
    const inputBuscaMensagem = document.getElementById("search-message");

    inputBuscaMensagem.addEventListener("input", () => {
        const termoDeBusca = inputBuscaMensagem.value;
        buscarMensagem(termoDeBusca)
    });

    inputBuscaContato.addEventListener("input", () => {
        const termoDeBusca = inputBuscaContato.value;
        carregarContatos(inputBuscaContato.value);
    });

    listaMensagens.addEventListener("click", (event) => {
        if (event.target.classList.contains("emojis--reaction")) {
            const mensagem = event.target.closest(".message");
            abrirMenuReacao(mensagem)
        }

    });

    window.addEventListener("blur", () => {
        abaFocada = false;
        document.title = "O chat saiu"
    });

    window.addEventListener("focus", () => {
        abaFocada = true;
        document.title = "O chat voltou"
    })

    const listaEmojis2 = ["😀", "😁", "😅"];

    function abrirMenuReacao(mensagem) {

        const areaEmojis = mensagem.querySelector(".area--emojis")

        listaEmojis2.forEach((emoji) => {
            const emojiElement = document.createElement("span");
            emojiElement.classList.add("emoji--opcao", "cursor--pointer")
            emojiElement.textContent = emoji

            emojiElement.addEventListener("click", () => {
                alternarEmoji(mensagem, emoji);
            });

            areaEmojis.appendChild(emojiElement);

        });

    }

    function alternarEmoji(mensagem, emoji) {
        let reacaoExistente = mensagem.querySelector(".emoji-selecionado");

        if (reacaoExistente && reacaoExistente.textContent.includes(emoji)) {
            reacaoExistente.textContent = reacaoExistente.textContent.replace(emoji, "");
            if (reacaoExistente.textContent.trim() === "") {
                reacaoExistente.remove();
            }
        } else {
            if (!reacaoExistente) {
                reacaoExistente = document.createElement("div");
                reacaoExistente.classList.add("emoji-selecionado");
                mensagem.appendChild(reacaoExistente);

            }
            reacaoExistente.textContent += emoji
        }
    }

    const respostasParaOBot = [
        "Ola, tudo bem ?",
        "Como vai voce?",
        "Eu estou otimo",
        "Como vai o curso ?",
        "Esta disponivel para estudar ?",
        "Vamos estudar",
        "Meu nome é O novo Bot"
    ];


    function buscarMensagem(termo) {
        let encontrouMensagem = false;
        const mensagemElement = document.querySelectorAll(".message");

        mensagemElement.forEach((mensagem) => {
            const textoOriginal = mensagem.innerText;
            const textoNormalizado = textoOriginal.toLowerCase();
            const termoNormalizado = termo.toLowerCase();

            if (textoNormalizado.includes(termoNormalizado)) {
                encontrouMensagem = true;

                const textoDestacado = textoOriginal.replace(
                    new RegExp(`(${termo})`, "gi"),
                    '<span class="highlight">$1</span>'
                );

                mensagem.innerHTML = textoDestacado;
                mensagem.style.display = "block"; //Exibir Mensagem

            } else {
                mensagem.style.display = "none"; //Oculta a Mensagem
            }
        });

        if (!encontrouMensagem && termo !== "") {
            listaMensagens.innerHTML = "<div>Não houve resultados</div>";

        } else if (termo === "") {
            mensagemElement.forEach((mensagem) => {
                mensagem.style.display = "block";
                mensagem.innerHTML = mensagem.innerText;
            });
        }
    }

    function enviarMensagem() {
        const texto = inputMsg.value.trim();

        if (texto === "") {
            alert('Não possui mensagem ainda');
        } else {
            const mensagemRenderizada = renderizarMensagem("enviada", texto, "21:00");
            listaMensagens.appendChild(mensagemRenderizada);
            inputMsg.value = "";
            setTimeout(responderMensagem, 3000);
        }
    }

    function responderMensagem() {
        const posiçao = Math.floor(Math.random() * respostasParaOBot.length);
        const mensagemDoBot = respostasParaOBot[posiçao];
        const mensagemRenderizada = renderizarMensagem("recebida", mensagemDoBot, "21:10");
        listaMensagens.appendChild(mensagemRenderizada);
        notificarNovaMensagem()
    };

    buttonsend.addEventListener("click", () => {
        enviarMensagem();

    });

    inputMsg.addEventListener("keypress", (event) => {
        if (event.key === 'Enter') {
            enviarMensagem();
        }
    });

    function renderizarMensagem(tipo, mensagem, horario) {
        const divMensagem = document.createElement("div");
        const direcao = tipo === "enviada" ? "end" : "start";
        const stylesDiv = tipo === "enviada" ? "you" : "other";

        divMensagem.classList.add("flex", "flex--direction--row", "width--100", `justify--content--${direcao}`, "fade-in");

        divMensagem.innerHTML =
            `
         <div class="flex flex--direction--column message ${stylesDiv}">
        <div class="flex--6">
        ${mensagem}
        </div>

        <div class="flex--1 flex flex--direction--row justify--content--end align--items--center font--size--12 infos--message">
        <div class="emojis--reaction cursor--pointer">&#x1F44D;</div>
        <div class="area--emojis"></div>
         <img src="./src/assets/icons/heart.svg" />
        <div>${horario}</div>
        <img src="./src/assets/icons/viewed.svg" />

                 </div>                                         
            </div>
        `;

        return divMensagem;
    }

    function carregarMensagemContatos(index) {
        const contato = listaDeContatos[index];
        listaDeContatos.innerHTML = "";

        contato.conversas.forEach((conversa) => {
            const mensagemRenderizada = renderizarMensagem(conversa.tipo, conversa.mensagem, conversa.horario);
            listaMensagens.appendChild(mensagemRenderizada);
        });
    }

    function carregarContatos(filtro = "") {
        const divContatosElement = document.querySelector(".div--contacts");
        divContatosElement.innerHTML = "";

        const contatosFiltrados = listaDeContatos.filter((contato) =>
            contato.nome.toLowerCase().includes(filtro.toLowerCase())

        );

        if (contatosFiltrados.length === 0) {
            divContatosElement.innerHTML = "<div><span>Contato não encontrado</span></div>";
            return
        }

        contatosFiltrados.forEach((contato, index) => {

            const divParentElement = document.createElement("div");
            divParentElement.classList.add("flex", "area--contact", "fade-in");

            divParentElement.innerHTML = `
                  <div class="flex justify--content--center align--items--center flex--1">
                            <img class="avatar--left--bar" src="${contato.Avatar}" />
                        </div>

                        <div class="flex flex--direction--column justify--content--center flex--3">
                            <div class="flex align--items--center infos--contact">
                                <div class="font--family font--weight--bold">${contato.nome}</div>
                            </div>

                            <div class="last--message">${contato.UltimaMensagem}</div>
                            
                        </div>

                        <div class="flex flex--direction--column justify--content--center align--items--end flex--1 div--last--messages--info">
                            <div class="hour--last--message">${contato.HorarioUltimaMensagem} </div>
                        </div>
                        
                    `;

            divParentElement.addEventListener("click", () => {
                carregarMensagemContatos(index)
            });

            divContatosElement.appendChild(divParentElement);

        });

    }

    function notificarNovaMensagem() {
        const somNotificacao = new Audio("./src/assets/audio/whatsappmessage.mp3")

        let contador = 1;
        const intervalo = setInterval(() => {
            document.title = (contador % 2 === 0) ? `${contador} Nova Mensagem` : tituloOriginal;

            somNotificacao.play();

            contador++;

            if (abaFocada) {
                clearInterval(intervalo);
                document.title = tituloOriginal;
            }
        }, 1000);
    }

    setTimeout(() => {

        carregarContatos();

    }, 2500);

});

