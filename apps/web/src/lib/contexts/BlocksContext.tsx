'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { translateErrorMessage } from '../translateErrorMessage';
import { Block as BaseBlock } from '../types/block';

// descriptionを追加したBlock型
export type Block = BaseBlock & { description: string };

type BlocksContextType = {
  blocks: Block[];
  loading: boolean;
  error: string | null;
  deletingId: string | null;
  addBlock: (blockedUserId: string, description?: string) => Promise<boolean>;
  deleteBlock: (id: string) => Promise<void>;
};

const BlocksContext = createContext<BlocksContextType | undefined>(undefined);

export function BlocksProvider({ children }: { children: React.ReactNode }) {
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

      // 重複チェック
      const isAlreadyBlocked = blocks.some(
        (block) => block.blocked_user_id === blockedUserId,
      );

      if (isAlreadyBlocked) {
        setError('このユーザーはすでにブロックリストに登録されています');
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

  return (
    <BlocksContext.Provider
      value={{ blocks, loading, error, deletingId, addBlock, deleteBlock }}
    >
      {children}
    </BlocksContext.Provider>
  );
}

export function useBlocks() {
  const context = useContext(BlocksContext);
  if (context === undefined) {
    throw new Error('useBlocks must be used within a BlocksProvider');
  }
  return context;
}
