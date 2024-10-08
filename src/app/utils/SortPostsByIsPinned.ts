import PostTypes from "../types/PostTypes";

const SortPostsByIsPinned = (posts: PostTypes[]): PostTypes[] => {
  return [...posts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });
};

export default SortPostsByIsPinned;
