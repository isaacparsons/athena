import _ from 'lodash';
import {
  CreateNewsletterPost,
  MediaFormat,
  NewsletterPostTypeName,
} from '@athena/common';
import {
  CustomCard,
  CustomCardFooter,
  CustomDate,
  ImageCard,
  Location,
  StyledTextField,
} from '@athena/components';
import { createStyledIcon } from '../Styled/createStyledIcon';
import { ArrowForwardIcon } from '@athena/icons';
import { Box, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import {
  isMediaDetails,
  isTextDetails,
  MediaPostDetailsForm,
  PostDetailsForm,
  TextPostDetailsForm,
} from '../../../types';

interface NewsletterPostCardProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const DetailsCard = createStyledIcon(ArrowForwardIcon);

export function NewsletterPostCard(props: NewsletterPostCardProps) {
  const { children, onClick } = props;

  return (
    <CustomCard>
      {children}
      <CustomCardFooter right={<DetailsCard />} />
    </CustomCard>
  );
}

interface NewsletterPostDetailsProps {
  data: PostDetailsForm;
  onChange?: (details: PostDetailsForm) => void;
  editing?: boolean;
}

export function NewsletterPostDetailsContent(props: NewsletterPostDetailsProps) {
  const { data, editing, onChange } = props;

  const handleChange = (name: string) => {
    if (onChange) onChange({ ...data, name });
  };

  return (
    <>
      {isTextDetails(data) && (
        <TextPostDetails editing={editing} data={data} onChange={handleChange} />
      )}
      {isMediaDetails(data) && <MediaPostDetails editing={editing} data={data} />}
    </>
  );
}

interface NewsletterPostPropertiesProps<T> {
  editing: boolean;
  data: T;
  onChange: (post: Partial<T>) => void;
}
export function NewsletterPostProperties<T extends CreateNewsletterPost>(
  props: NewsletterPostPropertiesProps<T>
) {
  const { data, onChange, editing } = props;

  const { date, details, location } = data;

  const handleLocationChange = (location: T['location']) => {
    onChange({ location } as Partial<T>);
  };

  const handleUpdateDate = (date: string | null) => {
    onChange({ date } as Partial<T>);
  };
  return (
    <>
      <Location
        readonly={!editing}
        location={location}
        onChange={handleLocationChange}
      />
      <CustomDate value={date} editing={editing} onChange={handleUpdateDate} />
      {details?.type === NewsletterPostTypeName.Text && (
        <TextPostDetails editing={editing} data={details} />
      )}
      {details?.type === NewsletterPostTypeName.Media && (
        <MediaPostDetails editing={editing} data={details} />
      )}
    </>
  );
}

interface TextPostDetailsProps {
  data: TextPostDetailsForm;
  editing?: boolean;
  onChange?: (value: string) => void;
}

function TextPostDetails(props: TextPostDetailsProps) {
  const { data, editing, onChange } = props;
  return editing ? (
    <StyledTextField
      required
      label="Name"
      variant="standard"
      name={data?.name ?? ''}
      value={data?.name ?? ''}
      onChange={(e) => {
        if (onChange) onChange(e.target.value);
      }}
    />
  ) : (
    <Typography variant="h6">{data?.name ?? ''}</Typography>
  );
}

interface MediaPostDetailsProps {
  data: MediaPostDetailsForm;
  editing?: boolean;
  onChange?: (value: string) => void;
}

function MediaPostDetails(props: MediaPostDetailsProps) {
  const { data, editing, onChange } = props;
  const { format, fileName, name, caption } = data;

  return format === MediaFormat.Image ? (
    <ImageCard src={fileName}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Box sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 5 }}>
          <Typography variant="body1" sx={{ color: 'white' }}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
            {caption}
          </Typography>
        </Box>
      </Box>
    </ImageCard>
  ) : format === MediaFormat.Video ? (
    <Box>
      <ReactPlayer url={fileName} controls={true} width={'100%'} height={'100%'} />
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Box sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 5 }}>
          <Typography variant="body1" sx={{ color: 'white' }}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
            {caption}
          </Typography>
        </Box>
      </Box>
    </Box>
  ) : null;
}
