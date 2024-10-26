import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  StoreAddNewsletterItem,
  StoreAddNewsletterItemDetailsMedia,
  StoreAddNewsletterItemDetailsText,
  useAddItemsStore,
} from '../store/add-newsletter-items';
import { grey } from '@mui/material/colors';
import { NewsletterItemType } from '@athena/athena-common';

interface AddItemCardProps {
  item: StoreAddNewsletterItem;
  onClick: (id: number) => void;
}

export function AddItemCard(props: AddItemCardProps) {
  const { item, onClick } = props;
  const { removeItem } = useAddItemsStore();

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
  return (
    <Card>
      <Box display="flex" flexDirection="row" justifyContent="flex-end">
        <IconButton
          aria-label="delete"
          onClick={() => removeItem(item.temp.id)}
        >
          <CancelIcon />
        </IconButton>
      </Box>
      {item.details.type === 'media' && (
        <MediaCardItem
          item={
            item as StoreAddNewsletterItem<StoreAddNewsletterItemDetailsMedia>
          }
        />
      )}
      {item.details.type === 'text' && (
        <TextCardItem
          item={
            item as StoreAddNewsletterItem<StoreAddNewsletterItemDetailsText>
          }
        />
      )}
      <ButtonBase
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          bgColor: grey[400],
        }}
        onClick={() => onClick(item.temp.id)}
      >
        <ArrowForwardIcon sx={{ margin: 1 }} />
      </ButtonBase>
    </Card>
  );
  //   }
}

interface MediaItemCardProps {
  item: StoreAddNewsletterItem<StoreAddNewsletterItemDetailsMedia>;
}

export function MediaCardItem(props: MediaItemCardProps) {
  const { item } = props;
  return (
    <>
      <CardMedia
        sx={{ height: 400, width: 400 }}
        image={URL.createObjectURL(item.details.file)}
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
  item: StoreAddNewsletterItem<StoreAddNewsletterItemDetailsText>;
}

export function TextCardItem(props: TextItemCardProps) {
  const { item } = props;
  const { updateItemDetails } = useAddItemsStore();
  const itemId = item.temp.id;
  return (
    <CardContent>
      <TextField
        required
        margin="dense"
        id={itemId.toString()}
        label="Name"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={item.details.name}
        name={item.details.name}
        onChange={(e) =>
          updateItemDetails(itemId, {
            details: {
              type: NewsletterItemType.text,
              name: e.target.value,
            },
          })
        }
      />
      <TextField
        required
        margin="dense"
        id={itemId.toString()}
        label="Description"
        type="text"
        fullWidth
        variant="standard"
        name={item.details.description ?? ''}
        defaultValue={item.details.description ?? ''}
        onChange={(e) =>
          updateItemDetails<StoreAddNewsletterItemDetailsText>(itemId, {
            details: {
              type: NewsletterItemType.text,
              description: e.target.value,
            },
          })
        }
      />
      <TextField
        required
        margin="dense"
        id={itemId.toString()}
        label="Link"
        type="text"
        fullWidth
        variant="standard"
        name={item.details.link ?? ''}
        defaultValue={item.details.link ?? ''}
        onChange={(e) =>
          updateItemDetails<StoreAddNewsletterItemDetailsText>(itemId, {
            details: {
              type: NewsletterItemType.text,
              link: e.target.value,
            },
          })
        }
      />
    </CardContent>
  );
}
