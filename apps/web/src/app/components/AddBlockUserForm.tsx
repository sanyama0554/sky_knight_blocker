'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBlocks } from '../../lib/contexts/BlocksContext';
import { BlockFormData, blockFormSchema } from '../../schemas/block';

export const AddBlockUserForm = () => {
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
    'success',
  );

  const { addBlock, error } = useBlocks();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlockFormData>({
    resolver: zodResolver(blockFormSchema),
  });

  const onSubmit = async (data: BlockFormData) => {
    setLoading(true);

    try {
      const success = await addBlock(data.userId, data.description);

      if (success) {
        setToastMessage('ブロックリストに追加しました');
        setToastSeverity('success');
        reset();
      } else {
        setToastMessage(error || 'ブロックリストへの追加に失敗しました');
        setToastSeverity('error');
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
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 500, mt: 3 }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        ブロックユーザー追加
      </Typography>

      <TextField
        fullWidth
        label="ユーザーID"
        variant="outlined"
        margin="normal"
        {...register('userId')}
        placeholder="ブロックしたいユーザーのIDを入力"
        required
        error={!!errors.userId}
        helperText={errors.userId?.message}
      />

      <TextField
        fullWidth
        label="備考"
        variant="outlined"
        margin="normal"
        {...register('description')}
        placeholder="ブロックする理由など（任意）"
        multiline
        rows={2}
        error={!!errors.description}
        helperText={errors.description?.message}
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
