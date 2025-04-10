import { Newsletter } from '@athena/common';
import { CustomList, CustomListItem, NewsletterCard } from '@frontend/components';
import { useNavigate } from 'react-router-dom';

interface NewslettersProps {
  data: Newsletter[];
}
export function UserNewsletters(props: NewslettersProps) {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <CustomList>
      {data.map((newsletter) => {
        return (
          <CustomListItem id={newsletter.id} key={newsletter.id}>
            <NewsletterCard
              data={newsletter}
              onClick={() => navigate(`/newsletters/${newsletter.id}`)}
            />
          </CustomListItem>
        );
      })}
    </CustomList>
  );
}
