import Box from "@mui/material/Box";
import { Search } from "../../../molecules/Search/Search"
import { AlumnosTable } from "./AlumnosTable";
import { TitleHeader } from "../../../molecules/TitleHeader/TitleHeader";
import Button from "../../../atoms/Button/Button";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';


const Consultas: React.FC = () => {
    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <TitleHeader text="Consulta de Alumnos" />
                <Button onClick={() => {}} iconPosition="start" icon={<PersonAddAltOutlinedIcon />}>
                    Nueva alta
                </Button>
            </Box>
            <Search />
            <AlumnosTable />
        </Box>
    );
}

export default Consultas;