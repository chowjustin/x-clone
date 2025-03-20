import { useState } from "react";

const PostForm = ({ addPost }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "") return alert("Post cannot be empty!");
    addPost(content);
    setContent("");
  };

  return (
    <section className="post-form-section">
      <div className="post-form-header">For You</div>
      <form onSubmit={handleSubmit} className="post-form">
        <textarea
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="post-textarea"
        />
        <hr className="post-divider" />
        <button type="submit" className="blue-button">
          Tweet
        </button>
      </form>
    </section>
  );
};

export default PostForm;
