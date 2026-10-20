import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TitleHeader } from "../../molecules/TitleHeader/TitleHeader";
import Button from "../../atoms/Button/Button";
import { UsuariosSearch } from "./UsuariosSearch";
import { UsuariosTable } from "./UsuariosTable";
import { RegistrarUsuariosDialog } from "../../molecules/Dialogs/RegistrarUsuariosDialog/RegistrarUsuariosDialog";
import type { UsuariosFilterParams } from "../../../types/Usuario.interface";

import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

/** Etiquetas de las pestañas, en el mismo orden del <Tabs> */
const TAB_LABELS = ["Gestión de usuarios", "Permisos", "Asignación de materias"];

type TabPanelProps = {
    index: number;
    value: number;
    children?: React.ReactNode;
};

const TabPanel: React.FC<TabPanelProps> = ({ index, value, children }) => (
    <Box
        role="tabpanel"
        hidden={value !== index}
        id={`usuarios-tabpanel-${index}`}
        aria-labelledby={`usuarios-tab-${index}`}
    >
        {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </Box>
);

const Usuarios: React.FC = () => {
    const [isOpenRegistrar, setIsOpenRegistrar] = React.useState(false);
    const [tabValue, setTabValue] = React.useState(0);
    const [filters, setFilters] = React.useState<UsuariosFilterParams>({
        searchText: "",
        rol: "Todos los roles",
        estatus: "Todos los estatus",
        organizacion: "todas",
    });

    return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {/* Title Header and Create Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TitleHeader
          text="Usuarios"
          subTitle="Administra cuentas, roles y accesos del personal que opera CASA."
        />
        <Button onClick={() => setIsOpenRegistrar(true)} iconPosition="start" icon={<PersonAddAltOutlinedIcon />}>
          Nuevo Usuario
        </Button>
      </Box>

      {/* Tabs de sección: Gestión / Permisos / Asignación de materias */}
      <Tabs
        value={tabValue}
        onChange={(_, newValue: number) => setTabValue(newValue)}
        aria-label="Secciones de usuarios"
        sx={{
          minHeight: 44,
          borderBottom: "1px solid #E5E7EB",
          "& .MuiTabs-indicator": {
            backgroundColor: "#111827",
            height: 2,
          },
          "& .MuiTab-root": {
            minHeight: 44,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.85rem",
            color: "#6B7280",
            flexDirection: "row",
            gap: 0.8,
            "&.Mui-selected": {
              color: "#111827",
            },
          },
          "& .MuiSvgIcon-root": {
            fontSize: "1.15rem",
          },
        }}
      >
        <Tab
          icon={<PersonAddAltOutlinedIcon />}
          iconPosition="start"
          label={TAB_LABELS[0]}
          id="usuarios-tab-0"
          aria-controls="usuarios-tabpanel-0"
        />
        <Tab
          icon={<ShieldOutlinedIcon />}
          iconPosition="start"
          label={TAB_LABELS[1]}
          id="usuarios-tab-1"
          aria-controls="usuarios-tabpanel-1"
        />
        <Tab
          icon={<AutoStoriesOutlinedIcon />}
          iconPosition="start"
          label={TAB_LABELS[2]}
          id="usuarios-tab-2"
          aria-controls="usuarios-tabpanel-2"
        />
      </Tabs>

      {/* Contenido: Gestión de usuarios (búsqueda + tabla) */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <UsuariosSearch
            placeholder="Buscar por nombre, correo u organización..."
            onSearch={setFilters}
          />
          <UsuariosTable filters={filters} />
        </Box>
      </TabPanel>

      {/* Contenido: Permisos */}
      <TabPanel value={tabValue} index={1}>
        {/* TODO: Implementar matriz de permisos por rol */}
      </TabPanel>

      {/* Contenido: Asignación de materias */}
      <TabPanel value={tabValue} index={2}>
        {/* TODO: Implementar asignación de docentes/tutores a materias */}
      </TabPanel>

      {/* Diálogo de alta de usuario (flujo de 5 pasos) */}
      <RegistrarUsuariosDialog
        isOpen={isOpenRegistrar}
        onClose={() => setIsOpenRegistrar(false)}
      />
    </Box>
  );  

};

export default Usuarios;
