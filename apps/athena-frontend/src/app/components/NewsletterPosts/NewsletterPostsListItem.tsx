import {
  CustomCardFooter,
  CustomCardHeader,
  NewsletterPostDetailsContent,
  DetailsCardIcon,
  CloseIcon,
  StyledCard,
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

  const handleClick = () => {
    handleOpenPostDetails(value);
  };

  const handleRemovePost = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    handleRemove(value.tempPosition.id);
    e.stopPropagation();
  };

  return (
    <StyledCard onClick={handleClick}>
      <CustomCardHeader
        left={
          editing ? (
            <Checkbox
              sx={{ zIndex: 999 }}
              edge="end"
              onChange={() => handleSelect(value.tempPosition.id)}
              checked={selected.has(value.tempPosition.id)}
              onClick={(e) => e.stopPropagation()}
            />
          ) : null
        }
        right={editing ? <CloseIcon onClick={handleRemovePost} /> : null}
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
      <CustomCardFooter right={<DetailsCardIcon />} />
    </StyledCard>
  );
}
