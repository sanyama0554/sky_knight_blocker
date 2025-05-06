import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Link,
  TextField,
  Typography,
} from '@mui/material';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSignIn: () => void;
}

export const SignInModal = ({
  isOpen,
  onClose,
  email,
  setEmail,
  password,
  setPassword,
  handleSignIn,
}: SignInModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>ログイン</DialogTitle>
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
          onClick={handleSignIn}
          fullWidth
          sx={{ mt: 2 }}
        >
          ログイン
        </Button>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            アカウントをお持ちでない場合は
            <Link
              href="#"
              onClick={() => {
                /* SignUpモーダルへの遷移処理 */
              }}
            >
              こちら
            </Link>
            から登録してください
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
};
