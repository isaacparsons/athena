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
import { StoreAddNewsletterItem, StoreAddNewsletterItemInput, StoreNewsletterItem, traverseItemIds, useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import {
  CreateNewsletterItemTemplateInput,
  DeepPartial,
  NewsletterItemTypeName,
} from '@athena/athena-common';
import { usePromiseWithNotification } from '../hooks';
import { convertToTemplateItems, mapToArray } from '../../util';
import { AddNewsletterItems } from './AddNewsletterItems';
import { nanoid } from 'nanoid';
import { ActionBar, BackButtonIcon } from './common';

export const convertToItems = (items: StoreNewsletterItem[]): StoreAddNewsletterItem<NewsletterItemTypeName | undefined>[] => {
  const realIdTempIdMap: Map<number, string> = new Map(
    items.reduce((ids, i) => {
      ids.push([i.id, nanoid()]);
      if (i.nextItemId) ids.push([i.nextItemId, nanoid()]);
      if (i.previousItemId) ids.push([i.previousItemId, nanoid()]);
      if (i.parentId) ids.push([i.parentId, nanoid()]);
      return ids;
    }, [] as [number, string][])
  );

  const getTempId = (id: number) => {
    const tempId = realIdTempIdMap.get(id);
    if (!tempId) throw new Error('Invalid id');
    return tempId;
  };

  return items.map((i) => {
    const parent = items.find((item) => item.childrenIds.includes(i.id));
    return {
      title: i.title,
      date: i.date === null ? undefined : i.date,
      location: undefined, // TODO: fix this
      details: i.details?.type === 'media' ? { ...i.details, file: null } : i.details,
      temp: {
        id: getTempId(i.id),
        parentId: parent ? getTempId(parent.id) : null,
        nextId: i.nextItemId ? getTempId(i.nextItemId) : null,
        prevId: i.previousItemId ? getTempId(i.previousItemId) : null,
      },
    };
  });
};

interface AddItemTemplateDialog {
  open: boolean;
  handleClose: () => void;
  items: StoreNewsletterItem[];
  // parentId: number | null;
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
      setTemplate({ name: '', items: convertToItems(allItems) })
    }
  }, [items, setTemplate, newsletterItems]);

  const [tempParentId, setTempParentId] = useState<null | string>(null);
  const [saving, setSaving] = useState(false);
  // const templateItems = useMemo(() => convertToTemplateItems(items), [items]);
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
