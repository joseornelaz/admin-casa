import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "../../atoms/Button/Button";
import type { SvgIconProps } from "@mui/material/SvgIcon";

type PageHeaderProps = {
  title: string;
  icon?: React.ComponentType<SvgIconProps>;
  counter?: number;
  buttonText?: string;
  buttonWidth?: number;
  buttonIcon?: any;
  buttonVariant?: 'text' | 'outlined' | 'contained';
  onButtonClick?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, icon: Icon, counter, buttonText, buttonIcon: ButtonIcon, buttonVariant = 'contained', onButtonClick }) => {
    
    const handleSubmit = () => {
        if(onButtonClick) onButtonClick();
    }

    return(
        <Box
            sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
                { Icon && <Icon /> }
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography component="h5" color="primary" variant="h5">{title}</Typography>
                    {(counter! > 0) && <Typography component="h5" color="primary" variant="h5">({counter})</Typography>}
                </Box>
            </Box>
            <Box>
                { onButtonClick && 
                    <Button
                        onClick={handleSubmit}
                        fullWidth
                        icon={ButtonIcon}
                        iconPosition="start"
                        variant={buttonVariant}
                    >{ buttonText }</Button>
                }
            </Box>
        </Box>
    );
}