import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TuneIcon from '@mui/icons-material/Tune';
import { BoxContainer } from '../../../atoms/BoxContainer/BoxContainer';
import { AltaUnicaHeader } from './AltaUnicaHeader';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';

type BuscarPersonaFormProps = {
  onSearch?: (data: SearchFormData) => void;
  onRegisterProspect?: () => void;
};

type SearchFormData = {
  employeeNumber: string;
  moodleId: string;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  curp: string;
};

export const BuscarPersonaForm: React.FC<BuscarPersonaFormProps> = ({ 
  onSearch, 
  onRegisterProspect 
}) => {
  const [formData, setFormData] = useState<SearchFormData>({
    employeeNumber: '',
    moodleId: '',
    name: '',
    paternalSurname: '',
    maternalSurname: '',
    curp: ''
  });

  const [noDuplicates, setNoDuplicates] = useState(false);

  const handleChange = (field: keyof SearchFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSearch = () => {
    onSearch?.(formData);
  };

  const handleRegister = () => {
    setNoDuplicates(true);
    onRegisterProspect?.();
  };

  return (
    <BoxContainer>
      <AltaUnicaHeader 
        text='Paso 1: Buscar persona' 
        subText='Ingresa alguno de los datos disponibles para localizar a la persona en el sistema.' 
        estatus='ADMISIÓN'
        valueProgress={33}
        currentStep={1}
      />
      {/* Form */}
      <BoxContainer>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3 }}>
          Búsqueda General
        </Typography>

        {/* Row 1: Employee Number and Moodle ID */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
                label="Número de empleado"
                placeholder="00000000"
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                            <AssignmentIndOutlinedIcon />
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <TextField
                fullWidth
                label="ID Moodle"
                placeholder="000000"
                value={formData.moodleId}
                onChange={handleChange('moodleId')}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                            <AssignmentIndOutlinedIcon />
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Nombre"
            placeholder="Nombre del estudiante"
            value={formData.name}
            onChange={handleChange('name')}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                        <AssignmentIndOutlinedIcon />
                        </InputAdornment>
                    ),
                },
            }}
          />
          <TextField
            label="Apellido Paterno"
            placeholder="Apellido Paterno"
            value={formData.paternalSurname}
            onChange={handleChange('paternalSurname')}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                        <AssignmentIndOutlinedIcon />
                        </InputAdornment>
                    ),
                },
            }}
          />
          <TextField
            label="Apellido Materno"
            placeholder="Apellido Materno"
            value={formData.maternalSurname}
            onChange={handleChange('maternalSurname')}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                        <AssignmentIndOutlinedIcon />
                        </InputAdornment>
                    ),
                },
            }}
          />
        </Box>

        {/* Row 3: CURP */}
        <TextField
          label="CURP"
          placeholder="Ingresa CURP de 18 caracteres"
          value={formData.curp}
          onChange={handleChange('curp')}
          slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                        <AssignmentIndOutlinedIcon />
                        </InputAdornment>
                    ),
                },
          }}
          sx={{ mb: 3 }}
        />

        {/* Success Message */}
        {noDuplicates && (
          <Alert 
            icon={<CheckCircleIcon />}
            severity="success"
            sx={{ 
              mb: 2,
              bgcolor: '#f1f8f4',
              border: '1px solid #4caf50',
              '& .MuiAlert-icon': {
                color: '#2e7d32'
              }
            }}
          >
            No se encontraron registros duplicados.
          </Alert>
        )}

        {/* Register Button */}
        <Button
          variant="contained"
          onClick={handleRegister}
          sx={{
            bgcolor: '#37474f',
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            '&:hover': {
              bgcolor: '#263238'
            }
          }}
        >
          Registrar prospecto
        </Button>
      </BoxContainer>

      {/* Search Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          variant="outlined"
          startIcon={<TuneIcon />}
          onClick={handleSearch}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            borderColor: '#d0d0d0',
            color: '#37474f',
            '&:hover': {
              borderColor: '#37474f',
              bgcolor: 'transparent'
            }
          }}
        >
          Buscar persona
        </Button>
      </Box>
    </BoxContainer>
  );
};