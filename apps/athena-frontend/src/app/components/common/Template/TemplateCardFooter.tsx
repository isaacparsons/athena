import { CustomCardFooter, CustomIconButton } from '@frontend/components';
import { ArrowForwardIcon } from '@frontend/icons';

interface TemplateCardFooterProps {
  onClick: () => void;
}

export function TemplateCardFooter(props: TemplateCardFooterProps) {
  const { onClick } = props;
  return (
    <CustomCardFooter
      right={
        <CustomIconButton
          onClick={onClick}
          icon={<ArrowForwardIcon sx={{ fontSize: 25, color: 'white' }} />}
        />
      }
    />
  );
}
