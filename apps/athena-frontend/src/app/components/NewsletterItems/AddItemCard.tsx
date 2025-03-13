import { Box } from '@mui/material';
import { CancelIcon, ArrowForwardIcon } from '@athena/icons';
import {
  MediaFormat,
  NewsletterPostPostName,
  CreateNewsletterPostBatchItem,
} from '@athena/common';
import {
  CustomCard,
  CustomCardFooter,
  CustomCardHeader,
  CustomIconButton,
  CustomDate,
  StyledTextField,
} from '@athena/components';
import ReactPlayer from 'react-player';
import { UpdateStoreNewsletterPost } from '@athena/store';

interface AddItemCardProps {
  file?: File;
  item: CreateNewsletterPostBatchItem;
  onClick: (id: string) => void;
  removeItem: (id: string) => void;
  updateItemDetails: UpdateStoreNewsletterPost;
}

export function AddItemCard({
  file,
  item,
  onClick,
  removeItem,
  updateItemDetails,
}: AddItemCardProps) {
  const handleNameChange = (name: string) =>
    updateItemDetails(item.temp.id, {
      details: { type: NewsletterPostPostName.Text, name },
    });
  const handleDescriptionChange = (description: string) =>
    updateItemDetails<NewsletterPostPostName.Text>(item.temp.id, {
      details: { type: NewsletterPostPostName.Text, description },
    });
  const handleLinkChange = (link: string) =>
    updateItemDetails<NewsletterPostPostName.Text>(item.temp.id, {
      details: { type: NewsletterPostPostName.Text, link },
    });
  const handleDateChange = (date: string | null) =>
    updateItemDetails(item.temp.id, { date: date ?? undefined });

  return (
    <CustomCard
      src={
        item.details.type === NewsletterPostPostName.Media &&
        file &&
        item.details.format === MediaFormat.Image
          ? URL.createObjectURL(file)
          : undefined
      }
    >
      <CustomCardHeader
        right={
          <CustomIconButton
            onClick={() => removeItem(item.temp.id)}
            icon={<CancelIcon sx={{ fontSize: 25, color: 'white' }} />}
          />
        }
      />

      <AddItemCardDetails
        item={item}
        onNameChange={handleNameChange}
        onDescriptionChange={handleDescriptionChange}
        onLinkChange={handleLinkChange}
      />

      <CustomCardFooter
        right={
          <CustomIconButton
            onClick={() => onClick(item.temp.id)}
            icon={<ArrowForwardIcon sx={{ fontSize: 25, color: 'white' }} />}
          />
        }
      >
        <CustomDate
          value={item.date === null ? undefined : item.date}
          onChange={handleDateChange}
        />
      </CustomCardFooter>
    </CustomCard>
  );
}

interface AddItemCardDetailsProps {
  file?: File;
  item: CreateNewsletterPostBatchItem;
  onNameChange: (name: string) => void;
  onDescriptionChange: (name: string) => void;
  onLinkChange: (name: string) => void;
}

export function AddItemCardDetails({
  item,
  file,
  onNameChange,
  onDescriptionChange,
  onLinkChange,
}: AddItemCardDetailsProps) {
  return (
    <>
      {item.details.type === NewsletterPostPostName.Media &&
        item.details.format === MediaFormat.Image && <Box sx={{ height: 400 }} />}
      {item.details.type === NewsletterPostPostName.Media &&
        item.details.format === MediaFormat.Video &&
        file && (
          <ReactPlayer
            url={URL.createObjectURL(file)}
            controls={true}
            width={'100%'}
            height={'100%'}
          />
        )}
      {item.details.type === NewsletterPostPostName.Text && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <StyledTextField
            required
            id={item.temp.id.toString()}
            label="Name"
            variant="standard"
            defaultValue={item.details.name}
            name={item.details.name}
            onChange={(e) => onNameChange(e.target.value)}
          />
          <StyledTextField
            id={item.temp.id.toString()}
            label="Description"
            variant="standard"
            name={item.details.description ?? ''}
            defaultValue={item.details.description ?? ''}
            onChange={(e) => onDescriptionChange(e.target.value)}
          />
          <StyledTextField
            id={item.temp.id.toString()}
            label="Link"
            variant="standard"
            name={item.details.link ?? ''}
            defaultValue={item.details.link ?? ''}
            onChange={(e) => onLinkChange(e.target.value)}
          />
        </Box>
      )}
    </>
  );
}
