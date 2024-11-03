import { useMemo, useState } from 'react';

import {
  Button,
  ButtonBase,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
} from '@mui/material';
import { UserTemplateCard } from '../pages';
import { mapToArray } from '../../util';
import { useAddItemsStore, useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';

interface CreateItemFromTemplateDialogProps {
  parentId: string | null;
  open: boolean;
  onClose: () => void;
}

export function CreateItemFromTemplateDialog(
  props: CreateItemFromTemplateDialogProps
) {
  const { parentId, open, onClose } = props;

  const { loading, newsletterItemTemplates, fetchTemplate } = useStore(
    useShallow((state) => ({
      newsletterItemTemplates: state.newsletterItemTemplates.data,
      fetchTemplate: state.newsletterItemTemplates.fetch,
      loading: state.newsletterItemTemplates.loading,
    }))
  );

  const { items, addItems } = useAddItemsStore(
    useShallow((state) => ({
      items: state.data,
      addItems: state.addItems,
    }))
  );

  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null
  );

  const templates = useMemo(
    () => mapToArray(newsletterItemTemplates),
    [newsletterItemTemplates]
  );

  const handleTemplateSelected = (id: number) => {
    setSelectedTemplateId((prev) => (prev === id ? null : id));
  };



  const handleAddTemplate = async () => {
    if (selectedTemplateId !== null) {
      const template = await fetchTemplate(selectedTemplateId);

      console.log(template)

      addItems(parentId, template.items.filter((i) => i.data).map((i) => ({
        location: undefined,
        date: new Date().toISOString(),
        title: '',
        details: i.data.type === 'media' ? { ...i.data, file: null } : i.data
      })))

      onClose()
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Create from template'}
      </DialogTitle>
      <DialogContent>
        <List>
          {templates.map((template) => (
            <ListItem key={template.id}>
              <ButtonBase
                sx={
                  selectedTemplateId === template.id
                    ? {
                      borderWidth: 5,
                      borderColor: 'black',
                      borderStyle: 'solid',
                      opacity: 1,
                    }
                    : {
                      opacity: 0.5,
                    }
                }
                onClick={() => handleTemplateSelected(template.id)}
              >
                <UserTemplateCard template={template} />
              </ButtonBase>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button onClick={handleAddTemplate} autoFocus>
            submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
