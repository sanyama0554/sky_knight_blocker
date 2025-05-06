'use client';

import { BlockListTable } from './components';
import { RequireAuth } from './components/common/RequireAuth';

const Page = () => {
  return (
    <div style={{ padding: '20px' }}>
      <RequireAuth fallback={<div>ログインしてください</div>}>
        <BlockListTable />
      </RequireAuth>
    </div>
  );
};

export default Page;
