import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export const DatosPersonalesForm: React.FC = () => {
    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12 }}>
                <TextField
                    label="Número de empleado"
                    placeholder="00000000"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                    label="Nombre"
                    placeholder="Nombre del estudiante"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                    label="Apellido Paterno"
                    placeholder="Apellido Paterno"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                    label="Apellido Materno"
                    placeholder="Apellido Materno"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
                <TextField
                    label="Fecha de Nacimiento"
                    placeholder="Fecha de Nacimiento"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                    label="Edad"
                    placeholder="Edad"
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
                    label="Estado Civil"
                    placeholder="Estado Civil"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    label="Curp"
                    placeholder="Curp"
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    label="Escolaridad"
                    placeholder="Escolaridad"
                />
            </Grid>
        </Grid>
    );
}