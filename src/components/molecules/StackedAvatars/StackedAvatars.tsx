import React from 'react';
import { Box, Avatar, AvatarGroup, Typography, useTheme } from '@mui/material';

type StackedAvatarsProps = {
  avatars: string[]; // Array de URLs de imágenes
  total: number; // Total de estudiantes
  max?: number; // Máximo de avatares a mostrar antes de "+N"
  label?: string; // Texto personalizado
};

const StackedAvatars: React.FC<StackedAvatarsProps> = ({ 
  avatars, 
  total, 
  max = 5,
  label = 'estudiantes' 
}) => {
    const theme = useTheme();
  const remaining = total - avatars.length;
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <AvatarGroup 
        max={max}
        spacing={10}
        sx={{
          '& .MuiAvatar-root': {
            width: 24,
            height: 24,
            border: '1px solid #F6F7F9',
            fontSize: '1.2rem'
          }
        }}
      >
        {avatars.map((avatar, index) => (
          <Avatar 
            key={index} 
            alt={`Avatar ${index + 1}`} 
            src={avatar}
          />
        ))}
      </AvatarGroup>
      
      <Typography 
        variant="overline" 
        sx={{ 
          color: theme.palette.primary[700],
          fontWeight: 400,
          textTransform: 'none'
        }}
      >
        +{remaining > 0 ? remaining : total} {label}
      </Typography>
    </Box>
  );
};

export default StackedAvatars;