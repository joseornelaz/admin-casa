import React from "react";
// import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { InfoAlert } from "../../../molecules/InfoAlert/InfoAlert";
import { EmptyState } from "../../../molecules/EmptyState/EmptyState";
import { PageHeader } from "../../../molecules/PageHeader/PageHeader";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";

const Grupos: React.FC = () => {
    const [isEmptyState, setIsEmptyState] = React.useState<boolean>(true);
    // const [showDetails, setShowDetails] = React.useState<boolean>(true);
    const [counter, _setCounter] = React.useState<number>(0);
    
    // const theme = useTheme();

    const handleAction = () => {
        setIsEmptyState(false);
    }

    const pageHeader = () => {

        return(
            <PageHeader 
                title="Grupos" 
                buttonText="Crear grupo" 
                onButtonClick={handleAction} 
                counter={counter} 
            />
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <InfoAlert text="Aquí podrás crear y organizar los grupos necesarios para la gestión de estudiantes." />
            <BoxContainer
                sxProps={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '532px',
                    gap: '16px',
                }}
            >
                { pageHeader() }
                {
                    isEmptyState 
                    ?
                        <EmptyState 
                            title="No existen grupos para esta materia/ruta de estudios." 
                            subTitle="Crea un grupo para comenzar a gestionar estudiantes."
                            buttonText="Crear grupo"
                            onButtonClick={handleAction} 
                        />
                    :
                    <></>
                }
            </BoxContainer>
        </Box>
    );
}

export default Grupos;