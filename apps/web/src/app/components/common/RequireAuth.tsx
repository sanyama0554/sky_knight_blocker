import { Box, CircularProgress } from '@mui/material';
import { useAuth } from 'apps/web/src/lib/contexts/AuthContext';

type RequireAuthProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function RequireAuth({ children, fallback = null }: RequireAuthProps) {
  const { isSignedIn, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', mt: 4, height: 36 }}
      >
        <CircularProgress size={24} />
      </Box>
    );
  }

  return isSignedIn ? <>{children}</> : <>{fallback}</>;
}
