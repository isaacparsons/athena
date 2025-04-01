import {
  CreateManyNewsletterPosts,
  DeleteBatchInput,
  mimeTypeToMediaFormat,
  NewsletterPost,
  NewsletterPostTypeName,
  UpdateNewsletterPosts,
  TempNodePosition,
  PostDetailsInput,
  CreateTemplate,
  CreateNewsletterPost,
  CreateTemplateNode,
} from '@athena/common';
import { useMemo, useRef, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useNewsletterPosts, useSelectItems } from '@athena/hooks';
import {
  CustomCardHeader,
  createStyledIcon,
  StyledDialog,
  StyledFab,
  FileSelection,
  AddNewsletterPostButton,
  NewsletterPostsList,
  NewsletterPostsListItem,
  EditingHeader,
  NewsletterPostsController,
  // Post,
} from '@athena/components';
import { ArrowBackIcon, CheckIcon, DeleteIcon, TemplateIcon } from '@athena/icons';

import { toTemplateNodes } from '../../../util';
import { Checkbox, Stack } from '@mui/material';
import { Post } from '../../types';

//   type CreateTemplate = {
//     type: TemplateType;
//     name: string;
//     config: Record<string, string>;
//     nodes: {
//         data: Record<string, string>;
//         tempPosition: {
//             id: string;
//             parentId: string | null;
//             nextId: string | null;
//             prevId: string | null;
//         };
//     }[];
// }

const Delete = createStyledIcon(DeleteIcon);

type Template = Omit<CreateNewsletterPost, 'newsletterId'>;

interface CreateTemplateDialogProps {
  newsletterId: number;
  posts: Post[];
}

const BackButton = createStyledIcon(ArrowBackIcon);

export function CreateTemplateDialog(props: CreateTemplateDialogProps) {
  const { posts, newsletterId } = props;

  //   const nodes = useMemo(() => toTemplateNodes(posts), [posts]);

  const [parent, setParent] = useState<null | Post>(null);
  const inputFile = useRef<HTMLInputElement | null>(null);

  //   const { fields, handleSubmit, reset, insert, update, remove } = useNewsletterPosts(
  //     newsletterId,
  //     parent,
  //     posts
  //   );

  //   const { selected, handleSelect, allSelected, handleSelectAll } = useSelectItems(
  //     fields,
  //     'tempPosition.id'
  //   );

  const handleFileAdded = (file: File) => {
    //   insert(fields.length, {
    //     ...createNewPost(
    //       fields,
    //       newsletterId,
    //       {
    //         // date: new Date(file.lastModified).toISOString(),
    //         type: NewsletterPostTypeName.Media,
    //         caption: '',
    //         name: '',
    //         format: mimeTypeToMediaFormat(file.type),
    //         fileName: URL.createObjectURL(file),
    //       },
    //       fields.length.toString(),
    //       parent?.tempPosition.id ?? null
    //     ),
    //     file,
    //   });
  };

  const hasChanged = true;
  // useMemo(
  //   () => existingPosts.length !== fields.length,
  //   [fields, existingPosts]
  // );

  const handleAddTextItem = () => {
    //   insert(
    //     fields.length,
    //     createNewPost(
    //       fields,
    //       newsletterId,
    //       {
    //         type: NewsletterPostTypeName.Text,
    //         name: '',
    //         link: null,
    //         description: null,
    //       },
    //       fields.length.toString(),
    //       parent?.tempPosition.id ?? null
    //     )
    //   );
  };

  const handleAddMediaItem = () => {
    if (inputFile.current) inputFile.current.click();
  };

  //   const handleOpenPostDetails = (post: Post) => {
  //     createChild(post);
  //   };

  //   const handleSave: SubmitHandler<{ posts: Post[] }> = async (data) => {
  //     console.log(toTemplateNodes(data.posts));
  //     reset();
  //   };

  const handleBack = () => {
    //   const newParent =
    //     fields.find((p) => p.tempPosition.id === parent?.tempPosition.parentId) ??
    //     null;
    //   if (newParent !== undefined) setParent(newParent);
  };

  return (
    <StyledDialog fullScreen open={posts.length > 0}>
      {/* <NewsletterPostsController 
              editing={editing}
              newsletterId={newsletter.id}
              posts={existingPosts}
              onSave={handleSavePosts}
              setCreateTemplatePosts={(p) => setCreateTemplatePosts(p)}
        /> */}
      <>
        {/* <FileSelection ref={inputFile} onFileAdded={handleFileAdded} />
        <CustomCardHeader
          left={parent === null ? null : <BackButton onClick={handleBack} />}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          p={1}
        >
          <Checkbox
            sx={{ paddingRight: 2, width: 25 }}
            edge="end"
            onChange={() => handleSelectAll()}
            checked={allSelected}
          />
          {selected.size > 0 && (
            <Stack direction="row">
              <Delete sx={{ m: 0.3, height: 30, width: 30, borderRadius: 15 }} />
            </Stack>
          )}
        </Stack>
        <NewsletterPostsList
          posts={fields}
          parent={parent}
          render={(value) => (
            <NewsletterPostsListItem
              value={value}
              editing={true}
              handleSelect={handleSelect}
              selected={selected}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
              handleOpenPostDetails={handleOpenPostDetails}
            />
          )}
        />
        <AddNewsletterPostButton
          handleAddTextItem={handleAddTextItem}
          handleAddMediaItem={handleAddMediaItem}
        />
        <StyledFab disabled={!hasChanged} onClick={handleSubmit(handleSave)}>
          <CheckIcon sx={{ color: 'white' }} />
        </StyledFab> */}
      </>
    </StyledDialog>
  );
}
