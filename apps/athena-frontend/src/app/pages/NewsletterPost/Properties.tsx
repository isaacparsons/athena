import { Stack, Typography } from '@mui/material';
import { CustomDate, Location } from '@athena/components';
import { useStore } from '@athena/store';
import { useShallow } from 'zustand/react/shallow';
import { CreateLocation, NewsletterPost, NewsletterPostBase } from '@athena/common';
import { useState } from 'react';

interface PropertiesProps {
  data: NewsletterPost;
}

export function Properties({ data }: PropertiesProps) {
  const [editing, setEditing] = useState(false);
  //   const {  setUpdatedItem, updatedItem } = useStore(
  //     useShallow((state) => ({
  //       setUpdatedItem: state.newsletterPosts.setUpdatedItem,
  //       updatedItem: state.newsletterPosts.updatedItem,
  //     }))
  //   );

  const handleUpdateLocation = (location: CreateLocation) => {
    // setUpdatedItem({
    //   id: item.id,
    //   newsletterId: item.newsletterId,
    //   ...location,
    // });
  };

  const handleUpdateDate = (date: string | null) => {
    // setUpdatedItem({
    //   id: item.id,
    //   newsletterId: item.newsletterId,
    //   date,
    // });
  };

  return (
    <Stack
      sx={{
        bgcolor: 'secondary.light',
        borderRadius: 10,
        p: 2,
        mb: 1,
      }}
      spacing={1}
      alignItems="flex-start"
    >
      <Typography variant="h6">{data.details.name}</Typography>
      {/* <Location
        readonly={!editing}
        location={updatedItem?.location ? updatedItem.location : item.location}
        onChange={handleUpdateLocation}
      />
      <CustomDate
        value={
          updatedItem?.date
            ? updatedItem.date
            : item.date !== null
            ? item.date
            : undefined
        }
        readonly={!editing}
        onChange={handleUpdateDate}
      /> */}
    </Stack>
  );
}
