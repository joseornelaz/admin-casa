import React from "react";
import { accordionStyle, flexRows } from "@styles";
import { Accordion } from "../../../molecules/Accordion/Accordion";
import Box from "@mui/material/Box";
import { Typography } from "../../../atoms/Typography/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// import Divider from "@mui/material/Divider";
import Button from "../../../atoms/Button/Button";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { RatingStars } from "../../../molecules/Rating/RatingStars";
// import { AdjuntosForos } from "./AdjuntosForos";
import type { Foros } from "../../../../types/Foros.interface";
import { Avatar } from "../../../atoms/Avatar/Avatar";
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
// import DsSvgIcon from "../../../atoms/Icon/Icon";
// import { StarCalificaciones } from "@iconsCustomizeds";
import Grid from "@mui/material/Grid";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import { useMutation } from "@tanstack/react-query";

export const RespuestaAlumno: React.FC<Foros> = (item) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { control, setValue, watch } = useForm();
    
    const [valueRating, setValueRating] = React.useState<number | null>(0);
    const [hover, setHover] = React.useState<number | null>(-1);
    const [readonlyRaiting, setReadonlyRating] = React.useState(false);

    React.useEffect(() => {
        setValueRating(Number(item.calificacion));
        setReadonlyRating(Number(item.calificacion) > 0 || item.calificacion !== null);
    },[item]);

    // customHeader={<AccordionStatus tittle={item.titulo_curso} status={item.estatus} sxProps={{ flexDirection: isMobile ? 'column' : 'row' }} />}

    // const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    //     <Box sx={{ display: 'flex' }}>
    //         <Typography component="span" variant="body2" sxProps={{ fontWeight: 'bold' }}>
    //             {label}
    //         </Typography>
    //         <Typography component="span" variant="body2" sxProps={{ color: theme.palette.grey[100], ml: 1 }}>
    //             {value}
    //         </Typography>
    //     </Box>
    // );

    // const BoxInfoRow = (children: React.ReactNode) => (
    //     <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>{children}</Box>
    // );

    const AccordionHeader = () => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box sx={[{display: 'flex', alignItems:'center', gap: '10px', justifyContent: 'center'}]}>
              <Avatar width={48} height={48} />
              <Box>
                <Typography variant="body1" component="div">
                    {item.alumno}
                </Typography>
                <Typography variant="body1" component="div" color='disabled'>
                    {item.fecha_envio}
                </Typography>
              </Box>
            </Box>
            <Box
                sx={{backgroundColor: '#AAB1B6', height: '28px', display: 'flex', alignItems: 'center', p: 1, gap: '3px', borderRadius: '4px'}}
            >
                <StarOutlineOutlinedIcon sx={{ color: '#FFFFFF' }} />
                <Typography component="span" variant="body1" sxProps={{ color: '#FFFFFF'}}>Pendiente de calificar</Typography>
            </Box>
        </Box>
    )

    const handleCalificacion = (_event: React.ChangeEvent<{}>, newValue: number | null) => {
        setValueRating(newValue);
    };

    const hoverCalificacion = (_event: React.ChangeEvent<{}>, newValue: number | null) => {
        setHover(newValue);
    };

    const handleCalificar = () => {
        // calificarMutation.mutate({ })
        console.log(watch());
    }

    const handleCancelar = () => {
        setValue('comentario', '');
        setValueRating(0);
        setHover(-1);
    };

    // const calificarMutation = useMutation({
    //     mutationFn: registrarRetroalimentacion,
    //     onSuccess: () => {
    //         // showNotification(`Solicitud de Ayuda enviada satisfactorimente`,"success");
    //         // reset();
    //         // setLoading(false);
    //     },
    //     onError: (error) => {
    //         // showNotification(`Error al registrar: ${error.message}`, "error");
    //         // setLoading(false);
    //     },
    //     onSettled: () => {
    //         console.log('La mutación ha finalizado');
    //     }
    // });

    return(
        <Accordion
            sxProps={accordionStyle}
            title={item.alumno}
            customHeader={AccordionHeader()}
            backgroundDetails={{ backgroundColor: "#FFFFFF !important", }}
        >
            <Box sx={
                [
                    { display: 'flex', flexDirection: 'column', flexWrap: 'wrap', width: '100%', height: 'auto', gap: '1rem', alignItems: 'center', borderRadius: '8px'},
                    isMobile && { p: 1},
                    !isMobile && { justifyContent: 'space-between', p: 1 }
                ]
            }>
                {/* <Box sx={{display: 'flex', flexWrap: 'wrap', width: '100%', height: 'auto', gap: '1rem', alignItems: 'center', justifyContent: 'space-between'}}>
                    {
                        BoxInfoRow(
                            <>
                                <InfoRow label="Alumno:" value={item.alumno} />
                                <InfoRow label="Calificación:" value={item.calificacion} />
                            </>
                        )
                    }
                    {
                        BoxInfoRow(
                            <>
                                <InfoRow label="Fecha de registro:" value={item.fecha_registro} />
                                <InfoRow label="Fecha de calificación:" value={item.fecha_calificacion} />
                            </>
                        )
                    }
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                    <Typography component="span" variant="body2" sxProps={{ fontWeight: 'bold' }}>
                        Respuesta del alumno:
                    </Typography>
                    <Typography component="span" variant="body2" sxProps={{ color: theme.palette.grey[100] }}>
                        {item.respuesta}
                    </Typography>
                </Box> */}
                {/* <AdjuntosForos archivos={item.archivos_adjuntos} /> */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                    <Box dangerouslySetInnerHTML={{__html: item.mensaje }} />
                </Box>
            </Box>
                    
                {/* <Divider sx={{ color: theme.palette.primary.main }} /> */}
                <Box component='div' sx={{ borderBottom: `1px solid ${theme.palette.primary.main}`, marginBottom: '10px' }} />

                <Box sx={
                    [
                        { display: 'flex', flexWrap: 'wrap', width: '100%', height: 'auto', gap: '1rem', alignItems: 'center', border: `1px solid #F1F4F6`, borderRadius: '8px', backgroundColor: theme.palette.background.paper },
                        isMobile && { p: 1},
                        !isMobile && { justifyContent: 'space-between', p: 3 }
                    ]
                }>
                    <Grid container spacing={2} sx={{ width: '100%'}}>
                        <Grid size={{ md: 6, xs: 12 }} >
                            <Box>
                                <Typography component="span" variant="body1" color="primary" sxProps={{ fontWeight: 'bold' }}>
                                    Retroalimentación del tutor:
                                </Typography>
                                <Controller
                                    name={`comentario`}
                                    control={control}
                                    defaultValue={item.retroalimentacion ?? ''}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            multiline
                                            rows={3}
                                            fullWidth
                                            slotProps={{
                                                input: {
                                                    inputProps: {
                                                        maxLength: 200
                                                    },
                                                },
                                            }}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                field.onChange(event);
                                            }}
                                        />
                                    )}
                                />
                            </Box>
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            {/* <Box >
                                <Controller 
                                    name={'calificacion'}
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-select-small-label">Calificación</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                // value={age}
                                                label="Calificación"
                                                // onChange={handleChange}
                                                onChange={(event) => {
                                                    field.onChange(event);
                                                }}
                                            >
                                                {
                                                    Array.from({ length: 19 }, (_, i) => 1 + i * 0.5).map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                                                }
                                                
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Box> */}
                            <Box sx={{...flexRows, justifyContent: 'flex-start',  width: '100%', gap: '10px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Typography component="span" variant="body2" color="primary" sxProps={{ fontWeight: 'bold' }}>
                                        Calificación:
                                    </Typography>
                                    <RatingStars 
                                        max={10} precision={0.5} value={valueRating} onChange={handleCalificacion} onChangeActive={hoverCalificacion} readonly={readonlyRaiting} />
                                </Box>
                                <Typography component="span" variant="body2" color="primary" sxProps={{ fontWeight: 'bold' }}>
                                    {valueRating !== null && hover !== -1 ? hover : valueRating}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                {
                    (Number(item.calificacion) === 0 || item.calificacion === null) && 
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px', gap: '10px' }}>
                            <>
                                <Button
                                    fullWidth
                                    onClick={handleCalificar}
                                    sxProps={{
                                        py: 1.5,
                                    }}
                                    // isLoading={isLoading}
                                >
                                    CALIFICAR
                                </Button>
                            </>
                            <>
                                <Button
                                    fullWidth
                                    onClick={handleCancelar}
                                    sxProps={{
                                        py: 1.5,
                                    }}
                                    variant="outlined"
                                    // isLoading={isLoading}
                                >
                                    CANCELAR
                                </Button>
                            </>
                        </Box>
                }
        </Accordion>
    );
};