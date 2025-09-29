import React from "react";
// import { useTheme } from "@mui/material";
import { InfoAlert } from "../../../molecules/InfoAlert/InfoAlert";

const Grupos: React.FC = () => {

    // const theme = useTheme();

    return (
        <React.Fragment>
            <InfoAlert text="Aquí podrás crear y organizar los grupos necesarios para la gestión de estudiantes." />
        </React.Fragment>
    );
}

export default Grupos;