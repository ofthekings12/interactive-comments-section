import React from "react";
import { useState, useEffect } from "react";
import "./ReplyForm.scss";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
});

function ReplyForm({ commentId }) {
  //fetching currentUser Avatar
  const [image, setImage] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    api
      .get("/currentUser")
      .then((res) => {
        setImage(res.data.image.png);
        setCurrentUsername(res.data.username);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // creating a new reply
  const [reply, setReply] = useState("");

  //fetch existing replies
  const [existingReplies, setExistingReplies] = useState([]);

  //fetch existing comment
  const [existingComment, setExistingComment] = useState({});

  //fetch replyingTo username
  const [replyingToUsername, setReplyingToUsername] = useState("");

  useEffect(() => {
    api
      .get(`/comments/${commentId}`)
      .then((res) => {
        setExistingComment(res.data);
        setExistingReplies(res.data["replies"]);
        setReplyingToUsername(res.data.user.username);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [commentId]);

  const submitReply = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/comments/${commentId}`, {
        ...existingComment,
        replies: [
          ...existingReplies,
          {
            id: `${commentId}-${Date.now()}`,
            content: reply,
            createdAt: "now",
            score: 0,
            replyingTo: replyingToUsername,
            user: {
              image: {
                png: image,
              },
              username: currentUsername,
            },
          },
        ],
      });
      setReply(existingReplies);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-reply" key={commentId}>
      <img className="reply-avatar" src={image} alt="CurrentUser" />
      <form className="form" onSubmit={submitReply}>
        <textarea
          className="reply-field"
          type="text"
          placeholder="Reply to this comment..."
          onChange={(e) => setReply(e.target.value)}
        />
        <input className="reply-submit-btn" type="submit" value="REPLY" />
      </form>
    </div>
  );
}

export default ReplyForm;
