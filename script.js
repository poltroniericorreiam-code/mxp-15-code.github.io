// Funções de Navegação Geral
function entrar() {
    window.location.href = "/home.html";
}

function cadastrar() {
    window.location.href = "/cadastro.html";
}

function entrarJogo() {
    window.location.href = "/jogo.html";
}

// Funções de Financeiro
function irParaDeposito() {
    window.location.href = "/deposito.html";
}

function irParaSaque() {
    window.location.href = "/saque.html";
}

// Lógica de Saque (Página de Saque)
function realizarSaque() {
    // Certifique-se de que o objeto 'usuario' esteja definido no seu script da página de saque
    let valor = parseFloat(document.getElementById('valor-saque').value);
    
    if (typeof usuario !== 'undefined' && usuario.aposta_pendente > 0) {
        alert("Bloqueado: Você ainda precisa completar o requisito de aposta.");
    } else if (isNaN(valor) || valor < 10 || valor > 15000) {
        alert("O valor de saque deve estar entre R$ 10,00 e R$ 15.000,00.");
    } else {
        alert("Solicitação de saque de R$ " + valor.toFixed(2) + " enviada!");
    }
}
