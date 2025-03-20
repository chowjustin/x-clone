import PostItem from "./PostItem";

const PostList = ({ posts, deletePost, toggleLike, editPost, user }) => {
  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts yet!</p>
      ) : (
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            deletePost={deletePost}
            toggleLike={toggleLike}
            editPost={editPost}
            user={user}
          />
        ))
      )}
    </div>
  );
};

export default PostList;
