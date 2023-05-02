import {useEffect, useState} from 'react'
import axios from 'axios'
import './PostedReplyForm.scss'

function PostedReplyForm({ replyId, commentId }) {

  // // fetching currentUser avatar
  // const [image, setImage] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/currentUser")
  //     .then((res) => {
  //       setImage(res.data.image.png);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  //fetching currentUser Avatar
  const [image, setImage] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:3001/currentUser")
      .then((res) => {
        setImage(res.data.image.png);
        setCurrentUsername(res.data.username)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // creating a new reply
  const [reply, setReply] = useState("");

  //fetch existing replies
  const [existingReplies2, setExistingReplies2] = useState([]);


  //fetch existing comment
  const [existingComment2, setExistingComment2] = useState({});

  //fetch replyingTo username
  const [replyingToUsername2, setReplyingToUsername2] = useState("");

  useEffect(() => {
    console.log(commentId, "COMMENT ID HERE")
    axios.get(`http://localhost:3001/comments/${commentId}`)
    .then((res) => {
      setExistingComment2(res.data)
      setExistingReplies2(res.data["replies"])
      // console.log(res.data.id, 'the data')
      setReplyingToUsername2(res.data["replies"][0].user.username)
      console.log(res.data["replies"][0].user.username, 'oioioi')

    })
    .catch((error) => {
      console.error(error)
    })
  },[commentId])

  const submitReply = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/comments/${commentId}`, {
      ...existingComment2,
      replies: [
        ...existingReplies2,
        {
          id: `${commentId}-${Date.now()}`,
          content: reply,
          createdAt: 'now',
          score: 0,
          replyingTo: replyingToUsername2,
          user: {
            image: {
              png: image
            },
            username: currentUsername
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
    <div key={replyId}
    className="prf-grey-line">
      <div className="posted-reply-form">
      <img className="prf-avatar" src={image} alt="currentUser" />
      <form className="prf-form" onSubmit={submitReply}>
        <textarea className="prf-form-field" type="text" placeholder='Reply to this comment...'
        onChange={(e) => setReply(e.target.value)}
        />
        <input className='prf-btn' type="submit" value="REPLY"/>
      </form>


      </div>
    </div>
  )
}

export default PostedReplyForm