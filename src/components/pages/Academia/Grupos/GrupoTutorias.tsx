import Box from "@mui/material/Box";
import { BoxContainer } from "../../../atoms/BoxContainer/BoxContainer";
import { TagsContainer } from "../../../molecules/TagsContainer/TagsContainer";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import logo_zoom from '../../../../assets/Img/logo_zoom.png';

import { flexRows } from "@styles";
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { ContextBreadcrumb } from "../../../molecules/ContextBreadcrumb/ContextBreadcrumb";
import { ButtonFileUpload } from "../../../molecules/ButtonFileUpload/ButtonFileUpload";
// import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import Button from "../../../atoms/Button/Button";


export const GrupoTutorias: React.FC = () => {
    const theme = useTheme();
    const getTagContainer = (text: string, status: any) => <TagsContainer text={text} status={status} />;
    const getContextBreadcrumb = (_item: any) => {
        const list: any[] = [
            { text: 'Cecilia Fornari', icon: ManageAccountsOutlinedIcon, type: 'iconText' },
            { text: 'Fecha de creación el 26 de Septiembre del 2025', icon: CalendarMonthOutlinedIcon, type: 'iconText' },
        ];

        return(<ContextBreadcrumb list={list} />)
    }

    // const { control, formState: { errors } } = useFormContext();
    // const { fields: grabacionFields, append: appendGrabacion, remove: removeGrabacion } = useFieldArray({
    //     control,
    //     name: 'grabacion',
    // });

    const handleUpload = (_file: File) => {
        // if(onFileUpload) onFileUpload({step, file});
    }

    return(
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
            <BoxContainer 
                backgroundColor="light"                
                sxProps={{
                    minHeight: '236px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                {getTagContainer("VIGENCIA-0001", "default")}
                <Box sx={{...flexRows, justifyContent: 'flex-start', gap: '10px'}}>
                    {getTagContainer("Diseño de interfaces", "transparent")}
                    {getTagContainer("GENERACIÓN 1", "transparent")}
                </Box>
                <Box sx={{...flexRows, justifyContent: 'flex-start', gap: '10px'}}>
                    <Typography component="h5" variant="h5">
                        Diseño de Interfaces I IDS COPPEL C2 - Sep 25
                    </Typography>
                    <TagsContainer text="NORMAL" status="normal" />
                    <TagsContainer text="ACTIVA" status="activa" />
                </Box>
                { getContextBreadcrumb('') }
                <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1}>
                    <CommentOutlinedIcon />
                    <Typography variant="overline" sx={{color: theme.palette.primary[700]}}>
                        Observaciones: Horario de Mazatlán
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1}>
                    <img src={logo_zoom} />
                    <Typography variant="h6" sx={{color: theme.palette.primary[700]}}>
                        https://academiaglobal-mx.zoom.us/j/89074716925
                    </Typography>
                    <ArrowOutwardOutlinedIcon sx={{fontSize: '16px'}} />
                </Box>
            </BoxContainer>
            <BoxContainer 
                backgroundColor="light"                
                sxProps={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <TitleHeader 
                    text="Recursos" 
                    subTitle="Comparte material con los asistentes para la sesión agendada."
                    fontSize="h4"
                />
                <BoxContainer backgroundColor="light">
                    <ButtonFileUpload buttonText="Subir archivo" fileUpload={handleUpload} />
                </BoxContainer>
            </BoxContainer>
            <BoxContainer 
                backgroundColor="light"                
                sxProps={{
                    
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <TitleHeader 
                    text="Grabación" 
                    subTitle="Una vez que haya finalizado la sesión de Tutoría, puedes agregar el link de la grabación en esta sección. El alumno podrá visualizar la grabación después de la tutoría."
                    fontSize="h4"
                />
                {
                    // grabacionFields.map((field, index) => (
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                            <Grid size={{ xs: 12, md: 8 }}>
                                
                                    {/* <Controller
                                        name={`socialMedia.platform`}
                                        render={({ field, fieldState }) => ( */}
                                            <FormControl fullWidth  size="small">
                                            <InputLabel>Red social</InputLabel>
                                                <Select  label="Red social">
                                                    <MenuItem value="Facebook">Facebook</MenuItem>
                                                    <MenuItem value="Instagram">Instagram</MenuItem>
                                                    <MenuItem value="Twitter">Twitter</MenuItem>
                                                    <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                                                    <MenuItem value="TikTok">TikTok</MenuItem>
                                                </Select>
                                            </FormControl>
                                        {/* )}
                                    /> */}
                                
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => {}}
                                    icon={<AddOutlinedIcon />}
                                    iconPosition="start"
                                >Agregar Grabación</Button>
                            </Grid>
                        </Grid>
                    // ))
                }
            </BoxContainer>
            <Box display={'flex'} justifyContent={'flex-end'}>
                    <Button
                        variant="outlined"
                        icon={<AddOutlinedIcon />}
                        iconPosition="start"
                        onClick={() => {}}
                    >Nueva tutoría</Button>
                </Box>
        </Box>
            
        
    )
}