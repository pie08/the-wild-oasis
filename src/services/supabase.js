import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qzovdakkkurndrrjxvrl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6b3ZkYWtra3VybmRycmp4dnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4MTI2ODcsImV4cCI6MjAwODM4ODY4N30.uDz8ZVXsdW5wDst5PjrnUd1sIQUXpGLwsenjsDDBIe0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
