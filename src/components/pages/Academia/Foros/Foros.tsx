import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { innerHTMLStyle } from "@styles";
import { Controller, useForm } from "react-hook-form";
import { ForoSchema, type ForoData } from "../../../../schemas/foroSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../atoms/Button/Button";
import { ContainerDesktop } from "../../../organisms/ContainerDesktop/ContainerDesktop";
import { DividerSection } from "../../../molecules/DividerSection/DividerSection";
import React, { useEffect } from "react";
import { RespuestaAlumno } from "./RespuestaAlumno";
import { GetForoGrupo, GetForos, GetGruposAsignados } from "../../../../services/ForosService";
// import { useMutation } from "@tanstack/react-query";
import type { Foros } from "../../../../types/Foros.interface";
import { LoadingCircular } from "../../../molecules/LoadingCircular/LoadingCircular";


const AdminForos: React.FC = () => {
    // const theme = useTheme();
    // const _isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isDisabledListadoForos, setIsDisabledListadoForos] = React.useState<boolean>(true);

    const [temaForo, setTemaForo] = React.useState<string | undefined>(undefined);
    const [titleDivider, setTitleDivider] = React.useState<string>('');
    const [respuestas, setRespuestas] = React.useState<Foros[]>([]);
    const [loadingRespuestas, setLoadingRespuestas] = React.useState<boolean>(false);

    const [gruposAsignadosList, setGruposAsignadosList] = React.useState([{ id_grupo: 0, nombre_grupo: "Seleccionar"}]);    
    const [foroGrupoList, setForoGrupoList] = React.useState([{ id_recurso: 0, titulo: "Seleccionar"}]);
    const limite = [{ id: 0, nombre: 'Todas'}, { id: 1, nombre: 'Pendientes de calificar'}, { id: 2, nombre: 'Calificados'}];

    const { control, formState: { errors }, watch } = useForm<ForoData>({
            resolver: zodResolver(
                ForoSchema(
                    (gruposAsignadosList?.map((m) => m.id_grupo)) ?? [],
                    (foroGrupoList?.map((t) => t.id_recurso)) ?? [],
                    (limite?.map((m) => m.id)) ?? [],
                )
            ),
            defaultValues: {
                grupo_alumnos: 0,
                foros: 0,
                limite: 0,
            },
    });

    const grupoSeleccionado = watch("grupo_alumnos");
    const foroSeleccionado = watch("foros");
    const calificadosSeleccionado = watch("limite");

    const { refetch: refetchGruposAsignados, isLoading } = GetGruposAsignados({ enabled: false });
    const { refetch } = GetForos({ grupo: grupoSeleccionado, foro: foroSeleccionado, calificados: calificadosSeleccionado }, { enabled: false });
    // const [isLoading, setIsLoading] = React.useState(false);
    const [isSearchDisabled, setIsSearchDisabled] = React.useState(true);

    const { data: foroGrupo } = GetForoGrupo(grupoSeleccionado, {
        enabled: grupoSeleccionado !== 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await refetchGruposAsignados();
            const data = gruposAsignadosList.concat(response.data?.data ?? []);
            setGruposAsignadosList(data);
        };

        fetchData();
    }, [refetchGruposAsignados]);
   
    useEffect(() => {
        if (foroGrupo) {
            const item = [{ id_recurso: 0, titulo: "Seleccionar"}];
            setForoGrupoList(item.concat(foroGrupo.data ?? []));
            setIsDisabledListadoForos(false);
            // foroGrupoList.concat(foroGrupo.data ?? [])
        }
    }, [foroGrupo]);

    const handleSearch = async() => {
        setLoadingRespuestas(true);
        const data = await refetch();
        setRespuestas(data.data?.data || []);
        // console.log(data);
        setLoadingRespuestas(false);
    }

    const handleForos = () => {
        setTemaForo(undefined);
        const form = watch();
        if(form.grupo_alumnos === 0) {
            setIsDisabledListadoForos(true);
        }

        if(form.grupo_alumnos > 0 && form.foros > 0) {
            setIsSearchDisabled(false);
        }else{
            setIsSearchDisabled(true);
        }
    }

    return(
        <ContainerDesktop title="Foros">
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="grupo_alumnos"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.grupo_alumnos}>
                                <InputLabel id="grupo-label">Grupos de alumnos asignados</InputLabel>
                                <Select
                                    disabled={isLoading}
                                    labelId="grupo-label"
                                    label="Grupos de alumnos asignados"
                                    {...field}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        field.onChange(value);
                                        setIsDisabledListadoForos(true);
                                        handleForos();
                                    }}
                                >
                                    {
                                    gruposAsignadosList && gruposAsignadosList.map((item) => (
                                            <MenuItem key={item.id_grupo} value={item.id_grupo}>
                                                {item.nombre_grupo}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                        name="foros"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.foros}>
                                <InputLabel id="foros-label">Foros</InputLabel>
                                <Select
                                    disabled={isDisabledListadoForos}
                                    labelId="foros-label"
                                    label="Foros"
                                    {...field}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        field.onChange(value);
                                        handleForos();
                                        if(value > 0) {
                                            const tema = foroGrupo?.data.find((item) => item.id_recurso === value);                                        
                                            setTemaForo(tema?.tema_principal);
                                            setTitleDivider(tema?.titulo || '');
                                        }
                                    }}
                                >
                                    {
                                    foroGrupoList && foroGrupoList.map((item) => (
                                            <MenuItem key={item.id_recurso} value={item.id_recurso}>
                                                {item.titulo}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                        name="limite"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.limite}>
                                <InputLabel id="limite-label">Mostrar</InputLabel>
                                <Select
                                    // disabled={isLoadingMateria}
                                    labelId="limite-label"
                                    label="Mostrar"
                                    {...field}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        field.onChange(value);
                                    }}
                                >
                                    {
                                    limite && limite.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.nombre}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 2 }} sx={{display: 'flex', alignItems: 'center'}}>
                    <Button
                        fullWidth
                        onClick={handleSearch}
                        // isLoading={loading}
                        disabled={isSearchDisabled}
                        sxProps={{height: '48px'}}
                    >
                        Buscar
                    </Button>
                </Grid>
            </Grid>
            <Box>
                {
                    temaForo && <>
                        <DividerSection Title={titleDivider} />
                        <Box 
                            sx={{...innerHTMLStyle, pl: 0}} 
                            dangerouslySetInnerHTML={{__html: temaForo}} 
                        />
                    </>
                }                
                {
                   loadingRespuestas 
                    ? <LoadingCircular Text="Cargando respuestas..." /> 
                    : respuestas && respuestas.map((item, index) => (
                        <RespuestaAlumno key={index} {...item} />
                    ))
                }
            </Box>
        </ContainerDesktop>
    )
}

export default AdminForos;