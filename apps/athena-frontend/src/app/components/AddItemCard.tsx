import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { NameInput } from './index';
import {
  StoreAddNewsletterMediaItem,
  StoreAddNewsletterTextItem,
  StoreItem,
  useAddItemsStore,
} from '../store/add-newsletter-items';

interface AddItemCardProps {
  item: StoreItem;
}

export function AddItemCard(props: AddItemCardProps) {
  const { item } = props;
  const { removeItem } = useAddItemsStore();

  //   const [editLocationOpen, setEditLocationOpen] = useState(false);
  //   const handleCloseEditLocation = () => {
  //     setEditLocationOpen(false);
  //   };
  //   const handleOpenEditLocation = () => {
  //     setEditLocationOpen(true);
  //   };
  //   const handleRemoveItem = () => {
  //     addNewsletterItemsDispatchContext({
  //       entityType: 'newsletter-item',
  //       action: 'removed',
  //       payload: item.id,
  //     });
  //   };
  //   const handleDateChange = (date: string | null) => {
  //     addNewsletterItemsDispatchContext({
  //       entityType: 'newsletter-item',
  //       action: 'date-updated',
  //       id: item.id,
  //       payload: date,
  //     });
  //   };
  //   if (editLocationOpen) {
  //     return (
  //       <EditItemLocation open={true} handleClose={handleCloseEditLocation} />
  //     );
  //   } else {
  return (
    <Card>
      <Box display="flex" flexDirection="row" justifyContent="flex-end">
        <IconButton aria-label="delete" onClick={() => removeItem(item.tempId)}>
          <CancelIcon />
        </IconButton>
      </Box>
      {item.details.type === 'media' && (
        <MediaCardItem item={item as StoreAddNewsletterMediaItem} />
      )}
      {item.details.type === 'text' && (
        <TextCardItem item={item as StoreAddNewsletterTextItem} />
      )}
    </Card>
  );
  //   }
}

interface MediaItemCardProps {
  item: StoreAddNewsletterMediaItem;
}

function MediaCardItem(props: MediaItemCardProps) {
  const { item } = props;
  return (
    <>
      <CardMedia
        sx={{ height: 400, width: 400 }}
        image={URL.createObjectURL(item.file)} //`https://picsum.photos/500?idx=1`
        title={item.details.name}
      />
      <CardContent>
        <Box display="flex" flexDirection="column">
          {/* <DateInput
      id={item.id}
      date={item.date}
      onChange={handleDateChange}
    />
    <LocationInput
      id={item.id}
      location={item.details.location}
      handleOpenLocationDialog={handleOpenEditLocation}
    /> */}
        </Box>
      </CardContent>
    </>
  );
}

interface TextItemCardProps {
  item: StoreAddNewsletterTextItem;
}

function TextCardItem(props: TextItemCardProps) {
  const { item } = props;
  const { updateItemDetails } = useAddItemsStore();
  return (
    <CardContent>
      <TextField
        required
        margin="dense"
        id={item.tempId.toString()}
        label="Name"
        type="text"
        fullWidth
        variant="standard"
        name={item.details.name}
        onChange={(e) =>
          updateItemDetails(item.tempId, { name: e.target.value })
        }
      />
      <TextField
        required
        margin="dense"
        id={item.tempId.toString()}
        label="Description"
        type="text"
        fullWidth
        variant="standard"
        name={item.details.description ?? ''}
        onChange={(e) =>
          updateItemDetails(item.tempId, { description: e.target.value })
        }
      />
      <TextField
        required
        margin="dense"
        id={item.tempId.toString()}
        label="Link"
        type="text"
        fullWidth
        variant="standard"
        name={item.details.link ?? ''}
        onChange={(e) =>
          updateItemDetails(item.tempId, { link: e.target.value })
        }
      />
    </CardContent>
  );
}
