import { UserNewsletterCard, CustomList, CustomListItem } from '@athena/components';
import { StoreNewsletter } from '@athena/store';
import { useNavigate } from 'react-router-dom';

interface NewslettersProps {
  newsletters: StoreNewsletter[];
}
export function UserNewsletters(props: NewslettersProps) {
  const { newsletters } = props;
  const navigate = useNavigate();

  return (
    <CustomList>
      {newsletters.map((newsletter) => {
        return (
          <CustomListItem id={newsletter.id} key={newsletter.id}>
            <UserNewsletterCard
              newsletter={newsletter}
              onClick={() => navigate(`/newsletters/${newsletter.id}`)}
            />
          </CustomListItem>
        );
      })}
    </CustomList>
  );
}
