import InputLabel from "@mui/material/InputLabel";
import { StateColors } from "@styles";

type InputLabelRequiredProps = {
    text: string;
    isRequired?: boolean;
}

export const InputLabelRequired: React.FC<InputLabelRequiredProps> = ({text, isRequired = true}) => {
    return <InputLabel>{text} <span style={{color: StateColors.disabledForeground, display: !isRequired ? 'none' : undefined}}>*</span></InputLabel>;
}