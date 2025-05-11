'use client';

import { Box, Container, Typography } from '@mui/material';
import { useBlocks } from '../lib/contexts/BlocksContext';
import { AddBlockUserForm } from './components/AddBlockUserForm';
import { BlockListTable } from './components/BlockListTable';
import { RequireAuth } from './components/common/RequireAuth';
import { SearchForm } from './components/SearchForm';

export default function Home() {
  const { searchQuery, setSearchQuery, executeSearch } = useBlocks();

  return (
    <Container maxWidth="lg">
      <RequireAuth fallback={<div>ログインしてください</div>}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            ブロックリスト
          </Typography>
          <AddBlockUserForm />
          <SearchForm
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={executeSearch}
          />
          <BlockListTable />
        </Box>
      </RequireAuth>
    </Container>
  );
}
