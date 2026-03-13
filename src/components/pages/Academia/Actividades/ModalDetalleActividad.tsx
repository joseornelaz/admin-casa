import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Box, Grid, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GetActividadDetalle } from "../../../../services/ActividadesService";
import { LoadingCircular } from "../../../molecules/LoadingCircular/LoadingCircular";
import type { Actividad } from "../../../../types/Actividades.interface";
import type { AlumnoActividad } from "../../../../types/Actividades.interface";

interface ModalDetalleActividadProps {
    open: boolean;
    onClose: () => void;
    actividad: Actividad | null;
}

export const ModalDetalleActividad: React.FC<ModalDetalleActividadProps> = ({ open, onClose, actividad }) => {
    const { data: detalleData, isLoading } = GetActividadDetalle(
        actividad?.id_curso ?? 0, 
        actividad?.id_recurso ?? 0, 
        { enabled: open && !!actividad }
    );

    const submissions = detalleData?.data ?? [];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{actividad?.titulo}</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                {isLoading ? (
                    <LoadingCircular Text="Cargando entregas..." />
                ) : (
                    <Grid container spacing={2}>
                        {submissions.length > 0 ? (
                            submissions.map((alumno: AlumnoActividad, index: number) => (
                                <Grid size={{ xs: 12 }} key={index}>
                                    <Box display="flex" alignItems="center" p={1} borderBottom="1px solid #eee">
                                        <Avatar>{alumno.alumno.charAt(0)}</Avatar>
                                        <Box ml={2} flexGrow={1}>
                                            <Typography variant="subtitle1">{alumno.alumno}</Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                Enviado: {alumno.fecha_envio ? new Date(alumno.fecha_envio).toLocaleString() : 'No enviado'}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            {alumno.calificacion !== null ? (
                                                <Typography color="primary" variant="h6">{alumno.calificacion}</Typography>
                                            ) : (
                                                <Typography color="error" variant="caption">Pendiente</Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="body1" align="center" style={{ width: '100%', padding: '20px' }}>
                                No hay entregas para esta actividad.
                            </Typography>
                        )}
                    </Grid>
                )}
            </DialogContent>
        </Dialog>
    );
};
