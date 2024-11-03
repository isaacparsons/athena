import {
  Box,
  Stack,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
} from '@mui/material';
import { CancelIcon, ArrowForwardIcon } from '../icons';
import { grey } from '@mui/material/colors';
import {
  StoreAddNewsletterItem,
  useAddItemsStore,
} from '../store';
import { isMediaDetailsInput, isTextDetailsInput } from '@athena/athena-common';


interface AddItemCardProps {
  item: StoreAddNewsletterItem;
  onClick: (id: string) => void;
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
      <Stack direction="row" justifyContent="flex-end">
        <IconButton
          aria-label="delete"
          onClick={() => removeItem(item.temp.id)}
        >
          <CancelIcon />
        </IconButton>
      </Stack>
      {isMediaDetailsInput(item.details) && (
        <MediaCardItem item={{ ...item, details: item.details }} />
      )}
      {isTextDetailsInput(item.details) && (
        <TextCardItem item={{ ...item, details: item.details }} />
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
  item: StoreAddNewsletterItem<'media'>;
}

export function MediaCardItem(props: MediaItemCardProps) {
  const { item } = props;
  const { details } = item
  return (
    <>
      <CardMedia
        sx={{ height: 400, width: '100vw' }}
        image={details.file ? URL.createObjectURL(details.file) : ''}
        title={details.name}
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
  item: StoreAddNewsletterItem<'text'>;
}

export function TextCardItem(props: TextItemCardProps) {
  const { item } = props;
  const { updateItemDetails } = useAddItemsStore();
  const itemId = item.temp.id;
  return (
    <CardContent >
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
        onChange={(e) => updateItemDetails(itemId, { details: { type: 'text', name: e.target.value } })}
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
        onChange={(e) => updateItemDetails<'text'>(itemId, { details: { type: 'text', description: e.target.value } })}
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
        onChange={(e) => updateItemDetails<'text'>(itemId, { details: { type: 'text', link: e.target.value } })}
      />
    </CardContent>
  );
}
