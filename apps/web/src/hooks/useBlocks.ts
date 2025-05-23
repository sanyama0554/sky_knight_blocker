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
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchBlocks = async () => {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError('ユーザーがログインしていません');
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

  useEffect(() => {
    fetchBlocks();
  }, []);

  // ブロック解除処理
  const deleteBlock = async (id: string) => {
    setDeletingId(id);
    setError(null);
    try {
      const { error } = await supabase.from('blocks').delete().eq('id', id);
      if (error) {
        setError(translateErrorMessage(error.message));
      } else {
        await fetchBlocks();
      }
    } catch (err) {
      setError('ブロック解除中にエラーが発生しました');
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  // ブロック追加処理
  const addBlock = async (blockedUserId: string, description?: string) => {
    setError(null);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError('ユーザーがログインしていません');
        return false;
      }

      const { error } = await supabase.from('blocks').insert([
        {
          user_id: user.id,
          blocked_user_id: blockedUserId,
          description,
        },
      ]);

      if (error) {
        setError(translateErrorMessage(error.message));
        return false;
      }

      await fetchBlocks();
      return true;
    } catch (err) {
      setError('ブロック追加中にエラーが発生しました');
      console.error(err);
      return false;
    }
  };

  return {
    blocks,
    loading,
    error,
    deleteBlock,
    deletingId,
    addBlock,
    fetchBlocks,
  };
};
