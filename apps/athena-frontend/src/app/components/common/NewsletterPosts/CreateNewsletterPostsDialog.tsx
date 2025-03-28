import _ from 'lodash';
import {
  CreateNewsletterPost,
  MediaFormat,
  NewsletterPostTypeName,
  NodePositionInput,
} from '@athena/common';
import {
  AddNewsletterPostButton,
  CustomCardFooter,
  CustomCardHeader,
  NewsletterPostDetailsContent,
  NewsletterPostProperties,
  NewsletterPostsList,
  StyledCard,
  StyledDialog,
} from '@athena/components';
import { createStyledIcon } from '../Styled/createStyledIcon';
import { CloseIcon, CheckIcon, ArrowForwardIcon } from '@athena/icons';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, DialogContent, List, ListItem } from '@mui/material';
import { z } from 'zod';
import { useMemo, useState } from 'react';

interface CreateNewsletterPostsProps {
  newsletterId: number;
  nodePosition: NodePositionInput;
  onClose: () => void;
  onCreate: (post: CreateNewsletterPost) => void;
}

const DEFAULT_POST = {
  title: '',
  date: null,
  details: { type: NewsletterPostTypeName.Text, name: '' },
  tempPosition: {
    id: '0',
    parentId: null,
    nextId: null,
    prevId: null,
  },
} as const;

const createNewPost = (
  existing: CreateNewsletterPost[],
  content: Pick<CreateNewsletterPost, 'details' | 'newsletterId'>,
  id: string,
  parentId?: string
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

const Close = createStyledIcon(CloseIcon);
const Check = createStyledIcon(CheckIcon);
const DetailsCard = createStyledIcon(ArrowForwardIcon);

export function CreateNewsletterPostsDialog(props: CreateNewsletterPostsProps) {
  // const { newsletterId, onClose, onCreate, nodePosition } = props;

  // const [currentParent, setCurrentParent] = useState<CreateNewsletterPostChild>({
  //   ...DEFAULT_POST,
  //   newsletterId,
  // });
  // const [selectedPosts, setSelectedPosts] = useState(new Set<string>());

  // const {
  //   control,
  //   watch,
  //   handleSubmit,
  //   reset,
  //   // formState: { errors, isValid, isSubmitting },
  // } = useForm<{ posts: CreateNewsletterPostChild[] }>({
  //   resolver: zodResolver(z.array(createNewsletterPostChild)),
  //   defaultValues: { posts: [{ ...DEFAULT_POST, newsletterId }] },
  //   // mode: 'onChange',
  // });

  // const { fields, remove, move, insert } = useFieldArray({
  //   name: 'posts',
  //   control,
  // });

  // const postsAtCurrentDepth = useMemo(
  //   () =>
  //     fields.filter(
  //       (p) => p.tempPosition.parentId === currentParent.tempPosition.id
  //     ),
  //   [JSON.stringify(currentParent), JSON.stringify(fields)]
  // );

  // const watchFieldArray = watch('posts');
  // console.log({ watchFieldArray, postsAtCurrentDepth, currentParent });

  // const handleClose = () => {
  //   reset();
  //   onClose();
  // };

  // const handleAddTextItem = () => {
  //   insert(
  //     fields.length,
  //     createNewPost(
  //       fields,
  //       {
  //         newsletterId,
  //         details: {
  //           type: NewsletterPostTypeName.Text,
  //           name: '',
  //         },
  //       },
  //       fields.length.toString(),
  //       currentParent.tempPosition.id
  //     )
  //   );
  // };

  // const handleAddMediaItem = () => {
  //   insert(
  //     fields.length,
  //     createNewPost(
  //       fields,
  //       {
  //         newsletterId,
  //         details: {
  //           type: NewsletterPostTypeName.Media,
  //           name: '',
  //           format: MediaFormat.Image,
  //           fileName: 'https://picsum.photos/1000/1000',
  //         },
  //       },
  //       fields.length.toString(),
  //       currentParent.tempPosition.id
  //     )
  //   );
  // };

  // const handleRemove = (id: string) => {
  //   const postIdx = fields.findIndex((p) => p.tempPosition.id === id);
  //   if (postIdx > -1) remove(postIdx);
  // };

  // const handleSelect = (id: string) => {
  //   selectedPosts.delete(id);
  //   setSelectedPosts(selectedPosts);
  // };

  // const handleSave: SubmitHandler<{ posts: CreateNewsletterPostChild[] }> = async (
  //   data
  // ) => {
  //   const [parent, children] = _.partition(
  //     data.posts,
  //     (p) => p.tempPosition.parentId === null
  //   );
  //   if (parent.length === 1) {
  //     const { details } = parent[0];
  //     onCreate({
  //       newsletterId,
  //       title: '',
  //       date: null,
  //       details,
  //       position: nodePosition,
  //       children,
  //     });
  //   }
  // };

  // const handleCreateChild = (post: CreateNewsletterPostChild) => {
  //   insert(
  //     fields.length,
  //     createNewPost(
  //       fields,
  //       {
  //         newsletterId,
  //         details: {
  //           type: NewsletterPostTypeName.Text,
  //           name: '',
  //         },
  //       },
  //       fields.length.toString(),
  //       post.tempPosition.id
  //     )
  //   );
  //   setCurrentParent(post);
  // };

  return (
    <StyledDialog sx={{ p: 1 }} open={true}>
      <></>
      {/* <DialogContent>
        <NewsletterPostProperties
          editing={true}
          data={currentParent}
          onChange={() => console.log('hi')}
        />
        <NewsletterPostsList
          parent={currentParent}
          setParent={setCurrentParent}
          newsletterId={newsletterId}
          nodePosition={nodePosition}
          onCreate={onCreate}
          editing={true}
          selected={selectedPosts}
          setSelected={setSelectedPosts}
        />
        {/* <List dense sx={{ width: '100%' }}>
          {postsAtCurrentDepth.map((value) => (
            <ListItem key={value.tempPosition.id.toString()} disablePadding>
              <StyledCard>
                <CustomCardHeader
                  left={
                    <Checkbox
                      sx={{ paddingRight: 2 }}
                      edge="end"
                      onChange={() => handleSelect(value.tempPosition.id)}
                      checked={selectedPosts.has(value.tempPosition.id)}
                    />
                  }
                  right={
                    <Close onClick={() => handleRemove(value.tempPosition.id)} />
                  }
                />
                <NewsletterPostDetailsContent editing={true} data={value.details} />
                <CustomCardFooter
                  right={<DetailsCard onClick={() => handleCreateChild(value)} />}
                />
              </StyledCard>
            </ListItem>
          ))}
        </List> 
        <AddNewsletterPostButton
          handleAddTextItem={handleAddTextItem}
          handleAddMediaItem={handleAddMediaItem}
        />
        <CustomCardFooter right={<Check onClick={handleSubmit(handleSave)} />} />
      </DialogContent> */}
    </StyledDialog>
  );
}
