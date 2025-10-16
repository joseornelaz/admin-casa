import MuiLinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(MuiLinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 3,
  width: '100%',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 3,
    backgroundColor: 'currentColor',
    ...theme.applyStyles('dark', {
      backgroundColor: 'currentColor',
    }),
  },
}));

type LinearProgressProps = {
    value?: number;
}

export const LinearProgress: React.FC<LinearProgressProps> = ({value = 0}) => {
  return (
      <BorderLinearProgress variant="determinate" value={value} />
  );
}