import { Box, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { EditItemLocation, DateInput, NameInput, LocationInput } from './index';

interface AddMediaItemCardProps {
  // item: CreateNewsletterItemWithId;
  isSnapPoint: boolean;
}

export function AddMediaItemCard(props: AddMediaItemCardProps) {
  //   const { item, isSnapPoint } = props;
  //   const addNewsletterItemsDispatchContext =
  //     useAddNewsletterItemsDispatchContext();
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
  //     return (
  //       <Card
  //         sx={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           margin: 1,
  //           minWidth: 400,
  //           padding: 0,
  //           ...(isSnapPoint ? { scrollSnapAlign: 'start' } : {}),
  //         }}
  //       >
  //         <Box display="flex" flexDirection="row" justifyContent="flex-end">
  //           <IconButton aria-label="delete" onClick={handleRemoveItem}>
  //             <CancelIcon />
  //           </IconButton>
  //         </Box>
  //         <CardMedia
  //           sx={{ height: 400, width: 400 }}
  //           image={URL.createObjectURL(item.file)} //`https://picsum.photos/500?idx=1`
  //           title={item.details.name}
  //         />
  //         <CardContent>
  //           <Box display="flex" flexDirection="column">
  //             <NameInput id={item.id} name={item.details.name} />
  //             <DateInput
  //               id={item.id}
  //               date={item.date}
  //               onChange={handleDateChange}
  //             />
  //             <LocationInput
  //               id={item.id}
  //               location={item.details.location}
  //               handleOpenLocationDialog={handleOpenEditLocation}
  //             />
  //           </Box>
  //         </CardContent>
  //       </Card>
  //     );
  //   }
}
