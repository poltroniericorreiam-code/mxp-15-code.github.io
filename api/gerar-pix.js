const handler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Erro' });
  const key = process.env.NEXT_PUBLIC_ASAAS_API_KEY || process.env.ASAAS_API_KEY;
  if (!key) return res.status(500).json({ error: 'Sem chave' });
    try {
    const { valor } = req.body;
    
    // Substitua pelo endpoint correto do Asaas
    const response = await fetch('https://asaas.com', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'access_token': key 
      },
      body: JSON.stringify({ 
        addressKey: "SUA_CHAVE_PIX_AQUI", // Insira sua chave Pix cadastrada no Asaas
        description: "Pix MXP", 
        value: Number(valor || 20), 
        format: "ALL" 
      })
    });

    const dados = await response.json();
    
    // Ajuda a debugar no painel da Vercel se a API do Asaas rejeitar
    if (!response.ok) {
      console.error('Erro detalhado do Asaas:', dados);
      return res.status(400).json({ error: 'Erro API', detalhes: dados });
    }
    
    return res.status(200).json({ 
      sucesso: true, 
      copiaECola: dados.payload, 
      imagemQrCode: dados.encodedImage 
    });
    }
    error (error) {
    return res.status(500).json({ error: 'Erro interno' });
  }
};
export default handler;
