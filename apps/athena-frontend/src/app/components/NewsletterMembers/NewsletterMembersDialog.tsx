import { DialogContent, Dialog, Stack, Grid2, Box } from '@mui/material';

interface NewsletterMembersDialogProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactElement<typeof NewsletterMembersDialogScreen>;
}

export function NewsletterMembersDialog(props: NewsletterMembersDialogProps) {
  const { open, onClose, children } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{ minWidth: 300, minHeight: 300, maxHeight: '80%', display: 'flex' }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

interface NewsletterMembersScreenHeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export function NewsletterMembersScreenHeader(
  props: NewsletterMembersScreenHeaderProps
) {
  const { left, right, center } = props;
  return (
    <Grid2 container>
      {left && <Grid2 size={2}>{left}</Grid2>}
      <Grid2 size="grow">{center}</Grid2>
      {right && <Grid2 size={2}>{right}</Grid2>}
    </Grid2>
  );
}

interface NewsletterMembersScreenFooterProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export function NewsletterMembersScreenFooter(
  props: NewsletterMembersScreenFooterProps
) {
  const { left, center, right } = props;
  return (
    <Grid2 container>
      {left && <Grid2 size={2}>{left}</Grid2>}
      <Grid2 size="grow">{center}</Grid2>
      {right && <Grid2 size={2}>{right}</Grid2>}
    </Grid2>
  );
}

interface NewsletterMembersDialogScreenProps {
  header?: React.ReactElement<typeof NewsletterMembersScreenHeader>;
  content: React.ReactNode;
  footer?: React.ReactElement<typeof NewsletterMembersScreenFooter>;
}

export function NewsletterMembersDialogScreen(
  props: NewsletterMembersDialogScreenProps
) {
  const { header, content, footer } = props;
  return (
    <Stack
      spacing={1}
      sx={{
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        flex: 1,
      }}
    >
      {header}
      <Box sx={{ flex: 1 }}>{content}</Box>
      {footer}
    </Stack>
  );
}
