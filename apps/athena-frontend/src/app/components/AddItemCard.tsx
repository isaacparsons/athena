import {
  Box,
  TextField,
  Typography,
} from '@mui/material';
import { CancelIcon, ArrowForwardIcon } from '../icons';
import {
  StoreAddNewsletterItem,
  useAddItemsStore,
} from '../store';
import { isMediaDetailsInput, isTextDetailsInput } from '@athena/athena-common';
import { CustomCard, CustomCardFooter, CustomCardHeader, CustomIconButton } from './common';


interface AddItemCardProps {
  item: StoreAddNewsletterItem;
  onClick: (id: string) => void;
}

export function AddItemCard(props: AddItemCardProps) {
  const { item, onClick } = props;
  const { removeItem, updateItemDetails } = useAddItemsStore();

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

  const itemId = item.temp.id;
  return (
    <CustomCard
      src={isMediaDetailsInput(item.details) && item.details.file ? URL.createObjectURL(item.details.file) : undefined}
    >
      <CustomCardHeader
        right={
          <CustomIconButton
            onClick={() => removeItem(item.temp.id)}
            icon={<CancelIcon sx={{ fontSize: 25, color: 'white' }} />} />
        }
      />
      {isMediaDetailsInput(item.details) && <Box sx={{ height: 400 }} />}
      {isTextDetailsInput(item.details) &&
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
        </Box>}
      <CustomCardFooter right={<CustomIconButton
        onClick={() => onClick(item.temp.id)}
        icon={<ArrowForwardIcon sx={{ fontSize: 25, color: 'white' }} />} />}>
        {isMediaDetailsInput(item.details) && <Typography>{"Sat Jun 3, 2024"}</Typography>}

      </CustomCardFooter>
    </CustomCard>
  );
}