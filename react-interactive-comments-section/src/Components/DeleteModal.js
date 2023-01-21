import React from 'react'
import './DeleteModal.scss'

function DeleteModal() {
  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h2>Delete Comment</h2>
        <p>Are you sure you want to delete this comment? This will remove the comment and cannot be undone.</p>
        <div className="buttons">
          <button className="no-cancel">NO, CANCEL</button>
          <button className="yes-delete">YES, DELETE</button>

        </div>


      </div>
    </div>
  )
}

export default DeleteModal