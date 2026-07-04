export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });

  const apiKey = process.env.NEXT_PUBLIC_ASAAS_API_KEY || process.env.ASAAS_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Chave do Asaas não configurada na Vercel.' });

  try {
    const { valor } = req.body;

    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    const dataVencimento = amanha.toISOString().split('T')[0];

    // 1. Cria um cliente rápido e dinâmico para não dar erro de ID inexistente
    const resCliente = await fetch('https://asaas.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'access_token': apiKey },
      body: JSON.stringify({ name: "Cliente MXP Site", cpfCnpj: "00000000000" }) // CPF genérico aceito pela API de testes/produção
    });
    const dadosCliente = await resCliente.json();
    const customerId = dadosCliente.id || 'cus_000005844411'; // Se falhar, usa o padrão

    // 2. Cria a cobrança PIX associada a esse cliente
    const responseCobranca = await fetch('https://asaas.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'access_token': apiKey },
      body: JSON.stringify({
        customer: customerId, 
        billingType: 'PIX',
        value: Number(valor || 20),
        dueDate: dataVencimento,
        description: "Depósito via site MXP"
      })
    });

    const dadosCobranca = await responseCobranca.json();
    if (!responseCobranca.ok) {
      return res.status(400).json({ error: dadosCobranca.errors?.[0]?.description || 'Erro na cobrança Asaas.' });
    }

    // 3. Busca o QR Code Pix final
    const responsePix = await fetch(`https://asaas.com/${dadosCobranca.id}/pixQrCode`, {
      method: 'GET',
      headers: { 'access_token': apiKey }
    });

    const dadosPix = await responsePix.json();
    return res.status(200).json({
      sucesso: true,
      copiaECola: dadosPix.payload,
      imagemQrCode: dadosPix.encodedImage
    });

  } catch (error) {
    return res.status(500).json({ error: 'Erro interno na comunicação com o Gateway.' });
  }
}
