import "./AddComment.scss";
import { useEffect, useState } from "react";
import axios from 'axios'

function AddComment() {
  const [image, setImage] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:3001/currentUser')
    .then(res => {
      setImage(res.data.image.png)
    })
    .catch(error => {
      console.error(error)
    })
  }, [])
  

  return (
    <div>
      {image &&
          <div className="add-comment">
          <img className="avatar" src={image} alt="CurrentUser" />
          <form className="form">
           <textarea className="comment-field" type="text"  placeholder="Add a comment..."/>
            <input className="submit-btn" type="submit" value="SEND"/>
          </form>
          </div>
          }
        

    </div>
  );
}

export default AddComment;
