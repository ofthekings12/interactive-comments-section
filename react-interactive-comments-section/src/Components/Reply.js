import React from 'react';
import './Reply.scss';
import User from"../data.json"
// import avatar from "../images/avatars/image-juliusomo.png";

function Reply() {
  const avatar = User.currentUser.image.png;

  return (
    <div className="add-reply">
      <img className="reply-avatar" src={avatar} alt="CurrentUser" />
      <form className="form">
       <textarea className="reply-field" type="text"  placeholder="Reply to this comment..."/>
        <input className="submit-btn" type="submit" value="REPLY"/>
      </form>
    </div>
  )
}

export default Reply