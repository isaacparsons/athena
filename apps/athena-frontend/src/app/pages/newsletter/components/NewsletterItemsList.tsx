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
} from '@mui/material';
import { red } from '@mui/material/colors';
import { ReadNewsletterItem } from 'types/types';

interface NewsletterItemsListProps {
  items: ReadNewsletterItem[];
  selectable: boolean;
  selectedItemIds: Set<number>;
  onToggleSelect: (id: number) => void;
  onToggleSelectAll: () => void;
}

export default function NewsletterItemsList(props: NewsletterItemsListProps) {
  const {
    items,
    selectable,
    onToggleSelect,
    onToggleSelectAll,
    selectedItemIds,
  } = props;

  const handleSelectItemToggle = (id: number) => {
    onToggleSelect(id);
  };

  return (
    <Box>
      {selectable && (
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography>Select all</Typography>
          <Checkbox
            value={items.length === selectedItemIds.size}
            onClick={onToggleSelectAll}
          />
        </Box>
      )}

      <List sx={{ flex: 1 }}>
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
  console.log(`id: ${item.id}, selected: ${isSelected}`);
  return (
    <ListItem sx={{}} key={item.id}>
      <Box>
        <Card sx={{ marginTop: theme.spacing(2) }}>
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
      </Box>
      {/* <Box component="img" sx={{ height: 200 }} src={`${item.link}`} /> */}
    </ListItem>
  );
}
