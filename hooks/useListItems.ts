import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type ListItemProps = Database['public']['Tables']['list_items']['Row'];

function useListItems() {
  const { session } = useAuth();
  const [data, setData] = useState<ListItemProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getListItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: e } = await supabase
        .from('list_items')
        .select('*')
        .order('updated_at', { ascending: false });
      if (e) {
        throw e;
      }
      setData(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    getListItems();
  }, [getListItems]);

  return { refetch: getListItems, data, error, loading };
}

export default useListItems;
