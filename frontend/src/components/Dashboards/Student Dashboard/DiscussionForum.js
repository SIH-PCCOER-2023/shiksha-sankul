import React, { useContext, useEffect, useState } from "react";
import { sendGetRequest, sendPostRequest } from "../../../utils/sendHttp";
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

  const sidebarLinks = [
    {
      icon: "fa-home",
      text: "Dashboard",
      url: "/student-dashboard",
    },
    // {
    //   icon: 'fa-calendar',
    //   text: 'Individual Learning Plan',
    //   url: '/ilp',
    // },
    {
      icon: "fa-book-open",
      text: "Learning Center",
      url: "/learning-center",
    },
    {
      icon: "fa-pen",
      text: "Assessments",
      url: "/assessments",
    },
    // {
    //   icon: 'fa-thumbs-up',
    //   text: 'Our Recommendations',
    //   url: 'recommendations.html',
    // },
    // {
    //   icon: 'fa-solid fa-file-pdf',
    //   text: 'Certificates',
    //   url: 'certificates.html',
    // },
    {
      icon: "fa-solid fa-chart-pie",
      text: "Performance",
      url: "/performance",
    },
    {
      icon: "fa-solid fa-comments",
      text: "Discussion Forum",
      url: "/discussionforum",
    },
    {
      icon: "fa-note-sticky",
      text: "Notes",
      url: "/notes",
    },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await sendGetRequest(
          "http://localhost:8080/api/v1/postforums/"
        );
        console.log("Posts response:", response); // Log response for debugging
        if (response.data && Array.isArray(response.data.data.data)) {
          setPosts(response.data.data.data);
          // Initialize upvotes for each post
          const initialUpvotes = {};
          response.data.data.data.forEach((post) => {
            initialUpvotes[post._id] = post.upvotes.length;
          });
          setUpvotes(initialUpvotes);
        } else {
          showAlert("error", "Invalid response format for posts.");
        }
      } catch (error) {
        showAlert("error", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostCreation = async () => {
    try {
      if (!newPostContent.trim() || !newPostTitle.trim()) {
        showAlert(
          "error",
          "Please enter both title and content for your post."
        );
        return;
      }

      await sendPostRequest(`http://localhost:8080/api/v1/postforums/create`, {
        title: newPostTitle,
        content: newPostContent,
      });

      const response = await sendGetRequest(
        `http://localhost:8080/api/v1/postforums/`
      );

      console.log("Create post response:", response); // Log response for debugging

      if (response.data && Array.isArray(response.data.data)) {
        setPosts(response.data.data);
        setNewPostContent("");
        setNewPostTitle("");
        showAlert("success", "Post created successfully!");
      } else {
        showAlert("error", "Invalid response format for posts.");
      }
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
          content: replyContent[postId],
        }
      );

      showAlert("success", "Reply submitted successfully!");
      // Reset reply content for the specific post
      setReplyContent({ ...replyContent, [postId]: "" });
    } catch (error) {
      showAlert("error", error);
    }
  };

  const handleUpvote = async (postId) => {
    try {
      // Make API call to upvote the post
      await sendPostRequest(
        `http://localhost:8080/api/v1/postforums/upvote/${userCtx.user.id}/${postId}`
      );
      // Update local state with the incremented upvote count
      setUpvotes((prevUpvotes) => ({
        ...prevUpvotes,
        [postId]: prevUpvotes[postId] + 1,
      }));
      showAlert("success", "Upvoted successfully!");
    } catch (error) {
      showAlert("error", error);
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
                <p>
                  <strong>{post.title}:</strong> {post.description}
                </p>
                {/* Display input for reply */}
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
                {/* Move reply button before upvote button */}
                <button onClick={() => handleReply(post._id)}>Reply</button>
                {/* Display upvote count within the button */}
                <button
                  className={upvotes[post._id] > 0 ? "upvoted" : ""}
                  onClick={() => handleUpvote(post._id)}
                >
                  &#x1F44D; {/* Unicode thumbs-up symbol */}({upvotes[post._id]}
                  )
                </button>
                {/* You can display additional post information as needed */}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default DiscussionForum;
