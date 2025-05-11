'use client';

import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { memo, useCallback } from 'react';

type SearchFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export const SearchForm = memo(
  ({ value, onChange, onSearch }: SearchFormProps) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          onSearch();
        }
      },
      [onSearch],
    );

    const handleClick = useCallback(() => {
      onSearch();
    }, [onSearch]);

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          bgcolor: 'rgba(255,255,255,0.15)', // 半透明の白
          borderRadius: 2,
          px: 1,
          py: 0.5,
          boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
          height: 40,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="ユーザーIDまたは備考で検索"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'primary.main', opacity: 0.8 }} />
              </InputAdornment>
            ),
            sx: {
              bgcolor: 'transparent',
              color: 'primary.main',
              borderRadius: 2,
              height: 32,
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& input': {
                color: 'primary.main',
                '::placeholder': { color: 'grey.700', opacity: 0.7 },
              },
            },
          }}
          sx={{
            mr: 1,
            minWidth: 0,
            maxWidth: 300,
            '& .MuiInputBase-root': {
              bgcolor: 'transparent',
              color: 'primary.main',
              borderRadius: 2,
              height: 32,
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          sx={{
            minWidth: 80,
            height: 32,
            borderRadius: 2,
            boxShadow: 'none',
            bgcolor: 'white',
            color: 'primary.main',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: 'grey.100',
            },
          }}
        >
          検索
        </Button>
      </Box>
    );
  },
);

SearchForm.displayName = 'SearchForm';
