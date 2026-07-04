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
    const response = await fetch('https://asaas.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'access_token': key },
      body: JSON.stringify({ addressKey: null, description: "Pix MXP", value: Number(valor || 20), format: "ALL" })
    });
    const dados = await response.json();
    if (!response.ok) return res.status(400).json({ error: 'Erro API' });
    return res.status(200).json({ sucesso: true, copiaECola: dados.payload, imagemQrCode: dados.encodedImage });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno' });
  }
};
export default handler;
