import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { createComment } from '../../api/comments-api'
import SubmitButton from '../SubmitButton'

function CreateCommentsCard({postId}) {
  
  const [comment, setComment] = useState('') 
  
  const SubmitComment = async (e)=>{
    e.preventDefault()
    await createComment(postId, comment)
          .then(setComment(''))
          //In error we must create a variable for display
          .catch(error=>console.log(error))
  }

  return (
    <div className='comment-form p-1'>
        <p className='text-semibold mt-0-75 mb-0-75'>New Comment</p>
        <form className='flex flex-column justifyCenter' onSubmit={(e)=>SubmitComment(e)}>
            <div className=''>
                <TextField
                    id="comment-field"
                    label="Write a comment"
                    multiline
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                    fullWidth
                />
            </div>
            <SubmitButton
                className=''
                style={{alignSelf: 'flex-end'}}
                button_name='Submit Comment'
            />
        </form>
    </div>
  )
}

export default CreateCommentsCard