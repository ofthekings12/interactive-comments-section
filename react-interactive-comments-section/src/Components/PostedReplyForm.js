import {useEffect, useState} from 'react'
import axios from 'axios'
import './PostedReplyForm.scss'

function PostedReplyForm({ replyId }) {

  // fetching currentUser avatar
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/currentUser")
      .then((res) => {
        setImage(res.data.image.png);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div key={replyId}
    className="prf-grey-line">
      <div className="posted-reply-form">
      <img className="prf-avatar" src={image} alt="currentUser" />
      <form className="prf-form">
        <textarea className="prf-form-field" type="text" placeholder='Reply to this comment...'/>
        <input className='prf-btn' type="submit" value="REPLY"/>
      </form>


      </div>
    </div>
  )
}

export default PostedReplyForm