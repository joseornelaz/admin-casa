import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface ModuleItemProps {
  sectionTitle: string;
  title: string;
  format: string;
  icon: React.ReactNode;
}

export const ModuleItem: React.FC<ModuleItemProps> = ({ sectionTitle, title, format, icon }) => (
  <Box>
    <Stack direction="row" spacing={0.8} alignItems="center" sx={{ mb: 0.8 }}>
      {icon}
      <Typography variant="caption" sx={{ fontWeight: 700, color: '#6B7280', letterSpacing: '0.5px' }}>
        {sectionTitle}
      </Typography>
    </Stack>

    <Paper elevation={0} sx={{ p: 1.2, px: 2, borderRadius: '12px', border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <InsertDriveFileOutlinedIcon sx={{ fontSize: 18, color: '#EF4444' }} />
        <Typography variant="body2" sx={{ fontWeight: 500, color: '#1F2937', fontSize: '0.875rem' }}>
          {title}
        </Typography>
        <Chip label={format} size="small" sx={{ height: '20px', fontSize: '0.65rem', fontWeight: 700, backgroundColor: '#F3F4F6', color: '#6B7280' }} />
      </Stack>

      <Stack direction="row" spacing={0.5}>
        <IconButton size="small"><VisibilityOutlinedIcon sx={{ fontSize: 16, color: '#9CA3AF' }} /></IconButton>
        <IconButton size="small"><EditOutlinedIcon sx={{ fontSize: 16, color: '#9CA3AF' }} /></IconButton>
        <IconButton size="small"><FileDownloadOutlinedIcon sx={{ fontSize: 16, color: '#9CA3AF' }} /></IconButton>
        <IconButton size="small"><RocketLaunchOutlinedIcon sx={{ fontSize: 16, color: '#10B981' }} /></IconButton>
        <IconButton size="small"><DeleteOutlineOutlinedIcon sx={{ fontSize: 16, color: '#EF4444' }} /></IconButton>
      </Stack>
    </Paper>
  </Box>
);