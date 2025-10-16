import React from "react";
import { Box } from "@mui/material";
import { Accordion } from "../../../molecules/Accordion/Accordion";
import { DatosPersonalesForm } from "./DatosPersonalesForm";
import { DatosLaboralesForm } from "./DatosLaboralesForm";
import { DatosContactoForm } from "./DatosContacto";
import { NotasObservacionesForm } from "./NotasObservacionesForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AltaUnicaFormSchema, type AltaUnicaFormData } from "../../../../schemas/altaUnicaSchema";
import { flexRows } from "@styles";
import Button from "../../../atoms/Button/Button";
import TuneIcon from '@mui/icons-material/Tune';
import { ValidacionDocumentos } from "./ValidacionDocumentos";
import { Confirmacion } from "./Confirmacion";

type ActualizarDatosProps = {
    onBack: () => void;
    onNext: () => void;
}

export const ActualizarDatos: React.FC<ActualizarDatosProps> = ({onBack, onNext}) => {
    // const theme = useTheme();
    const [currentStep, setCurrentStep] = React.useState<number>(1);
    
    const methods = useForm<AltaUnicaFormData>({
        resolver: zodResolver(AltaUnicaFormSchema()),
        defaultValues: {
            numeroEmpleado: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            nombre: '',
            fechaNacimiento: '',
            curp: '',
            edad: '',
            sexo: '',
            estadoCivil: '',
            escolaridad: '',
            socialMedia: [{ link: '', platform: '' }],
            phones: [{ number: '', type: 'Móvil' }],
        },
    });

    const handleBack = () => {
        setCurrentStep((prev) => prev - 1);
        if(onBack) onBack();
    }

    const handleNext = () => {
        setCurrentStep((prev) => prev + 1);
        console.log(currentStep);
        if(onNext) onNext();
        // setCurrentStep((prev) => (prev < altaUnicaHeaderArray.length - 1 ? prev + 1 : prev));

        // methods.trigger().then((isValid) => {
        //     if (isValid) {
        //         // proceed to next step
        //         console.log("Form is valid, proceed to next step");
        //     } else {
        //         console.log("Form is invalid, please correct the errors");
        //     }
        // });
    }

    const backNextButtons = () => (
        <Box sx={{...flexRows, alignItems: 'flex-start', justifyContent: 'space-between', mt: 3, mb: 1, gap: 2}}>
            <Button variant="outlined" onClick={handleBack}>Anterior</Button>
            <Box>
                <Button variant="outlined" onClick={() => {}} icon={<TuneIcon />} iconPosition="start">Guardar borrador</Button>
                <Button sxProps={{ ml: 2 }} onClick={handleNext} >Siguiente</Button>
            </Box>
        </Box>
    )

    return(
        <FormProvider {...methods}>
            {
                currentStep === 1
                ?
                    <>
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
                        {backNextButtons()}
                    </>
                :
                    currentStep === 2 
                    ?
                        <>
                            <ValidacionDocumentos />
                            {backNextButtons()}
                        </>
                    :
                        <Confirmacion />
            }
        </FormProvider>
    )
}