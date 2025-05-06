import { useAuth } from 'apps/web/src/lib/contexts/AuthContext';

type RequireAuthProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function RequireAuth({ children, fallback = null }: RequireAuthProps) {
  const { isSignedIn, loading } = useAuth();

  if (loading) return null;

  return isSignedIn ? <>{children}</> : <>{fallback}</>;
}
