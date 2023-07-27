import { React, useState, useEffect } from "react";
import "./Comment.scss";
import PostedReply from "./PostedReply";
import ReplyForm from "./ReplyForm";
import axios from "axios";
import DeleteModal from "./DeleteModal";


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
});

export default function Comment() {
  //Fetch currentUser

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    api
      .get("/currentUser")
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //Fetch comments from JSON
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api
      .get("/comments")
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // useState Delete Modal
  const [modal, setModal] = useState(false);

  const handleState = (e) => {
    setModal(e);
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  // Toggle ReplyForm
  const [showReply, setShowReply] = useState(false);

  const toggleReply = (id) => {
    if (showReply === id) {
      setShowReply(null);
    } else {
      setShowReply(id);
    }
  };

  //useState to toggle editForm

  const [showEditForm, setShowEditForm] = useState(false);

  const toggleShowEditForm = (id) => {
    if (showEditForm === id) {
      setShowEditForm(null);
      setUpdatedComment("");
    } else {
      setShowEditForm(id);
      setUpdatedComment(comments.find((comment) => comment.id === id).content);
    }
  };

  //Delete comment
  const deleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  //Update comment
  const updateComment = async (commentId, updatedComment) => {
    try {
      const { data: comment } = await api.get(
        `/comments/${commentId}`
      );
      if (
        document.getElementById("comment-edit-form-field") !== updatedComment
        ) {
        const updated = { ...comment, content: updatedComment };
        await api.put(`/comments/${commentId}`, updated);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [updatedComment, setUpdatedComment] = useState("");

  const handleChange = (event) => {
    setUpdatedComment(event.target.value);
  };

  // voting
  const handleUpvote = async (commentId) => {
    try {
      const res = await api.get(`/comments/${commentId}`);
      const comment = res.data;
      comment.score++;
  
      await api.put(`/comments/${commentId}`, comment);
  
      setComments((comments) =>
        comments.map((c) => (c.id === comment.id ? comment : c))
      );
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleDownvote = async (commentId) => {
    try {
      const res = await api.get(`/comments/${commentId}`);
      const comment = res.data;
      comment.score--;
  
      await api.put(`/comments/${commentId}`, comment);
  
      setComments((comments) =>
        comments.map((c) => (c.id === comment.id ? comment : c))
      );
    } catch (err) {
      console.error(err);
    }
  };
  
  
  const commentsArray = Object.values(comments);

  return (
    <div>
      {
        commentsArray &&
        commentsArray.map((comment) => {
          console.log(comment.replies, "replies")
          return (
            <div className="comment-reply-container" key={comment.id}>
              <div className="comment" key={comment.id}>
                <div className="vote">
                  <svg
                    className="upvote"
                    width="11"
                    height="11"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => handleUpvote(comment.id)}
                  >
                    <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" />
                  </svg>
                  <div className="vote-count">{comment.score}</div>
                  <svg
                    className="downvote"
                    width="11"
                    height="3"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => handleDownvote(comment.id)}
                  >
                    <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" />
                  </svg>
                </div>
                <div className="comment-content-header">
                  {currentUser &&
                  comment?.user?.username === currentUser.username ? (
                    // beginning of logged in user
                    <div className="comment-header">
                      <div className="comment-details">
                        <img
                          className="user-avatar"
                          src={comment?.user?.image?.png || ""}
                          alt="userAvatar"
                        />
                        <div className="user-handle" key={comment.id}>
                          {comment?.user?.username}
                        </div>

                        <div className="you">you</div>

                        <div className="created-at">{comment.createdAt}</div>
                      </div>
                      {/* edit & delete */}
                      <div className="comment-editDelete">
                        <div className="delete" onClick={toggleModal}>
                          <svg
                            className="delete-icon"
                            width="12"
                            height="14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                              fill="#ED6368"
                            />
                          </svg>
                          Delete
                        </div>

                        {/* editbutton */}
                        <div
                          className="edit"
                          key={comment.id}
                          onClick={() => {
                            toggleShowEditForm(comment.id);
                          }}
                          data-content={comment.content}
                        >
                          <svg
                            className="edit-icon"
                            width="14"
                            height="14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                              fill="#5357B6"
                            />
                          </svg>
                          Edit
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="comment-header">
                      <div className="comment-details">
                        <img
                          className="user-avatar"
                          key={comment.id}
                          src={comment?.user?.image?.png}
                          alt="userAvatar"
                        />
                        <div className="user-handle">
                          {comment?.user?.username}
                        </div>
                        <div className="created-at">{comment.createdAt}</div>
                      </div>

                      <div
                        className="reply"
                        key={comment.id}
                        onClick={() => {
                          toggleReply(comment.id);
                        }}
                      >
                        <svg
                          className="reply-icon"
                          width="14"
                          height="13"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                            fill="#5357B6"
                          />
                        </svg>
                        <div>Reply</div>
                      </div>
                    </div>
                  )}

                  {/* editform */}
                  {showEditForm === comment.id ? (
                    <form className="edit-form">
                      <textarea
                        className="comment-edit-form-field"
                        type="text"
                        onChange={handleChange}
                        defaultValue={comment.content}
                      />

                      <input
                        className="update-btn"
                        type="submit"
                        value="UPDATE"
                        onClick={(event) => {
                          event.preventDefault();
                          updateComment(comment.id, updatedComment);
                        }}
                      />
                    </form>
                  ) : (
                    <div className="comment-content">{comment.content}</div>
                  )}
                  {/* editform ends */}
                </div>
              </div>
              {showReply === comment.id && <ReplyForm commentId={comment.id} />}
              {modal && (
                <DeleteModal
                  deleteHandler={deleteComment}
                  commentId={comment.id}
                  isOpen={setModal}
                  toggleModal={handleState}
                />
              )}
              {
              comment.replies.length > 0 ? (
                <PostedReply
                  commentId={comment.id}
                  replyId={comment.replies.id}
                />
              ) : null}
            </div>
        )
       })}

    </div>
  );
}

