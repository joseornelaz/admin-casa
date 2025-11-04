import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Typography, useTheme } from '@mui/material';

type ArchivosProps = {
  archivos: string[];
};

export const AdjuntosForos: React.FC<ArchivosProps> = ({ archivos }) => {
  const theme = useTheme();

  const esImagen = (file: string) =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file);

  const esPdf = (file: string) => /\.pdf$/i.test(file);
  const esWord = (file: string) => /\.(doc|docx)$/i.test(file);
  const esExcel = (file: string) => /\.(xls|xlsx)$/i.test(file);

  if (!archivos || archivos.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
        <Typography variant="body2" fontWeight="bold">
          Archivos adjuntos:
        </Typography>
        <Typography variant="body2" color={theme.palette.grey[500]}>
          No hay archivos adjuntos
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
      <Typography variant="body2" fontWeight="bold">
        Archivos adjuntos:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {archivos.map((archivo, index) => (
          esImagen(archivo) ? (
            <Box key={index} sx={{ width: 100, height: 100, borderRadius: 2, overflow: 'hidden' }}>
              <img
                src={archivo}
                alt={`preview-${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          ) : (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, border: '1px solid #ddd', borderRadius: 2 }}>
              {esPdf(archivo) && <PictureAsPdfIcon color="error" />}
              {esWord(archivo) && <DescriptionIcon color="primary" />}
              {esExcel(archivo) && <InsertDriveFileIcon sx={{ color: 'green' }} />}
              {!esPdf(archivo) && !esWord(archivo) && !esExcel(archivo) && <InsertDriveFileIcon />}
              <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
                {archivo.split('/').pop()}
              </Typography>
            </Box>
          )
        ))}
      </Box>
    </Box>
  );
};
