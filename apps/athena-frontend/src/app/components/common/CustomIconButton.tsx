import { Box, ButtonBase } from '@mui/material';

interface CustomIconButtonProps {
    icon: React.ReactElement
    onClick: () => void
}

export function CustomIconButton({ icon, onClick }: CustomIconButtonProps) {
    return (
        <ButtonBase
            onClick={onClick}
        >
            <Box sx={{
                bgcolor: 'primary.main',
                borderRadius: 35 / 2,
                width: 35,
                height: 35,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {icon}
            </Box>
        </ButtonBase>
    )
}