import {
  CustomCardFooter,
  CustomCardHeader,
  NewsletterPostDetailsContent,
  DetailsCardIcon,
  CloseIcon,
} from '@frontend/components';
import { Checkbox } from '@mui/material';
import { NewsletterPostForm, UpdateNewsletterPostForm } from '@frontend/types';

interface NewsletterPostsListItemProps {
  editing: boolean;
  selected: Set<string>;
  value: NewsletterPostForm;
  handleSelect: (id: string) => void;
  handleRemove: (id: string) => void;
  handleUpdate: (input: UpdateNewsletterPostForm) => void;
  handleOpenPostDetails: (post: NewsletterPostForm) => void;
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
            <CloseIcon onClick={() => handleRemove(value.tempPosition.id)} />
          ) : null
        }
      />
      {value && value.details && (
        <NewsletterPostDetailsContent
          editing={editing}
          data={value.details}
          onChange={(details) => {
            handleUpdate({
              id: value.tempPosition.id,
              change: { ...value, details },
            });
          }}
        />
      )}
      <CustomCardFooter
        right={<DetailsCardIcon onClick={() => handleOpenPostDetails(value)} />}
      />
    </>
  );
}
