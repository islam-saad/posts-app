function SinglePost({ post, onDeletePost, onSelectPost }) {
  const { id, title, body, createdOn } = post;
  return (
    <div className="bg-slate-200 rounded-sm p-3 mb-3">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mb-2">{body}</p>
      <p className="italic text-xs">{createdOn}</p>
      <div className="actions mt-3 ">
        <button
          className="rounded-full bg-green-400 px-4 py-1 mr-2"
          onClick={() => {
            onSelectPost(post);
          }}
        >
          edit
        </button>
        <button
          className="rounded-full bg-red-700 text-white px-4 py-1"
          onClick={() => {
            onDeletePost(id);
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
}

export default SinglePost;
