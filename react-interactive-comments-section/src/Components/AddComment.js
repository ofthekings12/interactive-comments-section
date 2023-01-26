import "./AddComment.scss";
import { useState, useEffect, React } from "react";
import User from"../data.json"

function AddComment() {
  const avatar = User.currentUser.image.png;
  const [comment, setComment] = useState('');

  console.log(comment, 'here')

  // Fetch data for JSON-Server
  

  return (
    <div className="add-comment">
      <img className="avatar" src={avatar} alt="CurrentUser" />
      <form className="form">
       <textarea className="comment-field" type="text"  placeholder="Add a comment..." onChange={(e) => setComment(e.target.value)}/>
        <input className="submit-btn" type="submit" value="SEND"/>
      </form>
    </div>
  );
}

export default AddComment;
