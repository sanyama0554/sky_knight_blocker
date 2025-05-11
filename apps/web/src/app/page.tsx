'use client';

import { Box, Container, Typography } from '@mui/material';
import AddBlockUserForm from './components/AddBlockUserForm';
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
              gap: 3,
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '100%',
              mb: 2,
            }}
          >
            <Box sx={{ flex: 1.2, maxWidth: 400, width: '100%' }}>
              <AddBlockUserForm />
            </Box>
            <Box sx={{ flex: 2.5, maxWidth: 900, width: '100%' }}>
              <BlockListTable />
            </Box>
          </Box>
        </Box>
      </RequireAuth>
    </Container>
  );
}
