import { useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, Container, useTheme } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { useAuthContext } from '../../context/auth';
import { useEffect, useState } from 'react';
import { api } from '../../../api';
import BackBtn from '../../components/back-btn';
import { GetNewsletterResponse } from 'types/types';
import CustomSpeedDial from '../../components/custom-speed-dial';
import NewsletterMembers from './components/newsletter-members';
import NewsletterItemsList from './components/newsletter-items-list';
import AddItemsDialog from './components/add-items-dialog';

export function Newsletter() {
  const { newsletterId } = useParams();
  const navigate = useNavigate();
  const user = useAuthContext();
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [newsletter, setNewsletter] = useState<GetNewsletterResponse | null>(
    null
  );

  console.log(newsletter);

  const getNewsletter = async (id: number) => {
    const response = await api.newsletters.getNewsletterById(id);
    setNewsletter(response);
    setLoading(false);
  };

  useEffect(() => {
    if (newsletterId) {
      getNewsletter(parseInt(newsletterId));
    }
  }, [newsletterId]);

  if (!newsletter) {
    return <CircularProgress />;
  }
  return (
    <Container
      sx={{
        flex: 1,
        minHeight: '100vh',
        padding: theme.spacing(2),
      }}
      maxWidth="md"
    >
      <BackBtn onClick={() => navigate('/')} />

      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <AddItemsDialog />
          <NewsletterMembers members={newsletter.members} />
          <NewsletterItemsList items={newsletter.items} />
          <CustomSpeedDial
            actions={[
              {
                icon: <FileUploadIcon />,
                name: 'Media',
                onClick: () => {
                  console.log('Media');
                },
              },
            ]}
          />
        </Box>
      )}
    </Container>
  );
}

export default Newsletter;
