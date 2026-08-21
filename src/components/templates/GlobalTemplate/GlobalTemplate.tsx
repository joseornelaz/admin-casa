import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import GlobalHeader from "../../organisms/GlobalHeader/GlobalHeader";
import GlobalSidenav from "../../organisms/GlobalSidenav/GlobalSidenav";

export const GlobalTemplate: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#111315",
        overflow: "hidden",
      }}
    >
      {/* Header Superior Fijo */}
      <GlobalHeader />

      {/* Cuerpo Principal: Sidenav + Áreas de Contenido */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          height: "calc(100vh - 56px)",
          overflow: "hidden",
        }}
      >
        {/* Sidenav Izquierdo (Expandible / Colapsable) */}
        <GlobalSidenav collapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} />

        {/* Canvas de Contenido Principal (Aprovecha automáticamente el 100% del espacio sobrante) */}
        <Box
          component="main"
          sx={{
            flex: 1,
            backgroundColor: "#F9FAFB",
            overflowY: "auto",
            p: { xs: 2, sm: 3, md: 4 },
            paddingBottom: '0px !important', // Evita que el padding inferior afecte al scroll
            boxSizing: "border-box",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default GlobalTemplate;
