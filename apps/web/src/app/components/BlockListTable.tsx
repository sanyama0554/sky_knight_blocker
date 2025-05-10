'use client';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { getUserProfileUrl } from '../../lib/getUserProfileUrl';

import { useBlocks } from '../../hooks/useBlocks';

export const BlockListTable = () => {
  const { blocks, loading, error, deleteBlock, deletingId } = useBlocks();

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ユーザーID</TableCell>
            <TableCell>備考</TableCell>
            <TableCell>プロフィールページへ</TableCell>
            <TableCell>ブロック解除</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blocks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="body1" color="text.secondary">
                  ブロック中のユーザーは存在しません
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            blocks.map((row) => (
              <TableRow
                key={row.blocked_user_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{row.blocked_user_id}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    href={getUserProfileUrl(row.blocked_user_id)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    プロフィールページへ
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    disabled={deletingId === row.id}
                    onClick={() => deleteBlock(row.id)}
                  >
                    {deletingId === row.id ? '解除中...' : 'ブロック解除'}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
