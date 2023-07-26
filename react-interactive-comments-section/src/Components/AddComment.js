import "./AddComment.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
});

function AddComment() {

  //fetching comments
  // useEffect(() => {

  // })
  
  // fetching currentUser avatar and username
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(null)

  useEffect(() => {
    api
      .get("/currentUser")
      .then((res) => {
        setImage(res.data.image.png);
        setUsername(res.data.username)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //creating a new comment
  const [comment, setComment] = useState("");

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      await api.post("/comments", {
        id: null,
        content: comment,
        createdAt: 'now',
        score: 0,
        user: {
          image: {
            png: image
          },
          username: username,
        },
        replies: []
      })
      setComment("");
      window.location.reload()
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div>
      <div className="add-comment">
        {image && <img className="add-comment-avatar" src={image} alt="CurrentUser" />
        }
        <form className="form" onSubmit={submitComment}>
          <textarea
            className="comment-field"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)
              
            }
          />
          <input className="submit-btn" type="submit" value="SEND" />
        </form>
      </div>
    </div>
  );
}

export default AddComment;
