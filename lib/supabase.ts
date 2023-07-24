import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sfjgylzjctrjotplkmao.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmamd5bHpqY3Ryam90cGxrbWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwNzE0ODIsImV4cCI6MjAwNTY0NzQ4Mn0.Vmq1hWxj8s5r_nigeWWkKuJ9iwkdItwvvlQFuryIKls';
export const supabase = createClient(supabaseUrl, supabaseKey);
