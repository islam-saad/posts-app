import SinglePost from './SinglePost';

function PostsList({ posts, onDeletePost, onSelectPost, search }) {
  const postsList = posts
    .filter((post) => post.title.toLowerCase().includes(search))
    .map((post) => (
      <SinglePost
        post={post}
        key={post.id}
        onDeletePost={onDeletePost}
        onSelectPost={onSelectPost}
      />
    ));
  return (
    <div className="mt-3">
      {posts.length ? postsList : 'Start add your posts'}
    </div>
  );
}

export default PostsList;
