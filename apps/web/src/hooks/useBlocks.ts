import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { translateErrorMessage } from '../lib/translateErrorMessage';
import { Block as BaseBlock } from '../types/block';

// descriptionを追加したBlock型
export type Block = BaseBlock & { description: string };

export const useBlocks = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setError('ユーザーがログインしていません');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('blocks')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          setError(translateErrorMessage(error.message));
        } else {
          setBlocks(data || []);
        }
      } catch (err) {
        setError('データの取得中にエラーが発生しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  return { blocks, loading, error };
};
