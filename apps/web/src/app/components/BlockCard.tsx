import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

import type { Block } from '../../types';

type BlockCardProps = {
  block: Block;
  onUnblock?: (blockId: string) => void;
};

const BlockCard: React.FC<BlockCardProps> = ({ block, onUnblock }) => {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          ブロック対象: {block.blocked_user_id}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          ブロック日時: {dayjs(block.created_at).format('YYYY/MM/DD HH:mm:ss')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ブロックID: {block.id}
        </Typography>
      </CardContent>
      {onUnblock && (
        <CardActions>
          <Button
            size="small"
            color="error"
            onClick={() => onUnblock(block.id)}
          >
            ブロック解除
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export { BlockCard };
