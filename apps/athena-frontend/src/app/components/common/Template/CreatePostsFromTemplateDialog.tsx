import { TemplateBase } from '@athena/common';
import { PostInput } from '../../../types';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@athena/store';
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
} from '@mui/material';
import { TemplateCard } from './TemplateCard';
import { TemplateCardContent } from './TemplateCardContent';
import { templateToPosts } from '../../../../util';

interface CreatePostsFromTemplateDialogProps {
  newsletterId: number;
  data: TemplateBase[];
  open: boolean;
  onClose: () => void;
  onInsert: (newsletterId: number, post: PostInput) => void;
}
export function CreatePostsFromTemplateDialog(
  props: CreatePostsFromTemplateDialogProps
) {
  const { open, onClose, data, newsletterId, onInsert } = props;

  const { fetchTemplate } = useStore(
    useShallow((state) => ({
      fetchTemplate: state.templates.fetch,
    }))
  );

  const [selected, setSelected] = useState<TemplateBase | null>(null);

  const handleSelected = (template: TemplateBase) => {
    setSelected((state) => {
      if (state?.id === template.id) return null;
      return template;
    });
  };

  const handleSubmit = async () => {
    if (selected) {
      const template = await fetchTemplate(selected.id);
      const posts = templateToPosts(newsletterId, template);
      posts.forEach((p) => onInsert(newsletterId, p));
    }
    onClose();
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>{'Create from template'}</DialogTitle>
      <DialogContent sx={{ width: '100%' }}>
        <List>
          {data.map((template) => (
            <ListItem sx={{ opacity: selected?.id === template.id ? 1 : 0.5 }}>
              <TemplateCard onClick={() => handleSelected(template)}>
                <TemplateCardContent data={template} />
              </TemplateCard>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button disabled={!selected} onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
