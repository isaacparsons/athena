import { NewsletterPost } from '@athena/common';
import { useStore } from '@frontend/store';
import { useShallow } from 'zustand/react/shallow';

export const useNewsletterPosts = (newsletterId: number | undefined) => {
  const { posts, createPosts, updatePosts, deletePosts, loading } = useStore(
    useShallow((state) => ({
      posts: state.newsletterPosts.data,
      loading: state.newsletterPosts.loading,
      createPosts: state.newsletterPosts.create,
      updatePosts: state.newsletterPosts.update,
      deletePosts: state.newsletterPosts.delete,
    }))
  );
  return {
    loading,
    posts: Object.values(posts).filter(
      (p) => p.newsletterId === newsletterId
    ) as NewsletterPost[],
    createPosts,
    updatePosts,
    deletePosts,
  };
};
