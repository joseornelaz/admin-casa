import { useTheme } from "@mui/material"
import { Accordion } from "../../../molecules/Accordion/Accordion"
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer"
import { AltaUnicaHeader } from "./AltaUnicaHeader"
import { DatosPersonalesForm } from "./DatosPersonalesForm"
import { DatosLaboralesForm } from "./DatosLaboralesForm"
import { DatosContactoForm } from "./DatosContacto"
import { NotasObservacionesForm } from "./NotasObservacionesForm"

export const ActualizarDatos: React.FC = () => {
    const theme = useTheme();
    
    return(
        <BoxContainer
            sxProps={{ backgroundColor: theme.palette.primary[100]}}
        >
            <AltaUnicaHeader 
                text='Paso 2: Llena o actualiza datos (Registro A1)' 
                subText='Captura o corrige la información que se solicita.' 
                estatus='ADMISIÓN'
                valueProgress={66}
                currentStep={2}
            />
            <Accordion title="Datos Personales">
                <DatosPersonalesForm />
            </Accordion>
            <Accordion title="Datos Laborales">
                <DatosLaboralesForm />
            </Accordion>
            <Accordion title="Datos de Contacto">
                <DatosContactoForm />
            </Accordion>
            <Accordion title="Notas y Observaciones">
                <NotasObservacionesForm />
            </Accordion>
        </BoxContainer>
    )
}