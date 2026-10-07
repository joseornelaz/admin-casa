import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "../../../atoms/Button/Button";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import { LoadingCircular } from "../../../molecules/LoadingCircular/LoadingCircular";
import { HeaderDegreeBar, type SortOption } from "../../../molecules/HeaderDegreeBar/HeaderDegreeBar";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { CursoCard } from "../../../molecules/CursoCard/CursoCard";
import Grid from "@mui/material/Grid";
import type { Curso, ViewMode } from "../../../../types/Cursos.interface";
import { AgregarCursoDrawer } from "./AgregarCursoDrawer";
import { EditarCursoDrawer } from "./EditarCursoDrawer";
import { AgregarModuloDialog } from "./AgregarModuloDialog";
import { DuplicarCursoDialog } from "./DuplicarCursoDialog";
import { GetCursos } from "../../../../services/CursosService";

const STATUS_ID_MAP: Record<string, string[]> = {
  published: ['publicado', 'published'],
  draft: ['borrador', 'draft'],
  review: ['en revisión', 'en revision', 'review'],
  unpublished: ['sin publicar', 'unpublished', 'despublicado'],
};

const Cursos: React.FC = () => {

    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [isOpenRegistrar, setIsOpenRegistrar] = React.useState(false);
    const [isOpenEditar, setIsOpenEditar] = React.useState(false);
    const [isOpenAgregarModulo, setIsOpenAgregarModulo] = React.useState(false);
    const [isOpenDuplicar, setIsOpenDuplicar] = React.useState(false);
    const [duplicatingCourse, setDuplicatingCourse] = React.useState<Curso | null>(null);
    const [editingCourse, setEditingCourse] = React.useState<Curso | null>(null);
    const [selectedModule, setSelectedModule] = React.useState<Curso | null>(null);

    // Filtros, búsqueda y ordenamiento
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState<SortOption>('manual');
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['draft', 'unpublished']);

    // Estado para saber qué curso está expandido (guardamos su ID o índice)
    const [expandedCourseId, setExpandedCourseId] = useState<number | string | null>(null);

    const { data: cursosData, isLoading: isCursosLoading } = GetCursos(); 

    // Filtrado y ordenamiento de cursos
    const filteredAndSortedCursos = useMemo(() => {
        if (!cursosData) return [];

        // 1. Filtrado por búsqueda (título, profesor, descripción o id)
        const query = searchQuery.trim().toLowerCase();
        let result = cursosData.filter((curso) => {
            if (!query) return true;
            const matchTitulo = curso.titulo?.toLowerCase().includes(query) ?? false;
            const matchProfesor = curso.profesor_nombre?.toLowerCase().includes(query) ?? false;
            const matchDesc = curso.descripcion?.toLowerCase().includes(query) ?? false;
            const matchId = String(curso.id_curso).includes(query);
            return matchTitulo || matchProfesor || matchDesc || matchId;
        });

        // 2. Filtrado por estatus
        if (selectedStatuses.length > 0) {
            result = result.filter((curso) => {
                const courseStatus = (curso.estado_curso || 'Publicado').toLowerCase().trim();
                return selectedStatuses.some((statusId) => {
                    const validValues = STATUS_ID_MAP[statusId] || [statusId.toLowerCase()];
                    return validValues.includes(courseStatus);
                });
            });
        }

        // 3. Ordenamiento
        const sorted = [...result];
        switch (sortOption) {
            case 'alpha': // Nombre A-Z
                return sorted.sort((a, b) =>
                    (a.titulo || '').localeCompare(b.titulo || '', undefined, { sensitivity: 'base' })
                );

            case 'recent': // Más reciente
                return sorted.sort((a, b) => {
                    const timeA = a.fecha_creacion ? new Date(a.fecha_creacion).getTime() : 0;
                    const timeB = b.fecha_creacion ? new Date(b.fecha_creacion).getTime() : 0;
                    if (timeA !== timeB) return timeB - timeA;
                    return (b.id_curso || 0) - (a.id_curso || 0);
                });

            case 'status': // Estatus
                const statusOrder: Record<string, number> = {
                    'publicado': 1,
                    'en revisión': 2,
                    'en revision': 2,
                    'borrador': 3,
                    'sin publicar': 4,
                };
                return sorted.sort((a, b) => {
                    const priorityA = statusOrder[(a.estado_curso || 'publicado').toLowerCase()] ?? 99;
                    const priorityB = statusOrder[(b.estado_curso || 'publicado').toLowerCase()] ?? 99;
                    return priorityA - priorityB;
                });

            case 'manual':
            default:
                return sorted;
        }
    }, [cursosData, searchQuery, selectedStatuses, sortOption]);

    const handleToggleExpand = (id: number | string, isExpanded: boolean) => {
        // Si se expande, guardamos el ID; si se cierra, devolvemos a null
        setExpandedCourseId(isExpanded ? id : null);
    };

    const handleOpenEdit = (course: Curso) => {
      setEditingCourse(course);
      setIsOpenEditar(true);
    };

    const handleOpenAgregarModulo = (course: Curso) => {
        console.log('Curso seleccionado para agregar módulo:', course);
      setEditingCourse(course);
      setSelectedModule(course);
      setIsOpenAgregarModulo(true);
    };

    const handleSaveModulo = (data: { nombreModulo: string; ordenModulo: string }) => {
      console.log('Datos del módulo guardado:', data);
      // Aquí puedes agregar la lógica para guardar el módulo en el curso seleccionado
      setIsOpenAgregarModulo(false);
    }

    const handleOpenDuplicate = (course: Curso) => {
      setDuplicatingCourse(course);
      setIsOpenDuplicar(true);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <TitleHeader text="Cursos" subTitle="Organiza, edita y carga el contenido de los cursos del programa." />
                <Button onClick={() => setIsOpenRegistrar(true)} iconPosition="start" icon={<AddOutlinedIcon />}>
                    Agregar curso
                </Button>
            </Box>
            <HeaderDegreeBar 
                defaultView={viewMode} 
                onViewChange={(mode) => setViewMode(mode)} 
                searchQuery={searchQuery}
                onSearchChange={(query) => setSearchQuery(query)}
                selectedSort={sortOption}
                onSortChange={(sort) => setSortOption(sort)}
                selectedStatuses={selectedStatuses}
                onStatusChange={(statuses) => setSelectedStatuses(statuses)}
            />
            {
                isCursosLoading ? 
                    <LoadingCircular /> 
                : 
                <>
                    {
                        cursosData && (
                            filteredAndSortedCursos.length === 0 ? (
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        textAlign: 'center',
                                        borderRadius: '16px',
                                        border: '1px solid #E5E7EB',
                                        backgroundColor: '#FFFFFF',
                                        mt: 1
                                    }}
                                >
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#374151', mb: 0.5 }}>
                                        No se encontraron cursos
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                        Intenta cambiar el término de búsqueda o ajusta los filtros de estatus.
                                    </Typography>
                                </Paper>
                            ) : (
                                viewMode === 'grid' ? (
                                    <Grid container spacing={2.5}>
                                        {filteredAndSortedCursos.map((item) => {
                                        
                                        const isCurrentlyExpanded = expandedCourseId === item.id_curso;
                                        const currentCourse = item;

                                        return (
                                            <Grid
                                                // Si la tarjeta actual está expandida pasa a ocupar 12 columnas (ancho completo)
                                                size={{
                                                    xs: 12,
                                                    sm: isCurrentlyExpanded ? 12 : 6,
                                                    md: isCurrentlyExpanded ? 12 : 4
                                                }}
                                                key={item.id_curso}
                                                sx={{ transition: 'all 0.3s ease-in-out' }} // Transición suave al cambiar de tamaño
                                            >
                                                <CursoCard
                                                    data={currentCourse}
                                                    viewMode="grid"
                                                    isExpanded={isCurrentlyExpanded}
                                                    onToggleExpand={(expanding) => handleToggleExpand(item.id_curso, expanding)}
                                                    onEdit={() => handleOpenEdit(currentCourse)}
                                                    onDuplicate={() => handleOpenDuplicate(currentCourse)}
                                                    onAddModule={() => handleOpenAgregarModulo(currentCourse)}
                                                />
                                            </Grid>
                                        );
                                        })}
                                    </Grid>
                                ) : (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {filteredAndSortedCursos.map((item) => {
                                            // Hacemos exactamente lo mismo para la vista de lista
                                            const isCurrentlyExpanded = expandedCourseId === item.id_curso;
                                            const currentCourse = item;

                                            return (
                                                <CursoCard 
                                                    key={item.id_curso} 
                                                    data={currentCourse} 
                                                    viewMode="list" 
                                                    isExpanded={isCurrentlyExpanded}
                                                    onToggleExpand={(expanding) => handleToggleExpand(item.id_curso, expanding)}
                                                    onEdit={() => handleOpenEdit(currentCourse)}
                                                    onDuplicate={() => handleOpenDuplicate(currentCourse)}
                                                    onAddModule={() => handleOpenAgregarModulo(currentCourse)}
                                                />
                                            );
                                            })}
                                    </Box>
                                )
                            )
                        )
                    }
                </>
            }
            <AgregarCursoDrawer open={isOpenRegistrar} onClose={() => setIsOpenRegistrar(false)} />
            <EditarCursoDrawer open={isOpenEditar} onClose={() => setIsOpenEditar(false)} cursoData={editingCourse} />
            <AgregarModuloDialog open={isOpenAgregarModulo} idCurso={selectedModule?.id_curso} onClose={() => setIsOpenAgregarModulo(false)} onSave={handleSaveModulo}  />
            <DuplicarCursoDialog
              open={isOpenDuplicar}
              onClose={() => setIsOpenDuplicar(false)}
              courseTitle={duplicatingCourse?.titulo || ''}
              modulesCount={0}
            />
        </Box>
    );
}

export default Cursos;