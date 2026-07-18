// supabase.js
const SUPABASE_URL = "SUA_URL_AQUI";
const SUPABASE_ANON_KEY = "SUA_CHAVE_AQUI";

// Inicialização correta
window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
