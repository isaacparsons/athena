import { MediaFormat } from '@athena/common';
import {
  CustomCard,
  CustomCardFooter,
  ImageCard,
  StyledTextField,
  DetailsCardIcon,
} from '@frontend/components';
import { Box, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import {
  isMediaDetails,
  isTextDetails,
  MediaPostDetailsForm,
  PostDetailsForm,
  TextPostDetailsForm,
} from '@frontend/types';

interface NewsletterPostCardProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export function NewsletterPostCard(props: NewsletterPostCardProps) {
  const { children, onClick } = props;

  return (
    <CustomCard>
      {children}
      <CustomCardFooter right={<DetailsCardIcon />} />
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
      onClick={(e) => e.stopPropagation()}
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
