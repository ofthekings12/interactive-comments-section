import "./AddComment.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function AddComment() {

  
  // fetching currentUser avatar and username
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(null)

  useEffect(() => {
    axios
      .get("http://localhost:3001/currentUser")
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
      await axios.post("http://localhost:3001/comments", {
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
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div>
      <div className="add-comment">
        {image && <img className="avatar" src={image} alt="CurrentUser" />
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
