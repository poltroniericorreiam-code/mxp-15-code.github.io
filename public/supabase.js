const SUPABASE_URL = "https://guavczqfnqkshhgpyccs.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1qUbWglTgDfCV4MIDT7qWQ_jetIG_ht";

console.log("window.supabase =", window.supabase);

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("Cliente =", supabase);
console.log("Auth =", supabase.auth);
