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
} from '@mui/material';
import { red } from '@mui/material/colors';
import { Item } from 'types/types';

interface NewsletterItemsListProps {
  items: Item[];
}

export default function NewsletterItemsList(props: NewsletterItemsListProps) {
  const { items } = props;
  const theme = useTheme();
  return (
    <List sx={{ flex: 1 }}>
      {items.map((item) => (
        <ListItem
          sx={{}}
          key={item.id}
          component={() => (
            <Card sx={{ marginTop: theme.spacing(2) }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    ?
                  </Avatar>
                }
                title={item.title}
                subheader={item.created.toString()}
              />
              <CardMedia
                component="img"
                image={`${item.link}`}
                // alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.caption}
                </Typography>
              </CardContent>
            </Card>
          )}
        >
          {/* <Box component="img" sx={{ height: 200 }} src={`${item.link}`} /> */}
        </ListItem>
      ))}
    </List>
  );
}
