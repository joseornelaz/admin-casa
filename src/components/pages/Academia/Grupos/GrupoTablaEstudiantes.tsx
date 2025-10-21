import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { BoxContainer } from '../../../atoms/BoxContainer/BoxContainer';
import { TagsContainer } from '../../../molecules/TagsContainer/TagsContainer';
import Button from '../../../atoms/Button/Button';
import { StateColors } from '@styles';

type Student = {
  id: string;
  name: string;
  employeeNumber: string;
  moodleId: string;
  progress: number;
  grade: string | number;
  avatar?: string;
  avatarBgColor?: string;
};

const mockStudents: Student[] = [
    {
      id: '1',
      name: 'Abel Arreola Flores',
      employeeNumber: '90372598',
      moodleId: '223344',
      progress: 50,
      grade: 'Pendiente',
      avatarBgColor: '#9c27b0'
    },
    {
      id: '2',
      name: 'Abraham San Juan de la Cruz',
      employeeNumber: '90372598',
      moodleId: '223344',
      progress: 100,
      grade: 9,
      avatarBgColor: '#795548'
    },
    {
      id: '3',
      name: 'Adrián Uriel Castillo González',
      employeeNumber: '90372598',
      moodleId: '223344',
      progress: 100,
      grade: 5,
      avatarBgColor: '#8bc34a'
    },
    {
      id: '4',
      name: 'Alan Oswaldo Gastelum Ayala',
      employeeNumber: '90372598',
      moodleId: '223344',
      progress: 100,
      grade: 10,
      avatarBgColor: '#ff5722'
    },
    {
      id: '5',
      name: 'Alejandro Vargas Jimenez',
      employeeNumber: '90372598',
      moodleId: '223344',
      progress: 100,
      grade: 8,
      avatarBgColor: '#ff5722'
    }
  ];

export const GrupoTablaEstudiantes: React.FC = () => {
  const theme = useTheme();

  const getInitials = (name: string) => {
    const words = name.split(' ');
    return words[0]?.[0]?.toUpperCase() || 'A';
  };

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
                            <UnfoldMoreIcon sx={{ fontSize: 18, color: '#9aa0a6' }} />
                        </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#5f6368' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Progreso
                            <UnfoldMoreIcon sx={{ fontSize: 18, color: '#9aa0a6' }} />
                        </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#5f6368' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Calificación
                            <UnfoldMoreIcon sx={{ fontSize: 18, color: '#9aa0a6' }} />
                        </Box>
                    </TableCell>
                    <TableCell sx={{ width: 50 }}></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {mockStudents.map((student) => {
                    const bgColor = student.progress === 100 ? '#e8f5e9' : '#fff';
                    
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
                            <Avatar 
                                src={student.avatar}
                                sx={{ 
                                    width: 40, 
                                    height: 40,
                                    bgcolor: student.avatarBgColor || '#1976d2',
                                    fontSize: '1rem',
                                    fontWeight: 600
                                }}
                            >
                                {!student.avatar && getInitials(student.name)}
                            </Avatar>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.primary[700]}}>
                                    {student.name}
                                </Typography>
                                { getTagContainer(`EMP. ${student.employeeNumber}`) }
                            </Box>
                        </Box>
                        </TableCell>
                        <TableCell sx={{ width: 100 }}>
                        <Box>
                            <Typography variant="overline" sx={{ mb: 0.5, color: theme.palette.primary[700], textTransform: 'none', fontWeight: '600' }}>
                                {student.progress}%
                            </Typography>
                        </Box>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center'}}>
                            <Typography variant="caption" sx={{ color: theme.palette.primary[600] }}>
                                {student.grade}
                            </Typography>
                        </TableCell>
                        <TableCell>
                        <IconButton size="small">
                            <MoreVertIcon />
                        </IconButton>
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