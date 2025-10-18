import React from "react";
// import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { EmptyState } from "../../../molecules/EmptyState/EmptyState";
import { PageHeader } from "../../../molecules/PageHeader/PageHeader";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { TagsContainer } from "../../../molecules/TagsContainer/TagsContainer";
import { ContextBreadcrumb } from "../../../molecules/ContextBreadcrumb/ContextBreadcrumb";

import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import SchemaOutlinedIcon from '@mui/icons-material/SchemaOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';

import LogoCoppel from '../../../../assets/Img/logo_coppel.png';
import Typography from "@mui/material/Typography";
import { flexRows, Paddings } from "@styles";
import { useTheme } from "@mui/material/styles";
import StackedAvatars from "../../../molecules/StackedAvatars/StackedAvatars";
import { Drawer, IconButton } from "@mui/material";
import { GrupoEdit } from "./GrupoEdit";
import { SegmentedControl } from "../../../molecules/SegmentedControl/SegmentedControl";

const InfoCardArray = [
    {
        estatus: 'NORMAL',
        descripcion: 'Diseño de Interfaces I IDS COPPEL C2 - Sep 25',
        fechaInicio: '1 de Septiembre del 2025',
        fechaFin: '1 de Septiembre del 2025',
        idVigencia: '650',
        planEstudio: 'IDS Coppel',
        materia: 'Diseño de Interfaces',
        administrador: 'Cecilia Fornari'
    },
];

const Grupos: React.FC = () => {
    const theme = useTheme();
    const [isEmptyState, setIsEmptyState] = React.useState<boolean>(true);
    // const [showDetails, setShowDetails] = React.useState<boolean>(true);
    const [counter, _setCounter] = React.useState<number>(0);
    const [isOpenDrawer, setIsOpenDrawer] = React.useState<boolean>(false);

    const [selected, setSelected] = React.useState('Activas');
    
    const handleChange = (value: string) => {
        setSelected(value);
        console.log('Opción seleccionada:', value);
    };

    const handleAction = () => {
        setIsEmptyState(false);
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
    const getContextBreadcrumb = (section: 'Logo' | 'User', _item: any) => {
        let list: any[];
        if(section === 'Logo'){
            list = [
                { text: '', icon: LogoCoppel, type: 'logo' },
                { text: 'Prepa Coppel', icon: ImportContactsOutlinedIcon, type: 'iconText' },
                { text: 'Coppel 2022', icon: SchemaOutlinedIcon, type: 'iconText' },
            ];
        }else {
            list = [
                { text: 'Cecilia Fornari', icon: ManageAccountsOutlinedIcon, type: 'iconText' },
            ];
        }

        return(<ContextBreadcrumb list={list} />)
    }

    const GrupoCard = (item: any) => {
        return(
            <BoxContainer 
                key={item.idVigencia}
                sxProps={{
                    minHeight: '232px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    backgroundColor: theme.palette.primary[50]
                }}
            >
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    { getTagContainer("VIGENCIA-0001", "default") }
                    <IconButton>
                        <MoreHorizOutlinedIcon onClick={() => setIsOpenDrawer(true)} />
                    </IconButton>
                </Box>
                { getContextBreadcrumb('Logo', item) }
                <Box sx={{...flexRows, justifyContent: 'flex-start', gap: '10px'}}>
                    <Typography component="h5" variant="h5">
                        Diseño de Interfaces I IDS COPPEL C2 - Sep 25
                    </Typography>
                    { getTagContainer("NORMAL", "normal") }
                    { getTagContainer("ACTIVA", "activa") }
                </Box>
                { getContextBreadcrumb('User', item) }
                <StackedAvatars 
                    avatars={[
                        'url-imagen-1.jpg',
                        'url-imagen-2.jpg',
                        'url-imagen-3.jpg',
                        'url-imagen-4.jpg',
                        'url-imagen-5.jpg'
                    ]} 
                    total={67}
                    label="estudiantes"
                    max={5}
                />
                <Box display="flex" gap={1} alignItems={'center'}>
                    <CalendarMonthOutlinedIcon sx={{fontSize: '13px'}} />
                    <Typography variant="overline" sx={{color: theme.palette.primary[600], textTransform: 'none'}}>
                        Registrado el 1 de Septiembre del 2025
                    </Typography>
                </Box>
            </BoxContainer>
        )
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <BoxContainer
                backgroundColor="grey"
                sxProps={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: `${InfoCardArray.length > 0 ? 'initial' : 'space-between'}`,
                    minHeight: '532px',
                    gap: '16px',
                }}
            >
                { pageHeader() }

                <SegmentedControl
                    options={['Coppel','Normal', 'Activas', 'Habilitadas']}
                    value={selected}
                    onChange={handleChange}
                />
                {
                    !isEmptyState 
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
                            InfoCardArray.map((item) => GrupoCard(item))
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
        </Box>
    );
}

export default Grupos;