import Box from "@mui/material/Box";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import Button from "../../../atoms/Button/Button";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Search } from "../../../molecules/Search/Search";
import { PeriodoCard } from "./PeriodoCard";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { RegistroPeriodoInscripcionDialog } from "../../../molecules/Dialogs/RegistroPeriodoInscripcionDialog/RegistroPeriodoInscripcionDialog";
import React from "react";
import { GetPeriodosInscripcion } from "../../../../services/PeriodoInscripcionService";
import type { PeriodoInscripcion as PeriodoInscripcionInterface } from "../../../../types/PeriodoInscripcion.interface";
import { LoadingCircular } from "../../../molecules/LoadingCircular/LoadingCircular";
import { PeriodoDetalles } from "./PeriodoDetalles";

const PeriodoInscripcion: React.FC = () => {
    const [isOpenRegistrar, setIsOpenRegistrar] = React.useState(false);
    const [showDetails, setShowDetails] = React.useState<boolean>(false);

    const { data: PeriodoInscripcionData, isLoading } = GetPeriodosInscripcion();

    const handleDetail = (_item: PeriodoInscripcionInterface) => {
        setShowDetails(true);
    }

    const handleBack = () => {
        setShowDetails(false);
    }

    if (isLoading) {
        return <LoadingCircular />;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px'}}>
            {
                showDetails 
                ? <PeriodoDetalles idPeriodo={1} goBack={handleBack} /> 
                : 
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <TitleHeader text="Periodos de inscripción" subTitle="Monitorea y gestiona los periodos de inscripción de cada materia" />
                        <Button onClick={() => setIsOpenRegistrar(true)} iconPosition="start" icon={<AddOutlinedIcon />}>
                            Crear periodo
                        </Button>
                    </Box>
                    <Search />
                    {
                        isLoading ? 
                            <LoadingCircular /> 
                        : 
                            <BoxContainer>
                                <Box
                                    sx={{ display: 'flex', flexDirection: 'column', rowGap: 2}}
                                >
                                {
                                    PeriodoInscripcionData && PeriodoInscripcionData.map((item: PeriodoInscripcionInterface) => <PeriodoCard key={`periodoCard_${item.id}`} item={item} handleDetail={handleDetail} />)
                                }
                                </Box>
                            </BoxContainer>
                    }
                </>
            }
            <RegistroPeriodoInscripcionDialog isOpen={isOpenRegistrar} close={() => setIsOpenRegistrar(false)} />
        </Box>
    );
}

export default PeriodoInscripcion;