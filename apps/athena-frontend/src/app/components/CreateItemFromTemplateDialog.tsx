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
import { UserTemplateCard, UserTemplatesList } from '../pages/Templates';
import { mapToArray } from '../../util/helpers';
import { useMemo, useState } from 'react';
import { useAddItemsStore, useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { grey } from '@mui/material/colors';

interface CreateItemFromTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function CreateItemFromTemplateDialog(
  props: CreateItemFromTemplateDialogProps
) {
  const { open, onSubmit, onClose } = props;

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
      console.log(template);
      //   addItem({
      //     tempId: Object.keys(items).length + 1,
      //     date: new Date().toISOString(),
      //     location: undefined,
      //     title: name,
      //     details: {
      //       name: name,
      //       caption: '',
      //       type: 'media',
      //     },
      //   });
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
