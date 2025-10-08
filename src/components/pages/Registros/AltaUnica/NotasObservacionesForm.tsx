import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export const NotasObservacionesForm: React.FC = () => {
    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                    label="Elegible"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                    label="Interesado"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                    label="Campaña"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <TextField
                    label="Usuario responsable A1"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <TextField
                    label="Comentarios"
                    multiline
                    rows={4}
                />
            </Grid>
            
        </Grid>
    );
}