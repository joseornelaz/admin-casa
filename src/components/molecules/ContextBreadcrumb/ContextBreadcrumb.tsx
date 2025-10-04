import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { IconText } from "../IconText/IconText";

// type ContextBreadcrumbProps = {
//     list: [{ Text: string, Icon: React.ElementType | any, Type: 'logo' | 'iconText' }];
//     fontSize?: string;
//     separator?: any;
// }

type ContextBreadcrumbProps = {
    list: Array<{ 
        text: string;
        icon?: React.ElementType | any;
        type: 'logo' | 'iconText' | 'text';
    }>;
    fontSize?: string;
    separator?: string | React.ReactNode;
}

export const ContextBreadcrumb: React.FC<ContextBreadcrumbProps> = ({ list, fontSize='16px', separator='|' }) => {
    const theme = useTheme();
    
    console.log(list);

    return(
        <Stack spacing={2}>
            <Breadcrumbs 
                separator={separator} 
                aria-label="breadcrumb"
                sx={{ fontSize: fontSize, color: theme.palette.primary[400]}}
            >
                {
                    list.map((item, index) => {
                        if(item.type === 'logo'){
                            return <img src={item.icon} key={index} />;
                        }else{
                            return <IconText text={item.text} Icon={item.icon} key={index} />;
                        }
                    })
                }
            </Breadcrumbs>
        </Stack>
    );
}