import React from "react";
import { useState, useEffect } from "react";
import "./ReplyForm.scss";
import User from "../data.json";
import axios from "axios";
// import avatar from "../images/avatars/image-juliusomo.png";

function ReplyForm({ commentId }) {
  const avatar = User.currentUser.image.png;

  // creating a new reply
  const [reply, setReply] = useState("");

  //fetch existing replies
  const [existingReplies, setExistingReplies] = useState([]);


  //fetch existing comment
  const [existingComment, setExistingComment] = useState({});

  //fetch replyingTo username
  const [replyingToUsername, setReplyingToUsername] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/comments/${commentId}`)
    .then((res) => {
      setExistingComment(res.data)
      setExistingReplies(res.data["replies"])
      setReplyingToUsername(res.data.user.username)
      console.log(res.data["replies"], "HEELLOO")
    })
    .catch((error) => {
      console.error(error)
    })
  },[])

  const submitReply = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/comments/${commentId}`, {
      ...existingComment,
      replies: [
        ...existingReplies,
        {
          id: `${commentId}-${Date.now()}`,
          content: reply,
          createdAt: 'now',
          score: 0,
          replyingTo: replyingToUsername,
          user: {
            image: {
              png: avatar
            },
            username: User.currentUser.username
          },
          
      }]
      });
      setReply("");
      window.location.reload()
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-reply" key={commentId}>
      <img className="reply-avatar" src={avatar} alt="CurrentUser" />
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
