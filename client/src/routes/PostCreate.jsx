import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { createPost } from '../api/posts-api';
import SubmitButton from '../components/SubmitButton';

const styleInput = {
  width: '350px', 
  maxWidth: '350px',
  ' @media (max-width:442px)':{
    width: 'auto'
  }
}

function PostCreate() {
  
  const [title, setTitle] = useState('')

  const submitPost = async (e)=>{
      e.preventDefault()
          await createPost(title)
                .then(setTitle(''))
                .catch((error)=>{
                  console.log(error)
                })
  }
  return (
    <div>
        <form className='flex flex-column justifyCenter alignCenter' 
              onSubmit={(e)=>{submitPost(e)}}
        >
            <div className='form-group flex flex-column justifyCenter alignCenter mt-1'>
                <TextField 
                    id="post-title" 
                    sx={styleInput} 
                    label="Title" 
                    variant="outlined" 
                    value={title}
                    onChange={(e)=>{setTitle(e.target.value)}}
                    required
                />
            </div>
            <SubmitButton 
              button_name="Submit"
            />
        </form>
    </div>
  )
}

export default PostCreate