import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter, // Importante para la integración
  Paper,
  Avatar,
  Typography,
  Chip,
  Button,
  Box,
  Stack,
} from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

type EstadoAlumno = 'Activo' | 'Egresado' | 'Baja';

interface StatusStyle {
  color: string;
  bgColor: string;
  borderColor: string;
}

interface AlumnoRow {
  id: number;
  nombre: string;
  matricula: string;
  correo: string;
  estado: EstadoAlumno; // <- AQUÍ: Cambia 'string' por tu tipo estricto
  ruta: string;
  ultAct: string;
  iniciales: string;
}

const statusConfig: Record<EstadoAlumno, StatusStyle> = {
  Activo: { color: '#2e7d32', bgColor: '#e8f5e9', borderColor: '#4caf50' },
  Egresado: { color: '#1976d2', bgColor: '#e3f2fd', borderColor: '#2196f3' },
  Baja: { color: '#d32f2f', bgColor: '#ffebee', borderColor: '#f44336' },
};

const rows: AlumnoRow[] = [
  { id: 1, nombre: 'García López, María Elena', matricula: 'AGC-2023-001', correo: 'garcia.elena@correo.edu.mx', estado: 'Activo', ruta: 'Lic. en Administración', ultAct: 'hoy', iniciales: 'MG' },
  { id: 2, nombre: 'Ramírez Torres, Carlos', matricula: 'AGC-2022-087', correo: 'c.ramirez@correo.edu.mx', estado: 'Activo', ruta: 'Lic. en Negocios', ultAct: 'ayer', iniciales: 'CR' },
  { id: 3, nombre: 'López Hernández, Ana', matricula: 'AGC-2021-134', correo: 'a.lopez@correo.edu.mx', estado: 'Egresado', ruta: 'Lic. en Administración', ultAct: '28 jun', iniciales: 'LH' },
  { id: 4, nombre: 'Morales Vega, José', matricula: 'AGC-2023-045', correo: 'j.morales@correo.edu.mx', estado: 'Baja', ruta: 'Lic. en Derecho', ultAct: '15 jun', iniciales: 'JM' },
  { id: 5, nombre: 'Sánchez Ruiz, Valentina', matricula: 'AGC-2024-012', correo: 'v.sanchez@correo.edu.mx', estado: 'Activo', ruta: 'Lic. en Negocios', ultAct: 'hoy', iniciales: 'VS' },
];

export const AlumnosTable: React.FC = () => {
  const [page, setPage] = useState(1);

  return (
    <Box sx={{ width: '100%', py: 2 }}>
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #efefef', borderRadius: '8px' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ backgroundColor: '#fdfdfd' }}>
            <TableRow>
              <TableCell sx={{ color: '#888', fontWeight: 'bold', fontSize: '0.75rem', pl: 3 }}>ALUMNO / MATRÍCULA</TableCell>
              <TableCell sx={{ color: '#888', fontWeight: 'bold', fontSize: '0.75rem' }}>ESTADO</TableCell>
              <TableCell sx={{ color: '#888', fontWeight: 'bold', fontSize: '0.75rem' }}>RUTA DE FORMACIÓN</TableCell>
              <TableCell sx={{ color: '#888', fontWeight: 'bold', fontSize: '0.75rem' }} align="right">ÚLT. ACT.</TableCell>
              <TableCell sx={{ color: '#888', fontWeight: 'bold', fontSize: '0.75rem' }} align="center">ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  borderLeft: `5px solid ${statusConfig[row.estado].borderColor}`,
                  '&:hover': { backgroundColor: '#f9f9f9' },
                }}
              >
                <TableCell sx={{ pl: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontSize: '0.8rem', width: 32, height: 32 }}>
                      {row.iniciales}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333' }}>
                        {row.nombre}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>{row.matricula}</Box>
                        {row.correo}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Chip
                        label={row.estado}
                        size="small"
                        icon={
                            <Box
                            sx={{
                                width: '6px !important',
                                height: '6px !important',
                                borderRadius: '50%',
                                backgroundColor: statusConfig[row.estado].color,
                                marginLeft: '10px !important',
                                marginRight: '-4px !important'
                            }}
                            />
                        }
                        sx={{
                            backgroundColor: statusConfig[row.estado].bgColor,
                            color: statusConfig[row.estado].color,
                            fontWeight: 'bold',
                            borderRadius: '16px',
                            height: '24px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            '& .MuiChip-label': {
                            paddingLeft: '8px',
                            paddingRight: '12px',
                            fontSize: '0.8125rem',
                            }
                        }}
                    />
                </TableCell>

                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {row.ruta}
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  <Typography variant="body2" color="textSecondary">
                    {row.ultAct}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                    <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center">
                        <IconButton 
                            size="small" 
                            title="Ver"
                            sx={{ 
                                color: '#666',
                                padding: '6px',
                                '&:hover': { backgroundColor: '#f0f0f0' }
                            }}
                        >
                            <VisibilityIcon sx={{ fontSize: '1.2rem' }} />
                        </IconButton>
                        
                        <IconButton 
                            size="small" 
                            title="Editar"
                            sx={{ 
                                color: '#666',
                                padding: '6px',
                                '&:hover': { backgroundColor: '#f0f0f0' }
                            }}
                        >
                            <EditIcon sx={{ fontSize: '1.2rem' }} />
                        </IconButton>
                        
                        <Box
                            onClick={() => {
                                console.log('Seguimiento para:', row.id);
                            }}
                            sx={{
                                backgroundColor: '#fff1f1',
                                color: '#d32f2f',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                borderRadius: '6px',
                                padding: '4px 10px',
                                display: 'inline-block',
                                cursor: 'pointer',
                                userSelect: 'none',
                                transition: 'background-color 0.2s ease',
                                '&:hover': { 
                                    backgroundColor: '#ffe4e4' 
                                }
                            }}
                        >
                            Seguimiento
                        </Box>
                    </Stack>
                    </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {/* AJUSTE AQUÍ: Paginación embebida como parte oficial de la estructura de la tabla */}
          <TableFooter sx={{ backgroundColor: '#ffffff' }}>
            <TableRow>
              <TableCell colSpan={5} sx={{ p: 2, borderTop: '1px solid #efefef' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <Typography variant="caption" sx={{ color: '#777777', fontWeight: 500 }}>
                    Mostrando 5 de 1,247 alumnos
                  </Typography>
                  
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography variant="caption" sx={{ color: '#777777', fontWeight: 500 }}>
                      Página {page} de 250
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Button
                        disabled={page === 1}
                        variant="outlined"
                        size="small"
                        startIcon={<KeyboardArrowLeftIcon />}
                        onClick={() => setPage(p => p - 1)}
                        sx={{ 
                          textTransform: 'none', 
                          color: '#555', 
                          borderColor: '#e0e0e0',
                          borderRadius: '6px',
                          backgroundColor: '#fdfdfd',
                          '&:hover': { borderColor: '#ccc', backgroundColor: '#f5f5f5' }
                        }}
                      >
                        Anterior
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<KeyboardArrowRightIcon />}
                        onClick={() => setPage(p => p + 1)}
                        sx={{ 
                          textTransform: 'none', 
                          color: '#555', 
                          borderColor: '#e0e0e0',
                          borderRadius: '6px',
                          backgroundColor: '#fdfdfd',
                          '&:hover': { borderColor: '#ccc', backgroundColor: '#f5f5f5' }
                        }}
                      >
                        Siguiente
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}