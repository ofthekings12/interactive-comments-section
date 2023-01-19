import "./AddComment.scss";
import React from "react";
import avatar from "../images/avatars/image-juliusomo.png";

function addComment() {
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
