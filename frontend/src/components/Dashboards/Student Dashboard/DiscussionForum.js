import React, { useContext, useEffect, useState } from "react";
import {
  sendGetRequest,
  sendPostRequest,
  sendPatchRequest,
} from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";
import Container from "react-bootstrap/Container";
import UserContext from "../../../store/user-context";
import FacultyHeader from "../../Header/FacultyHeader";
import FacultySidebar from "../../Sidebar/FacultySidebar";

const DiscussionForum = (props) => {
  const userCtx = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const [upvotes, setUpvotes] = useState({});
  const [replies, setReplies] = useState({});

  const sidebarLinks = [
    // Sidebar links here...
    {
      icon: "fa-home",
      text: "Dashboard",
      url: "/student-dashboard",
    },
    {
      icon: "fa-pen",
      text: "Assessments",
      url: "/assessments",
    },
    {
      icon: "fa-solid fa-chart-pie",
      text: "Performance",
      url: "/performance",
    },
    {
      icon: "fa-solid fa-layer-group",
      text: "ILP",
      url: "/individuallearningplan",
    },
    {
      icon: "fa-book-open",
      text: "Learning Center",
      url: "/learning-center",
    },
    {
      icon: "fa-note-sticky",
      text: "Notes",
      url: "/notes",
    },
    {
      icon: "fa-solid fa-comments",
      text: "Discussion Forum",
      url: "/discussionforum",
    },
  ];

  const fetchPosts = async () => {
    try {
      const response = await sendGetRequest(
        "http://localhost:8080/api/v1/postforums/"
      );
      console.log("Posts response:", response);
      if (response.data.data && Array.isArray(response.data.data.data)) {
        setPosts(response.data.data.data);
        const initialUpvotes = {};
        response.data.data.data.forEach((post) => {
          initialUpvotes[post._id] = post.upvotes.length;
          fetchReplies(post._id); // Fetch replies for each post
        });
        setUpvotes(initialUpvotes);
      } else {
        showAlert("error", "Invalid response format for posts.");
      }
    } catch (error) {
      showAlert("error", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchReplies = async (postId) => {
    try {
      const response = await sendGetRequest(
        `http://localhost:8080/api/v1/replyforums/${postId}`
      );
      console.log("Replies response for post ", postId, ":", response);
      if (response.data.data && Array.isArray(response.data.data.replies)) {
        setReplies((prevReplies) => ({
          ...prevReplies,
          [postId]: response.data.data.replies,
        }));
      } else {
        showAlert("error", "Invalid response format for replies.");
      }
    } catch (error) {
      showAlert("error", error);
    }
  };

  const handlePostCreation = async () => {
    try {
      if (!newPostContent.trim() || !newPostTitle.trim()) {
        showAlert(
          "error",
          "Please enter both title and content for your post."
        );
        return;
      }

      const requestBody = {
        author: userCtx.user.id,
        title: newPostTitle,
        description: newPostContent,
      };

      await sendPostRequest(
        "http://localhost:8080/api/v1/postforums/create",
        requestBody
      );

      fetchPosts(); // Fetch the updated list of posts after creating a new post

      setNewPostContent("");
      setNewPostTitle("");
      showAlert("success", "Post created successfully!");
    } catch (error) {
      showAlert("error", error);
    }
  };

  const handleReply = async (postId) => {
    try {
      if (!replyContent[postId]?.trim()) {
        showAlert("error", "Please enter some content for your reply.");
        return;
      }

      await sendPostRequest(
        `http://localhost:8080/api/v1/replyforums/create/${postId}`,
        {
          comment: replyContent[postId],
          author: userCtx.user.id,
        }
      );

      setReplyContent({ ...replyContent, [postId]: "" });

      showAlert("success", "Reply submitted successfully!");
      fetchReplies(postId); // Fetch replies again after submitting a reply
    } catch (error) {
      showAlert("error", error);
    }
  };

  const handleUpvote = async (postId) => {
    try {
      // Send a PATCH request to the server to handle the upvote
      await sendPatchRequest(
        `http://localhost:8080/api/v1/postforums/upvote/${userCtx.user.id}/${postId}`
      );

      setUpvotes((prevUpvotes) => ({
        ...prevUpvotes,
        [postId]: (prevUpvotes[postId] || 0) + 1,
      }));
      showAlert("success", "Upvoted successfully!");
    } catch (error) {
      // Check if the error is due to the user already upvoting the post
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "User already voted for this post"
      ) {
        showAlert("error", "You have already upvoted this post.");
      } else {
        showAlert("error", error);
      }
    }
  };

  return (
    <>
      <FacultyHeader />
      <FacultySidebar navLinks={sidebarLinks} />
      <div className="forum-container">
        <div className="create-post">
          <input
            type="text"
            placeholder="Enter post title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <textarea
            rows="4"
            cols="50"
            placeholder="Write your post content here..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <button onClick={handlePostCreation}>Create Post</button>
        </div>
        <div className="posts-container">
          {Array.isArray(posts) &&
            posts.map((post) => (
              <div key={post._id} className="post">
                <strong>
                  <p>{post.author.name}</p>
                </strong>
                <p>
                  <strong>title:</strong>
                  {post.title}
                </p>
                <p>
                  <strong>description:</strong>
                  {post.description}
                </p>

                <input
                  type="text"
                  placeholder="Write your reply here..."
                  value={replyContent[post._id] || ""}
                  onChange={(e) =>
                    setReplyContent({
                      ...replyContent,
                      [post._id]: e.target.value,
                    })
                  }
                />
                <button onClick={() => handleReply(post._id)}>Reply</button>
                <button
                  className={upvotes[post._id] > 0 ? "upvoted" : ""}
                  onClick={() => handleUpvote(post._id)}
                >
                  &#x1F44D; ({upvotes[post._id]})
                </button>
                {/* Display replies for the post */}

                <div className="replies">
                  {replies[post._id] && replies[post._id].length > 0 && (
                    <h2>Replies:</h2>
                  )}
                  {replies[post._id] &&
                    replies[post._id].map((reply) => (
                      <div key={reply._id} className="reply">
                        <p>
                          <strong>{reply.author.name}:</strong> {reply.comment}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default DiscussionForum;
