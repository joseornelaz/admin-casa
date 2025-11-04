import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

type CustomRatingProps = {
  value: number | null;
  precision: number;
  max?: number;
  readonly?: boolean;
  onChange?: (event: React.ChangeEvent<{}>, newValue: number | null) => void;
  onChangeActive?: (event: React.ChangeEvent<{}>, newValue: number | null) => void;  
};

export const RatingStars: React.FC<CustomRatingProps> = ({ value, precision, max, readonly, onChange, onChangeActive }) => {
  return (
    <Box>
      <Rating
        max={max} 
        readOnly={readonly} 
        onChange={onChange} 
        onChangeActive={onChangeActive} 
        value={value}
        precision={precision}
      />
    </Box>
  );
}