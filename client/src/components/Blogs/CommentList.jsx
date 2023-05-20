import React from 'react'

function CommentList({comments}) {

  return (
    <div>
        <ul >
          {
              comments && comments.map((comment,index)=>{
                          return <li className='mt-0-75 mb-0-75' style={{wordWrap: 'break-word'}} key={index}>{comment.content}</li>
              })
          }
        </ul>
    </div>
  )
}

export default CommentList