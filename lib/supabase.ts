import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = 'https://jndhkdfvjqkuomxewrma.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuZGhrZGZ2anFrdW9teGV3cm1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyMjMzNzAsImV4cCI6MTk4MTc5OTM3MH0.aYf2NnSobXUh5icraHxnBKCP960YlwGOxBQQHSLdh80';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
