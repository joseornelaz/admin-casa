import Chip from "@mui/material/Chip";

type StatusPillProps = {
    label: string;
    status: 'activo' | 'inactivo';
}

export const StatusPill: React.FC<StatusPillProps> = ({ label, status }) => {

    return(
        <Chip 
            label={label} 
            size="small" 
            sx={{
                color: status === 'activo' ? '#2e7d32' : '#d32f2f',
                backgroundColor: status === 'activo' ? '#e8f5e9' : '#ffebee',
                border: `1px solid ${status === 'activo' ? '#4caf50' : '#f44336'}`,
            }} 
        />
    )

}