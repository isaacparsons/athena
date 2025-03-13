import { Box, ButtonBase, Grid2 as Grid } from '@mui/material';

interface CustomCardProps {
  children?: React.ReactNode;
  src?: string;
  onClick?: () => void;
  bgColor?: string;
}

const imageStyles = (src: string) => ({
  backgroundImage: `url('${src}')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

export function CustomCard({ children, src, onClick, bgColor }: CustomCardProps) {
  return (
    <Box
      // color={'secondary.light'}
      sx={{
        bgcolor: bgColor ?? 'white',
        m: 0.5,
        p: 1.5,
        // minHeight: 100,
        width: '100%',
        display: 'flex',
        boxShadow: 1,
        borderRadius: 5,
        ...(src ? imageStyles(src) : {}),
      }}
    >
      <ButtonBase sx={{ width: '100%' }} onClick={onClick}>
        <Grid
          container
          direction={'column'}
          sx={{ justifyContent: 'space-between', width: '100%', height: '100%' }}
        >
          {children}
        </Grid>
      </ButtonBase>
    </Box>
  );
}
