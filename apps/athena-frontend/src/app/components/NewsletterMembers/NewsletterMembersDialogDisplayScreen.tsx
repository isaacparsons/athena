import { NewsletterMember } from '@athena/common';
import { List } from '@mui/material';
import {
  NewsletterMemberListItem,
  NewsletterMembersDialogScreen,
  NewsletterMembersScreenHeader,
  StyledAddIcon,
} from '@frontend/components';

interface NewsletterMembersDialogDisplayScreenProps {
  data: NewsletterMember[];
  onClick: (member: NewsletterMember) => void;
  onInvite: () => void;
}

export function NewsletterMembersDialogDisplayScreen(
  props: NewsletterMembersDialogDisplayScreenProps
) {
  const { data, onClick, onInvite } = props;
  return (
    <NewsletterMembersDialogScreen
      header={
        <NewsletterMembersScreenHeader
          right={<StyledAddIcon onClick={onInvite} />}
        />
      }
      content={
        <List>
          {data.map((member) => (
            <NewsletterMemberListItem data={member} onClick={onClick} />
          ))}
        </List>
      }
    />
  );
}
