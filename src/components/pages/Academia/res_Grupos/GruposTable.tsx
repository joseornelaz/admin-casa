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
  Typography,
  Chip,
  Button,
  Box,
  Stack,
  Switch,
  Tooltip,
} from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { formatFriendlyDate } from '../../../../utils/Helpers';
import { StatusConfirmDialog } from '../../../molecules/Dialogs/StatusConfirmDialog/StatusConfirmDialog';

type EstadoGrupo = 'Activo' | 'Inactivo';

interface StatusStyle {
  color: string;
  bgColor: string;
  borderColor: string;
}

interface GrupoRow {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  estado: EstadoGrupo;
}

const statusConfig: Record<EstadoGrupo, StatusStyle> = {
  Activo: { color: '#2e7d32', bgColor: '#e8f5e9', borderColor: '#4caf50' },
  // Egresado: { color: '#1976d2', bgColor: '#e3f2fd', borderColor: '#2196f3' },
  Inactivo: { color: '#d32f2f', bgColor: '#ffebee', borderColor: '#f44336' },
};

const rows: GrupoRow[] = [
  { id: 1, nombre: 'Grupo A', fechaInicio: '2025-09-01', fechaFin: '2025-12-15', estado: 'Activo' },
  { id: 2, nombre: 'Grupo B', fechaInicio: '2025-09-01', fechaFin: '2025-12-15', estado: 'Inactivo' },
  { id: 3, nombre: 'Grupo C', fechaInicio: '2025-09-01', fechaFin: '2025-12-15', estado: 'Inactivo' },
  { id: 4, nombre: 'Grupo D', fechaInicio: '2025-09-01', fechaFin: '2025-12-15', estado: 'Activo' },
  { id: 5, nombre: 'Grupo E', fechaInicio: '2025-09-01', fechaFin: '2025-12-15', estado: 'Inactivo' },  
];

type ButtonsProps = {
  row: GrupoRow; // Pasamos el renglón completo como propiedad
  onClick: (item: GrupoRow) => void;
};

const EditButton = React.memo(({ row, onClick }: ButtonsProps) => {
  const handleEditClick = () => {
    if (onClick) {
      onClick(row); // Ahora sí le enviamos el objeto que definiste en el tipo
    }
  };

  return (
    <IconButton 
        onClick={handleEditClick}
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
  );
});
EditButton.displayName = 'EditButton';

const EstatusButton = React.memo(({ row, onClick }: ButtonsProps) => {
  const isActivo = row.estado === 'Activo';
  const tooltipText = isActivo ? 'Estatus: Activo' : 'Estatus: Inactivo';

  const handleEstatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Evitamos la propagación de eventos si la fila entera fuera clickeable a futuro
    event.stopPropagation();

    
    if (onClick) {
      onClick(row);
    }
  };

  return (
    <Tooltip title={tooltipText} placement="top" arrow>
      <span>
        <Switch
          size="small"
          // El interruptor se marcará activo dinámicamente si el estado es 'Activo'
          checked={isActivo}
          onChange={handleEstatusChange}
          color="success" // O el color que mejor combine con tu paleta (primary, success, etc.)
          slotProps={{ input: { 'aria-label': `Cambiar estatus de ${row.nombre}` } }}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#4caf50',
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.08)',
              },
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#4caf50',
            },
          }}
        />
      </span>
    </Tooltip>
  );
});

EstatusButton.displayName = 'EstatusButton';

type GruposTableProps = {
  selectedRow?: (grupo: GrupoRow) => void;
};
export const GruposTable: React.FC<GruposTableProps> = ({ selectedRow }) => {
  const [page, setPage] = useState(1);

  const [listaGrupos, setListaGrupos] = useState<GrupoRow[]>(rows);
  const [grupoEstatusTarget, setGrupoEstatusTarget] = useState<GrupoRow | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleEdit = (grupo: GrupoRow) => {
    if(selectedRow) {
      selectedRow(grupo);
    }
  }

  // 1. Al dar click en el Switch, guardamos el grupo y abrimos el Modal
  const handleEstatusClick = (grupo: GrupoRow) => {
    setGrupoEstatusTarget(grupo);
    setIsConfirmOpen(true);
  };

  // 2. Cuando el usuario hace click en "Confirmar" dentro del Modal
  const handleConfirmStatusChange = (grupoTarget: GrupoRow) => {
    console.log('Confirmando cambio de estatus para el grupo: ', grupoTarget);
    const nuevoEstatus: EstadoGrupo = grupoTarget.estado === 'Activo' ? 'Inactivo' : 'Activo';

    // A) Si estás usando estado local (mock):
    setListaGrupos((prevGrupos) =>
      prevGrupos.map((item) =>
        item.id === grupoTarget.id ? { ...item, estado: nuevoEstatus } : item
      )
    );

    // B) Si estás usando React Query con backend (Mutación):
    // updateEstatusMutation.mutate({ id: grupoTarget.id, estatus: nuevoEstatus });

    console.log(`Estatus del grupo ${grupoTarget.id} cambiado a: ${nuevoEstatus}`);

    // Limpiamos los estados del modal
    setIsConfirmOpen(false);
    setGrupoEstatusTarget(null);
  };

  return (
    <Box sx={{ width: '100%', py: 2 }}>
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #efefef', borderRadius: '8px' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ backgroundColor: '#fdfdfd' }}>
            <TableRow>
              <TableCell sx={{ color: '#888', fontWeight: 'bold', fontSize: '0.75rem', pl: 3 }}>GRUPO</TableCell>
              <TableCell sx={{ color: '#888', fontWeight: 'bold', fontSize: '0.75rem' }}>ESTADO</TableCell>
              <TableCell sx={{ color: '#888', fontWeight: 'bold', fontSize: '0.75rem' }}>FECHA INICIO</TableCell>
              <TableCell sx={{ color: '#888', fontWeight: 'bold', fontSize: '0.75rem' }}>FECHA FIN</TableCell>
              <TableCell sx={{ color: '#888', fontWeight: 'bold', fontSize: '0.75rem' }} align="center">ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {listaGrupos.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  borderLeft: `5px solid ${statusConfig[row.estado].borderColor}`,
                  '&:hover': { backgroundColor: '#f9f9f9' },
                }}
              >
                <TableCell sx={{ pl: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333' }}>
                    {row.nombre}
                  </Typography>
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
                    {formatFriendlyDate(row.fechaInicio)}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {formatFriendlyDate(row.fechaFin)}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                    <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center">
                        <EditButton row={row} onClick={handleEdit} />
                        <EstatusButton row={row} onClick={handleEstatusClick} />
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
                    Mostrando 5 de 1,247 grupos
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

      <StatusConfirmDialog
        isOpen={isConfirmOpen}
        grupo={grupoEstatusTarget}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmStatusChange}
      />
    </Box>
  );
}