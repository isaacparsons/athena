import { Box, ButtonBase, Grid2 as Grid } from '@mui/material';

interface CustomCardProps {
    children?: React.ReactNode;
    src?: string
    onClick?: () => void;
    bgColor?: string
}

const imageStyles = (src: string) => ({
    backgroundImage: `url('${src}')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
})

export function CustomCard({ children, src, onClick, bgColor }: CustomCardProps) {
    return (
        <Box
            color={'secondary.light'}
            sx={{
                bgcolor: bgColor ?? 'white',
                m: 1,
                p: 2,
                minHeight: 100,
                width: '100%',
                display: "flex",
                boxShadow: 1,
                borderRadius: 5,
                ...(src ? imageStyles(src) : {}),
            }}
        >
            <ButtonBase sx={{ width: '100%' }} onClick={onClick}>
                <Grid
                    container
                    direction={"column"}
                    // bgcolor='secondary.main'
                    sx={{ justifyContent: "space-between", width: '100%' }}>
                    {children}
                </Grid>
            </ButtonBase>
        </Box>
    )
}
