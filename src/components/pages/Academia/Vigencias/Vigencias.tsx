import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { EmptyState } from "../../../molecules/EmptyState/EmptyState";
import Button from "../../../atoms/Button/Button";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { RegistroVigenciasDialog } from "../../../molecules/Dialogs/RegistroVigenciasDialog/RegistroVigenciasDialog";
import { flexRows } from "@styles";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import { TagsContainer } from "../../../molecules/TagsContainer/TagsContainer";

import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import SchemaOutlinedIcon from '@mui/icons-material/SchemaOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LogoCoppel from '../../../../assets/Img/logo_coppel.png';
import { ContextBreadcrumb } from "../../../molecules/ContextBreadcrumb/ContextBreadcrumb";
import { useNavigate } from "react-router-dom";
import { AppRoutingPaths } from "@constants";
import { SegmentedControl } from "../../../molecules/SegmentedControl/SegmentedControl";
import { Search } from "../../../molecules/Search/Search";
import type { Vigencia } from "../../../../types/Vigencias.interface";
import { formatFriendlyDate, parseStatus } from "../../../../utils/Helpers";

const InfoCardArray: Vigencia[] = [
    {
        id: 650,
        estatus: 1,
        nombre: 'Diseño de Interfaces I IDS COPPEL C2 - Sep 25',
        fechaInicio: '2025-09-01',
        fechaFin: '2025-09-30',
        idMateria: 101,
        materia: 'Diseño de Interfaces I',
        tipoVigencia: 'NORMAL',
        fechaProrroga: '2025-10-05',
    }
    // {
    //     estatus: 'NORMAL',
    //     descripcion: 'Diseño de Interfaces I IDS COPPEL C2 - Sep 25',
    //     fechaInicio: '1 de Septiembre del 2025',
    //     fechaFin: '1 de Septiembre del 2025',
    //     idVigencia: '650',
    //     planEstudio: 'IDS Coppel',
    //     materia: 'Diseño de Interfaces',
    //     administrador: 'Cecilia Fornari'
    // },
];

const Vigencias: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [isOpenRegistrar, setIsOpenRegistrar] = React.useState(false);

    const [isEmptyState, _setIsEmptyState] = React.useState<boolean>(false);
    // const [showDetails, setShowDetails] = React.useState<boolean>(true);
    const [_counter, _setCounter] = React.useState<number>(0);
    
    const [selected, setSelected] = React.useState('Activas');

    const handleChange = (value: string) => {
        setSelected(value);
        console.log('Opción seleccionada:', value);
    };

    const handleAction = () => {
        // setIsEmptyState(false);
        setIsOpenRegistrar(true);
    }
    
    const handleDetails = (item: any) => {
        navigate(`${AppRoutingPaths.VIGENCIAS_DETALLE.replace(':id',item.idVigencia)}`);
    }

    const getTagContainer = (text: string, status: any) => <TagsContainer text={text} status={status} />;
    const getContextBreadcrumb = (section: 'Logo' | 'User', _item: any) => {
        let list: any[];
        if(section === 'Logo'){
            list = [
                { text: '', icon: LogoCoppel, type: 'logo' },
                { text: 'GRG', icon: ImportContactsOutlinedIcon, type: 'iconText' },
                { text: 'Diplomado en Inteligencia Artificial, Liderazgo y Cultura Digital', icon: SchemaOutlinedIcon, type: 'iconText' },
            ];
        }else {
            list = [
                { text: 'Cecilia Fornari', icon: ManageAccountsOutlinedIcon, type: 'iconText' },
                { text: '3 Grupos asignados', icon: DynamicFeedOutlinedIcon, type: 'iconText' },
                { text: 'Fecha de creación el 26 de Septiembre del 2025', icon: CalendarMonthOutlinedIcon, type: 'iconText' },
            ];
        }

        return(<ContextBreadcrumb list={list} />)
    }

    const VigenciaCard = (item: Vigencia) => {
        return(
            <BoxContainer
                key={item.id}
                sxProps={{
                    minHeight: '236px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    backgroundColor: theme.palette.primary[50],
                }}
            >
                { getTagContainer(`VIGENCIA - ${item.id}`, "default") }
                <Box sx={{...flexRows, justifyContent: 'flex-start', gap: '10px'}}>
                    <Typography component="h5" variant="h5">
                        {item.nombre}
                    </Typography>
                    <TagsContainer text={item.tipoVigencia} status={parseStatus(item.tipoVigencia.toLowerCase())} />
                </Box>
                { getContextBreadcrumb('Logo', item) }
                { getContextBreadcrumb('User', item) }
                <Box display="flex" justifyContent="space-between">
                    <Box display="flex" gap="20px" alignItems="center">
                        <Typography variant="body2" sx={{color: theme.palette.primary[600]}}>
                         {formatFriendlyDate(item.fechaInicio)}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                            <ArrowRightAltOutlinedIcon color="primary" />
                            <Typography variant="body2" sx={{color: theme.palette.primary[600]}}>
                                {formatFriendlyDate(item.fechaFin)}
                            </Typography>
                        </Box>
                    </Box>
                    <Box width="116px">
                        <Button
                            variant="outlined"
                            onClick={() => handleDetails(item)}
                            fullWidth
                        >Ver detalles</Button>
                    </Box>
                </Box>
            </BoxContainer>
        )
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <TitleHeader text="Vigencias" subTitle="Monitorea y gestiona fechas importantes, grupos y alumnos" />
                <Button onClick={() => setIsOpenRegistrar(true)} iconPosition="start" icon={<AddOutlinedIcon />}>
                    Crear vigencia
                </Button>
            </Box>
            <Search />
            <BoxContainer
                backgroundColor="grey"
                sxProps={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: `${isEmptyState ? 'center' :  InfoCardArray.length > 0 ? 'initial' : 'space-between'}`,
                    minHeight: '532px',
                    gap: '16px',
                }}
            >
                {/* { pageHeader() } */}
                {
                    isEmptyState 
                    ?
                        <EmptyState 
                            title="No existen vigencias." 
                            subTitle="Crea una vigencia para poder gestionar grupos y estudiantes."
                            buttonText="Crear vigencia"
                            buttonWidth={150}
                            onButtonClick={handleAction} 
                        />
                    :
                    <>
                        <SegmentedControl
                            options={['Normal', 'Activas', 'Habilitadas']}
                            value={selected}
                            onChange={handleChange}
                        />
                        {
                            InfoCardArray.map((item) => VigenciaCard(item))
                        }
                    </>
                }
                    
            </BoxContainer>
            <RegistroVigenciasDialog isOpen={isOpenRegistrar} close={() => setIsOpenRegistrar(false)} />
        </Box>
    );
}

export default Vigencias;