import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export const DatosLaboralesForm: React.FC = () => {
    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                    label="Corporación"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                    label="Asociación"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                    label="Empresa"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    label="Programa Académico"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    label="Ruta de Estudios"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    label="Tipo de usuario"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    label="Sexo"
                    placeholder="Sexo"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    label="Estado"
                    placeholder="Estado"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    label="Ciudad"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
                <TextField
                    label="Centro"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                    label="Región"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <TextField
                    label="Puesto"
                />
            </Grid>
        </Grid>
    );
}