export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const apiKey = process.env.NEXT_PUBLIC_ASAAS_API_KEY || process.env.ASAAS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Chave do Asaas não configurada.' });
  }

  try {
    const { valor } = req.body;

    const amanhã = new Date();
    amanhã.setDate(amanhã.getDate() + 1);
    const dataVencimento = amanhã.toISOString().split('T')[0];

    const responseCobranca = await fetch('https://asaas.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': apiKey
      },
      body: JSON.stringify({
        customer: 'cus_000005844411', 
        billingType: 'PIX',
        value: Number(valor || 20),
        dueDate: dataVencimento,
        description: "Depósito via site MXP"
      })
    });

    const dadosCobranca = await responseCobranca.json();

    if (!responseCobranca.ok) {
      return res.status(responseCobranca.status).json({ error: 'Erro ao criar cobrança.' });
    }

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
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
          }
