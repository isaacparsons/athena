import _ from 'lodash';
import { Button, ButtonGroup } from '@mui/material';
import { useRef, useState } from 'react';
import {
  NewsletterPostPostName,
  range,
  mimeTypeToMediaFormat,
  CreateLocation,
  CreateNewsletterPostBatchItem,
} from '@athena/common';
import {
  CustomList,
  CustomListItem,
  CustomLocationInput,
  AddItemCard,
  AddItemFromTemplateDialog,
} from '@athena/components';
import { MediaIcon, TemplateIcon, TextIcon } from '@athena/icons';
import {
  AddStoreNewsletterPost,
  FileMap,
  UpdateStoreNewsletterPost,
} from '@athena/store';

interface AddNewsletterPostsProps {
  files: FileMap;
  newsletterId: number;
  handleItemClick: (id: string) => void;
  parentItem: CreateNewsletterPostBatchItem | null;
  items: CreateNewsletterPostBatchItem[];
  addItem: AddStoreNewsletterPost;
  removeItem: (id: string) => void;
  updateItemDetails: UpdateStoreNewsletterPost;
}

export function AddNewsletterPosts({
  files,
  newsletterId,
  parentItem,
  handleItemClick,
  items,
  addItem,
  removeItem,
  updateItemDetails,
}: AddNewsletterPostsProps) {
  const [createItemFromTemplateDialogOpen, setCreateItemFromTemplateDialogOpen] =
    useState(false);
  const handleOpenCreateItemFromTemplateDialog = () =>
    setCreateItemFromTemplateDialogOpen(true);
  const handleCloseCreateItemFromTemplateDialog = () =>
    setCreateItemFromTemplateDialogOpen(false);

  const inputFile = useRef<HTMLInputElement | null>(null);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _files = event.target.files;
    if (!_files || _files.length === 0) return;

    range(_files.length).forEach((f) => {
      const file = _files.item(f);
      if (!file) return;
      addItem(
        parentItem?.temp.id ?? null,
        {
          newsletterId,
          title: '',
          date: new Date(file.lastModified).toISOString(),
          location: undefined,
          details: {
            name: file.name,
            caption: '',
            type: NewsletterPostPostName.Media,
            fileName: '',
            format: mimeTypeToMediaFormat(file.type),
          },
        },
        { file }
      );
    });
  };

  const handleAddTextItem = () =>
    addItem(parentItem?.temp.id ?? null, {
      title: '',
      newsletterId,
      date: new Date().toISOString(),
      location: undefined,
      details: {
        name: '',
        type: NewsletterPostPostName.Text,
      },
    });

  const handleAddMediaItem = () => {
    if (inputFile.current) inputFile.current.click();
  };

  const handleLocationChange = (location: CreateLocation) => {
    if (parentItem) updateItemDetails(parentItem.temp.id, { location });
  };

  return (
    <>
      <input
        type="file"
        multiple
        ref={inputFile}
        style={{ display: 'none' }}
        name="media"
        onChange={handleFileSelection}
      />
      {parentItem && (
        <CustomLocationInput
          readonly={false}
          onChange={handleLocationChange}
          location={parentItem.location}
        />
      )}
      <CustomList>
        {items.map((item) => (
          <CustomListItem id={item.temp.id} key={item.temp.id}>
            <AddItemCard
              item={item}
              file={files[item.temp.id]}
              removeItem={removeItem}
              updateItemDetails={updateItemDetails}
              onClick={() => handleItemClick(item.temp.id)}
            />
          </CustomListItem>
        ))}
      </CustomList>

      <ButtonGroup sx={{ width: '100%', justifyContent: 'center' }}>
        <Button
          startIcon={<TemplateIcon />}
          onClick={handleOpenCreateItemFromTemplateDialog}
        >
          {'From Template'}
        </Button>
        <Button startIcon={<TextIcon />} onClick={handleAddTextItem}>
          {'Text'}
        </Button>
        <Button startIcon={<MediaIcon />} onClick={handleAddMediaItem}>
          {'Media'}
        </Button>
      </ButtonGroup>

      <AddItemFromTemplateDialog
        parentId={parentItem?.temp.id ?? null}
        open={createItemFromTemplateDialogOpen}
        onClose={handleCloseCreateItemFromTemplateDialog}
      />
    </>
  );
}
