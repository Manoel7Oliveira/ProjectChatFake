//DomContentload = Vai sinalizar que o nosso conteudo da dom ja esta carregado e que nos podemos trabalhar em cima dele.
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
    console.log('Minha pagina carregou');

    // Selecionei meu input pelo id
    const inputMsg = document.querySelector("#inputMensagem");
    console.log(inputMsg);

    let abaFocada = true;
    const tituloOriginal = document.title;

    // Usei meu input selecionado para colocar um placeholder direto do javascript
    inputMsg.placeholder = 'Digite a sua mensagem';

    // Selecionei todos os elementos com a classe cursor--pointer
    const buttons = document.querySelectorAll('.cursor--pointer');
    console.log(buttons);

    // Agora com todos os elementos da classe cursor--pointer selecionados pelo querySelectorAll acima, 
    // eu selecionei apenas o icone send, ele foi o segundo item, portanto tivemos que usar o src pra localizarmos ele, 
    // ja que o querySelector seleciona sempre o primeiro elemento, e o send era o segunda elemento. Obs: Similar ao html quando importamos uma imagem, porem leva um conjunto de chaves e um asteristico antes do igual!
    const buttonsend = document.querySelector(".cursor--pointer[src*= 'send']");
    console.log(buttonsend);

    const listaMensagens = document.querySelector(".div--messages");
    console.log(listaMensagens);

    const inputBuscaContato = document.querySelector(".div--search input[type='search']");
    console.log(inputBuscaContato);

    const inputBuscaMensagem = document.getElementById("search-message");
    console.log(inputBuscaMensagem)

    inputBuscaMensagem.addEventListener("input", () => {
        const termoDeBusca = inputBuscaMensagem.value;
        console.log(`O termo buscado foi ${termoDeBusca}`);
        buscarMensagem(termoDeBusca)
    })

    inputBuscaContato.addEventListener("input", () => {
        const termoDeBusca = inputBuscaContato.value;
        console.log(`O termo buscado foi ${termoDeBusca}`);
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

    //const listaEmojis = ["&#128512", "&#128513", "&#128517"];
    const listaEmojis2 = ["😀", "😁", "😅"];

    function abrirMenuReacao(mensagem) {
        console.log(mensagem);
        const areaEmojis = mensagem.querySelector(".area--emojis")

        listaEmojis2.forEach((emoji) => {
            const emojiElement = document.createElement("span");
            emojiElement.classList.add("emoji--opcao", "cursor--pointer")
            emojiElement.textContent = emoji

            emojiElement.addEventListener("click", () => {
                console.log(mensagem)
                console.log(emoji)
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


    //buttonsend.classList.add("Minha-classe-modulo-um")

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
        console.log(mensagemElement);

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

                console.log(textoDestacado)
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

    // Criamos uma funçao para automatizar os eventos de clik e de tecla
    function enviarMensagem() {
        //Acessamos o value para buscar o valor (conteudo) do elemento inputMsg. Apos adicionamos a função nativa Trim(), ela remove os espaços vazios da string. Então, caso o value esteja vazio o trim entra e trata de uma forma diferente. Pra isso foi usado um if abaixo!
        const texto = inputMsg.value.trim();

        if (texto === "") {
            alert('Não possui mensagem ainda');
        } else {
            const mensagemRenderizada = renderizarMensagem("enviada", texto, "21:00");
            listaMensagens.appendChild(mensagemRenderizada);
            inputMsg.value = "";
            setTimeout(responderMensagem, 3000);

            //setTimeout -> Executa alguma coisa apenas uma unica vez, apos um intervalo de tempo.
            //setInterval -> Executa alguma coisa em intervalo de tempo, ele vai entrar em um loop e vai ficar executando todo vez, ate chegar o fim da condição.
            //Pooling o processo de ficar enviando e esperando, ate que alguma coisa aconteça.
        }
    }

    function responderMensagem() {
        // Funçoes matematicas nativas, o math.floor vai arrendondar os numeros inteiros. O math.ramdom vai gerar um numero randomico (aleatorio). Resumindo, para o bot trazer as respostas de forma aleatoria.
        const posiçao = Math.floor(Math.random() * respostasParaOBot.length);
        const mensagemDoBot = respostasParaOBot[posiçao];
        const mensagemRenderizada = renderizarMensagem("recebida", mensagemDoBot, "21:10");
        listaMensagens.appendChild(mensagemRenderizada);
        notificarNovaMensagem()
    };

    // Adicionamos um evento com a funçao nativa addEventListener, o evento foi o de clicar com uma funçao de callback, e ele tem no escopo uma chamada d função criada acima
    buttonsend.addEventListener("click", () => {
        enviarMensagem();

    });

    // Adicionamos um evento com a funçao nativa addEventListener, o evento foi o de teclar com uma funçao de callback, e ele tem no escopo uma chamada d função criada acima

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
            console.log(contato);


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
                document.tilte = tituloOriginal;
            }
        }, 1000);
    }

    setTimeout(() => {

        carregarContatos()

    }, 2500);

});

// Perfeito 👏 Esse código que você trouxe é bem completo — ele basicamente simula um mini sistema de chat, com envio e recebimento de mensagens, reações com emojis, busca de contatos e até notificação sonora.

// Pra te ajudar a entender tudo com clareza, vou te explicar passo a passo o que cada parte faz, destacando funções, parâmetros e eventos importantes 👇

// 🧩 1. Estrutura inicial de dados
// const listaDeContatos = [ { ... }, { ... }, ... ]


// Essa é uma lista (array) de objetos.

// Cada objeto representa um contato, com:

// id → identificador único.

// nome, UltimaMensagem, HorarioUltimaMensagem, Avatar.

// conversas → outro array dentro do contato, com cada mensagem trocada.

// 👉 Exemplo:

// {
//   id: 1,
//   nome: 'Joaquin',
//   conversas: [
//       { mensagem: "Oi", tipo: "recebida", horario: "20:20" },
//       { mensagem: "Tudo bem", tipo: "enviada", horario: "20:21" }
//   ]
// }


// Assim você tem dados simulando um chat real.

// ⚙️ 2. document.addEventListener('DOMContentLoaded', () => { ... })

// Esse evento dispara quando todo o HTML foi carregado.

// Assim você garante que pode manipular elementos da página com segurança.

// document.addEventListener('DOMContentLoaded', () => {
//    // tudo dentro daqui só roda quando o HTML está pronto
// });

// 🔍 3. Selecionando elementos do DOM

// Você usa vários seletores:

// const inputMsg = document.querySelector("#inputMensagem");
// const buttonsend = document.querySelector(".cursor--pointer[src*= 'send']");
// const listaMensagens = document.querySelector(".div--messages");
// const inputBuscaContato = document.querySelector(".div--search input[type='search']");
// const inputBuscaMensagem = document.getElementById("search-message");


// querySelector() → pega um elemento.

// querySelectorAll() → pega vários elementos (retorna uma NodeList).

// Os seletores funcionam como no CSS (#id, .classe, tag, etc).

// ✉️ 4. Envio e resposta de mensagens
// Função enviarMensagem()
// function enviarMensagem() {
//   const texto = inputMsg.value.trim();

//   if (texto === "") {
//     alert('Não possui mensagem ainda');
//   } else {
//     const mensagemRenderizada = renderizarMensagem("enviada", texto, "21:00");
//     listaMensagens.appendChild(mensagemRenderizada);
//     inputMsg.value = "";
//     setTimeout(responderMensagem, 3000);
//   }
// }


// 🔸 O que acontece aqui:

// Pega o texto digitado no input.

// Usa .trim() para remover espaços extras.

// Se estiver vazio → mostra alert().

// Senão:

// Cria a mensagem com renderizarMensagem().

// Adiciona no chat (appendChild).

// Limpa o input.

// Após 3 segundos, o “bot” responde.

// Função responderMensagem()
// function responderMensagem() {
//   const posicao = Math.floor(Math.random() * respostasParaOBot.length);
//   const mensagemDoBot = respostasParaOBot[posicao];
//   const mensagemRenderizada = renderizarMensagem("recebida", mensagemDoBot, "21:10");
//   listaMensagens.appendChild(mensagemRenderizada);
//   notificarNovaMensagem()
// }


// 🔸 O que faz:

// Sorteia uma resposta aleatória com Math.random().

// Cria uma nova mensagem com renderizarMensagem().

// Toca o som e pisca o título da aba com notificarNovaMensagem().

// 🧱 5. Função renderizarMensagem(tipo, mensagem, horario)

// Essa função cria dinamicamente o HTML da mensagem.

// function renderizarMensagem(tipo, mensagem, horario) {
//   const divMensagem = document.createElement("div");
//   const direcao = tipo === "enviada" ? "end" : "start";
//   const stylesDiv = tipo === "enviada" ? "you" : "other";


// Ela:

// Cria um <div> para a mensagem.

// Define se a mensagem é enviada (à direita) ou recebida (à esquerda).

// Adiciona reações (👍 e emojis) e horário.

// Retorna um bloco HTML assim:

// <div class="flex flex--direction--column message you">
//   <div class="flex--6">Oi, tudo bem?</div>
//   <div class="infos--message">
//      <div class="emojis--reaction">👍</div>
//      <div class="area--emojis"></div>
//      <img src="./icons/viewed.svg" />
//      <div>21:00</div>
//   </div>
// </div>

// 😊 6. Reações com emojis
// abrirMenuReacao(mensagem)

// Cria os emojis e adiciona como opções clicáveis:

// const listaEmojis2 = ["😀", "😁", "😅"];


// Cada emoji ganha um evento:

// emojiElement.addEventListener("click", () => {
//   alternarEmoji(mensagem, emoji);
// });

// alternarEmoji(mensagem, emoji)

// Verifica se o emoji já está aplicado.

// Se estiver, remove; se não, adiciona.

// Assim o usuário pode marcar/desmarcar reações às mensagens.

// 🔎 7. Busca de mensagens e contatos
// buscarMensagem(termo)

// Percorre todas as mensagens.

// Se o texto contém o termo → mostra e destaca.

// Se não → esconde (display: none).

// Usa expressões regulares:

// new RegExp(`(${termo})`, "gi")


// Isso cria um destaque visual:

// <span class="highlight">palavra</span>

// carregarContatos(filtro)

// Limpa a área de contatos.

// Filtra com .filter():

// contato.nome.toLowerCase().includes(filtro.toLowerCase())


// Cria cada contato com createElement().

// Adiciona evento click para abrir as mensagens desse contato.

// 🔔 8. Notificação de novas mensagens
// function notificarNovaMensagem() {
//   const somNotificacao = new Audio("./src/assets/audio/whatsappmessage.mp3");
//   let contador = 1;
//   const intervalo = setInterval(() => {
//     document.title = (contador % 2 === 0) ? `${contador} Nova Mensagem` : tituloOriginal;
//     somNotificacao.play();
//     contador++;
//     if (abaFocada) {
//         clearInterval(intervalo);
//         document.title = tituloOriginal;
//     }
//   }, 1000);
// }


// Toca um som.

// Pisca o título da aba a cada segundo (setInterval).

// Para quando o usuário volta o foco à aba.

// 💡 9. Eventos principais
// Evento	Onde	O que faz
// DOMContentLoaded	document	Garante que o DOM está pronto
// click	botão de enviar	Envia mensagem
// keypress	input de texto	Envia com Enter
// input	campo de busca	Filtra contatos e mensagens
// blur / focus	window	Muda o título da aba
// click	emoji de reação	Mostra menu de emojis

// Excelente escolha 😄👏
// Vamos fazer assim: primeiro eu te mostro o mapa visual do fluxo (pra entender como o chat funciona), e depois te entrego o código simplificado e didático, com comentários explicando funções, parâmetros e eventos de forma bem clara.

// 🧭 1️⃣ MAPA VISUAL — Fluxo do Chat
// ┌───────────────────────────┐
// │     HTML carregado        │
// │ (DOMContentLoaded dispara)│
// └─────────────┬─────────────┘
//               │
//               ▼
//   Seleciona elementos do DOM
//  (inputs, botões, áreas de mensagens)
//               │
//               ▼
//  ┌─────────────────────────────┐
//  │ Eventos são configurados:   │
//  │                             │
//  │  → inputMensagem (keypress) │
//  │  → buttonsend (click)       │
//  │  → inputBuscaContato (input)│
//  │  → inputBuscaMensagem (input)│
//  │  → window (blur/focus)      │
//  └─────────────┬───────────────┘
//                │
//                ▼
//    Usuário digita e envia msg
//    (pressiona Enter ou clica send)
//                │
//                ▼
//        Função enviarMensagem()
//                │
//                ├── Cria nova mensagem enviada
//                ├── Adiciona na tela
//                └── Chama setTimeout( responderMensagem )
//                          │
//                          ▼
//               responderMensagem()
//                          │
//                          ├── Sorteia resposta aleatória
//                          ├── Renderiza mensagem “recebida”
//                          └── Chama notificarNovaMensagem()
//                                    │
//                                    ▼
//                         notificarNovaMensagem()
//                         → toca som
//                         → pisca título da aba
//                         → para ao voltar o foco
// ───────────────────────────────────────────────────────────
// Outros fluxos paralelos:

// Buscar mensagens → buscarMensagem(termo)
//    - filtra e destaca mensagens

// Buscar contatos → carregarContatos(filtro)
//    - mostra lista de contatos filtrada
//    - clique em contato → carregarMensagemContatos(index)

// Adicionar reações → abrirMenuReacao(mensagem)
//    - mostra emojis
//    - alternarEmoji(mensagem, emoji)
// ───────────────────────────────────────────────────────────


// 👉 Esse mapa mostra a linha de execução natural:

// Página carrega → configura eventos → usuário interage → funções são chamadas em sequência.

// 💻 2️⃣ CÓDIGO SIMPLIFICADO E DIDÁTICO

// Agora segue uma versão reduzida do seu chat, mantendo os principais recursos:
// mensagens, respostas automáticas, busca e reações — com explicações curtas.

// <!DOCTYPE html>
// <html lang="pt-br">
// <head>
//   <meta charset="UTF-8">
//   <title>Mini Chat</title>
//   <style>
//     .mensagem { margin: 6px; padding: 8px; border-radius: 8px; max-width: 200px; }
//     .enviada { background: #dcf8c6; align-self: flex-end; }
//     .recebida { background: #fff; align-self: flex-start; }
//     .highlight { background: yellow; }
//     .chat { display: flex; flex-direction: column; gap: 8px; }
//   </style>
// </head>
// <body>

//   <div class="chat" id="chat"></div>

//   <input id="inputMensagem" placeholder="Digite sua mensagem">
//   <button id="btnEnviar">Enviar</button>

//   <input id="busca" placeholder="Buscar mensagens...">

//   <script>
//     // Lista de respostas automáticas (array)
//     const respostasBot = ["Oi!", "Tudo bem?", "Vamos programar!", "Sou o bot 😎"];

//     // Selecionando elementos do DOM
//     const chat = document.getElementById("chat");
//     const inputMsg = document.getElementById("inputMensagem");
//     const btnEnviar = document.getElementById("btnEnviar");
//     const inputBusca = document.getElementById("busca");

//     // === EVENTOS PRINCIPAIS ===
//     btnEnviar.addEventListener("click", enviarMensagem);
//     inputMsg.addEventListener("keypress", (e) => {
//       if (e.key === "Enter") enviarMensagem();
//     });
//     inputBusca.addEventListener("input", () => buscarMensagem(inputBusca.value));

//     // === FUNÇÃO: enviarMensagem() ===
//     function enviarMensagem() {
//       const texto = inputMsg.value.trim();
//       if (!texto) return alert("Digite algo!");
//       renderizarMensagem("enviada", texto);
//       inputMsg.value = "";
//       setTimeout(responderMensagem, 2000);
//     }

//     // === FUNÇÃO: responderMensagem() ===
//     function responderMensagem() {
//       const indice = Math.floor(Math.random() * respostasBot.length);
//       const resposta = respostasBot[indice];
//       renderizarMensagem("recebida", resposta);
//     }

//     // === FUNÇÃO: renderizarMensagem(tipo, texto) ===
//     function renderizarMensagem(tipo, texto) {
//       const div = document.createElement("div");
//       div.classList.add("mensagem", tipo);
//       div.textContent = texto;

//       // Clique para adicionar ou remover emoji 😁
//       div.addEventListener("click", () => {
//         if (div.textContent.includes("😁")) {
//           div.textContent = div.textContent.replace("😁", "");
//         } else {
//           div.textContent += " 😁";
//         }
//       });

//       chat.appendChild(div);
//     }

//     // === FUNÇÃO: buscarMensagem(termo) ===
//     function buscarMensagem(termo) {
//       const mensagens = document.querySelectorAll(".mensagem");
//       mensagens.forEach(msg => {
//         const texto = msg.textContent.toLowerCase();
//         const termoLower = termo.toLowerCase();

//         if (texto.includes(termoLower)) {
//           msg.style.display = "block";
//           msg.innerHTML = msg.textContent.replace(
//             new RegExp(`(${termo})`, "gi"),
//             "<span class='highlight'>$1</span>"
//           );
//         } else {
//           msg.style.display = "none";
//         }
//       });
//     }
//   </script>
// </body>
// </html>

// 🧠 O que esse código mostra:

// Funções com parâmetros e argumentos (tipo, texto, termo).

// Eventos de clique, tecla e entrada de texto.

// Manipulação do DOM com createElement(), appendChild(), innerHTML.

// Uso de arrays e Math.random() para gerar respostas aleatórias.

// Busca dinâmica e destaque usando expressões regulares.