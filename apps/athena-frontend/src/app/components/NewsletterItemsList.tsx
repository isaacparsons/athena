import {
  List,
  ListItem,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  useTheme,
  Box,
  Checkbox,
  Paper,
  IconButton,
  Stack,
} from '@mui/material';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { StoreNewsletterItem } from '../store';
import {
  NewsletterItemDetailsMedia,
  NewsletterItemDetailsText,
} from '@athena/athena-common';

interface NewsletterItemsListProps {
  items: StoreNewsletterItem[];
  selectable: boolean;
  selectedItemIds: Set<number>;
  onToggleSelect: (id: number) => void;
  onToggleSelectAll: () => void;
  onDelete: () => void;
}

export function NewsletterItemsList(props: NewsletterItemsListProps) {
  const {
    items,
    selectable,
    onToggleSelect,
    onToggleSelectAll,
    selectedItemIds,
    onDelete,
  } = props;

  const theme = useTheme();

  const handleSelectItemToggle = (id: number) => {
    onToggleSelect(id);
  };

  return (
    <Box>
      {selectable && (
        <Paper elevation={2}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            padding={theme.spacing(1)}
          >
            <Box display="flex" flexDirection="row" alignItems="center">
              <Checkbox
                value={items.length === selectedItemIds.size}
                onClick={onToggleSelectAll}
              />
              <Typography>Select all</Typography>
            </Box>
            <IconButton
              onClick={onDelete}
              disabled={selectedItemIds.size === 0}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      )}

      <List sx={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((item) => {
          const isSelected = selectedItemIds.has(item.id);
          return (
            <NewsletterItem
              item={item}
              selectable={selectable}
              isSelected={isSelected}
              handleSelectItemToggle={handleSelectItemToggle}
            />
          );
        })}
      </List>
    </Box>
  );
}

interface NewsletterItemProps {
  item: StoreNewsletterItem;
  selectable: boolean;
  isSelected: boolean;
  handleSelectItemToggle: (id: number) => void;
}

export function NewsletterItem(props: NewsletterItemProps) {
  const theme = useTheme();
  const { selectable, isSelected, item, handleSelectItemToggle } = props;
  return (
    <ListItem sx={{ padding: 0 }} key={item.id}>
      <Card sx={{ marginBottom: theme.spacing(2) }}>
        <Box display="flex">
          {selectable && (
            <Checkbox
              key={item.id}
              checked={isSelected}
              onClick={() => handleSelectItemToggle(item.id)}
            />
          )}

          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                ?
              </Avatar>
            }
            title={item.title}
            subheader={item.meta.created.toString()}
          />
        </Box>

        {item.details?.type === 'media' ? (
          <MediaItemDetails
            details={item.details as NewsletterItemDetailsMedia}
          />
        ) : null}
      </Card>
    </ListItem>
  );
}

interface MediaItemDetailsProps {
  details: NewsletterItemDetailsMedia;
}

export function MediaItemDetails(props: MediaItemDetailsProps) {
  const { details } = props;
  return (
    <Stack>
      <CardMedia component="img" image={`${details.fileName}`} />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {details.caption}
        </Typography>
      </CardContent>
    </Stack>
  );
}

interface TextItemDetailsProps {
  details: NewsletterItemDetailsText;
}

export function TextItemDetails(props: TextItemDetailsProps) {
  const { details } = props;
  return (
    <Stack>
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {details.name}
        </Typography>
        {details.description && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {details.description}
          </Typography>
        )}
        {details.link && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {details.link}
          </Typography>
        )}
      </CardContent>
    </Stack>
  );
}
