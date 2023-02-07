import { React, useState, useEffect } from "react";
import "./PostedReply.scss";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import PostedReplyForm from "./PostedReplyForm";

function PostedReply() {
  //Fetch currentUser
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/currentUser")
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //Fetch comments/replies/data from JSON Server
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/comments")
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // toggle Delete Modal
  const [modal, setModal] = useState(false);

  const handleState = (e) => {
    setModal(e);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  //toggle postedReplyForm

  const [showPostedReplyForm, setShowReplyForm] = useState(false);

  const togglePostedReplyForm = (id) => {
    if (showPostedReplyForm === id) {
      setShowReplyForm(null);
    } else {
      setShowReplyForm(id);
    }
  };

  //useState to toggle editForm

  const [showEditForm, setShowEditForm] = useState(false);

  const toggleShowEditForm = (id) => {
    if (showEditForm === id) {
      setShowEditForm(null);
    } else {
      setShowEditForm(id);
    }
  };

  //delete Reply
  const deleteReply = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`)
      .then((res) => {
        setComments(comments.replies.filter((reply) => reply.id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {comments &&
        comments.map((comment, index) => {
          return (
            <div key={index}>
              {comment.replies &&
                comment.replies.map((reply, index) => {
                  return (
                    <div className="gray-line" key={index}>
                      <div className="posted-reply">
                        <div className="p-r-vote">
                          <svg
                            className="p-r-upvote"
                            width="11"
                            height="11"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" />
                          </svg>
                          <div className="p-r-vote-count">{reply.score}</div>
                          <svg
                            className="p-r-downvote"
                            width="11"
                            height="3"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" />
                          </svg>
                        </div>

                        <div className="p-r-content-header">
                          {currentUser &&
                          reply.user.username === currentUser.username ? (
                            // beginning of logged in user
                            <div className="p-r-header">
                              <div className="p-r-details">
                                <img
                                  className="p-r-user-avatar"
                                  src={reply.user.image.png}
                                  alt="userAvatar"
                                />
                                <div className="p-r-user-handle" key={reply.id}>
                                  {reply.user.username}
                                </div>

                                <div className="you">you</div>

                                <div className="p-r-created-at">
                                  {reply.createdAt}
                                </div>
                              </div>
                              {/* edit & delete */}
                              <div className="editDelete">
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
                                    toggleShowEditForm(reply.id);
                                  }}
                                  data-content={reply.content}
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
                            // end of logged in user
                            <div className="p-r-header">
                              <div className="p-r-details">
                                <img
                                  className="p-r-user-avatar"
                                  src={reply.user.image.png}
                                  alt="userAvatar"
                                />
                                <div className="p-r-user-handle" key={reply.id}>
                                  {reply.user.username}
                                </div>
                                <div className="p-r-created-at">
                                  {reply.createdAt}
                                </div>
                              </div>
                              <div
                                className="p-r-reply"
                                key={comment.id}
                                onClick={() => {
                                  togglePostedReplyForm(reply.id);
                                }}
                              >
                                <svg
                                  className="p-r-reply-icon"
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
                          {showEditForm === reply.id ? (
                            <form className="edit-form">
                              <textarea
                                className="edit-form-field"
                                type="text"
                                defaultValue={`@${reply.replyingTo} ${reply.content}`}
                              />

                              <input
                                className="update-btn"
                                type="submit"
                                value="UPDATE"
                              />
                            </form>
                          ) : (
                            <div className="p-r-content">
                              <span className="reply-to">
                                {`${"@" + reply.replyingTo}`}
                              </span>{" "}
                              {reply.content}
                            </div>
                          )}
                          {/* editform ends */}
                        </div>
                      </div>
                      {showPostedReplyForm === reply.id && (
                        <PostedReplyForm
                          key={reply.id}
                          id={reply.id}
                          togglePostedReplyForm={togglePostedReplyForm}
                        />
                      )}
                      {modal && (
                        <DeleteModal
                          deleteReplyHandler={deleteReply}
                          // commentId={comment.id}
                          replyId={reply.id}
                          isOpen={setModal}
                          toggleModal={handleState}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}

export default PostedReply;
