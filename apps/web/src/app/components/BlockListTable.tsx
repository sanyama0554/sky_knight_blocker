import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { getUserProfileUrl } from '../../lib/getUserProfileUrl';

const rows = [
  {
    id: 1,
    blocked_user_id: '37971403',
    description: 'テスト中',
  },
  {
    id: 2,
    blocked_user_id: '33928799',
    description: 'テスト中',
  },
];

export const BlockListTable = () => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ユーザーID</TableCell>
            <TableCell>備考</TableCell>
            <TableCell>プロフィールページへ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
