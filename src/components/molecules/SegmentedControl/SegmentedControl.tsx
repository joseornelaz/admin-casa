import React from 'react';
import { Chip, Stack, useTheme } from '@mui/material';

interface SegmentedControlProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
}) => {

    const theme = useTheme();

  return (
    <Stack direction="row" spacing={1}>
      {options.map((option) => (
        <Chip
          key={option}
          label={option}
          onClick={() => onChange(option)}
          variant={value !== 'option' ? 'outlined':'filled'}
          sx={{
            backgroundColor: value === option ? theme.palette.primary[600] : 'transparent',
            color: value === option ? '#FFF' : 'text.primary',
            cursor: 'pointer',
            '& .MuiChip-label': {
              padding: '8px 16px',
            },
          }}
        />
      ))}
    </Stack>
  );
};