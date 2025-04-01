import { TemplateBase } from '@athena/common';
import { CustomCard, CustomCardFooter, CustomIconButton } from '@athena/components';
import { ArrowForwardIcon } from '@athena/icons';
import { Stack, Typography } from '@mui/material';

interface TemplateCardProps {
  data: TemplateBase;
  onClick: () => void;
}

export function TemplateCard(props: TemplateCardProps) {
  const { data, onClick } = props;
  return (
    <CustomCard onClick={onClick}>
      <Stack sx={{ width: '100%', alignItems: 'flex-start' }}>
        <Typography>{data.name}</Typography>
      </Stack>
      <CustomCardFooter
        right={
          <CustomIconButton
            onClick={onClick}
            icon={<ArrowForwardIcon sx={{ fontSize: 25, color: 'white' }} />}
          />
        }
      />
    </CustomCard>
  );
}
