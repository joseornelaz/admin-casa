import React from "react";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TagsContainer } from "../TagsContainer/TagsContainer";
import { ButtonFileUpload } from "../ButtonFileUpload/ButtonFileUpload";

type CardStepFileUploadProps = {
    step: number;
    title: string;
    subtitle: string;
    isRequired?: boolean;
    status?: {text: string, status: any};
    showFileUploap?: boolean;
    onFileUpload?: (file: {step: number, file: File}) => void;
}

export const CardStepFileUpload: React.FC<CardStepFileUploadProps> = ({ step, title, subtitle, isRequired, status, showFileUploap, onFileUpload }) => {
    const theme = useTheme();

    const handleUpload = (file: File) => {
        if(onFileUpload) onFileUpload({step, file});
    }

    return(
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                width: '100%',
            }}
        >
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        border: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    <Typography>{ step }</Typography>
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
                        <Typography variant='body2'>
                            { title }
                        </Typography>
                        {(isRequired !== undefined) && <TagsContainer text={isRequired ? "REQUERIDO" : "OPCIONAL"} status='transparent' />}
                    </Box>
                    <Typography variant="caption" sx={{ color: theme.palette.primary[600] }}>
                        { subtitle }
                    </Typography>
                </Box>
            </Box>
            {
                status && <TagsContainer text={status.text} status={status.status} />
            }
            {
                showFileUploap && <ButtonFileUpload buttonText="Subir archivo" fileUpload={handleUpload} />
            }
        </Box>
    )
}