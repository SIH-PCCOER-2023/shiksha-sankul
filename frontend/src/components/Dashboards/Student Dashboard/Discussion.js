import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { sendGetRequest, sendPostRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";
import UserContext from "../../../store/user-context";

const DiscussionForum = (props) => {
  const userCtx = useContext(UserContext);
  const [discussionPosts, setDiscussionPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    const fetchDiscussionPosts = async () => {
      try {
        const posts = await sendGetRequest(
          "http://localhost:8080/api/v1/postforums"
        );
        setDiscussionPosts(posts.data);
      } catch (error) {
        showAlert("error", error);
      }
    };

    fetchDiscussionPosts();
  }, []);

  const handleNewPost = async () => {
    // Logic to create a new post and update the state with the new post
    try {
      // Send HTTP request to create a new post
      const newPost = await sendPostRequest(
        "http://localhost:8080/api/v1/posts",
        { content: newPostContent }
      );
      setDiscussionPosts((prevPosts) => [newPost, ...prevPosts]); // Update the state with the new post
      setNewPostContent(""); // Clear the new post content
      showAlert("success", "Post created successfully");
    } catch (error) {
      showAlert("error", "Failed to create post");
    }
  };

  return (
    <Container>
      {/* Form for creating new post */}
      <div>
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Write your new post here..."
          rows={4}
          cols={50}
        />
        <button onClick={handleNewPost}>Post</button>
      </div>

      {/* Display existing discussion posts */}
      {discussionPosts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
          <p>Upvotes: {post.upvotes}</p>
          <p>Replies: {post.replies.length}</p>
          {/* You can add more information or functionality here */}
        </div>
      ))}
    </Container>
  );
};

export default DiscussionForum;
