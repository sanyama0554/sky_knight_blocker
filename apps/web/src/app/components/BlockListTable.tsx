'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useBlocks } from '../../lib/contexts/BlocksContext';
import { getUserProfileUrl } from '../../lib/getUserProfileUrl';

export const BlockListTable = () => {
  const {
    blocks,
    loading,
    error,
    deleteBlock,
    deletingId,
    page,
    rowsPerPage,
    totalCount,
    handleChangePage,
    handleChangeRowsPerPage,
    searchQuery,
  } = useBlocks();

  if (error && error.includes('ユーザーがログインしていません')) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 2,
        p: { xs: 2, sm: 3 },
        maxWidth: 900,
        width: '100%',
        mx: 'auto',
        mb: 2,
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ whiteSpace: 'nowrap', width: 120 }}>
                ユーザーID
              </TableCell>
              <TableCell align="left" sx={{ width: 300 }}>
                備考
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap', width: 80 }}>
                プロフィール
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap', width: 60 }}>
                解除
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Box sx={{ py: 4 }}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : blocks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body1" color="text.secondary">
                    {searchQuery
                      ? '検索条件に一致するブロック中のユーザーは存在しません'
                      : 'ブロック中のユーザーは存在しません'}
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
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      component="a"
                      href={getUserProfileUrl(row.blocked_user_id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="primary"
                      size="small"
                      aria-label="プロフィールページへ"
                      title="プロフィールページへ"
                    >
                      <OpenInNewIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      size="small"
                      aria-label="ブロック解除"
                      title="ブロック解除"
                      disabled={deletingId === row.id}
                      onClick={() => deleteBlock(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => handleChangePage(newPage)}
        onRowsPerPageChange={(event) =>
          handleChangeRowsPerPage(parseInt(event.target.value, 10))
        }
        labelRowsPerPage="表示件数"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} / ${count !== -1 ? count : `${to}以上`}`
        }
      />
    </Box>
  );
};
