import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const useMutation = ({ table, values }: { table: string; values: any }) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const mutation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: e } = await supabase
        .from(table)
        .insert([{ ...values }])
        .select();
      if (e) {
        throw e;
      }
      setData(data[0]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [table, values]);

  return { mutation, data, error, loading };
};

export default useMutation;
