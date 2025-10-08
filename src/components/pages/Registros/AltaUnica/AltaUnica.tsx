import Box from "@mui/material/Box";
import { BuscarPersonaForm } from "./BuscarPersona";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
// import { ActualizarDatos } from "./ActualizarDatos";

const AltaUnica: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <TitleHeader text="Registro de Alta Única" subTitle="Realiza el alta única ingresando y confirmando la información requerida en cada una de las etapas." />
            <BuscarPersonaForm />
            {/* <ActualizarDatos /> */}
        </Box>
    );
}

export default AltaUnica;