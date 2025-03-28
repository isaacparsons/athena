import { Box } from '@mui/material';

interface ImageCardProps {
  children?: React.ReactNode;
  src?: string;
  bgColor?: string;
}

const imageStyles = (src: string) => ({
  backgroundImage: `url('${src}')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

export function ImageCard({ src, bgColor, children }: ImageCardProps) {
  return (
    <Box
      // color={'secondary.light'}
      sx={{
        bgcolor: bgColor ?? 'white',
        m: 0.5,
        p: 1.5,
        // minHeight: 100,
        height: 350,
        // width: '100%',
        display: 'flex',
        boxShadow: 1,
        borderRadius: 5,
        ...(src ? imageStyles(src) : {}),
      }}
    >
      {children}
    </Box>
  );
}
