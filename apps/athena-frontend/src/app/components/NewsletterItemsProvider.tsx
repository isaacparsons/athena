import { useMemo } from 'react';
import {
    ActionBar,
    CustomContainer,
    BackButton,
    NewsletterItemsList
} from '../components';
import {
    CircularProgress,
    IconButton,
} from '@mui/material'
import { useAddItemsStore, useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { EditIcon, AddIcon, CloseIcon } from '../icons';
import { mapToArray } from '../../util';

interface NewsletterItemsProvider {
    newsletterId: number;
    parentId: number | null;
    children?: React.ReactNode;
}

export function NewsletterItemsProvider({ newsletterId, parentId, children }: NewsletterItemsProvider) {
    const { loading, newsletterItems, editing, setEditing } = useStore(
        useShallow((state) => ({
            // newsletters: state.newsletters.data,
            loading: state.newsletters.loading,
            newsletterItems: state.newsletterItems.data,
            editing: state.newsletterItems.editing,
            setEditing: state.newsletterItems.setEditing
        }))
    );

    const { openDialog } = useAddItemsStore(
        useShallow((state) => ({ openDialog: state.openDialog }))
    );

    const items = useMemo(() =>
        mapToArray(newsletterItems).filter((i) => i.newsletterId === newsletterId), [newsletterId, newsletterItems]);

    const handleOpenMediaItemsDialog = () => {
        const lastItem = items.find(
            (i) => i.nextItemId === null
        )
        openDialog({
            newsletterId: newsletterId,
            parentId: null,
            previousItemId: lastItem?.id ?? null,
            nextItemId: null,
        });
    };

    if (loading) return <CircularProgress />;

    return (
        <>
            <ActionBar backBtn={<BackButton />}>
                {!editing && <IconButton size="large" onClick={handleOpenMediaItemsDialog}>
                    <AddIcon htmlColor="#fff" fontSize="inherit" />
                </IconButton>}
                <IconButton size="large" onClick={() => setEditing(!editing)}>
                    {editing ? <CloseIcon sx={{ color: 'secondary.light' }} /> :
                        <EditIcon htmlColor="#fff" fontSize="inherit" />}
                </IconButton>
            </ActionBar>
            <CustomContainer>
                {children}
                <NewsletterItemsList
                    parentId={parentId}
                    newsletterId={newsletterId}
                    items={items}
                />
            </CustomContainer>
        </>
    );
}
