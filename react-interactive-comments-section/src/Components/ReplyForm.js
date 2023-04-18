import React from 'react';
import './ReplyForm.scss';
import User from"../data.json"
// import avatar from "../images/avatars/image-juliusomo.png";

function ReplyForm({ commentId }) {
  const avatar = User.currentUser.image.png;
  
  return (
    <div className="add-reply" key={ commentId }>
      <img className="reply-avatar" src={avatar} alt="CurrentUser" />
      <form className="form">
       <textarea className="reply-field" type="text"  placeholder="Reply to this comment..."/>
        <input className="reply-submit-btn" type="submit" value="REPLY"/>
      </form>
    </div>
  )
}

export default ReplyForm;