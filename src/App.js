import { useState, useEffect } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import AuthForm from "./components/AuthForm";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  // Load posts from localStorage (global) and user from sessionStorage (per tab)
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const storedUser = JSON.parse(sessionStorage.getItem("user")) || null;

    const fixedPosts = storedPosts.map((post) => ({
      ...post,
      likedBy: post.likedBy || [],
    }));

    setPosts(fixedPosts);
    setUser(storedUser);
  }, []);

  // Save posts globally using localStorage
  const savePosts = (data) => {
    localStorage.setItem("posts", JSON.stringify(data));
  };

  // Handle user login (per tab)
  const login = (username) => {
    setUser(username);
    sessionStorage.setItem("user", JSON.stringify(username)); // User is still stored per session
  };

  // Handle user logout
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  // Add a new post (global for all users)
  const addPost = (content) => {
    if (!user) return alert("You must log in to post!");
    const newPost = {
      id: Date.now(),
      content,
      likes: 0,
      likedBy: [],
      author: user,
      createdAt: new Date().toISOString(), // Store creation time
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  // Delete post (only if user is the author)
  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  // Toggle like (all users can like/unlike)
  const toggleLike = (id) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        const alreadyLiked = post.likedBy.includes(user) ?? false;
        return {
          ...post,
          likes: alreadyLiked ? post.likes - 1 : post.likes + 1,
          likedBy: alreadyLiked
            ? post.likedBy.filter((u) => u !== user)
            : [...(post.likedBy || []), user],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  // Edit post (only author can edit)
  const editPost = (id, newContent) => {
    const updatedPosts = posts.map((post) =>
      post.id === id && post.author === user
        ? { ...post, content: newContent }
        : post
    );
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  return (
    <section className="app-section">
      {!user ? (
        <AuthForm login={login} />
      ) : (
        <>
          <div className="app-container">
            <div className="sidebar-left">
              <img
                src="/left-open.png"
                alt="left"
                className="sidebar-img-large"
              />
              <img
                src="/left-close.png"
                alt="left"
                className="sidebar-img-small"
              />
            </div>
            <div className="main-content">
              <PostForm addPost={addPost} />
              <PostList
                posts={posts}
                deletePost={deletePost}
                toggleLike={toggleLike}
                editPost={editPost}
                user={user}
              />
            </div>
            <div className="sidebar-right">
              <input
                type="text"
                placeholder="Search"
                className="search-input"
              />
              <div className="user-info">
                <p className="username">
                  <strong>@{user}</strong>
                </p>
                <button onClick={logout} className="blue-button">
                  Logout
                </button>
              </div>
              <img src="/whotofollow.png" alt="follow" className="follow-img" />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default App;
