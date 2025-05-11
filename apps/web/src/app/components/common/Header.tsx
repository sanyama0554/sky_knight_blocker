'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { Alert, Box, CircularProgress } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAuth } from 'apps/web/src/lib/contexts/AuthContext';
import { useBlocks } from 'apps/web/src/lib/contexts/BlocksContext';
import { supabase } from 'apps/web/src/lib/supabaseClient';
import { translateErrorMessage } from 'apps/web/src/lib/translateErrorMessage';
import { useState } from 'react';
import { SearchForm } from '../SearchForm';
import { SignInModal } from '../SignInModal';
import { SignUpModal } from '../SignUpModal';
import { RequireAuth } from './RequireAuth';

export function Header() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('info');

  const { isSignedIn, loading } = useAuth();
  const { searchQuery, setSearchQuery, executeSearch } = useBlocks();

  /** サインイン処理 */
  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setToastSeverity('error');
      setToastMessage(translateErrorMessage(error.message));
    } else {
      setToastSeverity('success');
      setIsSignInModalOpen(false);
      setToastMessage('サインインに成功しました');
    }
    setToastOpen(true);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setToastSeverity('error');
      setToastMessage(translateErrorMessage(error.message));
    } else {
      setToastSeverity('success');
      setToastMessage('サインアウトしました');
    }
    setToastOpen(true);
  };

  /** サインアップ処理 */
  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setToastSeverity('error');
      setToastMessage(translateErrorMessage(error.message));
    } else {
      setToastSeverity('success');
      setIsSignUpModalOpen(false);
      setToastMessage('サインアップに成功しました');
    }
    setToastOpen(true);
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* 左：ロゴ＋メニュー */}
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 180 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" noWrap>
              騎空士ブロッカー
            </Typography>
          </Box>
          {/* 中央：検索フォーム */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mx: 2,
              minWidth: 200,
              maxWidth: 400,
            }}
          >
            <Box
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
                px: 1,
                py: 0.5,
                display: 'flex',
                alignItems: 'center',
                height: 40,
              }}
            >
              <SearchForm
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={executeSearch}
              />
            </Box>
          </Box>
          {/* 右：ボタン群 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              minWidth: 220,
              justifyContent: 'flex-end',
            }}
          >
            <RequireAuth>
              <Button color="inherit" sx={{ height: 36 }}>
                ブロックリスト
              </Button>
              <Button color="inherit" sx={{ height: 36 }}>
                設定
              </Button>
            </RequireAuth>
            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: 2,
                  height: 36,
                }}
              >
                <CircularProgress size={24} color="inherit" />
              </Box>
            ) : (
              <Button
                color="inherit"
                sx={{ height: 36, ml: 1 }}
                onClick={
                  isSignedIn
                    ? handleSignOut
                    : () => {
                        setEmail('');
                        setPassword('');
                        setIsSignInModalOpen(true);
                      }
                }
              >
                {isSignedIn ? 'ログアウト' : 'ログイン'}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSignIn={handleSignIn}
        onSwitchToSignUp={() => {
          setIsSignInModalOpen(false);
          setEmail('');
          setPassword('');
          setIsSignUpModalOpen(true);
        }}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSignUp={handleSignUp}
        onSwitchToSignIn={() => {
          setIsSignUpModalOpen(false);
          setEmail('');
          setPassword('');
          setIsSignInModalOpen(true);
        }}
      />
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        message={toastMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity={toastSeverity}>{toastMessage}</Alert>
      </Snackbar>
    </>
  );
}
