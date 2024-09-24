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
} from '@mui/material';
import { red } from '@mui/material/colors';
import { ReadNewsletterItem } from 'types/types';
import DeleteIcon from '@mui/icons-material/Delete';

interface NewsletterItemsListProps {
  items: ReadNewsletterItem[];
  selectable: boolean;
  selectedItemIds: Set<number>;
  onToggleSelect: (id: number) => void;
  onToggleSelectAll: () => void;
  onDelete: () => void;
}

export default function NewsletterItemsList(props: NewsletterItemsListProps) {
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
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      )}

      <List sx={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((item) => {
          const isSelected = selectedItemIds.has(item.id);
          // console.log(selectedItemIds.has(item.id));
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
  item: ReadNewsletterItem;
  selectable: boolean;
  isSelected: boolean;
  handleSelectItemToggle: (id: number) => void;
}

function NewsletterItem(props: NewsletterItemProps) {
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
            subheader={item.created.toString()}
          />
        </Box>

        <CardMedia component="img" image={`${item.details.link}`} />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {item.details.caption}
          </Typography>
        </CardContent>
      </Card>
      {/* <Box component="img" sx={{ height: 200 }} src={`${item.link}`} /> */}
    </ListItem>
  );
}
