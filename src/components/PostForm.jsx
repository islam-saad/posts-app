import { useEffect, useState } from 'react';

function PostForm({ onAddPost, onEditPost, post }) {
  const [postTitle, setPostTitle] = useState('');
  const [postDetails, setPostDetails] = useState('');
  const date = new Date();

  useEffect(() => {
    if (post) {
      setPostTitle(post.title);
      setPostDetails(post.body);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postTitle || !postDetails) return;

    const newPost = {
      id: Date.now(),
      title: postTitle,
      body: postDetails,
      createdOn: date.toLocaleString('en-US'),
    };
    if (post) {
      onEditPost({ ...post, title: postTitle, body: postDetails });
    } else {
      onAddPost(newPost);
    }

    // onAddPost(newPost);
    setPostTitle('');
    setPostDetails('');
  };
  return (
    <div className="w-full max-w-md mx-auto rounded-md absolute bg-white p-5 z-20 top-2/4 left-2/4 -translate-x-2/4 -translate-y-1/2">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="postTitle"
          className="block text-lg font-semibold  text-gray-700"
        >
          Post Title
        </label>
        <input
          id="postTitle"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-12 px-3"
          type="text"
          placeholder="Enter post title here"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label
          htmlFor="postDetails"
          className="block mt-4 text-lg font-semibold  text-gray-700"
        >
          Post Details
        </label>
        <textarea
          id="postDetails"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-32 px-3 py-2 resize-none"
          placeholder="Enter post details here"
          value={postDetails}
          onChange={(e) => setPostDetails(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {post ? 'Save Changes' : 'Add Post'}
        </button>
      </form>
    </div>
  );
}

export default PostForm;
