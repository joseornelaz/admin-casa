import Box from "@mui/material/Box";
import { CircularProgress as MuiCircularProgress } from '@mui/material';
import Typography from "@mui/material/Typography";
import { StateColors } from "@styles";

type CircularProgressProps = {
  value: number; // Valor del progreso (0-100)
  current: number; // Número actual (ej: 1)
  total: number; // Total (ej: 3)
  size?: number;
  thickness?: number;
  progressColor?: string;
  backgroundColor?: string;
  type: 'progress' | 'step'; // Tipo de indicador: 'progress' para barra de progreso, 'step' para pasos
};

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  current,
  total,
  size = 50,
  thickness = 4,
  progressColor = StateColors.enabledForeground,
  backgroundColor = '#e8eaf6',
  type = 'step'
}) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      {/* Fondo */}
      <MuiCircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={thickness}
        sx={{
          color: backgroundColor,
          position: 'absolute',
        }}
      />
      
      {/* Progreso */}
      <MuiCircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={thickness}
        sx={{
          color: progressColor,
        }}
      />
      
      {/* Label */}
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography 
          variant="h3" 
          component="div" 
          sx={{ 
            color: '#30394A',
            fontWeight: 700,
            fontSize: `12px` // Tamaño relativo al círculo
          }}
        >
          {
            type === 'progress' ? `${value}%` : `${current}/${total}`
          }
          
        </Typography>
      </Box>
    </Box>
  );
};