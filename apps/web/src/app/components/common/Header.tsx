import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

export function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* ロゴやアイコン */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        {/* サイト名 */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          騎空士ブロッカー
        </Typography>
        {/* ナビゲーションやアクション */}
        <Button color="inherit">ブロックリスト</Button>
        <Button color="inherit">設定</Button>
        <Button color="inherit">ログアウト</Button>
      </Toolbar>
    </AppBar>
  );
}
