import { createClient } from '@supabase/supabase-js';

// These should ideally be environment variables
const supabaseUrl = 'https://qxrmgndwwkkpjvqeyhcv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cm1nbmR3d2trcGp2cWV5aGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1OTAyMjMsImV4cCI6MjA2MzE2NjIyM30.ASrdxUffBxzb399khLfnfgf05gUAW8eFxsQRDP3EQ0o';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required. Make sure to set them in your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
