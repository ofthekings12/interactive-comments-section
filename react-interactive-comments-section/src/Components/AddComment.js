import "./AddComment.scss";
import React from "react";
import User from"../data.json"

function addComment() {
  const avatar = User.currentUser.image.png;

  return (
    <div className="add-comment">
      <img className="avatar" src={avatar} alt="CurrentUser" />
      <form className="form">
       <textarea className="comment-field" type="text"  placeholder="Add a comment..."/>
        <input className="submit-btn" type="submit" value="SEND"/>
      </form>
    </div>
  );
}

export default addComment;
