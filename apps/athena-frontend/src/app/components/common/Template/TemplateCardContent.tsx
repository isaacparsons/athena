import { Template } from '@athena/common';
import { Stack, Typography } from '@mui/material';

interface TemplateCardContentProps {
  data: Template;
}

export function TemplateCardContent(props: TemplateCardContentProps) {
  const { data } = props;
  return (
    <Stack sx={{ width: '100%', alignItems: 'flex-start' }}>
      <Typography>{data.name}</Typography>
    </Stack>
  );
}
