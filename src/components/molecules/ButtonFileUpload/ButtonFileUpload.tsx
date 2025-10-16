import React from 'react';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import Button from '@mui/material/Button';

type ButtonFileUploadProps = {
    buttonText: string;
    fileUpload: (file: File) => void;
}

export const ButtonFileUpload: React.FC<ButtonFileUploadProps> = ({ buttonText, fileUpload}) => {

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleUpload = (file: File) => {
        if(fileUpload) fileUpload(file);
    }

    return(
        <>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        handleUpload(file);
                    }
                }}
                accept=".pdf,.doc,.docx,.jpg,.png"
            />
            <Button
                variant="outlined"
                startIcon={<UploadOutlinedIcon />}
                sx={{ textTransform: 'none', width: '144px' }}
                onClick={() => fileInputRef.current?.click()}
            >
                {buttonText}
            </Button>
        </>
    )
}