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

export default function AddBlockUserForm() {
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
    'success',
  );

  const { addBlock } = useBlocks();

  const { register, handleSubmit, reset } = useForm<BlockFormData>({
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
        setToastMessage('このユーザーはすでにブロックリストに登録されています');
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

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 2,
        p: { xs: 2, sm: 3 },
        maxWidth: 400,
        width: '100%',
        mx: 'auto',
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
        ブロックユーザー追加
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <TextField
          label="ユーザーID"
          fullWidth
          required
          margin="normal"
          {...register('userId')}
          sx={{ mb: 2 }}
        />
        <TextField
          label="備考"
          fullWidth
          margin="normal"
          {...register('description')}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ height: 44, fontWeight: 'bold', borderRadius: 2, mt: 1 }}
          disabled={loading}
        >
          ブロックリストに追加
        </Button>
      </form>
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={toastSeverity}
          onClose={handleCloseToast}
          sx={{ width: '100%' }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
