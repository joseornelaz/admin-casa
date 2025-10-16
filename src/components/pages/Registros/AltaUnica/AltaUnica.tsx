import Box from "@mui/material/Box";
import { BuscarPersonaForm } from "./BuscarPersona";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import { ActualizarDatos } from "./ActualizarDatos";
import React from "react";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { AltaUnicaHeader } from "./AltaUnicaHeader";
import { useTheme } from "@mui/material";
import { ValidacionDocumentos } from "./ValidacionDocumentos";

const altaUnicaHeaderArray = [
    { step: 1, text: 'Paso 1: Buscar persona', status: 'ADMISIÓN', subText: 'Ingresa alguno de los datos disponibles para localizar a la persona en el sistema.', valueProgress: 33, currentStep: 1 },
    { step: 2, text: 'Paso 2: Llena o actualiza datos (Registro A1)', status: 'ADMISIÓN', subText: 'Captura o corrige la información que se solicita.', valueProgress: 66, currentStep: 2 },
    { step: 3, text: 'Paso 3: Validación de documentos (Inscripción A2)', status: 'GESTIÓN ESCOLAR', subText: 'Verifica que la información esté respaldada con la documentación correspondiente.', valueProgress: 90, currentStep: 3 },
];

const AltaUnica: React.FC = () => {
    const theme = useTheme();
    const [currentStep, setCurrentStep] = React.useState(0);
    
    const handleBack = () => {
        setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
    }

    const handleNext = () => {
        setCurrentStep((prev) => (prev < altaUnicaHeaderArray.length - 1 ? prev + 1 : prev));
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <TitleHeader text="Registro de Alta Única" subTitle="Realiza el alta única ingresando y confirmando la información requerida en cada una de las etapas." />
            <BoxContainer
                sxProps={{ backgroundColor: theme.palette.primary[100]}}
            >
                <AltaUnicaHeader 
                    text={altaUnicaHeaderArray[currentStep].text}
                    subText={altaUnicaHeaderArray[currentStep].subText} 
                    estatus={altaUnicaHeaderArray[currentStep].status} 
                    valueProgress={altaUnicaHeaderArray[currentStep].valueProgress} 
                    currentStep={altaUnicaHeaderArray[currentStep].step}
                />
                {
                    <ValidacionDocumentos />
                    // <ActualizarDatos onBack={handleBack} onNext={handleNext} />
                }
                {/* {
                    currentStep === 0 ?
                        <BuscarPersonaForm onRegisterProspect={handleNext}/>
                    :
                        <ActualizarDatos onBack={handleBack} onNext={handleNext} />
                } */}
            </BoxContainer>
        </Box>
    );
}

export default AltaUnica;