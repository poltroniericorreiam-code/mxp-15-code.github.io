export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });

  const apiKey = process.env.NEXT_PUBLIC_ASAAS_API_KEY || process.env.ASAAS_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Chave do Asaas não configurada.' });

  try {
    const { valor } = req.body;

    // Utiliza a API direta de QR Code Pix do Asaas que dispensa cadastro de cliente
    const response = await fetch('https://api.asaas.com/v3/pix/qrCodes/static', {     method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'access_token': apiKey 
      },
      body: JSON.stringify({
        addressKey: null, // O Asaas usa automaticamente a chave Pix ativa da sua conta
        description: "Depósito via site MXP",
        value: Number(valor || 20),
        format: "ALL" // Retorna tanto a imagem quanto a linha copia e cola
      })
    });

    const dados = await response.json();

    if (!response.ok) {
      return res.status(400).json({ error: dados.errors?.[0]?.description || 'Erro na API do Asaas.' });
    }

    return res.status(200).json({
      sucesso: true,
      copiaECola: dados.payload,
      imagemQrCode: dados.encodedImage
    });

  } catch (error) {
    return res.status(500).json({ error: 'Erro interno no servidor de pagamentos.' });
  }
}
