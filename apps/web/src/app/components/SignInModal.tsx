import { Button, Dialog, TextField } from '@mui/material';

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
      <div style={{ padding: 24 }}>
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
        <Button variant="contained" onClick={handleSignIn} fullWidth>
          ログイン
        </Button>
      </div>
    </Dialog>
  );
};
