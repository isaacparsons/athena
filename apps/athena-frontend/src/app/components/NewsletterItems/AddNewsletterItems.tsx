import _ from 'lodash'
import { Button, ButtonGroup } from "@mui/material";
import { useRef, useState } from "react";
import { StoreAddNewsletterItem, StoreAddNewsletterItemInput } from "@athena/store";
import { DeepPartial, LocationInput as ILocationInput, NewsletterItemTypeName, range, mimeTypeToMediaFormat } from "@athena/common";
import { CustomList, CustomListItem, LocationDialog, LocationInput, AddItemCard, AddItemFromTemplateDialog } from "@athena/components";
import { MediaIcon, TemplateIcon, TextIcon } from "@athena/icons";

interface AddNewsletterItemsProps {
    handleItemClick: (id: string) => void;
    parentItem: StoreAddNewsletterItem | null;
    items: StoreAddNewsletterItem[];
    addItems: (parentId: string | null, items: StoreAddNewsletterItemInput[]) => void;
    removeItem: (id: string) => void;
    updateItemDetails: <T extends NewsletterItemTypeName = NewsletterItemTypeName>(
        id: string,
        item: DeepPartial<StoreAddNewsletterItemInput<T>>
    ) => void;
}

export function AddNewsletterItems({ parentItem, handleItemClick, items, addItems, removeItem, updateItemDetails }: AddNewsletterItemsProps) {
    const [
        createItemFromTemplateDialogOpen,
        setCreateItemFromTemplateDialogOpen,
    ] = useState(false);
    const handleOpenCreateItemFromTemplateDialog = () => setCreateItemFromTemplateDialogOpen(true);
    const handleCloseCreateItemFromTemplateDialog = () => setCreateItemFromTemplateDialogOpen(false);

    const [locationDialogOpen, setLocationDialogOpen] = useState(false);
    const handleCloseLocationDialog = () => setLocationDialogOpen(false);
    const handleOpenLocationDialog = () => setLocationDialogOpen(true);

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
        addItems(parentItem?.temp.id ?? null, files);
    };

    const handleAddTextItem = () =>
        addItems(parentItem?.temp.id ?? null, [
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

    const handleLocationChange = (location: ILocationInput) => {
        if (parentItem) updateItemDetails(parentItem.temp.id, { location })
        handleCloseLocationDialog()
    }

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
            <LocationDialog open={locationDialogOpen} onClose={handleCloseLocationDialog} onSave={handleLocationChange} />
            {parentItem && <LocationInput
                onClick={handleOpenLocationDialog}
                location={parentItem.location}
            />}
            <CustomList >
                {items.map((item) => (
                    <CustomListItem id={item.temp.id} key={item.temp.id}>
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

            <AddItemFromTemplateDialog
                parentId={parentItem?.temp.id ?? null}
                open={createItemFromTemplateDialogOpen}
                onClose={handleCloseCreateItemFromTemplateDialog}
            />
        </>

    )
}
