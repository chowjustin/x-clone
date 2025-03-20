import { useState, useEffect, useRef } from "react";

const timeAgo = (timestamp) => {
  const postTime = new Date(timestamp);
  const currentTime = new Date();
  const diffInMs = currentTime - postTime;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to minutes

  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  } else {
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }
};

const PostItem = ({ post, deletePost, toggleLike, editPost, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(post.content);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncatable, setIsTruncatable] = useState(false);
  const contentRef = useRef(null);

  // Check if content needs truncation
  useEffect(() => {
    if (contentRef.current) {
      // Get the line height of the element
      const lineHeight = parseInt(
        window.getComputedStyle(contentRef.current).lineHeight
      );
      const maxHeight = lineHeight * 3; // 3 lines

      // Check if content height exceeds 3 lines
      setIsTruncatable(contentRef.current.scrollHeight > maxHeight);
    }
  }, [post.content]);

  const handleSave = () => {
    editPost(post.id, newContent);
    setIsEditing(false);
  };

  return (
    <div className="post-item">
      <p className="post-header">
        <strong>@{post.author}</strong>{" "}
        <p className="post-time">{timeAgo(post.createdAt)}</p>
      </p>

      {isEditing ? (
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="post-edit-textarea"
        />
      ) : (
        <div>
          <p
            ref={contentRef}
            className={`post-content ${
              !isExpanded && isTruncatable ? "truncated" : ""
            }`}
          >
            {post.content}
          </p>
          {isTruncatable && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="show-more-button"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      )}

      <div className="post-actions">
        {isEditing ? (
          <button onClick={handleSave} className="blue-button">
            Save
          </button>
        ) : (
          <>
            <button onClick={() => toggleLike(post.id)}>
              {post.likedBy.includes(user) ? "❤️" : "🤍"} {post.likes}
            </button>

            {user === post.author && (
              <>
                <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
                <button onClick={() => deletePost(post.id)}>🗑️ Delete</button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostItem;
