'use client';

import { Box, Container, Typography } from '@mui/material';
import { AddBlockUserForm } from './components/AddBlockUserForm';
import { BlockListTable } from './components/BlockListTable';
import { RequireAuth } from './components/common/RequireAuth';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <RequireAuth fallback={<div>ログインしてください</div>}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            ブロックリスト
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              alignItems: { md: 'flex-end', xs: 'stretch' },
              mb: 4,
            }}
          >
            <Box sx={{ flex: 2 }}>
              <AddBlockUserForm />
            </Box>
          </Box>
          <Box sx={{ mb: 4 }}>
            <BlockListTable />
          </Box>
        </Box>
      </RequireAuth>
    </Container>
  );
}
