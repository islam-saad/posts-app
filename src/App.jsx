import { useCallback, useEffect, useState } from 'react';

import { Loader, Modal, PostForm } from './components';
import PostsList from './components/PostsList';
import useAPI from './hooks/useAPI';

function App() {
  const [posts, setPosts] = useState([]);
  const [editedPost, setEditedPost] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { loading, error, callAPI } = useAPI();

  useEffect(() => {
    const getPosts = async () => {
      const res = await callAPI({
        method: 'GET',
        url: 'http://localhost:3000/posts',
      });
      setPosts(res);
    };
    getPosts();
  }, [callAPI]);

  // useEffect(() => {
  //   if (data.length) setPosts([...data]);
  // }, [data]);

  async function handleAddPost(formData) {
    setPosts((prev) => [...prev, formData]);
    await callAPI({
      method: 'POST',
      url: 'http://localhost:3000/posts',
      data: formData,
    });
    handleModal();
  }

  const handleDeletePost = useCallback(
    async (id) => {
      try {
        await callAPI({
          method: 'DELETE',
          url: `http://localhost:3000/posts/${id}`,
        });
        setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
        console.log(error);
      }
    },
    [callAPI, posts]
  );

  async function handleEditPost(postToEdit) {
    setPosts((prev) =>
      prev.map((post) => (post.id === postToEdit.id ? postToEdit : post))
    );
    await callAPI({
      method: 'PATCH',
      url: `http://localhost:3000/posts/${postToEdit.id}`,
      data: postToEdit,
    });
    handleModal();
    setEditedPost(null); // Reset postToEdit after editing
  }

  function handleModal() {
    setIsOpen((prev) => !prev);
  }

  function handleSelectPost(post) {
    setEditedPost(post);
    handleModal();
  }

  return (
    <>
      {isOpen && (
        <Modal handleModal={handleModal}>
          <PostForm
            onAddPost={handleAddPost}
            onEditPost={handleEditPost}
            post={editedPost}
            handleModal={handleModal}
          />
        </Modal>
      )}

      <div className="w-full max-w-xl mx-auto px-4">
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleModal}
        >
          Add post
        </button>
        <input
          id="search"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-12 px-3"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Loader loading={loading} error={error}>
          <PostsList
            posts={posts}
            search={search}
            onDeletePost={handleDeletePost}
            onSelectPost={handleSelectPost}
          />
        </Loader>
      </div>
    </>
  );
}

export default App;
