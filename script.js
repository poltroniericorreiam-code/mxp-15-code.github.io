// --- Funções de Navegação Geral ---
function entrar() { window.location.href = "/home.html"; }
function cadastrar() { window.location.href = "/cadastro.html"; }
function entrarJogo() { window.location.href = "/jogo.html"; }

// --- Funções de Financeiro ---
function irParaDeposito() { window.location.href = "/deposito.html"; }
function irParaSaque() { window.location.href = "/saque.html"; }

function realizarSaque() {
    let valor = parseFloat(document.getElementById('valor-saque').value);
    if (typeof usuario !== 'undefined' && usuario.aposta_pendente > 0) {
        alert("Bloqueado: Você ainda precisa completar o requisito de aposta.");
    } else if (isNaN(valor) || valor < 10 || valor > 15000) {
        alert("O valor de saque deve estar entre R$ 10,00 e R$ 15.000,00.");
    } else {
        alert("Solicitação de saque de R$ " + valor.toFixed(2) + " enviada!");
    }
}

// --- Lógica de Jogos Dinâmicos ---
const jogos = [
    { nome: "Fortune Tiger", cat: "pg", img: "tiger.jpg" },
    { nome: "Fortune Rabbit", cat: "pg", img: "rabbit.jpg" },
    { nome: "Fortune Dragon", cat: "pg", img: "dragon.jpg" },
    { nome: "Fortune Ox", cat: "pg", img: "ox.jpg" }
];

function renderizarJogos(categoria) {
    const grid = document.getElementById("games-grid");
    const titulo = document.getElementById("titulo-categoria");
    
    if (!grid) return; 

    grid.innerHTML = ""; 
    
    const filtrados = categoria === "popular" ? jogos : jogos.filter(j => j.cat === categoria);
    
    if (titulo) titulo.innerText = categoria === "popular" ? "🔥 Jogos Populares" : `🎰 Jogos ${categoria.toUpperCase()}`;

    filtrados.forEach(jogo => {
        grid.innerHTML += `
            <div class="game-card">
                <img src="${jogo.img}" alt="${jogo.nome}">
                <p>${jogo.nome}</p>
                <button onclick="entrarJogo()">Jogar</button>
            </div>
        `;
    });
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll('.categorias button');
    botoes.forEach(btn => {
        btn.addEventListener('click', (e) => {
            botoes.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const texto = e.target.innerText.toLowerCase();
            const categoria = texto.includes("pg") ? "pg" : 
                              texto.includes("pragmatic") ? "pragmatic" : "popular";
            renderizarJogos(categoria);
        });
    });

    renderizarJogos("popular");
});
