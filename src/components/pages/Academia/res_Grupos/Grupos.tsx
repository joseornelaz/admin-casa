import Box from "@mui/material/Box";
import { Search } from "../../../molecules/Search/Search"
import { GruposTable } from "./GruposTable";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import Button from "../../../atoms/Button/Button";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { RegistroGruposDialog } from "../../../molecules/Dialogs/RegistroGruposDialog/RegistroGruposDialog";
import React from "react";

const Grupos: React.FC = () => {
    const [isOpenRegistrar, setIsOpenRegistrar] = React.useState(false);
    const [idGrupo, setIdGrupo] = React.useState<number | undefined>(undefined);
    
    const handleSelectedRow = (grupo: any) => {
        // Aquí puedes abrir un modal o redirigir a otra página para ver los detalles del grupo
        setIdGrupo(grupo.id);
        setIsOpenRegistrar(true); // Abrir el diálogo para editar el grupo
    }

    const handleCloseDialog = () => {
        setIsOpenRegistrar(false);
        setIdGrupo(undefined);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <TitleHeader text="Grupos" subTitle="Crea un grupo para comenzar a gestionar estudiantes." />
                <Button onClick={() => setIsOpenRegistrar(true)} iconPosition="start" icon={<AddOutlinedIcon />}>
                    Nuevo Grupo
                </Button>
            </Box>
            <Search />
            <GruposTable selectedRow={handleSelectedRow} />
            <RegistroGruposDialog isOpen={isOpenRegistrar} close={handleCloseDialog} idGrupo={idGrupo} />
        </Box>
    );
}

export default Grupos;