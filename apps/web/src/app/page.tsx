'use client';
import React, { useState } from 'react';
import { BlockCard } from './components/BlockCard';
import type { Block } from '../types';

const Page = () => {
  const [blocks] = useState<Block[]>([
    {
      id: '1',
      user_id: 'user123',
      blocked_user_id: 'blockedUser456',
      created_at: new Date().toISOString(),
    },
  ]);

  const handleUnblock = (blockId: string) => {
    console.log(`ブロック解除: ${blockId}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ブロックリスト</h1>
      {blocks.map((block) => (
        <BlockCard key={block.id} block={block} onUnblock={handleUnblock} />
      ))}
    </div>
  );
};

export default Page;
