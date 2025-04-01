import {
  CreateManyNewsletterPosts,
  CreateNewsletterPost,
  DeleteBatchInput,
  mimeTypeToMediaFormat,
  NewsletterPost,
  NewsletterPostDetails,
  NewsletterPostTypeName,
  UpdateNewsletterPosts,
  TempNodePosition,
} from '@athena/common';
import { useMemo, useRef, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { FileMap } from '@athena/store';
import { useSelectItems } from '@athena/hooks';
import {
  CustomCardFooter,
  CustomCardHeader,
  createStyledIcon,
  StyledDialog,
  StyledFab,
  FileSelection,
  AddNewsletterPostButton,
  NewsletterPostDetailsContent,
  NewsletterPostsList,
} from '@athena/components';
import { Checkbox, Stack } from '@mui/material';
import {
  TemplateIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
} from '@athena/icons';
import {
  createNewPost,
  formatCreatedPosts,
  formatDeletedPosts,
  formatUpdatedPosts,
  postsToTempPosts,
} from './util';

interface NewsletterPostsControllerProps {
  newsletterId: number;
  existingPosts: NewsletterPost[];
  onSave?: (changes: NewsletterPostChanges) => void;
  editing?: boolean;
}

export type NewsletterPostChanges = {
  create?: CreateManyNewsletterPosts;
  update?: UpdateNewsletterPosts;
  delete?: DeleteBatchInput;
  files?: FileMap;
};

export type Post = Partial<Omit<NewsletterPost, 'details'>> & {
  details: Omit<NewsletterPostDetails, 'id' | 'newsletterPostId'>;
  tempPosition: TempNodePosition;
  file?: File;
};

const Close = createStyledIcon(CloseIcon);
const DetailsCard = createStyledIcon(ArrowForwardIcon);
const BackButton = createStyledIcon(ArrowBackIcon);
const Delete = createStyledIcon(DeleteIcon);
const CreateTemplate = createStyledIcon(TemplateIcon);

export function NewsletterPostsController(props: NewsletterPostsControllerProps) {
  const { existingPosts, newsletterId, editing, onSave } = props;

  const { posts } = useMemo(() => postsToTempPosts(existingPosts), [existingPosts]);

  const [parent, setParent] = useState<null | Post>(null);
  const inputFile = useRef<HTMLInputElement | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    // formState: { errors, isValid, isSubmitting },
  } = useForm<{ posts: Post[] }>({
    // resolver: zodResolver(z.array(createNewsletterPostChild)),
    defaultValues: { posts },
    // mode: 'onChange',
  });

  const { fields, remove, insert, update } = useFieldArray({
    name: 'posts',
    control,
  });

  const { selected, handleSelect, allSelected, handleSelectAll } = useSelectItems(
    fields,
    'tempPosition.id'
  );

  const handleFileAdded = (file: File) => {
    insert(fields.length, {
      ...createNewPost(
        fields,
        {
          newsletterId,
          // date: new Date(file.lastModified).toISOString(),
          details: {
            type: NewsletterPostTypeName.Media,
            caption: '',
            name: '',
            format: mimeTypeToMediaFormat(file.type),
            fileName: URL.createObjectURL(file), //'https://picsum.photos/1000/1000',
          },
        },
        fields.length.toString(),
        parent?.tempPosition.id ?? null
      ),
      file,
    });
  };

  const hasChanged = useMemo(
    () => existingPosts.length !== fields.length,
    [fields, existingPosts]
  );

  const handleAddTextItem = () => {
    insert(
      fields.length,
      createNewPost(
        fields,
        {
          newsletterId,
          details: {
            type: NewsletterPostTypeName.Text,
            name: '',
            link: null,
            description: null,
          },
        },
        fields.length.toString(),
        parent?.tempPosition.id ?? null
      )
    );
  };

  const handleAddMediaItem = () => {
    if (inputFile.current) inputFile.current.click();
  };

  const handleRemove = (id: string) => {
    const postIdx = fields.findIndex((p) => p.tempPosition.id === id);
    if (postIdx > -1) remove(postIdx);
  };

  const handleUpdate = (id: string, change: Partial<Post>) => {
    const postIdx = fields.findIndex((p) => p.tempPosition.id === id);
    if (postIdx > -1)
      update(postIdx, {
        ...fields[postIdx],
        ...change,
      });
  };

  const handleOpenPostDetails = (post: Post) => {
    if (editing) createChild(post);
  };

  const createChild = (post: Post) => {
    const hasChildren = fields.find(
      (p) => p.tempPosition.parentId === post.tempPosition.id
    );
    if (!hasChildren) {
      insert(
        fields.length,
        createNewPost(
          fields,
          {
            newsletterId,
            details: {
              type: NewsletterPostTypeName.Text,
              name: '',
            },
          },
          fields.length.toString(),
          post.tempPosition.id ?? null
        )
      );
    }
    setParent(post);
  };

  const handleSave: SubmitHandler<{ posts: Post[] }> = async (data) => {
    const files = data.posts.reduce((prev, curr) => {
      if (curr.file !== undefined) prev[curr.tempPosition.id] = curr.file;
      return prev;
    }, {} as FileMap);

    if (onSave)
      onSave({
        create: formatCreatedPosts(newsletterId, posts, data.posts),
        update: formatUpdatedPosts(newsletterId, posts, data.posts),
        delete: formatDeletedPosts(posts, data.posts),
        files,
      });
    reset();
  };

  const handleBack = () => {
    const newParent =
      fields.find((p) => p.tempPosition.id === parent?.tempPosition.parentId) ??
      null;
    if (newParent !== undefined) setParent(newParent);
  };

  return (
    <WithDialog parent={parent}>
      <>
        <FileSelection ref={inputFile} onFileAdded={handleFileAdded} />
        <CustomCardHeader
          left={parent === null ? null : <BackButton onClick={handleBack} />}
        />
        <EditingHeader
          enabled={fields.length > 0}
          editing={Boolean(editing)}
          selected={selected}
          allSelected={allSelected}
          handleSelectAll={handleSelectAll}
        />
        <NewsletterPostsList
          posts={fields}
          parent={parent}
          render={(value) => (
            <NewsletterPostsListItem
              value={value}
              editing={Boolean(editing)}
              handleSelect={handleSelect}
              selected={selected}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
              handleOpenPostDetails={handleOpenPostDetails}
            />
          )}
        />
        {editing && (
          <AddNewsletterPostButton
            handleAddTextItem={handleAddTextItem}
            handleAddMediaItem={handleAddMediaItem}
          />
        )}
        {editing && (
          <StyledFab disabled={!hasChanged} onClick={handleSubmit(handleSave)}>
            <CheckIcon sx={{ color: 'white' }} />
          </StyledFab>
        )}
      </>
    </WithDialog>
  );
}
function WithDialog<T>({
  parent,
  children,
}: {
  parent: T | null;
  children: React.ReactNode;
}) {
  if (parent !== null) {
    return (
      <StyledDialog fullScreen open={true}>
        {children}
      </StyledDialog>
    );
  } else return children;
}

interface EditingHeaderProps {
  enabled: boolean;
  editing: boolean;
  allSelected: boolean;
  selected: Set<string>;
  handleSelectAll: () => void;
}

function EditingHeader(props: EditingHeaderProps) {
  const { editing, allSelected, enabled, handleSelectAll, selected } = props;
  if (!editing || !enabled) return null;

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" p={1}>
      <Checkbox
        sx={{ paddingRight: 2, width: 25 }}
        edge="end"
        onChange={() => handleSelectAll()}
        checked={allSelected}
      />
      {selected.size > 0 && (
        <Stack direction="row">
          <Delete sx={{ m: 0.3, height: 30, width: 30, borderRadius: 15 }} />
          <CreateTemplate sx={{ m: 0.3, height: 30, width: 30, borderRadius: 15 }} />
        </Stack>
      )}
    </Stack>
  );
}

interface NewsletterPostsListItemProps {
  editing: boolean;
  selected: Set<string>;
  value: Post;
  handleSelect: (id: string) => void;
  handleRemove: (id: string) => void;
  handleUpdate: (id: string, change: Partial<Post>) => void;
  handleOpenPostDetails: (post: Post) => void;
}

function NewsletterPostsListItem(props: NewsletterPostsListItemProps) {
  const {
    editing,
    selected,
    value,
    handleSelect,
    handleRemove,
    handleUpdate,
    handleOpenPostDetails,
  } = props;

  return (
    <>
      <CustomCardHeader
        left={
          editing ? (
            <Checkbox
              edge="end"
              onChange={() => handleSelect(value.tempPosition.id)}
              checked={selected.has(value.tempPosition.id)}
            />
          ) : null
        }
        right={
          editing ? (
            <Close onClick={() => handleRemove(value.tempPosition.id)} />
          ) : null
        }
      />
      {value.details && (
        <NewsletterPostDetailsContent
          editing={editing}
          data={value.details}
          onChange={(details) => {
            handleUpdate(value.tempPosition.id, { details });
          }}
        />
      )}
      <CustomCardFooter
        right={<DetailsCard onClick={() => handleOpenPostDetails(value)} />}
      />
    </>
  );
}
