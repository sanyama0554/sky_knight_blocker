'use client';

import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { translateErrorMessage } from '../../lib/translateErrorMessage';

export const AddBlockUserForm = () => {
  const [userId, setUserId] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
    'success',
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userId, description);
    console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    if (!userId.trim()) {
      setToastMessage('ユーザーIDを入力してください');
      setToastSeverity('error');
      setToastOpen(true);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('blocks')
        .insert([{ blocked_user_id: userId, description }]);

      if (error) {
        setToastMessage(translateErrorMessage(error.message));
        setToastSeverity('error');
      } else {
        setToastMessage('ブロックリストに追加しました');
        setToastSeverity('success');
        setUserId('');
        setDescription('');
      }
    } catch (error) {
      setToastMessage('エラーが発生しました');
      setToastSeverity('error');
    } finally {
      setLoading(false);
      setToastOpen(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mt: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        ブロックユーザー追加
      </Typography>

      <TextField
        fullWidth
        label="ユーザーID"
        variant="outlined"
        margin="normal"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="ブロックしたいユーザーのIDを入力"
        required
      />

      <TextField
        fullWidth
        label="備考"
        variant="outlined"
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="ブロックする理由など（任意）"
        multiline
        rows={2}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? '処理中...' : 'ブロックリストに追加'}
      </Button>

      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        onClose={() => setToastOpen(false)}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity={toastSeverity}
          sx={{ width: '100%' }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
