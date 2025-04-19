import {
  AddNewsletterPostButton,
  CustomContainer,
  IdParamRouteProps,
  NewsletterPostsList,
  NewsletterPostsListItem,
  NewsletterPostsProvider,
} from '@frontend/components';
import {
  useNewsletterPostsForm,
  useParamId,
  usePromiseWithNotification,
  useSelectItems,
} from '@frontend/hooks';
import { useTemplate, useTemplates } from '@frontend/store';
import { AddIcon } from '@frontend/icons';
import { useStore } from '@frontend/store';
import { CircularProgress } from '@mui/material';
import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  fromPostsWithTempPosition,
  NewsletterPost,
  ReadTemplate,
  WithTempPosition,
} from '@athena/common';
import { templateToPosts } from '@frontend/util';
import { CreateNewsletterPostForm, NewsletterPostForm } from '@frontend/types';
import _ from 'lodash';

export function TemplateRoute({ id }: IdParamRouteProps) {
  const { loading, template } = useTemplate(id);

  if (loading || !template) return <CircularProgress />;
  return <Template template={template} />;
}

interface TemplateProps {
  template: ReadTemplate;
}

// type CreateTemplate = {
//   config: Record<string, string>;
//   name: string;
//   type: TemplateType;
//   nodes: {
//       data: Record<string, string>;
//       tempPosition: {
//           id: string;
//           parentId: string | null;
//           nextId: string | null;
//           prevId: string | null;
//       };
//   }[];
// }

// type UpdateTemplate = {
//   id: number;
//   nodes: { ... 4 more }[];
//   config: Record<string, string> | undefined;
//   name: string | undefined;
//   type: TemplateType.Newsletter | TemplateType.NewsletterPost | undefined;
// }

// type UpdateTemplateNode = {
//   id: number;
//   position?: {
//       parentId: number | null;
//       nextId: number | null;
//       prevId: number | null;
//   } | undefined;
//   templateId?: number | undefined;
//   data?: Record<string, string> | undefined;
// }

export function Template(props: TemplateProps) {
  const { template } = props;
  const [editing, setEditing] = useState(true);
  const [parent, setParent] = useState<null | NewsletterPostForm>(null);

  const promiseWithNotifications = usePromiseWithNotification();
  const { updateTemplate } = useTemplates();

  const postsFromTemplate = useMemo(
    () => templateToPosts<WithTempPosition<NewsletterPost>>(0, template),
    [template]
  );

  const { posts, formPosts, reset, insertPost, updatePost, deletePost } =
    useNewsletterPostsForm({ storePosts: postsFromTemplate });

  const { selected, handleSelect, allSelected, handleSelectAll } = useSelectItems(
    formPosts,
    'tempPosition.id'
  );

  const handleOpenPostDetails = (post: NewsletterPostForm) => {
    if ((!editing && _.get(post, 'id') !== undefined) || editing) {
      setParent(post);
    }
  };

  const handleInsert = (input: CreateNewsletterPostForm) => {
    insertPost(parent, input);
  };

  const handleSaveTemplate = async () => {
    const allPosts = formPosts.map((p) => _.omit(p, 'postId'));

    const createdWithTempPosition = fromPostsWithTempPosition(
      posts.existing,
      posts.created
    );
    const deletedIds = posts.deleted.map((p) => p.id);

    // if (created.length > 0) {
    //   promiseWithNotifications.execute(
    //     createPosts(
    //       {
    //         newsletterId: newsletter.id,
    //         posts: createdWithTempPosition,
    //       },
    //       []
    //     ),
    //     {
    //       successMsg: 'Items created!',
    //       errorMsg: 'Unable to create items :(',
    //     }
    //   );
    // }
    // if (updated.length > 0) {
    //   promiseWithNotifications.execute(updatePosts(newsletter.id, updated, files), {
    //     successMsg: 'Items updated!',
    //     errorMsg: 'Unable to update items :(',
    //   });
    // }
    // if (deleted.length > 0) {
    //   promiseWithNotifications.execute(
    //     deletePosts(newsletter.id, {
    //       ids: deletedIds,
    //     }),
    //     {
    //       successMsg: 'Items deleted!',
    //       errorMsg: 'Unable to delete items :(',
    //     }
    //   );
    // }
  };

  return (
    <>
      <NewsletterPostsList
        posts={formPosts}
        parent={parent}
        render={(value) => (
          <NewsletterPostsListItem
            value={value}
            editing={Boolean(editing)}
            handleSelect={handleSelect}
            selected={new Set()}
            handleRemove={deletePost}
            handleUpdate={updatePost}
            handleOpenPostDetails={handleOpenPostDetails}
          />
        )}
      />
      {editing && <AddNewsletterPostButton newsletterId={0} insert={handleInsert} />}
    </>
  );
}
