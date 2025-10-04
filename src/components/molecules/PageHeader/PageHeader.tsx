import Box from "@mui/material/Box";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { PlusWhite } from "@iconsCustomizeds";
import Typography from "@mui/material/Typography";
import Button from "../../atoms/Button/Button";

type PageHeaderProps = {
  title: string;
  icon?: any;
  counter?: number;
  buttonText?: string;
  buttonWidth?: number;
  onButtonClick?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, icon, counter, buttonText, onButtonClick }) => {
    
    const handleSubmit = () => {
        if(onButtonClick) onButtonClick();
    }

    return(
        <Box
            sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
                { icon && <DsSvgIcon component={icon} /> }
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography component="h3" color="primary" variant="h3">{title}</Typography>
                    {(counter! > 0) && <Typography component="h3" color="primary" variant="h3">({counter})</Typography>}
                </Box>
            </Box>
            <Box>
                { onButtonClick && 
                    <Button
                        onClick={handleSubmit}
                        fullWidth
                        icon={<DsSvgIcon component={PlusWhite} />}
                        iconPosition="start"
                    >{ buttonText }</Button>
                }
            </Box>
        </Box>
    );
}