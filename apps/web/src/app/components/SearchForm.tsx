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
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
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
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          sx={{ minWidth: 100 }}
        >
          検索
        </Button>
      </Box>
    );
  },
);

SearchForm.displayName = 'SearchForm';
