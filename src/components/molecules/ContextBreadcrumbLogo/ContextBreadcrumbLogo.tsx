import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { IconText } from "../IconText/IconText";

import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import SchemaOutlinedIcon from '@mui/icons-material/SchemaOutlined';
import LogoGRG from '../../../assets/grg-logos/grg-icon-red.png';

export const ContextBreadcrumbLogo: React.FC = () => {
    const theme = useTheme();
    const separator='|';

    const list: Array<{ 
        text: string;
        icon?: React.ElementType | any;
        type: 'logo' | 'iconText' | 'text';
    }> = [
        { text: '', icon: LogoGRG, type: 'logo' },
        { text: 'GRG', icon: ImportContactsOutlinedIcon, type: 'iconText' },
        { text: 'Diplomado en Inteligencia Artificial, Liderazgo y Cultura Digital', icon: SchemaOutlinedIcon, type: 'iconText' },
    ];

    return(
        <Stack spacing={2}>
            <Breadcrumbs 
                separator={separator} 
                aria-label="breadcrumb"
                sx={{ fontSize: 16, color: theme.palette.primary[400]}}
            >
                {
                    list.map((item, index) => {
                        if(item.type === 'logo'){
                            return <img src={item.icon} key={index} width={16} />;
                        }else{
                            return <IconText text={item.text} Icon={item.icon} key={index} />;
                        }
                    })
                }
            </Breadcrumbs>
        </Stack>
    );
}