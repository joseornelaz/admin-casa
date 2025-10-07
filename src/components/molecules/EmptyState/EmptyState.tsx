import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Button from "../../atoms/Button/Button";
import imgEmptyState from "../../../assets/Img/EmptyState.png";
import { flexColumn } from "@styles";

type EmptyStateProps = {
    title: string;
    subTitle: string;
    buttonText?: string;
    buttonWidth?: number;
    onButtonClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({title, subTitle, buttonText, buttonWidth = 135, onButtonClick}) => {
    const handleSubmit = () => {
        if(onButtonClick) onButtonClick();
    }

    return(
        <Box sx={{...flexColumn, gap: '30px'}}>
            <img src={imgEmptyState} />
            <Box sx={{...flexColumn, gap: '8px'}}>
                <Typography component="h4" color="primary" variant="h4">
                    {title}
                </Typography>
                <Typography component="span" color="primary" variant="body2">
                    {subTitle}
                </Typography>
                <Box sx={{ width: `${buttonWidth}px` }}>
                    {
                        buttonText && <Button
                            onClick={handleSubmit}
                            fullWidth
                            icon={<AddOutlinedIcon />}
                            iconPosition="start"
                        >{ buttonText }</Button>
                    }
                </Box>
            </Box>
        </Box>
    );
}