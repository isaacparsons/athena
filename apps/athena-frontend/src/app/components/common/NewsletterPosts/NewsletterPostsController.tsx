import _ from 'lodash';
import {
  CreateManyNewsletterPosts,
  CreateNewsletterPost,
  DeleteBatchInput,
  mimeTypeToMediaFormat,
  NewsletterPost,
  NewsletterPostDetails,
  NewsletterPostTypeName,
  UpdateNewsletterPosts,
} from '@athena/common';
import { useMemo, useRef, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { FileMap } from '../../../store/newsletter-posts';
import { useSelectItems } from '@athena/hooks';
import { FileSelection } from './FileSelection';
import { CustomCardFooter, CustomCardHeader } from '../CustomCard';
import { Checkbox } from '@mui/material';
import { createStyledIcon, StyledDialog } from '../Styled';
import { createCustomFab } from '../Fab';
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CheckIcon,
  CloseIcon,
} from '@athena/icons';
import { AddNewsletterPostButton } from './AddNewsletterPostButton';
import { NewsletterPostDetailsContent } from './NewsletterPostCard';
import { nanoid } from 'nanoid';
import { NewsletterPostsList } from './NewsletterPostsList';

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

type Post = Partial<Omit<NewsletterPost, 'details'>> & {
  details: Omit<NewsletterPostDetails, 'id' | 'newsletterPostId'>;
  tempPosition: CreateNewsletterPost['tempPosition'];
  file?: File;
};

const Save = createCustomFab(CheckIcon);
const Close = createStyledIcon(CloseIcon);
const DetailsCard = createStyledIcon(ArrowForwardIcon);
const BackButton = createStyledIcon(ArrowBackIcon);

export function NewsletterPostsController(props: NewsletterPostsControllerProps) {
  const { existingPosts, newsletterId, editing, onSave } = props;

  const { posts } = useMemo(() => postsToTempPosts(existingPosts), [existingPosts]);
  const { selected, handleSelect } = useSelectItems();
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

  // const hasChanged = useMemo(() => {
  //   // check for created / updated posts
  // }, [fields])

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
        <NewsletterPostsList
          posts={fields}
          parent={parent}
          render={(value) => (
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
          )}
        />
        {editing && (
          <AddNewsletterPostButton
            handleAddTextItem={handleAddTextItem}
            handleAddMediaItem={handleAddMediaItem}
          />
        )}
        {editing && <Save onClick={handleSubmit(handleSave)} />}
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

const postsToTempPosts = <T extends Omit<NewsletterPost, 'children'>>(
  posts: T[]
) => {
  const existingPostsWithTempId = posts.map((p) => [nanoid(), p]) as [string, T][];

  const existingPostIdTempIdMap = new Map(
    [...existingPostsWithTempId].map(([p1, p2]) => [p2.id, p1]) as [number, string][]
  );

  const tempPosts = existingPostsWithTempId.map(([tempId, p]) => {
    return [
      tempId,
      {
        ...p,
        tempPosition: {
          id: tempId,
          parentId:
            p.position.parentId === null
              ? null
              : existingPostIdTempIdMap.get(p.position.parentId) ?? null,
          nextId:
            p.position.nextId === null
              ? null
              : existingPostIdTempIdMap.get(p.position.nextId) ?? null,
          prevId:
            p.position.prevId === null
              ? null
              : existingPostIdTempIdMap.get(p.position.prevId) ?? null,
        },
      },
    ];
  }) as [string, Post][];

  return {
    posts: tempPosts.map(([, p]) => p),
  };
};

const createNewPost = (
  existing: Post[],
  content: Pick<CreateNewsletterPost, 'details' | 'newsletterId'>,
  id: string,
  parentId: string | null
) => {
  const prev = existing.find(
    (p) => p.tempPosition.nextId === null && p.tempPosition.parentId === parentId
  );
  return {
    newsletterId: content.newsletterId,
    title: 'test 1',
    date: null,
    details: content.details,
    tempPosition: {
      parentId: parentId ?? null,
      id: id,
      nextId: null,
      prevId: prev?.tempPosition.id ?? null,
    },
  };
};

const formatCreatedPosts = (
  newsletterId: number,
  existingPosts: Post[],
  posts: Post[]
) => {
  const created = posts.filter((p) => p.position === undefined);
  const [parents, children] = _.partition(
    created,
    (p) => p.tempPosition.parentId === null
  );

  if (parents.length === 1) {
    const parent = parents[0];
    const existingParent = existingPosts.find(
      (p) => parent.tempPosition.parentId === p.tempPosition.id
    );

    return {
      newsletterId,
      position: {
        parentId:
          existingParent === undefined
            ? null
            : existingParent.position?.parentId ?? null,
        nextId: null,
      },
      posts: created.map((p) => ({
        newsletterId,
        title: p.title ?? '',
        date: p.date ?? null,
        details: p.details as NewsletterPostDetails,
        tempPosition: p.tempPosition,
        // location: p.location,
      })),
    };
  }
};

const formatUpdatedPosts = (
  newsletterId: number,
  existingPosts: Post[],
  posts: Post[]
) => {
  const notCreated = posts.filter((p) => p.position !== undefined);

  return notCreated
    .filter((p) => {
      const postBefore = existingPosts.find(
        (ep) => ep.tempPosition.id === p.tempPosition.id
      );
      return (
        postBefore !== undefined && !_.isEqual(postBefore, p) && p.id !== undefined
      );
    })
    .map((p) => ({
      id: p.id as number,
      newsletterId,
      title: p.title ?? '',
      date: p.date ?? null,
      details: p.details as NewsletterPostDetails,
      tempPosition: p.tempPosition,
      // location: p.location,
    }));
};

const formatDeletedPosts = (existingPosts: Post[], posts: Post[]) => {
  return {
    ids: _.differenceBy(existingPosts, posts, (p) => p.tempPosition.id)
      .filter((p) => p.id !== undefined)
      .map((p) => p.id as number),
  };
};
