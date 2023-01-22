import React from 'react'
import './PostedReplyForm.scss'
import Avatar from '../data.json'

function PostedReplyForm({ replyId }) {

  const avatar = Avatar.currentUser.image.png;

  return (
    <div key={replyId}
    className="prf-grey-line">
      <div className="posted-reply-form">
      <img className="avatar" src={avatar} alt="currentUser" />
      <form className="prf-form">
        <textarea className="prf-form-field" type="text" placeholder='Reply to this comment...'/>
        <input className='prf-btn' type="submit" value="REPLY"/>
      </form>


      </div>
    </div>
  )
}

export default PostedReplyForm