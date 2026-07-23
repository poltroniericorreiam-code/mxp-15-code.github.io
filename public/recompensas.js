// ==========================================
// ARQUIVO: recompensas.js
// ==========================================

function mostrarModalRecompensa(valorGanho, callbackAoConfirmar) {
    const modalAntigo = document.getElementById('modal-recompensa-global');
    if (modalAntigo) modalAntigo.remove();

    const modalHTML = `
        <div id="modal-recompensa-global" class="modal-overlay">
            <div class="modal-card">
                <div class="modal-header-topo">
                    <p class="modal-emoji">🐂💰</p>
                </div>
                
                <div class="modal-body">
                    <p class="modal-texto-sub">Parabéns por ganhar</p>
                    <h2 class="modal-valor-destaque">
                        R$ ${valorGanho.toFixed(2).replace('.', ',')}
                    </h2>
                    <p class="modal-texto-fichas">em fichas de bônus</p>
                    
                    <button id="btn-confirmar-recompensa" class="btn-confirmar-modal">Confirmar</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.getElementById('btn-confirmar-recompensa').onclick = function() {
        let saldoAtual = parseFloat(localStorage.getItem('mxp_saldo')) || 0;
        let novoSaldo = saldoAtual + valorGanho;
        localStorage.setItem('mxp_saldo', novoSaldo.toFixed(2));

        document.getElementById('modal-recompensa-global').remove();

        if (typeof callbackAoConfirmar === 'function') {
            callbackAoConfirmar();
        }
    };
}
