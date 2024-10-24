import _ from 'lodash';
import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { StoreNewsletterItem, useStore } from '../store';
import { useEffect } from 'react';
import {
  CreateNewsletterItemTemplateInput,
  NewsletterItemType,
  postNewsletterItemTemplateInput,
} from '@athena/athena-common';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useShallow } from 'zustand/react/shallow';
import { usePromiseWithNotification } from '../hooks/usePromiseWithNotification';

interface AddItemTemplateDialog {
  open: boolean;
  handleClose: () => void;
  items: StoreNewsletterItem[];
}

const convertToTemplateItems = (items: StoreNewsletterItem[]) => {
  return items.map((i) => {
    const parent = items.find((item) => item.childrenIds.includes(i.id));
    return {
      temp: {
        id: i.id,
        parentId: parent ? parent.id : null,
        nextId: i.nextItemId,
        prevId: i.previousItemId,
      },
      data: _.omit(i.details, ['id']),
    };
  });
};

export function AddItemTemplateDialog(props: AddItemTemplateDialog) {
  const { open, handleClose, items } = props;
  const promiseWithNotifications = usePromiseWithNotification();
  const { saveTemplate } = useStore(
    useShallow((state) => ({
      saveTemplate: state.newsletterItemTemplates.save,
    }))
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    control,
  } = useForm<CreateNewsletterItemTemplateInput>({
    resolver: zodResolver(postNewsletterItemTemplateInput),
    defaultValues: {
      name: '',
      data: [],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'data',
    }
  );

  useEffect(() => {
    if (items.length > 0) {
      reset({
        name: '',
        data: convertToTemplateItems(items),
      });
    }
  }, [items, reset]);

  const handleSaveTemplate: SubmitHandler<
    CreateNewsletterItemTemplateInput
  > = async (data) => {
    promiseWithNotifications.execute(saveTemplate(data), {
      successMsg: 'Templated created!',
      errorMsg: 'Unable to create Template :(',
      onSuccess: (templateId) => {
        reset({ name: '', data: [] });
        handleClose();
        // TODO: should this navigate to newly created template?
      },
    });
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <DialogTitle>Add Template</DialogTitle>
      <TextField
        required
        margin="dense"
        label="Name"
        type="text"
        fullWidth
        variant="standard"
        {...register(`name`)}
      />
      <DialogContent>
        <Card>
          {fields.map((field, index) => {
            if (field.data?.type === NewsletterItemType.media) {
              return (
                <Stack key={field.id}>
                  <TextField
                    required
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    {...register(`data.${index}.data.name`)}
                  />
                  <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    {...register(`data.${index}.data.caption`)}
                  />
                </Stack>
              );
            } else if (field.data?.type === NewsletterItemType.text) {
              return (
                <Stack key={field.id}>
                  <TextField
                    required
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    {...register(`data.${index}.data.name`)}
                  />
                  <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    {...register(`data.${index}.data.description`)}
                  />
                  <TextField
                    margin="dense"
                    label="Link"
                    type="text"
                    fullWidth
                    variant="standard"
                    {...register(`data.${index}.data.link`)}
                  />
                </Stack>
              );
            } else {
              return null;
            }
          })}
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit(handleSaveTemplate)}>
          {isSubmitting ? <CircularProgress /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
