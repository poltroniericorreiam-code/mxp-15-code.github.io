// Script isolado apenas para puxar e exibir o saldo salvo no navegador
window.addEventListener('DOMContentLoaded', () => {
    const saldoSalvo = localStorage.getItem('mxp_saldo') || '0.00';
    const saldoFormatado = parseFloat(saldoSalvo).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    const elementoSaldo = document.getElementById('saldoTotal');
    if (elementoSaldo) {
        elementoSaldo.innerText = `R$ ${saldoFormatado}`;
    }
});
