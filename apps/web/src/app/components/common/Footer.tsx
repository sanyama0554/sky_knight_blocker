import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} 騎空士ブロッカー All rights reserved.
      </Typography>
    </Box>
  );
}
