'use client';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { supabase } from 'apps/web/src/lib/supabaseClient';
import { useState } from 'react';
import { SignUpModal } from '../SignInModal';
export function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /** サインイン処理 */
  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            騎空士ブロッカー
          </Typography>
          <Button color="inherit">ブロックリスト</Button>
          <Button color="inherit">設定</Button>
          <Button
            color="inherit"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            {isSignedIn ? 'ログアウト' : 'ログイン'}
          </Button>
        </Toolbar>
      </AppBar>
      <SignUpModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSignIn={handleSignIn}
      />
    </>
  );
}
