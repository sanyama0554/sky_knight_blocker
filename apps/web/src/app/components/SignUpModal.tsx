import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Link,
  TextField,
  Typography,
} from '@mui/material';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSignUp: () => void;
  onSwitchToSignIn: () => void;
}

export const SignUpModal = ({
  isOpen,
  onClose,
  email,
  setEmail,
  password,
  setPassword,
  handleSignUp,
  onSwitchToSignIn,
}: SignUpModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>新規登録</DialogTitle>
      <Box sx={{ padding: 3 }}>
        <TextField
          label="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          onClick={handleSignUp}
          fullWidth
          sx={{ mt: 2 }}
        >
          登録
        </Button>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            すでにアカウントをお持ちの方は
            <Link href="#" onClick={onSwitchToSignIn}>
              こちら
            </Link>
            からログインしてください
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
};
