import React from "react";
import Box from "@mui/material/Box";
import { flexColumn, flexRows } from "@styles";
import { useTheme } from "@mui/material/styles";
import { Avatar } from "../../../atoms/Avatar/Avatar";
import Typography from "@mui/material/Typography";
import { TagsContainer } from "../../../molecules/TagsContainer/TagsContainer";
import { ContextBreadcrumb } from "../../../molecules/ContextBreadcrumb/ContextBreadcrumb";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CommitOutlinedIcon from '@mui/icons-material/CommitOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

const documentosEjemplo = [
    {
      title: 'Acta de Nacimiento',
      statusFrom: 'PENDIENTE',
      statusTo: 'VALIDADO',
    },
    {
      title: 'Acta de Nacimiento',
      statusFrom: 'PENDIENTE',
      statusTo: 'VALIDADO',
    },
    {
      title: 'Certificado de estudios',
      statusFrom: 'PENDIENTE',
      statusTo: 'VALIDADO',
    },
    {
      title: 'Comprobante de Domicilio',
      statusFrom: 'PENDIENTE',
      statusTo: 'RECHAZADO',
    },
    {
      title: 'Identificación Oficial (INE)',
      statusFrom: 'PENDIENTE',
      statusTo: 'VALIDADO',
    },
  ];

type ResponsableCardProps = {
    item?: any;
}

export const ResponsableCard: React.FC<ResponsableCardProps> = () => {
    const theme = useTheme();
    const [openCollapse, setOpenCollapse] = React.useState<boolean>(false);

    const handleOpenCollapse = () => {
        setOpenCollapse((val) => !val);
    }

    const getTagContainer = (text: string, status: any) => <TagsContainer text={text} status={status} />;

    const responsableInfo = (_item: any) => (
        <>
            <Box sx={{...flexRows, justifyContent: 'flex-start', gap: '10px'}}>
                <ArrowForwardOutlinedIcon sx={{fontSize: '20px'}} />
                <Avatar width={24} height={24} />
                <Typography component="h6" variant="h6">
                    Rosa Armida Espinoza Angulo
                </Typography>
                <Typography component="span" variant="caption">
                    (Hace 1 día)
                </Typography>
                {getTagContainer("GESTION ESCOLAR", "transparent")}
            </Box>
            <Box sx={{...flexRows, justifyContent: 'flex-start', gap: '10px'}}>
                <CommitOutlinedIcon sx={{fontSize: '20px'}} />
                <ContextBreadcrumb list={[
                    {text: 'Validó documentos e inscribió alumno (5 Campos modificados)', type: 'iconText'},
                    {text: '24 de Septiembre del 2025 10:03', type: 'iconText'},
                    ]} 
                />
            </Box>
        </>
    )

    const tagContainerStatus = (statusFrom: string, statusTo: string) => (
        <Box sx={{...flexRows, justifyContent: 'flex-start', gap: '10px'}}>
            {getTagContainer(statusFrom, 'prueba')}
            <ArrowRightAltOutlinedIcon />
            {getTagContainer(statusTo, 'normal')}
        </Box>
    )

    const documentStatus = (documents: any[]) => (
        <Box sx={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '8px',
                p: '8px 16px',
                '@media (max-width: 768px)': {
                    gridTemplateColumns: '1fr',
                },
            }}
        >
            {
                documents.map((doc, index) => (
                    <Box key={index}
                        sx={{
                            ...flexColumn, 
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start', 
                            gap: 1,
                            borderRadius: '4px',
                            padding: '8px 16px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            border: `1px solid ${theme.palette.primary[200]}`,
                            backgroundColor: `${theme.palette.primary[50]}`
                        }}
                    >
                        <Typography variant="overline">{doc.title}</Typography>
                        {tagContainerStatus(doc.statusFrom, doc.statusTo)}
                    </Box>
                )) 
            }
        </Box>
    )

    return(
        <React.Fragment>
            <Box 
                sx={{
                    ...flexRows, 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    backgroundColor: theme.palette.primary[100],
                    border: `1px solid ${theme.palette.primary[200]}`,
                    p: '8px 24px'
                }}
            >
                <Box sx={{...flexColumn, alignItems: 'flex-start', justifyContent: 'flex-start', gap: '8px'}}>
                    {responsableInfo('')}
                    {tagContainerStatus('PROSPECTO','ALUMNO')}
                </Box>
                <IconButton onClick={handleOpenCollapse}>
                    {
                        !openCollapse
                        ? <VisibilityOutlinedIcon />
                        : <VisibilityOffOutlinedIcon />
                    }
                </IconButton>
            </Box>
            <Collapse in={openCollapse}>
                <Box sx={{px: 4,border: `1px solid ${theme.palette.primary[200]}`,}}>
                    <Box sx={{ borderLeft: `1px solid ${theme.palette.primary[500]}`, mt: 1, mb: 1 }}>
                        { documentStatus(documentosEjemplo) }
                    </Box>
                </Box>
            </Collapse>
        </React.Fragment>
    )
}