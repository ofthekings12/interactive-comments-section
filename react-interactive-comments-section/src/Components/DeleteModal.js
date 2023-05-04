import React from 'react'
import './DeleteModal.scss'

function DeleteModal({ deleteHandler, deleteReplyHandler, replyId, commentId, isOpen, toggleModal }) {
  
  return (
    
    
    <div className="modal">
      <div className="overlay" onClick={()=> {
        if (isOpen) {
          toggleModal(false)
        }
      }}>
      <div className="modal-box">

        <div className='modal-content'>
        <div className="header">Delete comment</div>
        <div className='message'>Are you sure you want to delete this comment? This will remove the comment and cannot be undone.</div>

        <div className="buttons">
          <button className="no-cancel" onClick={() => {
            if (isOpen) {
              toggleModal(false)
            }
          }}>NO, CANCEL</button>
          <button className="yes-delete" onClick={() => {
            if (replyId && commentId) {
              deleteReplyHandler(replyId, commentId);
            } else if (commentId) {
              deleteHandler(commentId);
            }
            window.location.reload()
          }}>YES, DELETE</button>
        </div>

        </div>
        </div>


      </div>
    </div>
  )
}

export default DeleteModal;