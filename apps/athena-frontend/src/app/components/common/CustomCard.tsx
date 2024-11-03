import { Box, Grid2 as Grid } from '@mui/material';


interface CustomCardProps {
    children: React.ReactNode;
}


export function CustomCard({ children }: CustomCardProps) {
    return (
        <Box
            color='secondary.light'
            borderRadius={1}
            boxShadow={1}
            sx={{ p: 2, m: 1, }}
        >
            {children}
        </Box>
    )
}
