import React from "react";
// import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { EmptyState } from "../../../molecules/EmptyState/EmptyState";
import { PageHeader } from "../../../molecules/PageHeader/PageHeader";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { TagsContainer } from "../../../molecules/TagsContainer/TagsContainer";
import { ContextBreadcrumb } from "../../../molecules/ContextBreadcrumb/ContextBreadcrumb";

import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';

import LogoGRG from '../../../../assets/grg-logos/grg-icon-red.png';
import Typography from "@mui/material/Typography";
import { flexRows, Paddings } from "@styles";
import { useTheme } from "@mui/material/styles";
import StackedAvatars from "../../../molecules/StackedAvatars/StackedAvatars";
import { Button, Drawer } from "@mui/material";
import { GrupoEdit } from "./GrupoEdit";
import { SegmentedControl } from "../../../molecules/SegmentedControl/SegmentedControl";
import { RegistroGruposDialog } from "../../../molecules/Dialogs/RegistroGruposDialog/RegistroGruposDialog";
import { GetGrupos } from "../../../../services/GruposService";
import { LoadingCircular } from "../../../molecules/LoadingCircular/LoadingCircular";
import { tipoGrupoOptions, type Grupo } from "../../../../types/Grupos.interface";
import { formatFriendlyDate } from "../../../../utils/Helpers";

const Grupos: React.FC = () => {
    const theme = useTheme();

    const [isEmptyState, setIsEmptyState] = React.useState<boolean>(true);
    // const [showDetails, setShowDetails] = React.useState<boolean>(true);
    const [counter, _setCounter] = React.useState<number>(0);
    const [isOpenDrawer, setIsOpenDrawer] = React.useState<boolean>(false);
    const [openRegistrarGrupo, setOpenRegistrarGrupo] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState('Activas');
    
    const { data: gruposData, isLoading: isGruposLoading } = GetGrupos();

    const tipoGrupo = tipoGrupoOptions;

    const handleChange = (value: string) => {
        setSelected(value);
        console.log('Opción seleccionada:', value);
    };

    const handleAction = () => {
        //setIsEmptyState(false);
        setOpenRegistrarGrupo(true);
    }

    const pageHeader = () => {

        return(
            <PageHeader 
                icon={DynamicFeedOutlinedIcon}
                title="Grupos" 
                buttonText="Crear grupo" 
                onButtonClick={handleAction} 
                counter={counter}
                buttonIcon={<AddOutlinedIcon />}
            />
        );
    }

    const getTagContainer = (text: string, status: any) => <TagsContainer text={text} status={status} />;
    const getContextBreadcrumb = (item: Grupo) => {
        
        const list: any[] = [
                { text: '', icon: LogoGRG, type: 'logo' },
                { text: 'GRG', icon: ImportContactsOutlinedIcon, type: 'iconText' },
                { text: item.nombreTutor, icon: ManageAccountsOutlinedIcon, type: 'iconText' },
                { text: `Registrado el ${formatFriendlyDate(item.fechaRegistro)}`, icon: CalendarMonthOutlinedIcon, type: 'iconText' },
            ];

        return(<ContextBreadcrumb list={list} />)
    }

    const handleOpenDrawer = () => {
        setIsOpenDrawer(true);
    }

    const handleCloseDialog = (isSaved: boolean) => {
        setOpenRegistrarGrupo(false);
        if(isSaved){
            // Aquí puedes realizar acciones adicionales si se guardó el grupo
            setIsEmptyState(false);
        }
    }

    const parseTipoGrupo = (tipoGrupoId: number) => {
        const tipo = tipoGrupo.find((tipo) => tipo.id === tipoGrupoId);
        return tipo ? tipo.label : 'n/a';
    };

    const parseEstatusGrupo = (estatus: number) => {        
        if(estatus === 0){
            return getTagContainer("INACTIVO", "inactivo");
        }else{
            return getTagContainer("ACTIVO", "activa");
        }
    }

    const GrupoCard = (item: Grupo) => {
        return(
            <>
                <BoxContainer 
                    key={item.id}
                    sxProps={{
                        minHeight: '180px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        backgroundColor: theme.palette.primary[50]
                    }}
                >
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        { getTagContainer(`GRUPO - ${item.id}`, "default") }
                        <Box sx={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                            { getTagContainer(parseTipoGrupo(item.tipoGrupo), "default") }
                            { parseEstatusGrupo(item.estatus) }
                        </Box>
                    </Box>
                    <Box sx={{...flexRows, justifyContent: 'flex-start', gap: '10px'}}>
                        <Typography component="h5" variant="h5">
                            {item.nombre}
                        </Typography>
                    </Box>
                    
                    { getContextBreadcrumb(item) }
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <StackedAvatars 
                            avatars={[
                                'url-imagen-1.jpg',
                                'url-imagen-2.jpg',
                                'url-imagen-3.jpg',
                                'url-imagen-4.jpg',
                                'url-imagen-5.jpg'
                            ]} 
                            total={item.totalAlumnos}
                            label="estudiantes"
                            max={5}
                        />
                        <Button 
                            variant="outlined"
                            onClick={() => handleOpenDrawer()}
                        >
                            Ver detalles
                        </Button>
                    </Box>
                </BoxContainer>
            </>
        )
    }

    if(isGruposLoading){
        return(
            <LoadingCircular />
        );
    }else if(gruposData && gruposData.length > 0 && isEmptyState){
        setIsEmptyState(false);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <BoxContainer
                sxProps={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: `${isEmptyState ? 'center' : gruposData.length > 0 ? 'initial' : 'space-between'}`,
                    minHeight: '532px',
                    gap: '16px',
                }}
            >
                { 
                    !isEmptyState 
                    ? 
                    <>
                        { pageHeader() }
                        <SegmentedControl
                            options={['Normal', 'Activas', 'Habilitadas']}
                            value={selected}
                            onChange={handleChange}
                        />
                    </>
                    : null
                }
                
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
                    <>
                        {
                            gruposData.map((item: Grupo) => GrupoCard(item))
                        }
                    </>
                }
            </BoxContainer>
            <Drawer
                anchor="right"
                open={isOpenDrawer}
                sx={{
                    gap: '16px',
                    '& .MuiDrawer-paper': {
                        width: '930px',
                        p: Paddings.xl,
                    }
                }}
                // onClose={toggleDrawer(anchor, false)}
            >
                <GrupoEdit closeDrawer={() => setIsOpenDrawer(false)} />
            </Drawer>
            <RegistroGruposDialog isOpen={openRegistrarGrupo} close={handleCloseDialog} />
        </Box>
    );
}

export default Grupos;