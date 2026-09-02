import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "../../../atoms/Button/Button";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import { LoadingCircular } from "../../../molecules/LoadingCircular/LoadingCircular";
import { HeaderDegreeBar } from "../../../molecules/HeaderDegreeBar/HeaderDegreeBar";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { CursoCard } from "../../../molecules/CursoCard/CursoCard";
import Grid from "@mui/material/Grid";
import type { ViewMode } from "../../../../types/Cursos.interface";
import { AgregarCursoDrawer } from "./AgregarCursoDrawer";

const mockCourse = {
  id: '#ID-0001',
  title: 'Fundamentos de Administración',
  author: 'Ana Belén Ávila',
  period: 'Ene-Jun 2026',
  isMandatory: true,
  status: 'Publicado',
  modulesCount: 10,
  publishedCount: 4,
  draftCount: 3,
  unpublishedCount: 3
};

const Cursos: React.FC = () => {

    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [isOpenRegistrar, setIsOpenRegistrar] = React.useState(false);
    const [isLoading, _setIsLoading] = React.useState(false);

    // Estado para saber qué curso está expandido (guardamos su ID o índice)
    const [expandedCourseId, setExpandedCourseId] = useState<number | string | null>(null);

    const handleToggleExpand = (id: number | string, isExpanded: boolean) => {
    // Si se expande, guardamos el ID; si se cierra, devolvemos a null
    setExpandedCourseId(isExpanded ? id : null);
    };


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <TitleHeader text="Cursos" subTitle="Organiza, edita y carga el contenido de los cursos del programa." />
                <Button onClick={() => setIsOpenRegistrar(true)} iconPosition="start" icon={<AddOutlinedIcon />}>
                    Agregar curso
                </Button>
            </Box>
            <HeaderDegreeBar defaultView={viewMode} onViewChange={(mode) => setViewMode(mode)} />
            {
                isLoading ? 
                    <LoadingCircular /> 
                : 
                <>
                    {
                        mockCourse && (
                            viewMode === 'grid' ? (
                                <Grid container spacing={2.5}>
                                    {[1, 2, 3].map((item) => {
                                    
                                    const isCurrentlyExpanded = expandedCourseId === item;

                                    return (
                                        <Grid
                                            // Si la tarjeta actual está expandida pasa a ocupar 12 columnas (ancho completo)
                                            size={{
                                                xs: 12,
                                                sm: isCurrentlyExpanded ? 12 : 6,
                                                md: isCurrentlyExpanded ? 12 : 4
                                            }}
                                            key={item}
                                            sx={{ transition: 'all 0.3s ease-in-out' }} // Transición suave al cambiar de tamaño
                                        >
                                            <CursoCard
                                                data={{ ...mockCourse, id: `#ID-000${item}` }}
                                                viewMode="grid"
                                                isExpanded={isCurrentlyExpanded}
                                                onToggleExpand={(expanding) => handleToggleExpand(item, expanding)}
                                            />
                                        </Grid>
                                    );
                                    })}
                                </Grid>
                            ) : (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {[1, 2, 3].map((item) => {
                                        // Hacemos exactamente lo mismo para la vista de lista
                                        const isCurrentlyExpanded = expandedCourseId === item;

                                        return (
                                            <CursoCard 
                                                key={item} 
                                                data={{ ...mockCourse, id: `#ID-000${item}` }} 
                                                viewMode="list" 
                                                isExpanded={isCurrentlyExpanded}
                                                onToggleExpand={(expanding) => handleToggleExpand(item, expanding)}
                                            />
                                        );
                                        })}
                                </Box>
                            )
                        )
                    }
                </>
            }
            <AgregarCursoDrawer open={isOpenRegistrar} onClose={() => setIsOpenRegistrar(false)} />
        </Box>
    );
}

export default Cursos;