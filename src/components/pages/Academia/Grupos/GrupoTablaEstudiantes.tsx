import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { BoxContainer } from '../../../atoms/BoxContainer/BoxContainer';
import { TagsContainer } from '../../../molecules/TagsContainer/TagsContainer';
import Button from '../../../atoms/Button/Button';
import { StateColors } from '@styles';
import { EstudiantesMock } from '../../../../mockdata/GruposMock';
import { CircularProgress } from '../../../molecules/CircularProgress/CircularProgress';
import { StatusPill } from '../../../molecules/StatusPill/StatusPill';

export const GrupoTablaEstudiantes: React.FC = () => {
  const theme = useTheme();

  const getTagContainer = (text: string, status: any = 'transparent') => <TagsContainer text={text} status={status} />;

  const handlePromediar = () => {

  }

  return (
    <BoxContainer backgroundColor='light'>
        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f7' }}>
                        <TableCell sx={{ fontWeight: 600, color: '#5f6368' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                Nombre del estudiante
                            </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#5f6368' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                Avance
                            </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#5f6368' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                Calificación
                            </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#5f6368' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                Estado
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {EstudiantesMock.map((student) => {
                    const bgColor = student.avance === 100 ? '#e8f5e9' : '#fff';
                    
                    return (
                    <TableRow 
                        key={student.id}
                        sx={{ 
                        backgroundColor: bgColor,
                        '&:hover': { backgroundColor: '#f5f5f5' }
                        }}
                    >
                        <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.primary[700]}}>
                                        {student.nombre}
                                    </Typography>
                                    { getTagContainer(`ID: ${student.id}`) }
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell sx={{ width: 100 }}>
                            <Box>
                                <Typography variant="overline" sx={{ mb: 0.5, color: theme.palette.primary[700], textTransform: 'none', fontWeight: '600' }}>
                                    <CircularProgress value={student.avance} type='progress' current={0} total={0} size={35} thickness={4} progressColor={student.avance === 100 ? '#4caf50' : '#2196f3'} backgroundColor="#e0e0e0" />
                                </Typography>
                            </Box>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center'}}>
                            <Typography variant="caption" sx={{ color: theme.palette.primary[600] }}>
                                {student.calificacion}
                            </Typography>
                        </TableCell>
                        <TableCell >
                            <StatusPill label={student.estatus} status={student.estatus.toLowerCase() as any} />
                        </TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </TableContainer>
        <Box sx={{display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between', mt: 2}}>
            <Box sx={{display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer' }}>
                <Typography variant='button' sx={{ color: StateColors.idleForeground }} >
                    Ver todos los estudiantes
                </Typography>
                <KeyboardArrowRightOutlinedIcon sx={{ color: StateColors.idleForeground }} />
            </Box>
            
            <Button
                onClick={handlePromediar}
                icon={<TuneOutlinedIcon />}
                iconPosition="start"
                variant='outlined'
            >Promediar Grupo</Button>
        </Box>
    </BoxContainer>
  );
};