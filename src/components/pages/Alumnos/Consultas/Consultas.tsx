import Box from "@mui/material/Box";
import { Search } from "../../../molecules/Search/Search"
import { AlumnosTable } from "./AlumnosTable";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import Button from "../../../atoms/Button/Button";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { AppRoutingPaths } from "../../../../types/AppRoutingPaths";
import { useNavigate } from "react-router-dom";


const Consultas: React.FC = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <TitleHeader text="Consulta de Alumnos" />
                <Button onClick={() => navigate(AppRoutingPaths.ALTA_UNICA_NUEVA)} iconPosition="start" icon={<PersonAddAltOutlinedIcon />}>
                    Nueva alta
                </Button>
            </Box>
            <Search />
            <AlumnosTable />
        </Box>
    );
}

export default Consultas;