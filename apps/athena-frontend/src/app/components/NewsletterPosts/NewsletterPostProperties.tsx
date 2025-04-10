import { CreateLocation } from '@athena/common';
import { NewsletterPostForm, UpdateNewsletterPostForm } from '@frontend/types';
import { CustomDate } from '../common/Date';
import { Location } from '../common/Location';
import { Stack } from '@mui/material';

interface NewsletterPostPropertiesProps {
  data: NewsletterPostForm;
  editing?: boolean;
  onChange?: (input: UpdateNewsletterPostForm) => void;
}

export function NewsletterPostProperties(props: NewsletterPostPropertiesProps) {
  const { data, editing, onChange } = props;

  const { date, location } = data;

  const handleLocationChange = (location: CreateLocation) => {
    if (onChange) onChange({ id: data.tempPosition.id, change: { location } });
  };

  const handleUpdateDate = (date: string | null) => {
    if (onChange) onChange({ id: data.tempPosition.id, change: { date } });
  };
  return (
    <Stack direction={'column'}>
      <CustomDate value={date} editing={editing} onChange={handleUpdateDate} />
      <Location
        editing={Boolean(editing)}
        location={location}
        onChange={handleLocationChange}
      />
    </Stack>
  );
}
