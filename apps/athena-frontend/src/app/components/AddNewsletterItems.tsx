import _ from 'lodash'
import { StoreAddNewsletterItem, StoreAddNewsletterItemInput } from "../store";
import { useRef, useState } from "react";
import { DeepPartial, MediaFormat, NewsletterItemTypeName, range } from "@athena/athena-common";
import { CustomList, CustomListItem } from "./common";
import { AddItemCard } from "./AddItemCard";
import { Button, ButtonGroup } from "@mui/material";
import { MediaIcon, TemplateIcon, TextIcon } from "../icons";
import { CreateItemFromTemplateDialog } from "./CreateItemFromTemplateDialog";
import { mimeTypeToMediaFormat } from '../../util';

interface AddNewsletterItemsProps {
    handleItemClick: (id: string) => void;
    parentId: string | null;
    items: StoreAddNewsletterItem[];
    addItems: (parentId: string | null, items: StoreAddNewsletterItemInput[]) => void;
    removeItem: (id: string) => void;
    updateItemDetails: <T extends NewsletterItemTypeName = NewsletterItemTypeName>(
        id: string,
        item: DeepPartial<StoreAddNewsletterItemInput<T>>
    ) => void;
}

export function AddNewsletterItems({ parentId, handleItemClick, items, addItems, removeItem, updateItemDetails }: AddNewsletterItemsProps) {
    const [
        createItemFromTemplateDialogOpen,
        setCreateItemFromTemplateDialogOpen,
    ] = useState(false);

    const handleOpenCreateItemFromTemplateDialog = () =>
        setCreateItemFromTemplateDialogOpen(true);

    const handleCloseCreateItemFromTemplateDialog = () =>
        setCreateItemFromTemplateDialogOpen(false);

    const inputFile = useRef<HTMLInputElement | null>(null);

    const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const _files = event.target.files;
        if (!_files) return;
        const files = range(_files.length)
            .map((idx) => _files.item(idx))
            .filter((f) => !_.isNil(f))
            .map((f) => ({
                title: '',
                date: new Date(f.lastModified).toISOString(),
                location: undefined,
                details: {
                    name: f.name,
                    caption: '',
                    type: NewsletterItemTypeName.Media,
                    fileName: '',
                    file: f,
                    format: mimeTypeToMediaFormat(f.type)
                },
            }));

        console.log('files', files)

        addItems(parentId, files);
    };

    const handleAddTextItem = () =>
        addItems(parentId, [
            {
                title: '',
                date: new Date().toISOString(),
                location: undefined,
                details: {
                    name: '',
                    type: NewsletterItemTypeName.Text,
                },
            },
        ]);

    const handleAddMediaItem = () => {
        if (inputFile.current) inputFile.current.click();
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
            <CustomList >
                {items.map((item) => (
                    <CustomListItem id={item.temp.id}>
                        <AddItemCard
                            item={item}
                            removeItem={removeItem}
                            updateItemDetails={updateItemDetails}
                            onClick={() => handleItemClick(item.temp.id)}
                        />
                    </CustomListItem>
                ))}
            </CustomList>

            <ButtonGroup>
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

            <CreateItemFromTemplateDialog
                parentId={parentId}
                open={createItemFromTemplateDialogOpen}
                onClose={handleCloseCreateItemFromTemplateDialog}
            />
        </>

    )
}
