'use client';

import { BlockListTable } from './components';
import { AddBlockUserForm } from './components/AddBlockUserForm';
import { RequireAuth } from './components/common/RequireAuth';

const Page = () => {
  return (
    <div style={{ padding: '20px' }}>
      <RequireAuth fallback={<div>ログインしてください</div>}>
        <AddBlockUserForm />
        <BlockListTable />
      </RequireAuth>
    </div>
  );
};

export default Page;
