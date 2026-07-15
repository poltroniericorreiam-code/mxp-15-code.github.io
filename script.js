// --- Funções de Navegação e Financeiro (Originais) ---
function entrar() { window.location.href = "/home.html"; }
function cadastrar() { window.location.href = "/cadastro.html"; }
function entrarJogo() { window.location.href = "/jogo.html"; }
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

// --- Lógica Dinâmica de Jogos (Nova) ---
const configs = {
    popular: { total: 100, label: "🔥 Jogos Populares" },
    pg: { total: 160, label: "🐯 PG" },
    pragmatic: { total: 420, label: "🎰 Pragmatic" },
    evolution: { total: 12, label: "🎲 Evolution" },
    tada: { total: 400, label: "👈 Tada" }
};

function renderGames(categoria) {
    const container = document.getElementById('game-container');
    const config = configs[categoria];
    
    // Atualiza o botão ativo no menu de categorias
    document.querySelectorAll('.categorias button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.includes(config.label.split(' ')[1])) btn.classList.add('active');
    });

    // Header da seção
    let html = `<h2>${config.label}</h2><div class="games-grid" id="grid">`;
    
    // Gerar cards dinamicamente
    for (let i = 1; i <= config.total; i++) {
        const hiddenClass = i > 12 ? 'hidden-game' : '';
        html += `
            <div class="game-card ${hiddenClass}">
                <img src="placeholder.jpg" alt="Jogo ${i}">
                <p>Jogo ${i}</p>
                <button onclick="entrarJogo()">Jogar</button>
            </div>`;
    }
    
    html += `</div>`;
    
    // Botão "Mostrar Tudo"
    if (config.total > 12) {
        html += `<button class="btn-more" id="btn-more" onclick="showAll()">Mostrar Tudo ⏬</button>`;
    }
    
    container.innerHTML = html;
}

function showAll() {
    // Remove a classe hidden-game de todos os elementos
    document.querySelectorAll('.hidden-game').forEach(el => el.classList.remove('hidden-game'));
    // Esconde o botão após clicar
    document.getElementById('btn-more').style.display = 'none';
}

// Inicializa a página carregando os Populares
window.onload = () => {
    if (document.getElementById('game-container')) {
        renderGames('popular');
    }
};
