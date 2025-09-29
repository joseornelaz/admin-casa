import { Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import DsSvgIcon from "../../../atoms/Icon/Icon";

import { InfoAlert } from "../../../molecules/InfoAlert/InfoAlert";

const Grupos: React.FC = () => {

    const theme = useTheme();

    return (
        <React.Fragment>
            <InfoAlert text="Aquí podrás crear y organizar los grupos necesarios para la gestión de estudiantes." />
        </React.Fragment>
    );
}

export default Grupos;