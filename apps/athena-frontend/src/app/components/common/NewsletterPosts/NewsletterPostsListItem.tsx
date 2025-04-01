import {
  CustomCardFooter,
  CustomCardHeader,
  createStyledIcon,
  NewsletterPostDetailsContent,
} from '@athena/components';
import { Checkbox } from '@mui/material';
import { ArrowForwardIcon, CloseIcon } from '@athena/icons';
import { Post } from '../../../types';

const Close = createStyledIcon(CloseIcon);
const DetailsCard = createStyledIcon(ArrowForwardIcon);

interface NewsletterPostsListItemProps {
  editing: boolean;
  selected: Set<string>;
  value: Post;
  handleSelect: (id: string) => void;
  handleRemove: (id: string) => void;
  handleUpdate: (id: string, change: Partial<Post>) => void;
  handleOpenPostDetails: (post: Post) => void;
}

export function NewsletterPostsListItem(props: NewsletterPostsListItemProps) {
  const {
    editing,
    selected,
    value,
    handleSelect,
    handleRemove,
    handleUpdate,
    handleOpenPostDetails,
  } = props;

  return (
    <>
      <CustomCardHeader
        left={
          editing ? (
            <Checkbox
              edge="end"
              onChange={() => handleSelect(value.tempPosition.id)}
              checked={selected.has(value.tempPosition.id)}
            />
          ) : null
        }
        right={
          editing ? (
            <Close onClick={() => handleRemove(value.tempPosition.id)} />
          ) : null
        }
      />
      {value.details && (
        <NewsletterPostDetailsContent
          editing={editing}
          data={value.details}
          onChange={(details) => {
            handleUpdate(value.tempPosition.id, { details });
          }}
        />
      )}
      <CustomCardFooter
        right={<DetailsCard onClick={() => handleOpenPostDetails(value)} />}
      />
    </>
  );
}
