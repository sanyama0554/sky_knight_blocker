'use client';
import { useState } from 'react';
import type { Block } from '../types';
import { BlockListTable } from './components';

const Page = () => {
  const [blocks] = useState<Block[]>([
    {
      id: '1',
      user_id: 'user123',
      blocked_user_id: 'blockedUser456',
      created_at: new Date().toISOString(),
    },
  ]);

  return (
    <div style={{ padding: '20px' }}>
      <BlockListTable />
    </div>
  );
};

export default Page;
