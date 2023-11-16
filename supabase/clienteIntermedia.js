const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_URL_INTERMEDIA;
const supabaseKey = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_ANON_KEY_INTERMEDIA;

export const supabaseIntermedia = createClient(supabaseUrl, supabaseKey);


module.exports.supabaseIntermedia = supabaseIntermedia;