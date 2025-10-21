import React from "react";
import Box from "@mui/material/Box";
import { TagsContainer } from "../../../molecules/TagsContainer/TagsContainer";
import IconButton from "@mui/material/IconButton";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import VideoCameraFrontOutlinedIcon from '@mui/icons-material/VideoCameraFrontOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { GrupoEstadisticas } from "./GrupoEstadisticas";
import { GrupoTablaEstudiantes } from "./GrupoTablaEstudiantes";
import { GrupoTutorias } from "./GrupoTutorias";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import { Accordion } from "../../../molecules/Accordion/Accordion";
import { GrupoEditForm } from "./GrupoEditForm";

type GrupoEditProps = {
    closeDrawer?: () => void;
}

const AccordionsArray = [
    {
        text: "Detalles del Grupo",
        subTitle: "Detalles generales del grupo.",
        icon: InfoOutlinedIcon,
        content: <GrupoEditForm />
    },
    {
        text: "Estadisticas",
        subTitle: "Resumen de estudiantes activos en este grupo.",
        icon: PeopleAltOutlinedIcon,
        content: <GrupoEstadisticas />
    },
    {
        text: "Estudiantes (64)",
        subTitle: "Resumen de progreso de estudiantes.",
        icon: PeopleAltOutlinedIcon,
        content: <GrupoTablaEstudiantes />
    },
    {
        text: "Tutorias",
        subTitle: "Detalle de tutorías activas para este grupo.",
        icon: VideoCameraFrontOutlinedIcon,
        content: <GrupoTutorias />
    }
];

export const GrupoEdit: React.FC<GrupoEditProps> = ({closeDrawer}) => {
    const [expanded, setExpanded] = React.useState<string>('panel0');

    const handleChange = (panel: string) => {
        setExpanded(panel);
    };

    const handleClose = () => {
        if(closeDrawer) closeDrawer();
    }    

    const customHeader = (item: any) => (
        <TitleHeader 
            text={item.text}
            subTitle={item.subTitle}
            fontSize="h5"
            icon={item.icon}
        />
    )

    return(
        <Box display={'flex'} flexDirection={'column'} gap={1}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <TagsContainer text="GRUPO-0001" status="default" />
                <IconButton onClick={handleClose}>
                    <CloseOutlinedIcon />
                </IconButton>
            </Box>
            <BoxContainer backgroundColor="grey">
                {
                    AccordionsArray.map((item, index) => (
                        <Accordion 
                            key={index} 
                            customHeader={customHeader(item)} 
                            isExpanded={expanded === `panel${index}`} 
                            onChange={() => { handleChange(`panel${index}`) }}
                        >
                            { item.content }
                        </Accordion>
                    ))
                }
            </BoxContainer>
        </Box>
    );
}