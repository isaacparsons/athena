import { Box, Stack } from '@mui/material';
import { CustomCardHeader, CustomCardFooter } from '@frontend/components';

interface CustomCardProps {
  src?: string;
  onClick?: () => void;
  bgColor?: string;
  header?: React.ReactElement<typeof CustomCardHeader>;
  content: React.ReactNode;
  footer?: React.ReactElement<typeof CustomCardFooter>;
}

const imageStyles = (src: string) => ({
  backgroundImage: `url('${src}')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

export function CustomCard({
  header,
  content,
  footer,
  src,
  onClick,
  bgColor,
}: CustomCardProps) {
  return (
    <Stack
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
      onClick={onClick}
    >
      {header}
      <Box sx={{ flex: 1 }}>{content}</Box>
      {footer}
    </Stack>
  );
}
