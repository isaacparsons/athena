import {
  Box,
  Typography,
} from '@mui/material';
import { StoreNewsletterItem } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { CustomCard, CustomCardFooter, CustomCardHeader } from '../CustomCard';
import { CustomCheckbox } from '../CustomCheckbox';
import { CustomIconButton } from '../CustomIconButton';
import { ArrowForwardIcon } from '../../../icons';
import { NewsletterItemTypeName } from '@athena/athena-common';

interface NewsletterItemCardProps {
  item: StoreNewsletterItem;
  selectable: boolean;
  selected: boolean;
  onToggleSelect: (id: number) => void;
}

export function NewsletterItemCard({ item, selectable, selected, onToggleSelect }: NewsletterItemCardProps) {
  const navigate = useNavigate();

  const hasChildren = item.childrenIds.length > 0;

  const handleCardClick = () => navigate(`/newsletters/${item.newsletterId}/items/${item.id}`)
  return (
    <CustomCard
      onClick={selectable || !hasChildren ? undefined : handleCardClick}
      src={item.details?.type === NewsletterItemTypeName.Media ? item.details.fileName : undefined}
    >
      <CustomCardHeader
        left={selectable ?
          <CustomCheckbox
            id={item.id}
            value={selected}
            onClick={() => onToggleSelect(item.id)} /> : null
        }
      >
        <Typography sx={{ color: 'text.secondary' }}>
          {item.title}
        </Typography>
      </CustomCardHeader>
      {item.details?.type === NewsletterItemTypeName.Media && (
        <Box sx={{ height: 400 }} />
      )}
      {item.details?.type === NewsletterItemTypeName.Text && (
        <Box sx={{ direction: "column" }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {item.details.name}
          </Typography>
          {item.details.description && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.details.description}
            </Typography>
          )}
          {item.details.link && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.details.link}
            </Typography>
          )}
        </Box>)}
      <CustomCardFooter right={
        hasChildren &&
        <CustomIconButton
          onClick={handleCardClick}
          icon={<ArrowForwardIcon sx={{ fontSize: 25, color: 'white' }} />} />}>

      </CustomCardFooter>
    </CustomCard>
  );
}