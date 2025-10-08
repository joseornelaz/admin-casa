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
  LinearProgress,
  useTheme
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { BoxContainer } from '../../../atoms/BoxContainer/BoxContainer';
import { TitleHeader } from '../../../molecules/TitleHeader/TitleHeader';

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { TagsContainer } from '../../../molecules/TagsContainer/TagsContainer';

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

  return (
    <BoxContainer
        sxProps={{ display: 'flex', flexDirection: 'column' }}
    >
        <TitleHeader 
            text="Estudiantes (64)" 
            subTitle="Resumen de estudiantes activos en este grupo"
            icon={PeopleAltOutlinedIcon}
            fontSize="h3"
        />
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
                            <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5, color: theme.palette.primary[700]}}>
                                {student.name}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                { getTagContainer(`NUM. EMPLEADO ${student.employeeNumber}`) }
                                { getTagContainer(`ID MOODLE ${student.moodleId}`) }
                            </Box>
                            </Box>
                        </Box>
                        </TableCell>
                        <TableCell sx={{ width: 250 }}>
                        <Box>
                            <Typography variant="overline" sx={{ mb: 0.5, color: theme.palette.primary[500], textTransform: 'none' }}>
                                {student.progress}% Completado
                            </Typography>
                            <LinearProgress 
                            variant="determinate" 
                            value={student.progress}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: '#e0e0e0',
                                '& .MuiLinearProgress-bar': {
                                    // backgroundColor: progressColor,
                                    borderRadius: 4
                                }
                            }}
                            />
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
    </BoxContainer>
  );
};