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

interface NewsletterItemCardProps {
  item: StoreNewsletterItem;
  selectable: boolean;
  selected: boolean;
  onToggleSelect: (id: number) => void;
}

export function NewsletterItemCard({ item, selectable, selected, onToggleSelect }: NewsletterItemCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => navigate(`/newsletters/${item.newsletterId}/items/${item.id}`)
  return (
    <CustomCard
      onClick={selectable ? undefined : handleCardClick}
      src={item.details?.type === 'media' ? item.details.fileName : undefined}
    >
      <CustomCardHeader
        left={selectable ?
          <CustomCheckbox
            id={item.id}
            value={selected}
            onClick={() => onToggleSelect(item.id)} /> : null
        }
      />
      {item.details?.type === 'media' && (
        <Box sx={{ height: 400 }} />
      )}
      {item.details?.type === 'text' && (
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
        item.childrenIds.length > 0 &&
        <CustomIconButton
          onClick={handleCardClick}
          icon={<ArrowForwardIcon sx={{ fontSize: 25, color: 'white' }} />} />}>

      </CustomCardFooter>
    </CustomCard>
  );
}