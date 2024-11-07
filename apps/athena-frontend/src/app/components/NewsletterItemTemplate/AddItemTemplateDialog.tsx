import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from '@mui/material';
import { StoreAddNewsletterItem, StoreAddNewsletterItemInput, StoreNewsletterItem, traverseItemIds, useStore } from '../../store';
import { useShallow } from 'zustand/react/shallow';
import {
  DeepPartial,
  NewsletterItemTypeName,
} from '@athena/athena-common';
import { usePromiseWithNotification } from '../../hooks';
import { convertToEditableItems, mapToArray } from '../../../util';
import { AddNewsletterItems } from '..';
import { nanoid } from 'nanoid';
import { ActionBar, BackButtonIcon } from '../common';


interface AddItemTemplateDialog {
  open: boolean;
  handleClose: () => void;
  items: StoreNewsletterItem[];
}

const defaultTemplate = { name: '', items: [] }

export function AddItemTemplateDialog({ open, handleClose, items }: AddItemTemplateDialog) {

  const promiseWithNotifications = usePromiseWithNotification();
  const { newsletterItems } = useStore(
    useShallow((state) => ({
      newsletterItems: state.newsletterItems.data,
    }))
  );
  const { saveTemplate } = useStore(
    useShallow((state) => ({
      saveTemplate: state.newsletterItemTemplates.save,
    }))
  );

  const [template, setTemplate] = useState<{
    name: string;
    items: StoreAddNewsletterItem<NewsletterItemTypeName | undefined>[]
  }>(defaultTemplate);


  useEffect(() => {
    if (items.length > 0) {
      const parentIds = items.map((i) => i.id)
      const ids = traverseItemIds(newsletterItems, parentIds, parentIds);
      const allItems = mapToArray(newsletterItems).filter((i) => ids.includes(i.id));
      setTemplate({ name: '', items: convertToEditableItems(allItems) })
    }
  }, [items, setTemplate, newsletterItems]);

  const [tempParentId, setTempParentId] = useState<null | string>(null);
  const [saving, setSaving] = useState(false);
  const handleItemClick = (id: string) => setTempParentId(id);

  const handleBackBtnClick = () => {
    const item = template.items.find((i) => i.temp.id === tempParentId);
    const nextParentId = item?.temp.parentId
    setTempParentId((prev) => (nextParentId === undefined ? prev : nextParentId));
  };

  const itemsArr = useMemo(
    () => template.items.filter((i) => i.temp.parentId === tempParentId),
    [template, tempParentId])

  const handleAddItems = (parentId: string | null, items: StoreAddNewsletterItemInput[]) => {
    setTemplate((prev) => {
      const _items = items.map((i) => {
        const id = nanoid();
        const previousItem = prev.items.find((i) => i.temp.parentId === parentId && i.temp.nextId === null);
        return {
          ...i,
          temp: {
            id,
            nextId: null,
            prevId: previousItem?.temp.id ?? null,
            parentId: parentId,
          },
        }
      })
      return {
        ...prev,
        items: _items.map((i) => {
          const nextItem = _items.find((i) => i.temp.prevId === i.temp.id);
          if (nextItem) return { ...i, temp: { ...i.temp, nextId: nextItem.temp.id } }
          return i
        })
      }
    })
  }

  const handleRemoveItem = (id: string) => {
    setTemplate((prev) => {
      return {
        ...prev,
        items: prev.items.filter((i) => i.temp.id !== id)
      }
    })
  }

  const handleUpdateItem = <T extends NewsletterItemTypeName = NewsletterItemTypeName>(
    id: string,
    item: DeepPartial<StoreAddNewsletterItemInput<T>>) => {
    setTemplate((prev) => ({
      ...prev,
      items: prev.items.map((i) => i.temp.id === id ? { ...i, details: _.merge(_.cloneDeep(i.details), item.details) } : i
      )
    }
    ))
  }

  const handleSaveTemplate = async () => {
    setSaving(true)
    promiseWithNotifications.execute(saveTemplate({
      name: template.name,
      data: template.items.map((i) => ({ temp: i.temp, data: i.details }))
    }), {
      successMsg: 'Templated created!',
      errorMsg: 'Unable to create Template :(',
      onSuccess: (templateId) => {
        setSaving(false)
        setTemplate(defaultTemplate)
        handleClose();
      },
    });
  };


  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <ActionBar
        title="Add Template"
        backBtn={
          tempParentId !== null ? (
            <BackButtonIcon onClick={handleBackBtnClick} />
          ) : null
        }
      />
      <TextField
        required
        margin="dense"
        label="Name"
        type="text"
        fullWidth
        variant="standard"
      />
      <DialogContent>
        <AddNewsletterItems
          handleItemClick={handleItemClick}
          parentId={tempParentId}
          items={itemsArr}
          addItems={handleAddItems}
          removeItem={handleRemoveItem}
          updateItemDetails={handleUpdateItem}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={handleSaveTemplate}>
          {saving ? <CircularProgress /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
