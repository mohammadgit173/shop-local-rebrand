// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ceiwwtspbmzhfbzipioi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlaXd3dHNwYm16aGZiemlwaW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NDAxNTgsImV4cCI6MjA1OTExNjE1OH0.eCmZjIXFNKAKPHv4cQCV2Q0MTQyHGY5XqvRsxDBju-Y";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);