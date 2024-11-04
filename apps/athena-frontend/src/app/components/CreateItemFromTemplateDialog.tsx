import { useMemo, useState } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import { mapToArray } from '../../util';
import { useAddItemsStore, useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { CustomCard, CustomList, CustomListItem } from './common';

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

  const { addItems } = useAddItemsStore(
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
      fullWidth
      open={open}
      onClose={() => onClose()}
    >
      <DialogTitle>{'Create from template'}</DialogTitle>
      <DialogContent sx={{ width: '100%' }}>
        <CustomList>
          {templates.map((template) => (
            <CustomListItem id={template.id}>
              <CustomCard onClick={() => handleTemplateSelected(template.id)} bgColor={selectedTemplateId === template.id ? 'primary.main' : 'secondary.light'}>
                <Typography sx={{ color: selectedTemplateId === template.id ? 'secondary.light' : 'primary.main' }}>{template.name}</Typography>
              </CustomCard>
            </CustomListItem>
          ))}
        </CustomList>
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
    </Dialog >
  );
}
