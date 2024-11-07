import {
  Box,
  TextField,
  Typography,
} from '@mui/material';
import { CancelIcon, ArrowForwardIcon } from '../icons';
import {
  StoreAddNewsletterItem,
  StoreAddNewsletterItemInput,
  useAddItemsStore,
} from '../store';
import { DeepPartial, isMediaDetailsInput, isTextDetailsInput, MediaFormat, NewsletterItemTypeName } from '@athena/athena-common';
import { CustomCard, CustomCardFooter, CustomCardHeader, CustomIconButton } from './common';
import ReactPlayer from 'react-player';


interface AddItemCardProps {
  item: StoreAddNewsletterItem;
  onClick: (id: string) => void;
  removeItem: (id: string) => void;
  updateItemDetails: <T extends NewsletterItemTypeName = NewsletterItemTypeName>(
    id: string,
    item: DeepPartial<StoreAddNewsletterItemInput<T>>
  ) => void;
}

export function AddItemCard({ item, onClick, removeItem, updateItemDetails }: AddItemCardProps) {
  //   const [editLocationOpen, setEditLocationOpen] = useState(false);
  //   const handleCloseEditLocation = () => {
  //     setEditLocationOpen(false);
  //   };
  //   const handleOpenEditLocation = () => {
  //     setEditLocationOpen(true);
  //   };
  //   if (editLocationOpen) {
  //     return (
  //       <EditItemLocation open={true} handleClose={handleCloseEditLocation} />
  //     );
  //   } else {


  const handleNameChange = (name: string) => updateItemDetails(item.temp.id, { details: { type: NewsletterItemTypeName.Text, name } })
  const handleDescriptionChange = (description: string) => updateItemDetails<NewsletterItemTypeName.Text>(item.temp.id, { details: { type: NewsletterItemTypeName.Text, description } })
  const handleLinkChange = (link: string) => updateItemDetails<NewsletterItemTypeName.Text>(item.temp.id, { details: { type: NewsletterItemTypeName.Text, link } })

  return (
    <CustomCard
      src={isMediaDetailsInput(item.details) && item.details.file && item.details.format === MediaFormat.Image ? URL.createObjectURL(item.details.file) : undefined}
    >
      <CustomCardHeader
        right={
          <CustomIconButton
            onClick={() => removeItem(item.temp.id)}
            icon={<CancelIcon sx={{ fontSize: 25, color: 'white' }} />} />
        }
      />
      <AddItemCardDetails
        item={item}
        onNameChange={handleNameChange}
        onDescriptionChange={handleDescriptionChange}
        onLinkChange={handleLinkChange}
      />

      <CustomCardFooter right={<CustomIconButton
        onClick={() => onClick(item.temp.id)}
        icon={<ArrowForwardIcon sx={{ fontSize: 25, color: 'white' }} />} />}>
        {isMediaDetailsInput(item.details) && <Typography>{"Sat Jun 3, 2024"}</Typography>}
      </CustomCardFooter>
    </CustomCard>
  );
}

interface AddItemCardDetailsProps {
  item: StoreAddNewsletterItem;
  onNameChange: (name: string) => void;
  onDescriptionChange: (name: string) => void;
  onLinkChange: (name: string) => void;
}

export function AddItemCardDetails({ item, onNameChange, onDescriptionChange, onLinkChange }: AddItemCardDetailsProps) {
  return (
    <>
      {isMediaDetailsInput(item.details) && item.details.format === MediaFormat.Image && <Box sx={{ height: 400 }} />}
      {isMediaDetailsInput(item.details)
        && item.details.format === MediaFormat.Video && item.details.file
        && <ReactPlayer
          url={URL.createObjectURL(item.details.file)}
          controls={true}
          width={"100%"}
          height={"100%"} />}
      {isTextDetailsInput(item.details) &&
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            required
            margin="dense"
            id={item.temp.id.toString()}
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={item.details.name}
            name={item.details.name}
            onChange={(e) => onNameChange(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id={item.temp.id.toString()}
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            name={item.details.description ?? ''}
            defaultValue={item.details.description ?? ''}
            onChange={(e) => onDescriptionChange(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id={item.temp.id.toString()}
            label="Link"
            type="text"
            fullWidth
            variant="standard"
            name={item.details.link ?? ''}
            defaultValue={item.details.link ?? ''}
            onChange={(e) => onLinkChange(e.target.value)}
          />
        </Box>
      }
    </>
  )
}