import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Create tables needed for address system
const createTables = async () => {
  // Create addresses table if it doesn't exist
  const { error: addressesError } = await supabase.rpc('create_addresses_table_if_not_exists', {});
  
  if (addressesError) {
    console.error("Error creating addresses table:", addressesError);
  }
};

// Create RPC function for creating tables
const createRpcFunctions = async () => {
  // Function to create addresses table
  const createAddressesTableFn = `
  CREATE OR REPLACE FUNCTION create_addresses_table_if_not_exists()
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $$
  BEGIN
    -- Check if addresses table exists
    IF NOT EXISTS (
      SELECT FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename = 'addresses'
    ) THEN
      -- Create addresses table
      CREATE TABLE public.addresses (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        label TEXT NOT NULL DEFAULT 'Home',
        full_address TEXT NOT NULL,
        city TEXT NOT NULL,
        area TEXT,
        building TEXT,
        floor TEXT,
        landmark TEXT,
        notes TEXT,
        is_default BOOLEAN NOT NULL DEFAULT false,
        coordinates JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );

      -- Add RLS policies
      ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
      
      -- Policy for users to see only their own addresses
      CREATE POLICY "Users can view their own addresses"
        ON public.addresses
        FOR SELECT
        USING (auth.uid() = user_id);
        
      -- Policy for users to insert their own addresses
      CREATE POLICY "Users can insert their own addresses"
        ON public.addresses
        FOR INSERT
        WITH CHECK (auth.uid() = user_id);
        
      -- Policy for users to update their own addresses
      CREATE POLICY "Users can update their own addresses"
        ON public.addresses
        FOR UPDATE
        USING (auth.uid() = user_id);
        
      -- Policy for users to delete their own addresses
      CREATE POLICY "Users can delete their own addresses"
        ON public.addresses
        FOR DELETE
        USING (auth.uid() = user_id);
    END IF;
  END;
  $$;
  `;

  // Create the function
  const { error: fnError } = await supabase.rpc('exec_sql', { sql: createAddressesTableFn });
  
  if (fnError) {
    console.error("Error creating RPC function:", fnError);
  }
};

// Initialize database setup
export const initializeDatabase = async () => {
  try {
    // First create the exec_sql function if it doesn't exist
    const createExecSqlFn = `
    CREATE OR REPLACE FUNCTION exec_sql(sql text) RETURNS void AS $$
    BEGIN
      EXECUTE sql;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;
    
    // We need to use raw SQL for this initial function
    const { error: execSqlError } = await supabase.rpc('exec_sql', { sql: createExecSqlFn });
    
    if (execSqlError && !execSqlError.message.includes('already exists')) {
      console.error("Error creating exec_sql function:", execSqlError);
      return;
    }
    
    // Create RPC functions
    await createRpcFunctions();
    
    // Create tables
    await createTables();
    
    console.log("Database initialization completed");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

// Hook to initialize database
export const useInitializeDatabase = () => {
  useEffect(() => {
    initializeDatabase();
  }, []);
};

export default useInitializeDatabase;
