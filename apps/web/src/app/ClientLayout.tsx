'use client';

import { Container } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from '../lib/contexts/AuthContext';
import { theme } from '../lib/theme';
import { Footer, Header } from './components/common';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Header />
          <Container maxWidth="md">{children}</Container>
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
